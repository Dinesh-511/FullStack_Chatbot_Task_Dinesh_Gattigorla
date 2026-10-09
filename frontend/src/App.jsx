import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import CoursesPage from './pages/CoursesPage';
import ContactPage from './pages/ContactPage';
import ChatPage from './pages/ChatPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      {/* Scroll restoration so navigating to /contact or /chat always resets scroll to top */}
      <ScrollToTop />

      <div className="app-container">
        {/* Sticky Global Navigation */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/courses" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Persistent Floating Chat Trigger (hidden on /chat) */}
        <ChatWidget />

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
