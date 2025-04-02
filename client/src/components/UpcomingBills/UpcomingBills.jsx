import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Card } from "../ui/card";

export default function UpcomingBills() {
  return (
    <Card className="relative rounded-lg shadow w-full lg:w-2/6 p-4">
      <h3 className="text-2xl font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Upcoming Bills
      </h3>

      <ul className="flex flex-col mt-4 gap-4">
        <li className="flex items-center justify-between gap-4 rounded-lg bg-white ">
          <div className="flex items-center gap-4">
            <span className="rounded-lg bg-emerald-100 p-3 text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>

            <div>
              <p className="text-base font-semibold text-gray-900">Rent</p>

              <p className="text-sm text-emerald-500">Total Sales</p>
            </div>
          </div>

          <p className="font-semibold text-base">£1800</p>
        </li>
        <li className="flex items-center justify-between gap-4 rounded-lg bg-white ">
          <div className="flex items-center gap-4">
            <span className="rounded-lg bg-emerald-100 p-3 text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>

            <div>
              <p className="text-base font-semibold text-gray-900">Rent</p>

              <p className="text-sm text-emerald-500">Total Sales</p>
            </div>
          </div>

          <p className="font-semibold text-base">£1800</p>
        </li>
        <li className="flex items-center justify-between gap-4 rounded-lg bg-white ">
          <div className="flex items-center gap-4">
            <span className="rounded-lg bg-emerald-100 p-3 text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>

            <div>
              <p className="text-base font-semibold text-gray-900">Rent</p>

              <p className="text-sm text-emerald-500">Total Sales</p>
            </div>
          </div>

          <p className="font-semibold text-base">£1800</p>
        </li>
      </ul>

      <Link
        to="/user/bills"
        className="inline-flex absolute right-2 bottom-2 items-center justify-center rounded-full bg-gray-100 group px-2.5 py-0.5 text-gray-700"
      >
        <p className="text-xs whitespace-nowrap">See All</p>

        <button className="ms-1.5 -me-1 inline-block rounded-full bg-gray-300 p-0.5 text-gray-700 transition duration-200 group-hover:translate-x-0.5 group-hover:rotate-45">
          <span className="sr-only">Remove badge</span>

          <ArrowUpRight className="size-3" strokeWidth={3} />
        </button>
      </Link>
    </Card>
  );
}
