
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Search, Filter, MoreHorizontal, Star, MapPin, Clock } from "lucide-react";

const providers = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    location: "San Francisco, CA",
    rating: 4.8,
    totalReviews: 127,
    status: "active",
    joinedDate: "2023-06-15",
    lastActive: "2024-01-19 10:30",
    servicesCount: 8,
    earnings: 12540.00,
    completedAppointments: 234
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatology", 
    location: "New York, NY",
    rating: 4.6,
    totalReviews: 89,
    status: "pending_verification",
    joinedDate: "2024-01-10",
    lastActive: "2024-01-18 15:22",
    servicesCount: 5,
    earnings: 3240.00,
    completedAppointments: 45
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    location: "Los Angeles, CA",
    rating: 4.9,
    totalReviews: 203,
    status: "active",
    joinedDate: "2023-03-20",
    lastActive: "2024-01-19 09:15",
    servicesCount: 12,
    earnings: 18750.00,
    completedAppointments: 412
  },
  {
    id: 4,
    name: "Dr. James Thompson",
    specialty: "Orthopedics",
    location: "Chicago, IL",
    rating: 4.4,
    totalReviews: 76,
    status: "suspended",
    joinedDate: "2023-11-05",
    lastActive: "2024-01-15 14:30",
    servicesCount: 6,
    earnings: 5680.00,
    completedAppointments: 89
  }
];

const statusConfig = {
  active: { color: "bg-green-100 text-green-800", label: "Active" },
  pending_verification: { color: "bg-yellow-100 text-yellow-800", label: "Pending Verification" },
  suspended: { color: "bg-red-100 text-red-800", label: "Suspended" }
};

export function ProvidersSection() {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-slate-600 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Healthcare Providers</h1>
          <p className="text-slate-600">Manage provider profiles and verification status</p>
        </div>
        <Button>Add Provider</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Providers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">189</div>
            <p className="text-xs text-muted-foreground">76% of total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">From 1,234 reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input placeholder="Search providers..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {providers.map((provider) => (
          <Card key={provider.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {provider.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{provider.name}</h3>
                      <Badge className={statusConfig[provider.status].color}>
                        {statusConfig[provider.status].label}
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-1">{provider.specialty}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {provider.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Joined {provider.joinedDate}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                  <div className="text-sm">
                    {renderStars(provider.rating)}
                    <p className="text-slate-500">({provider.totalReviews} reviews)</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-slate-900">{provider.servicesCount}</div>
                      <div className="text-slate-500">Services</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-slate-900">{provider.completedAppointments}</div>
                      <div className="text-slate-500">Appointments</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-slate-900">${provider.earnings.toLocaleString()}</div>
                      <div className="text-slate-500">Earnings</div>
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
