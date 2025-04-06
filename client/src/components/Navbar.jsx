import { AuthContext } from "@/contexts/AuthContext";
import { motion } from "motion/react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { Skeleton } from "./ui/skeleton";

export default function Navbar() {
  const { isLoading, isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 px-4 sticky top-0 z-[100]">
      <div className="max-w-[85rem] mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="font-title text-xl md:text-2xl font-bold tracking-tighter text-neutral-900"
          >
            Budget Warden
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex"
        >
          {!isLoading ? (
            isLoggedIn === false ? (
              <span className="inline-flex items-center rounded-full transition-colors duration-200 bg-emerald-700 hover:bg-emerald-700/90 px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-md font-medium text-white">
                <Link to="/auth/register">Get Started</Link>
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full transition-colors duration-200 bg-gray-200 px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-md font-medium text-gray-900 hover:bg-gray-300">
                <Link to="/user/dashboard">Go to Dashboard</Link>
              </span>
            )
          ) : (
            <Skeleton className="w-[120px] h-10 rounded-full" />
          )}
        </motion.div>
      </div>
    </nav>
  );
}
