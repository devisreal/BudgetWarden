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

const validateAuth = async () => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    return false;
  }

  const { data } = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/auth/validate`,
    {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    },
  );
  if (!data.isValid) {
    return false;
  }
  return true;
};

export { userRegister, userLogin, getUserData, getUserBills, validateAuth };
