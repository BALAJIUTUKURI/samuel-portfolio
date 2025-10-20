import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import WhatsAppFloat from './components/WhatsAppFloat';
import AdminLogin from './pages/AdminLogin';
import OTPVerification from './pages/OTPVerification';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Routes>
        {/* Main Portfolio Route */}
        <Route path="/" element={
          <>
            <Header />
            <Hero />
            <About />
            <Skills />
            <Portfolio />
            <Services />
            <Contact />
            <Footer />
            <BackToTop />
            <WhatsAppFloat />
          </>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/verify-otp" element={<OTPVerification />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;