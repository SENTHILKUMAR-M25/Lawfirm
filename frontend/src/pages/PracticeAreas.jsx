import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGavel, FaBalanceScale, FaBuilding, FaHome, FaUsers, FaHeart, FaShieldAlt, FaLaptop, FaBriefcase, FaFileInvoiceDollar, FaCopyright, FaFileAlt, FaUserTie, FaArrowRight } from 'react-icons/fa';
import SectionTitle from '../components/common/SectionTitle';
import ScrollReveal from '../components/common/ScrollReveal';
import API from '../utils/axios';

const iconMap = { FaGavel, FaBalanceScale, FaBuilding, FaHome, FaUsers, FaHeart, FaShieldAlt, FaLaptop, FaBriefcase, FaFileInvoiceDollar, FaCopyright, FaFileAlt, FaUserTie };

const allAreas = [
  { title: 'Civil Law', description: 'Expert representation in civil litigation including property disputes, contracts, and personal injury cases.', icon: 'FaBalanceScale', slug: 'civil-law' },
  { title: 'Criminal Law', description: 'Aggressive defense representation for criminal cases at all levels of court.', icon: 'FaShieldAlt', slug: 'criminal-law' },
  { title: 'Corporate Law', description: 'Comprehensive corporate legal services including mergers, compliance, and business formation.', icon: 'FaBuilding', slug: 'corporate-law' },
  { title: 'Property Law', description: 'Specialized legal services for real estate transactions and property rights.', icon: 'FaHome', slug: 'property-law' },
  { title: 'Family Law', description: 'Compassionate legal guidance for family matters including divorce, custody, and adoption.', icon: 'FaUsers', slug: 'family-law' },
  { title: 'Divorce', description: 'Sensitive and strategic divorce representation focusing on fair settlements.', icon: 'FaHeart', slug: 'divorce' },
  { title: 'Consumer Law', description: 'Protecting consumer rights against unfair practices and fraud.', icon: 'FaUserTie', slug: 'consumer-law' },
  { title: 'Cyber Law', description: 'Digital age legal protection including cyber crimes, data breaches, and privacy.', icon: 'FaLaptop', slug: 'cyber-law' },
  { title: 'Labour Law', description: 'Employment law services covering workplace disputes and labor rights.', icon: 'FaBriefcase', slug: 'labour-law' },
  { title: 'GST & Tax', description: 'Tax planning and dispute resolution including GST compliance.', icon: 'FaFileInvoiceDollar', slug: 'gst-tax' },
  { title: 'Trademark', description: 'Intellectual property protection including trademark registration and brand protection.', icon: 'FaCopyright', slug: 'trademark' },
  { title: 'Company Registration', description: 'End-to-end business formation services including company registration and compliance.', icon: 'FaFileAlt', slug: 'company-registration' },
];

const PracticeAreas = () => {
  const [areas, setAreas] = useState(allAreas);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    API.get('/practice-areas').then(({ data }) => {
      if (data.areas?.length) setAreas(data.areas);
    }).catch(() => {});
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="min-h-[45vh] hero-gradient flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.08),transparent_50%)]" />
        <div className="container-max section-padding relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-gold text-sm font-semibold tracking-[4px] uppercase">Our Expertise</span>
            <h1 className="section-title text-white mt-4 mb-6">Practice Areas</h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">Comprehensive legal services across every major practice area.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding py-20 lg:py-28">
        <div className="container-max">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {areas.map((area, i) => {
              const Icon = iconMap[area.icon] || FaGavel;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <Link to={`/practice-area/${area.slug || area._id}`} className="premium-card p-8 h-full group block">
                    <div className="w-14 h-14 rounded-2xl bg-navy/5 flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-xl font-playfair font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300">{area.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-5">{area.description}</p>
                    <span className="text-gold text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Learn More <FaArrowRight size={11} />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default PracticeAreas;
