
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Shield, Search, Filter, MoreHorizontal, Key, Clock } from "lucide-react";

const administrators = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@healthnexus.com",
    role: "super_admin",
    status: "active",
    lastLogin: "2024-01-19 10:30",
    permissions: ["all"]
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@healthnexus.com",
    role: "content_moderator", 
    status: "active",
    lastLogin: "2024-01-19 09:15",
    permissions: ["content", "users"]
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@healthnexus.com",
    role: "financial_admin",
    status: "inactive",
    lastLogin: "2024-01-15 14:22",
    permissions: ["finance", "reports"]
  }
];

const roleConfig = {
  super_admin: { color: "bg-red-100 text-red-800", label: "Super Admin" },
  content_moderator: { color: "bg-blue-100 text-blue-800", label: "Content Moderator" },
  financial_admin: { color: "bg-green-100 text-green-800", label: "Financial Admin" }
};

export function AdministratorsSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Administrator Management</h1>
          <p className="text-slate-600">Manage admin users and their permissions</p>
        </div>
        <Button>Add Administrator</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input placeholder="Search administrators..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {administrators.map((admin) => (
          <Card key={admin.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {admin.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{admin.name}</h3>
                    <p className="text-slate-600">{admin.email}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                      <Clock className="w-3 h-3" />
                      Last login: {admin.lastLogin}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {admin.permissions.map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        <Key className="w-3 h-3 mr-1" />
                        {permission}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={roleConfig[admin.role].color}>
                      {roleConfig[admin.role].label}
                    </Badge>
                    <Badge variant={admin.status === 'active' ? 'default' : 'secondary'}>
                      {admin.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
