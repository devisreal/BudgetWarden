import AddBillDrawer from "@/components/AddBillDrawer/AddBillDrawer";
import BillCard from "@/components/BillCard/BillCard";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function BillsPage() {
  const [isAddDrawerOpen, setAddDrawerIsOpen] = useState(false);

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

        <ul className="flex flex-col mt-4 gap-4">
          <BillCard />
          <BillCard />
          <BillCard />
        </ul>
      </Card>

      <Card className="relative mt-6 rounded-lg shadow w-full p-4">
        <h3 className="text-2xl font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          All Bills
        </h3>

        <ul className="flex flex-col mt-4 gap-4">
          <BillCard />
          <BillCard />
          <BillCard />
        </ul>
      </Card>
    </main>
  );
}
