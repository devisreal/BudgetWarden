import axios from "axios";

const registerNewUser = async (formValues) => {
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

export { registerNewUser };
