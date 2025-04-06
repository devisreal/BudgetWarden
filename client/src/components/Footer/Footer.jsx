import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-[85rem]  px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
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

          {/* <div>
            Made with <span style={{ color: "#e25555" }}>&hearts;</span> by
            Israel
          </div> */}

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
