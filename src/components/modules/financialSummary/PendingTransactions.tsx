import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchDepartments } from "@/components/service/api/department";
import { useAuth } from "@/components/service/hooks/useAuth";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  priority: "high" | "medium" | "low";
  description: string;
}

interface PendingTransactionsProps {
  onApprove?: (id: string) => void;
  onView?: (id: string) => void;
}

const PendingTransactions = ({
  onApprove = (id) => console.log(`Approved transaction ${id}`),
  onView = (id) => console.log(`Viewing transaction ${id}`),
}: PendingTransactionsProps) => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [viewedTransaction, setViewedTransaction] = useState<Transaction | null>(null);
  const [showViewAll, setShowViewAll] = useState(false);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [errorDepartments, setErrorDepartments] = useState<string | null>(null);

  useEffect(() => {
    const loadDepartments = async () => {
      if (!token) return;
      try {
        const data = await fetchDepartments(token);
        setDepartments(data);
        setErrorDepartments(null);

        const mockTransactions: Transaction[] = data.map((dept: any, index: number) => ({
          id: `TX-${index + 1}`,
          title: `Pending Transaction - ${dept.mName}`,
          amount: 1000 + index * 500,
          date: new Date().toISOString().split("T")[0],
          priority: index % 3 === 0 ? "high" : index % 3 === 1 ? "medium" : "low",
          description: `Pending approval for ${dept.mName}`,
        }));
        setTransactions(mockTransactions);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setErrorDepartments("Failed to load departments");
      } finally {
        setLoadingDepartments(false);
      }
    };
    loadDepartments();
  }, [token]);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "medium": return <Clock className="h-5 w-5 text-amber-500" />;
      case "low": return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return null;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "High Priority: Overdue approvals";
      case "medium": return "Medium Priority: Due within the day";
      case "low": return "Low Priority: Recently added transactions";
      default: return "";
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-4 border-red-500 bg-red-50";
      case "medium": return "border-l-4 border-amber-500 bg-amber-50";
      case "low": return "border-l-4 border-green-500 bg-green-50";
      default: return "";
    }
  };

  const handleApprove = (id: string) => {
    const approvedTransaction = transactions.find(t => t.id === id);
    if (approvedTransaction) {
      if (viewedTransaction && viewedTransaction.id === id) {
        setViewedTransaction(null);
      }
      setShowViewAll(false);
      setTimeout(() => {
        setSuccessMessage(`Transaction "${approvedTransaction.title}" approved successfully.`);
        setSuccessModalOpen(true);
        onApprove(id);
      }, 200);
    }
  };

  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader className="bg-[#0078D7] text-white rounded-t-xl">
        <CardTitle className="text-lg text-[#f0f0f0] font-bold">Pending for Posting</CardTitle>
      </CardHeader>

      <CardContent className="p-4 overflow-auto max-h-[220px]">
        {transactions.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No pending transactions</div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className={`p-3 rounded-md ${getPriorityClass(transaction.priority)}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(transaction.priority)}
                      <h4 className="font-semibold text-[#20476E]">{transaction.title}</h4>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{transaction.description}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span className="font-medium">₱{transaction.amount.toFixed(2)}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#1C61A1] border-[#1C61A1] hover:bg-[#1C61A1] hover:text-white"
                      onClick={() => setViewedTransaction(transaction)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="text-white bg-[#1C61A1] hover:bg-[#20476E]"
                      onClick={() => handleApprove(transaction.id)}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {getPriorityText(transaction.priority)}
                </div>
              </div>
            ))}
          </div>
        )}
        {successModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[1000]">
            <div className="bg-white p-6 rounded-md shadow-md w-80">
              <h2 className="text-lg font-semibold text-green-600 mb-2">Success</h2>
              <p className="text-sm text-gray-700">{successMessage}</p>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => setSuccessModalOpen(false)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
        {successMessage && (
          <Alert className="mt-4 bg-green-50 border-l-4 border-green-500">
            <AlertTitle className="text-green-700 font-semibold">Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-[#F0F0F0]">
        <div className="text-sm text-gray-600">{transactions.length} pending transactions</div>
        <Button
          variant="outline"
          className="text-[#1C61A1] border-[#1C61A1] hover:bg-[#1C61A1] hover:text-white"
          onClick={() => setShowViewAll(true)}
        >
          View All
        </Button>
      </CardFooter>

      <Dialog open={!!viewedTransaction} onOpenChange={() => setViewedTransaction(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{viewedTransaction?.title}</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>Description:</strong> {viewedTransaction?.description}</p>
            <p><strong>Amount:</strong> ₱{viewedTransaction?.amount.toFixed(2)}</p>
            <p><strong>Date:</strong> {viewedTransaction?.date}</p>
            <p><strong>Priority:</strong> {viewedTransaction?.priority}</p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => handleApprove(viewedTransaction!.id)}
              disabled={approvingId === viewedTransaction?.id}
            >
              {approvingId === viewedTransaction?.id ? "Approving..." : "Approve"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showViewAll} onOpenChange={setShowViewAll}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>All Pending Transactions</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[400px] overflow-auto">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-start border p-3 rounded-md">
                <div>
                  <h4 className="font-semibold text-[#20476E]">{tx.title}</h4>
                  <p className="text-xs text-gray-600">{tx.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    ₱{tx.amount.toFixed(2)} • {new Date(tx.date).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleApprove(tx.id)}
                  disabled={approvingId === tx.id}
                >
                  {approvingId === tx.id ? "Approving..." : "Approve"}
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PendingTransactions;
