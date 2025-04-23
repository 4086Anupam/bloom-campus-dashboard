
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Calendar, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Type definitions
interface Exam {
  id: string;
  course: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  status: "upcoming" | "completed";
  result?: {
    marks: number;
    totalMarks: number;
    percentage: number;
    grade: string;
  };
}

export default function StudentExamsPage() {
  // Sample data for exams
  const exams: Exam[] = [
    {
      id: "1",
      course: "Database Systems",
      title: "Midterm Examination",
      date: "2025-05-02",
      time: "10:00 AM",
      duration: "2 hours",
      location: "Room 301",
      status: "upcoming",
    },
    {
      id: "2",
      course: "Data Structures",
      title: "Midterm Examination",
      date: "2025-05-04",
      time: "01:00 PM",
      duration: "2 hours",
      location: "Room 205",
      status: "upcoming",
    },
    {
      id: "3",
      course: "Algorithms",
      title: "First Assessment",
      date: "2025-04-15",
      time: "11:00 AM",
      duration: "1.5 hours",
      location: "Room 103",
      status: "completed",
      result: {
        marks: 85,
        totalMarks: 100,
        percentage: 85,
        grade: "A",
      },
    },
    {
      id: "4",
      course: "Web Development",
      title: "Practical Test",
      date: "2025-04-10",
      time: "09:00 AM",
      duration: "3 hours",
      location: "Lab 102",
      status: "completed",
      result: {
        marks: 78,
        totalMarks: 100,
        percentage: 78,
        grade: "B+",
      },
    },
    {
      id: "5",
      course: "Operating Systems",
      title: "Quiz 1",
      date: "2025-04-05",
      time: "10:30 AM",
      duration: "45 minutes",
      location: "Room 304",
      status: "completed",
      result: {
        marks: 92,
        totalMarks: 100,
        percentage: 92,
        grade: "A+",
      },
    },
  ];

  const upcomingExams = exams.filter(exam => exam.status === "upcoming");
  const completedExams = exams.filter(exam => exam.status === "completed");

  // Get grade color
  const getGradeColor = (grade: string) => {
    switch(grade) {
      case "A+":
        return "text-green-600";
      case "A":
        return "text-green-500";
      case "B+":
        return "text-blue-500";
      case "B":
        return "text-blue-400";
      case "C+":
      case "C":
        return "text-amber-500";
      default:
        return "text-red-500";
    }
  };

  return (
    <Layout userRole="student">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Examinations</h1>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
            <TabsTrigger value="completed">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-4">
            {upcomingExams.length === 0 ? (
              <DashboardCard title="No Upcoming Exams">
                <div className="flex flex-col items-center justify-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No upcoming exams scheduled</p>
                  <p className="text-sm text-muted-foreground">
                    Check back later for exam schedules
                  </p>
                </div>
              </DashboardCard>
            ) : (
              upcomingExams.map((exam) => (
                <DashboardCard key={exam.id} title={exam.course}>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-lg">{exam.title}</h3>
                        <div className="flex flex-wrap gap-4 mt-1">
                          <p className="text-sm flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(exam.date).toLocaleDateString()} at {exam.time}
                          </p>
                          <p className="text-sm">Duration: {exam.duration}</p>
                          <p className="text-sm">Location: {exam.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Badge>Upcoming</Badge>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-1" />
                          Syllabus
                        </Button>
                      </div>
                    </div>
                    
                    {/* Days remaining calculation */}
                    {(() => {
                      const examDate = new Date(exam.date);
                      const today = new Date();
                      const diffTime = examDate.getTime() - today.getTime();
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      
                      return (
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium">Days Remaining</span>
                            <span className="font-medium">{diffDays} days</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </DashboardCard>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-4">
            {completedExams.length === 0 ? (
              <DashboardCard title="No Completed Exams">
                <div className="flex flex-col items-center justify-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No exam results available</p>
                  <p className="text-sm text-muted-foreground">
                    Results will appear here once exams are graded
                  </p>
                </div>
              </DashboardCard>
            ) : (
              completedExams.map((exam) => (
                <DashboardCard key={exam.id} title={exam.course}>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-lg">{exam.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(exam.date).toLocaleDateString()} • {exam.location}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`text-2xl font-bold ${getGradeColor(exam.result!.grade)}`}>
                          {exam.result!.grade}
                        </span>
                        <div>
                          <p className="font-medium">{exam.result!.marks}/{exam.result!.totalMarks}</p>
                          <p className="text-sm text-muted-foreground">{exam.result!.percentage}%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Score</span>
                        <span className="text-sm">{exam.result!.percentage}%</span>
                      </div>
                      <Progress value={exam.result!.percentage} className="h-2" />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                </DashboardCard>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
