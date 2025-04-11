import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  priority: "high" | "medium" | "low";
  description: string;
}

interface PendingTransactionsProps {
  transactions?: Transaction[];
  onApprove?: (id: string) => void;
  onView?: (id: string) => void;
}

const PendingTransactions = ({
  transactions = [
    {
      id: "tx1",
      title: "Supplier Payment - ABC Corp",
      amount: 5280.75,
      date: "2024-06-15",
      priority: "high",
      description: "Overdue payment for office supplies",
    },
    {
      id: "tx2",
      title: "Utility Bill - Electricity",
      amount: 1250.0,
      date: "2024-06-18",
      priority: "medium",
      description: "Monthly electricity bill payment",
    },
    {
      id: "tx3",
      title: "Staff Reimbursement - Michael Angelo Gonzales",
      amount: 350.25,
      date: "2024-06-20",
      priority: "low",
      description: "Travel expenses reimbursement",
    },
  ],
  onApprove = (id) => console.log(`Approved transaction ${id}`),
  onView = (id) => console.log(`Viewing transaction ${id}`),
}: PendingTransactionsProps) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "medium":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "High Priority: Overdue approvals";
      case "medium":
        return "Medium Priority: Due within the day";
      case "low":
        return "Low Priority: Recently added transactions";
      default:
        return "";
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-red-500 bg-red-50";
      case "medium":
        return "border-l-4 border-amber-500 bg-amber-50";
      case "low":
        return "border-l-4 border-green-500 bg-green-50";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader className="bg-[#0078D7] text-white rounded-t-xl">
        <CardTitle className="text-lg font-bold">Pending for Posting</CardTitle>
      </CardHeader>
      <CardContent className="p-4 overflow-auto max-h-[220px]">
        {transactions.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No pending transactions
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`p-3 rounded-md ${getPriorityClass(transaction.priority)}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(transaction.priority)}
                      <h4 className="font-semibold text-[#20476E]">
                        {transaction.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {transaction.description}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span className="font-medium">
                        ₱{transaction.amount.toFixed(2)}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#1C61A1] border-[#1C61A1] hover:bg-[#1C61A1] hover:text-white"
                      onClick={() => onView(transaction.id)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="text-[#ffffff] bg-[#1C61A1] hover:bg-[#20476E]"
                      onClick={() => onApprove(transaction.id)}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
                <div className="mt-1 text-xs">
                  <span className="text-gray-500">
                    {getPriorityText(transaction.priority)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 bg-[#F0F0F0]">
        <div className="text-sm text-gray-600">
          {transactions.length} pending transactions
        </div>
        <Button
          variant="outline"
          className="text-[#1C61A1] border-[#1C61A1] hover:bg-[#1C61A1] hover:text-white"
          onClick={() => console.log("View all transactions")}
        >
          View All
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PendingTransactions;
