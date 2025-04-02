import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = useContext(AuthContext);
  console.log(isLoggedIn);

  return (
    <nav className="bg-white/70 backdrop-blur-sm py-4 px-4 sticky top-0 z-[100]">
      <div className="max-w-[85rem] mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="font-title text-xl md:text-2xl font-bold tracking-tighter text-neutral-900"
        >
          Budget Warden
        </Link>

        <div className="flex">
          <ul className="flex items-center gap-4">
            {!isLoggedIn ? (
              <li className="inline-flex items-center rounded-full transition-colors duration-200 bg-emerald-700 px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-md font-medium text-white">
                <Link to="/auth/register">Get Started</Link>
              </li>
            ) : (
              <li className="inline-flex items-center rounded-full transition-colors duration-200 bg-gray-200 px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-md font-medium text-gray-900 hover:bg-gray-300">
                <Link to="/user/dashboard">Go to Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
