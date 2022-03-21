/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.customerticketingocc.controllers;

import static de.hybris.platform.customerticketingocc.constants.SecuredAccessConstants.ROLE_CUSTOMERGROUP;
import static de.hybris.platform.customerticketingocc.constants.SecuredAccessConstants.ROLE_CUSTOMERMANAGERGROUP;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import de.hybris.platform.commerceservices.request.mapping.annotation.ApiVersion;
import de.hybris.platform.commerceservices.search.pagedata.PageableData;
import de.hybris.platform.commerceservices.search.pagedata.SearchPageData;
import de.hybris.platform.customerticketingfacades.TicketFacade;
import de.hybris.platform.customerticketingfacades.data.StatusData;
import de.hybris.platform.customerticketingfacades.data.TicketAssociatedData;
import de.hybris.platform.customerticketingfacades.data.TicketCategory;
import de.hybris.platform.customerticketingfacades.data.TicketData;
import de.hybris.platform.customerticketingocc.dto.ticket.TicketAssociatedObjectListWsDTO;
import de.hybris.platform.customerticketingocc.dto.ticket.TicketAssociatedObjectWsDTO;
import de.hybris.platform.customerticketingocc.dto.ticket.TicketCategoryListWsDTO;
import de.hybris.platform.customerticketingocc.dto.ticket.TicketCategoryWsDTO;
import de.hybris.platform.customerticketingocc.dto.ticket.TicketEventWsDTO;
import de.hybris.platform.customerticketingocc.dto.ticket.TicketListWsDTO;
import de.hybris.platform.customerticketingocc.dto.ticket.TicketStarterWsDTO;
import de.hybris.platform.customerticketingocc.dto.ticket.TicketWsDTO;
import de.hybris.platform.customerticketingocc.errors.exceptions.TicketCreateException;
import de.hybris.platform.customerticketingocc.errors.exceptions.TicketEventCreateException;
import de.hybris.platform.servicelayer.exceptions.ModelSavingException;
import de.hybris.platform.servicelayer.exceptions.UnknownIdentifierException;
import de.hybris.platform.servicelayer.interceptor.InterceptorException;
import de.hybris.platform.webservicescommons.errors.exceptions.NotFoundException;
import de.hybris.platform.webservicescommons.swagger.ApiBaseSiteIdAndUserIdParam;
import de.hybris.platform.webservicescommons.swagger.ApiBaseSiteIdParam;
import de.hybris.platform.webservicescommons.swagger.ApiFieldsParam;

import javax.annotation.Resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;


@RestController
@RequestMapping(value = "/{baseSiteId}")
@ApiVersion("v2")
@Api(tags = "Tickets")
public class TicketsController extends TicketBaseController
{
	private static final Logger LOG = LoggerFactory.getLogger(TicketsController.class);

	@Resource
	private TicketFacade ticketFacade;

	@Resource
	private Validator ticketStarterValidator;

	@Resource
	private Validator ticketEventValidator;

	@GetMapping(value="/users/{userId}/tickets", produces = APPLICATION_JSON_VALUE)
	@ResponseStatus(OK)
	@Secured({ ROLE_CUSTOMERGROUP, ROLE_CUSTOMERMANAGERGROUP })
	@ApiOperation(value = "Get all tickets for user", notes = "Returns history data for all tickets requested by a specified user for a specified base store. The response can display the results across multiple pages, if required.", nickname = "getTickets")
	@ApiBaseSiteIdAndUserIdParam
	public TicketListWsDTO getTickets(
			@ApiParam(value = "The current result page requested.", required = false) @RequestParam(value = "currentPage", defaultValue = DEFAULT_CURRENT_PAGE) final int currentPage,
			@ApiParam(value = "The number of results returned per page.", required = false) @RequestParam(value = "pageSize", defaultValue = DEFAULT_PAGE_SIZE) final int pageSize,
			@ApiParam(value = "Sorting method applied to the returned results. Currently, byDate and byTicketId are supported.", required = false) @RequestParam(value = "sort", defaultValue = "byDate") final String sort,
			@ApiFieldsParam(defaultValue = "BASIC") @RequestParam(required = false, defaultValue = "BASIC") final String fields)
	{
		final PageableData pageableData = new PageableData();
		pageableData.setPageSize(pageSize);
		pageableData.setCurrentPage(currentPage);
		pageableData.setSort(sort);
		final SearchPageData<TicketData> searchPageData = getTicketFacade().getTickets(pageableData);
		return getDataMapper().map(searchPageData, TicketListWsDTO.class, fields);
	}

