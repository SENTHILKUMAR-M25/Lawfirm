import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import PracticeAreasPreview from '../components/home/PracticeAreasPreview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import LawyersPreview from '../components/home/LawyersPreview';
import Testimonials from '../components/home/Testimonials';
import Awards from '../components/home/Awards';
import BlogsPreview from '../components/home/BlogsPreview';
import CTA from '../components/home/CTA';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <Stats />
      <PracticeAreasPreview />
      <WhyChooseUs />
      <LawyersPreview />
      <Testimonials />
      <Awards />
      <BlogsPreview />
      <CTA />
    </motion.div>
  );
};

export default Home;
