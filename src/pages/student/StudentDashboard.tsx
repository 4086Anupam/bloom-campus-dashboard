
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { NoticeCard } from "@/components/dashboard/NoticeCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  ChevronRight,
  ClipboardList,
  Download,
  FileText,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function StudentDashboard() {
  // Sample data
  const upcomingClasses = [
    {
      id: 1,
      name: "Database Systems",
      time: "10:00 - 11:30",
      room: "Room 301",
      teacher: "Prof. Johnson",
    },
    {
      id: 2,
      name: "Data Structures",
      time: "13:00 - 14:30",
      room: "Room 205",
      teacher: "Prof. Williams",
    },
  ];

  return (
    <Layout userRole="student">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Full Schedule
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Attendance"
            value="92%"
            description="Overall attendance rate"
            icon={ClipboardList}
            className="gradient-bg-student"
          />
          <StatsCard
            title="Assignments"
            value={3}
            description="Pending submission"
            icon={FileText}
          />
          <StatsCard
            title="Materials"
            value={12}
            description="New study materials"
            icon={Download}
          />
          <StatsCard
            title="Upcoming Exams"
            value={2}
            description="In next 2 weeks"
            icon={Calendar}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <DashboardCard
            title="Today's Classes"
            className="md:col-span-1"
            action={
              <Button variant="ghost" size="sm">
                View All
              </Button>
            }
          >
            <div className="space-y-4">
              {upcomingClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="flex flex-col p-3 rounded-lg bg-secondary/50 border"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{cls.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {cls.time} • {cls.room}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {cls.teacher}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full">
                See Full Schedule
              </Button>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Latest Study Materials"
            className="md:col-span-1"
            action={
              <Button variant="ghost" size="sm">
                View All
              </Button>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Database Normalization.pdf</p>
                  <p className="text-xs text-muted-foreground">
                    Database Systems • Prof. Johnson
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Recursion Examples.pdf</p>
                  <p className="text-xs text-muted-foreground">
                    Data Structures • Prof. Williams
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded">
                  <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Algorithm Analysis.pdf</p>
                  <p className="text-xs text-muted-foreground">
                    Algorithms • Prof. Smith
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="outline" className="w-full">
                Browse All Materials
              </Button>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Course Progress"
            className="md:col-span-1"
          >
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Database Systems</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Data Structures</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Algorithms</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Web Development</span>
                  <span className="text-sm font-medium">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </div>
          </DashboardCard>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <DashboardCard 
            title="Assignment Status" 
            action={<Button variant="ghost" size="sm">View All</Button>}
            className="md:col-span-1"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/20">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded">
                    <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Database Project Proposal</p>
                      <Badge variant="destructive">Due Today</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Database Systems • Prof. Johnson</p>
                  </div>
                </div>
                <Button size="sm">Submit</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded">
                    <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Data Structures Assignment</p>
                      <Badge variant="secondary">Due in 3 days</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Data Structures • Prof. Williams</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Start</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Algorithm Analysis</p>
                      <Badge variant="secondary">Due in 5 days</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Algorithms • Prof. Smith</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Start</Button>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="Department Notices" 
            className="md:col-span-1"
          >
            <div className="space-y-4">
              <NoticeCard
                title="Midterm Exam Schedule"
                content="The midterm examination schedule has been published. Please check the details for your courses."
                date={new Date('2025-04-20T14:45:00')}
                category="Examination"
                isPinned={true}
                hasAttachment={true}
              />
              <NoticeCard
                title="Workshop on AI Development"
                content="The Computer Science department is organizing a workshop on AI Development on May 2nd. All interested students can register."
                date={new Date('2025-04-18T09:30:00')}
                category="Workshop"
              />
            </div>
          </DashboardCard>
        </div>

        <DashboardCard
          title="Recent Messages"
          action={
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-1 h-4 w-4" />
              Inbox
            </Button>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg border">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Prof. Johnson</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Reminder about the database project proposal due date...
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg border">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>PW</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Prof. Williams</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  I've reviewed your recursion assignment. Please check...
                </p>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              View All Messages
            </Button>
          </div>
        </DashboardCard>
      </div>
    </Layout>
  );
}
