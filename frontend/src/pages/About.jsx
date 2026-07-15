import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaEye, FaBullseye, FaHeart, FaBalanceScale, FaHandshake, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import SectionTitle from '../components/common/SectionTitle';
import ScrollReveal from '../components/common/ScrollReveal';

const timeline = [
  { year: '2004', title: 'Firm Founded', description: 'Established with a vision to provide premium legal services.' },
  { year: '2008', title: 'Expanded Practice', description: 'Opened new offices and expanded into corporate law.' },
  { year: '2012', title: 'National Recognition', description: 'Named among top law firms in the country.' },
  { year: '2016', title: 'International Reach', description: 'Established global partnerships and international practice.' },
  { year: '2020', title: 'Digital Transformation', description: 'Embraced technology for enhanced client service.' },
  { year: '2024', title: 'Industry Leader', description: 'Recognized as a premier full-service law firm.' },
];

const values = [
  { icon: FaBalanceScale, title: 'Integrity', description: 'Upholding the highest ethical standards in every case.' },
  { icon: FaHandshake, title: 'Excellence', description: 'Striving for exceptional outcomes in every matter.' },
  { icon: FaShieldAlt, title: 'Dedication', description: 'Unwavering commitment to our clients interests.' },
  { icon: FaHeart, title: 'Compassion', description: 'Understanding and empathy in every client interaction.' },
];

const About = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="min-h-[45vh] hero-gradient flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.08),transparent_50%)]" />
        <div className="container-max section-padding relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-gold text-sm font-semibold tracking-[4px] uppercase">About Us</span>
            <h1 className="section-title text-white mt-4 mb-6">Our Firm</h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">A legacy of excellence, integrity, and unwavering commitment to justice since 2004.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding py-20 lg:py-28">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl hero-gradient flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.1),transparent)]" />
                  <div className="text-center relative z-10 p-8">
                    <div className="w-20 h-20 mx-auto rounded-2xl gold-gradient flex items-center justify-center text-white text-3xl font-playfair font-bold mb-4 shadow-lg shadow-gold/20">L</div>
                    <h3 className="text-2xl font-playfair font-bold text-white">20+ Years of Excellence</h3>
                    <p className="text-gold mt-2 text-sm">Trusted by 5000+ Clients</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <span className="text-gold text-sm font-semibold tracking-[4px] uppercase">Our History</span>
              <h2 className="section-title text-navy mt-4 mb-6">A Legacy of Legal Excellence</h2>
              <div className="w-12 h-0.5 gold-gradient rounded-full mb-6" />
              <p className="text-text-secondary leading-relaxed mb-6">
                Founded in 2004, our firm has grown from a small practice to one of the most respected law firms in the nation. With a team of over 50 specialized attorneys, we provide comprehensive legal services across every major practice area.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Our commitment to excellence, integrity, and client success has earned us numerous awards and the trust of thousands of clients. We combine traditional legal expertise with innovative approaches to deliver outstanding results.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: '20+', label: 'Years Experience' },
                  { number: '5000+', label: 'Clients Served' },
                  { number: '2500+', label: 'Cases Won' },
                  { number: '50+', label: 'Expert Lawyers' },
                ].map((stat, i) => (
                  <div key={i} className="bg-cream rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-gold">{stat.number}</div>
                    <div className="text-sm text-text-secondary">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding py-20 lg:py-28 bg-cream">
        <div className="container-max">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: FaEye, title: 'Our Mission', description: 'To provide exceptional legal representation with integrity, innovation, and unwavering dedication to our clients success.' },
              { icon: FaBullseye, title: 'Our Vision', description: 'To be the most trusted and respected law firm, setting the standard for legal excellence worldwide.' },
              { icon: FaAward, title: 'Our Promise', description: 'Every client receives personalized attention, strategic thinking, and the full resources of our firm.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="premium-card p-8 h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6"><Icon size={22} /></div>
                    <h3 className="text-xl font-playfair font-bold text-navy mb-3">{item.title}</h3>
                    <p className="text-text-secondary text-sm">{item.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <SectionTitle subtitle="Our Values" title="What We Stand For" description="The core principles that guide every aspect of our practice." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="premium-card p-8 text-center h-full">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gold/10 flex items-center justify-center text-gold"><Icon size={22} /></div>
                    <h3 className="text-lg font-playfair font-bold text-navy mb-2">{v.title}</h3>
                    <p className="text-text-secondary text-sm">{v.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding py-20 lg:py-28">
        <div className="container-max">
          <SectionTitle subtitle="Our Journey" title="Firm Timeline" description="Key milestones in our journey of legal excellence." />
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gold/20 hidden md:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="premium-card p-6 inline-block text-left">
                        <span className="text-gold font-bold text-sm">{item.year}</span>
                        <h3 className="text-lg font-playfair font-bold text-navy mt-1">{item.title}</h3>
                        <p className="text-text-secondary text-sm mt-1">{item.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-4 h-4 rounded-full gold-gradient flex-shrink-0 relative z-10 shadow-lg shadow-gold/20" />
                    <div className="flex-1" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
