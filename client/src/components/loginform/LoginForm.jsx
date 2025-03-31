import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

const loginFormSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("This field is required"),
    password: yup
      .string()
      .required("This field is required")
      .password()
      .min(6, "Password must be 6 characters or more"),
  })
  .required();

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(loginFormSchema),
  });

  const handleLogin = (data) => {
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <form
      action=""
      className="flex flex-col gap-2 md:gap-4"
      onSubmit={handleSubmit(handleLogin)}
    >
      <fieldset className="mt-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm md:text-md text-gray-600 font-medium "
        >
          Email Address
        </label>
        <div className="relative flex items-center">
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 mx-3 ${errors.email ? "text-red-500" : "text-emerald-500"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`${errors.email ? "form-input--error" : "form-input"}`}
            placeholder="info@info.com"
          />
        </div>
        <small className="text-red-500 mt-1 font-medium text-xs">
          {errors.email?.message}
        </small>
      </fieldset>

      <fieldset>
        <label
          htmlFor="password"
          className="block mb-2 text-sm md:text-md text-gray-600 font-medium"
        >
          Password
        </label>
        <div className="relative flex items-center mt-4">
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 mx-3 ${errors.email ? "text-red-500" : "text-emerald-500"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </span>

          <input
            id="password"
            type="password"
            {...register("password")}
            className={`${errors.password ? "form-input--error" : "form-input"}`}
            placeholder="••••••••"
          />
        </div>
        <small className="text-red-500 mt-1 font-medium text-xs">
          {errors.password?.message}
        </small>
      </fieldset>

      <div className="mt-6">
        <button className="w-full text-sm md:text-base cursor-pointer px-6 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-700 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-500 focus:ring-opacity-50">
          Sign In
        </button>

        <div className="mt-6 text-center ">
          <p className="text-xs md:text-sm">
            Don&lsquo;t have an account yet?{" "}
            <Link
              className="text-emerald-600 font-semibold hover:underline"
              to="/auth/register"
            >
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
