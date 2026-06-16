import type { Dispatch, SetStateAction } from "react";

export type CurrencyCode = string;

export type User = {
  id: number;
  username: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  currency?: CurrencyCode;
  income?: number | string;
  slug: string;
  updated_at?: string;
};

export type Category = {
  id: number;
  name: string;
  slug?: string;
};

export type Bill = {
  id: number;
  user_id: number;
  category_id: number;
  category_name?: string;
  name: string;
  amount: number | string;
  due_date: string;
  is_paid: boolean;
  slug: string;
};

export type Subscription = {
  id: number;
  user_id: number;
  category_id: number;
  category_name?: string;
  name: string;
  cost: number | string;
  billing_cycle: string;
  renewal_date: string;
  is_active: boolean;
  slug: string;
};

export type Budget = {
  id: number;
  user_id: number;
  category_id: number;
  category_name?: string;
  name: string;
  amount: number | string;
  slug: string;
};

export type CategorySpend = {
  category_id: number;
  category_name?: string;
  name?: string;
  total?: number | string;
  amount?: number | string;
};

export type CurrencyOption = {
  id?: string;
  value?: string;
  display: string;
  symbol: string;
};

export type BillingCycleOption = {
  id: number;
  value: string;
  displayName: string;
};

export type CategorySpendSummary = {
  grandTotal: number | string;
  categories: CategorySpend[];
};

export type DashboardContextValue = {
  categories: Category[] | null;
  setCategories: Dispatch<SetStateAction<Category[] | null>>;
  categorySpendBy: CategorySpendSummary | null;
  isSpendByLoading: boolean;
  setCategorySpendBy: Dispatch<SetStateAction<CategorySpendSummary | null>>;
  userBills: {
    totalBills: number | string;
    bills: Bill[];
    upcomingBills: Bill[] | null;
    getBills: () => Promise<void>;
    isBillsLoading: boolean;
  };
  userSubscriptions: {
    totalSubscriptions: number | string;
    subscriptions: Subscription[];
    getSubscriptions: () => Promise<void>;
    isSubscriptionsLoading: boolean;
  };
  userBudgets: {
    budgets: Budget[];
    isBudgetsLoading: boolean;
    getBudgets: () => Promise<void>;
  };
  currencies: CurrencyOption[];
  getUserCurrency: (isoCode: string) => CurrencyOption;
  billingCycles: BillingCycleOption[];
};
