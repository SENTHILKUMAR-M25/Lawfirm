import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';
import ButtonRipple from '../components/common/ButtonRipple';
import API from '../utils/axios';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const onSubmit = async (data) => {
    try {
      await API.post('/auth/forgot-password', data);
      toast.success('Reset link sent to your email.');
    } catch { toast.error('Failed to send reset email.'); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen hero-gradient flex items-center justify-center section-padding">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/login" className="inline-flex items-center gap-2 text-gold text-sm mb-10 hover:gap-3 transition-all">
            <FaArrowLeft size={11} /> Back to Login
          </Link>
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl">
            <h2 className="text-2xl font-playfair font-bold text-navy mb-2">Forgot Password?</h2>
            <p className="text-text-secondary text-sm mb-8">Enter your email and we will send you a reset link.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5"><FaEnvelope className="inline mr-1.5 text-gold" size={12} />Email</label>
                <input type="email" {...register('email', { required: 'Email is required' })} className="input-field" />
                {errors.email && <p className="text-error text-xs mt-1.5">{errors.email.message}</p>}
              </div>
              <ButtonRipple type="submit" disabled={isSubmitting} className="gold-btn text-white w-full py-3.5 rounded-xl font-semibold shadow-lg shadow-gold/20">
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </ButtonRipple>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
