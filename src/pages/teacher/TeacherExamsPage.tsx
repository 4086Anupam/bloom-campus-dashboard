
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronDown, FileText, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

// Type definitions
interface Exam {
  id: string;
  course: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  type: "midterm" | "final" | "quiz";
  status: "scheduled" | "ongoing" | "completed" | "graded";
  notes?: string;
}

export default function TeacherExamsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample data for exams
  const exams: Exam[] = [
    {
      id: "1",
      course: "Database Systems",
      title: "Midterm Examination",
      date: "2025-05-15",
      time: "10:00 AM",
      duration: "2 hours",
      location: "Room 301",
      type: "midterm",
      status: "scheduled",
    },
    {
      id: "2",
      course: "Data Structures",
      title: "Final Examination",
      date: "2025-06-20",
      time: "01:00 PM",
      duration: "3 hours",
      location: "Examination Hall",
      type: "final",
      status: "scheduled",
    },
    {
      id: "3",
      course: "Algorithms",
      title: "Quiz 1",
      date: "2025-04-25",
      time: "11:00 AM",
      duration: "45 minutes",
      location: "Room 103",
      type: "quiz",
      status: "ongoing",
    },
    {
      id: "4",
      course: "Web Development",
      title: "Midterm Examination",
      date: "2025-04-10",
      time: "09:00 AM",
      duration: "2 hours",
      location: "Lab 102",
      type: "midterm",
      status: "completed",
    },
    {
      id: "5",
      course: "Operating Systems",
      title: "Quiz 2",
      date: "2025-04-05",
      time: "10:30 AM",
      duration: "30 minutes",
      location: "Room 304",
      type: "quiz",
      status: "graded",
    },
  ];
  
  // Filter exams based on search term
  const filteredExams = exams.filter(exam => 
    exam.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scheduledExams = filteredExams.filter(exam => exam.status === "scheduled");
  const ongoingExams = filteredExams.filter(exam => exam.status === "ongoing");
  const completedExams = filteredExams.filter(exam => 
    exam.status === "completed" || exam.status === "graded"
  );

  // Helper function to get badge for exam status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>;
      case "ongoing":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-amber-500">Completed</Badge>;
      case "graded":
        return <Badge className="bg-green-500">Graded</Badge>;
      default:
        return null;
    }
  };

  // Helper function to get exam cards
  const renderExamCards = (exams: Exam[]) => {
    if (exams.length === 0) {
      return (
        <DashboardCard title="No Exams Found">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No exams found</p>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? "Try a different search term" : "There are no exams in this category"}
            </p>
          </div>
        </DashboardCard>
      );
    }

    return exams.map((exam) => (
      <DashboardCard key={exam.id} title={exam.course}>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-lg">{exam.title}</h3>
                {getStatusBadge(exam.status)}
              </div>
              
              <div className="mt-2 space-y-1">
                <p className="text-sm flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(exam.date).toLocaleDateString()} at {exam.time}
                  </span>
                </p>
                <p className="text-sm">Duration: {exam.duration}</p>
                <p className="text-sm">Location: {exam.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 self-start">
              {exam.status === "scheduled" && (
                <>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="default" size="sm">Manage</Button>
                </>
              )}
              {exam.status === "ongoing" && (
                <Button variant="default" size="sm">Monitor</Button>
              )}
              {exam.status === "completed" && (
                <Button variant="default" size="sm">Grade</Button>
              )}
              {exam.status === "graded" && (
                <Button variant="outline" size="sm">View Results</Button>
              )}
            </div>
          </div>
        </div>
      </DashboardCard>
    ));
  };

  return (
    <Layout userRole="teacher">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Examinations</h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exams..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <Plus className="mr-1 h-4 w-4" />
              Create Exam
            </Button>
          </div>
        </div>

        <Tabs defaultValue="scheduled" className="w-full">
          <TabsList>
            <TabsTrigger value="scheduled">
              Scheduled
              {scheduledExams.length > 0 && (
                <span className="ml-2 bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">
                  {scheduledExams.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="ongoing">
              In Progress
              {ongoingExams.length > 0 && (
                <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">
                  {ongoingExams.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
              {completedExams.length > 0 && (
                <span className="ml-2 bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">
                  {completedExams.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scheduled" className="space-y-4 mt-4">
            {renderExamCards(scheduledExams)}
          </TabsContent>

          <TabsContent value="ongoing" className="space-y-4 mt-4">
            {renderExamCards(ongoingExams)}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-4">
            {renderExamCards(completedExams)}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
