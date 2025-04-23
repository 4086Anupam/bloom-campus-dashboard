
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Check, Star, History } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Type definitions
interface FeedbackSubmission {
  id: string;
  course: string;
  teacher: string;
  rating: number;
  comment: string;
  submittedOn: Date;
  status: "submitted" | "reviewed";
  response?: string;
}

interface Course {
  id: string;
  name: string;
  teacher: string;
}

export default function StudentFeedbackPage() {
  // Form state
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  
  // Toast hook
  const { toast } = useToast();
  
  // Sample data for courses
  const courses: Course[] = [
    { id: "1", name: "Database Systems", teacher: "Prof. Johnson" },
    { id: "2", name: "Data Structures", teacher: "Prof. Williams" },
    { id: "3", name: "Algorithms", teacher: "Prof. Smith" },
    { id: "4", name: "Web Development", teacher: "Prof. Davis" },
    { id: "5", name: "Operating Systems", teacher: "Prof. Brown" },
  ];
  
  // Sample data for feedback history
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackSubmission[]>([
    {
      id: "1",
      course: "Web Development",
      teacher: "Prof. Davis",
      rating: 5,
      comment: "The course materials were excellent and the professor explained complex concepts clearly. The practical exercises were very helpful.",
      submittedOn: new Date("2025-03-20"),
      status: "reviewed",
      response: "Thank you for your positive feedback. I'm glad you found the practical exercises helpful."
    },
    {
      id: "2",
      course: "Operating Systems",
      teacher: "Prof. Brown",
      rating: 4,
      comment: "Good course overall, but could use more practical examples.",
      submittedOn: new Date("2025-03-15"),
      status: "submitted"
    }
  ]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourse || rating === 0 || !comment) {
      toast({
        title: "Form incomplete",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Find selected course details
    const course = courses.find(c => c.id === selectedCourse);
    if (!course) return;
    
    // Create new feedback
    const newFeedback: FeedbackSubmission = {
      id: (feedbackHistory.length + 1).toString(),
      course: course.name,
      teacher: course.teacher,
      rating: rating,
      comment: comment,
      submittedOn: new Date(),
      status: "submitted"
    };
    
    // Add to history
    setFeedbackHistory([newFeedback, ...feedbackHistory]);
    
    // Reset form
    setSelectedCourse("");
    setRating(0);
    setComment("");
    
    toast({
      title: "Feedback submitted",
      description: "Your feedback has been successfully submitted",
    });
  };
  
  // Star rating component
  const StarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none"
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRating(star)}
          >
            <Star 
              className={`h-8 w-8 ${
                star <= (hoveredRating || rating) 
                  ? 'fill-amber-400 text-amber-400' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Layout userRole="student">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Course Feedback</h1>
        
        <Tabs defaultValue="submit" className="w-full">
          <TabsList>
            <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
            <TabsTrigger value="history">Feedback History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="submit">
            <DashboardCard title="Rate Your Learning Experience" className="mt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Select Course</Label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse} required>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name} - {course.teacher}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex items-center gap-4">
                    <StarRating />
                    {rating > 0 && (
                      <span className="text-sm text-muted-foreground">
                        {rating === 1 && "Poor"}
                        {rating === 2 && "Fair"}
                        {rating === 3 && "Good"}
                        {rating === 4 && "Very Good"}
                        {rating === 5 && "Excellent"}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Please share your experience with this course and instructor"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[150px]"
                    required
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button type="submit">Submit Feedback</Button>
                </div>
              </form>
            </DashboardCard>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4 mt-4">
              {feedbackHistory.length === 0 ? (
                <DashboardCard title="No Feedback History">
                  <div className="flex flex-col items-center justify-center py-8">
                    <History className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No feedback submissions found</p>
                    <p className="text-sm text-muted-foreground">
                      Your feedback history will appear here
                    </p>
                  </div>
                </DashboardCard>
              ) : (
                feedbackHistory.map((feedback) => (
                  <DashboardCard key={feedback.id} title={feedback.course}>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{feedback.teacher}</p>
                          <div className="flex items-center">
                            {feedback.status === "reviewed" ? (
                              <Badge className="bg-green-500">Reviewed</Badge>
                            ) : (
                              <Badge variant="outline">Submitted</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-5 w-5 ${star <= feedback.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-2">
                            Submitted on {feedback.submittedOn.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm">{feedback.comment}</p>
                      </div>
                      
                      {feedback.response && (
                        <div className="bg-secondary/50 p-4 rounded-md">
                          <div className="flex gap-2 items-start">
                            <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-sm">Instructor Response</p>
                              <p className="text-sm">{feedback.response}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </DashboardCard>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
