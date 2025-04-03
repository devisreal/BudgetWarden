import { numberWithCommas } from "@/lib/utils";
import { format } from "date-fns";
import { CheckIcon, CircleDashed, ReceiptText, XIcon } from "lucide-react";
import { useState } from "react";

import EditBillDrawer from "../EditBillDrawer/EditBillDrawer";

const today = new Date();

export default function BillCard({ bill }) {
  const [isEditDrawerOpen, setEditDrawerIsOpen] = useState(false);

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg bg-white ">
      <div className="flex items-center gap-4">
        <span className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
          <ReceiptText strokeWidth={1.5} />
        </span>

        <div>
          <p className="text-base font-semibold text-gray-900">{bill.name}</p>

          <p className="text-sm text-emerald-500">
            {format(bill.due_date, "MMM do, yyyy")}
          </p>
        </div>
      </div>

      {bill.is_paid && (
        <span className="inline-flex  items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-green-600/20 ring-inset">
          <CheckIcon className="size-4 mr-1" />
          Paid
        </span>
      )}

      {bill.is_paid && new Date(bill.due_date) < today && (
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
          <XIcon className="size-4 mr-1" />
          Past Due
        </span>
      )}
      {!bill.is_paid &&
        new Date(bill.due_date) >= today &&
        new Date(bill.due_date) <=
          new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) && (
          <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">
            <CircleDashed className="size-4 mr-1" />
            Due in{" "}
            {Math.ceil(
              (new Date(bill.due_date) - today) / (1000 * 60 * 60 * 24),
            )}{" "}
            days
          </span>
        )}

      <div className="flex items-center gap-4">
        <p className="font-medium text-lg">£{numberWithCommas(bill.amount)}</p>

        <EditBillDrawer
          bill={bill}
          isEditDrawerOpen={isEditDrawerOpen}
          setEditDrawerIsOpen={setEditDrawerIsOpen}
        />
      </div>
    </li>
  );
}
