
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, BarChart, Users, DollarSign } from "lucide-react";

const reports = [
  {
    id: 1,
    name: "Monthly User Activity Report",
    type: "user_activity",
    lastGenerated: "2024-01-15",
    status: "ready",
    size: "2.3 MB"
  },
  {
    id: 2,
    name: "Financial Summary Report", 
    type: "financial",
    lastGenerated: "2024-01-10",
    status: "generating",
    size: "1.8 MB"
  },
  {
    id: 3,
    name: "Provider Performance Analytics",
    type: "performance",
    lastGenerated: "2024-01-12",
    status: "ready",
    size: "3.1 MB"
  }
];

const reportTypes = [
  {
    name: "User Reports",
    icon: Users,
    description: "User registration, activity, and engagement metrics",
    color: "bg-blue-500"
  },
  {
    name: "Financial Reports",
    icon: DollarSign,
    description: "Revenue, commission, and payment analytics",
    color: "bg-green-500"
  },
  {
    name: "Performance Reports", 
    icon: BarChart,
    description: "Provider performance and service quality metrics",
    color: "bg-purple-500"
  }
];

export function ReportsSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-600">Generate and download platform reports</p>
        </div>
        <Button>Generate New Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportTypes.map((type, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center`}>
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{type.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{type.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{report.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {report.lastGenerated}
                      </div>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant={report.status === 'ready' ? 'default' : 'secondary'}>
                    {report.status}
                  </Badge>
                  <Button variant="outline" size="sm" disabled={report.status !== 'ready'}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
