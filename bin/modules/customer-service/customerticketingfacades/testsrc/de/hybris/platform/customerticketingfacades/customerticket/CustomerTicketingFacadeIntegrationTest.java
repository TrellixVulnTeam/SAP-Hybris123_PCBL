/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.customerticketingfacades.customerticket;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import de.hybris.platform.basecommerce.model.site.BaseSiteModel;
import de.hybris.platform.commerceservices.search.pagedata.PageableData;
import de.hybris.platform.commerceservices.search.pagedata.SearchPageData;
import de.hybris.platform.customerticketingfacades.TicketFacade;
import de.hybris.platform.customerticketingfacades.data.StatusData;
import de.hybris.platform.customerticketingfacades.data.TicketCategory;
import de.hybris.platform.customerticketingfacades.data.TicketData;
import de.hybris.platform.servicelayer.user.UserService;
import de.hybris.platform.site.BaseSiteService;
import de.hybris.platform.ticket.jalo.AbstractTicketsystemTest;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.junit.Before;
import org.junit.Test;


/**
 * Test cases for the Customer Ticket Facade
 *
 */
public class CustomerTicketingFacadeIntegrationTest extends AbstractTicketsystemTest
{
	private static final String SUBJECT = "Ticket subject";
	private static final String NOTE = "Hello";
	private static final int DEFAULT_NUMBER_OF_TICKETS = 2;

	@Resource(name = "userService")
	private UserService userService;

	@Resource(name = "statusMapping")
	private Map<String, StatusData> statusMapping;

	@Resource(name = "validTransitions")
	private Map<StatusData, List<StatusData>> validTransitions;

	@Resource(name = "ticket_open")
	private StatusData open;

	@Resource(name = "defaultTicketFacade")
	private TicketFacade ticketFacade;

	@Resource(name = "baseSiteService")
	private BaseSiteService baseSiteService;

	@Override
	@Before
	public void setUp() throws Exception
	{
		super.setUp();

		importCsv("/customerticketingfacades/test/testCustomerTicketing.impex", "UTF-8");

		final BaseSiteModel baseSite = baseSiteService.getBaseSiteForUID("testSite");
		baseSiteService.setCurrentBaseSite(baseSite, true);

		userService.setCurrentUser(testUser);

		createTickets(DEFAULT_NUMBER_OF_TICKETS);
	}

	@Test
	public void testCreateTicket()
	{
		final TicketData ticketData = new TicketData();
		ticketData.setSubject(SUBJECT);
		ticketData.setMessage(NOTE);
		ticketData.setTicketCategory(TicketCategory.ENQUIRY);
		ticketData.setCustomerId(testUser.getUid());
		ticketData.setStatus(open);

		final TicketData ticketData1 = ticketFacade.createTicket(ticketData);
		assertNotNull(ticketData1.getId());

		assertEquals(ticketData1.getStatus().getId(), open.getId());
		assertEquals(ticketData1.getSubject(), SUBJECT);

		final TicketData ticket = ticketFacade.getTicket(ticketData1.getId());

		assertNotNull(ticket);
		assertEquals(ticket.getSubject(), SUBJECT);
		if (ticket.getTicketEvents() == null || ticket.getTicketEvents().isEmpty())
		{
			assertTrue(ticket.getMessageHistory().contains(NOTE));
		}
		else
		{
			assertTrue(ticket.getTicketEvents().get(0).getText().contains(NOTE));
		}
	}

	@Test
	public void testGetTicketsForCustomerOrderByModifiedTime()
	{
		final PageableData pageableData = new PageableData();
		pageableData.setPageSize(DEFAULT_NUMBER_OF_TICKETS);
		pageableData.setCurrentPage(0);
		pageableData.setSort("byDate");

		final SearchPageData<TicketData> tickets = ticketFacade.getTickets(pageableData);

		// first one must be after second one and so on. So latest on bottom, newest on top
		assertTrue(
				tickets.getResults().get(0).getLastModificationDate().after(tickets.getResults().get(1).getLastModificationDate()));
	}

	@Test
	public void testGetTicketsIncludesTicketCategory()
	{
		final PageableData pageableData = new PageableData();
		pageableData.setPageSize(DEFAULT_NUMBER_OF_TICKETS);
		pageableData.setCurrentPage(0);

		final SearchPageData<TicketData> ticketsSearchPageData = ticketFacade.getTickets(pageableData);
		final List<TicketData> tickets = ticketsSearchPageData.getResults();

		assertEquals(DEFAULT_NUMBER_OF_TICKETS, tickets.size());

		for (final TicketData ticket: tickets)
		{
			assertNotNull(ticket.getTicketCategory());
		}

	}

	@Test
	public void testUpdateTicketShouldKeepOldStatusIfNewStatusIsNull()
	{
		final String TICKET_STATUS_OPEN = "OPEN";

		final PageableData pageableData = new PageableData();
		pageableData.setPageSize(DEFAULT_NUMBER_OF_TICKETS);
		pageableData.setCurrentPage(0);
		final SearchPageData<TicketData> tickets = ticketFacade.getTickets(pageableData);

		final TicketData ticket = tickets.getResults().get(0);
		assertTrue(TICKET_STATUS_OPEN.equals(ticket.getStatus().getId()));
		final String ticketId = ticket.getId();

		final TicketData ticketData = new TicketData();
		ticketData.setId(ticketId);
		ticketData.setStatus(null);
		ticketData.setMessage("Sorry, forgot the status. But should be ok.");

		ticketFacade.updateTicket(ticketData);
		final TicketData updatedTicket = ticketFacade.getTicket(ticketId);

		assertTrue(TICKET_STATUS_OPEN.equals(updatedTicket.getStatus().getId()));
	}

	private void createTickets(final Integer number)
	{
		for (int i = 0; i < number; i++)
		{
			final TicketData ticketData = new TicketData();
			ticketData.setSubject(SUBJECT);
			ticketData.setMessage(NOTE);
			ticketData.setTicketCategory(TicketCategory.COMPLAINT);
			ticketData.setCustomerId(testUser.getUid());
			final TicketData createdTicketData = ticketFacade.createTicket(ticketData);

			assertNotNull(createdTicketData.getId());
		}
	}
}
