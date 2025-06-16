
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Shield, Activity, TrendingUp, AlertTriangle } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "12,483",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Users,
    color: "blue",
  },
  {
    title: "Monthly Revenue",
    value: "$248,392",
    change: "+18.2%",
    changeType: "positive" as const,
    icon: DollarSign,
    color: "green",
  },
  {
    title: "Active Providers",
    value: "3,247",
    change: "+8.1%",
    changeType: "positive" as const,
    icon: Activity,
    color: "purple",
  },
  {
    title: "Pending Reviews",
    value: "67",
    change: "-23.4%",
    changeType: "negative" as const,
    icon: Shield,
    color: "orange",
  },
  {
    title: "Commission Rate",
    value: "15.5%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "indigo",
  },
  {
    title: "System Alerts",
    value: "4",
    change: "+1",
    changeType: "warning" as const,
    icon: AlertTriangle,
    color: "red",
  },
];

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
  indigo: "from-indigo-500 to-indigo-600",
  red: "from-red-500 to-red-600",
};

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-slate-200/60 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {stat.title}
            </CardTitle>
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${colorClasses[stat.color]} flex items-center justify-center`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="flex items-center space-x-1 text-xs">
              <span
                className={`${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : stat.changeType === "negative"
                    ? "text-red-600"
                    : "text-orange-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-slate-500">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
