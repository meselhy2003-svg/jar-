import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import { InstructorProvider } from './context/InstructorContext';
import { LanguageProvider } from './context/LanguageContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public & Student Pages
import Home from './pages/Home';
import AboutStudents from './pages/AboutStudents';
import AboutInstructor from './pages/AboutInstructor';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import StudentOrders from './pages/StudentOrders';
import BookSession from './pages/BookSession';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import CoursePlayer from './pages/CoursePlayer';
import Legal from './pages/Legal';

// Student Portal Pages
import StudentDashboard from './pages/StudentDashboard';
import StudentPortalProfile from './pages/student/StudentProfile';
import SessionRoom from './pages/student/SessionRoom';
import MyAssignments from './pages/student/MyAssignments';
import EnterAssignment from './pages/student/EnterAssignment';

// Instructor Portal Pages
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import AvailableTasks from './pages/instructor/AvailableTasks';
import TrialTasks from './pages/instructor/TrialTasks';
import TrialSubmission from './pages/instructor/TrialSubmission';
import TrialSuccess from './pages/instructor/TrialSuccess';
import AssignmentTasks from './pages/instructor/AssignmentTasks';
import AssignmentConfirmed from './pages/instructor/AssignmentConfirmed';
import ExplainTasks from './pages/instructor/ExplainTasks';
import LiveExplainTasks from "./pages/instructor/LiveExplainTasks";
import LiveTrialSuccess from "./pages/instructor/LiveTrialSuccess";
import MyProjects from "./pages/instructor/MyProjects";
import AssignmentProject from "./pages/instructor/AssignmentProject";
import ExplainProject from "./pages/instructor/ExplainProject";
import UploadExplainVideo from "./pages/instructor/UploadExplainVideo";
import ProjectDelivered from "./pages/instructor/ProjectDelivered";
import LiveExplainSession from "./pages/instructor/LiveExplainSession";
import InstructorOffers from "./pages/instructor/InstructorOffers";
import TrialOffers from "./pages/instructor/TrialOffers";
import ViewOffer from "./pages/instructor/ViewOffer";
import ExplainOffers from "./pages/instructor/ExplainOffers";
import InstructorContact from "./pages/instructor/InstructorContact";
import InstructorNotifications from "./pages/instructor/InstructorNotifications";
import InstructorProfile from "./pages/instructor/InstructorProfile";
import EditInstructorProfile from "./pages/instructor/EditInstructorProfile";
import WithdrawEarnings from "./pages/instructor/WithdrawEarnings";
import OfferConfirmed from './pages/instructor/OfferConfirmed';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import AdminProfile from './pages/admin/AdminProfile';
import ManageInstructors from './pages/admin/ManageInstructors';
import AdminInstructorProfile from './pages/admin/InstructorProfile';
import EditInstructor from './pages/admin/EditInstructor';
import RegisterInstructor from './pages/admin/RegisterInstructor';
import InstructorWallet from './pages/admin/InstructorWallet';
import ManageStudents from './pages/admin/ManageStudents';
import RegisterStudent from './pages/admin/RegisterStudent';
import EditStudent from './pages/admin/EditStudent';
import StudentProfile from './pages/admin/StudentProfile';
import StudentWallet from './pages/admin/StudentWallet';
import FinancialsPricing from './pages/admin/FinancialsPricing';
import SystemHealthOrders from './pages/admin/SystemHealthOrders';
import ManageCourses from './pages/admin/ManageCourses';

const PublicLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <LanguageProvider>
      <CourseProvider>
        <InstructorProvider>
          <AuthProvider>
            <Router>
              <Routes>
                {/* Dedicated Admin Login Page */}
                <Route path="/admin-login" element={<AdminLogin />} />

                {/* Public & Student Routes with Standard Layout */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about-students" element={<AboutStudents />} />
                  <Route path="/about-instructor" element={<AboutInstructor />} />
                  <Route path="/instructor" element={<AboutInstructor />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/get-started" element={<GetStarted />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/instructor-login" element={<Login isInstructor={true} />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  
                  {/* Courses */}
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
                  <Route path="/courses/:id" element={<CourseDetail />} />
                  <Route path="/my-courses" element={<Courses />} />
                  <Route path="/my-courses/:id" element={<CourseDetail />} />
                  <Route path="/courses/:courseId/lesson/:lessonId" element={<CoursePlayer />} />
                  <Route path="/course-player/:id" element={<CoursePlayer />} />
                  
                  {/* Orders & Booking */}
                  <Route path="/orders" element={<StudentOrders />} />
                  <Route path="/my-orders" element={<StudentOrders />} />
                  <Route path="/book-session" element={<BookSession />} />
                  <Route path="/student/dashboard" element={<StudentDashboard />} />
                  <Route path="/student/profile" element={<StudentPortalProfile />} />
                  <Route path="/profile" element={<StudentPortalProfile />} />
                  <Route path="/session-room" element={<SessionRoom />} />
                  <Route path="/session-room/:sessionId" element={<SessionRoom />} />
                  <Route path="/my-assignments" element={<MyAssignments />} />
                  <Route path="/my-assignments/:assignmentId" element={<EnterAssignment />} />
                  <Route path="/assignments" element={<MyAssignments />} />
                  <Route path="/enter-assignment" element={<EnterAssignment />} />
                  
                  {/* Instructor Portal Routes */}
                  <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
                  <Route path="/instructor/tasks" element={<AvailableTasks />} />
                  <Route path="/available-tasks" element={<AvailableTasks />} />
                  <Route path="/instructor/trial-tasks" element={<TrialTasks />} />
                  <Route path="/trial-tasks" element={<TrialTasks />} />
                  <Route path="/instructor/trial-submission" element={<TrialSubmission />} />
                  <Route path="/instructor/trial-submission/:id" element={<TrialSubmission />} />
                  <Route path="/instructor/trial-success" element={<TrialSuccess />} />
                  <Route path="/instructor/assignment-tasks" element={<AssignmentTasks />} />
                  <Route path="/instructor/assignment-confirmed" element={<AssignmentConfirmed />} />
                  <Route path="/instructor/explain-tasks" element={<ExplainTasks />} />
                  <Route path="/assignment-tasks" element={<AssignmentTasks />} />
                  <Route path="/instructor/live-explain-tasks" element={<LiveExplainTasks />} />
                  <Route path="/instructor/live-trial-success" element={<LiveTrialSuccess />} />
                  <Route path="/instructor/projects" element={<MyProjects />} />
                  <Route path="/instructor/assignment-project" element={<AssignmentProject />} />
                  <Route path="/instructor/explain-project" element={<ExplainProject />} />
                  <Route path="/instructor/upload-explain-video" element={<UploadExplainVideo />} />
                  <Route path="/instructor/project-delivered" element={<ProjectDelivered />} />
                  <Route path="/instructor/live-explain-session" element={<LiveExplainSession />} />
                  <Route path="/instructor/offers" element={<InstructorOffers />} />
                  <Route path="/instructor/trial-offers" element={<TrialOffers />} />
                  <Route path="/instructor/view-offer/:id" element={<ViewOffer />} />
                  <Route path="/instructor/explain-offers" element={<ExplainOffers />} />
                  <Route path="/instructor/contact" element={<InstructorContact />} />
                  <Route path="/instructor/notifications" element={<InstructorNotifications />} />
                  <Route path="/notifications" element={<InstructorNotifications />} />
                  <Route path="/instructor/profile" element={<InstructorProfile />} />
                  <Route path="/instructor/edit-profile" element={<EditInstructorProfile />} />
                  <Route path="/instructor/withdraw" element={<WithdrawEarnings />} />
                  <Route path="/instructor/offer-confirmed" element={<OfferConfirmed />} />
                  <Route path="/terms" element={<Legal />} />
                  <Route path="/privacy" element={<Legal />} />
                </Route>

                {/* Admin Dashboard Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="profile" element={<AdminProfile />} />
                  <Route path="instructors" element={<ManageInstructors />} />
                  <Route path="instructors/register" element={<RegisterInstructor />} />
                  <Route path="instructors/edit" element={<EditInstructor />} />
                  <Route path="instructors/:id" element={<AdminInstructorProfile />} />
                  <Route path="instructor-wallet" element={<InstructorWallet />} />
                  <Route path="students" element={<ManageStudents />} />
                  <Route path="students/register" element={<RegisterStudent />} />
                  <Route path="students/edit" element={<EditStudent />} />
                  <Route path="students/:id" element={<StudentProfile />} />
                  <Route path="student-wallet" element={<StudentWallet />} />
                  <Route path="orders" element={<SystemHealthOrders />} />
                  <Route path="financials" element={<FinancialsPricing />} />
                  <Route path="courses" element={<ManageCourses />} />
                </Route>
              </Routes>
            </Router>
          </AuthProvider>
        </InstructorProvider>
      </CourseProvider>
    </LanguageProvider>
  );
}

export default App;
