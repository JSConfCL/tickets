/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable */
/* prettier-ignore */
/* This file is automatically generated. Please do not modify it manually. */
import * as Types from '../../../api/gql/graphql';

import { gql } from "graphql-tag";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type MyTicketsQueryVariables = Types.Exact<{
  input: Types.PaginatedInputMyTicketsSearchValues;
}>;

export type MyTicketsQuery = {
  __typename?: "Query";
  myTickets: {
    __typename?: "PaginatedUserTicket";
    data: Array<{
      __typename?: "UserTicket";
      approvalStatus: Types.TicketApprovalStatus;
      id: string;
      paymentStatus: Types.TicketPaymentStatus;
      redemptionStatus: Types.TicketRedemptionStatus;
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

export const MyTicketsDocument = gql`
  query myTickets($input: PaginatedInputMyTicketsSearchValues!) {
    myTickets(input: $input) {
      data {
        approvalStatus
        id
        paymentStatus
        redemptionStatus
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
 * __useMyTicketsQuery__
 *
 * To run a query within a React component, call `useMyTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTicketsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMyTicketsQuery(
  baseOptions: Apollo.QueryHookOptions<
    MyTicketsQuery,
    MyTicketsQueryVariables
  > &
    (
      | { variables: MyTicketsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyTicketsQuery, MyTicketsQueryVariables>(
    MyTicketsDocument,
    options,
  );
}
export function useMyTicketsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyTicketsQuery,
    MyTicketsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyTicketsQuery, MyTicketsQueryVariables>(
    MyTicketsDocument,
    options,
  );
}
export function useMyTicketsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    MyTicketsQuery,
    MyTicketsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MyTicketsQuery, MyTicketsQueryVariables>(
    MyTicketsDocument,
    options,
  );
}
export type MyTicketsQueryHookResult = ReturnType<typeof useMyTicketsQuery>;
export type MyTicketsLazyQueryHookResult = ReturnType<
  typeof useMyTicketsLazyQuery
>;
export type MyTicketsSuspenseQueryHookResult = ReturnType<
  typeof useMyTicketsSuspenseQuery
>;
export type MyTicketsQueryResult = Apollo.QueryResult<
  MyTicketsQuery,
  MyTicketsQueryVariables
>;
