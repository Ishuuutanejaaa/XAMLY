import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import StudentDashboard from './Components/Dashboards/StudentDashboard';
import TeacherHome from './Components/Dashboards/TeacherDashboard';
import CreateExamPage from './Components/CreateExam/CreateExam';
import TakeExam from './Components/TakeExam/TakeExam';
import ViewResults from './Components/ViewResults/ViewResults';
import ViewAnalytics from './Components/ViewAnalytics/ViewAnalytics';
import GetCertificate from './Components/GetCertificate/GetCertificate';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-home" element={<StudentDashboard />} />
        <Route path="/teacher-home" element={<TeacherHome />} />
        <Route path="/create-exam" element={<CreateExamPage />} />
        <Route path="/take-exam" element={<TakeExam />} />
        <Route path="/results" element={<ViewResults />} />
        <Route path="/view-analytics" element={<ViewAnalytics />} />
        <Route path="/certificate" element={<GetCertificate />} />

      </Routes>
    </Router>
  );
}

export default App;
