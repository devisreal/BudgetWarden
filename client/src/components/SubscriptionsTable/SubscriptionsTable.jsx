import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardContext } from "@/contexts/DashboardContext";
import { numberWithCommas } from "@/lib/utils";
import { deleteUserSubscription } from "@/utils/api";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function SubscriptionsTable() {
  const { userSubscriptions, getUserCurrency } = useContext(DashboardContext);
  const subscriptions = userSubscriptions.subscriptions;
  const [isLoading, userData] = useOutletContext();
  const userCurrency = getUserCurrency(userData.currency);

  const handleDeleteSubscription = async (slug) => {
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
      <Table>
        <TableHeader className="bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Billing Cycle</TableHead>
            <TableHead>Renewal Date</TableHead>
            <TableHead>Status</TableHead>
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
              <TableCell className="py-2.5 font-medium">{sub.name}</TableCell>
              <TableCell className="py-2.5">{sub.category_name}</TableCell>
              <TableCell className="py-2.5 capitalize">
                {sub.billing_cycle}
              </TableCell>
              <TableCell className="py-2.5">
                {format(sub.renewal_date, "PPPP")}
              </TableCell>
              <TableCell className="py-2.5 space-x-1">
                {sub.is_active ? (
                  <Badge
                    className={
                      "bg-emerald-700 text-primary-foreground rounded-full"
                    }
                  >
                    Active
                  </Badge>
                ) : (
                  <Badge
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
              <TableCell className="py-2.5 text-right">
                <Button
                  variant="destructive"
                  onClick={() => {
                    toast.warning("Are you sure you want to delete ?", {
                      action: {
                        label: "Delete",
                        onClick: () => handleDeleteSubscription(sub.slug),
                      },
                    });
                  }}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <tbody aria-hidden="true" className="table-row h-2"></tbody>
        <TableFooter className="bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">
              {userCurrency.symbol}
              {numberWithCommas(userSubscriptions.totalSubscriptions)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
