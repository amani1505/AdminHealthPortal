
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

const recentTransactions = [
  {
    id: 1,
    provider: "Dr. Sarah Wilson",
    amount: 450.00,
    commission: 67.50,
    service: "Cardiology Consultation",
    status: "completed",
    date: "2 hours ago",
  },
  {
    id: 2,
    provider: "Dr. Michael Chang",
    amount: 280.00,
    commission: 42.00,
    service: "Dermatology Treatment",
    status: "pending",
    date: "4 hours ago",
  },
  {
    id: 3,
    provider: "Dr. Lisa Rodriguez",
    amount: 320.00,
    commission: 48.00,
    service: "Mental Health Session",
    status: "completed",
    date: "6 hours ago",
  },
  {
    id: 4,
    provider: "Dr. John Smith",
    amount: 180.00,
    commission: 27.00,
    service: "General Consultation",
    status: "refunded",
    date: "1 day ago",
  },
];

export function FinancialSection() {
  return (
    <Card className="border-slate-200/60 bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">Financial Operations</CardTitle>
            <p className="text-sm text-slate-500">Recent transactions and commissions</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <ArrowUpRight className="w-4 h-4 mr-1" />
          Analytics
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50/80 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-2xl font-bold">$1,230</span>
            </div>
            <p className="text-sm text-slate-500">Today's Commission</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-2xl font-bold">$8,450</span>
            </div>
            <p className="text-sm text-slate-500">Weekly Total</p>
          </div>
        </div>
        
        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 rounded-lg border border-slate-200/60 hover:border-slate-300/60 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-slate-900">{transaction.provider}</span>
                <Badge
                  variant={
                    transaction.status === "completed"
                      ? "default"
                      : transaction.status === "pending"
                      ? "secondary"
                      : "destructive"
                  }
                  className="text-xs"
                >
                  {transaction.status}
                </Badge>
              </div>
              <p className="text-sm text-slate-500">{transaction.service}</p>
              <p className="text-xs text-slate-400">{transaction.date}</p>
            </div>
            <div className="text-right">
              <div className="font-semibold text-slate-900">
                ${transaction.amount.toFixed(2)}
              </div>
              <div className="text-sm text-green-600">
                Commission: ${transaction.commission.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
