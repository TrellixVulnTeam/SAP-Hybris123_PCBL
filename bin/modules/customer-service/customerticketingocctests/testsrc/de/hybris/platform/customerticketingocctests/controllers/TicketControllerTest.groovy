/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.customerticketingocctests.controllers

import static groovyx.net.http.ContentType.JSON
import static groovyx.net.http.ContentType.URLENC

import static org.apache.http.HttpStatus.SC_BAD_REQUEST
import static org.apache.http.HttpStatus.SC_CREATED
import static org.apache.http.HttpStatus.SC_FORBIDDEN
import static org.apache.http.HttpStatus.SC_NOT_FOUND
import static org.apache.http.HttpStatus.SC_OK
import static org.apache.http.HttpStatus.SC_UNAUTHORIZED

import com.fasterxml.jackson.databind.ObjectMapper
import de.hybris.bootstrap.annotations.ManualTest
import de.hybris.platform.commercewebservicestests.test.groovy.webservicetests.v2.spock.users.AbstractUserTest
import spock.lang.Unroll

@ManualTest
@Unroll
class TicketControllerTest extends AbstractUserTest {

    static final MARK_RIVERS = ["id": "mark.rivers@rustic-hw.com", "password": "1234"]
    static final WILLIAM_HUNTER = ["id": "william.hunter@rustic-hw.com", "password": "1234"]
    static final CUSTOMER_MANAGER_USER = ["id": "asagent@nakano.com", "password": "1234"]
    static final Integer PAGE_SIZE = 25
    static final String CURRENT_USER = "current"
    static final String ANONYMOUS_USER = "anonymous"
    static final String PRODUCT_CODE = "1225694"
    static final Integer ADD_PRODUCT_QUANTITY = 1
    static final String ASSOCIATED_TO_TYPE_CART = "Cart"
    static final String ASSOCIATED_TO_TYPE_ORDER = "Order"
    static final String TICKET_CATEGORY_ENQUIRY = "ENQUIRY"
    static final String TICKET_CATEGORY_PROBLEM = "PROBLEM"
    static final String TICKET_CATEGORY_COMPLAINT = "COMPLAINT"
    static final String TICKET_STATUS_CLOSED = "CLOSED"
    static final String TICKET_STATUS_OPEN = "OPEN"
    static final String TICKET_STATUS_INPROCESS = "INPROCESS"
    static final String INVALID_TICKET_STATUS = "invalid-ticket-status"
    static final String NON_EXISTING_ORDER = "non-existing-order"

    private final ObjectMapper objectMapper = new ObjectMapper();

