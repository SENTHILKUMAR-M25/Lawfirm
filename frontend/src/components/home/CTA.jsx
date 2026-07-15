import { Link } from 'react-router-dom';
import { FaArrowRight, FaPhone } from 'react-icons/fa';
import ScrollReveal from '../common/ScrollReveal';
import MagneticButton from '../common/MagneticButton';
import ButtonRipple from '../common/ButtonRipple';

const CTA = () => {
  return (
    <section className="section-padding py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.08),transparent_60%)]" />
      <div className="container-max relative z-10 text-center">
        <ScrollReveal>
          <span className="inline-block text-sm font-semibold tracking-[4px] uppercase text-gold mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6 leading-tight">
            Ready to Discuss Your Case?
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Schedule a confidential consultation with our experienced legal team today. We are here to protect your rights and provide the expert guidance you need.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton>
              <Link to="/appointment">
                <ButtonRipple className="gold-btn text-white px-10 py-4 rounded-xl text-lg font-semibold flex items-center gap-3 shadow-lg shadow-gold/25">
                  Book Free Consultation <FaArrowRight size={14} />
                </ButtonRipple>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a href="tel:+15551234567">
                <ButtonRipple className="border border-white/20 text-white px-10 py-4 rounded-xl text-lg font-semibold flex items-center gap-3 hover:bg-white hover:text-navy transition-all duration-300">
                  <FaPhone size={14} /> Call Now
                </ButtonRipple>
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;
