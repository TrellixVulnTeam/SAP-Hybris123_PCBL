/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.solrfacetsearch.search.impl;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.solrfacetsearch.config.FacetSearchConfig;
import de.hybris.platform.solrfacetsearch.config.IndexConfig;
import de.hybris.platform.solrfacetsearch.config.IndexedType;
import de.hybris.platform.solrfacetsearch.config.SearchConfig;
import de.hybris.platform.solrfacetsearch.config.WildcardType;
import de.hybris.platform.solrfacetsearch.provider.FieldNameProvider;
import de.hybris.platform.solrfacetsearch.search.FacetSearchException;
import de.hybris.platform.solrfacetsearch.search.FieldNameTranslator;
import de.hybris.platform.solrfacetsearch.search.Keyword;
import de.hybris.platform.solrfacetsearch.search.KeywordModifier;
import de.hybris.platform.solrfacetsearch.search.SearchQuery;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


@UnitTest
public class DisMaxFreeTextQueryBuilderTest
{
	private static final String INDEXED_TYPE_NAME = "product";

	private static final String NAME_FIELD = "name";
	private static final String NAME_TRANSLATED_FIELD = "name_text_de";
	private static final String DESCRIPTION_FIELD = "description";
	private static final String DESCRIPTION_TRANSLATED_FIELD = "description_text_de";
	private static final String SUMMARY_FIELD = "summary";
	private static final String SUMMARY_TRANSLATED_FIELD = "summary_text_de";

	@Mock
	private FieldNameTranslator fieldNameTranslator;

	private SearchQuery searchQuery;
	private DisMaxFreeTextQueryBuilder disMaxFreeTextQueryBuilder;

	@Before
	public void setUp()
	{
		MockitoAnnotations.initMocks(this);

		disMaxFreeTextQueryBuilder = new DisMaxFreeTextQueryBuilder();
		disMaxFreeTextQueryBuilder.setFieldNameTranslator(fieldNameTranslator);

		final IndexedType indexedType = new IndexedType();
		indexedType.setFtsQueryBuilderParameters(new HashMap<>());
		indexedType.getFtsQueryBuilderParameters().put(DisMaxFreeTextQueryBuilder.GROUP_BY_QUERY_TYPE, Boolean.TRUE.toString());

		final Map<String, IndexedType> indexedTypes = new HashMap<>();
		indexedTypes.put(INDEXED_TYPE_NAME, indexedType);

		final IndexConfig indexConfig = new IndexConfig();
		indexConfig.setIndexedTypes(indexedTypes);

		final FacetSearchConfig facetSearchConfig = new FacetSearchConfig();
		facetSearchConfig.setIndexConfig(indexConfig);
		facetSearchConfig.setSearchConfig(new SearchConfig());

		searchQuery = new SearchQuery(facetSearchConfig, indexedType);

		given(fieldNameTranslator.translate(searchQuery, NAME_FIELD, FieldNameProvider.FieldType.INDEX))
				.willReturn(NAME_TRANSLATED_FIELD);
		given(fieldNameTranslator.translate(searchQuery, DESCRIPTION_FIELD, FieldNameProvider.FieldType.INDEX))
				.willReturn(DESCRIPTION_TRANSLATED_FIELD);
		given(fieldNameTranslator.translate(searchQuery, SUMMARY_FIELD, FieldNameProvider.FieldType.INDEX))
				.willReturn(SUMMARY_TRANSLATED_FIELD);
	}

