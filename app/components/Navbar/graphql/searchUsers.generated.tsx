/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable */
/* prettier-ignore */
/* This file is automatically generated. Please do not modify it manually. */
import * as Types from '../../../api/gql/graphql';

import { gql } from "graphql-tag";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type SearchUsersQueryVariables = Types.Exact<{
  input: Types.PaginatedInputUserSearchValues;
}>;

export type SearchUsersQuery = {
  __typename?: "Query";
  userSearch: {
    __typename?: "PaginatedUser";
    data: Array<{
      __typename?: "User";
      id: string;
      username: string;
      name?: string | null;
      lastName?: string | null;
      imageUrl?: string | null;
      email?: string | null;
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

export const SearchUsersDocument = gql`
  query SearchUsers($input: PaginatedInputUserSearchValues!) {
    userSearch(input: $input) {
      data {
        id
        username
        name
        lastName
        imageUrl
        email
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
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchUsersQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchUsersQuery,
    SearchUsersQueryVariables
  > &
    (
      | { variables: SearchUsersQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(
    SearchUsersDocument,
    options,
  );
}
export function useSearchUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(
    SearchUsersDocument,
    options,
  );
}
export function useSearchUsersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<SearchUsersQuery, SearchUsersQueryVariables>(
    SearchUsersDocument,
    options,
  );
}
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<
  typeof useSearchUsersLazyQuery
>;
export type SearchUsersSuspenseQueryHookResult = ReturnType<
  typeof useSearchUsersSuspenseQuery
>;
export type SearchUsersQueryResult = Apollo.QueryResult<
  SearchUsersQuery,
  SearchUsersQueryVariables
>;