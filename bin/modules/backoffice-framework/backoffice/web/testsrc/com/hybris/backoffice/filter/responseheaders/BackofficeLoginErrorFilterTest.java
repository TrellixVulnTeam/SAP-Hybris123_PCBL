/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved
 */
package com.hybris.backoffice.filter.responseheaders;

import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import de.hybris.bootstrap.annotations.UnitTest;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;


@RunWith(MockitoJUnitRunner.class)
@UnitTest
public class BackofficeLoginErrorFilterTest
{
    @Mock
	 HttpServletRequest servletRequest;
    @Mock
	 HttpServletResponse servletResponse;
    @Mock
    FilterChain filterChain;

    @InjectMocks
	 private final BackofficeLoginErrorFilter backofficeLoginErrorFilter = new BackofficeLoginErrorFilter();

	 private static final String LOGIN_ERROR = "login_error";
	 private static final String ERROR_CODE_HEADER = "X-BO-Login-Error-Code";


	 @Test
	 public void shouldDoNothingIfNoLoginError() throws IOException, ServletException
    {
		 when(servletRequest.getParameter(LOGIN_ERROR)).thenReturn(null);

		 backofficeLoginErrorFilter.doFilter(servletRequest, servletResponse, filterChain);

		 verify(servletResponse, never()).setHeader(anyString(), anyString());
    }

	 @Test
	 public void shouldAddLoginErrorWhenErrorHappens() throws IOException, ServletException
	 {
		 final String errorCode = "1";
		 when(servletRequest.getParameter(LOGIN_ERROR)).thenReturn(errorCode);

		 backofficeLoginErrorFilter.doFilter(servletRequest, servletResponse, filterChain);

		 verify(servletResponse, times(1)).setHeader(ERROR_CODE_HEADER, errorCode);
	 }

}
