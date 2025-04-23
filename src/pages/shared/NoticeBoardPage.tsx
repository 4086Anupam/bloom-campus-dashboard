
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { NoticeCard } from "@/components/dashboard/NoticeCard";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";

// Type definitions
interface Notice {
  id: string;
  title: string;
  content: string;
  date: Date;
  category: string;
  isPinned: boolean;
  isNew?: boolean;
  hasAttachment?: boolean;
}

export default function NoticeBoardPage() {
  const { userRole } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Demo notices data organized by category
  const demoNotices: Record<string, Notice[]> = {
    department: [
      {
        id: "1",
        title: "Faculty Meeting",
        content: "All faculty members are requested to attend the monthly department meeting on Friday, April 28th at 3:00 PM in Room 301.",
        date: new Date('2025-04-22T11:30:00'),
        category: "Meeting",
        isPinned: true,
        isNew: true,
      },
      {
        id: "2",
        title: "Project Submission Deadline",
        content: "Final year students must submit their project proposals by May 5th. Please use the provided template.",
        date: new Date('2025-04-20T09:15:00'),
        category: "Academic",
        isPinned: false,
        hasAttachment: true,
      },
      {
        id: "3",
        title: "Department Library Update",
        content: "The department library will be closed for renovation from May 10th to May 15th. Electronic resources will remain accessible.",
        date: new Date('2025-04-18T14:45:00'),
        category: "Facility",
        isPinned: false,
      },
    ],
    admin: [
      {
        id: "4",
        title: "System Maintenance",
        content: "The system will be undergoing maintenance on Saturday, April 26th from 2:00 AM to 5:00 AM. During this time, the system will be unavailable.",
        date: new Date('2025-04-23T10:30:00'),
        category: "System",
        isPinned: true,
      },
      {
        id: "5",
        title: "New Department Approval Process",
        content: "We've updated the department approval process. Please review the new guidelines.",
        date: new Date('2025-04-21T14:15:00'),
        category: "Administration",
        hasAttachment: true,
      },
    ],
    academic: [
      {
        id: "6",
        title: "Midterm Exam Schedule",
        content: "The midterm examination schedule has been published. Please check the details for your courses.",
        date: new Date('2025-04-20T14:45:00'),
        category: "Examination",
        isPinned: true,
        hasAttachment: true,
      },
      {
        id: "7",
        title: "Workshop on AI Development",
        content: "The Computer Science department is organizing a workshop on AI Development on May 2nd. All interested students can register.",
        date: new Date('2025-04-18T09:30:00'),
        category: "Workshop",
      },
    ],
    campus: [
      {
        id: "8",
        title: "Campus Wi-Fi Upgrade",
        content: "Campus Wi-Fi infrastructure is being upgraded next week. Expect brief outages in different buildings.",
        date: new Date('2025-04-17T16:00:00'),
        category: "Facility",
      },
      {
        id: "9",
        title: "Annual Sports Day",
        content: "The annual sports day will be held on May 8th. All students and faculty are encouraged to participate.",
        date: new Date('2025-04-15T11:20:00'),
        category: "Event",
        hasAttachment: true,
      },
    ],
  };

  const canPostNotice = userRole === 'admin' || userRole === 'hod';

  // Filter notices based on search term
  const filterNotices = (notices: Notice[]) => {
    if (!searchTerm) return notices;
    const term = searchTerm.toLowerCase();
    return notices.filter(notice => 
      notice.title.toLowerCase().includes(term) || 
      notice.content.toLowerCase().includes(term) || 
      notice.category.toLowerCase().includes(term)
    );
  };

  return (
    <Layout userRole={userRole as any}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Notice Board</h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notices..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {canPostNotice && (
              <Button>
                <Plus className="mr-1 h-4 w-4" />
                Add Notice
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="department" className="w-full">
          <TabsList>
            <TabsTrigger value="department">Department</TabsTrigger>
            <TabsTrigger value="admin">Administration</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="campus">Campus</TabsTrigger>
          </TabsList>

          {Object.entries(demoNotices).map(([category, notices]) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {filterNotices(notices).length > 0 ? (
                filterNotices(notices).map(notice => (
                  <NoticeCard
                    key={notice.id}
                    title={notice.title}
                    content={notice.content}
                    date={notice.date}
                    category={notice.category}
                    isPinned={notice.isPinned}
                    isNew={notice.isNew}
                    hasAttachment={notice.hasAttachment}
                  />
                ))
              ) : (
                <DashboardCard title="No Notices Found">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-lg font-medium">No notices found</p>
                    <p className="text-sm text-muted-foreground">
                      {searchTerm ? "Try a different search term" : "There are no notices in this category yet"}
                    </p>
                  </div>
                </DashboardCard>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
