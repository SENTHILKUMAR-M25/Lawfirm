import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';
import ScrollReveal from '../common/ScrollReveal';
import API from '../../utils/axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await API.post('/newsletter', { email });
      toast.success('Successfully subscribed to our newsletter.');
      setEmail('');
    } catch { toast.error('Subscription failed. Please try again.'); }
  };

  return (
    <footer className="bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="floating-shape" style={{ width: 500, height: 500, top: '-20%', right: '-10%', background: 'radial-gradient(circle, #C9A227, transparent 70%)' }} />
        <div className="floating-shape" style={{ width: 300, height: 300, bottom: '-10%', left: '-5%', background: 'radial-gradient(circle, #C9A227, transparent 70%)' }} />
      </div>

      <div className="container-max section-padding pt-20 lg:pt-24 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center text-white font-playfair font-bold text-xl shadow-lg shadow-gold/20">
                L
              </div>
              <div>
                <h3 className="text-white font-playfair font-bold text-lg">Law Firm</h3>
                <p className="text-gold text-[10px] tracking-[4px] uppercase">Premium Legal</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              With over two decades of experience, our firm delivers world-class legal services defined by integrity, excellence, and an unwavering commitment to our clients.
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:bg-gold hover:border-gold hover:text-white transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h4 className="text-white font-playfair font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Practice Areas', path: '/practice-areas' },
                { label: 'Our Lawyers', path: '/lawyers' },
                { label: 'Legal Insights', path: '/blogs' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/50 hover:text-gold transition-colors duration-300 text-sm flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-gold/60" />{link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h4 className="text-white font-playfair font-bold text-lg mb-6">Practice Areas</h4>
            <ul className="space-y-3">
              {['Civil Law', 'Criminal Law', 'Corporate Law', 'Property Law', 'Family Law', 'Cyber Law'].map((area) => (
                <li key={area}>
                  <Link to="/practice-areas" className="text-white/50 hover:text-gold transition-colors duration-300 text-sm flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-gold/60" />{area}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <h4 className="text-white font-playfair font-bold text-lg mb-6">Contact</h4>
            <div className="space-y-4 mb-8">
              {[
                { icon: FaMapMarkerAlt, text: '123 Legal Tower, Park Avenue\nNew York, NY 10001' },
                { icon: FaPhone, text: '+1 (555) 123-4567' },
                { icon: FaEnvelope, text: 'info@lawfirm.com' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="text-gold" size={14} />
                  </div>
                  <span className="text-white/50 text-sm whitespace-pre-line">{text}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6">
              <h5 className="text-white font-semibold text-sm mb-3">Newsletter</h5>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none transition-colors focus:border-gold"
                />
                <button type="submit" className="gold-btn px-5 py-2.5 rounded-xl text-sm font-semibold">Subscribe</button>
              </form>
            </div>
          </ScrollReveal>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} Law Firm. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="text-white/30 hover:text-gold text-sm transition-colors">Privacy Policy</Link>
            <Link to="/" className="text-white/30 hover:text-gold text-sm transition-colors">Terms of Service</Link>
            <Link to="/" className="text-white/30 hover:text-gold text-sm transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
