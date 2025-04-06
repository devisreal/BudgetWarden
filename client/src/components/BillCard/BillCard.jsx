import { DashboardContext } from "@/contexts/DashboardContext";
import { numberWithCommas } from "@/lib/utils";
import { deleteBill } from "@/utils/api";
import { format } from "date-fns";
import {
  CheckIcon,
  CircleDashed,
  ReceiptText,
  Trash2,
  XIcon,
} from "lucide-react";
import { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";

import EditBillDrawer from "../EditBillDrawer/EditBillDrawer";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const today = new Date();

export default function BillCard({
  bill,
  displayStats = true,
  canDelete = true,
  displayCategory = true,
}) {
  const [isEditDrawerOpen, setEditDrawerIsOpen] = useState(false);
  const { userBills, getUserCurrency } = useContext(DashboardContext);
  const [isLoading, userData] = useOutletContext();

  const userCurrency = getUserCurrency(userData.currency);

  const handleDeleteBill = async (slug) => {
    try {
      const response = await deleteBill(slug);
      if (response.status === 204) {
        toast.success("Deleted bill");
        userBills.getBills();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting bill");
    }
  };

  return (
    <li className="flex flex-col items-start border md:flex-row md:border-0 p-2 md:p-0  md:items-center md:justify-between gap-4 rounded-lg bg-white ">
      <div className="flex flex-col gap-2 lg:flex-row items-center lg:w-2/3 justify-between">
        <div className="flex items-center gap-4 ">
          <span className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
            <ReceiptText strokeWidth={1.5} />
          </span>

          <div>
            <p className="text-base font-semibold text-gray-900">{bill.name}</p>

            <div className="flex gap-4 items-center">
              <p className="text-sm text-gray-500">
                {format(bill.due_date, "MMM do, yyyy")}
              </p>
              {displayCategory && (
                <Badge variant="outline" className="gap-1.5">
                  <span
                    className="size-1.5 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  ></span>
                  {bill.category_name}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {displayStats && (
          <div className=" ">
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
          </div>
        )}
      </div>

      <div className="flex items-center w-full justify-between md:w-auto md:justify-normal gap-4">
        <p className="font-medium text-lg">
          {userCurrency.symbol}
          {numberWithCommas(bill.amount)}
        </p>

        <div className="flex gap-2">
          <EditBillDrawer
            bill={bill}
            isEditDrawerOpen={isEditDrawerOpen}
            setEditDrawerIsOpen={setEditDrawerIsOpen}
          />

          {canDelete && (
            <Button
              variant="destructive"
              onClick={() => {
                toast.warning("Are you sure you want to delete ?", {
                  action: {
                    label: "Delete",
                    onClick: () => handleDeleteBill(bill.slug),
                  },
                });
              }}
            >
              <Trash2 />
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}
