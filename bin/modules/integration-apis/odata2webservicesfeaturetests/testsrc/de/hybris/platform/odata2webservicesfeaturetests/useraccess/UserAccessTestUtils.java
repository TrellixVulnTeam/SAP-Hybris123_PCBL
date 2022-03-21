/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.odata2webservicesfeaturetests.useraccess;

import de.hybris.platform.core.model.user.UserModel;
import de.hybris.platform.impex.jalo.ImpExException;
import de.hybris.platform.integrationservices.util.IntegrationTestUtil;
import de.hybris.platform.odata2webservices.constants.Odata2webservicesConstants;
import de.hybris.platform.odata2webservicesfeaturetests.ws.BasicAuthRequestBuilder;

import org.springframework.http.MediaType;

public class UserAccessTestUtils
{
	protected static final String ADMIN_USER = "userintegrationadmin";
	protected static final String PASSWORD = "password";

	public static void givenUserExistsWithUidAndGroups(final String uid, final String password, final String groups)
		    throws ImpExException
    {
        createUser(uid, password, groups);
    }

    public static void givenUserExistsWithUidAndGroups(final String uid, final String password) throws ImpExException
    {
        UserAccessTestUtils.givenUserExistsWithUidAndGroups(uid, password, "");
    }

    public static void givenUserExistsWithUidAndGroups(final String uid) throws ImpExException
    {
        UserAccessTestUtils.givenUserExistsWithUidAndGroups(uid, PASSWORD, "");
    }

    public static BasicAuthRequestBuilder basicAuthRequest(final String path)
    {
        return new BasicAuthRequestBuilder().extensionName(Odata2webservicesConstants.EXTENSIONNAME)
                                            .accept(MediaType.APPLICATION_XML_VALUE)
                                            .path(path);
    }

    public static void createUser(final String uid, final String pwd, final String groups) throws ImpExException
    {
        IntegrationTestUtil.importImpEx(
                "$password=@password[translator = de.hybris.platform.impex.jalo.translators.UserPasswordTranslator]",
                "INSERT_UPDATE Employee; UID[unique = true] ; groups(uid)[mode = append] ;$password",
                "                      ; " + uid + "        ; " + groups + "             ;*:" + pwd);
    }

    public static void deleteUser(final String uid)
    {
        IntegrationTestUtil.removeSafely(UserModel.class, user -> user.getUid().equals(uid));
    }
}
