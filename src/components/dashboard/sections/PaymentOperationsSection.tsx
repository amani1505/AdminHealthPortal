
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CreditCard, Search, Filter, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const paymentOperations = [
  {
    id: 1,
    transactionId: "TXN-2024-001",
    provider: "Dr. Sarah Wilson",
    patient: "John Smith",
    amount: 450.00,
    paymentMethod: "Credit Card",
    status: "completed",
    date: "2024-01-19 14:30",
    processingFee: 13.50
  },
  {
    id: 2,
    transactionId: "TXN-2024-002", 
    provider: "Dr. Michael Chen",
    patient: "Emma Johnson",
    amount: 280.00,
    paymentMethod: "PayPal",
    status: "pending",
    date: "2024-01-19 12:15",
    processingFee: 8.40
  },
  {
    id: 3,
    transactionId: "TXN-2024-003",
    provider: "Dr. Emily Rodriguez",
    patient: "Michael Davis",
    amount: 320.00,
    paymentMethod: "Bank Transfer",
    status: "failed",
    date: "2024-01-19 10:45",
    processingFee: 0.00
  }
];

export function PaymentOperationsSection() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isProcessingPayouts, setIsProcessingPayouts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "Payment operations data has been updated.",
      });
    }, 2000);
  };

  const handleProcessPayouts = async () => {
    setIsProcessingPayouts(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessingPayouts(false);
      toast({
        title: "Payouts Processed",
        description: "All pending payouts have been processed successfully.",
      });
    }, 3000);
  };

  const handleFilter = () => {
    toast({
      title: "Filter Applied",
      description: "Transactions filtered based on current criteria.",
    });
  };

  const filteredTransactions = paymentOperations.filter(transaction =>
    transaction.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payment Operations</h1>
          <p className="text-slate-600">Monitor and manage payment transactions</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button 
            onClick={handleProcessPayouts}
            disabled={isProcessingPayouts}
          >
            {isProcessingPayouts ? 'Processing...' : 'Process Payouts'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Processed Today</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,050.00</div>
            <p className="text-xs text-muted-foreground">3 transactions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Fees</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$21.90</div>
            <p className="text-xs text-muted-foreground">2.1% average</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95.2%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,340.00</div>
            <p className="text-xs text-muted-foreground">12 providers</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            placeholder="Search transactions..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2" onClick={handleFilter}>
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-sm text-slate-600">{transaction.transactionId}</span>
                    <Badge variant={
                      transaction.status === 'completed' ? 'default' :
                      transaction.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {transaction.status}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-slate-900">{transaction.provider}</h4>
                  <p className="text-slate-600">Patient: {transaction.patient}</p>
                  <p className="text-sm text-slate-500">{transaction.date}</p>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-slate-500">Amount:</span>
                    <span className="font-medium ml-1">${transaction.amount}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Method:</span>
                    <span className="font-medium ml-1">{transaction.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Fee:</span>
                    <span className="font-medium ml-1">${transaction.processingFee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
