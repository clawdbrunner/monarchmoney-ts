import { GraphQLClient } from '../../core/transport/graphql';
import type { DateRange } from '../../core/types';

export interface CashflowFilters extends DateRange {
  accounts?: string[];
  categories?: string[];
  merchants?: string[];
  tags?: string[];
  search?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface CashflowSummary {
  sumIncome: number;
  sumExpense: number;
  savings?: number;
  savingsRate?: number;
}

export interface CashflowAggregate<T> {
  groupBy: T;
  summary: { sum?: number; sumIncome?: number; sumExpense?: number; savings?: number; savingsRate?: number };
}

const COMMON_GET_CASHFLOW_ENTITY_AGGREGATES = /* GraphQL */ `
  query Common_GetCashFlowEntityAggregates($filters: TransactionFilterInput) {
    byCategory: aggregates(filters: $filters, groupBy: ["category"]) {
      groupBy { category { id name icon group { id type __typename } __typename } __typename }
      summary { sum __typename }
      __typename
    }
    byCategoryGroup: aggregates(filters: $filters, groupBy: ["categoryGroup"]) {
      groupBy { categoryGroup { id name type __typename } __typename }
      summary { sum __typename }
      __typename
    }
    byMerchant: aggregates(filters: $filters, groupBy: ["merchant"]) {
      groupBy { merchant { id name logoUrl __typename } __typename }
      summary { sumIncome sumExpense __typename }
      __typename
    }
    summary: aggregates(filters: $filters, fillEmptyValues: true) {
      summary { sumIncome sumExpense savings savingsRate __typename }
      __typename
    }
  }
`;

const COMMON_GET_CASHFLOW_TIMEFRAME_AGGREGATES = /* GraphQL */ `
  query Common_GetCashFlowTimeframeAggregates($filters: TransactionFilterInput) {
    byYear: aggregates(filters: $filters, groupBy: ["year"]) {
      groupBy { year __typename }
      summary { sumIncome sumExpense savings savingsRate __typename }
      __typename
    }
    byMonth: aggregates(filters: $filters, groupBy: ["month"]) {
      groupBy { month __typename }
      summary { sumIncome sumExpense savings savingsRate __typename }
      __typename
    }
    byQuarter: aggregates(filters: $filters, groupBy: ["quarter"]) {
      groupBy { quarter __typename }
      summary { sumIncome sumExpense savings savingsRate __typename }
      __typename
    }
  }
`;

export class CashflowClient {
  constructor(private graphql: GraphQLClient) {}

  async entityAggregates(filters: CashflowFilters): Promise<{
    byCategory: CashflowAggregate<{ category: { id: string; name: string; icon?: string; group?: { id: string; type?: string } } }>[];
    byCategoryGroup: CashflowAggregate<{ categoryGroup: { id: string; name: string; type?: string } }>[];
    byMerchant: CashflowAggregate<{ merchant: { id: string; name: string; logoUrl?: string } }>[];
    summary: CashflowAggregate<unknown>[];
  }> {
    const data = await this.graphql.query<{
      byCategory: any[];
      byCategoryGroup: any[];
      byMerchant: any[];
      summary: any[];
    }>(COMMON_GET_CASHFLOW_ENTITY_AGGREGATES, { filters });
    return data;
  }

  async timeframeAggregates(filters: CashflowFilters): Promise<{
    byYear: CashflowAggregate<{ year: number }>[];
    byMonth: CashflowAggregate<{ month: string }>[];
    byQuarter: CashflowAggregate<{ quarter: string }>[];
  }> {
    const data = await this.graphql.query<{
      byYear: any[];
      byMonth: any[];
      byQuarter: any[];
    }>(COMMON_GET_CASHFLOW_TIMEFRAME_AGGREGATES, { filters });
    return data;
  }
}
