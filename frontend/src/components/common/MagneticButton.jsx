import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, className = '', ...props }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x * 0.25, y: pos.y * 0.25 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.1 }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
