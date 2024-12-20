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
  "mutation claimUserTicketAddons($addonsClaims: [ClaimUserTicketAddonInput!]!) {\n  claimUserTicketAddons(addonsClaims: $addonsClaims) {\n    __typename\n    ... on PurchaseOrder {\n      __typename\n      id\n      status\n      userTicketAddons {\n        id\n        approvalStatus\n        redemptionStatus\n      }\n    }\n    ... on RedeemUserTicketAddonsError {\n      __typename\n      error\n      errorMessage\n    }\n  }\n}":
    types.ClaimUserTicketAddonsDocument,
  "query myEvent($input: PaginatedInputEventsSearchInput!, $userTicketSearchInput: EventsTicketsSearchInput) {\n  searchEvents(input: $input) {\n    data {\n      id\n      name\n      description\n      startDateTime\n      endDateTime\n      address\n      publicShareURL\n      previewImage {\n        url\n      }\n      bannerImage {\n        url\n      }\n      mobileBannerImage {\n        url\n      }\n      community {\n        id\n        name\n      }\n      status\n      usersTickets(input: $userTicketSearchInput) {\n        id\n        approvalStatus\n        paymentStatus\n        redemptionStatus\n        createdAt\n        publicId\n        ticketTemplate {\n          id\n          name\n          description\n        }\n        userTicketAddons {\n          addonId\n        }\n      }\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}":
    types.MyEventDocument,
  "query myEventAddons($eventId: String!) {\n  searchAddons(eventId: $eventId) {\n    id\n    description\n    isFree\n    maxPerTicket\n    name\n    totalStock\n    constraints {\n      id\n      addonId\n      relatedAddonId\n      constraintType\n    }\n    ticketAddons {\n      id\n      addonId\n      orderDisplay\n      ticketId\n    }\n  }\n}":
    types.MyEventAddonsDocument,
  "mutation transferTicket($ticketId: String!, $input: UserTicketTransferInfoInput!) {\n  transferMyTicketToUser(ticketId: $ticketId, input: $input) {\n    id\n    status\n    expirationDate\n    transferMessage\n    sender {\n      email\n      name\n    }\n    recipient {\n      email\n      name\n    }\n    userTicket {\n      id\n      approvalStatus\n    }\n  }\n}":
    types.TransferTicketDocument,
  "query myEvents($input: PaginatedInputEventsSearchInput!, $userTicketSearchInput: EventsTicketsSearchInput) {\n  searchEvents(input: $input) {\n    data {\n      id\n      name\n      description\n      startDateTime\n      address\n      previewImage {\n        url\n      }\n      community {\n        id\n        name\n      }\n      status\n      usersTickets(input: $userTicketSearchInput) {\n        id\n        approvalStatus\n        paymentStatus\n        redemptionStatus\n        ticketTemplate {\n          description\n          id\n        }\n      }\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}":
    types.MyEventsDocument,
  "query myReceivedTransfers {\n  myTicketTransfers(type: RECEIVED) {\n    createdAt\n    expirationDate\n    id\n    sender {\n      email\n      name\n    }\n    status\n    transferMessage\n    userTicket {\n      id\n      ticketTemplate {\n        name\n        event {\n          id\n          name\n        }\n      }\n    }\n  }\n}":
    types.MyReceivedTransfersDocument,
  "query MyPurchaseOrders($input: PaginatedInputMyPurchaseOrdersInput!) {\n  myPurchaseOrders(input: $input) {\n    data {\n      id\n      finalPrice\n      paymentPlatform\n      createdAt\n      currency {\n        id\n        currency\n      }\n      tickets {\n        id\n        ticketTemplate {\n          id\n          name\n          event {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n}":
    types.MyPurchaseOrdersDocument,
  "mutation AcceptTransferredTicket($transferId: String!) {\n  acceptTransferredTicket(transferId: $transferId) {\n    id\n    status\n    userTicket {\n      id\n      user {\n        id\n      }\n    }\n  }\n}":
    types.AcceptTransferredTicketDocument,
  "query myTicketTransfers {\n  myTicketTransfers {\n    createdAt\n    expirationDate\n    id\n    recipient {\n      email\n      name\n    }\n    sender {\n      email\n      name\n    }\n    status\n    transferMessage\n    userTicket {\n      id\n      ticketTemplate {\n        name\n        event {\n          id\n          name\n        }\n      }\n    }\n  }\n}":
    types.MyTicketTransfersDocument,
  "query SearchUsers($input: PaginatedInputUserSearchValues!) {\n  userSearch(input: $input) {\n    data {\n      id\n      username\n      name\n      lastName\n      imageUrl\n      email\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}":
    types.SearchUsersDocument,
  "mutation updateUser($input: userEditInput!) {\n  updateUser(input: $input) {\n    id\n    name\n    lastName\n    username\n    bio\n    email\n  }\n}":
    types.UpdateUserDocument,
  "query myProfile {\n  me {\n    id\n    bio\n    lastName\n    username\n    imageUrl\n    isSuperAdmin\n    email\n    name\n    impersonatedUser {\n      id\n      name\n    }\n    communities {\n      id\n      name\n    }\n  }\n}":
    types.MyProfileDocument,
  "mutation CheckPurchaseOrderStatus($input: CheckForPurchaseOrderInput!) {\n  checkPurchaseOrderStatus(input: $input) {\n    id\n    paymentLink\n    status\n    finalPrice\n    paymentPlatform\n    createdAt\n    publicId\n    currency {\n      id\n      currency\n    }\n    tickets {\n      id\n      approvalStatus\n      paymentStatus\n      redemptionStatus\n      publicId\n      ticketTemplate {\n        id\n        name\n        description\n        isFree\n        event {\n          id\n          name\n          address\n          description\n          startDateTime\n          endDateTime\n          status\n          publicShareURL\n          logoImage {\n            url\n          }\n          community {\n            name\n          }\n        }\n        prices {\n          id\n          amount\n          currency {\n            currency\n            id\n          }\n        }\n      }\n    }\n  }\n}":
    types.CheckPurchaseOrderStatusDocument,
  "fragment EventTicketFragment on Ticket {\n  id\n  name\n  description\n  quantity\n  isFree\n  startDateTime\n  status\n  isUnlimited\n  visibility\n  prices {\n    id\n    amount\n    currency {\n      currency\n      id\n    }\n  }\n}":
    types.EventTicketFragmentFragmentDoc,
  "mutation createPurchaseOrder($input: TicketClaimInput!) {\n  claimUserTicket(input: $input) {\n    __typename\n    ... on PurchaseOrder {\n      __typename\n      id\n      currency {\n        id\n      }\n      finalPrice\n      paymentLink\n      status\n      tickets {\n        id\n        approvalStatus\n        redemptionStatus\n        paymentStatus\n      }\n    }\n    ... on RedeemUserTicketError {\n      __typename\n      error\n      errorMessage\n    }\n  }\n}":
    types.CreatePurchaseOrderDocument,
  "query getEventAndTickets($id: String!, $coupon: String) {\n  event(id: $id) {\n    id\n    name\n    address\n    description\n    startDateTime\n    endDateTime\n    status\n    logoImage {\n      url\n    }\n    bannerImage {\n      url\n    }\n    mobileBannerImage {\n      url\n    }\n    community {\n      name\n    }\n    users {\n      id\n      name\n    }\n    tickets(input: {coupon: $coupon}) {\n      ...EventTicketFragment\n    }\n  }\n}":
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
  source: "mutation claimUserTicketAddons($addonsClaims: [ClaimUserTicketAddonInput!]!) {\n  claimUserTicketAddons(addonsClaims: $addonsClaims) {\n    __typename\n    ... on PurchaseOrder {\n      __typename\n      id\n      status\n      userTicketAddons {\n        id\n        approvalStatus\n        redemptionStatus\n      }\n    }\n    ... on RedeemUserTicketAddonsError {\n      __typename\n      error\n      errorMessage\n    }\n  }\n}",
): (typeof documents)["mutation claimUserTicketAddons($addonsClaims: [ClaimUserTicketAddonInput!]!) {\n  claimUserTicketAddons(addonsClaims: $addonsClaims) {\n    __typename\n    ... on PurchaseOrder {\n      __typename\n      id\n      status\n      userTicketAddons {\n        id\n        approvalStatus\n        redemptionStatus\n      }\n    }\n    ... on RedeemUserTicketAddonsError {\n      __typename\n      error\n      errorMessage\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query myEvent($input: PaginatedInputEventsSearchInput!, $userTicketSearchInput: EventsTicketsSearchInput) {\n  searchEvents(input: $input) {\n    data {\n      id\n      name\n      description\n      startDateTime\n      endDateTime\n      address\n      publicShareURL\n      previewImage {\n        url\n      }\n      bannerImage {\n        url\n      }\n      mobileBannerImage {\n        url\n      }\n      community {\n        id\n        name\n      }\n      status\n      usersTickets(input: $userTicketSearchInput) {\n        id\n        approvalStatus\n        paymentStatus\n        redemptionStatus\n        createdAt\n        publicId\n        ticketTemplate {\n          id\n          name\n          description\n        }\n        userTicketAddons {\n          addonId\n        }\n      }\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}",
): (typeof documents)["query myEvent($input: PaginatedInputEventsSearchInput!, $userTicketSearchInput: EventsTicketsSearchInput) {\n  searchEvents(input: $input) {\n    data {\n      id\n      name\n      description\n      startDateTime\n      endDateTime\n      address\n      publicShareURL\n      previewImage {\n        url\n      }\n      bannerImage {\n        url\n      }\n      mobileBannerImage {\n        url\n      }\n      community {\n        id\n        name\n      }\n      status\n      usersTickets(input: $userTicketSearchInput) {\n        id\n        approvalStatus\n        paymentStatus\n        redemptionStatus\n        createdAt\n        publicId\n        ticketTemplate {\n          id\n          name\n          description\n        }\n        userTicketAddons {\n          addonId\n        }\n      }\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query myEventAddons($eventId: String!) {\n  searchAddons(eventId: $eventId) {\n    id\n    description\n    isFree\n    maxPerTicket\n    name\n    totalStock\n    constraints {\n      id\n      addonId\n      relatedAddonId\n      constraintType\n    }\n    ticketAddons {\n      id\n      addonId\n      orderDisplay\n      ticketId\n    }\n  }\n}",
): (typeof documents)["query myEventAddons($eventId: String!) {\n  searchAddons(eventId: $eventId) {\n    id\n    description\n    isFree\n    maxPerTicket\n    name\n    totalStock\n    constraints {\n      id\n      addonId\n      relatedAddonId\n      constraintType\n    }\n    ticketAddons {\n      id\n      addonId\n      orderDisplay\n      ticketId\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation transferTicket($ticketId: String!, $input: UserTicketTransferInfoInput!) {\n  transferMyTicketToUser(ticketId: $ticketId, input: $input) {\n    id\n    status\n    expirationDate\n    transferMessage\n    sender {\n      email\n      name\n    }\n    recipient {\n      email\n      name\n    }\n    userTicket {\n      id\n      approvalStatus\n    }\n  }\n}",
): (typeof documents)["mutation transferTicket($ticketId: String!, $input: UserTicketTransferInfoInput!) {\n  transferMyTicketToUser(ticketId: $ticketId, input: $input) {\n    id\n    status\n    expirationDate\n    transferMessage\n    sender {\n      email\n      name\n    }\n    recipient {\n      email\n      name\n    }\n    userTicket {\n      id\n      approvalStatus\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query myEvents($input: PaginatedInputEventsSearchInput!, $userTicketSearchInput: EventsTicketsSearchInput) {\n  searchEvents(input: $input) {\n    data {\n      id\n      name\n      description\n      startDateTime\n      address\n      previewImage {\n        url\n      }\n      community {\n        id\n        name\n      }\n      status\n      usersTickets(input: $userTicketSearchInput) {\n        id\n        approvalStatus\n        paymentStatus\n        redemptionStatus\n        ticketTemplate {\n          description\n          id\n        }\n      }\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}",
): (typeof documents)["query myEvents($input: PaginatedInputEventsSearchInput!, $userTicketSearchInput: EventsTicketsSearchInput) {\n  searchEvents(input: $input) {\n    data {\n      id\n      name\n      description\n      startDateTime\n      address\n      previewImage {\n        url\n      }\n      community {\n        id\n        name\n      }\n      status\n      usersTickets(input: $userTicketSearchInput) {\n        id\n        approvalStatus\n        paymentStatus\n        redemptionStatus\n        ticketTemplate {\n          description\n          id\n        }\n      }\n    }\n    pagination {\n      currentPage\n      pageSize\n      totalPages\n      totalRecords\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query myReceivedTransfers {\n  myTicketTransfers(type: RECEIVED) {\n    createdAt\n    expirationDate\n    id\n    sender {\n      email\n      name\n    }\n    status\n    transferMessage\n    userTicket {\n      id\n      ticketTemplate {\n        name\n        event {\n          id\n          name\n        }\n      }\n    }\n  }\n}",
): (typeof documents)["query myReceivedTransfers {\n  myTicketTransfers(type: RECEIVED) {\n    createdAt\n    expirationDate\n    id\n    sender {\n      email\n      name\n    }\n    status\n    transferMessage\n    userTicket {\n      id\n      ticketTemplate {\n        name\n        event {\n          id\n          name\n        }\n      }\n    }\n  }\n}"];
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
  source: "mutation AcceptTransferredTicket($transferId: String!) {\n  acceptTransferredTicket(transferId: $transferId) {\n    id\n    status\n    userTicket {\n      id\n      user {\n        id\n      }\n    }\n  }\n}",
): (typeof documents)["mutation AcceptTransferredTicket($transferId: String!) {\n  acceptTransferredTicket(transferId: $transferId) {\n    id\n    status\n    userTicket {\n      id\n      user {\n        id\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query myTicketTransfers {\n  myTicketTransfers {\n    createdAt\n    expirationDate\n    id\n    recipient {\n      email\n      name\n    }\n    sender {\n      email\n      name\n    }\n    status\n    transferMessage\n    userTicket {\n      id\n      ticketTemplate {\n        name\n        event {\n          id\n          name\n        }\n      }\n    }\n  }\n}",
): (typeof documents)["query myTicketTransfers {\n  myTicketTransfers {\n    createdAt\n    expirationDate\n    id\n    recipient {\n      email\n      name\n    }\n    sender {\n      email\n      name\n    }\n    status\n    transferMessage\n    userTicket {\n      id\n      ticketTemplate {\n        name\n        event {\n          id\n          name\n        }\n      }\n    }\n  }\n}"];
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
  source: "mutation updateUser($input: userEditInput!) {\n  updateUser(input: $input) {\n    id\n    name\n    lastName\n    username\n    bio\n    email\n  }\n}",
): (typeof documents)["mutation updateUser($input: userEditInput!) {\n  updateUser(input: $input) {\n    id\n    name\n    lastName\n    username\n    bio\n    email\n  }\n}"];
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
  source: "mutation CheckPurchaseOrderStatus($input: CheckForPurchaseOrderInput!) {\n  checkPurchaseOrderStatus(input: $input) {\n    id\n    paymentLink\n    status\n    finalPrice\n    paymentPlatform\n    createdAt\n    publicId\n    currency {\n      id\n      currency\n    }\n    tickets {\n      id\n      approvalStatus\n      paymentStatus\n      redemptionStatus\n      publicId\n      ticketTemplate {\n        id\n        name\n        description\n        isFree\n        event {\n          id\n          name\n          address\n          description\n          startDateTime\n          endDateTime\n          status\n          publicShareURL\n          logoImage {\n            url\n          }\n          community {\n            name\n          }\n        }\n        prices {\n          id\n          amount\n          currency {\n            currency\n            id\n          }\n        }\n      }\n    }\n  }\n}",
): (typeof documents)["mutation CheckPurchaseOrderStatus($input: CheckForPurchaseOrderInput!) {\n  checkPurchaseOrderStatus(input: $input) {\n    id\n    paymentLink\n    status\n    finalPrice\n    paymentPlatform\n    createdAt\n    publicId\n    currency {\n      id\n      currency\n    }\n    tickets {\n      id\n      approvalStatus\n      paymentStatus\n      redemptionStatus\n      publicId\n      ticketTemplate {\n        id\n        name\n        description\n        isFree\n        event {\n          id\n          name\n          address\n          description\n          startDateTime\n          endDateTime\n          status\n          publicShareURL\n          logoImage {\n            url\n          }\n          community {\n            name\n          }\n        }\n        prices {\n          id\n          amount\n          currency {\n            currency\n            id\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment EventTicketFragment on Ticket {\n  id\n  name\n  description\n  quantity\n  isFree\n  startDateTime\n  status\n  isUnlimited\n  visibility\n  prices {\n    id\n    amount\n    currency {\n      currency\n      id\n    }\n  }\n}",
): (typeof documents)["fragment EventTicketFragment on Ticket {\n  id\n  name\n  description\n  quantity\n  isFree\n  startDateTime\n  status\n  isUnlimited\n  visibility\n  prices {\n    id\n    amount\n    currency {\n      currency\n      id\n    }\n  }\n}"];
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
  source: "query getEventAndTickets($id: String!, $coupon: String) {\n  event(id: $id) {\n    id\n    name\n    address\n    description\n    startDateTime\n    endDateTime\n    status\n    logoImage {\n      url\n    }\n    bannerImage {\n      url\n    }\n    mobileBannerImage {\n      url\n    }\n    community {\n      name\n    }\n    users {\n      id\n      name\n    }\n    tickets(input: {coupon: $coupon}) {\n      ...EventTicketFragment\n    }\n  }\n}",
): (typeof documents)["query getEventAndTickets($id: String!, $coupon: String) {\n  event(id: $id) {\n    id\n    name\n    address\n    description\n    startDateTime\n    endDateTime\n    status\n    logoImage {\n      url\n    }\n    bannerImage {\n      url\n    }\n    mobileBannerImage {\n      url\n    }\n    community {\n      name\n    }\n    users {\n      id\n      name\n    }\n    tickets(input: {coupon: $coupon}) {\n      ...EventTicketFragment\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
