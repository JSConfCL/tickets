/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "query FetchExampleEvents($input: PaginatedInputEventsSearchInput!) {\n  searchEvents(input: $input) {\n    data {\n      id\n      description\n      community {\n        id\n        name\n      }\n      tags {\n        id\n        name\n        description\n      }\n    }\n  }\n}":
    types.FetchExampleEventsDocument,
  "query myEvent($input: PaginatedInputEventsSearchInput!, $userTicketSearchInput: EventsTicketsSearchInput) {\n  searchEvents(input: $input) {\n    data {\n      id\n      name\n      description\n      startDateTime\n      endDateTime\n      address\n      bannerImageSanityRef\n      community {\n        id\n        name\n      }\n      status\n      usersTickets(input: $userTicketSearchInput) {\n        id\n        approvalStatus\n        paymentStatus\n        redemptionStatus\n        createdAt\n        ticketTemplate {\n          id\n          name\n          description\n        }\n      }\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}":
    types.MyEventDocument,
  "query myEvents($input: PaginatedInputEventsSearchInput!, $userTicketSearchInput: EventsTicketsSearchInput) {\n  searchEvents(input: $input) {\n    data {\n      id\n      name\n      description\n      startDateTime\n      address\n      bannerImageSanityRef\n      community {\n        id\n        name\n      }\n      status\n      usersTickets(input: $userTicketSearchInput) {\n        id\n        approvalStatus\n        paymentStatus\n        redemptionStatus\n        ticketTemplate {\n          description\n          id\n        }\n      }\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}":
    types.MyEventsDocument,
  "query MyPurchaseOrders($input: PaginatedInputMyPurchaseOrdersInput!) {\n  myPurchaseOrders(input: $input) {\n    data {\n      id\n      finalPrice\n      paymentPlatform\n      createdAt\n      currency {\n        id\n        currency\n      }\n      tickets {\n        id\n        ticketTemplate {\n          id\n          name\n          event {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n}":
    types.MyPurchaseOrdersDocument,
  "query SearchUsers($input: PaginatedInputUserSearchValues!) {\n  userSearch(input: $input) {\n    data {\n      id\n      username\n      name\n      lastName\n      imageUrl\n      email\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}":
    types.SearchUsersDocument,
  "query myProfile {\n  me {\n    id\n    bio\n    lastName\n    username\n    imageUrl\n    isSuperAdmin\n    email\n    name\n    impersonatedUser {\n      id\n      name\n    }\n    communities {\n      id\n      name\n    }\n  }\n}":
    types.MyProfileDocument,
  "mutation CheckPurchaseOrderStatus($input: CheckForPurchaseOrderInput!) {\n  checkPurchaseOrderStatus(input: $input) {\n    status\n    tickets {\n      approvalStatus\n      paymentStatus\n      redemptionStatus\n    }\n  }\n}":
    types.CheckPurchaseOrderStatusDocument,
  "mutation createPurchaseOrder($input: TicketClaimInput!) {\n  claimUserTicket(input: $input) {\n    __typename\n    ... on PurchaseOrder {\n      __typename\n      id\n      currency {\n        id\n      }\n      finalPrice\n      paymentLink\n      status\n      tickets {\n        id\n        approvalStatus\n        redemptionStatus\n        paymentStatus\n      }\n    }\n    ... on RedeemUserTicketError {\n      __typename\n      error\n      errorMessage\n    }\n  }\n}":
    types.CreatePurchaseOrderDocument,
  "fragment EventTicketFragment on Ticket {\n  id\n  name\n  description\n  quantity\n  isFree\n  startDateTime\n  status\n  isUnlimited\n  prices {\n    id\n    amount\n    currency {\n      currency\n      id\n    }\n  }\n}":
    types.EventTicketFragmentFragmentDoc,
  "query getEventAndTickets($input: String!) {\n  event(id: $input) {\n    id\n    name\n    address\n    description\n    startDateTime\n    endDateTime\n    status\n    community {\n      name\n    }\n    users {\n      id\n      name\n    }\n    tickets {\n      ...EventTicketFragment\n    }\n  }\n}":
    types.GetEventAndTicketsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query FetchExampleEvents($input: PaginatedInputEventsSearchInput!) {\n  searchEvents(input: $input) {\n    data {\n      id\n      description\n      community {\n        id\n        name\n      }\n      tags {\n        id\n        name\n        description\n      }\n    }\n  }\n}",
): (typeof documents)["query FetchExampleEvents($input: PaginatedInputEventsSearchInput!) {\n  searchEvents(input: $input) {\n    data {\n      id\n      description\n      community {\n        id\n        name\n      }\n      tags {\n        id\n        name\n        description\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query myEvent($input: PaginatedInputEventsSearchInput!, $userTicketSearchInput: EventsTicketsSearchInput) {\n  searchEvents(input: $input) {\n    data {\n      id\n      name\n      description\n      startDateTime\n      endDateTime\n      address\n      bannerImageSanityRef\n      community {\n        id\n        name\n      }\n      status\n      usersTickets(input: $userTicketSearchInput) {\n        id\n        approvalStatus\n        paymentStatus\n        redemptionStatus\n        createdAt\n        ticketTemplate {\n          id\n          name\n          description\n        }\n      }\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}",
): (typeof documents)["query myEvent($input: PaginatedInputEventsSearchInput!, $userTicketSearchInput: EventsTicketsSearchInput) {\n  searchEvents(input: $input) {\n    data {\n      id\n      name\n      description\n      startDateTime\n      endDateTime\n      address\n      bannerImageSanityRef\n      community {\n        id\n        name\n      }\n      status\n      usersTickets(input: $userTicketSearchInput) {\n        id\n        approvalStatus\n        paymentStatus\n        redemptionStatus\n        createdAt\n        ticketTemplate {\n          id\n          name\n          description\n        }\n      }\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query myEvents($input: PaginatedInputEventsSearchInput!, $userTicketSearchInput: EventsTicketsSearchInput) {\n  searchEvents(input: $input) {\n    data {\n      id\n      name\n      description\n      startDateTime\n      address\n      bannerImageSanityRef\n      community {\n        id\n        name\n      }\n      status\n      usersTickets(input: $userTicketSearchInput) {\n        id\n        approvalStatus\n        paymentStatus\n        redemptionStatus\n        ticketTemplate {\n          description\n          id\n        }\n      }\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}",
): (typeof documents)["query myEvents($input: PaginatedInputEventsSearchInput!, $userTicketSearchInput: EventsTicketsSearchInput) {\n  searchEvents(input: $input) {\n    data {\n      id\n      name\n      description\n      startDateTime\n      address\n      bannerImageSanityRef\n      community {\n        id\n        name\n      }\n      status\n      usersTickets(input: $userTicketSearchInput) {\n        id\n        approvalStatus\n        paymentStatus\n        redemptionStatus\n        ticketTemplate {\n          description\n          id\n        }\n      }\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query MyPurchaseOrders($input: PaginatedInputMyPurchaseOrdersInput!) {\n  myPurchaseOrders(input: $input) {\n    data {\n      id\n      finalPrice\n      paymentPlatform\n      createdAt\n      currency {\n        id\n        currency\n      }\n      tickets {\n        id\n        ticketTemplate {\n          id\n          name\n          event {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n}",
): (typeof documents)["query MyPurchaseOrders($input: PaginatedInputMyPurchaseOrdersInput!) {\n  myPurchaseOrders(input: $input) {\n    data {\n      id\n      finalPrice\n      paymentPlatform\n      createdAt\n      currency {\n        id\n        currency\n      }\n      tickets {\n        id\n        ticketTemplate {\n          id\n          name\n          event {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query SearchUsers($input: PaginatedInputUserSearchValues!) {\n  userSearch(input: $input) {\n    data {\n      id\n      username\n      name\n      lastName\n      imageUrl\n      email\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}",
): (typeof documents)["query SearchUsers($input: PaginatedInputUserSearchValues!) {\n  userSearch(input: $input) {\n    data {\n      id\n      username\n      name\n      lastName\n      imageUrl\n      email\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query myProfile {\n  me {\n    id\n    bio\n    lastName\n    username\n    imageUrl\n    isSuperAdmin\n    email\n    name\n    impersonatedUser {\n      id\n      name\n    }\n    communities {\n      id\n      name\n    }\n  }\n}",
): (typeof documents)["query myProfile {\n  me {\n    id\n    bio\n    lastName\n    username\n    imageUrl\n    isSuperAdmin\n    email\n    name\n    impersonatedUser {\n      id\n      name\n    }\n    communities {\n      id\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CheckPurchaseOrderStatus($input: CheckForPurchaseOrderInput!) {\n  checkPurchaseOrderStatus(input: $input) {\n    status\n    tickets {\n      approvalStatus\n      paymentStatus\n      redemptionStatus\n    }\n  }\n}",
): (typeof documents)["mutation CheckPurchaseOrderStatus($input: CheckForPurchaseOrderInput!) {\n  checkPurchaseOrderStatus(input: $input) {\n    status\n    tickets {\n      approvalStatus\n      paymentStatus\n      redemptionStatus\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation createPurchaseOrder($input: TicketClaimInput!) {\n  claimUserTicket(input: $input) {\n    __typename\n    ... on PurchaseOrder {\n      __typename\n      id\n      currency {\n        id\n      }\n      finalPrice\n      paymentLink\n      status\n      tickets {\n        id\n        approvalStatus\n        redemptionStatus\n        paymentStatus\n      }\n    }\n    ... on RedeemUserTicketError {\n      __typename\n      error\n      errorMessage\n    }\n  }\n}",
): (typeof documents)["mutation createPurchaseOrder($input: TicketClaimInput!) {\n  claimUserTicket(input: $input) {\n    __typename\n    ... on PurchaseOrder {\n      __typename\n      id\n      currency {\n        id\n      }\n      finalPrice\n      paymentLink\n      status\n      tickets {\n        id\n        approvalStatus\n        redemptionStatus\n        paymentStatus\n      }\n    }\n    ... on RedeemUserTicketError {\n      __typename\n      error\n      errorMessage\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment EventTicketFragment on Ticket {\n  id\n  name\n  description\n  quantity\n  isFree\n  startDateTime\n  status\n  isUnlimited\n  prices {\n    id\n    amount\n    currency {\n      currency\n      id\n    }\n  }\n}",
): (typeof documents)["fragment EventTicketFragment on Ticket {\n  id\n  name\n  description\n  quantity\n  isFree\n  startDateTime\n  status\n  isUnlimited\n  prices {\n    id\n    amount\n    currency {\n      currency\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query getEventAndTickets($input: String!) {\n  event(id: $input) {\n    id\n    name\n    address\n    description\n    startDateTime\n    endDateTime\n    status\n    community {\n      name\n    }\n    users {\n      id\n      name\n    }\n    tickets {\n      ...EventTicketFragment\n    }\n  }\n}",
): (typeof documents)["query getEventAndTickets($input: String!) {\n  event(id: $input) {\n    id\n    name\n    address\n    description\n    startDateTime\n    endDateTime\n    status\n    community {\n      name\n    }\n    users {\n      id\n      name\n    }\n    tickets {\n      ...EventTicketFragment\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