    // Get all tickets
    def "Customer should be able to get an empty list of tickets if he has not created any tickets"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, WILLIAM_HUNTER)

        when: "he requests to get all tickets"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/current/tickets",
            query: null,
            contentType: JSON,
            requestContentType: JSON)

        then: "an empty list of the tickets is returned"
        with(response) {
            status == SC_OK
            isEmpty(data.tickets)
            data.pagination.totalResults == 0
        }
    }

    def "Customer should be able to get all his tickets when using #scenario"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get all tickets"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/" + userId + "/tickets",
            query: ['pageSize': PAGE_SIZE],
            contentType: JSON,
            requestContentType: JSON)

        then: "a paginated list of the tickets is returned"
        with(response) {
            status == SC_OK
            data.pagination.currentPage == 0
            data.pagination.pageSize == PAGE_SIZE
            data.pagination.sort == "byDate"
            data.tickets.size() == 4
            for( ticket in data.tickets ) {
                ticket.status.id == "OPEN"
                ticket.status.name == "Open"
                ticket.ticketCategory.id == ticket.ticketCategory.name.toUpperCase()
            }
        }
        where:
        scenario                   | userId
        "userId matches the token" | MARK_RIVERS.id
        "current as userId"        | CURRENT_USER
    }

    def "Customer should be able to get all his tickets sorted by the specified sort field"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get all tickets sorted by the ticket id"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/current/tickets",
            query: ['sort': 'byTicketId'],
            contentType: JSON,
            requestContentType: JSON)

        then: "a paginated list of the tickets sorted by the ticket id is returned"
        with(response) {
            status == SC_OK
            data.pagination.currentPage == 0
            data.pagination.pageSize == 20
            data.pagination.sort == "byTicketId"
            data.sorts.size() == 2
            for (sort in data.sorts) {
                if (sort.code == "byTicketId") {
                    sort.selected == true
                } else if (sort.code == "byDate") {
                    sort.selected == false
                }
            }
            data.tickets.size() > 0
        }
    }

    def "Customer should be able to get all his tickets with the specified fields"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get all tickets sorted by the ticket id"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/" + MARK_RIVERS.id + "/tickets",
            query: ['fields': 'pagination(currentPage),tickets(id,createdAt,ticketCategory(id),status(name))'],
            contentType: JSON,
            requestContentType: JSON)

        then: "a paginated list of the tickets with specified field is returned"
        with(response) {
            status == SC_OK
            data.size() == 2
            data.tickets.size() > 0
            data.pagination.size() == 1
            data.pagination.currentPage == 0
            for( ticket in data.tickets ) {
                ticket.size() == 4   // id, createdAt, ticketCategory, status
                isNotEmpty(ticket.id)
                isNotEmpty(ticket.createdAt)
                ticket.ticketCategory.size() == 1
                isNotEmpty(ticket.ticketCategory.id)
                ticket.status.size() == 1
                ticket.status.name == "Open"
            }
        }
    }

    def "Customer should be able to get all his tickets with fields value #fields to specify the content he wants"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get tickets"
        def response = restClient.get(
                path: getBasePathWithSite() + "/users/" + MARK_RIVERS.id + "/tickets",
                query: ["fields": fields],
                contentType: JSON,
                requestContentType: JSON)

        then: "a paginated list of the tickets with specified field is returned"
        with(response) {
            status == SC_OK
            data.size() == 3
            data.tickets.size() > 0
            data.pagination.size() == 5
            data.pagination.currentPage == 0
            for( ticket in data.tickets ) {
                ticket.size() == 6
                isNotEmpty(ticket.id)
                isNotEmpty(ticket.subject)
                isNotEmpty(ticket.createdAt)
                isNotEmpty(ticket.modifiedAt)
                ticket.ticketCategory.size() == 2
                isNotEmpty(ticket.ticketCategory.id)
                isNotEmpty(ticket.ticketCategory.name)
                ticket.status.size() == 2
                isNotEmpty(ticket.status.id)
                isNotEmpty(ticket.status.name)
            }
        }

        //when fields is BASIC,DEFAULT,FULL same value returns because DEFAULT and FULL cannot get more data from facade
        //when fields is empty, will use BASIC as default value for fields
        where:
        fields << ["", "BASIC", "DEFAULT", "FULL"]
    }


    def "Customer manager should be able to get a customer's tickets when using the customer's userId"() {
        given: "a registered and logged in customer manager"
        authorizeCustomerManager(restClient, CUSTOMER_MANAGER_USER)

        when: "he requests to get all tickets of a customer"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/" + MARK_RIVERS.id + "/tickets",
            query: null,
            contentType: JSON,
            requestContentType: JSON)

        then: "a paginated list of the tickets is returned"
        with(response) {
            status == SC_OK
            data.pagination.currentPage == 0
            data.pagination.pageSize == 20
            data.tickets.size() > 0
        }
    }

    def "Customer manager should not be able to get tickets when using current as the userID"() {
        given: "a registered and logged in customer manager"
        authorizeCustomerManager(restClient, CUSTOMER_MANAGER_USER)

        when: "he requests to get all tickets of a customer"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/current/tickets",
            query: null,
            contentType: JSON,
            requestContentType: JSON)

        then: "fail to get tickets"
        with(response) {
            status == SC_BAD_REQUEST
            data.errors[0].message == "Cannot find user with propertyValue 'current'"
            data.errors[0].type == "UnknownIdentifierError"
        }
    }

    def "Customer should fail to get tickets when using a non-existent baseSiteId"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get all tickets with a non-existent baseSiteId"
        def response = restClient.get(
            path: getBasePath() + "/WRONG_BASE_SITE_ID/users/current/tickets",
            query: null,
            contentType: JSON,
            requestContentType: JSON)

        then: "fail to get tickets"
        with(response) {
            status == SC_BAD_REQUEST
            data.errors[0].message == "Base site WRONG_BASE_SITE_ID doesn't exist"
            data.errors[0].type == "InvalidResourceError"
        }
    }

    def "Customer should fail to get tickets when not providing the baseSiteId"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get all tickets without providing the baseSiteId"
        def response = restClient.get(
            path: getBasePath() + "/users/current/tickets",
            query: null,
            contentType: JSON,
            requestContentType: JSON)

        then: "fail to get tickets"
        with(response) {
            status == SC_BAD_REQUEST
            data.errors[0].message == "Base site users doesn't exist"
            data.errors[0].type == "InvalidResourceError"
        }
    }

    def "An anonymous user (#scenario) should not be able to get tickets for #ticketsOwner user"() {
        given: "an anonymous user"
        authorizationMethod(restClient)

        when: "he requests to get all tickets"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/" + ticketsOwner + "/tickets",
            query: null,
            contentType: JSON,
            requestContentType: JSON)

        then: "fail to get tickets"
        with(response) {
            status == statusCode
            data.errors[0].message == errorMessage
            data.errors[0].type == errorType
        }

        where:
        scenario                              | ticketsOwner   | authorizationMethod          | statusCode       | errorType                | errorMessage
        "not sending any Authorization Token" | CURRENT_USER   | this.&removeAuthorization    | SC_UNAUTHORIZED  | "UnauthorizedError"      | "Full authentication is required to access this resource"
        "not sending any Authorization Token" | ANONYMOUS_USER | this.&removeAuthorization    | SC_UNAUTHORIZED  | "AccessDeniedError"      | "Access is denied"
        "not sending any Authorization Token" | MARK_RIVERS.id | this.&removeAuthorization    | SC_UNAUTHORIZED  | "UnauthorizedError"      | "Full authentication is required to access this resource"
        "as a TRUSTED_CLIENT"                 | CURRENT_USER   | this.&authorizeTrustedClient | SC_BAD_REQUEST   | "UnknownIdentifierError" | "Cannot find user with propertyValue 'current'"
        "as a TRUSTED_CLIENT"                 | ANONYMOUS_USER | this.&authorizeTrustedClient | SC_UNAUTHORIZED  | "AccessDeniedError"      | "Access is denied"
        "as a TRUSTED_CLIENT"                 | MARK_RIVERS.id | this.&authorizeTrustedClient | SC_UNAUTHORIZED  | "AccessDeniedError"      | "Access is denied"
    }

    def "Customer should not be able to get the tickets of #ticketOwner user"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get all tickets"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/" + ticketOwner + "/tickets",
            query: null,
            contentType: JSON,
            requestContentType: JSON)

        then: "fail to get tickets"
        with(response) {
            status == SC_FORBIDDEN
            data.errors[0].message == "Access is denied"
            data.errors[0].type == "ForbiddenError"
        }
        where:
        ticketOwner << [ANONYMOUS_USER, WILLIAM_HUNTER.id]
    }

    def "Customer manager should be able to get the tickets of an anonymous user"() {
        given: "a registered and logged in customer manager"
        authorizeCustomerManager(restClient, CUSTOMER_MANAGER_USER)

        when: "he requests to get all tickets of an anonymous user"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/anonymous/tickets",
            query: null,
            contentType: JSON,
            requestContentType: JSON)

        then: "an empty list of the tickets is returned"
        with(response) {
            status == SC_OK
            isEmpty(data.tickets)
            data.pagination.totalResults == 0
        }
    }

    def "Customer should not be able to get the tickets from a different user"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get all tickets with a different userId"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/NON_EXISTING_USER/tickets",
            query: null,
            contentType: JSON,
            requestContentType: JSON)

        then: "fail to get tickets"
        with(response) {
            status == SC_FORBIDDEN
            data.errors[0].message == "Access is denied"
            data.errors[0].type == "ForbiddenError"
        }
    }

    // get single Ticket
    def "#role (#user.id) should get the content of an existing ticket for #ticketOwner user"() {
        given: "a registered and logged in user"
        authorizationMethod(restClient, user)

        when: "he requests to get a ticket"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/" + ticketOwner + "/tickets/ticketOccTestTicket1",
            query: ["fields": "FULL"],
            contentType: JSON,
            requestContentType: JSON)

        then: "a ticket is returned"
        with(response) {
            status == SC_OK
            data.id == "ticketOccTestTicket1"
            data.customerId == MARK_RIVERS.id
            data.status.id == "OPEN"
            data.status.name == "Open"
            data.ticketCategory.id == "ENQUIRY"
            data.ticketCategory.name == "Enquiry"
            data.subject == 'Test Headline 1'
            data.availableStatusTransitions.size() == 1
            data.availableStatusTransitions[0].id == "CLOSED"
            data.availableStatusTransitions[0].name == "Closed"
            ! isEmpty(data.createdAt)
            ! isEmpty(data.modifiedAt)
            data.associatedTo.code == "ticketOccTestOrder"
            data.associatedTo.type == "Order"
            ! isEmpty(data.associatedTo.modifiedAt)
            data.ticketEvents.size() == 1
            data.ticketEvents[0].author == "Mark Rivers"
            ! isEmpty(data.ticketEvents[0].createdAt)
            data.ticketEvents[0].message == "Ticket Created note"
        }
        where:
        user                  | role               | ticketOwner    | authorizationMethod
        MARK_RIVERS           | "Customer"         | CURRENT_USER   | this.&authorizeCustomer
        MARK_RIVERS           | "Customer"         | MARK_RIVERS.id | this.&authorizeCustomer
        CUSTOMER_MANAGER_USER | "Customer Manager" | MARK_RIVERS.id | this.&authorizeCustomerManager
    }

    def "Customer should be able to specify the content of the ticket he/she is interested in"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get a ticket"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/current/tickets/ticketOccTestTicket1",
            query: ['fields': 'id,status(id),ticketCategory(name),associatedTo(code,type), ticketEvents(author,message)'],
            contentType: JSON,
            requestContentType: JSON)

        then: "a ticket is returned with the specified fields"
        with(response) {
            status == SC_OK
            data.size() == 5
            data.id == "ticketOccTestTicket1"
            data.status.size() == 1
            data.status.id == "OPEN"
            data.ticketCategory.size() == 1
            data.ticketCategory.name == "Enquiry"
            data.associatedTo.size() == 2
            data.associatedTo.code == "ticketOccTestOrder"
            data.associatedTo.type == "Order"
            data.ticketEvents.size() == 1
            data.ticketEvents[0].size() == 2
            data.ticketEvents[0].author == "Mark Rivers"
            data.ticketEvents[0].message == "Ticket Created note"
        }
    }

    def "Customer should be able to use #fields to specify the content of the ticket he/she is interested in"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get a ticket"
        def expectedResponse = restClient.get(
                path: getBasePathWithSite() + "/users/current/tickets/ticketOccTestTicket4",
                query: ["fields": expectedFields],
                contentType: JSON,
                requestContentType: JSON)
        then: "a ticket is returned with the specified fields: #expectedFields"
        with(expectedResponse) {
            status == SC_OK
        }

        when: "get ticket with fields with value: #fields"
        def response = restClient.get(
                path: getBasePathWithSite() + "/users/current/tickets/ticketOccTestTicket4",
                query: ["fields": fields],
                contentType: JSON,
                requestContentType: JSON)

        then: "a ticket is returned with the specified fields: #fields"
        with(response) {
            status == SC_OK
            objectMapper.writeValueAsString(data) == objectMapper.writeValueAsString(expectedResponse.data)
        }

        where:
        fields    | expectedFields
        ""        | "id,subject,ticketCategory,createdAt,modifiedAt,status,ticketEvents(DEFAULT),associatedTo,availableStatusTransitions"
        "BASIC"   | "id,subject,ticketCategory,createdAt,modifiedAt,status"
        "DEFAULT" | "id,subject,ticketCategory,createdAt,modifiedAt,status,ticketEvents(DEFAULT),associatedTo,availableStatusTransitions"
        "FULL"    | "id,subject,ticketCategory,createdAt,modifiedAt,status,ticketEvents(FULL),associatedTo,availableStatusTransitions,customerId"
    }

    def "Customer should get a not found error when requesting a non existing ticket"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get a ticket"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/current/tickets/NON_EXISTING_TICKET",
            query: null,
            contentType: JSON,
            requestContentType: JSON)

        then: "an error is returned"
        with(response) {
            status == SC_NOT_FOUND
            data.errors[0].message == "Ticket not found for the given ID NON_EXISTING_TICKET"
            data.errors[0].type == "NotFoundError"
        }
    }

    def "An anonymous user (#scenario) should not be able to get a ticket for #ticketOwner user"() {
        given: "an anonymous user"
        authorizationMethod(restClient)

        when: "he requests to get a ticket"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/" + ticketOwner + "/tickets/TICKET_ID_NOT_IMPORTANT",
            query: null,
            contentType: JSON,
            requestContentType: JSON)

        then: "fail to get ticket"
        with(response) {
            status == statusCode
            data.errors[0].message == errorMessage
            data.errors[0].type == errorType
        }

        where:
        scenario                              | ticketOwner    | authorizationMethod          | statusCode       | errorType                | errorMessage
        "not sending any Authorization Token" | CURRENT_USER   | this.&removeAuthorization    | SC_UNAUTHORIZED  | "UnauthorizedError"      | "Full authentication is required to access this resource"
        "not sending any Authorization Token" | ANONYMOUS_USER | this.&removeAuthorization    | SC_UNAUTHORIZED  | "AccessDeniedError"      | "Access is denied"
        "not sending any Authorization Token" | MARK_RIVERS.id | this.&removeAuthorization    | SC_UNAUTHORIZED  | "UnauthorizedError"      | "Full authentication is required to access this resource"
        "as a TRUSTED_CLIENT"                 | CURRENT_USER   | this.&authorizeTrustedClient | SC_BAD_REQUEST   | "UnknownIdentifierError" | "Cannot find user with propertyValue 'current'"
        "as a TRUSTED_CLIENT"                 | ANONYMOUS_USER | this.&authorizeTrustedClient | SC_UNAUTHORIZED  | "AccessDeniedError"      | "Access is denied"
        "as a TRUSTED_CLIENT"                 | MARK_RIVERS.id | this.&authorizeTrustedClient | SC_UNAUTHORIZED  | "AccessDeniedError"      | "Access is denied"
    }

    def "Customer should not be able to get the ticket of #ticketOwner user"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get a ticket"
        def response = restClient.get(
            path: getBasePathWithSite() + "/users/" + ticketOwner + "/tickets/TICKET_ID_NOT_IMPORTANT",
            query: null,
            contentType: JSON,
            requestContentType: JSON)

        then: "fail to get ticket"
        with(response) {
            status == SC_FORBIDDEN
            data.errors[0].message == "Access is denied"
            data.errors[0].type == "ForbiddenError"
        }
        where:
        ticketOwner << [ANONYMOUS_USER, WILLIAM_HUNTER.id]
    }


    // Create ticket
    def "Customer should be able to create a ticket when using #ticketOwner as userId and #scenario"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to create a ticket"
        def response = restClient.post(
            path: getBasePathWithSite() + "/users/" + ticketOwner + "/tickets",
            body: [
                "subject": subject,
                "message": message,
                "ticketCategory": [
                    "id": TICKET_CATEGORY_PROBLEM
                ]
            ],
            contentType: JSON,
            requestContentType: JSON)

        then: "a ticket is created"
        with(response) {
            status == SC_CREATED
            isNotEmpty(data.id)
            data.subject == subject
            data.ticketCategory.id == TICKET_CATEGORY_PROBLEM
        }

        where:
        scenario             | ticketOwner    | subject         | message
        "subject min length" | CURRENT_USER   | "a"             | "b"
        "subject max length" | CURRENT_USER   | "a".repeat(255) | "b"
        "subject min length" | MARK_RIVERS.id | "a"             | "b"
        "subject max length" | MARK_RIVERS.id | "a".repeat(255) | "b"
        "message min length" | CURRENT_USER   | "a"             | "b"
        "message max length" | CURRENT_USER   | "a"             | "b".repeat(5000)
        "message min length" | MARK_RIVERS.id | "a"             | "b"
        "message max length" | MARK_RIVERS.id | "a"             | "b".repeat(5000)
    }

    def "Customer should be able to create a ticket and specify the fields he is interested in to be returned"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to create a ticket and specifies the fields he wants to be returned"
        def response = restClient.post(
            path: getBasePathWithSite() + "/users/current/tickets",
            query: [
                "fields" : "id,ticketEvents(createdAt)"
            ],
            body: [
                "subject": "test",
                "message": "test",
                "ticketCategory": [
                    "id": TICKET_CATEGORY_PROBLEM
                ]
            ],
            contentType: JSON,
            requestContentType: JSON)

        then: "a ticket is created and only the required fields are returned"
        with(response) {
            status == SC_CREATED
            data.size() == 2            // only 2 attributes, id and ticketEvents
            isNotEmpty(data.id)         // id not not empty
            isNotEmpty(data.ticketEvents)
            data.ticketEvents.size() == 1    // only one event
            data.ticketEvents[0].size() == 1 // only one attribute for first event
            isNotEmpty(data.ticketEvents[0].createdAt)   // createdAt is returned
        }
    }

    def "Customer should be able to create a ticket and use #fields as specified fields to get interested data"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to create a ticket and specifies the fields with value #fields"
        def response = restClient.post(
                path: getBasePathWithSite() + "/users/current/tickets",
                query: [
                        "fields" : fields
                ],
                body: [
                        "subject": "test",
                        "message": "test",
                        "ticketCategory": [
                                "id": TICKET_CATEGORY_PROBLEM
                        ]
                ],
                contentType: JSON,
                requestContentType: JSON)

        then: "a ticket is created successfully"
        with(response) {
            status == SC_CREATED
        }

        when: "he requests to get the ticket just created"
        def expectedResponse = restClient.get(
                path: getBasePathWithSite() + "/users/current/tickets/" + response.data.id,
                query: ["fields": expectedFields],
                contentType: JSON,
                requestContentType: JSON)
        then: "a ticket is returned with the specified fields: #expectedFields"
        with(expectedResponse) {
            status == SC_OK
            objectMapper.writeValueAsString(response.data) == objectMapper.writeValueAsString(data)
        }

        where:
        fields    | expectedFields
        ""        | "id,subject,ticketCategory,createdAt,modifiedAt,status,ticketEvents(DEFAULT),associatedTo,availableStatusTransitions"
        "BASIC"   | "id,subject,ticketCategory,createdAt,modifiedAt,status"
        "DEFAULT" | "id,subject,ticketCategory,createdAt,modifiedAt,status,ticketEvents(DEFAULT),associatedTo,availableStatusTransitions"
        "FULL"    | "id,subject,ticketCategory,createdAt,modifiedAt,status,ticketEvents(FULL),associatedTo,availableStatusTransitions,customerId"
    }

    def "Customer should be able to create a ticket with associated cart"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        and: "he requests to create a cart"
        def cartId = createNewCart(CURRENT_USER, PRODUCT_CODE, ADD_PRODUCT_QUANTITY)

        when: "he requests to create a ticket"
        def response = restClient.post(
            path: getBasePathWithSite() + "/users/current/tickets",
            body: [
                "subject": "test",
                "message": "test",
                "ticketCategory": [
                    "id": TICKET_CATEGORY_PROBLEM
                ],
                "associatedTo": [
                    "type": ASSOCIATED_TO_TYPE_CART,
                    "code": cartId
                ]
            ],
            contentType: JSON,
            requestContentType: JSON)

        then: "a ticket is created"
        with(response) {
            status == SC_CREATED
            isNotEmpty(data.id)
            data.subject == "test"
            data.ticketCategory.id == TICKET_CATEGORY_PROBLEM
            data.associatedTo.code == cartId
            data.associatedTo.type == ASSOCIATED_TO_TYPE_CART
        }
    }

    def "Customer should be able to create a ticket with associated order"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        and: "he creates a cart"
        def cartId = createNewCart(CURRENT_USER, PRODUCT_CODE, ADD_PRODUCT_QUANTITY)

        and: "he requests to place an order"
        prepareOrder(MARK_RIVERS.id, cartId)
        def orderCode = placeOrder(MARK_RIVERS.id, cartId)

        when: "he requests to create a ticket with associated order"
        def response = restClient.post(
            path: getBasePathWithSite() + "/users/current/tickets",
            body: [
                "subject": "test",
                "message": "test",
                "ticketCategory": [
                    "id": TICKET_CATEGORY_PROBLEM
                ],
                "associatedTo": [
                    "type": ASSOCIATED_TO_TYPE_ORDER,
                    "code": orderCode
                ]
            ],
            contentType: JSON,
            requestContentType: JSON)

        then: "a ticket is created"
        with(response) {
            status == SC_CREATED
            isNotEmpty(data.id)
            data.subject == "test"
            data.ticketCategory.id == TICKET_CATEGORY_PROBLEM
            data.associatedTo.code == orderCode
            data.associatedTo.type == ASSOCIATED_TO_TYPE_ORDER
        }
    }

    def "Customer should not be able to create a ticket with non-existing order"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to create a ticket with non existing order"
        def response = restClient.post(
                path: getBasePathWithSite() + "/users/current/tickets",
                body: [
                        "subject"       : "test",
                        "message"       : "test",
                        "ticketCategory": [
                                "id": TICKET_CATEGORY_PROBLEM
                        ],
                        "associatedTo"  : [
                                "type": ASSOCIATED_TO_TYPE_ORDER,
                                "code": NON_EXISTING_ORDER
                        ]
                ],
                contentType: JSON,
                requestContentType: JSON)

        then: "fail to create a ticket"
        with(response) {
            status == SC_BAD_REQUEST
            data.errors[0].message == "Order with guid ${NON_EXISTING_ORDER} not found for current user in current BaseStore"
            data.errors[0].type == "TicketCreateError"
        }
    }

    def "Customer should be able to create a ticket with any other associated object, but it is not assigned to ticket"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to create a ticket"
        def response = restClient.post(
            path: getBasePathWithSite() + "/users/current/tickets",
            body: [
                "subject": "test",
                "message": "test",
                "ticketCategory": [
                    "id": TICKET_CATEGORY_PROBLEM
                ],
                "associatedTo": [
                    "type": "FooBar",
                    "code": "AnyCode"
                ]
            ],
            contentType: JSON,
            requestContentType: JSON)

        then: "a ticket is created"
        with(response) {
            status == SC_CREATED
            isNotEmpty(data.id)
            data.subject == "test"
            data.ticketCategory.id == TICKET_CATEGORY_PROBLEM
            isEmpty(data.associatedTo)
        }
    }

    def "Customer manager should not be able to create tickets (ticketOwner: #ticketOwner)"() {
        given: "a registered and logged in customer manager"
        authorizeCustomerManager(restClient, CUSTOMER_MANAGER_USER)

        when: "he requests to create a ticket"
        def response = restClient.post(
            path: getBasePathWithSite() + "/users/" + ticketOwner + "/tickets",
            body: [
                "subject": "test",
                "message": "test",
                "ticketCategory": [
                    "id": TICKET_CATEGORY_COMPLAINT
                ]
            ],
            contentType: JSON,
            requestContentType: JSON)

        then: "failed to create ticket for user #ticketOwner"
        with(response) {
            status == responseCode
            data.errors[0].message == errorMessage
            data.errors[0].type == errorType
        }

        where:
        ticketOwner              | responseCode    | errorType                | errorMessage
        ANONYMOUS_USER           | SC_UNAUTHORIZED | "AccessDeniedError"      | "Access is denied"
        WILLIAM_HUNTER.id        | SC_UNAUTHORIZED | "AccessDeniedError"      | "Access is denied"
        CUSTOMER_MANAGER_USER.id | SC_UNAUTHORIZED | "AccessDeniedError"      | "Access is denied"
        CURRENT_USER             | SC_BAD_REQUEST  | "UnknownIdentifierError" | "Cannot find user with propertyValue 'current'"
    }

    def "Customer should fail to create ticket when providing #scenario baseSite"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to create a ticket"
        def response = restClient.post(
            path: getBasePath() + baseSite + "/users/current/tickets",
            body: [
                "subject": "test",
                "message": "test",
                "ticketCategory": [
                    "id": TICKET_CATEGORY_COMPLAINT
                ]
            ],
            contentType: JSON,
            requestContentType: JSON)

        then: "fail to create a ticket"
        with(response) {
            status == statusCode
            data.errors[0].message == errorMessage
            data.errors[0].type == errorType
        }

        where:
        scenario       | baseSite                   | statusCode     | errorType              | errorMessage
        "empty"        | ""                         | SC_BAD_REQUEST | "InvalidResourceError" | "Base site users doesn't exist"
        "non existing" | "/NON_EXISTING_BASE_SITE"  | SC_BAD_REQUEST | "InvalidResourceError" | "Base site NON_EXISTING_BASE_SITE doesn't exist"
    }

    def "An anonymous user (#scenario) should not be able to create a ticket for #ticketOwner user"() {
        given: "an anonymous user"
        authorizationMethod(restClient)

        when: "he requests to get a ticket"
        def response = restClient.post(
            path: getBasePathWithSite() + "/users/" + ticketOwner + "/tickets",
            body: [
                "subject": "test",
                "message": "test",
                "ticketCategory": [
                    "id": TICKET_CATEGORY_COMPLAINT
                ]
            ],
            contentType: JSON,
            requestContentType: JSON)

        then: "fail to get tickets"
        with(response) {
            status == statusCode
            data.errors[0].message == errorMessage
            data.errors[0].type == errorType
        }

        where:
        scenario                              | ticketOwner    | authorizationMethod          | statusCode       | errorType                | errorMessage
        "not sending any Authorization Token" | CURRENT_USER   | this.&removeAuthorization    | SC_UNAUTHORIZED  | "UnauthorizedError"      | "Full authentication is required to access this resource"
        "not sending any Authorization Token" | ANONYMOUS_USER | this.&removeAuthorization    | SC_UNAUTHORIZED  | "AccessDeniedError"      | "Access is denied"
        "not sending any Authorization Token" | MARK_RIVERS.id | this.&removeAuthorization    | SC_UNAUTHORIZED  | "UnauthorizedError"      | "Full authentication is required to access this resource"
        "as a TRUSTED_CLIENT"                 | CURRENT_USER   | this.&authorizeTrustedClient | SC_BAD_REQUEST   | "UnknownIdentifierError" | "Cannot find user with propertyValue 'current'"
        "as a TRUSTED_CLIENT"                 | ANONYMOUS_USER | this.&authorizeTrustedClient | SC_UNAUTHORIZED  | "AccessDeniedError"      | "Access is denied"
        "as a TRUSTED_CLIENT"                 | MARK_RIVERS.id | this.&authorizeTrustedClient | SC_UNAUTHORIZED  | "AccessDeniedError"      | "Access is denied"
    }

    def "Customer should not able to create a ticket when providing #scenario"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to create a ticket"
        def response = restClient.post(
            path: getBasePathWithSite() + "/users/current/tickets",
            body: [
                "message": message,
                "subject": subject,
                "ticketCategory": ticketCategory,
                "associatedTo": associatedTo
            ],
            contentType: JSON,
            requestContentType: JSON)
        then: "fail to create a ticket"
        with(response) {
            status == SC_BAD_REQUEST
            data.errors[0].message == errorMessage
            data.errors[0].subject == errorSubject
            data.errors[0].reason == errorReason
            data.errors[0].type == errorType
        }

        where:
        scenario                                | subject         | message          | ticketCategory                  | associatedTo                       | errorType           | errorMessage                                                                                 | errorSubject        | errorReason
        "no fields"                             | null            | null             | null                            | null                               | "ValidationError"   | "This field is required."                                                                    | "subject"           | "missing"
        "only subject"                          | "a"             | null             | null                            | null                               | "ValidationError"   | "This field is required."                                                                    | "message"           | "missing"
        "only message"                          | null            | "b"              | null                            | null                               | "ValidationError"   | "This field is required."                                                                    | "subject"           | "missing"
        "only ticketCategory"                   | null            | null             | ["id": TICKET_CATEGORY_ENQUIRY] | null                               | "ValidationError"   | "This field is required."                                                                    | "subject"           | "missing"
        "only associatedTo"                     | null            | null             | null                            | ["code": "ORDER", "type": "Order"] | "ValidationError"   | "This field is required."                                                                    | "subject"           | "missing"
        "no ticketCategory"                     | "a"             | "b"              | null                            | null                               | "ValidationError"   | "This field is required."                                                                    | "ticketCategory"    | "missing"
        "empty ticketCategory"                  | "a"             | "b"              | [:]                             | null                               | "ValidationError"   | "This field is required."                                                                    | "ticketCategory.id" | "missing"
        "no ticketCategory.id"                  | "a"             | "b"              | ["id": null]                    | null                               | "ValidationError"   | "This field is required."                                                                    | "ticketCategory.id" | "missing"
        "empty ticketCategory.id"               | "a"             | "b"              | ["id": ""]                      | null                               | "ValidationError"   | "This field is required."                                                                    | "ticketCategory.id" | "invalid"
        "invalid ticketCategory.id"             | "a"             | "b"              | ["id": "INVALID"]               | null                               | "ValidationError"   | "This field is required."                                                                    | "ticketCategory.id" | "invalid"
        "empty associatedTo"                    | "a"             | "b"              | ["id": TICKET_CATEGORY_ENQUIRY] | [:]                                | "ValidationError"   | "This field is required."                                                                    | "associatedTo.type" | "missing"
        "no associatedTo.code"                  | "a"             | "b"              | ["id": TICKET_CATEGORY_ENQUIRY] | ["code": null, "type": "t"]        | "ValidationError"   | "This field is required."                                                                    | "associatedTo.code" | "missing"
        "empty associatedTo.code"               | "a"             | "b"              | ["id": TICKET_CATEGORY_ENQUIRY] | ["code": "", "type": "t"]          | "ValidationError"   | "This field is required."                                                                    | "associatedTo.code" | "invalid"
        "blank associatedTo.code"               | "a"             | "b"              | ["id": TICKET_CATEGORY_ENQUIRY] | ["code": " ", "type": "t"]         | "ValidationError"   | "This field is required."                                                                    | "associatedTo.code" | "invalid"
        "no associatedTo.type"                  | "a"             | "b"              | ["id": TICKET_CATEGORY_ENQUIRY] | ["code": "c", "type": null]        | "ValidationError"   | "This field is required."                                                                    | "associatedTo.type" | "missing"
        "empty associatedTo.type"               | "a"             | "b"              | ["id": TICKET_CATEGORY_ENQUIRY] | ["code": "c", "type": ""]          | "ValidationError"   | "This field is required."                                                                    | "associatedTo.type" | "invalid"
        "blank associatedTo.type"               | "a"             | "b"              | ["id": TICKET_CATEGORY_ENQUIRY] | ["code": "c", "type": " "]         | "ValidationError"   | "This field is required."                                                                    | "associatedTo.type" | "invalid"
        "empty subject"                         | ""              | "b"              | ["id": TICKET_CATEGORY_ENQUIRY] | null                               | "ValidationError"   | "This field is required."                                                                    | "subject"           | "invalid"
        "blank subject"                         | " "             | "b"              | ["id": TICKET_CATEGORY_ENQUIRY] | null                               | "ValidationError"   | "This field is required."                                                                    | "subject"           | "invalid"
        "empty message"                         | "a"             | ""               | ["id": TICKET_CATEGORY_ENQUIRY] | null                               | "ValidationError"   | "This field is required."                                                                    | "message"           | "invalid"
        "blank message"                         | "a"             | " "              | ["id": TICKET_CATEGORY_ENQUIRY] | null                               | "ValidationError"   | "This field is required."                                                                    | "message"           | "invalid"
        "the subject size is > 255 characters"  | "a".repeat(256) | "b"              | ["id": TICKET_CATEGORY_ENQUIRY] | null                               | "TicketCreateError" | "The number of characters in the attribute \"Subject\" must between 1 and 255 (inclusive)."  | null                | null
        "the message size is > 5000 characters" | "a"             | "b".repeat(5001) | ["id": TICKET_CATEGORY_ENQUIRY] | null                               | "TicketCreateError" | "The number of characters in the attribute \"Message\" must between 1 and 5000 (inclusive)." | null                | null
    }

    def "Customer should fail to create a ticket when using #ticketOwner as userId"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to create a ticket"
        def response = restClient.post(
            path: getBasePathWithSite() + "/users/" + ticketOwner + "/tickets",
            body: [
                "subject": "test",
                "message": "test",
                "ticketCategory": [
                    "id": TICKET_CATEGORY_COMPLAINT
                ]
            ],
            contentType: JSON,
            requestContentType: JSON)

        then: "fail to create a ticket"
        with(response) {
            status == statusCode
            data.errors[0].message == errorMessage
            data.errors[0].type == errorType
        }

        where:
        ticketOwner         | statusCode      | errorType                 | errorMessage
        "NON_EXISTING_USER" | SC_FORBIDDEN    | "ForbiddenError"          | "Access is denied"
        ANONYMOUS_USER      | SC_FORBIDDEN    | "ForbiddenError"          | "Access is denied"
        WILLIAM_HUNTER.id   | SC_FORBIDDEN    | "ForbiddenError"          | "Access is denied"
    }

    // Create ticket event
    def "Customer should be able to create a ticket event (ticketOwner: #ticketOwner) with message #messageLength"() {
        given: "a registered and logged in user"
        authorizeCustomer(restClient, MARK_RIVERS)

        and: "he creates a ticket"
        def ticketId = createTicket(ticketOwner)

        when: "he requests to create a ticket event"
        def response = restClient.post(
                path: getBasePathWithSite() + "/users/" + ticketOwner + "/tickets/" + ticketId + "/events",
                body: [
                        "message": message,
                        "toStatus": [
                                "id": TICKET_STATUS_CLOSED
                        ]
                ],
                contentType: JSON,
                requestContentType: JSON)
        then: "a ticket event is created"
        with(response) {
            status == SC_CREATED
        }

        when: "he requests to view the created event from ticket"
        def response2 = restClient.get(
                path: getBasePathWithSite() + "/users/" + ticketOwner + "/tickets/" + ticketId,
                query: [
                        'fields': 'ticketEvents(DEFAULT),status'
                ],
                contentType: JSON,
                requestContentType: JSON)

        then: "The event should be added to the ticket returned"
        with(response2) {
            status == SC_OK
            data.status.id == TICKET_STATUS_CLOSED
            data.ticketEvents.size() == 2 // 1 by default created when creating a ticket, and 1 just created by user
            data.ticketEvents[0].toStatus.id == TICKET_STATUS_CLOSED
            data.ticketEvents[0].message == message
            data.ticketEvents[0].author == "Mark Rivers"
            isNotEmpty(data.ticketEvents[0].createdAt)
        }

        where:
        messageLength | ticketOwner    | message
        "min length"  | CURRENT_USER   | "a"
        "min length"  | MARK_RIVERS.id | "a"
        "max length"  | CURRENT_USER   | "a".repeat(5000)
        "max length"  | MARK_RIVERS.id | "a".repeat(5000)
    }

    def "Customer should be able to create a ticket event when changing ticket status from #oldStatus to #newStatus"() {
        given: "a registered and logged in user"
        authorizeCustomer(restClient, MARK_RIVERS)

        and: "he creates a ticket"
        def ticketId = createTicket(MARK_RIVERS.id)

        when: "he requests to create a ticket event with status #oldStatus"
        def response1 = restClient.post(
                path: getBasePathWithSite() + "/users/" + MARK_RIVERS.id + "/tickets/" + ticketId + "/events",
                body: [
                        "message": "test event 1",
                        "toStatus": [
                                "id": oldStatus
                        ]
                ],
                contentType: JSON,
                requestContentType: JSON)
        then: "a ticket event is created"
        with(response1) {
            status == SC_CREATED
        }

        when: "he requests to create a ticket event with status #newStatus"
        def response2 = restClient.post(
                path: getBasePathWithSite() + "/users/" + MARK_RIVERS.id + "/tickets/" + ticketId + "/events",
                body: [
                        "message": "test event 2",
                        "toStatus": [
                                "id": newStatus
                        ]
                ],
                contentType: JSON,
                requestContentType: JSON)
        then: "a ticket event is created"
        with(response2) {
            status == SC_CREATED
        }

        when: "he requests to view the created event from ticket "
        def response3 = restClient.get(
                path: getBasePathWithSite() + "/users/" + MARK_RIVERS.id + "/tickets/" + ticketId,
                query: [
                        "fields": "ticketEvents(DEFAULT),status"
                ],
                contentType: JSON,
                requestContentType: JSON)

        then: "The event should be added to the ticket returned"
        with(response3) {
            status == SC_OK
            data.status.id == newStatus
            data.ticketEvents.size() == 3

            if (toStatusForSecondEventIsNull) {
                isEmpty(data.ticketEvents[0].toStatus)
            } else {
                data.ticketEvents[0].toStatus.id == newStatus
            }
            data.ticketEvents[0].message == "test event 2"
            data.ticketEvents[0].author == "Mark Rivers"
            isNotEmpty(data.ticketEvents[0].createdAt)

            if (toStatusForFirstEventIsNull) {
                isEmpty(data.ticketEvents[1].toStatus)
            } else {
                data.ticketEvents[1].toStatus.id == oldStatus
            }
            data.ticketEvents[1].message == "test event 1"
            data.ticketEvents[1].author == "Mark Rivers"
            isNotEmpty(data.ticketEvents[1].createdAt)
        }

        where:
        scenario                   | oldStatus            | newStatus               | toStatusForFirstEventIsNull | toStatusForSecondEventIsNull
        "from OPEN to CLOSED"      | TICKET_STATUS_OPEN   | TICKET_STATUS_CLOSED    | true                        | false
        "from OPEN to OPEN"        | TICKET_STATUS_OPEN   | TICKET_STATUS_OPEN      | true                        | true
        "from CLOSED to INPROCESS" | TICKET_STATUS_CLOSED | TICKET_STATUS_INPROCESS | false                       | false
        "from CLOSED to CLOSED"    | TICKET_STATUS_CLOSED | TICKET_STATUS_CLOSED    | false                       | true
    }

    def "Customer should fail to create ticket event when providing #scenario baseSite"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        and: "he creates a ticket"
        def ticketId = createTicket(CURRENT_USER)

        when: "he requests to create a ticket event"
        def response = restClient.post(
                path: getBasePath() + baseSite + "/users/current/tickets/" + ticketId + "/events",
                body: [
                        "message": "test"
                ],
                contentType: JSON,
                requestContentType: JSON)

        then: "fail to create a ticket event"
        with(response) {
            status == statusCode
            data.errors[0].message == errorMessage
            data.errors[0].type == errorType
        }

        where:
        scenario       | baseSite                   | statusCode     | errorType              | errorMessage
        "empty"        | ""                         | SC_BAD_REQUEST | "InvalidResourceError" | "Base site users doesn't exist"
        "non existing" | "/NON_EXISTING_BASE_SITE"  | SC_BAD_REQUEST | "InvalidResourceError" | "Base site NON_EXISTING_BASE_SITE doesn't exist"
    }

    def "An anonymous user (#scenario) should not be able to create a ticket event for #ticketOwner user"() {
        given: "an anonymous user"
        authorizeCustomer(restClient, MARK_RIVERS)

        and: "he creates a ticket"
        def ticketId = createTicket(MARK_RIVERS.id)

        authorizationMethod(restClient)

        when: "he requests to create a ticket event"
        def response = restClient.post(
                path: getBasePathWithSite() + "/users/" + ticketOwner + "/tickets/" + ticketId + "/events",
                body: [
                        "message": "test",
                ],
                contentType: JSON,
                requestContentType: JSON)
        then: "fail to create ticket event"
        with(response) {
            status == statusCode
            data.errors[0].message == errorMessage
            data.errors[0].type == errorType
        }
        where:
        scenario                              | ticketOwner    | authorizationMethod          | statusCode       | errorType                | errorMessage
        "not sending any Authorization Token" | CURRENT_USER   | this.&removeAuthorization    | SC_UNAUTHORIZED  | "UnauthorizedError"      | "Full authentication is required to access this resource"
        "not sending any Authorization Token" | ANONYMOUS_USER | this.&removeAuthorization    | SC_UNAUTHORIZED  | "AccessDeniedError"      | "Access is denied"
        "not sending any Authorization Token" | MARK_RIVERS.id | this.&removeAuthorization    | SC_UNAUTHORIZED  | "UnauthorizedError"      | "Full authentication is required to access this resource"
        "as a TRUSTED_CLIENT"                 | CURRENT_USER   | this.&authorizeTrustedClient | SC_BAD_REQUEST   | "UnknownIdentifierError" | "Cannot find user with propertyValue 'current'"
        "as a TRUSTED_CLIENT"                 | ANONYMOUS_USER | this.&authorizeTrustedClient | SC_UNAUTHORIZED  | "AccessDeniedError"      | "Access is denied"
        "as a TRUSTED_CLIENT"                 | MARK_RIVERS.id | this.&authorizeTrustedClient | SC_UNAUTHORIZED  | "AccessDeniedError"      | "Access is denied"
    }

    def "Customer should not able to create a ticket event when providing #scenario"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        and: "he creates a ticket"
        def ticketId = createTicket(CURRENT_USER)

        when: "he requests to create a ticket event "
        def response = restClient.post(
                path: getBasePathWithSite() + "/users/current/tickets/" + ticketId + "/events",
                body: [
                        "message": message,
                        "toStatus": toStatus
                ],
                contentType: JSON,
                requestContentType: JSON)
        then: "fail to create a ticket event"
        with(response) {
            status == SC_BAD_REQUEST
            data.errors[0].message == errorMessage.replaceAll("__TICKET_ID__", ticketId)
            data.errors[0].subject == errorSubject
            data.errors[0].reason == errorReason
            data.errors[0].type == errorType
        }

        where:
        scenario            | message          | toStatus         | errorType                | errorMessage                                                                                 | errorSubject  | errorReason
        "no fields"         | null             | null             | "ValidationError"        | "This field is required."                                                                    | "message"     | "missing"
        "empty message"     | ""               | null             | "ValidationError"        | "This field is required."                                                                    | "message"     | "invalid"
        "blank message"     | " "              | null             | "ValidationError"        | "This field is required."                                                                    | "message"     | "invalid"
        "only toStatus"     | null             | ["id": "CLOSED"] | "ValidationError"        | "This field is required."                                                                    | "message"     | "missing"
        "empty toStatus"    | "a"              | [:]              | "ValidationError"        | "This field is required."                                                                    | "toStatus.id" | "missing"
        "null toStatus.id"  | "a"              | ["id": null]     | "ValidationError"        | "This field is required."                                                                    | "toStatus.id" | "missing"
        "empty toStatus.id" | "a"              | ["id": ""]       | "ValidationError"        | "This field is required."                                                                    | "toStatus.id" | "invalid"
        "message too long"  | "a".repeat(5001) | null             | "TicketEventCreateError" | "The number of characters in the attribute \"Message\" must between 1 and 5000 (inclusive)." | null          | null
    }

    def "Customer should not able to create a ticket event when providing invalid toStatus.id"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        and: "he creates a ticket"
        def ticketId = createTicket(CURRENT_USER)

        when: "he requests to create a ticket event "
        def response = restClient.post(
                path: getBasePathWithSite() + "/users/current/tickets/" + ticketId + "/events",
                body: [
                        "message": "a",
                        "toStatus": [
                                "id": INVALID_TICKET_STATUS
                        ]
                ],
                contentType: JSON,
                requestContentType: JSON)
        then: "fail to create a ticket event"
        with(response) {
            status == SC_BAD_REQUEST
            data.errors[0].message == "Unable to change ticket status to ${INVALID_TICKET_STATUS} for the ticket ${ticketId}"
            data.errors[0].type == "TicketEventCreateError"
        }
    }

    def "Customer should not able to create a ticket event when providing non existing ticketId"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to create a ticket event "
        def response = restClient.post(
                path: getBasePathWithSite() + "/users/current/tickets/non_existing_id/events",
                body: [
                        "message": "test event",
                ],
                contentType: JSON,
                requestContentType: JSON)
        then: "fail to create a ticket event"
        with(response) {
            status == SC_BAD_REQUEST
            data.errors[0].message == "Ticket not found for the given ID non_existing_id"
            data.errors[0].type == "TicketEventCreateError"
        }
    }

    def "Customer (#ticketOwner) should not able to create a ticket event when providing ticketId which does not belong to him"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        and: "he creates a ticket"
        def ticketId = createTicket(MARK_RIVERS.id)

        and: "login with another account"
        authorizeCustomer(restClient, WILLIAM_HUNTER)

        when: "he requests to create a ticket event "
        def response = restClient.post(
                path: getBasePathWithSite() + "/users/" + ticketOwner + "/tickets/" + ticketId + "/events",
                body: [
                        "message": "test event",
                ],
                contentType: JSON,
                requestContentType: JSON)
        then: "fail to create a ticket event"
        with(response) {
            status == SC_BAD_REQUEST
            data.errors[0].message == "Ticket not found for the given ID " + ticketId
            data.errors[0].type == "TicketEventCreateError"
        }

        where:
        ticketOwner << [CURRENT_USER, WILLIAM_HUNTER.id]
    }

    def "Customer should not able to create a ticket event when providing the other customer's id"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        and: "he creates a ticket"
        def ticketId = createTicket(MARK_RIVERS.id)

        and: "login with another account"
        authorizeCustomer(restClient, WILLIAM_HUNTER)

        when: "he requests to create a ticket event "
        def response = restClient.post(
                path: getBasePathWithSite() + "/users/" + MARK_RIVERS.id + "/tickets/" + ticketId + "/events",
                body: [
                        "message": "test event",
                ],
                contentType: JSON,
                requestContentType: JSON)
        then: "fail to create a ticket event"
        with(response) {
            status == SC_FORBIDDEN
            data.errors[0].message == "Access is denied"
            data.errors[0].type == "ForbiddenError"
        }

        where:
        ticketOwner << [CURRENT_USER, WILLIAM_HUNTER.id]
    }

    def "Customer manager should not be able to create a ticket event (ticketOwner: #ticketOwner)"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        and: "he creates a ticket for user mark.rivers@rustic-hw.com"
        def ticketId = createTicket(MARK_RIVERS.id)

        and: "login with customer manager"
        authorizeCustomerManager(restClient, CUSTOMER_MANAGER_USER)

        when: "customer manager requests to create a ticket event"
        def response = restClient.post(
                path: getBasePathWithSite() + "/users/" + ticketOwner + "/tickets/" + ticketId + "/events",
                body: [
                        "message": "test event",
                ],
                contentType: JSON,
                requestContentType: JSON)
        then: "fail to create a ticket event"
        with(response) {
            status == responseCode
            data.errors[0].message == errorMessage
            data.errors[0].type == errorType
        }

        where:
        ticketOwner              | responseCode    | errorType                | errorMessage
        ANONYMOUS_USER           | SC_UNAUTHORIZED | "AccessDeniedError"      | "Access is denied"
        MARK_RIVERS.id           | SC_UNAUTHORIZED | "AccessDeniedError"      | "Access is denied"
        CUSTOMER_MANAGER_USER.id | SC_UNAUTHORIZED | "AccessDeniedError"      | "Access is denied"
        CURRENT_USER             | SC_BAD_REQUEST  | "UnknownIdentifierError" | "Cannot find user with propertyValue 'current'"
    }

    // Get all ticket categories
    def "#role should be able to get a list of ticket categories"() {
        given: "a registered and logged in #role"
        authorizationMethod(restClient, user)

        when: "he requests to get all ticket categories"
        def response = restClient.get(
                path: getBasePathWithSite() + "/ticketCategories",
                contentType: JSON,
                requestContentType: JSON)

        then: "a list of the ticket categories is returned"
        with(response) {
            status == SC_OK
            data.ticketCategories.size() == 3
            for( ticketCategory in data.ticketCategories ) {
                isNotEmpty(ticketCategory.id)
                isNotEmpty(ticketCategory.name)
            }
        }

        where:
        role               | authorizationMethod            | user
        "Customer"         | this.&authorizeCustomer        | MARK_RIVERS
        "Customer Manager" | this.&authorizeCustomerManager | CUSTOMER_MANAGER_USER
    }

    def "Anonymous user (#scenario) should be able to get a list of ticket categories"() {
        given: "a registered and logged in #role"
        authorizationMethod(restClient)

        when: "he requests to get all ticket categories"
        def response = restClient.get(
                path: getBasePathWithSite() + "/ticketCategories",
                contentType: JSON,
                requestContentType: JSON)

        then: "a list of the ticket categories is returned"
        with(response) {
            status == SC_OK
            data.ticketCategories.size() == 3
            for( ticketCategory in data.ticketCategories ) {
                isNotEmpty(ticketCategory.id)
                isNotEmpty(ticketCategory.name)
            }
        }

        where:
        scenario                              | authorizationMethod
        "not sending any Authorization Token" | this.&removeAuthorization
        "as a TRUSTED_CLIENT"                 | this.&authorizeTrustedClient
    }

    def "Customer should not be able to get ticket categories when providing #scenario"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get all ticket categories"
        def response = restClient.get(
                path: getBasePath() + baseSite + "/ticketCategories",
                query: null,
                contentType: JSON,
                requestContentType: JSON)

        then: "fail to get ticket categories"
        with(response) {
            status == SC_BAD_REQUEST
            data.errors[0].message == errorMessage
            data.errors[0].type == errorType
        }

        where:
        scenario           | baseSite                  | errorType              | errorMessage
        "empty baseSite"   | ""                        | "InvalidResourceError" | "Base site ticketCategories doesn't exist"
        "invalid baseSite" | "/NON_EXISTING_BASE_SITE" | "InvalidResourceError" | "Base site NON_EXISTING_BASE_SITE doesn't exist"
    }

    // Get associate objects
    def "Customer should be able to get a list of ticket associated objects using #userId as userId"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        and: "he creates a cart and places an order"
        def cartId = createNewCart(CURRENT_USER, PRODUCT_CODE, ADD_PRODUCT_QUANTITY)
        prepareOrder(MARK_RIVERS.id, cartId)
        def orderCode = placeOrder(MARK_RIVERS.id, cartId)

        and: "he creates another cart"
        def cartIdNew = createNewCart(CURRENT_USER, PRODUCT_CODE, ADD_PRODUCT_QUANTITY)

        when: "he requests to get all available ticket associated objects"
        def response = restClient.get(
                path: getBasePathWithSite() + "/users/" + userId + "/ticketAssociatedObjects",
                contentType: JSON,
                requestContentType: JSON)

        then: "a list of the ticket associated objects is returned"
        with(response) {
            status == SC_OK
            data.ticketAssociatedObjects.size() >= 2
            def associatedOrder = data.ticketAssociatedObjects.find{obj -> obj.code == orderCode};
            isNotEmpty(associatedOrder)
            associatedOrder.type == "Order"
            isNotEmpty(associatedOrder.modifiedAt)
            def associatedCart = data.ticketAssociatedObjects.find{obj -> obj.code == cartIdNew};
            isNotEmpty(associatedCart)
            associatedCart.type == "Cart"
            isNotEmpty(associatedCart.modifiedAt)
        }

        where:
        userId << [MARK_RIVERS.id, CURRENT_USER]
    }

    def "Customer manager should not be able to get a list of ticket associated objects (userId: #userId)"() {
        given: "a registered and logged in customer manager"
        authorizeCustomerManager(restClient, CUSTOMER_MANAGER_USER)

        when: "he requests to get all ticket associated objects"
        def response = restClient.get(
                path: getBasePathWithSite() + "/users/" + userId + "/ticketAssociatedObjects",
                contentType: JSON,
                requestContentType: JSON)

        then: "a list of the ticket associated objects is returned"
        with(response) {
            status == responseCode
            data.errors[0].message == errorMessage
            data.errors[0].type == errorType
        }

        where:
        userId                   | responseCode    | errorType                | errorMessage
        ANONYMOUS_USER           | SC_UNAUTHORIZED | "AccessDeniedError"      | "Access is denied"
        WILLIAM_HUNTER.id        | SC_UNAUTHORIZED | "AccessDeniedError"      | "Access is denied"
        CUSTOMER_MANAGER_USER.id | SC_UNAUTHORIZED | "AccessDeniedError"      | "Access is denied"
        CURRENT_USER             | SC_BAD_REQUEST  | "UnknownIdentifierError" | "Cannot find user with propertyValue 'current'"
    }

    def "Error should be returned if customer requests to get ticket associated objects using anonymous as userId"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get all ticket associated objects"
        def response = restClient.get(
                path: getBasePathWithSite() + "/users/"+ ANONYMOUS_USER +"/ticketAssociatedObjects",
                contentType: JSON,
                requestContentType: JSON)

        then: "fail to get ticket associated objects"
        with(response) {
            status == SC_FORBIDDEN
            data.errors[0].message == "Access is denied"
            data.errors[0].type == "ForbiddenError"
        }
    }

    def "Error should be returned if (#scenario) user requests to get ticket associated objects"() {
        given: "a registered and logged in (#scenario) user"
        authorizationMethod(restClient)

        when: "he requests to get all ticket associated objects"
        def response = restClient.get(
                path: getBasePathWithSite() + "/users/anonymous/ticketAssociatedObjects",
                contentType: JSON,
                requestContentType: JSON)

        then: "fail to get ticket associated objects"
        with(response) {
            status == errorStatus
            data.errors[0].message == errorMessage
            data.errors[0].type == errorType
        }

        where:
        scenario    | authorizationMethod          | errorStatus     | errorType           | errorMessage
        "anonymous" | this.&removeAuthorization    | SC_UNAUTHORIZED | "AccessDeniedError" | "Access is denied"
        "guest"     | this.&authorizeTrustedClient | SC_UNAUTHORIZED | "AccessDeniedError" | "Access is denied"
    }

    def "Error should be returned to get ticket associated objects when using #scenario"() {
        given: "a registered and logged in customer"
        authorizeCustomer(restClient, MARK_RIVERS)

        when: "he requests to get all ticket associated objects"
        def response = restClient.get(
                path: getBasePath() + baseSite + "/users/" + MARK_RIVERS.id + "/ticketAssociatedObjects",
                query: null,
                contentType: JSON,
                requestContentType: JSON)

        then: "fail to get ticket associated objects"
        with(response) {
            status == SC_BAD_REQUEST
            data.errors[0].message == errorMessage
            data.errors[0].type == errorType
        }

        where:
        scenario           | baseSite                  | errorType              | errorMessage
        "empty baseSite"   | ""                        | "InvalidResourceError" | "Base site users doesn't exist"
        "invalid baseSite" | "/NON_EXISTING_BASE_SITE" | "InvalidResourceError" | "Base site NON_EXISTING_BASE_SITE doesn't exist"
    }

    protected String createTicket(String userId) {
        def response = restClient.post(
                path: getBasePathWithSite() + "/users/" + userId + "/tickets",
                body: [
                        "subject"       : "test subject",
                        "message"       : "test message",
                        "ticketCategory": [
                                "id": TICKET_CATEGORY_PROBLEM
                        ]
                ],
                contentType: JSON,
                requestContentType: JSON)
        with(response) {
            status == SC_CREATED
            isNotEmpty(data.id)
        }
        return response.data.id
    }

    protected String createNewCart(String userId) {
        def response = restClient.post(
            path: getBasePathWithSite() + "/users/" + userId + "/carts",
            query: [
                'fields': 'DEFAULT'
            ],
            contentType: JSON,
            requestContentType: JSON)
        with(response) {
            status == SC_CREATED
            data.type == "cartWsDTO"
        }
        return response.data.code
    }

    protected String createNewCart(String userId, String productCode, int quantity) {
        def cartId = createNewCart(userId)
        addProductToCart(userId, cartId, productCode, quantity)
        return cartId
    }

    protected void addProductToCart(String userId, String cartId, String productCode, Integer quantity) {
        def response = restClient.post(
            path: getBasePathWithSite() + "/users/" + userId + "/carts/" + cartId + "/entries",
            body: [
                "product" : [ "code" : productCode ],
                "quantity": quantity
            ],
            contentType: JSON,
            requestContentType: JSON
        )
        with(response) {
            status == SC_OK
            data.quantity == quantity
            data.entry.product.code == productCode
        }
    }

    protected String prepareOrder(String userId, String cartId) {
        def JOHN_DOE_ADDRESS = [
            "titleCode"      : "mr",
            "firstName"      : "John",
            "lastName"       : "Doe",
            "line1"          : "My street",
            "line2"          : "",
            "postalCode"     : "12345",
            "phone"          : "12345",
            "town"           : "Springfield",
            "country"        :  [ "isocode": "US" ]
        ]
        def address = createAddress(userId, JOHN_DOE_ADDRESS)
        setDeliveryAddress(userId, cartId, address.id)
        setDeliveryMode(userId, cartId, "courier")
        createPaymentInfo(userId, cartId, [
            "accountHolderName"             : "John Doe",
            "cardNumber"                    : "4111111111111111",
            "cardType"                      : ["code": "visa"],
            "expiryMonth"                   : "01",
            "expiryYear"                    : "2117",
            "defaultPayment"                : true,
            "saved"                         : true,
            "billingAddress"                : JOHN_DOE_ADDRESS])
    }

    protected void setDeliveryMode(String userId, String cartId, String deliveryModeId) {
        def response = restClient.put(
            path: getBasePathWithSite() + '/users/' + userId + '/carts/' + cartId + '/deliverymode',
            query: ['deliveryModeId': deliveryModeId],
            contentType: JSON,
            requestContentType: URLENC
        )
        if (isNotEmpty(response.data)) println(response.data)
        with(response) {
            status == SC_OK
        }
    }

    protected void setDeliveryAddress(String userId, String cartId, String addressId) {
        def response = restClient.put(
            path: getBasePathWithSite() + '/users/' + userId + '/carts/' + cartId + '/addresses/delivery',
            query: ['addressId': addressId],
            contentType: JSON,
            requestContentType: URLENC
        )
        with(response) {
            status == SC_OK
        }
    }

    protected Object createAddress(String userId, Map payload) {
        def response = restClient.post(
            path: getBasePathWithSite() + '/users/' + userId + '/addresses',
            body: payload,
            contentType: JSON,
            requestContentType: JSON)
        with(response) {
            if (isNotEmpty(data) && isNotEmpty(data.errors)) println(data)
            status == SC_CREATED
        }
        return response.data
    }

    protected Object createPaymentInfo(String userId, String cartId, def paymentInfo) {
        def response = restClient.post(
            path: getBasePathWithSite() + '/users/' + userId + '/carts/' + cartId + '/paymentdetails',
            body: paymentInfo,
            contentType: JSON,
            requestContentType: JSON)
        with(response) {
            if (isNotEmpty(data) && isNotEmpty(data.errors)) println(data)
            status == SC_CREATED
        }
        return response.data
    }

    protected String placeOrder(String userId, String cartId) {
        def response = restClient.post(
            path: getBasePathWithSite() + "/users/" + userId + "/orders",
            query: [
                "cartId"      : cartId,
                "termsChecked": true,
                "fields"      : FIELD_SET_LEVEL_FULL
            ]
        )
        with(response) {
            if (isNotEmpty(data) && isNotEmpty(data.errors)){
                println(data)
            }
            status == SC_CREATED
        }
        return response.data.code
    }
}