	@Test
	public void testDisMaxFreeTextQueryBuilder() throws FacetSearchException
	{
		// given
		searchQuery.addFreeTextPhraseQuery(NAME_FIELD, Float.valueOf(10), Float.valueOf(200));
		searchQuery.addFreeTextPhraseQuery(DESCRIPTION_FIELD, Float.valueOf(10), Float.valueOf(200));
		searchQuery.addFreeTextQuery(NAME_FIELD, 0, Float.valueOf(100));
		searchQuery.addFreeTextQuery(DESCRIPTION_FIELD, 0, Float.valueOf(50));
		searchQuery.addFreeTextFuzzyQuery(NAME_FIELD, 0, Integer.valueOf(10), Float.valueOf(50));
		searchQuery.addFreeTextFuzzyQuery(DESCRIPTION_FIELD, 0, Integer.valueOf(11), Float.valueOf(55));
		searchQuery.addFreeTextWildcardQuery(NAME_FIELD, 0, WildcardType.POSTFIX, Float.valueOf(25));
		searchQuery.addFreeTextWildcardQuery(DESCRIPTION_FIELD, 0, WildcardType.PREFIX, Float.valueOf(26));

		searchQuery.setUserQuery("test test1 test2");
		searchQuery.setKeywords(Arrays.asList(new Keyword("test"), new Keyword("test1"), new Keyword("test2")));

		// when
		final String query = disMaxFreeTextQueryBuilder.buildQuery(searchQuery);

		// then
		final String expectedQuery = "{!multiMaxScore tie=0.0}"
				// Free text
				+ "((name_text_de:test^100.0) OR (description_text_de:test^50.0)) OR "
				+ "((name_text_de:test1^100.0) OR (description_text_de:test1^50.0)) OR "
				+ "((name_text_de:test2^100.0) OR (description_text_de:test2^50.0)) OR "
				// Fuzzy Query
				+ "((name_text_de:test~10^50.0) OR (description_text_de:test~11^55.0)) OR "
				+ "((name_text_de:test1~10^50.0) OR (description_text_de:test1~11^55.0)) OR "
				+ "((name_text_de:test2~10^50.0) OR (description_text_de:test2~11^55.0)) OR "
				// Wild card
				+ "((name_text_de:test*^25.0) OR (description_text_de:*test^26.0)) OR "
				+ "((name_text_de:test1*^25.0) OR (description_text_de:*test1^26.0)) OR "
				+ "((name_text_de:test2*^25.0) OR (description_text_de:*test2^26.0)) OR "
				// Phrase query
				+ "((name_text_de:\"test test1 test2\"~10.0^200.0) OR (description_text_de:\"test test1 test2\"~10.0^200.0))";

		Assert.assertEquals(expectedQuery, query);
	}

	@Test
	public void testDisMaxFreeTextQueryBuilderGroupByTermOnly() throws FacetSearchException
	{
		// given
		searchQuery.getFreeTextQueryBuilderParameters().put(DisMaxFreeTextQueryBuilder.GROUP_BY_QUERY_TYPE,
				Boolean.FALSE.toString());

		searchQuery.addFreeTextPhraseQuery(NAME_FIELD, Float.valueOf(10), Float.valueOf(200));
		searchQuery.addFreeTextPhraseQuery(DESCRIPTION_FIELD, Float.valueOf(10), Float.valueOf(200));
		searchQuery.addFreeTextQuery(NAME_FIELD, 0, Float.valueOf(100));
		searchQuery.addFreeTextQuery(DESCRIPTION_FIELD, 0, Float.valueOf(50));
		searchQuery.addFreeTextFuzzyQuery(NAME_FIELD, 0, Integer.valueOf(10), Float.valueOf(50));
		searchQuery.addFreeTextFuzzyQuery(DESCRIPTION_FIELD, 0, Integer.valueOf(11), Float.valueOf(55));
		searchQuery.addFreeTextWildcardQuery(NAME_FIELD, 0, WildcardType.POSTFIX, Float.valueOf(25));
		searchQuery.addFreeTextWildcardQuery(DESCRIPTION_FIELD, 0, WildcardType.PREFIX, Float.valueOf(26));

		searchQuery.setUserQuery("test test1 test2");
		searchQuery.setKeywords(Arrays.asList(new Keyword("test"), new Keyword("test1"), new Keyword("test2")));

		// when
		final String query = disMaxFreeTextQueryBuilder.buildQuery(searchQuery);

		// then
		final String expectedQuery = "{!multiMaxScore tie=0.0}"
				// text
				+ "((name_text_de:test^100.0) OR (description_text_de:test^50.0) OR "
				+ "(name_text_de:test~10^50.0) OR (description_text_de:test~11^55.0) OR "
				+ "(name_text_de:test*^25.0) OR (description_text_de:*test^26.0)) OR "
				// text1t
				+ "((name_text_de:test1^100.0) OR (description_text_de:test1^50.0) OR "
				+ "(name_text_de:test1~10^50.0) OR (description_text_de:test1~11^55.0) OR "
				+ "(name_text_de:test1*^25.0) OR (description_text_de:*test1^26.0)) OR "
				// text2t
				+ "((name_text_de:test2^100.0) OR (description_text_de:test2^50.0) OR "
				+ "(name_text_de:test2~10^50.0) OR (description_text_de:test2~11^55.0) OR "
				+ "(name_text_de:test2*^25.0) OR (description_text_de:*test2^26.0)) OR "
				// Phrase query
				+ "((name_text_de:\"test test1 test2\"~10.0^200.0) OR (description_text_de:\"test test1 test2\"~10.0^200.0))";

		Assert.assertEquals(expectedQuery, query);
	}

