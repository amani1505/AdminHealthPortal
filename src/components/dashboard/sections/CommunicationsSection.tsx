import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, Filter, Flag, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const communications = [
  {
    id: 1,
    type: "patient_provider",
    participants: "John Smith ↔ Dr. Sarah Wilson",
    subject: "Post-consultation follow-up questions",
    lastMessage: "Thank you for the detailed explanation about the medication...",
    timestamp: "2024-01-19 14:30",
    status: "active",
    flagged: false,
    messageCount: 8
  },
  {
    id: 2,
    type: "patient_support",
    participants: "Emma Johnson ↔ Support Team",
    subject: "Billing inquiry - Insurance coverage",
    lastMessage: "I need clarification on why my insurance didn't cover...",
    timestamp: "2024-01-19 12:15",
    status: "flagged",
    flagged: true,
    messageCount: 3
  },
  {
    id: 3,
    type: "provider_admin",
    participants: "Dr. Michael Chen ↔ Admin",
    subject: "Profile verification documents",
    lastMessage: "I've uploaded the required certification documents...",
    timestamp: "2024-01-19 10:45",
    status: "resolved",
    flagged: false,
    messageCount: 12
  },
  {
    id: 4,
    type: "patient_provider",
    participants: "Michael Davis ↔ Dr. Emily Rodriguez",
    subject: "Appointment rescheduling request",
    lastMessage: "Can we move the appointment to next Tuesday?",
    timestamp: "2024-01-18 16:20",
    status: "pending_review",
    flagged: true,
    messageCount: 5
  }
];

const communicationStats = [
  { category: "Patient-Provider", count: 1247, growth: "+12%" },
  { category: "Patient-Support", count: 89, growth: "+5%" },
  { category: "Provider-Admin", count: 156, growth: "-8%" },
  { category: "System Notifications", count: 2340, growth: "+18%" }
];

const statusConfig = {
  active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  flagged: { color: "bg-red-100 text-red-800", icon: AlertTriangle },
  resolved: { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  pending_review: { color: "bg-yellow-100 text-yellow-800", icon: Clock }
};

// Cool loading animation component
const LoadingAnimation = () => (
  <div className="flex items-center justify-center p-8">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      <div className="absolute top-2 left-2 w-12 h-12 border-2 border-blue-300 rounded-full animate-ping"></div>
      <MessageSquare className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-500 animate-bounce" />
    </div>
  </div>
);

export function CommunicationsSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleBulkModerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Bulk Moderation Complete",
        description: "All flagged communications have been processed.",
      });
    }, 3000);
  };

  const handleFilter = () => {
    toast({
      title: "Filter Applied",
      description: "Communications filtered based on current criteria.",
    });
  };

  const handleReview = (commId: number) => {
    toast({
      title: "Review Started",
      description: `Communication #${commId} opened for detailed review.`,
    });
  };

  const handleModerate = (commId: number) => {
    toast({
      title: "Moderation Action Taken",
      description: `Communication #${commId} has been moderated.`,
    });
  };

  const filteredCommunications = communications.filter(comm =>
    comm.participants.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comm.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Communications Center</h1>
            <p className="text-slate-600">Processing bulk moderation...</p>
          </div>
        </div>
        <Card>
          <CardContent>
            <LoadingAnimation />
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Processing Communications</h3>
              <p className="text-slate-500">Analyzing and moderating all flagged messages...</p>
              <div className="mt-4 bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Communications Center</h1>
          <p className="text-slate-600">Monitor and moderate platform communications</p>
        </div>
        <Button onClick={handleBulkModerate}>Bulk Moderate</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,492</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Messages</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">Issues resolved</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Communication Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {communicationStats.map((stat, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <h4 className="font-semibold text-slate-900 mb-2">{stat.category}</h4>
                <div className="text-2xl font-bold text-blue-600 mb-1">{stat.count.toLocaleString()}</div>
                <Badge variant={stat.growth.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                  {stat.growth}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            placeholder="Search conversations..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2" onClick={handleFilter}>
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Communications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCommunications.map((comm) => {
              const StatusIcon = statusConfig[comm.status].icon;
              return (
                <div key={comm.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {comm.type.replace('_', '-')}
                      </Badge>
                      <Badge className={statusConfig[comm.status].color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {comm.status.replace('_', ' ')}
                      </Badge>
                      {comm.flagged && (
                        <Badge variant="destructive" className="text-xs">
                          <Flag className="w-3 h-3 mr-1" />
                          Flagged
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-1">{comm.subject}</h4>
                    <p className="text-sm text-slate-600 mb-2">{comm.participants}</p>
                    <p className="text-sm text-slate-500 italic mb-2">"{comm.lastMessage}"</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>{comm.timestamp}</span>
                      <span>{comm.messageCount} messages</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReview(comm.id)}
                    >
                      Review
                    </Button>
                    {comm.flagged && (
                      <Button 
                        size="sm"
                        onClick={() => handleModerate(comm.id)}
                      >
                        Moderate
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Moderation Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <h4 className="font-semibold text-red-800 mb-1">Immediate Action Required</h4>
              <p className="text-sm text-red-700">Inappropriate content, harassment, spam, or safety concerns</p>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <h4 className="font-semibold text-yellow-800 mb-1">Review Recommended</h4>
              <p className="text-sm text-yellow-700">Unclear medical advice, billing disputes, or policy violations</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <h4 className="font-semibold text-green-800 mb-1">Standard Monitoring</h4>
              <p className="text-sm text-green-700">Normal patient-provider communications and routine inquiries</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Send Warning Message
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Escalate to Senior Moderator
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Suspend User Communication
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Generate Moderation Report
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Contact Legal Team
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
