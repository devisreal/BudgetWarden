import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white">
        <div className="flex justify-center h-screen">
          <div className="hidden lg:block lg:w-2/3 auth-image-bg">
            <div className="flex items-center h-full px-20 bg-gray-950/50">
              {location.pathname === "/auth/register" && (
                <div>
                  <h2 className="text-2xl font-bold text-white sm:text-5xl font-title">
                    Join Budget Warden.
                  </h2>

                  <p className="max-w-xl mt-3 text-gray-200 font-medium">
                    Your First Step Toward Smarter Money Management.
                  </p>
                </div>
              )}
              {location.pathname === "/auth/login" && (
                <div>
                  <h2 className="text-2xl font-bold text-white sm:text-5xl font-title">
                    Sign In to Stay in Control.
                  </h2>

                  <p className="max-w-xl mt-3 text-gray-200 font-medium">
                    Your Budget Never Takes a Day Off.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex relative flex-col justify-center items-center w-full px-6 mx-auto lg:w-2/6">
            <button
              onClick={() => navigate("/")}
              className="group cursor-pointer text-xs md:text-sm top-5 right-5 absolute inline-flex h-10 items-center justify-center overflow-hidden rounded-lg bg-emerald-700 px-6 font-semibold text-white"
            >
              <span>Go Home</span>
              <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
