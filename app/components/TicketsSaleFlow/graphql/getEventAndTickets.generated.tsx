/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable */
/* prettier-ignore */
/* This file is automatically generated. Please do not modify it manually. */
import * as Types from '../../../api/gql/graphql';

import { gql } from "graphql-tag";
import { EventTicketFragmentFragmentDoc } from "./EventTicketFragment.generated";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetEventAndTicketsQueryVariables = Types.Exact<{
  input: Types.Scalars["String"]["input"];
}>;

export type GetEventAndTicketsQuery = {
  __typename?: "Query";
  event?: {
    __typename?: "Event";
    id: string;
    name: string;
    address?: string | null;
    description?: string | null;
    startDateTime: any;
    endDateTime?: any | null;
    status: Types.EventStatus;
    logoImage?: { __typename?: "Image"; url: string } | null;
    bannerImage?: { __typename?: "Image"; url: string } | null;
    mobileBannerImage?: { __typename?: "Image"; url: string } | null;
    community?: { __typename?: "Community"; name?: string | null } | null;
    users: Array<{ __typename?: "User"; id: string; name?: string | null }>;
    tickets: Array<{
      __typename?: "Ticket";
      id: string;
      name: string;
      description?: string | null;
      quantity?: number | null;
      isFree: boolean;
      startDateTime: any;
      status: Types.TicketTemplateStatus;
      isUnlimited: boolean;
      visibility: Types.TicketTemplateVisibility;
      prices?: Array<{
        __typename?: "Price";
        id: string;
        amount: number;
        currency: {
          __typename?: "AllowedCurrency";
          currency: string;
          id: string;
        };
      }> | null;
    }>;
  } | null;
};

export const GetEventAndTicketsDocument = gql`
  query getEventAndTickets($input: String!) {
    event(id: $input) {
      id
      name
      address
      description
      startDateTime
      endDateTime
      status
      logoImage {
        url
      }
      bannerImage {
        url
      }
      mobileBannerImage {
        url
      }
      community {
        name
      }
      users {
        id
        name
      }
      tickets {
        ...EventTicketFragment
      }
    }
  }
  ${EventTicketFragmentFragmentDoc}
`;

/**
 * __useGetEventAndTicketsQuery__
 *
 * To run a query within a React component, call `useGetEventAndTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventAndTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventAndTicketsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEventAndTicketsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetEventAndTicketsQuery,
    GetEventAndTicketsQueryVariables
  > &
    (
      | { variables: GetEventAndTicketsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetEventAndTicketsQuery,
    GetEventAndTicketsQueryVariables
  >(GetEventAndTicketsDocument, options);
}
export function useGetEventAndTicketsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEventAndTicketsQuery,
    GetEventAndTicketsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetEventAndTicketsQuery,
    GetEventAndTicketsQueryVariables
  >(GetEventAndTicketsDocument, options);
}
export function useGetEventAndTicketsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetEventAndTicketsQuery,
    GetEventAndTicketsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetEventAndTicketsQuery,
    GetEventAndTicketsQueryVariables
  >(GetEventAndTicketsDocument, options);
}
export type GetEventAndTicketsQueryHookResult = ReturnType<
  typeof useGetEventAndTicketsQuery
>;
export type GetEventAndTicketsLazyQueryHookResult = ReturnType<
  typeof useGetEventAndTicketsLazyQuery
>;
export type GetEventAndTicketsSuspenseQueryHookResult = ReturnType<
  typeof useGetEventAndTicketsSuspenseQuery
>;
export type GetEventAndTicketsQueryResult = Apollo.QueryResult<
  GetEventAndTicketsQuery,
  GetEventAndTicketsQueryVariables
>;
