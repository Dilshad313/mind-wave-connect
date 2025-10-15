import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import UserDashboard from '../pages/Dashboards/UserDashboard';
import DoctorDashboard from '../pages/Dashboards/DoctorDashboard';
import HospitalDashboard from '../pages/Dashboards/HospitalDashboard';
import AdminDashboard from '../pages/Dashboards/AdminDashboard';
import LandingPage from '../pages/LandingPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
