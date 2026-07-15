import { FaTrophy, FaAward, FaMedal, FaStar, FaShieldAlt } from 'react-icons/fa';
import ScrollReveal from '../common/ScrollReveal';

const awards = [
  { icon: FaTrophy, title: 'Best Law Firm 2024', org: 'Legal Excellence Awards' },
  { icon: FaAward, title: 'Top Rated Firm', org: 'Chambers & Partners' },
  { icon: FaMedal, title: 'Client Choice Award', org: 'International Legal Group' },
  { icon: FaStar, title: '5-Star Rating', org: 'Legal 500' },
  { icon: FaShieldAlt, title: 'Trusted Advisors', org: 'Corporate Legal Council' },
];

const Awards = () => {
  return (
    <section className="section-padding py-16 bg-white border-b border-border">
      <div className="container-max">
        <ScrollReveal className="text-center mb-10">
          <span className="inline-block text-sm font-semibold tracking-[4px] uppercase text-gold mb-2">Recognition</span>
          <h2 className="text-2xl md:text-3xl font-playfair font-bold text-navy">Awards & Recognition</h2>
          <div className="section-divider mx-auto mt-3" />
        </ScrollReveal>
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
          {awards.map((award, i) => {
            const Icon = award.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-navy/[0.04] flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-navy font-bold text-sm whitespace-nowrap">{award.title}</h4>
                  <p className="text-text-secondary text-xs mt-0.5">{award.org}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Awards;
