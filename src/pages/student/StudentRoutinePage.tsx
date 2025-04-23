
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Type definitions for routine data
interface ClassSession {
  id: string;
  subject: string;
  time: string;
  room: string;
  teacher: string;
}

type DaySchedule = {
  [key: string]: ClassSession[];
};

type WeekSchedule = {
  [day: string]: DaySchedule;
};

export default function StudentRoutinePage() {
  const [currentWeek, setCurrentWeek] = useState<string>("Current Week");
  
  // Sample data for weekly routine
  const weeklySchedule: WeekSchedule = {
    "Current Week": {
      "Monday": [
        { id: "1", subject: "Database Systems", time: "10:00 - 11:30", room: "Room 301", teacher: "Prof. Johnson" },
        { id: "2", subject: "Data Structures", time: "13:00 - 14:30", room: "Room 205", teacher: "Prof. Williams" },
        { id: "3", subject: "Algorithms", time: "15:00 - 16:30", room: "Room 103", teacher: "Prof. Smith" },
      ],
      "Tuesday": [
        { id: "4", subject: "Web Development", time: "09:00 - 10:30", room: "Lab 102", teacher: "Prof. Davis" },
        { id: "5", subject: "Operating Systems", time: "11:00 - 12:30", room: "Room 304", teacher: "Prof. Brown" },
      ],
      "Wednesday": [
        { id: "6", subject: "Database Systems", time: "10:00 - 11:30", room: "Room 301", teacher: "Prof. Johnson" },
        { id: "7", subject: "Data Structures", time: "13:00 - 14:30", room: "Room 205", teacher: "Prof. Williams" },
        { id: "8", subject: "Algorithms", time: "15:00 - 16:30", room: "Room 103", teacher: "Prof. Smith" },
      ],
      "Thursday": [
        { id: "9", subject: "Web Development", time: "09:00 - 10:30", room: "Lab 102", teacher: "Prof. Davis" },
        { id: "10", subject: "Operating Systems", time: "11:00 - 12:30", room: "Room 304", teacher: "Prof. Brown" },
      ],
      "Friday": [
        { id: "11", subject: "Database Systems Lab", time: "10:00 - 13:00", room: "Lab 201", teacher: "Prof. Johnson" },
        { id: "12", subject: "Soft Skills Workshop", time: "14:00 - 16:00", room: "Seminar Hall", teacher: "Prof. Garcia" },
      ],
      "Saturday": [],
      "Sunday": [],
    },
    "Next Week": {
      "Monday": [
        { id: "1", subject: "Database Systems", time: "10:00 - 11:30", room: "Room 301", teacher: "Prof. Johnson" },
        { id: "2", subject: "Data Structures", time: "13:00 - 14:30", room: "Room 205", teacher: "Prof. Williams" },
      ],
      "Tuesday": [
        { id: "4", subject: "Web Development", time: "09:00 - 10:30", room: "Lab 102", teacher: "Prof. Davis" },
        { id: "5", subject: "Operating Systems", time: "11:00 - 12:30", room: "Room 304", teacher: "Prof. Brown" },
      ],
      "Wednesday": [
        { id: "6", subject: "Database Systems", time: "10:00 - 11:30", room: "Room 301", teacher: "Prof. Johnson" },
        { id: "8", subject: "Algorithms", time: "15:00 - 16:30", room: "Room 103", teacher: "Prof. Smith" },
      ],
      "Thursday": [
        { id: "9", subject: "Web Development", time: "09:00 - 10:30", room: "Lab 102", teacher: "Prof. Davis" },
      ],
      "Friday": [
        { id: "11", subject: "Database Systems Lab", time: "10:00 - 13:00", room: "Lab 201", teacher: "Prof. Johnson" },
        { id: "13", subject: "Special Lecture: AI in Education", time: "14:00 - 16:00", room: "Auditorium", teacher: "Guest Speaker" },
      ],
      "Saturday": [],
      "Sunday": [],
    },
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const isToday = (day: string) => {
    const today = new Date().getDay();
    const dayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][today];
    return day === dayIndex;
  };
  
  const navigateWeek = (direction: "prev" | "next") => {
    if (direction === "next" && currentWeek === "Current Week") {
      setCurrentWeek("Next Week");
    } else if (direction === "prev" && currentWeek === "Next Week") {
      setCurrentWeek("Current Week");
    }
  };

  return (
    <Layout userRole="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Class Routine</h1>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <DashboardCard title="Weekly Schedule" className="bg-card">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateWeek("prev")}
              disabled={currentWeek === "Current Week"}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous Week
            </Button>
            <h3 className="text-lg font-medium">{currentWeek}</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigateWeek("next")}
              disabled={currentWeek === "Next Week"}
            >
              Next Week <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Day</TableHead>
                  <TableHead>Schedule</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {days.map((day) => (
                  <TableRow key={day} className={isToday(day) ? "bg-muted/50" : ""}>
                    <TableCell className="font-medium">
                      {day}
                      {isToday(day) && <Badge className="ml-2 bg-blue-500">Today</Badge>}
                    </TableCell>
                    <TableCell>
                      {weeklySchedule[currentWeek][day]?.length > 0 ? (
                        <div className="space-y-3">
                          {weeklySchedule[currentWeek][day].map((session) => (
                            <div key={session.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-b pb-3 last:border-0 last:pb-0">
                              <div className="font-medium">{session.time}</div>
                              <div className="flex-1">
                                <div className="font-medium">{session.subject}</div>
                                <div className="text-sm text-muted-foreground">{session.room} • {session.teacher}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No classes scheduled</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DashboardCard>
      </div>
    </Layout>
  );
}
