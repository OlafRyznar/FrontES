// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import SecondaryHeader from './components/SecondaryHeader';
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';
import StudentPage from './components/StudentPage';
import TeacherPage from './components/TeacherPage';
import ParentPage from './components/ParentPage';
import OtherPage from './components/OtherPage';
import GradePage from './components/GradesPage';
import SchedulePage from './components/SchedulePage';
import PresencePage from './components/PresencePage';
import HomePage from './components/HomePage';
import LibraryPage from './components/LibraryPage'; 
import ContactPage from './components/ContactPage';
import HelpPage from './components/HelpPage';
import AboutUsPage from './components/AboutUsPage';
import MobileAppPage from './components/MobileAppPage';
import DuesPage from './components/DuesPage';
import ExamPage from './components/ExamPage';


// Funkcja do sprawdzania, czy użytkownik jest zalogowany
const useAuth = () => {
  const user = localStorage.getItem('user'); // Zmienna przykładowa
  return user !== null;
};

// Komponent do ochrony tras
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

// Komponent do warunkowego renderowania nagłówka
const Layout = () => {
  const location = useLocation();

  // Lista ścieżek, na których ma być wyświetlany SecondaryHeader
  const secondaryHeaderPages = ['/student', '/teacher', '/parent', '/other', '/grades', '/schedule', '/presence', '/contact','/library',
    '/mobile-app','/help', '/about-us', '/dues', '/exams'
  ];

  // Sprawdź, czy aktualna ścieżka wymaga SecondaryHeader
  const isSecondaryHeaderPage = secondaryHeaderPages.includes(location.pathname);

  // Strony bez nagłówka
  const noHeaderPages = ['/login', '/create-account'];

  // Sprawdź, czy aktualna ścieżka wymaga nagłówka
  const isNoHeaderPage = noHeaderPages.includes(location.pathname);

  return (
    <div>
      {!isNoHeaderPage && (isSecondaryHeaderPage ? <SecondaryHeader /> : <Header />)}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Dodaj trasę dla strony głównej */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/student" element={<ProtectedRoute element={<StudentPage />} />} />
        <Route path="/teacher" element={<ProtectedRoute element={<TeacherPage />} />} />
        <Route path="/parent" element={<ProtectedRoute element={<ParentPage />} />} />
        <Route path="/other" element={<ProtectedRoute element={<OtherPage />} />} />
        <Route path="/grades" element={<ProtectedRoute element={<GradePage />} />} />
        <Route path="/schedule" element={<ProtectedRoute element={<SchedulePage />} />} />
        <Route path="/presence" element={<ProtectedRoute element={<PresencePage />} />} />
        <Route path="/library" element={<ProtectedRoute element={<LibraryPage />} />} />
        <Route path="/contact" element={<ProtectedRoute element={<ContactPage />} />} />
        <Route path="/help" element={<ProtectedRoute element={<HelpPage />} />} />
        <Route path="/mobile-app" element={<ProtectedRoute element={<MobileAppPage />} />} />
        <Route path="/about-us" element={<ProtectedRoute element={<AboutUsPage />} />} />
        <Route path="/dues" element={<ProtectedRoute element={<DuesPage />} />} />
        <Route path="/exams" element={<ProtectedRoute element={<ExamPage />} />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
