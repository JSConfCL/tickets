/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable */
/* prettier-ignore */
/* This file is automatically generated. Please do not modify it manually. */
import * as Types from '../../../../src/api/gql/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/experimental-nextjs-app-support/ssr';
const defaultOptions = {} as const;
export type GetLatestEventsQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.EventsSearchInput>;
}>;


export type GetLatestEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: string, name: string, description?: string | null, startDateTime: any, endDateTime?: any | null }> };


export const GetLatestEventsDocument = gql`
    query getLatestEvents($input: EventsSearchInput) {
  events(input: $input) {
    id
    name
    description
    startDateTime
    endDateTime
  }
}
    `;

/**
 * __useGetLatestEventsQuery__
 *
 * To run a query within a React component, call `useGetLatestEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLatestEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetLatestEventsQuery, GetLatestEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetLatestEventsQuery, GetLatestEventsQueryVariables>(GetLatestEventsDocument, options);
      }
export function useGetLatestEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLatestEventsQuery, GetLatestEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetLatestEventsQuery, GetLatestEventsQueryVariables>(GetLatestEventsDocument, options);
        }
export function useGetLatestEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetLatestEventsQuery, GetLatestEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetLatestEventsQuery, GetLatestEventsQueryVariables>(GetLatestEventsDocument, options);
        }
export type GetLatestEventsQueryHookResult = ReturnType<typeof useGetLatestEventsQuery>;
export type GetLatestEventsLazyQueryHookResult = ReturnType<typeof useGetLatestEventsLazyQuery>;
export type GetLatestEventsSuspenseQueryHookResult = ReturnType<typeof useGetLatestEventsSuspenseQuery>;
export type GetLatestEventsQueryResult = Apollo.QueryResult<GetLatestEventsQuery, GetLatestEventsQueryVariables>;