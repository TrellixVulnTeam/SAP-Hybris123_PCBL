/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cms2.relateditems.visitors;

import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.when;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.cms2.model.contents.CMSItemModel;
import de.hybris.platform.cms2.model.pages.AbstractPageModel;
import de.hybris.platform.cms2.model.relations.ContentSlotForPageModel;
import de.hybris.platform.cms2.relateditems.visitors.page.ContentSlotForPageRelatedItemVisitor;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;


@UnitTest
@RunWith(MockitoJUnitRunner.class)
public class ContentSlotForPageRelatedItemVisitorTest
{
	@InjectMocks
	private ContentSlotForPageRelatedItemVisitor contentSlotForPageRelatedPageVisitor;

	@Mock
	private ContentSlotForPageModel contentSlotForPageModel;
	@Mock
	private AbstractPageModel abstractPageModel;

	@Test
	public void shouldReturnRelatedPage()
	{
		// GIVEN
		when(contentSlotForPageModel.getPage()).thenReturn(abstractPageModel);

		// WHEN
		final List<CMSItemModel> relatedItems = contentSlotForPageRelatedPageVisitor.getRelatedItems(contentSlotForPageModel);

		// THEN
		assertThat(relatedItems, hasSize(1));
		assertThat(relatedItems, contains(abstractPageModel));
	}
}
