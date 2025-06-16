
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Settings, Shield, Bell, Globe, Database, Users } from "lucide-react";

const settingsCategories = [
  {
    name: "General Settings",
    icon: Settings,
    color: "bg-slate-500"
  },
  {
    name: "Security & Privacy",
    icon: Shield,
    color: "bg-red-500"
  },
  {
    name: "Notifications",
    icon: Bell,
    color: "bg-blue-500"
  },
  {
    name: "Integrations",
    icon: Globe,
    color: "bg-green-500"
  },
  {
    name: "Data Management",
    icon: Database,
    color: "bg-purple-500"
  },
  {
    name: "User Permissions",
    icon: Users,
    color: "bg-orange-500"
  }
];

export function SettingsSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
          <p className="text-slate-600">Configure platform settings and preferences</p>
        </div>
        <Button>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{category.name}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Platform Name</label>
              <Input defaultValue="HealthNexus" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Support Email</label>
              <Input defaultValue="support@healthnexus.com" className="mt-1" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-slate-700">Maintenance Mode</label>
                <p className="text-xs text-slate-500">Enable maintenance mode for platform updates</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-slate-700">Two-Factor Authentication</label>
                <p className="text-xs text-slate-500">Require 2FA for all admin accounts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-slate-700">Session Timeout</label>
                <p className="text-xs text-slate-500">Auto-logout after inactivity</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Session Duration (minutes)</label>
              <Input defaultValue="30" type="number" className="mt-1" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
