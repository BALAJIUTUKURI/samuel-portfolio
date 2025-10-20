import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import OTPVerification from './pages/OTPVerification';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Main Portfolio Route */}
        <Route path="/" element={
          <>
            <Header />
            <Hero />
            <About />
            <Portfolio />
            <Services />
            <Contact />
            <Footer />
          </>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/verify-otp" element={<OTPVerification />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;