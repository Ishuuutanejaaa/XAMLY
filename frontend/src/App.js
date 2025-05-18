import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import StudentDashboard from './Components/Dashboards/StudentDashboard';
import TeacherHome from './Components/Dashboards/TeacherDashboard';
import CreateExamPage from './Components/CreateExam/CreateExam';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-home" element={<StudentDashboard />} />
        <Route path="/teacher-home" element={<TeacherHome />} />
        <Route path="/create-exam" element={<CreateExamPage />} />
        

      </Routes>
    </Router>
  );
}

export default App;
