
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface LeaveRequest {
  id: string;
  teacherName: string;
  department: string;
  reason: string;
  type: string;
  fromDate: string;
  toDate: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
  hasAttachment: boolean;
}

// Demo data for leave requests
const demoLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    teacherName: "Sarah Johnson",
    department: "Computer Science",
    reason: "Personal leave for family event",
    type: "Personal",
    fromDate: "2025-04-25",
    toDate: "2025-04-27",
    status: "pending",
    appliedOn: "2025-04-20",
    hasAttachment: false
  },
  {
    id: "2",
    teacherName: "Michael Chen",
    department: "Computer Science",
    reason: "Medical appointment",
    type: "Medical",
    fromDate: "2025-04-24",
    toDate: "2025-04-28",
    status: "pending",
    appliedOn: "2025-04-19",
    hasAttachment: true
  },
  {
    id: "3",
    teacherName: "Robert Smith",
    department: "Computer Science",
    reason: "Attending research conference",
    type: "Official",
    fromDate: "2025-05-01",
    toDate: "2025-05-03",
    status: "pending",
    appliedOn: "2025-04-18",
    hasAttachment: true
  },
  {
    id: "4",
    teacherName: "Emily Rodriguez",
    department: "Computer Science",
    reason: "Sick leave",
    type: "Medical",
    fromDate: "2025-04-22",
    toDate: "2025-04-23",
    status: "approved",
    appliedOn: "2025-04-21",
    hasAttachment: true
  },
  {
    id: "5",
    teacherName: "David Wilson",
    department: "Computer Science",
    reason: "Family emergency",
    type: "Personal",
    fromDate: "2025-04-15",
    toDate: "2025-04-17",
    status: "rejected",
    appliedOn: "2025-04-14",
    hasAttachment: false
  }
];

export default function LeaveApprovalPage() {
  const [filter, setFilter] = useState<string>("all");
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(demoLeaveRequests);
  const { toast } = useToast();

  const filteredRequests = filter === "all" 
    ? leaveRequests 
    : leaveRequests.filter(req => req.status === filter);

  const handleApproveLeave = (id: string) => {
    setLeaveRequests(prev => 
      prev.map(req => req.id === id ? {...req, status: 'approved'} : req)
    );
    toast({
      title: "Leave Approved",
      description: "The leave request has been approved successfully.",
    });
  };

  const handleRejectLeave = (id: string) => {
    setLeaveRequests(prev => 
      prev.map(req => req.id === id ? {...req, status: 'rejected'} : req)
    );
    toast({
      title: "Leave Rejected",
      description: "The leave request has been rejected.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Layout userRole="hod">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Leave Approval</h1>
          <div className="flex items-center gap-2">
            <Select
              value={filter}
              onValueChange={setFilter}
            >
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4 mt-4">
            {leaveRequests.filter(req => req.status === "pending").length === 0 ? (
              <DashboardCard>
                <div className="flex flex-col items-center justify-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No pending leave requests</p>
                  <p className="text-sm text-muted-foreground">
                    All leave requests have been processed
                  </p>
                </div>
              </DashboardCard>
            ) : (
              leaveRequests.filter(req => req.status === "pending").map((request) => (
                <DashboardCard key={request.id} className="hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{request.teacherName}</h3>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {request.type} leave: {new Date(request.fromDate).toLocaleDateString()} - {new Date(request.toDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm">{request.reason}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">Applied on {new Date(request.appliedOn).toLocaleDateString()}</span>
                        {request.hasAttachment && (
                          <Badge variant="outline" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            Attachment
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 self-end md:self-auto">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRejectLeave(request.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleApproveLeave(request.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </DashboardCard>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4 mt-4">
            {leaveRequests.filter(req => req.status !== "pending").length === 0 ? (
              <DashboardCard>
                <div className="flex flex-col items-center justify-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No processed leave requests</p>
                  <p className="text-sm text-muted-foreground">
                    Leave request history will appear here
                  </p>
                </div>
              </DashboardCard>
            ) : (
              leaveRequests.filter(req => req.status !== "pending").map((request) => (
                <DashboardCard key={request.id} className="hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{request.teacherName}</h3>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {request.type} leave: {new Date(request.fromDate).toLocaleDateString()} - {new Date(request.toDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm">{request.reason}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">Applied on {new Date(request.appliedOn).toLocaleDateString()}</span>
                        {request.hasAttachment && (
                          <Badge variant="outline" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            Attachment
                          </Badge>
                        )}
                      </div>
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
