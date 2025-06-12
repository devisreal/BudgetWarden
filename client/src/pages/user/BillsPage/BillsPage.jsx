import AddBillDrawer from "@/components/AddBillDrawer/AddBillDrawer";
import BillCard from "@/components/BillCard/BillCard";
import EmptyState from "@/components/EmptyState/EmptyState";
import { BillsSkeletonLoader } from "@/components/SkeletonLoader/SkeletonLoaders";
import { Card } from "@/components/ui/card";
import { DashboardContext } from "@/contexts/DashboardContext";
import { useContext, useState } from "react";

const today = new Date();

export default function BillsPage() {
  const [isAddDrawerOpen, setAddDrawerIsOpen] = useState(false);
  const { userBills } = useContext(DashboardContext);

  const completedBills = userBills.bills.filter((bill) => {
    return bill.is_paid;
  });

  const incompletdBills = userBills.bills.filter((bill) => {
    return (
      (!bill.is_paid && new Date(bill.due_date) < today) ||
      (!bill.is_paid && new Date(bill.due_date) >= today)
    );
  });

  return (
    <main className="sm:p-4 py-6">
      <section className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-3xl font-bold text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
            Bills
          </h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <div className="sm:ml-3">
            <AddBillDrawer
              isAddDrawerOpen={isAddDrawerOpen}
              setAddDrawerIsOpen={setAddDrawerIsOpen}
            />
          </div>
        </div>
      </section>

      <Card className="relative mt-6 rounded-lg shadow w-full p-4">
        <h3 className="text-2xl font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          Due Soon
        </h3>

        {!userBills.isBillsLoading ? (
          userBills.upcomingBills.length > 0 ? (
            <ul className="flex flex-col mt-4 gap-4">
              {userBills.upcomingBills.map((bill) => {
                return (
                  <BillCard
                    key={bill.id}
                    bill={bill}
                    displayStats={true}
                    displayCategory={false}
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
      </Card>

      <Card className="relative mt-6 rounded-lg shadow w-full p-4">
        <h3 className="text-2xl font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          All Bills
        </h3>

        {!userBills.isBillsLoading ? (
          incompletdBills.length > 0 ? (
            <ul className="flex flex-col mt-4 gap-4">
              {incompletdBills.map((bill) => {
                return (
                  <BillCard key={bill.id} bill={bill} displayStats={true} />
                );
              })}
            </ul>
          ) : (
            <EmptyState title="No bills" message="You have no bills" />
          )
        ) : (
          <BillsSkeletonLoader />
        )}
      </Card>

      <Card className="relative mt-6 rounded-lg shadow w-full p-4">
        <h3 className="text-2xl font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          Completed Bills
        </h3>

        {!userBills.isBillsLoading ? (
          completedBills.length > 0 ? (
            <ul className="flex flex-col mt-4 gap-4">
              {completedBills.map((bill) => {
                return (
                  <BillCard key={bill.id} bill={bill} displayStats={true} />
                );
              })}
            </ul>
          ) : (
            <EmptyState
              title="No completed bills"
              message="You have not completed any bills"
            />
          )
        ) : (
          <BillsSkeletonLoader />
        )}
      </Card>
    </main>
  );
}
