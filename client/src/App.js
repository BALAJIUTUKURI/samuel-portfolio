import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import QuoteForm from './components/QuoteForm';
import NewsletterSignup from './components/NewsletterSignup';
import Contact from './components/Contact';
import Analytics from './components/Analytics';
import Preloader from './components/Preloader';
import SEOHead from './components/SEOHead';
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
          <Preloader>
            <SEOHead />
            <Analytics />
            <Header />
            <Hero />
            <About />
            <Skills />
            <Portfolio />
            <Services />
            <Testimonials />
            <Blog />
            <QuoteForm />
            <NewsletterSignup />
            <Contact />
            <Footer />
            <BackToTop />
            <WhatsAppFloat />
          </Preloader>
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