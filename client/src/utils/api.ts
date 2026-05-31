import axios, { type AxiosResponse } from "axios";

import type {
  Bill,
  Budget,
  Category,
  CategorySpend,
  Subscription,
  User,
} from "../types/domain";

type ApiMessageResponse = {
  success?: boolean;
  message?: string;
};

type AuthResponse = ApiMessageResponse & {
  authToken: string;
};

type ProfileResponse = ApiMessageResponse & {
  user: User;
};

type AuthValidationResponse = {
  isValid: boolean;
};

type CategorySpendSummary = {
  grandTotal: number | string;
  categories: CategorySpend[];
};

type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
};

type LoginFormValues = {
  email: string;
  password: string;
};

type EditProfileFormValues = Partial<
  Pick<
    User,
    "first_name" | "last_name" | "username" | "email" | "currency" | "income"
  >
>;

type BillFormValues = Partial<
  Pick<Bill, "category_id" | "name" | "amount" | "due_date" | "is_paid">
>;

type SubscriptionFormValues = Partial<
  Pick<
    Subscription,
    | "category_id"
    | "name"
    | "cost"
    | "billing_cycle"
    | "renewal_date"
    | "is_active"
  >
>;

type BudgetFormValues = Partial<
  Pick<Budget, "category_id" | "name" | "amount">
>;

const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL;

const authHeaders = () => ({
  authorization: `Bearer ${localStorage.getItem("authToken")}`,
});

const userRegister = async (
  formValues: RegisterFormValues,
): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>(
    `${apiBaseUrl}/auth/register`,
    {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    },
  );
  return data;
};

const userLogin = async (
  formValues: LoginFormValues,
): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>(
    `${apiBaseUrl}/auth/login`,
    formValues,
  );
  return data;
};

const getUserData = async (): Promise<ProfileResponse> => {
  const { data } = await axios.get<ProfileResponse>(
    `${apiBaseUrl}/auth/profile`,
    {
      headers: authHeaders(),
    },
  );
  return data;
};

const editUserProfile = async (
  formValues: EditProfileFormValues,
): Promise<ProfileResponse> => {
  const { data } = await axios.put<ProfileResponse>(
    `${apiBaseUrl}/auth/profile/edit`,
    formValues,
    {
      headers: authHeaders(),
    },
  );
  return data;
};

const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get<Category[]>(`${apiBaseUrl}/categories`, {
    headers: authHeaders(),
  });
  return data;
};

const getSpendByCategory = async (): Promise<CategorySpendSummary> => {
  const { data } = await axios.get<CategorySpendSummary>(
    `${apiBaseUrl}/categories/spend-by-category`,
    {
      headers: authHeaders(),
    },
  );
  return data;
};

const getUserBills = async (): Promise<Bill[]> => {
  const { data } = await axios.get<Bill[]>(`${apiBaseUrl}/bills`, {
    headers: authHeaders(),
  });
  return data;
};

const addBill = async (
  formValues: BillFormValues,
): Promise<ApiMessageResponse> => {
  const { data } = await axios.post<ApiMessageResponse>(
    `${apiBaseUrl}/bills`,
    formValues,
    {
      headers: authHeaders(),
    },
  );
  return data;
};

const editBill = async (
  formValues: BillFormValues,
  billSlug: string,
): Promise<ApiMessageResponse> => {
  const { data } = await axios.put<ApiMessageResponse>(
    `${apiBaseUrl}/bills/${billSlug}`,
    formValues,
    {
      headers: authHeaders(),
    },
  );
  return data;
};

const deleteBill = async (
  slug: string,
): Promise<AxiosResponse<ApiMessageResponse>> => {
  return axios.delete<ApiMessageResponse>(`${apiBaseUrl}/bills/${slug}`, {
    headers: authHeaders(),
  });
};

const getUserSubscriptions = async (): Promise<Subscription[]> => {
  const { data } = await axios.get<Subscription[]>(
    `${apiBaseUrl}/subscriptions`,
    {
      headers: authHeaders(),
    },
  );
  return data;
};

const addUserSubscriptions = async (
  formValues: SubscriptionFormValues,
): Promise<ApiMessageResponse> => {
  const { data } = await axios.post<ApiMessageResponse>(
    `${apiBaseUrl}/subscriptions`,
    formValues,
    {
      headers: authHeaders(),
    },
  );
  return data;
};

const editUserSubscriptions = async (
  formValues: SubscriptionFormValues,
  slug: string,
): Promise<ApiMessageResponse> => {
  const { data } = await axios.put<ApiMessageResponse>(
    `${apiBaseUrl}/subscriptions/${slug}`,
    formValues,
    {
      headers: authHeaders(),
    },
  );
  return data;
};

const deleteUserSubscription = async (
  slug: string,
): Promise<AxiosResponse<ApiMessageResponse>> => {
  return axios.delete<ApiMessageResponse>(
    `${apiBaseUrl}/subscriptions/${slug}`,
    {
      headers: authHeaders(),
    },
  );
};

const getUserBudgets = async (): Promise<Budget[]> => {
  const { data } = await axios.get<Budget[]>(`${apiBaseUrl}/budgets`, {
    headers: authHeaders(),
  });
  return data;
};

const addUserBudgets = async (
  formValues: BudgetFormValues,
): Promise<ApiMessageResponse> => {
  const { data } = await axios.post<ApiMessageResponse>(
    `${apiBaseUrl}/budgets`,
    formValues,
    {
      headers: authHeaders(),
    },
  );
  return data;
};

const editUserBudgets = async (
  formValues: BudgetFormValues,
  slug: string,
): Promise<ApiMessageResponse> => {
  const { data } = await axios.put<ApiMessageResponse>(
    `${apiBaseUrl}/budgets/${slug}`,
    formValues,
    {
      headers: authHeaders(),
    },
  );
  return data;
};

const deleteUserBudget = async (
  slug: string,
): Promise<AxiosResponse<ApiMessageResponse>> => {
  return axios.delete<ApiMessageResponse>(`${apiBaseUrl}/budgets/${slug}`, {
    headers: authHeaders(),
  });
};

const validateAuth = async (): Promise<
  AxiosResponse<AuthValidationResponse> | false
> => {
  if (!localStorage.getItem("authToken")) {
    return false;
  }

  return axios.get<AuthValidationResponse>(`${apiBaseUrl}/auth/validate`, {
    headers: authHeaders(),
  });
};

export {
  userRegister,
  userLogin,
  getUserData,
  editUserProfile,
  getCategories,
  getSpendByCategory,
  getUserBills,
  addBill,
  editBill,
  deleteBill,
  getUserSubscriptions,
  editUserSubscriptions,
  addUserSubscriptions,
  deleteUserSubscription,
  getUserBudgets,
  editUserBudgets,
  addUserBudgets,
  deleteUserBudget,
  validateAuth,
};
