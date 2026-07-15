import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGavel, FaBalanceScale, FaBuilding, FaHome, FaUsers, FaHeart, FaShieldAlt, FaLaptop, FaBriefcase, FaFileInvoiceDollar, FaCopyright, FaFileAlt } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import ScrollReveal from '../common/ScrollReveal';
import API from '../../utils/axios';

const iconMap = {
  FaGavel, FaBalanceScale, FaBuilding, FaHome, FaUsers, FaHeart,
  FaShieldAlt, FaLaptop, FaBriefcase, FaFileInvoiceDollar, FaCopyright, FaFileAlt,
};

const defaultAreas = [
  { title: 'Civil Law', description: 'Expert representation in civil litigation including property disputes, contracts, and personal injury.', icon: 'FaBalanceScale', slug: 'civil-law' },
  { title: 'Criminal Law', description: 'Aggressive defense representation for criminal cases at all levels of court.', icon: 'FaShieldAlt', slug: 'criminal-law' },
  { title: 'Corporate Law', description: 'Comprehensive corporate legal services including mergers, compliance, and business formation.', icon: 'FaBuilding', slug: 'corporate-law' },
  { title: 'Property Law', description: 'Specialized legal services for real estate transactions and property rights.', icon: 'FaHome', slug: 'property-law' },
  { title: 'Family Law', description: 'Compassionate legal guidance for family matters including divorce and custody.', icon: 'FaUsers', slug: 'family-law' },
  { title: 'Cyber Law', description: 'Protection against cyber crimes, data breaches, and digital rights enforcement.', icon: 'FaLaptop', slug: 'cyber-law' },
];

const PracticeAreasPreview = () => {
  const [areas, setAreas] = useState(defaultAreas);

  useEffect(() => {
    API.get('/practice-areas').then(({ data }) => {
      if (data.areas?.length) setAreas(data.areas.slice(0, 6));
    }).catch(() => {});
  }, []);

  return (
    <section className="section-padding py-20 lg:py-28 bg-white">
      <SectionTitle
        subtitle="What We Do"
        title="Areas of Practice"
        description="Our firm provides comprehensive legal services across multiple practice areas, ensuring expert representation for all your legal needs."
      />
      <div className="container-max">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {areas.map((area, i) => {
            const Icon = iconMap[area.icon] || FaGavel;
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
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
        <ScrollReveal className="text-center mt-12">
          <Link to="/practice-areas" className="gold-outline inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm">
            View All Practice Areas <FaArrowRight size={13} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PracticeAreasPreview;
