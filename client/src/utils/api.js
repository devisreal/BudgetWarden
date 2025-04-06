import axios from "axios";

const userRegister = async (formValues) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
    {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    },
  );
  return data;
};

const userLogin = async (formValues) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
    formValues,
  );
  return data;
};

const getUserData = async () => {
  const authToken = localStorage.getItem("authToken");
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/auth/profile`,
    {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
};

const editUserProfile = async (formValues) => {
  const authToken = localStorage.getItem("authToken");
  const { data } = await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/auth/profile/edit`,
    formValues,
    {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
};

const getCategories = async () => {
  const authToken = localStorage.getItem("authToken");
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/categories`,
    {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
};

const getUserBills = async () => {
  const authToken = localStorage.getItem("authToken");
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/bills`,
    {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
};

const addBill = async (formValues) => {
  const authToken = localStorage.getItem("authToken");
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/bills`,
    formValues,
    {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
};

const editBill = async (formValues, bill_slug) => {
  const authToken = localStorage.getItem("authToken");
  const { data } = await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/bills/${bill_slug}`,
    formValues,
    {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
};

const deleteBill = async (slug) => {
  const authToken = localStorage.getItem("authToken");
  const response = await axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/bills/${slug}`,
    {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response;
};

const getUserSubscriptions = async () => {
  const authToken = localStorage.getItem("authToken");
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/subscriptions`,
    {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
};

const addUserSubscriptions = async (formValues) => {
  const authToken = localStorage.getItem("authToken");
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/subscriptions`,
    formValues,
    {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
};

const editUserSubscriptions = async (formValues, slug) => {
  const authToken = localStorage.getItem("authToken");
  const { data } = await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/subscriptions/${slug}`,
    formValues,
    {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
};

const deleteUserSubscription = async (slug) => {
  const authToken = localStorage.getItem("authToken");
  const response = await axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/subscriptions/${slug}`,
    {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response;
};

const validateAuth = async () => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    return false;
  }
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/auth/validate`,
    {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response;
};

export {
  userRegister,
  userLogin,
  getUserData,
  editUserProfile,
  getCategories,
  getUserBills,
  addBill,
  editBill,
  deleteBill,
  getUserSubscriptions,
  editUserSubscriptions,
  addUserSubscriptions,
  deleteUserSubscription,
  validateAuth,
};
