import { FaAward, FaUsers, FaHandshake, FaShieldAlt, FaClock, FaGlobe } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import ScrollReveal from '../common/ScrollReveal';

const reasons = [
  { icon: FaAward, title: '20+ Years Experience', description: 'Decades of legal expertise with a proven track record of success in complex cases across all practice areas.' },
  { icon: FaUsers, title: 'Expert Team', description: 'A dedicated team of 50+ specialized attorneys with diverse backgrounds and deep industry knowledge.' },
  { icon: FaHandshake, title: 'Personalized Approach', description: 'Every client receives individual attention and tailored legal strategies crafted to their unique needs.' },
  { icon: FaShieldAlt, title: 'Proven Results', description: '98% success rate with thousands of cases won and a legacy of satisfied clients.' },
  { icon: FaClock, title: '24/7 Availability', description: 'Round-the-clock support and immediate response for urgent legal matters requiring prompt action.' },
  { icon: FaGlobe, title: 'Global Reach', description: 'International legal network spanning multiple jurisdictions for cross-border matters.' },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.03] rounded-full blur-3xl" />
      <div className="container-max relative z-10">
        <SectionTitle
          subtitle="Why Choose Us"
          title="Why We Stand Out"
          description="Our commitment to excellence, integrity, and client success sets us apart as a premier legal practice."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="premium-card p-8 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-navy mb-3">{reason.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{reason.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