	@Test
	public void testFreeTextPhraseQuery() throws FacetSearchException
	{
		// given
		searchQuery.addFreeTextPhraseQuery(NAME_FIELD, Float.valueOf(10), Float.valueOf(200));
		searchQuery.addFreeTextPhraseQuery(DESCRIPTION_FIELD, Float.valueOf(10), Float.valueOf(200));

		searchQuery.setUserQuery("test test1 test2");
		searchQuery.setKeywords(Arrays.asList(new Keyword("test"), new Keyword("test1"), new Keyword("test2")));

		// when
		when(fieldNameTranslator.translate(searchQuery, "name", FieldNameProvider.FieldType.INDEX)).thenReturn("name_text_de");
		when(fieldNameTranslator.translate(searchQuery, "description", FieldNameProvider.FieldType.INDEX))
				.thenReturn("description_text_de");
		final String query = disMaxFreeTextQueryBuilder.buildQuery(searchQuery);

		// then
		final String expectedQuery = "{!multiMaxScore tie=0.0}((name_text_de:\"test test1 test2\"~10.0^200.0) OR "
				+ "(description_text_de:\"test test1 test2\"~10.0^200.0))";
		Assert.assertEquals(expectedQuery, query);
	}

	@Test
	public void testFreeTextQueryWithQuotes() throws FacetSearchException
	{
		// given
		searchQuery.addFreeTextQuery(NAME_FIELD, 0, Float.valueOf(100));
		searchQuery.addFreeTextQuery(DESCRIPTION_FIELD, 0, Float.valueOf(50));

		searchQuery.setUserQuery("\"test test1\" test2");
		searchQuery.setKeywords(Arrays.asList(new Keyword("test test1", KeywordModifier.EXACT_MATCH), new Keyword("test2")));

		// when
		final String query = disMaxFreeTextQueryBuilder.buildQuery(searchQuery);

		// then
		final String expectedQuery = "{!multiMaxScore tie=0.0}"
				+ "((name_text_de:\"test test1\"^100.0) OR (description_text_de:\"test test1\"^50.0)) OR "
				+ "((name_text_de:test2^100.0) OR (description_text_de:test2^50.0))";
		Assert.assertEquals(expectedQuery, query);
	}


	@Test
	public void testFreeTextQueryWithQuotesAndBackslashes() throws FacetSearchException
	{
		// given
		searchQuery.addFreeTextQuery(NAME_FIELD, 0, Float.valueOf(100));
		searchQuery.addFreeTextQuery(DESCRIPTION_FIELD, 0, Float.valueOf(50));

		searchQuery.setUserQuery("\"test\\ test1\\ test2");
		searchQuery.setKeywords(Arrays.asList(new Keyword("test\\ test1\\", KeywordModifier.EXACT_MATCH), new Keyword("test2")));

		// when
		final String query = disMaxFreeTextQueryBuilder.buildQuery(searchQuery);

		// then
		final String expectedQuery = "{!multiMaxScore tie=0.0}"
				+ "((name_text_de:\"test\\\\ test1\\\\\"^100.0) OR (description_text_de:\"test\\\\ test1\\\\\"^50.0)) OR "
				+ "((name_text_de:test2^100.0) OR (description_text_de:test2^50.0))";
		Assert.assertEquals(expectedQuery, query);
	}

