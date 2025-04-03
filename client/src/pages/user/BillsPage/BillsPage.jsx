import AddBillDrawer from "@/components/AddBillDrawer/AddBillDrawer";
import BillCard from "@/components/BillCard/BillCard";
import { BillsSkeletonLoader } from "@/components/SkeletonLoader/SkeletonLoaders";
import { Card } from "@/components/ui/card";
import { getUserBills } from "@/utils/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const today = new Date();

export default function BillsPage() {
  const [isAddDrawerOpen, setAddDrawerIsOpen] = useState(false);
  const [bills, setBills] = useState(null);
  const [upcomingBills, setUpcomingBills] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getBills = async () => {
    try {
      const response = await getUserBills();
      setIsLoading(false);
      setBills(response);

      const upcomingBills = response.filter((bill) => {
        if (bill.is_paid) return false;

        const dueDate = new Date(bill.due_date);
        const sevenDaysFromNow = new Date(
          today.getTime() + 7 * 24 * 60 * 60 * 1000,
        );

        return dueDate >= today && dueDate <= sevenDaysFromNow;
      });

      setUpcomingBills(upcomingBills);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    getBills();
  }, []);

  return (
    <main className="p-4">
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

        {!isLoading ? (
          <ul className="flex flex-col mt-4 gap-4">
            {upcomingBills.map((bill) => {
              return <BillCard key={bill.id} bill={bill} />;
            })}
          </ul>
        ) : (
          <BillsSkeletonLoader />
        )}
      </Card>

      <Card className="relative mt-6 rounded-lg shadow w-full p-4">
        <h3 className="text-2xl font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          All Bills
        </h3>

        {!isLoading ? (
          <ul className="flex flex-col mt-4 gap-4">
            {bills.map((bill) => {
              return <BillCard key={bill.id} bill={bill} />;
            })}
          </ul>
        ) : (
          <BillsSkeletonLoader />
        )}
      </Card>
    </main>
  );
}
