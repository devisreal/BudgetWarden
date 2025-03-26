import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <form className="w-full max-w-md flex flex-col gap-4">
      <div className="text-center">
        <h4 className="mt-3 text-2xl md:text-3xl font-bold font-title text-gray-900 ">
          Sign Up
        </h4>
        <p className="mt-2 text-gray-500 ">
          Create Your Budget Warden Account Today!
        </p>
      </div>

      <fieldset className="mt-6">
        <label
          htmlFor="email"
          className="block mb-2 text-md text-gray-600 font-medium "
        >
          Email Address
        </label>
        <div className="relative flex items-center">
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-3 text-gray-500"
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
            name="email"
            id="email"
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="info@info.com"
          />
        </div>
      </fieldset>

      <fieldset>
        <label
          htmlFor="username"
          className="block mb-2 text-md text-gray-600 font-medium "
        >
          Username
        </label>
        <div className="relative flex items-center">
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-3 text-gray-500 "
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
            name="username"
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="johndoe"
          />
        </div>
      </fieldset>

      <fieldset>
        <label
          htmlFor="password"
          className="block mb-2 text-md text-gray-600 font-medium "
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
              className="size-6 mx-3 text-gray-500"
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
            name="password"
            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="••••••••"
          />
        </div>
      </fieldset>

      <fieldset>
        <label
          htmlFor="confirm_password"
          className="block mb-2 text-md text-gray-600 font-medium "
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
              className="size-6 mx-3 text-gray-500"
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
            name="confirm_password"
            type="password"
            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="••••••••"
          />
        </div>
      </fieldset>

      <div className="mt-6">
        <button className="w-full cursor-pointer px-6 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-700 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-500 focus:ring-opacity-50">
          Sign Up
        </button>

        <div className="mt-6 text-center ">
          <p className="text-sm ">
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
