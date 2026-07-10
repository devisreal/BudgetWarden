import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";

import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { numberWithCommas } from "../../../lib/utils";
import type { User } from "../../../types/domain";
import { deleteUserSubscription } from "../../../utils/api";
import { DashboardContext } from "../../dashboard/contexts/dashboard-context";
import EditSubscriptionDrawer from "../drawers/edit-subscription-drawer";

export default function SubscriptionsTable() {
  const { userSubscriptions, getUserCurrency } = useContext(DashboardContext)!;
  const subscriptions = userSubscriptions.subscriptions;
  const [userData] = useOutletContext<[User]>();
  const userCurrency = getUserCurrency(userData.currency ?? "USD");

  const handleDeleteSubscription = async (slug: string) => {
    try {
      const response = await deleteUserSubscription(slug);
      if (response.status === 204) {
        toast.success("Deleted subscription");
        userSubscriptions.getSubscriptions();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting subscription");
    }
  };

  return (
    <div>
      <Table className="w-full">
        <TableHeader className="bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="">Category</TableHead>
            <TableHead className="">Billing Cycle</TableHead>
            <TableHead className="">Renewal Date</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="text-right">Cost</TableHead>
          </TableRow>
        </TableHeader>
        <tbody aria-hidden="true" className="table-row h-2"></tbody>
        <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
          {subscriptions.map((sub) => (
            <TableRow
              key={sub.id}
              className="odd:bg-muted/50 odd:hover:bg-muted/50 border-none hover:bg-transparent"
            >
              <TableCell className="py-2.5 font-semibold text-md">
                {sub.name}
              </TableCell>
              <TableCell className="py-2.5">{sub.category_name}</TableCell>
              <TableCell className="py-2.5 capitalize">
                {sub.billing_cycle}
              </TableCell>
              <TableCell className="py-2.5">
                {format(new Date(sub.renewal_date), "PPPP")}
              </TableCell>
              <TableCell className="py-2.5 space-x-1">
                {sub.is_active ? (
                  <Badge
                    variant="outline"
                    className={
                      "bg-emerald-700 text-primary-foreground rounded-full"
                    }
                  >
                    Active
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className={
                      "bg-muted-foreground/60 text-primary-foreground rounded-full"
                    }
                  >
                    Inactive
                  </Badge>
                )}
              </TableCell>
              <TableCell className="py-2.5 text-right">
                {userCurrency.symbol}
                {numberWithCommas(sub.cost)}
              </TableCell>
              <TableCell className="py-2.5 text-right space-x-2">
                <EditSubscriptionDrawer subscription={sub} />
                <button
                  type="button"
                  onClick={() => {
                    toast.warning(
                      `Are you sure you want to delete '${sub.name}' ?`,
                      {
                        action: {
                          label: "Delete",
                          onClick: () => handleDeleteSubscription(sub.slug),
                        },
                      },
                    );
                  }}
                  className="rounded-md bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                >
                  <Trash2 />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <tbody aria-hidden="true" className="table-row h-2"></tbody>
        <TableFooter className="bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={5} className="font-semibold text-md">
              Total
            </TableCell>
            <TableCell className="text-right font-bold text-md">
              {userCurrency.symbol}
              {numberWithCommas(userSubscriptions.totalSubscriptions)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
