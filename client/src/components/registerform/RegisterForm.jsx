import { registerNewUser } from "@/utils/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

const registerFormSchema = yup
  .object()
  .shape({
    username: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("This field is required"),
    password: yup
      .string()
      .required("This field is required")
      .password()
      .min(6, "Password must be 6 characters or more"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("This field is required"),
  })
  .required();

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(registerFormSchema),
  });
  const navigate = useNavigate();

  const handleRegister = async (formValues) => {
    try {
      const response = await registerNewUser(formValues);
      toast.success(response.message);
      reset();
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-2 md:gap-4"
      onSubmit={handleSubmit(handleRegister)}
    >
      <fieldset className="mt-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm md:text-md text-gray-600 font-medium"
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
            {...register("email")}
            type="email"
            id="email"
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
          htmlFor="username"
          className="block mb-2 text-sm md:text-md text-gray-600 font-medium "
        >
          Username
        </label>
        <div className="relative flex items-center">
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 mx-3 ${errors.username ? "text-red-500" : "text-emerald-500"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>

          <input
            type="text"
            id="username"
            {...register("username")}
            className={`${errors.username ? "form-input--error" : "form-input"}`}
            placeholder="johndoe"
          />
        </div>
        <small className="text-red-500 mt-1 font-medium text-xs">
          {errors.username?.message}
        </small>
      </fieldset>

      <fieldset>
        <label
          htmlFor="password"
          className="block mb-2 text-sm md:text-md text-gray-600 font-medium "
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
              className={`w-6 h-6 mx-3 ${errors.password ? "text-red-500" : "text-emerald-500"}`}
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

      <fieldset>
        <label
          htmlFor="confirm_password"
          className="block mb-2 text-sm md:text-md text-gray-600 font-medium "
        >
          Confirm Password
        </label>
        <div className="relative flex items-center mt-4">
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 mx-3 ${errors.confirm_password ? "text-red-500" : "text-emerald-500"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </span>

          <input
            id="confirm_password"
            {...register("confirm_password")}
            type="password"
            className={`${errors.confirm_password ? "form-input--error" : "form-input"}`}
            placeholder="••••••••"
          />
        </div>
        <small className="text-red-500 mt-1 font-medium text-xs">
          {errors.confirm_password?.message}
        </small>
      </fieldset>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full disabled:bg-emerald-500 cursor-pointer px-6 py-3 text-sm md:text-base font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-700 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
        >
          {isSubmitting ? "Submitting...." : "Sign Up"}
        </button>

        <div className="mt-6 text-center ">
          <p className="text-xs md:text-sm">
            Already have an account yet?{" "}
            <Link
              className="text-emerald-600 font-semibold hover:underline"
              to="/auth/login"
            >
              {" "}
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
