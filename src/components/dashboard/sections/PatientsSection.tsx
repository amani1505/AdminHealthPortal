
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Search, Filter, MoreHorizontal, MapPin, Clock, Calendar } from "lucide-react";

const patients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    age: 34,
    location: "San Francisco, CA",
    status: "active",
    joinedDate: "2023-08-15",
    lastVisit: "2024-01-18",
    totalAppointments: 12,
    totalSpent: 2340.00,
    preferredProvider: "Dr. Sarah Wilson",
    insuranceProvider: "Blue Cross"
  },
  {
    id: 2,
    name: "Emma Johnson",
    email: "emma.johnson@email.com",
    age: 28,
    location: "New York, NY",
    status: "active",
    joinedDate: "2023-11-02",
    lastVisit: "2024-01-15",
    totalAppointments: 8,
    totalSpent: 1560.00,
    preferredProvider: "Dr. Michael Chen",
    insuranceProvider: "Aetna"
  },
  {
    id: 3,
    name: "Michael Davis",
    email: "michael.davis@email.com",
    age: 42,
    location: "Los Angeles, CA",
    status: "inactive",
    joinedDate: "2023-05-20",
    lastVisit: "2023-12-10",
    totalAppointments: 15,
    totalSpent: 3420.00,
    preferredProvider: "Dr. Emily Rodriguez",
    insuranceProvider: "Kaiser"
  },
  {
    id: 4,
    name: "Sarah Brown",
    email: "sarah.brown@email.com",
    age: 56,
    location: "Chicago, IL",
    status: "active",
    joinedDate: "2023-07-08",
    lastVisit: "2024-01-19",
    totalAppointments: 18,
    totalSpent: 4280.00,
    preferredProvider: "Dr. James Thompson",
    insuranceProvider: "Cigna"
  }
];

const statusConfig = {
  active: { color: "bg-green-100 text-green-800", label: "Active" },
  inactive: { color: "bg-gray-100 text-gray-800", label: "Inactive" }
};

export function PatientsSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Management</h1>
          <p className="text-slate-600">Manage patient profiles and engagement</p>
        </div>
        <Button>Add Patient</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">987</div>
            <p className="text-xs text-muted-foreground">79% of total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94</div>
            <p className="text-xs text-muted-foreground">New registrations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2</div>
            <p className="text-xs text-muted-foreground">Per patient</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input placeholder="Search patients..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {patients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{patient.name}</h3>
                      <Badge className={statusConfig[patient.status].color}>
                        {statusConfig[patient.status].label}
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-1">{patient.email}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>Age: {patient.age}</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {patient.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Joined {patient.joinedDate}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                  <div className="text-sm">
                    <p className="text-slate-600">Preferred Provider:</p>
                    <p className="font-medium">{patient.preferredProvider}</p>
                    <p className="text-slate-500">Insurance: {patient.insuranceProvider}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-slate-900">{patient.totalAppointments}</div>
                      <div className="text-slate-500">Appointments</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-slate-900">${patient.totalSpent.toLocaleString()}</div>
                      <div className="text-slate-500">Total Spent</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-slate-900">{patient.lastVisit}</div>
                      <div className="text-slate-500">Last Visit</div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
