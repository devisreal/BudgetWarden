import AddSubscriptionDrawer from "@/components/AddSubscriptionDrawer/AddSubscriptionDrawer";
import EmptyState from "@/components/EmptyState/EmptyState";
import SubscriptionsTable from "@/components/SubscriptionsTable/SubscriptionsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardContext } from "@/contexts/DashboardContext";
import { useContext, useState } from "react";

export default function SubscriptionsPage() {
  const { userSubscriptions } = useContext(DashboardContext);
  const [isAddDrawerOpen, setAddDrawerIsOpen] = useState(false);

  return (
    <div className="sm:px-4 py-6">
      <div className="sm:px-0 flex flex-col sm:flex-row sm:justify-between sm:items-center items-start gap-4">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
            Subscriptions
          </h2>
          <p className="mt-1 text-md sm:text-base text-gray-500">
            Your subscriptions
          </p>
        </div>

        <AddSubscriptionDrawer
          isAddDrawerOpen={isAddDrawerOpen}
          setAddDrawerIsOpen={setAddDrawerIsOpen}
        />
      </div>

      <div className="mt-4">
        {!userSubscriptions.isSubscriptionsLoading ? (
          userSubscriptions.subscriptions.length > 0 ? (
            <SubscriptionsTable />
          ) : (
            <EmptyState
              title="No subscriptions"
              message="You have no subscriptions"
            />
          )
        ) : (
          <Skeleton className=" w-full bg-gray-100 rounded-xl p-3 space-y-3">
            <Skeleton className="h-8 w-full bg-gray-200 rounded-lg"></Skeleton>
            <Skeleton className="h-8 w-full bg-gray-200 rounded-lg"></Skeleton>
            <Skeleton className="h-8 w-full bg-gray-200 rounded-lg"></Skeleton>
            <Skeleton className="h-8 w-full bg-gray-200 rounded-lg"></Skeleton>
            <Skeleton className="h-8 w-full bg-gray-200 rounded-lg"></Skeleton>
          </Skeleton>
        )}
      </div>
    </div>
  );
}
