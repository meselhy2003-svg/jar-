import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Figma Pages
import Home from './pages/Home'; // Student Landing page screenshot
import AboutStudents from './pages/AboutStudents';
import AboutInstructor from './pages/AboutInstructor';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';
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
import Dashboard from './pages/admin/Dashboard';
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
              <Route path="courses" element={<ManageCourses />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </CourseProvider>
  );
}

export default App;

