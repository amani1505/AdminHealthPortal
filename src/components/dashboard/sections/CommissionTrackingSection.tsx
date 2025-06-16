
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DollarSign, Search, Filter, TrendingUp, Calendar, Download } from "lucide-react";

const commissionData = [
  {
    id: 1,
    provider: "Dr. Sarah Wilson",
    service: "Cardiology Consultation",
    appointmentDate: "2024-01-19",
    patientPayment: 450.00,
    commissionRate: 15,
    commissionAmount: 67.50,
    status: "paid",
    payoutDate: "2024-01-20"
  },
  {
    id: 2,
    provider: "Dr. Michael Chen",
    service: "Dermatology Treatment",
    appointmentDate: "2024-01-18",
    patientPayment: 280.00,
    commissionRate: 12,
    commissionAmount: 33.60,
    status: "pending",
    payoutDate: null
  },
  {
    id: 3,
    provider: "Dr. Emily Rodriguez",
    service: "Pediatric Checkup",
    appointmentDate: "2024-01-17",
    patientPayment: 180.00,
    commissionRate: 10,
    commissionAmount: 18.00,
    status: "paid",
    payoutDate: "2024-01-18"
  },
  {
    id: 4,
    provider: "Dr. James Thompson",
    service: "Orthopedic Consultation",
    appointmentDate: "2024-01-16",
    patientPayment: 380.00,
    commissionRate: 18,
    commissionAmount: 68.40,
    status: "disputed",
    payoutDate: null
  }
];

const monthlyCommissions = [
  { month: "Jan 2024", totalRevenue: 45680.00, totalCommissions: 6852.00, providerCount: 23 },
  { month: "Dec 2023", totalRevenue: 42340.00, totalCommissions: 6351.00, providerCount: 21 },
  { month: "Nov 2023", totalRevenue: 38920.00, totalCommissions: 5838.00, providerCount: 19 },
];

const statusConfig = {
  paid: { color: "bg-green-100 text-green-800", label: "Paid" },
  pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
  disputed: { color: "bg-red-100 text-red-800", label: "Disputed" }
};

export function CommissionTrackingSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Commission Tracking</h1>
          <p className="text-slate-600">Monitor provider commissions and payouts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>Process Payouts</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commissions (MTD)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6,852</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,340</div>
            <p className="text-xs text-muted-foreground">15 providers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Commission Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.2%</div>
            <p className="text-xs text-muted-foreground">Platform average</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disputed Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$187</div>
            <p className="text-xs text-muted-foreground">3 transactions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Commission Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyCommissions.map((month, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-900">{month.month}</h4>
                    <p className="text-sm text-slate-500">{month.providerCount} active providers</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900">${month.totalCommissions.toLocaleString()}</div>
                    <div className="text-sm text-slate-500">from ${month.totalRevenue.toLocaleString()} revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commission Rate Tiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-900">Bronze Tier</h4>
                  <p className="text-sm text-slate-500">0-50 appointments</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900">10%</div>
                  <div className="text-sm text-slate-500">commission rate</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-900">Silver Tier</h4>
                  <p className="text-sm text-slate-500">51-150 appointments</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900">15%</div>
                  <div className="text-sm text-slate-500">commission rate</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-900">Gold Tier</h4>
                  <p className="text-sm text-slate-500">150+ appointments</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900">20%</div>
                  <div className="text-sm text-slate-500">commission rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input placeholder="Search commission records..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Commission Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commissionData.map((record) => (
              <div key={record.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-slate-900">{record.provider}</h4>
                    <Badge className={statusConfig[record.status].color}>
                      {statusConfig[record.status].label}
                    </Badge>
                  </div>
                  <p className="text-slate-600">{record.service}</p>
                  <p className="text-sm text-slate-500">Appointment: {record.appointmentDate}</p>
                  {record.payoutDate && (
                    <p className="text-sm text-slate-500">Paid: {record.payoutDate}</p>
                  )}
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-slate-500">Patient Payment:</span>
                    <span className="font-medium ml-1">${record.patientPayment}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Rate:</span>
                    <span className="font-medium ml-1">{record.commissionRate}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Commission:</span>
                    <span className="font-medium ml-1">${record.commissionAmount}</span>
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
