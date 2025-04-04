import { getCategories, getUserBills } from "@/utils/api";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

const DashboardContext = createContext();
const today = new Date();
function DashboardProvider(props) {
  const [categories, setCategories] = useState(false);
  const [bills, setBills] = useState(null);
  const [upcomingBills, setUpcomingBills] = useState(null);
  const [isBillsLoading, setIsBillsLoading] = useState(true);

  const getAllCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const getBills = async () => {
    try {
      const response = await getUserBills();
      setIsBillsLoading(false);
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
    getAllCategories();
    getBills();
  }, []);

  const findTotalBills = () => {
    let sum = 0.0;
    if (isBillsLoading || !bills) return 0;
    bills.forEach((bill) => {
      sum += Number(bill.amount);
    });

    if (sum === 0) {
      return "0.00";
    }
    return sum;
  };

  function populateBills() {
    if (isBillsLoading || !bills || !categories) return [];

    const enriched = bills.map((bill) => {
      const category = categories.find((cat) => cat.id == bill.category_id);
      return {
        ...bill,
        category_name: category ? category.name : "Uncategorized",
      };
    });
    return enriched;
  }

  return (
    <DashboardContext.Provider
      value={{
        categories,
        setCategories,
        userBills: {
          totalBills: findTotalBills(),
          bills: populateBills(),
          upcomingBills,
          getBills,
          isBillsLoading,
        },
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
}

export { DashboardContext, DashboardProvider };
