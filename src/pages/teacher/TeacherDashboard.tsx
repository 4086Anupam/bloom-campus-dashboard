
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { NoticeCard } from "@/components/dashboard/NoticeCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Users, 
  ClipboardList, 
  FileText, 
  BookOpen, 
  Star,
  Upload,
  ChevronRight
} from "lucide-react";

export default function TeacherDashboard() {
  return (
    <Layout userRole="teacher">
      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Upload className="mr-1 h-4 w-4" />
              Upload Material
            </Button>
            <Button>
              <Plus className="mr-1 h-4 w-4" />
              Create Exam
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Classes Today"
            value={4}
            description="Scheduled for today"
            icon={ClipboardList}
            className="gradient-bg-teacher"
          />
          <StatsCard
            title="Total Students"
            value={124}
            description="In your classes"
            icon={Users}
          />
          <StatsCard
            title="Assignments"
            value={3}
            description="Pending review"
            icon={FileText}
          />
          <StatsCard
            title="Avg. Feedback"
            value="4.8/5"
            description="From 86 reviews"
            trend={{ value: 0.2, isPositive: true }}
            icon={Star}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <DashboardCard 
            title="Today's Schedule" 
            className="md:col-span-1"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
                <div>
                  <p className="font-medium">Introduction to Programming</p>
                  <p className="text-sm text-muted-foreground">09:00 - 10:30 • Room 205</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg">
                <div>
                  <p className="font-medium">Data Structures</p>
                  <p className="text-sm text-muted-foreground">11:00 - 12:30 • Room 301</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg">
                <div>
                  <p className="font-medium">Database Systems Lab</p>
                  <p className="text-sm text-muted-foreground">13:30 - 15:00 • Lab 102</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg">
                <div>
                  <p className="font-medium">Algorithm Design</p>
                  <p className="text-sm text-muted-foreground">15:30 - 17:00 • Room 205</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="Student Performance" 
            description="Average performance by course"
            className="md:col-span-1"
          >
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Introduction to Programming</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Data Structures</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Database Systems</span>
                  <span className="text-sm font-medium">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Algorithm Design</span>
                  <span className="text-sm font-medium">71%</span>
                </div>
                <Progress value={71} className="h-2" />
              </div>
            </div>
          </DashboardCard>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <DashboardCard 
            title="Recent Uploads" 
            action={<Button variant="ghost" size="sm">View All</Button>}
            className="md:col-span-1"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">Database Normalization.pdf</p>
                    <p className="text-xs text-muted-foreground">Uploaded 2 days ago</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                    <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">Recursion Examples.docx</p>
                    <p className="text-xs text-muted-foreground">Uploaded 3 days ago</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                    <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">Assignment 2 Questions.pdf</p>
                    <p className="text-xs text-muted-foreground">Uploaded 5 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="Department Notices" 
            className="md:col-span-1"
          >
            <div className="space-y-4">
              <NoticeCard
                title="Faculty Meeting"
                content="All faculty members are requested to attend the monthly department meeting on Friday, April 28th at 3:00 PM in Room 301."
                date={new Date('2025-04-22T11:30:00')}
                category="Meeting"
              />
              <NoticeCard
                title="Midterm Exam Schedule"
                content="The midterm examination schedule has been published. Please check your courses."
                date={new Date('2025-04-20T14:45:00')}
                category="Examination"
              />
            </div>
          </DashboardCard>
        </div>
      </div>
    </Layout>
  );
}
