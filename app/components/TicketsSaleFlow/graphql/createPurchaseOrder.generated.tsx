/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable */
/* prettier-ignore */
/* This file is automatically generated. Please do not modify it manually. */
import * as Types from '../../../api/gql/graphql';

import { gql } from 'graphql-tag';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreatePurchaseOrderMutationVariables = Types.Exact<{
  input: Types.TicketClaimInput;
}>;


export type CreatePurchaseOrderMutation = { __typename?: 'Mutation', claimUserTicket: { __typename: 'PurchaseOrder', id: string, finalPrice?: number | null, paymentLink?: string | null, status?: Types.PurchaseOrderStatusEnum | null, currency?: { __typename?: 'AllowedCurrency', id: string } | null, tickets: Array<{ __typename?: 'UserTicket', id: string, approvalStatus: Types.TicketApprovalStatus, redemptionStatus: Types.TicketRedemptionStatus, paymentStatus: Types.TicketPaymentStatus }> } | { __typename: 'RedeemUserTicketError', error: boolean, errorMessage: string } };


export const CreatePurchaseOrderDocument = gql`
    mutation createPurchaseOrder($input: TicketClaimInput!) {
  claimUserTicket(input: $input) {
    __typename
    ... on PurchaseOrder {
      __typename
      id
      currency {
        id
      }
      finalPrice
      paymentLink
      status
      tickets {
        id
        approvalStatus
        redemptionStatus
        paymentStatus
      }
    }
    ... on RedeemUserTicketError {
      __typename
      error
      errorMessage
    }
  }
}
    `;
export type CreatePurchaseOrderMutationFn = Apollo.MutationFunction<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>;

/**
 * __useCreatePurchaseOrderMutation__
 *
 * To run a mutation, you first call `useCreatePurchaseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePurchaseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPurchaseOrderMutation, { data, loading, error }] = useCreatePurchaseOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePurchaseOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>(CreatePurchaseOrderDocument, options);
      }
export type CreatePurchaseOrderMutationHookResult = ReturnType<typeof useCreatePurchaseOrderMutation>;
export type CreatePurchaseOrderMutationResult = Apollo.MutationResult<CreatePurchaseOrderMutation>;
export type CreatePurchaseOrderMutationOptions = Apollo.BaseMutationOptions<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>;