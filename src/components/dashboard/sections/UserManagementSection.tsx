
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, UserX, Clock } from "lucide-react";

const recentUsers = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    type: "Provider",
    status: "pending",
    specialty: "Cardiology",
    joinedAt: "2 hours ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    type: "Patient",
    status: "active",
    location: "San Francisco",
    joinedAt: "5 hours ago",
  },
  {
    id: 3,
    name: "Dr. James Rodriguez",
    type: "Provider",
    status: "under_review",
    specialty: "Dermatology",
    joinedAt: "1 day ago",
  },
  {
    id: 4,
    name: "Emma Thompson",
    type: "Patient",
    status: "active",
    location: "New York",
    joinedAt: "2 days ago",
  },
];

const statusConfig = {
  pending: { color: "yellow", icon: Clock },
  active: { color: "green", icon: UserCheck },
  under_review: { color: "orange", icon: UserX },
};

export function UserManagementSection() {
  return (
    <Card className="border-slate-200/60 bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">User Management</CardTitle>
            <p className="text-sm text-slate-500">Recent registrations and updates</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentUsers.map((user) => {
          const StatusIcon = statusConfig[user.status].icon;
          return (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 rounded-lg border border-slate-200/60 hover:border-slate-300/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-slate-700">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">{user.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {user.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500">
                    {user.type === "Provider" ? user.specialty : user.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <StatusIcon className="w-3 h-3" />
                    <Badge
                      variant={
                        statusConfig[user.status].color === "green"
                          ? "default"
                          : statusConfig[user.status].color === "yellow"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {user.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{user.joinedAt}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Review
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
