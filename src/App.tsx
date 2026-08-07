import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Figma Pages
import Home from './pages/Home'; // Student Landing page screenshot
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
import Legal from './pages/Legal';

// Student & Instructor Portal Pages
import StudentDashboard from './pages/StudentDashboard';
import SessionRoom from './pages/student/SessionRoom';
import MyAssignments from './pages/student/MyAssignments';
import EnterAssignment from './pages/student/EnterAssignment';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import AvailableTasks from './pages/instructor/AvailableTasks';
import TrialTasks from './pages/instructor/TrialTasks';
import TrialSubmission from './pages/instructor/TrialSubmission';
import TrialSuccess from './pages/instructor/TrialSuccess';
import AssignmentTasks from './pages/instructor/AssignmentTasks';
import AssignmentConfirmed from './pages/instructor/AssignmentConfirmed';
import ExplainTasks from './pages/instructor/ExplainTasks';
import CoursePlayer from './pages/CoursePlayer';
import OfferConfirmed from './pages/instructor/OfferConfirmed';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import AdminProfile from './pages/admin/AdminProfile';
import ManageInstructors from './pages/admin/ManageInstructors';
import InstructorProfile from './pages/admin/InstructorProfile';
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
    <CourseProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Dedicated Admin Login Page */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Public Layout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about-students" element={<AboutStudents />} />
              <Route path="/instructor" element={<AboutInstructor />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/login" element={<Login />} />
              <Route path="/instructor-login" element={<Login isInstructor={true} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/my-orders" element={<StudentOrders />} />
              <Route path="/orders" element={<StudentOrders />} />
              <Route path="/book-session" element={<BookSession />} />

              {/* Courses & Course Details */}
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/my-courses" element={<Courses />} />
              <Route path="/my-courses/:id" element={<CourseDetail />} />

              <Route path="/courses/:courseId/lesson/:lessonId" element={<CoursePlayer />} />

              {/* My Assignments Routes */}
              <Route path="/my-assignments" element={<MyAssignments />} />
              <Route path="/my-assignments/:assignmentId" element={<EnterAssignment />} />
              <Route path="/assignments" element={<MyAssignments />} />

              {/* Portals & Legal */}
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/session-room/:sessionId" element={<SessionRoom />} />
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
              <Route path="instructors/:id" element={<InstructorProfile />} />
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
    </CourseProvider>
  );
}

export default App;

