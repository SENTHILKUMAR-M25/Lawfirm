import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaGavel, FaCheckCircle } from 'react-icons/fa';
import ScrollReveal from '../components/common/ScrollReveal';
import CTA from '../components/home/CTA';
import API from '../utils/axios';

const areaDetails = {
  'civil-law': { title: 'Civil Law', content: 'Our civil litigation team handles a broad spectrum of disputes including contract disagreements, property conflicts, personal injury claims, and more. We provide strategic representation in trial courts, appellate courts, and alternative dispute resolution forums.', highlights: ['Contract Disputes', 'Property Litigation', 'Personal Injury', 'Debt Recovery', 'Insurance Claims', 'Alternative Dispute Resolution'] },
  'criminal-law': { title: 'Criminal Law', content: 'Our criminal defense attorneys have extensive experience defending clients against all types of criminal charges, from minor offenses to serious felonies. We are committed to protecting your rights at every stage of the criminal justice process.', highlights: ['White Collar Crimes', 'Drug Offenses', 'DUI Defense', 'Fraud Cases', 'Appeals', 'Juvenile Defense'] },
};

const PracticeAreaDetail = () => {
  const { slug } = useParams();
  const [area, setArea] = useState(areaDetails[slug] || { title: 'Practice Area', content: '', highlights: [] });

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  useEffect(() => {
    API.get(`/practice-areas/slug/${slug}`).then(({ data }) => {
      if (data.area) setArea(data.area);
    }).catch(() => {});
  }, [slug]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="min-h-[35vh] hero-gradient flex items-center relative overflow-hidden pt-20">
        <div className="container-max section-padding relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link to="/practice-areas" className="inline-flex items-center gap-2 text-gold text-sm font-semibold mb-6 hover:gap-3 transition-all">
              <FaArrowLeft size={11} /> Back to Practice Areas
            </Link>
            <h1 className="section-title text-white">{area.title || 'Practice Area'}</h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding py-20">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-2xl font-playfair font-bold text-navy mb-6">Overview</h2>
                <p className="text-text-secondary leading-relaxed text-lg mb-8">
                  {area.content || `Expert legal services in ${area.title}. Our team of specialized attorneys provides comprehensive representation tailored to your unique needs.`}
                </p>
              </ScrollReveal>
              {area.highlights?.length > 0 && (
                <ScrollReveal>
                  <h2 className="text-2xl font-playfair font-bold text-navy mb-6">Key Areas</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {area.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-cream">
                        <FaCheckCircle className="text-gold flex-shrink-0" size={16} />
                        <span className="text-navy font-medium text-sm">{h}</span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>
            <ScrollReveal>
              <div className="sticky top-28 space-y-6">
                <div className="premium-card p-8">
                  <h3 className="text-xl font-playfair font-bold text-navy mb-4">Need Help?</h3>
                  <p className="text-text-secondary text-sm mb-6">Schedule a consultation with our expert {area.title?.toLowerCase()} attorneys.</p>
                  <Link to="/appointment" className="gold-btn text-white w-full py-3 rounded-xl text-center block font-semibold text-sm mb-3 shadow-lg shadow-gold/20">Book Consultation</Link>
                  <a href="tel:+15551234567" className="gold-outline w-full py-3 rounded-xl text-center block font-semibold text-sm">Call Us Now</a>
                </div>
                <div className="premium-card p-6">
                  <h3 className="text-lg font-playfair font-bold text-navy mb-4">Practice Areas</h3>
                  <div className="space-y-2">
                    {['Civil Law', 'Criminal Law', 'Corporate Law', 'Property Law', 'Family Law'].map((pa, i) => (
                      <Link key={i} to="/practice-areas" className="block text-sm text-text-secondary hover:text-gold transition-colors py-1.5 gold-underline">{pa}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <CTA />
    </motion.div>
  );
};

export default PracticeAreaDetail;