	@Test
	public void testFreeTextQuery() throws FacetSearchException
	{
		// given
		searchQuery.addFreeTextQuery(NAME_FIELD, 0, Float.valueOf(100));
		searchQuery.addFreeTextQuery(DESCRIPTION_FIELD, 0, Float.valueOf(50));

		searchQuery.setUserQuery("test test1 test2");
		searchQuery.setKeywords(Arrays.asList(new Keyword("test"), new Keyword("test1"), new Keyword("test2")));

		// when
		final String query = disMaxFreeTextQueryBuilder.buildQuery(searchQuery);

		// then
		final String expectedQuery = "{!multiMaxScore tie=0.0}"
				+ "((name_text_de:test^100.0) OR (description_text_de:test^50.0)) OR "
				+ "((name_text_de:test1^100.0) OR (description_text_de:test1^50.0)) OR "
				+ "((name_text_de:test2^100.0) OR (description_text_de:test2^50.0))";
		Assert.assertEquals(expectedQuery, query);
	}

	@Test
	public void testFreeTexFuzzyQuery() throws FacetSearchException
	{
		// given
		searchQuery.addFreeTextFuzzyQuery(NAME_FIELD, 0, Integer.valueOf(10), Float.valueOf(50));
		searchQuery.addFreeTextFuzzyQuery(DESCRIPTION_FIELD, 0, Integer.valueOf(11), Float.valueOf(55));

		searchQuery.setUserQuery("test test1 test2");
		searchQuery.setKeywords(Arrays.asList(new Keyword("test"), new Keyword("test1"), new Keyword("test2")));

		// when
		final String query = disMaxFreeTextQueryBuilder.buildQuery(searchQuery);

		// then
		final String expectedQuery = "{!multiMaxScore tie=0.0}"
				+ "((name_text_de:test~10^50.0) OR (description_text_de:test~11^55.0)) OR "
				+ "((name_text_de:test1~10^50.0) OR (description_text_de:test1~11^55.0)) OR "
				+ "((name_text_de:test2~10^50.0) OR (description_text_de:test2~11^55.0))";

		Assert.assertEquals(expectedQuery, query);
	}

	@Test
	public void testFreeTextWildcardQuery() throws FacetSearchException
	{
		// given
		searchQuery.addFreeTextWildcardQuery(NAME_FIELD, 0, WildcardType.POSTFIX, Float.valueOf(25));
		searchQuery.addFreeTextWildcardQuery(DESCRIPTION_FIELD, 0, WildcardType.PREFIX, Float.valueOf(26));
		searchQuery.addFreeTextWildcardQuery(SUMMARY_FIELD, 0, WildcardType.PREFIX_AND_POSTFIX, Float.valueOf(27));

		searchQuery.setUserQuery("test test1 test2");
		searchQuery.setKeywords(Arrays.asList(new Keyword("test"), new Keyword("test1"), new Keyword("test2")));

		// when
		final String query = disMaxFreeTextQueryBuilder.buildQuery(searchQuery);

		// then
		final String expectedQuery = "{!multiMaxScore tie=0.0}"
				+ "((name_text_de:test*^25.0) OR (description_text_de:*test^26.0) OR (summary_text_de:*test*^27.0)) OR "
				+ "((name_text_de:test1*^25.0) OR (description_text_de:*test1^26.0) OR (summary_text_de:*test1*^27.0)) OR "
				+ "((name_text_de:test2*^25.0) OR (description_text_de:*test2^26.0) OR (summary_text_de:*test2*^27.0))";

		Assert.assertEquals(expectedQuery, query);
	}

	@Test
	public void testFreeTextMinTermLength() throws FacetSearchException
	{
		// given
		searchQuery.addFreeTextWildcardQuery(NAME_FIELD, 5, WildcardType.POSTFIX, Float.valueOf(25));

		searchQuery.setUserQuery("test test1 test2");
		searchQuery.setKeywords(Arrays.asList(new Keyword("test"), new Keyword("test1"), new Keyword("test2")));

		// when
		final String query = disMaxFreeTextQueryBuilder.buildQuery(searchQuery);

		// then
		final String expectedQuery = "{!multiMaxScore tie=0.0}((name_text_de:test1*^25.0)) OR ((name_text_de:test2*^25.0))";

		Assert.assertEquals(expectedQuery, query);
	}
}
