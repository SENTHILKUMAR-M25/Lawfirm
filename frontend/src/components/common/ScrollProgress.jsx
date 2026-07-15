import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] gold-gradient origin-left"
      style={{ scaleX, transformOrigin: '0% 0%' }}
    />
  );
};

export default ScrollProgress;
