import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import ScrollReveal from '../components/common/ScrollReveal';
import ButtonRipple from '../components/common/ButtonRipple';
import API from '../utils/axios';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const onSubmit = async (data) => {
    try {
      await API.post('/contacts', data);
      toast.success('Message sent successfully. We will respond shortly.');
      reset();
    } catch { toast.error('Failed to send message. Please try again.'); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="min-h-[45vh] hero-gradient flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.08),transparent_50%)]" />
        <div className="container-max section-padding relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-gold text-sm font-semibold tracking-[4px] uppercase">Get In Touch</span>
            <h1 className="section-title text-white mt-4 mb-6">Contact Us</h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">We are here to help. Reach out through any of the channels below.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding py-20 lg:py-28">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <ScrollReveal direction="left">
              <h2 className="text-3xl font-playfair font-bold text-navy mb-8">Get In Touch</h2>
              <div className="space-y-5 mb-8 lg:mb-0">
                {[
                  { icon: FaMapMarkerAlt, title: 'Visit Us', details: ['123 Legal Tower, Park Avenue', 'New York, NY 10001, United States'] },
                  { icon: FaPhone, title: 'Call Us', details: ['+1 (555) 123-4567', '+1 (555) 987-6543'] },
                  { icon: FaEnvelope, title: 'Email Us', details: ['info@lawfirm.com', 'support@lawfirm.com'] },
                  { icon: FaClock, title: 'Office Hours', details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 2:00 PM'] },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-cream">
                      <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold flex-shrink-0"><Icon size={20} /></div>
                      <div>
                        <h4 className="font-playfair font-bold text-navy mb-1">{item.title}</h4>
                        {item.details.map((d, j) => <p key={j} className="text-text-secondary text-sm">{d}</p>)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <form onSubmit={handleSubmit(onSubmit)} className="premium-card p-8 lg:p-10">
                <h3 className="text-2xl font-playfair font-bold text-navy mb-6">Send a Message</h3>
                <div className="space-y-5">
                  <div>
                    <input {...register('name', { required: 'Name is required' })} placeholder="Your Name" className="input-field" />
                    {errors.name && <p className="text-error text-xs mt-1.5">{errors.name.message}</p>}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} placeholder="Your Email" className="input-field" />
                      {errors.email && <p className="text-error text-xs mt-1.5">{errors.email.message}</p>}
                    </div>
                    <div>
                      <input {...register('phone')} placeholder="Your Phone" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <input {...register('subject', { required: 'Subject is required' })} placeholder="Subject" className="input-field" />
                    {errors.subject && <p className="text-error text-xs mt-1.5">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <textarea {...register('message', { required: 'Message is required' })} rows={5} placeholder="Your Message" className="input-field resize-none" />
                    {errors.message && <p className="text-error text-xs mt-1.5">{errors.message.message}</p>}
                  </div>
                  <ButtonRipple type="submit" disabled={isSubmitting} className="gold-btn text-white w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-gold/20">
                    <FaPaperPlane size={14} /> {isSubmitting ? 'Sending...' : 'Send Message'}
                  </ButtonRipple>
                </div>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
