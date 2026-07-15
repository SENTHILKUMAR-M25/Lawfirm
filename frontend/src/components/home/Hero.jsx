import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPlay, FaShieldAlt, FaAward, FaLandmark, FaBalanceScale } from 'react-icons/fa';
import MagneticButton from '../common/MagneticButton';
import ButtonRipple from '../common/ButtonRipple';
import law from '../../../public/law.mp4'
const Hero = () => {
  const ref = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      ref.current.style.setProperty('--move-x', `${x}px`);
      ref.current.style.setProperty('--move-y', `${y}px`);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section 
      ref={ref} 
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 text-white"
    >
      {/* Background Video & Cinematic Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80"
          className="w-full h-full object-cover opacity-40 scale-110 transition-transform duration-1000 ease-out"
          style={{
            transform: 'translate(calc(var(--move-x, 0px) * -0.3), calc(var(--move-y, 0px) * -0.3))'
          }}
        >
          <source 
            src={law} 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-800/85 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="container-max section-padding relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[85vh] py-20">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-8 pt-12 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md text-xs tracking-wider uppercase text-slate-300"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Elite Legal Representation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-playfair font-semibold tracking-tight leading-[1.1]"
            >
              Defining Law with <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-white bg-clip-text text-transparent">
                Uncompromising
              </span> <br />
              Precision.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl"
            >
              Offering targeted, partner-led legal counsel designed to protect business assets, defend rights, and safely pilot complex litigation challenges.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton>
                <Link to="/appointment">
                  <ButtonRipple className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-3 transition-colors shadow-lg shadow-amber-500/10">
                    Book Consultation <FaArrowRight size={16} />
                  </ButtonRipple>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/contact">
                  <ButtonRipple className="border border-slate-800 bg-slate-900/40 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-3 hover:bg-slate-850 hover:border-slate-700 transition-all">
                    <FaPlay size={12} className="text-amber-500" /> Case Evaluation
                  </ButtonRipple>
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex items-center gap-8 pt-8 border-t border-slate-900"
            >
              {[
                { number: '99.4%', label: 'Arbitration Success Rate' },
                { number: '25+', label: 'Years of Experience' },
                { number: '$2.4B+', label: 'Assets Protected' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-xs text-slate-500 tracking-wide mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Modern Glass Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-5 hidden lg:block"
            style={{
              transform: 'translate(calc(var(--move-x, 0px) * 0.5), calc(var(--move-y, 0px) * 0.5))'
            }}
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Backglow element */}
              <div className="absolute inset-0 rounded-3xl bg-amber-500/10 blur-[80px]" />
              
              {/* Modern Frosted Panel Container */}
              <div className="relative rounded-3xl border border-slate-800/80 bg-slate-950/60 backdrop-blur-xl p-8 shadow-2xl">
                
                {/* Panel Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                      <FaBalanceScale className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-playfair font-semibold text-lg">Elite Practice Areas</h3>
                      <p className="text-xs text-slate-500">Corporate & Criminal Defense</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-slate-900 text-slate-400 tracking-wider">Active</span>
                </div>

                {/* Diverse Practice Area Metric Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { 
                      icon: <FaLandmark className="w-4 h-4" />, 
                      title: "Corporate Law", 
                      subtitle: "Mergers & Compliance", 
                      stat: "1,200+ Cases" 
                    },
                    { 
                      icon: <FaAward className="w-4 h-4" />, 
                      title: "IP Protection", 
                      subtitle: "Patents & Copyright", 
                      stat: "98% Defended" 
                    },
                    { 
                      icon: <FaShieldAlt className="w-4 h-4" />, 
                      title: "Litigation", 
                      subtitle: "High-Stakes Defense", 
                      stat: "Partner Led" 
                    },
                    { 
                      icon: <FaBalanceScale className="w-4 h-4" />, 
                      title: "Consulting", 
                      subtitle: "Global Strategy", 
                      stat: "24/7 Priority" 
                    }
                  ].map((card, idx) => (
                    <div 
                      key={idx} 
                      className="group p-4 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/70 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 group-hover:text-amber-300 group-hover:scale-105 transition-transform">
                        {card.icon}
                      </div>
                      <h4 className="font-semibold text-sm mt-3 text-slate-100">{card.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">{card.subtitle}</p>
                      <div className="text-xs font-semibold text-amber-500/80 group-hover:text-amber-400 transition-colors mt-3">
                        {card.stat}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Metric */}
                <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500">
                  <span>Registered Law Practicers Only</span>
                  <span className="text-amber-500">• Chennai, IN</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;