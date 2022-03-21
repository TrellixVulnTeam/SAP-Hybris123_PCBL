/**
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package com.hybris.merchandising.controller;

import de.hybris.platform.cmswebservices.security.IsAuthorizedCmsManager;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hybris.merchandising.dto.DropdownElement;
import com.hybris.merchandising.model.Strategy;
import com.hybris.merchandising.service.StrategyService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * StrategyController is a simple REST controller exposing an end point to allow
 * us to retrieve the configured Strategies for a given tenant.
 */
@RestController
@IsAuthorizedCmsManager
@Api(tags = "Strategies")
@ApiResponses(value = {
		@ApiResponse(code = 400, message = "Bad Request"),
		@ApiResponse(code = 401, message = "Unauthorized"),
		@ApiResponse(code = 403, message = "Forbidden. Have no access to this method") })
public class StrategyController
{
	@Autowired
	protected StrategyService strategyService;

	/**
	 * Retrieves a list of configured {@link Strategy} objects from Strategy
	 * service.
	 *
	 * @param currentPage - optional page number (e.g. 1).
	 * @param pageSize    - optional page size (e.g. 10).
	 * @return a list of configured {@link Strategy}.
	 */
	@RequestMapping(value = "/v1/{siteId}/strategies", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation(nickname = "getStrategies", value = "Retrieves a list of configured strategy objects from CDS Strategy Service.", produces = "application/json")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "siteId", value = "Base site identifier", required = true, dataType = "string", paramType = "path")
	})
	public Map<String, List<DropdownElement>> getStrategies(
			@ApiParam(value = "Current page number", defaultValue = "0") @RequestParam(value = "currentPage", defaultValue = "0", required = false) Integer currentPage,
			@ApiParam(value = "Page size", defaultValue = "10") @RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize)
	{
		final Map<String, List<DropdownElement>> strategies = new HashMap<>();
		if (currentPage == null)
		{
			currentPage = Integer.valueOf(0);
		}
		if (pageSize == null)
		{
			pageSize = Integer.valueOf(10);
		}

		strategies.put("options", strategyService.getStrategies(currentPage + 1, pageSize)
		                                         .stream()
		                                         .filter(Objects::nonNull)
		                                         .map(strategy -> new DropdownElement(strategy.getId(), strategy.getName()))
		                                         .collect(Collectors.toList()));
		return strategies;
	}

	@RequestMapping(value = "/v1/{siteId}/strategies/{id}", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation(nickname = "getStrategy", value = "Retrieves information about strategy from CDS Strategy Service.", produces = "application/json")
	@ApiResponses(value = { @ApiResponse(code = 404, message = "Strategy with given id doesn't exist") })
	@ApiImplicitParams({
		@ApiImplicitParam(name = "siteId", value = "Base site identifier", required = true, dataType = "string", paramType = "path")
	})
	public DropdownElement getStrategy(@ApiParam(value = "Strategy identifier", required = true) @PathVariable final String id)
	{
		final Strategy strategy = strategyService.getStrategy(id);
		if (strategy != null)
		{
			return new DropdownElement(strategy.getId(), strategy.getName());
		}
		return new DropdownElement("", "");
	}
}
