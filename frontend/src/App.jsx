import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Cursor from './components/common/Cursor';
import ScrollProgress from './components/common/ScrollProgress';
import FloatingShapes from './components/common/FloatingShapes';
import WhatsAppButton from './components/common/WhatsAppButton';
import Loader from './components/common/Loader';
import ProtectedRoute from './components/common/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import PracticeAreas from './pages/PracticeAreas';
import PracticeAreaDetail from './pages/PracticeAreaDetail';
import Lawyers from './pages/Lawyers';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ClientDashboard from './pages/client/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';

const noNavPages = ['/login', '/register', '/forgot-password', '/reset-password', '/admin', '/dashboard'];
const noFooterPages = ['/login', '/register', '/forgot-password', '/reset-password', '/admin', '/dashboard'];

const Layout = ({ children }) => {
  const location = useLocation();
  const showNav = !noNavPages.some(p => location.pathname.startsWith(p));
  const showFooter = !noFooterPages.some(p => location.pathname.startsWith(p));

  return (
    <>
      {showNav && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </>
  );
};

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <FloatingShapes />
      <WhatsAppButton />
      <Loader />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/practice-areas" element={<PracticeAreas />} />
            <Route path="/practice-area/:slug" element={<PracticeAreaDetail />} />
            <Route path="/lawyers" element={<Lawyers />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center navy-gradient">
                <div className="text-center">
                  <h1 className="text-8xl font-playfair font-bold text-gold mb-4">404</h1>
                  <p className="text-white/60 text-xl mb-8">Page not found</p>
                  <a href="/" className="gold-btn text-white px-8 py-3 rounded-xl inline-block font-semibold">Go Home</a>
                </div>
              </div>
            } />
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  );
};

export default App;
