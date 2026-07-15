import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/practice-areas', label: 'Practice Areas' },
  { path: '/lawyers', label: 'Lawyers' },
  { path: '/blogs', label: 'Insights' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isHome = location.pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'glass-nav shadow-sm'
            : isHome
              ? 'bg-transparent'
              : 'bg-navy'
        }`}
      >
        <div className="container-max section-padding">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center text-white font-playfair font-bold text-xl group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-gold/20">
                L
              </div>
              <div className="hidden sm:block">
                <h3 className={`font-playfair font-bold text-lg leading-tight transition-colors duration-300 ${scrolled ? 'text-navy' :'text-white'}`}>
                  Law Firm
                </h3>
                <p className="text-gold text-[10px] tracking-[4px] uppercase font-semibold">Premium Legal</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-5 py-2 text-sm font-medium transition-colors duration-300 gold-underline ${
                    location.pathname === link.path
                      ? 'text-gold'
                      : scrolled 
                        ? 'text-text-primary hover:text-gold'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-5 right-5 h-[2px] gold-gradient rounded-full"
                    />
                  )}
                </Link>
              ))}
              <div className="ml-6 flex items-center gap-3">
                {user ? (
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    className="gold-btn px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-gold/20"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        scrolled || !isHome ? 'gold-outline' : 'border border-white/30 text-white hover:bg-white hover:text-navy'
                      }`}
                    >
                      Login
                    </Link>
                    <Link
                      to="/appointment"
                      className="gold-btn px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-gold/20"
                    >
                      Book Now
                    </Link>
                  </>
                )}
              </div>
            </div>

            <button
              className={`lg:hidden p-2 transition-colors ${scrolled || !isHome ? 'text-navy' : 'text-white'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-navy flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={link.path}
                  className={`text-3xl font-playfair font-bold transition-colors duration-300 ${
                    location.pathname === link.path ? 'text-gold' : 'text-white/70 hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 mt-8"
            >
              {user ? (
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="gold-btn text-white px-10 py-3.5 rounded-xl text-lg font-semibold">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="gold-outline px-10 py-3.5 rounded-xl text-lg font-semibold text-center">Login</Link>
                  <Link to="/appointment" className="gold-btn text-white px-10 py-3.5 rounded-xl text-lg font-semibold text-center">Book Now</Link>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
