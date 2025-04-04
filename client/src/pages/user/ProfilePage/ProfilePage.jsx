import { DashboardSkeletonLoader } from "@/components/SkeletonLoader/SkeletonLoaders";
import { Button } from "@/components/ui/button";
import { DashboardContext } from "@/contexts/DashboardContext";
import { numberWithCommas } from "@/lib/utils";
import { useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";

export default function ProfilePage() {
  const [isLoading, userData] = useOutletContext();
  const { getUserCurrency } = useContext(DashboardContext);

  const userCurrency = getUserCurrency(userData.currency);

  if (isLoading) return <DashboardSkeletonLoader />;

  return (
    <div className="px-4 py-6 sm:max-w-2xl">
      <div className="px-4 sm:px-0 flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
            {userData.first_name ? userData.first_name : userData.username}
            &apos;s Profile
          </h2>
          <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
            Personal details
          </p>
        </div>
        <Button asChild className="bg-emerald-700">
          <Link to="/user/profile/edit">Edit Profile</Link>
        </Button>
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userData.first_name ? userData.first_name : "..."}{" "}
              {userData.last_name ? userData.last_name : "..."}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Username</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userData.username}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userData.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Income</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userCurrency.symbol}
              {numberWithCommas(userData.income)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
