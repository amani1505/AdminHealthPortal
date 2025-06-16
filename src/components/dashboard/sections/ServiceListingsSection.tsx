
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Shield, Search, Filter, Eye, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const serviceListings = [
  {
    id: 1,
    title: "Comprehensive Cardiology Consultation",
    provider: "Dr. Sarah Wilson",
    category: "Cardiology",
    price: 450.00,
    status: "pending_review",
    submittedAt: "2024-01-19 10:30",
    description: "Complete cardiac evaluation including ECG, stress test, and consultation",
    flaggedReason: "Missing credential verification"
  },
  {
    id: 2,
    title: "Pediatric Well-Child Checkup",
    provider: "Dr. Emily Rodriguez", 
    category: "Pediatrics",
    price: 180.00,
    status: "approved",
    submittedAt: "2024-01-18 14:15",
    description: "Routine health assessment for children ages 0-18",
    flaggedReason: null
  },
  {
    id: 3,
    title: "Dermatology Skin Cancer Screening",
    provider: "Dr. Michael Chen",
    category: "Dermatology",
    price: 280.00,
    status: "flagged",
    submittedAt: "2024-01-17 16:45",
    description: "Comprehensive skin examination and mole mapping",
    flaggedReason: "Incomplete service description"
  }
];

const statusConfig = {
  pending_review: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
  approved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  flagged: { color: "bg-red-100 text-red-800", icon: AlertTriangle }
};

export function ServiceListingsSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Service Listings</h1>
          <p className="text-slate-600">Review and moderate healthcare service listings</p>
        </div>
        <Button>Bulk Actions</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Published</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">Live services</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input placeholder="Search service listings..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {serviceListings.map((service) => {
          const StatusIcon = statusConfig[service.status].icon;
          return (
            <Card key={service.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-slate-900">{service.title}</h3>
                      <Badge className={statusConfig[service.status].color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {service.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-2">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>Provider: {service.provider}</span>
                      <span>Category: {service.category}</span>
                      <span>Price: ${service.price}</span>
                      <span>Submitted: {service.submittedAt}</span>
                    </div>
                    {service.flaggedReason && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                        <AlertTriangle className="w-4 h-4 inline mr-1" />
                        {service.flaggedReason}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                    {service.status === 'pending_review' && (
                      <Button size="sm">Approve</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
