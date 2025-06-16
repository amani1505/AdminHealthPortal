
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Server, 
  Database, 
  Wifi, 
  Shield, 
  Users, 
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

const HealthPage = () => {
  const systemMetrics = [
    {
      name: "API Response Time",
      value: "145ms",
      status: "healthy",
      icon: Activity,
      trend: "+2ms from last hour"
    },
    {
      name: "Database Performance",
      value: "98.5%",
      status: "healthy",
      icon: Database,
      trend: "Stable"
    },
    {
      name: "Server Uptime",
      value: "99.97%",
      status: "healthy",
      icon: Server,
      trend: "14 days, 6 hours"
    },
    {
      name: "Network Latency",
      value: "23ms",
      status: "warning",
      icon: Wifi,
      trend: "+5ms from average"
    }
  ];

  const serviceStatus = [
    { name: "Authentication Service", status: "operational", uptime: 99.9 },
    { name: "Payment Gateway", status: "operational", uptime: 99.8 },
    { name: "Notification Service", status: "degraded", uptime: 97.2 },
    { name: "File Storage", status: "operational", uptime: 99.9 },
    { name: "Email Service", status: "operational", uptime: 99.7 },
    { name: "Search Engine", status: "maintenance", uptime: 95.1 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "maintenance":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      operational: "bg-green-100 text-green-800",
      degraded: "bg-yellow-100 text-yellow-800",
      maintenance: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Health</h1>
          <p className="text-slate-600">Monitor system performance and service status</p>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium text-green-700">All Systems Operational</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric) => (
          <Card key={metric.name} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="w-5 h-5 text-slate-600" />
                <Badge 
                  className={
                    metric.status === "healthy" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {metric.status}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                <p className="text-sm font-medium text-slate-700">{metric.name}</p>
                <p className="text-xs text-slate-500">{metric.trend}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Service Status
          </CardTitle>
          <CardDescription>
            Current operational status of all system services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceStatus.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(service.status)}
                  <div>
                    <p className="font-medium text-slate-900">{service.name}</p>
                    <p className="text-sm text-slate-500">Uptime: {service.uptime}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24">
                    <Progress value={service.uptime} className="h-2" />
                  </div>
                  {getStatusBadge(service.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Incidents
          </CardTitle>
          <CardDescription>
            Latest system incidents and maintenance windows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-yellow-800">Scheduled Maintenance</p>
                <p className="text-sm text-yellow-700">Search engine optimization - Expected duration: 2 hours</p>
                <p className="text-xs text-yellow-600 mt-1">Started: Today at 2:00 AM UTC</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 border-l-4 border-green-400 bg-green-50 rounded-r-lg">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-green-800">Resolved: Payment Gateway Latency</p>
                <p className="text-sm text-green-700">Increased response times have been resolved</p>
                <p className="text-xs text-green-600 mt-1">Resolved: Yesterday at 11:45 PM UTC</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthPage;
