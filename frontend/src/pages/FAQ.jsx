import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
  { question: 'What should I bring to my first consultation?', answer: 'Bring any relevant documents related to your case, including contracts, correspondence, court papers, and identification. Our team will guide you on specific requirements when you book.' },
  { question: 'How do I choose the right lawyer for my case?', answer: 'Consider the lawyers specialization, experience, and track record in your specific area of law. Our team can help match you with the most suitable attorney during your initial consultation.' },
  { question: 'What are your fees and payment options?', answer: 'We offer transparent pricing and flexible payment options. During your initial consultation, we will discuss fee structures, payment plans, and any potential costs involved.' },
  { question: 'How long does a typical legal process take?', answer: 'Timelines vary significantly depending on the type of case, complexity, and court schedules. Your attorney will provide a realistic timeline after reviewing your specific situation.' },
  { question: 'Do you offer emergency legal services?', answer: 'Yes, we provide 24/7 emergency legal services for urgent matters. Call our emergency hotline anytime for immediate assistance.' },
  { question: 'Can I change my lawyer if I am not satisfied?', answer: 'Yes, you have the right to change legal representation at any time. We will ensure a smooth transition and help you find the right fit.' },
  { question: 'What is the difference between civil and criminal cases?', answer: 'Civil cases involve disputes between individuals or organizations, while criminal cases involve alleged violations of law. Our firm handles both areas with specialized attorneys.' },
  { question: 'How can I schedule a consultation?', answer: 'You can book online through our appointment system, call our office, or email us. We respond to all inquiries within 24 hours.' },
];

const FAQItem = ({ faq, index, isOpen, toggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.04 }}
    viewport={{ once: true }}
    className={`rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-lg shadow-gold/10 border border-gold/20' : 'border border-border hover:border-gold/30'}`}
  >
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between p-6 bg-white text-left"
    >
      <span className={`text-navy font-semibold pr-4 text-sm lg:text-base ${isOpen ? 'text-gold' : ''}`}>
        {faq.question}
      </span>
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'gold-gradient text-white shadow-lg shadow-gold/20' : 'bg-navy/5 text-navy'}`}>
        {isOpen ? <FaMinus size={11} /> : <FaPlus size={11} />}
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 bg-white border-t border-border">
            <p className="text-text-secondary text-sm leading-relaxed">{faq.answer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="min-h-[45vh] hero-gradient flex items-center relative overflow-hidden pt-20">
        <div className="container-max section-padding relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-gold text-sm font-semibold tracking-[4px] uppercase">FAQ</span>
            <h1 className="section-title text-white mt-4 mb-6">Frequently Asked Questions</h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">Find answers to common questions about our legal services.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding py-20 lg:py-28">
        <div className="container-max max-w-3xl mx-auto">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} isOpen={openIndex === i} toggle={() => setOpenIndex(openIndex === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FAQ;
