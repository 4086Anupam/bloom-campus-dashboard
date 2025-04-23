
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { NoticeCard } from "@/components/dashboard/NoticeCard";
import { Button } from "@/components/ui/button";
import { Plus, Users, ClipboardList, FileText, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HODDashboard() {
  return (
    <Layout userRole="hod">
      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Computer Science Department</h1>
          <Button>
            <Plus className="mr-1 h-4 w-4" />
            Add Notice
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Teachers"
            value={24}
            description="In Computer Science department"
            icon={Users}
            className="gradient-bg-hod"
          />
          <StatsCard
            title="Students"
            value={450}
            description="Currently enrolled"
            icon={Users}
          />
          <StatsCard
            title="Attendance"
            value="92%"
            description="Average attendance rate"
            trend={{ value: 3, isPositive: true }}
            icon={ClipboardList}
          />
          <StatsCard
            title="Leave Requests"
            value={5}
            description="Pending approval"
            trend={{ value: 2, isPositive: false }}
            icon={Calendar}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <DashboardCard 
            title="Quick Actions" 
            className="md:col-span-1"
          >
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-24 text-md flex flex-col gap-2">
                <Users className="h-6 w-6" />
                Add Teacher
              </Button>
              <Button className="h-24 text-md flex flex-col gap-2">
                <Users className="h-6 w-6" />
                Add Student
              </Button>
              <Button variant="outline" className="h-24 text-md flex flex-col gap-2">
                <Calendar className="h-6 w-6" />
                Update Routine
              </Button>
              <Button variant="outline" className="h-24 text-md flex flex-col gap-2">
                <FileText className="h-6 w-6" />
                Post Notice
              </Button>
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="Recent Leave Requests"
            action={<Button variant="ghost" size="sm">View All</Button>}
            className="md:col-span-1"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Personal leave: 25th - 27th April</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Deny</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Medical leave: 24th - 28th April</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Deny</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between pb-2">
                <div>
                  <p className="font-medium">Robert Smith</p>
                  <p className="text-sm text-muted-foreground">Conference: 1st - 3rd May</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Deny</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
        
        <DashboardCard 
          title="Department Notices" 
          action={
            <Button variant="outline" size="sm">
              <Plus className="mr-1 h-4 w-4" />
              Add Notice
            </Button>
          }
        >
          <Tabs defaultValue="department">
            <TabsList className="mb-4">
              <TabsTrigger value="department">Department</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            <TabsContent value="department" className="space-y-4">
              <NoticeCard
                title="Faculty Meeting"
                content="All faculty members are requested to attend the monthly department meeting on Friday, April 28th at 3:00 PM in Room 301."
                date={new Date('2025-04-22T11:30:00')}
                category="Meeting"
                isPinned={true}
              />
              <NoticeCard
                title="Project Submission Deadline"
                content="Final year students must submit their project proposals by May 5th. Please use the provided template."
                date={new Date('2025-04-20T09:15:00')}
                category="Academic"
                hasAttachment={true}
              />
            </TabsContent>
            <TabsContent value="admin" className="space-y-4">
              <NoticeCard
                title="System Maintenance"
                content="The system will be undergoing maintenance on Saturday, April 26th from 2:00 AM to 5:00 AM. During this time, the system will be unavailable."
                date={new Date('2025-04-23T10:30:00')}
                category="System"
                isPinned={true}
              />
            </TabsContent>
          </Tabs>
        </DashboardCard>
      </div>
    </Layout>
  );
}
