import { DashboardContext } from "@/contexts/DashboardContext";
import { ArrowUpRight } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import BillCard from "../BillCard/BillCard";
import EmptyState from "../EmptyState/EmptyState";
import { BillsSkeletonLoader } from "../SkeletonLoader/SkeletonLoaders";
import { Card } from "../ui/card";

export default function UpcomingBills() {
  const { userBills } = useContext(DashboardContext);
  return (
    <Card className="relative rounded-lg shadow w-full lg:w-2/6 p-4">
      <h3 className="text-2xl font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Upcoming Bills
      </h3>

      {!userBills.isBillsLoading ? (
        userBills.upcomingBills.length > 0 ? (
          <ul className="flex flex-col mt-4 gap-4">
            {userBills.upcomingBills.map((bill) => {
              return (
                <BillCard
                  key={bill.id}
                  bill={bill}
                  displayStats={false}
                  displayCategory={false}
                  canDelete={false}
                />
              );
            })}
          </ul>
        ) : (
          <EmptyState
            title="No upcoming bills"
            message="You have no upcoming bills"
          />
        )
      ) : (
        <BillsSkeletonLoader />
      )}

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
