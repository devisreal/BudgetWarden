import { DashboardContext } from "@/contexts/DashboardContext";
import { numberWithCommas } from "@/lib/utils";
import { deleteUserBudget } from "@/utils/api";
import { format } from "date-fns";
import { Trash2, Wallet } from "lucide-react";
import { useContext } from "react";
import { Button } from "react-aria-components";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";

import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export default function BudgetCard({ budget }) {
  const [isLoading, userData] = useOutletContext();
  const { getUserCurrency, userBudgets } = useContext(DashboardContext);
  const userCurrency = getUserCurrency(userData.currency);

  const handleDeleteBudget = async (slug) => {
    try {
      const response = await deleteUserBudget(slug);
      if (response.status === 204) {
        toast.success("Deleted budget");
        userBudgets.getBudgets();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting budget");
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="bg-emerald-50 p-2 rounded-md mr-3">
                <Wallet className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text">{budget.name}</h3>
                <Badge variant="outline" className="gap-1.5">
                  <span
                    className="size-1.5 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  ></span>
                  {budget.category_name}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 p-2 px-2.5 rounded-full cursor-pointer text-gray-500 hover:text-red-500 hover:bg-red-50"
              onClick={() => {
                toast.warning("Are you sure you want to delete ?", {
                  action: {
                    label: "Delete",
                    onClick: () => handleDeleteBudget(budget.slug),
                  },
                });
              }}
            >
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-2xl font-bold">
              {userCurrency.symbol}
              {numberWithCommas(budget.amount)}
            </div>
            <div className="text-xs text-gray-500">
              Created on {format(budget.created_at, "PPP")}
            </div>
          </div>
        </div>
        <div className="h-1 bg-emerald-500"></div>
      </CardContent>
    </Card>
  );
}
