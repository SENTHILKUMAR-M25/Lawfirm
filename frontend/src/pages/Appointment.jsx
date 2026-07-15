import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaComment, FaGavel, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import ScrollReveal from '../components/common/ScrollReveal';
import ButtonRipple from '../components/common/ButtonRipple';
import API from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const practiceAreas = ['Civil Law', 'Criminal Law', 'Corporate Law', 'Property Law', 'Family Law', 'Divorce', 'Consumer Law', 'Cyber Law', 'Labour Law', 'GST & Tax', 'Trademark', 'Company Registration', 'Legal Notice', 'Documentation'];

const Appointment = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { name: user?.name || '', email: user?.email || '', phone: user?.phone || '' }
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const onSubmit = async (data) => {
    try {
      await API.post('/appointments', data);
      toast.success('Appointment booked! We will confirm shortly.');
      reset();
    } catch { toast.error('Booking failed. Please try again.'); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="min-h-[45vh] hero-gradient flex items-center relative overflow-hidden pt-20">
        <div className="container-max section-padding relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-gold text-sm font-semibold tracking-[4px] uppercase">Book a Consultation</span>
            <h1 className="section-title text-white mt-4 mb-6">Schedule Appointment</h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">Complete the details below and we will confirm your appointment promptly.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding py-20 lg:py-28">
        <div className="container-max max-w-2xl mx-auto">
          <ScrollReveal>
            <form onSubmit={handleSubmit(onSubmit)} className="premium-card p-8 lg:p-12">
              <h3 className="text-2xl font-playfair font-bold text-navy mb-8">Book Your Consultation</h3>
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5"><FaUser className="inline mr-1.5 text-gold" size={12} />Full Name</label>
                    <input {...register('name', { required: 'Name is required' })} className="input-field" />
                    {errors.name && <p className="text-error text-xs mt-1.5">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5"><FaPhone className="inline mr-1.5 text-gold" size={12} />Phone</label>
                    <input {...register('phone', { required: 'Phone is required' })} className="input-field" />
                    {errors.phone && <p className="text-error text-xs mt-1.5">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5"><FaEnvelope className="inline mr-1.5 text-gold" size={12} />Email</label>
                  <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} className="input-field" />
                  {errors.email && <p className="text-error text-xs mt-1.5">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5"><FaGavel className="inline mr-1.5 text-gold" size={12} />Practice Area</label>
                  <select {...register('practiceArea', { required: 'Select a practice area' })} className="input-field">
                    <option value="">Select Practice Area</option>
                    {practiceAreas.map((area) => <option key={area} value={area}>{area}</option>)}
                  </select>
                  {errors.practiceArea && <p className="text-error text-xs mt-1.5">{errors.practiceArea.message}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5"><FaCalendarAlt className="inline mr-1.5 text-gold" size={12} />Preferred Date</label>
                    <input type="date" {...register('date', { required: 'Date is required' })} className="input-field" />
                    {errors.date && <p className="text-error text-xs mt-1.5">{errors.date.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5"><FaClock className="inline mr-1.5 text-gold" size={12} />Preferred Time</label>
                    <select {...register('time', { required: 'Time is required' })} className="input-field">
                      <option value="">Select Time</option>
                      {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.time && <p className="text-error text-xs mt-1.5">{errors.time.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5"><FaComment className="inline mr-1.5 text-gold" size={12} />Message (Optional)</label>
                  <textarea {...register('message')} rows={3} className="input-field resize-none" />
                </div>
                <ButtonRipple type="submit" disabled={isSubmitting} className="gold-btn text-white w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-lg shadow-lg shadow-gold/20">
                  <FaPaperPlane size={14} /> {isSubmitting ? 'Booking...' : 'Book Appointment'}
                </ButtonRipple>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
};

export default Appointment;
