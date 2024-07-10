/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable */
/* prettier-ignore */
/* This file is automatically generated. Please do not modify it manually. */
import * as Types from '../../../api/gql/graphql';

import { gql } from 'graphql-tag';
export type EventTicketFragmentFragment = { __typename?: 'Ticket', id: string, name: string, description?: string | null, quantity?: number | null, isFree: boolean, startDateTime: any, status: Types.TicketTemplateStatus, isUnlimited: boolean, prices?: Array<{ __typename?: 'Price', id: string, amount: number, currency: { __typename?: 'AllowedCurrency', currency: string, id: string } }> | null };

export const EventTicketFragmentFragmentDoc = gql`
    fragment EventTicketFragment on Ticket {
  id
  name
  description
  quantity
  isFree
  startDateTime
  status
  isUnlimited
  prices {
    id
    amount
    currency {
      currency
      id
    }
  }
}
    `;