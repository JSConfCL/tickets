/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "query getEvent($input: String!) {\n  event(id: $input) {\n    id\n    name\n    address\n    description\n    maxAttendees\n    startDateTime\n    status\n    community {\n      name\n    }\n    users {\n      id\n      name\n      lastName\n    }\n  }\n}": types.GetEventDocument,
    "query getLatestEvents($input: EventsSearchInput) {\n  events(input: $input) {\n    id\n    name\n    description\n    startDateTime\n    endDateTime\n  }\n}": types.GetLatestEventsDocument,
    "query FetchExampleEvents {\n  events {\n    id\n    description\n    community {\n      id\n      name\n    }\n    tags {\n      id\n      name\n      description\n    }\n  }\n}": types.FetchExampleEventsDocument,
    "fragment EventTicketFragment on Ticket {\n  id\n  name\n  description\n  quantity\n  isFree\n  startDateTime\n  status\n  isUnlimited\n  prices {\n    id\n    amount\n    currency {\n      currency\n      id\n    }\n  }\n}": types.EventTicketFragmentFragmentDoc,
    "mutation createPurchaseOrder($input: TicketClaimInput!) {\n  claimUserTicket(input: $input) {\n    __typename\n    ... on PurchaseOrder {\n      __typename\n      id\n      currency {\n        id\n      }\n      finalPrice\n      paymentLink\n      status\n      tickets {\n        id\n        approvalStatus\n        status\n        redemptionStatus\n        paymentStatus\n      }\n    }\n    ... on RedeemUserTicketError {\n      __typename\n      error\n      errorMessage\n    }\n  }\n}": types.CreatePurchaseOrderDocument,
    "query getEventAndTickets($input: String!) {\n  event(id: $input) {\n    id\n    name\n    address\n    description\n    maxAttendees\n    startDateTime\n    endDateTime\n    status\n    community {\n      name\n    }\n    users {\n      id\n      name\n    }\n    tickets {\n      ...EventTicketFragment\n    }\n  }\n}": types.GetEventAndTicketsDocument,
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
export function graphql(source: "query getEvent($input: String!) {\n  event(id: $input) {\n    id\n    name\n    address\n    description\n    maxAttendees\n    startDateTime\n    status\n    community {\n      name\n    }\n    users {\n      id\n      name\n      lastName\n    }\n  }\n}"): (typeof documents)["query getEvent($input: String!) {\n  event(id: $input) {\n    id\n    name\n    address\n    description\n    maxAttendees\n    startDateTime\n    status\n    community {\n      name\n    }\n    users {\n      id\n      name\n      lastName\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getLatestEvents($input: EventsSearchInput) {\n  events(input: $input) {\n    id\n    name\n    description\n    startDateTime\n    endDateTime\n  }\n}"): (typeof documents)["query getLatestEvents($input: EventsSearchInput) {\n  events(input: $input) {\n    id\n    name\n    description\n    startDateTime\n    endDateTime\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FetchExampleEvents {\n  events {\n    id\n    description\n    community {\n      id\n      name\n    }\n    tags {\n      id\n      name\n      description\n    }\n  }\n}"): (typeof documents)["query FetchExampleEvents {\n  events {\n    id\n    description\n    community {\n      id\n      name\n    }\n    tags {\n      id\n      name\n      description\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment EventTicketFragment on Ticket {\n  id\n  name\n  description\n  quantity\n  isFree\n  startDateTime\n  status\n  isUnlimited\n  prices {\n    id\n    amount\n    currency {\n      currency\n      id\n    }\n  }\n}"): (typeof documents)["fragment EventTicketFragment on Ticket {\n  id\n  name\n  description\n  quantity\n  isFree\n  startDateTime\n  status\n  isUnlimited\n  prices {\n    id\n    amount\n    currency {\n      currency\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createPurchaseOrder($input: TicketClaimInput!) {\n  claimUserTicket(input: $input) {\n    __typename\n    ... on PurchaseOrder {\n      __typename\n      id\n      currency {\n        id\n      }\n      finalPrice\n      paymentLink\n      status\n      tickets {\n        id\n        approvalStatus\n        status\n        redemptionStatus\n        paymentStatus\n      }\n    }\n    ... on RedeemUserTicketError {\n      __typename\n      error\n      errorMessage\n    }\n  }\n}"): (typeof documents)["mutation createPurchaseOrder($input: TicketClaimInput!) {\n  claimUserTicket(input: $input) {\n    __typename\n    ... on PurchaseOrder {\n      __typename\n      id\n      currency {\n        id\n      }\n      finalPrice\n      paymentLink\n      status\n      tickets {\n        id\n        approvalStatus\n        status\n        redemptionStatus\n        paymentStatus\n      }\n    }\n    ... on RedeemUserTicketError {\n      __typename\n      error\n      errorMessage\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getEventAndTickets($input: String!) {\n  event(id: $input) {\n    id\n    name\n    address\n    description\n    maxAttendees\n    startDateTime\n    endDateTime\n    status\n    community {\n      name\n    }\n    users {\n      id\n      name\n    }\n    tickets {\n      ...EventTicketFragment\n    }\n  }\n}"): (typeof documents)["query getEventAndTickets($input: String!) {\n  event(id: $input) {\n    id\n    name\n    address\n    description\n    maxAttendees\n    startDateTime\n    endDateTime\n    status\n    community {\n      name\n    }\n    users {\n      id\n      name\n    }\n    tickets {\n      ...EventTicketFragment\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;