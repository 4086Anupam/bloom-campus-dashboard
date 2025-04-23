
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Calendar as CalendarIcon, FileUp, X, Check, FileText, AlertCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Type definitions
interface LeaveApplication {
  id: string;
  reason: string;
  type: string;
  fromDate: Date;
  toDate: Date;
  status: "pending" | "approved" | "rejected";
  appliedOn: Date;
  comment?: string;
}

export default function StudentLeavePage() {
  // Form state
  const [leaveType, setLeaveType] = useState<string>("");
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [reason, setReason] = useState<string>("");
  const [attachment, setAttachment] = useState<File | null>(null);
  
  // Sample data for leave history
  const [leaveHistory, setLeaveHistory] = useState<LeaveApplication[]>([
    {
      id: "1",
      reason: "Family function",
      type: "Personal",
      fromDate: new Date("2025-03-15"),
      toDate: new Date("2025-03-18"),
      status: "approved",
      appliedOn: new Date("2025-03-10"),
    },
    {
      id: "2",
      reason: "Medical appointment",
      type: "Medical",
      fromDate: new Date("2025-02-22"),
      toDate: new Date("2025-02-23"),
      status: "rejected",
      appliedOn: new Date("2025-02-20"),
      comment: "Insufficient supporting documents"
    },
    {
      id: "3",
      reason: "Attending a technical workshop",
      type: "Academic",
      fromDate: new Date("2025-01-25"),
      toDate: new Date("2025-01-27"),
      status: "approved",
      appliedOn: new Date("2025-01-20"),
    }
  ]);
  
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setAttachment(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leaveType || !fromDate || !toDate || !reason) {
      toast({
        title: "Form incomplete",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    // Create new leave application
    const newLeave: LeaveApplication = {
      id: (leaveHistory.length + 1).toString(),
      reason,
      type: leaveType,
      fromDate,
      toDate,
      status: "pending",
      appliedOn: new Date()
    };
    
    // Add to history
    setLeaveHistory([newLeave, ...leaveHistory]);
    
    // Reset form
    setLeaveType("");
    setFromDate(undefined);
    setToDate(undefined);
    setReason("");
    setAttachment(null);
    
    toast({
      title: "Leave application submitted",
      description: "Your leave application has been successfully submitted",
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
    <Layout userRole="student">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Leave Application</h1>
        
        <Tabs defaultValue="apply" className="w-full">
          <TabsList>
            <TabsTrigger value="apply">Apply for Leave</TabsTrigger>
            <TabsTrigger value="history">Leave History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="apply">
            <DashboardCard title="Submit Leave Application" className="mt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="leave-type">Leave Type</Label>
                    <Select value={leaveType} onValueChange={setLeaveType} required>
                      <SelectTrigger id="leave-type">
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Medical">Medical Leave</SelectItem>
                        <SelectItem value="Personal">Personal Leave</SelectItem>
                        <SelectItem value="Academic">Academic Leave</SelectItem>
                        <SelectItem value="Emergency">Emergency Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div></div>
                  
                  <div className="space-y-2">
                    <Label>From Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !fromDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fromDate ? format(fromDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={fromDate}
                          onSelect={setFromDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>To Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !toDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {toDate ? format(toDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={toDate}
                          onSelect={setToDate}
                          initialFocus
                          disabled={(date) => fromDate ? date < fromDate : false}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Leave</Label>
                  <Textarea 
                    id="reason" 
                    placeholder="Please provide detailed reason for your leave application"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="min-h-[120px]"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="attachment">Supporting Document (Optional)</Label>
                  {!attachment ? (
                    <div className="border-2 border-dashed rounded-md p-4">
                      <div className="flex flex-col items-center justify-center py-4">
                        <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Upload a file</p>
                        <p className="text-xs text-muted-foreground">PDF, JPG, or PNG</p>
                        <Input
                          id="attachment"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <Button 
                          variant="outline" 
                          className="mt-2"
                          onClick={() => document.getElementById("attachment")?.click()}
                          type="button"
                        >
                          Select File
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-secondary/50 p-3 rounded-md flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{attachment.name}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={handleRemoveFile}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button type="submit">Submit Application</Button>
                </div>
              </form>
            </DashboardCard>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4 mt-4">
              {leaveHistory.length === 0 ? (
                <DashboardCard title="No Leave History">
                  <div className="flex flex-col items-center justify-center py-8">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No leave applications found</p>
                    <p className="text-sm text-muted-foreground">
                      Your leave application history will appear here
                    </p>
                  </div>
                </DashboardCard>
              ) : (
                leaveHistory.map((leave) => (
                  <DashboardCard key={leave.id} title={`${leave.type} Leave`} className="hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(leave.status)}
                            <p className="text-sm text-muted-foreground">
                              Applied on {format(leave.appliedOn, "PPP")}
                            </p>
                          </div>
                          <p className="mt-2">{leave.reason}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            From {format(leave.fromDate, "PPP")} to {format(leave.toDate, "PPP")}
                          </p>
                        </div>
                      </div>
                      
                      {leave.status === "rejected" && leave.comment && (
                        <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-md border border-red-100 dark:border-red-900/20">
                          <div className="flex gap-2 items-start">
                            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-sm text-red-600 dark:text-red-400">Reason for Rejection</p>
                              <p className="text-sm">{leave.comment}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {leave.status === "approved" && (
                        <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-md border border-green-100 dark:border-green-900/20">
                          <div className="flex gap-2 items-center">
                            <Check className="h-5 w-5 text-green-500" />
                            <p className="text-sm text-green-600 dark:text-green-400">
                              Your leave application has been approved
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </DashboardCard>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
