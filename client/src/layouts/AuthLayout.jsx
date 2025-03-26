import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  return (
    <>
      <div className="bg-white">
        <div className="flex justify-center h-screen">
          <div className="hidden  lg:block lg:w-2/3 auth-image-bg">
            <div className="flex items-center h-full px-20 bg-gray-950/50">
              {location.pathname === "/auth/register" && (
                <div>
                  <h2 className="text-2xl font-bold text-white sm:text-4xl font-title">
                    Join Budget Warden.
                  </h2>

                  <p className="max-w-xl mt-3 text-gray-200 font-medium">
                    Your First Step Toward Smarter Money Management.
                  </p>
                </div>
              )}
              {location.pathname === "/auth/login" && (
                <div>
                  <h2 className="text-2xl font-bold text-white sm:text-4xl font-title">
                    Sign In to Stay in Control.
                  </h2>

                  <p className="max-w-xl mt-3 text-gray-200 font-medium">
                    Your Budget Never Takes a Day Off.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
