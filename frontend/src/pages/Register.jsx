import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import ButtonRipple from '../components/common/ButtonRipple';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register: signUp, user } = useAuth();
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => { window.scrollTo(0, 0); if (user) navigate('/'); }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      await signUp(data);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch { toast.error('Registration failed. Please try again.'); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen hero-gradient flex items-center justify-center section-padding relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.06),transparent_50%)]" />
      <div className="relative z-10 w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/" className="flex items-center justify-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center text-white font-playfair font-bold text-xl shadow-lg shadow-gold/20">L</div>
            <span className="text-white font-playfair font-bold text-xl">Law Firm</span>
          </Link>
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl">
            <h2 className="text-2xl font-playfair font-bold text-navy mb-2">Create Account</h2>
            <p className="text-text-secondary text-sm mb-8">Join us to manage your legal matters.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5"><FaUser className="inline mr-1.5 text-gold" size={12} />Full Name</label>
                <input {...register('name', { required: 'Name is required' })} className="input-field" />
                {errors.name && <p className="text-error text-xs mt-1.5">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5"><FaPhone className="inline mr-1.5 text-gold" size={12} />Phone</label>
                <input {...register('phone')} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5"><FaEnvelope className="inline mr-1.5 text-gold" size={12} />Email</label>
                <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} className="input-field" />
                {errors.email && <p className="text-error text-xs mt-1.5">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5"><FaLock className="inline mr-1.5 text-gold" size={12} />Password</label>
                <div className="relative">
                  <input type={showPwd ? 'text' : 'password'} {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })} className="input-field pr-12" />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-gold transition-colors">
                    {showPwd ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-error text-xs mt-1.5">{errors.password.message}</p>}
              </div>
              <ButtonRipple type="submit" disabled={isSubmitting} className="gold-btn text-white w-full py-3.5 rounded-xl font-semibold shadow-lg shadow-gold/20">
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </ButtonRipple>
            </form>
            <p className="text-center text-sm text-text-secondary mt-6">
              Already have an account? <Link to="/login" className="text-gold font-semibold hover:underline">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;
