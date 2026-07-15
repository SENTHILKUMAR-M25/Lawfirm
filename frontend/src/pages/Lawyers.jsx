import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaPhone, FaEnvelope } from 'react-icons/fa';
import ScrollReveal from '../components/common/ScrollReveal';
import API from '../utils/axios';

const defaultLawyers = [
  { name: 'John Anderson', experience: 25, qualification: 'Harvard Law School', specialization: ['Corporate Law', 'Litigation'], languages: ['English', 'French'], about: 'Senior partner with extensive experience in corporate litigation and business law.' },
  { name: 'Sarah Mitchell', experience: 20, qualification: 'Yale Law School', specialization: ['Criminal Law', 'Civil Rights'], languages: ['English', 'Spanish'], about: 'Renowned criminal defense attorney with a record of landmark victories.' },
  { name: 'Robert Williams', experience: 18, qualification: 'Stanford Law School', specialization: ['Property Law', 'Real Estate'], languages: ['English', 'German'], about: 'Expert in real estate transactions and property dispute resolution.' },
  { name: 'Emily Davis', experience: 15, qualification: 'Columbia Law School', specialization: ['Family Law', 'Divorce'], languages: ['English', 'Italian'], about: 'Compassionate family law attorney dedicated to protecting client interests.' },
  { name: 'Michael Chen', experience: 22, qualification: 'NYU Law School', specialization: ['Corporate Law', 'Mergers'], languages: ['English', 'Mandarin'], about: 'Corporate law expert specializing in mergers, acquisitions, and international business.' },
  { name: 'Jennifer Taylor', experience: 16, qualification: 'University of Chicago', specialization: ['Cyber Law', 'IP Rights'], languages: ['English', 'Japanese'], about: 'Leading cyber law attorney protecting digital rights and intellectual property.' },
];

const Lawyers = () => {
  const [lawyers, setLawyers] = useState(defaultLawyers);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    API.get('/lawyers').then(({ data }) => {
      if (data.lawyers?.length) setLawyers(data.lawyers);
    }).catch(() => {});
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="min-h-[45vh] hero-gradient flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.08),transparent_50%)]" />
        <div className="container-max section-padding relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-gold text-sm font-semibold tracking-[4px] uppercase">Our Team</span>
            <h1 className="section-title text-white mt-4 mb-6">Our Lawyers</h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">Meet our team of experienced, dedicated legal professionals.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding py-20 lg:py-28">
        <div className="container-max">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {lawyers.map((lawyer, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="premium-card overflow-hidden group">
                  <div className="h-52 hero-gradient flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.1),transparent)] group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative z-10 text-center">
                      <div className="w-24 h-24 mx-auto rounded-2xl gold-gradient flex items-center justify-center text-white text-3xl font-playfair font-bold shadow-lg shadow-gold/20 group-hover:scale-105 transition-transform duration-300">
                        {lawyer.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 lg:p-7">
                    <h3 className="text-xl font-playfair font-bold text-navy mb-1 group-hover:text-gold transition-colors duration-300">{lawyer.name}</h3>
                    <p className="text-gold text-sm font-medium mb-2">{lawyer.qualification}</p>
                    <p className="text-text-secondary text-sm mb-4 leading-relaxed">{lawyer.about}</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => <FaStar key={j} className="text-gold" size={12} />)}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {(lawyer.specialization || []).map((spec, j) => (
                        <span key={j} className="px-3 py-1 rounded-lg bg-navy/[0.04] text-text-secondary text-xs font-medium">{spec}</span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Link to="/appointment" className="flex-1 gold-btn text-white text-center py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-gold/20">Book Appointment</Link>
                      <a href={`tel:${lawyer.phone || '+15551234567'}`} className="w-11 h-11 rounded-xl border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all duration-300">
                        <FaPhone size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Lawyers;
