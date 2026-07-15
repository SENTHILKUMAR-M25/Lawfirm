import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
  { number: 20, suffix: '+', label: 'Years of Experience', icon: '⚖️' },
  { number: 5000, suffix: '+', label: 'Clients Served', icon: '👥' },
  { number: 2500, suffix: '+', label: 'Cases Won', icon: '🏆' },
  { number: 98, suffix: '%', label: 'Success Rate', icon: '📈' },
];

const StatCard = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      viewport={{ once: true }}
    >
      <div className="premium-card p-8 text-center">
        <div className="text-3xl mb-4">{stat.icon}</div>
        <div className="text-4xl md:text-5xl font-playfair font-bold text-navy mb-2">
          {isInView && <CountUp end={stat.number} duration={2.5} separator="," />}
          {stat.suffix}
        </div>
        <p className="text-text-secondary font-medium text-sm">{stat.label}</p>
      </div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="section-padding -mt-16 relative z-20 pb-16">
      <div className="container-max">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
