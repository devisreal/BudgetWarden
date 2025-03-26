import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <form className="w-full max-w-md flex flex-col gap-4 ">
      <div className="text-center">
        <h4 className="mt-3 text-2xl font-bold font-title text-gray-900 ">
          Sign In
        </h4>
        <p className="mt-2 text-gray-500 ">Log in to Budget Warden Now.</p>
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
              className="w-6 h-6 mx-3 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
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
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="info@info.com"
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
              className="w-6 h-6 mx-3 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>

          <input
            id="password"
            type="password"
            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="••••••••"
          />
        </div>
      </fieldset>

      <div className="mt-6">
        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-500 rounded-lg hover:bg-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-50">
          Sign In
        </button>

        <div className="mt-6 text-center ">
          <p className="text-sm ">
            Don&lsquo;t have an account yet?{" "}
            <Link
              className="text-emerald-500 hover:underline"
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
