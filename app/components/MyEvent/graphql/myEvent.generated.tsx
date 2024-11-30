/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable */
/* prettier-ignore */
/* This file is automatically generated. Please do not modify it manually. */
import * as Types from '../../../api/gql/graphql';

import { gql } from "graphql-tag";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type MyEventQueryVariables = Types.Exact<{
  input: Types.PaginatedInputEventsSearchInput;
  userTicketSearchInput?: Types.InputMaybe<Types.EventsTicketsSearchInput>;
}>;

export type MyEventQuery = {
  __typename?: "Query";
  searchEvents: {
    __typename?: "PaginatedEvent";
    data: Array<{
      __typename?: "Event";
      id: string;
      name: string;
      description?: string | null;
      startDateTime: any;
      endDateTime?: any | null;
      address?: string | null;
      publicShareURL?: string | null;
      status: Types.EventStatus;
      previewImage?: { __typename?: "Image"; url: string } | null;
      bannerImage?: { __typename?: "Image"; url: string } | null;
      mobileBannerImage?: { __typename?: "Image"; url: string } | null;
      community?: {
        __typename?: "Community";
        id: string;
        name?: string | null;
      } | null;
      usersTickets: Array<{
        __typename?: "UserTicket";
        id: string;
        approvalStatus: Types.TicketApprovalStatus;
        paymentStatus?: Types.PurchaseOrderPaymentStatusEnum | null;
        redemptionStatus: Types.TicketRedemptionStatus;
        createdAt: any;
        publicId: string;
        ticketTemplate: {
          __typename?: "Ticket";
          id: string;
          name: string;
          description?: string | null;
        };
        userTicketAddons: Array<{
          __typename?: "UserTicketAddon";
          addonId: string;
        }>;
      }>;
    }>;
    pagination: {
      __typename?: "Pagination";
      currentPage: number;
      pageSize: number;
      totalPages: number;
      totalRecords: number;
    };
  };
};

export const MyEventDocument = gql`
  query myEvent(
    $input: PaginatedInputEventsSearchInput!
    $userTicketSearchInput: EventsTicketsSearchInput
  ) {
    searchEvents(input: $input) {
      data {
        id
        name
        description
        startDateTime
        endDateTime
        address
        publicShareURL
        previewImage {
          url
        }
        bannerImage {
          url
        }
        mobileBannerImage {
          url
        }
        community {
          id
          name
        }
        status
        usersTickets(input: $userTicketSearchInput) {
          id
          approvalStatus
          paymentStatus
          redemptionStatus
          createdAt
          publicId
          ticketTemplate {
            id
            name
            description
          }
          userTicketAddons {
            addonId
          }
        }
      }
      pagination {
        currentPage
        pageSize
        totalPages
        totalRecords
      }
    }
  }
`;

/**
 * __useMyEventQuery__
 *
 * To run a query within a React component, call `useMyEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyEventQuery({
 *   variables: {
 *      input: // value for 'input'
 *      userTicketSearchInput: // value for 'userTicketSearchInput'
 *   },
 * });
 */
export function useMyEventQuery(
  baseOptions: Apollo.QueryHookOptions<MyEventQuery, MyEventQueryVariables> &
    ({ variables: MyEventQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyEventQuery, MyEventQueryVariables>(
    MyEventDocument,
    options,
  );
}
export function useMyEventLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyEventQuery,
    MyEventQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyEventQuery, MyEventQueryVariables>(
    MyEventDocument,
    options,
  );
}
export function useMyEventSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    MyEventQuery,
    MyEventQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MyEventQuery, MyEventQueryVariables>(
    MyEventDocument,
    options,
  );
}
export type MyEventQueryHookResult = ReturnType<typeof useMyEventQuery>;
export type MyEventLazyQueryHookResult = ReturnType<typeof useMyEventLazyQuery>;
export type MyEventSuspenseQueryHookResult = ReturnType<
  typeof useMyEventSuspenseQuery
>;
export type MyEventQueryResult = Apollo.QueryResult<
  MyEventQuery,
  MyEventQueryVariables
>;
