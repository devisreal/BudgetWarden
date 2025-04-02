import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const spendingData = [
  { category: "Food", amount: 350, percentage: 100 },
  { category: "Transport", amount: 120, percentage: 34 },
  { category: "Travel", amount: 130, percentage: 37 },
  { category: "Shopping", amount: 250, percentage: 71 },
  { category: "Bills", amount: 320, percentage: 91 },
];

export default function SpendingByCategory() {
  const totalSpending = 1000;

  return (
    <Card className="w-full lg:w-4/6 p-4">
      <h3 className="text-2xl font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Spending by category
      </h3>

      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-bold text-gray-900">
            £{totalSpending.toLocaleString()}
          </h2>
        </div>

        <div className="space-y-4">
          {spendingData.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{item.category}</span>
                <span className="text-gray-800 font-medium">
                  £{item.amount}
                </span>
              </div>
              <Progress
                value={item.percentage}
                className="h-2 bg-emerald-100"
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