	@PostMapping(value="/users/{userId}/tickets", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	@ResponseStatus(CREATED)
	@Secured({ ROLE_CUSTOMERGROUP })
	@ApiOperation(value = "Create a ticket", nickname = "createTicket")
	@ApiBaseSiteIdAndUserIdParam
	public TicketWsDTO createTicket(
			@RequestBody final TicketStarterWsDTO ticketStarter,
			@ApiFieldsParam @RequestParam(required = false, defaultValue = "DEFAULT") final String fields)
	{
		validate(ticketStarter, "ticketStarter", getTicketStarterValidator());
		final TicketData ticketData = getDataMapper().map(ticketStarter, TicketData.class);
		final TicketData createdTicketData;
		try
		{
			createdTicketData = getTicketFacade().createTicket(ticketData);
		}
		catch (final RuntimeException re)
		{
			throw new TicketCreateException(getErrorMessage(re).orElse("Encountered an error when creating a new ticket"), null, re);
		}
		final TicketData returnedTicketData = getTicketFacade().getTicket(createdTicketData.getId());
		return getDataMapper().map(returnedTicketData, TicketWsDTO.class, fields);
	}

	@GetMapping(value = "/users/{userId}/tickets/{ticketId}", produces = APPLICATION_JSON_VALUE)
	@ResponseStatus(OK)
	@Secured({ ROLE_CUSTOMERGROUP, ROLE_CUSTOMERMANAGERGROUP })
	@ApiOperation(value = "Get a ticket by ticket id.", notes = "", nickname = "getTicket")
	@ApiBaseSiteIdAndUserIdParam
	public TicketWsDTO getTicket(
			@ApiParam(value = "Ticket Identifier", required = true) @PathVariable final String ticketId,
			@ApiFieldsParam @RequestParam(required = false, defaultValue = "DEFAULT") final String fields)
	{
		final TicketData ticketData = getTicketById(ticketId).orElseThrow(() -> new NotFoundException("Ticket not found for the given ID " + ticketId, "notFound"));
		return getDataMapper().map(ticketData, TicketWsDTO.class, fields);
	}

	@PostMapping(value = "/users/{userId}/tickets/{ticketId}/events", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
	@ResponseStatus(CREATED)
	@Secured({ ROLE_CUSTOMERGROUP })
	@ApiOperation(value = "Create a new ticket event.", notes = "Create new ticket event with property message(required) and toStatus(optional).", nickname = "createTicketEvent")
	@ApiBaseSiteIdAndUserIdParam
	public void createTicketEvent(
			@ApiParam(value = "Ticket Identifier", required = true) @PathVariable final String ticketId,
			@RequestBody final TicketEventWsDTO ticketEvent)
	{
		validate(ticketEvent, "ticketEvent", getTicketEventValidator());
		final TicketData ticketData = getDataMapper().map(ticketEvent, TicketData.class);
		ticketData.setId(ticketId);
		final TicketData storedTicketData = getTicketById(ticketId).orElseThrow(() -> new TicketEventCreateException("Ticket not found for the given ID " + ticketId, "notFound"));

		if (ticketData.getStatus() == null)
		{
			ticketData.setStatus(storedTicketData.getStatus());
		}
		else if (storedTicketData.getStatus() != null && !ticketData.getStatus().getId().equals(storedTicketData.getStatus().getId()))
		{
			// ensure the new status is allowed
			final List<StatusData> availableStatuses = storedTicketData.getAvailableStatusTransitions();
			if (availableStatuses != null)
			{
				final String expectedStatusId = ticketData.getStatus().getId();
				final Optional<StatusData> allowedState = availableStatuses.stream().filter(data -> data.getId().equals(expectedStatusId)).findAny();
				if (allowedState.isEmpty())
				{
					throw new TicketEventCreateException("Unable to change ticket status to " + ticketData.getStatus().getId() + " for the ticket " + ticketId, null);
				}
			}
		}
		try
		{
			ticketFacade.updateTicket(ticketData);
		}
		catch (final RuntimeException re)
		{
			throw new TicketEventCreateException(getErrorMessage(re).orElse("Unable to add ticketEvent to the ticket with given ID " + ticketId), null ,re);
		}
	}

	@GetMapping(value = "/ticketCategories", produces = APPLICATION_JSON_VALUE)
	@ResponseStatus(OK)
	@ApiOperation(value = "Get all ticket categories.", nickname = "getTicketCategories")
	@ApiBaseSiteIdParam
	public TicketCategoryListWsDTO getTicketCategories()
	{
		TicketCategoryListWsDTO ticketCategoryList = new TicketCategoryListWsDTO();
		final List<TicketCategory> ticketCategories = getTicketFacade().getTicketCategories();
		final List<TicketCategoryWsDTO> mappedTicketCategories = getDataMapper().mapAsList(ticketCategories, TicketCategoryWsDTO.class, null);
		ticketCategoryList.setTicketCategories(mappedTicketCategories);
		return ticketCategoryList;
	}

	@GetMapping(value = "/users/{userId}/ticketAssociatedObjects", produces = APPLICATION_JSON_VALUE)
	@ResponseStatus(OK)
	@Secured({ ROLE_CUSTOMERGROUP })
	@ApiOperation(value = "Get order and cart objects that can be associated with a ticket for the current user.", nickname = "getTicketAssociatedObjects")
	@ApiBaseSiteIdAndUserIdParam
	public TicketAssociatedObjectListWsDTO getTicketAssociatedObjects()
	{
		final Map<String, List<TicketAssociatedData>> associatedObjectDataMap = getTicketFacade().getAssociatedToObjects();
		final List<TicketAssociatedData> ticketAssociatedDataList = new ArrayList<>();
		for (List<TicketAssociatedData> value : associatedObjectDataMap.values())
		{
			ticketAssociatedDataList.addAll(value);
		}
		final List<TicketAssociatedObjectWsDTO> ticketAssociatedObjects = getDataMapper()
				.mapAsList(ticketAssociatedDataList, TicketAssociatedObjectWsDTO.class, null);
		final TicketAssociatedObjectListWsDTO ticketAssociatedObjectListWsDTO = new TicketAssociatedObjectListWsDTO();
		ticketAssociatedObjectListWsDTO.setTicketAssociatedObjects(ticketAssociatedObjects);
		return ticketAssociatedObjectListWsDTO;
	}

	protected Optional<TicketData> getTicketById(final String ticketId)
	{
		try
		{
			return Optional.ofNullable(getTicketFacade().getTicket(ticketId));
		}
		catch (final RuntimeException re)
		{
			LOG.error(re.getMessage(), re);
		}
		return Optional.empty();
	}

	public TicketFacade getTicketFacade()
	{
		return ticketFacade;
	}

	public void setTicketFacade(final TicketFacade ticketFacade)
	{
		this.ticketFacade = ticketFacade;
	}

	public Validator getTicketStarterValidator()
	{
		return ticketStarterValidator;
	}

	public void setTicketStarterValidator(final Validator ticketStarterValidator)
	{
		this.ticketStarterValidator = ticketStarterValidator;
	}

	public Validator getTicketEventValidator()
	{
		return ticketEventValidator;
	}

	public void setTicketEventValidator(final Validator ticketEventValidator)
	{
		this.ticketEventValidator = ticketEventValidator;
	}

	private Optional<String> getErrorMessage(final RuntimeException exception)
	{
		if (exception instanceof ModelSavingException && exception.getCause() instanceof InterceptorException)
		{
			final String causeMessage = exception.getCause().getMessage();
			final String message = causeMessage.substring(causeMessage.indexOf(':') + 1)
					.replace("\"headline\"", "\"Subject\"")
					.replace("\"text\"", "\"Message\"")
					.trim();
			return Optional.of(message);
		}
		if (exception instanceof UnknownIdentifierException)
		{
			return Optional.of(exception.getMessage());
		}
		return Optional.empty();
	}
}
