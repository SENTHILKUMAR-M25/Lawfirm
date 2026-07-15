import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const phone = '919876543210';
  return (
    <motion.a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg"
      style={{ boxShadow: '0 4px 24px rgba(37, 211, 102, 0.3)' }}
      whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)' }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
    >
      <FaWhatsapp size={24} />
    </motion.a>
  );
};

export default WhatsAppButton;
