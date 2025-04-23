
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HODDashboard from "./pages/hod/HODDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import NotFound from "./pages/NotFound";
import StudyMaterialsPage from "./pages/student/StudyMaterialsPage";
import LeaveApprovalPage from "./pages/hod/LeaveApprovalPage";
import NoticeBoardPage from "./pages/shared/NoticeBoardPage";
import StudentAttendancePage from "./pages/student/StudentAttendancePage";
import StudentRoutinePage from "./pages/student/StudentRoutinePage";
import StudentExamsPage from "./pages/student/StudentExamsPage";
import StudentLeavePage from "./pages/student/StudentLeavePage";
import StudentFeedbackPage from "./pages/student/StudentFeedbackPage";
import TeacherMaterialsPage from "./pages/teacher/TeacherMaterialsPage";
import TeacherExamsPage from "./pages/teacher/TeacherExamsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/hod" element={<HODDashboard />} />
          <Route path="/hod/leave" element={<LeaveApprovalPage />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/materials" element={<TeacherMaterialsPage />} />
          <Route path="/teacher/exams" element={<TeacherExamsPage />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/materials" element={<StudyMaterialsPage />} />
          <Route path="/student/attendance" element={<StudentAttendancePage />} />
          <Route path="/student/routine" element={<StudentRoutinePage />} />
          <Route path="/student/exams" element={<StudentExamsPage />} />
          <Route path="/student/leave" element={<StudentLeavePage />} />
          <Route path="/student/feedback" element={<StudentFeedbackPage />} />
          <Route path="/:userRole/notices" element={<NoticeBoardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
