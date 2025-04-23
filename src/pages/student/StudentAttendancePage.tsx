
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Type definitions
interface CourseAttendance {
  id: string;
  name: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  status: "good" | "warning" | "danger";
}

interface DailyAttendance {
  id: string;
  date: string;
  day: string;
  courses: {
    id: string;
    name: string;
    status: "present" | "absent" | "late";
    time: string;
  }[];
}

export default function StudentAttendancePage() {
  // Sample data for course attendance
  const courseAttendance: CourseAttendance[] = [
    {
      id: "1",
      name: "Database Systems",
      totalClasses: 24,
      attendedClasses: 22,
      percentage: 92,
      status: "good"
    },
    {
      id: "2",
      name: "Data Structures",
      totalClasses: 22,
      attendedClasses: 18,
      percentage: 82,
      status: "good"
    },
    {
      id: "3",
      name: "Algorithms",
      totalClasses: 20,
      attendedClasses: 15,
      percentage: 75,
      status: "warning"
    },
    {
      id: "4",
      name: "Web Development",
      totalClasses: 18,
      attendedClasses: 16,
      percentage: 89,
      status: "good"
    },
    {
      id: "5",
      name: "Operating Systems",
      totalClasses: 16,
      attendedClasses: 11,
      percentage: 69,
      status: "danger"
    }
  ];

  // Sample data for daily attendance
  const dailyAttendance: DailyAttendance[] = [
    {
      id: "1",
      date: "2025-04-23",
      day: "Wednesday",
      courses: [
        { id: "1", name: "Database Systems", status: "present", time: "10:00 - 11:30" },
        { id: "2", name: "Data Structures", status: "present", time: "13:00 - 14:30" },
        { id: "3", name: "Algorithms", status: "late", time: "15:00 - 16:30" }
      ]
    },
    {
      id: "2",
      date: "2025-04-22",
      day: "Tuesday",
      courses: [
        { id: "4", name: "Web Development", status: "present", time: "09:00 - 10:30" },
        { id: "5", name: "Operating Systems", status: "absent", time: "11:00 - 12:30" }
      ]
    },
    {
      id: "3",
      date: "2025-04-21",
      day: "Monday",
      courses: [
        { id: "1", name: "Database Systems", status: "present", time: "10:00 - 11:30" },
        { id: "3", name: "Algorithms", status: "present", time: "15:00 - 16:30" }
      ]
    }
  ];

  // Function to get badge color based on status
  const getStatusBadge = (status: "present" | "absent" | "late") => {
    switch(status) {
      case "present":
        return <Badge className="bg-green-500">Present</Badge>;
      case "absent":
        return <Badge className="bg-red-500">Absent</Badge>;
      case "late":
        return <Badge className="bg-amber-500">Late</Badge>;
    }
  };

  return (
    <Layout userRole="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Attendance Record</h1>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
        </div>

        <DashboardCard title="Overall Attendance" className="bg-card">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-medium">Semester Attendance</h3>
                <span className="text-lg font-medium">83.5%</span>
              </div>
              <Progress value={83.5} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                You need to maintain at least 75% attendance in all subjects.
              </p>
            </div>
            
            <div className="flex items-center justify-around gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">114</div>
                <p className="text-sm text-muted-foreground">Present</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500">8</div>
                <p className="text-sm text-muted-foreground">Late</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">20</div>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
            </div>
          </div>
        </DashboardCard>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList>
            <TabsTrigger value="courses">Course-wise</TabsTrigger>
            <TabsTrigger value="daily">Daily Record</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4 mt-4">
            {courseAttendance.map((course) => (
              <DashboardCard key={course.id} title={course.name}>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Attended {course.attendedClasses} out of {course.totalClasses} classes
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-medium ${
                        course.status === "good" ? "text-green-500" : 
                        course.status === "warning" ? "text-amber-500" : "text-red-500"
                      }`}>
                        {course.percentage}%
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={course.percentage} 
                    className={`h-2 ${
                      course.status === "good" ? "bg-green-200" : 
                      course.status === "warning" ? "bg-amber-200" : "bg-red-200"
                    }`} 
                  />
                  {course.status === "danger" && (
                    <p className="text-sm text-red-500 font-medium">
                      Warning: Your attendance is below the required threshold.
                    </p>
                  )}
                </div>
              </DashboardCard>
            ))}
          </TabsContent>

          <TabsContent value="daily" className="space-y-4 mt-4">
            {dailyAttendance.map((day) => (
              <DashboardCard key={day.id} title={`${day.day}, ${new Date(day.date).toLocaleDateString()}`}>
                <div className="space-y-4">
                  {day.courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">{course.time}</p>
                      </div>
                      {getStatusBadge(course.status)}
                    </div>
                  ))}
                </div>
              </DashboardCard>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
