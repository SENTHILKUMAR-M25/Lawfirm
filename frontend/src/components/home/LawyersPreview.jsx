import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import ScrollReveal from '../common/ScrollReveal';
import API from '../../utils/axios';

const LawyersPreview = () => {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    API.get('/lawyers').then(({ data }) => setLawyers(data.lawyers?.slice(0, 4) || [])).catch(() => {});
  }, []);

  const defaultLawyers = [
    { name: 'John Anderson', experience: 25, qualification: 'Harvard Law School', specialization: ['Corporate Law', 'Litigation'], languages: ['English', 'French'] },
    { name: 'Sarah Mitchell', experience: 20, qualification: 'Yale Law School', specialization: ['Criminal Law', 'Civil Rights'], languages: ['English', 'Spanish'] },
    { name: 'Robert Williams', experience: 18, qualification: 'Stanford Law School', specialization: ['Property Law', 'Real Estate'], languages: ['English', 'German'] },
    { name: 'Emily Davis', experience: 15, qualification: 'Columbia Law School', specialization: ['Family Law', 'Divorce'], languages: ['English', 'Italian'] },
  ];

  const displayLawyers = lawyers.length ? lawyers : defaultLawyers;

  return (
    <section className="section-padding py-20 lg:py-28 bg-white">
      <SectionTitle
        subtitle="Our Team"
        title="Meet Our Lawyers"
        description="Our team of experienced attorneys brings decades of combined expertise across every area of law."
      />
      <div className="container-max">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {displayLawyers.map((lawyer, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="premium-card p-6 lg:p-8 text-center group">
                <div className="w-24 h-24 mx-auto mb-5 rounded-2xl bg-navy flex items-center justify-center text-white text-3xl font-playfair font-bold group-hover:bg-gold transition-colors duration-300">
                  {lawyer.name.charAt(0)}
                </div>
                <h3 className="text-lg font-playfair font-bold text-navy mb-1">{lawyer.name}</h3>
                <p className="text-gold text-sm font-medium mb-3">{lawyer.qualification?.split(' ').slice(0, 2).join(' ') || 'Senior Attorney'}</p>
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <FaStar key={j} className="text-gold" size={11} />)}
                </div>
                <p className="text-text-secondary text-sm mb-4">{lawyer.experience}+ Years Experience</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {(lawyer.specialization || []).slice(0, 2).map((spec, j) => (
                    <span key={j} className="px-3 py-1 rounded-lg bg-navy/[0.04] text-text-secondary text-xs font-medium">{spec}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="text-center mt-12">
          <Link to="/lawyers" className="gold-btn text-white inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-gold/20">
            View All Lawyers <FaArrowRight size={13} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LawyersPreview;
