
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle, Clock, Eye } from "lucide-react";

const moderationItems = [
  {
    id: 1,
    type: "Service Listing",
    title: "New Cardiology Service - Dr. Sarah Wilson",
    status: "pending",
    priority: "high",
    submittedAt: "1 hour ago",
    flaggedReason: "Missing credentials verification",
  },
  {
    id: 2,
    type: "Review",
    title: "Patient review for Dr. Michael Chang",
    status: "flagged",
    priority: "medium",
    submittedAt: "3 hours ago",
    flaggedReason: "Potentially inappropriate language",
  },
  {
    id: 3,
    type: "Provider Profile",
    title: "Profile update - Dr. Lisa Rodriguez",
    status: "approved",
    priority: "low",
    submittedAt: "5 hours ago",
    flaggedReason: null,
  },
  {
    id: 4,
    type: "Communication",
    title: "Patient-Provider message thread",
    status: "under_review",
    priority: "high",
    submittedAt: "1 day ago",
    flaggedReason: "Automated safety flag triggered",
  },
];

const statusConfig = {
  pending: { color: "yellow", icon: Clock, variant: "secondary" as const },
  flagged: { color: "red", icon: AlertTriangle, variant: "destructive" as const },
  approved: { color: "green", icon: CheckCircle, variant: "default" as const },
  under_review: { color: "orange", icon: Eye, variant: "secondary" as const },
};

const priorityConfig = {
  high: { color: "red", variant: "destructive" as const },
  medium: { color: "orange", variant: "secondary" as const },
  low: { color: "gray", variant: "outline" as const },
};

export function ContentModerationSection() {
  return (
    <Card className="border-slate-200/60 bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">Content Moderation</CardTitle>
            <p className="text-sm text-slate-500">Items requiring review and approval</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Queue Overview
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50/80 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-sm text-slate-500">Pending</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">5</div>
            <p className="text-sm text-slate-500">Flagged</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-sm text-slate-500">Under Review</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">156</div>
            <p className="text-sm text-slate-500">Approved Today</p>
          </div>
        </div>

        {moderationItems.map((item) => {
          const StatusIcon = statusConfig[item.status].icon;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-lg border border-slate-200/60 hover:border-slate-300/60 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                  <Badge variant={priorityConfig[item.priority].variant} className="text-xs">
                    {item.priority} priority
                  </Badge>
                  <Badge variant={statusConfig[item.status].variant} className="text-xs flex items-center gap-1">
                    <StatusIcon className="w-3 h-3" />
                    {item.status.replace("_", " ")}
                  </Badge>
                </div>
                <h4 className="font-medium text-slate-900 mb-1">{item.title}</h4>
                {item.flaggedReason && (
                  <p className="text-sm text-orange-600 mb-1">
                    <AlertTriangle className="w-3 h-3 inline mr-1" />
                    {item.flaggedReason}
                  </p>
                )}
                <p className="text-xs text-slate-500">{item.submittedAt}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Review
                </Button>
                {item.status === "pending" && (
                  <Button size="sm">
                    Approve
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
