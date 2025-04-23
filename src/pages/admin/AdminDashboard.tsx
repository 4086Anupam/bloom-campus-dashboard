
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { NoticeCard } from "@/components/dashboard/NoticeCard";
import { Button } from "@/components/ui/button";
import { Plus, UserCheck, Users, School, ChartBar } from "lucide-react";

export default function AdminDashboard() {
  // Sample data
  const pendingHods = [
    { id: 1, name: "Dr. Sarah Johnson", department: "Computer Science", status: "pending" },
    { id: 2, name: "Dr. Michael Chen", department: "Electrical Engineering", status: "pending" },
  ];

  return (
    <Layout userRole="admin">
      <div className="grid gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Departments"
            value={12}
            description="Active academic departments"
            icon={School}
            className="gradient-bg-admin"
          />
          <StatsCard
            title="Department Heads"
            value={10}
            description="Verified department heads"
            trend={{ value: 10, isPositive: true }}
            icon={UserCheck}
          />
          <StatsCard
            title="Teachers"
            value={148}
            description="Across all departments"
            trend={{ value: 5, isPositive: true }}
            icon={Users}
          />
          <StatsCard
            title="Students"
            value={1254}
            description="Currently enrolled"
            trend={{ value: 12, isPositive: true }}
            icon={Users}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <DashboardCard 
            title="Pending Department Head Verifications" 
            description="Department heads awaiting verification"
            action={
              <Button variant="ghost" size="sm">
                <UserCheck className="mr-1 h-4 w-4" />
                View All
              </Button>
            }
            className="md:col-span-1"
          >
            <div className="space-y-4">
              {pendingHods.map(hod => (
                <div key={hod.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{hod.name}</p>
                    <p className="text-sm text-muted-foreground">{hod.department}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Review</Button>
                    <Button size="sm">Verify</Button>
                  </div>
                </div>
              ))}
              
              {pendingHods.length === 0 && (
                <p className="text-sm text-muted-foreground">No pending verifications</p>
              )}
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="Recent Notices" 
            action={
              <Button variant="outline" size="sm">
                <Plus className="mr-1 h-4 w-4" />
                Add Notice
              </Button>
            }
            className="md:col-span-1"
          >
            <div className="space-y-4">
              <NoticeCard
                title="System Maintenance"
                content="The system will be undergoing maintenance on Saturday, April 26th from 2:00 AM to 5:00 AM. During this time, the system will be unavailable."
                date={new Date('2025-04-23T10:30:00')}
                category="System"
                isPinned={true}
                isNew={true}
              />
              <NoticeCard
                title="New Department Approval Process"
                content="We've updated the department approval process. Please review the new guidelines."
                date={new Date('2025-04-21T14:15:00')}
                category="Administration"
                hasAttachment={true}
              />
            </div>
          </DashboardCard>
        </div>
      </div>
    </Layout>
  );
}
