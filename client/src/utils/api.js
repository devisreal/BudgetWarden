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

export { userRegister, userLogin };
