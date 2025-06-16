import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Search, Filter, Flag, CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const reviews = [
  {
    id: 1,
    patient: "John Smith",
    provider: "Dr. Sarah Wilson",
    rating: 5,
    comment: "Excellent service! Dr. Wilson was very thorough and professional. Highly recommend!",
    status: "approved",
    submittedAt: "2024-01-19 09:30",
    flaggedReason: null
  },
  {
    id: 2,
    patient: "Emma Johnson",
    provider: "Dr. Michael Chen",
    rating: 2,
    comment: "Service was okay but the waiting time was too long. The doctor seemed rushed.",
    status: "flagged",
    submittedAt: "2024-01-18 16:45",
    flaggedReason: "Potential false negative review"
  },
  {
    id: 3,
    patient: "Michael Davis",
    provider: "Dr. Emily Rodriguez",
    rating: 4,
    comment: "Great experience with pediatric care. Dr. Rodriguez was wonderful with my child.",
    status: "pending_review",
    submittedAt: "2024-01-17 11:20",
    flaggedReason: null
  }
];

const statusConfig = {
  approved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  flagged: { color: "bg-red-100 text-red-800", icon: AlertTriangle },
  pending_review: { color: "bg-yellow-100 text-yellow-800", icon: Flag }
};

export function ReviewsRatingsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reviewList, setReviewList] = useState(reviews);
  const { toast } = useToast();

  const handleBulkModerate = () => {
    toast({
      title: "Bulk Moderation Started",
      description: "Processing all pending reviews for moderation.",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Applied",
      description: "Reviews filtered based on current criteria.",
    });
  };

  const handleReviewAction = (reviewId: number, action: string) => {
    setReviewList(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, status: action === 'approve' ? 'approved' : 'flagged' }
        : review
    ));
    
    toast({
      title: `Review ${action === 'approve' ? 'Approved' : 'Reviewed'}`,
      description: `Review has been ${action === 'approve' ? 'approved and published' : 'marked for review'}.`,
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = reviewList.filter(review =>
    review.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reviews & Ratings</h1>
          <p className="text-slate-600">Monitor and moderate patient reviews</p>
        </div>
        <Button onClick={handleBulkModerate}>Bulk Moderate</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Awaiting moderation</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Reviews</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Published</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            placeholder="Search reviews..." 
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

      <div className="grid gap-4">
        {filteredReviews.map((review) => {
          const StatusIcon = statusConfig[review.status].icon;
          return (
            <Card key={review.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {review.patient.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{review.patient}</h4>
                        <p className="text-sm text-slate-600">for {review.provider}</p>
                      </div>
                      <div className="ml-auto">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-slate-700 mb-3">{review.comment}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>Submitted: {review.submittedAt}</span>
                      <Badge className={statusConfig[review.status].color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {review.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    {review.flaggedReason && (
                      <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                        <AlertTriangle className="w-4 h-4 inline mr-1" />
                        {review.flaggedReason}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReviewAction(review.id, 'review')}
                    >
                      Review
                    </Button>
                    {review.status === 'pending_review' && (
                      <Button 
                        size="sm"
                        onClick={() => handleReviewAction(review.id, 'approve')}
                      >
                        Approve
                      </Button>
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
