import { DashboardSkeletonLoader } from "@/components/SkeletonLoader/SkeletonLoaders";
import SpendingByCategory from "@/components/SpendingCategory/SpendingCategory";
import UpcomingBills from "@/components/UpcomingBills/UpcomingBills";
import { DashboardContext } from "@/contexts/DashboardContext";
import {
  ArrowUpRight,
  CalendarSync,
  HandCoins,
  Landmark,
  ReceiptText,
  SquarePen,
} from "lucide-react";
import { useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";

export default function DashboardPage() {
  const [isLoading, userData] = useOutletContext();
  const { userBills } = useContext(DashboardContext);

  if (isLoading) {
    return <DashboardSkeletonLoader />;
  }

  return (
    <main className="p-4">
      <section className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-3xl font-bold text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
            Welcome back,{" "}
            {userData.first_name ? userData.first_name : userData.username}
          </h2>
          <p className="text-md sm:text-base text-gray-500">
            Here&apos;s your monthly financial snapshot.
          </p>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <div className="sm:ml-3">
            <Link
              to="/user/profile/edit"
              type="button"
              className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              <SquarePen className="mr-1.5 -ml-0.5 size-5" />
              Edit Profile
            </Link>
          </div>
        </div>
      </section>

      <section className="flex mt-4 flex-col gap-4 lg:flex-row ">
        <article className="flex w-full shadow items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="rounded-full bg-emerald-100 p-3 text-emerald-600">
            <Landmark strokeWidth={2} className="size-8" />
          </span>

          <div>
            <p className="text-sm text-gray-500">Income</p>
            <p className="text-2xl font-bold text-gray-900">
              £{userData.income ? userData.income : 0}
            </p>
          </div>
        </article>

        <article className="rounded-lg relative w-full border border-gray-100 bg-white shadow p-6 py-4">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-emerald-100 p-3 text-emerald-600">
              <ReceiptText strokeWidth={2} className="size-8" />
            </span>
            <div>
              <p className="text-sm text-gray-500">Bills</p>

              <p className="text-2xl font-bold text-gray-900">
                £{userBills.totalBills}
              </p>
            </div>
          </div>

          {/* <div className="mt-2 flex gap-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <p className="flex gap-2 text-xs">
              <span className="font-medium"> 67.81% </span>

              <span className="text-gray-500"> Since last week </span>
            </p>
          </div> */}

          <Link
            to="/user/bills"
            className="inline-flex absolute right-2 bottom-2 items-center justify-center rounded-full bg-gray-100 group px-2.5 py-0.5 text-gray-700"
          >
            <p className="text-xs whitespace-nowrap">View All</p>

            <button className="ms-1.5 -me-1 inline-block rounded-full bg-gray-300 p-0.5 text-gray-700 transition duration-200 group-hover:translate-x-0.5 group-hover:rotate-45">
              <span className="sr-only">Remove badge</span>

              <ArrowUpRight className="size-3" strokeWidth={3} />
            </button>
          </Link>
        </article>

        <article className="rounded-lg w-full border border-gray-100 bg-white shadow p-6 py-4">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-emerald-100 p-3 text-emerald-600">
              <HandCoins strokeWidth={2} className="size-8" />
            </span>
            <div>
              <p className="text-sm text-gray-500">Spent</p>

              <p className="text-2xl font-bold text-gray-900">£240.94</p>
            </div>
          </div>

          {/* <div className="mt-2 flex gap-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>

            <p className="flex gap-2 text-xs">
              <span className="font-medium"> 67.81% </span>

              <span className="text-gray-500"> Since last week </span>
            </p>
          </div> */}
        </article>

        <article className="flex relative w-full shadow items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="rounded-full bg-emerald-100 p-3 text-emerald-600">
            <CalendarSync strokeWidth={2} className="size-8" />
          </span>

          <div>
            <p className="text-sm text-gray-500">Active Subscriptions</p>
            <p className="text-2xl font-bold text-gray-900">4</p>
          </div>

          <Link
            to="/user/subscriptions"
            className="inline-flex absolute right-2 bottom-2 items-center justify-center rounded-full bg-gray-100 group px-2.5 py-0.5 text-gray-700"
          >
            <p className="text-xs whitespace-nowrap">View All</p>

            <button className="ms-1.5 -me-1 inline-block rounded-full bg-gray-300 p-0.5 text-gray-700 transition duration-200 group-hover:translate-x-0.5 group-hover:rotate-45">
              <span className="sr-only">Remove badge</span>

              <ArrowUpRight className="size-3" strokeWidth={3} />
            </button>
          </Link>
        </article>
      </section>

      <section className="flex flex-col lg:flex-row gap-4 mt-8 items-stretch ">
        <UpcomingBills />
        <SpendingByCategory />
      </section>
    </main>
  );
}
