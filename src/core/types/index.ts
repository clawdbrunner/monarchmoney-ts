export interface Pagination {
  limit?: number;
  offset?: number;
}

export interface DateRange {
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
}

export interface MoneyAmount {
  amount: number;
  currency?: string;
}
