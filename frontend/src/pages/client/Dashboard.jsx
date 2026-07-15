import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaFileAlt, FaEnvelope, FaGavel, FaClock, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaSignOutAlt, FaBriefcase } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/axios';
import toast from 'react-hot-toast';

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('appointments');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    window.scrollTo(0, 0);
    API.get('/appointments').then(({ data }) => setAppointments(data.appointments || [])).catch(() => {});
  }, [user?._id, navigate]);

  const handleLogout = () => { logout(); navigate('/'); toast.success('Logged out successfully.'); };

  const tabs = [
    { id: 'appointments', label: 'Appointments', icon: FaCalendarAlt },
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'documents', label: 'Documents', icon: FaFileAlt },
    { id: 'messages', label: 'Messages', icon: FaEnvelope },
  ];

  const statusConfig = {
    pending: { icon: FaHourglassHalf, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    confirmed: { icon: FaCheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    completed: { icon: FaCheckCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
    cancelled: { icon: FaTimesCircle, color: 'text-red-500', bg: 'bg-red-50' },
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-navy px-4 py-6 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-playfair font-bold text-white">Welcome, {user?.name}</h1>
              <p className="text-white/50 text-sm">Client Dashboard</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors duration-300 text-sm">
              <FaSignOutAlt size={14} /> Logout
            </button>
          </div>
          <div className="flex gap-3 mt-6 overflow-x-auto pb-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeTab === tab.id ? 'gold-btn text-white shadow-lg shadow-gold/20' : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  <Icon size={14} /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'appointments' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total', value: appointments.length, icon: FaCalendarAlt, color: 'text-navy' },
                { label: 'Pending', value: appointments.filter(a => a.status === 'pending').length, icon: FaHourglassHalf, color: 'text-yellow-500' },
                { label: 'Confirmed', value: appointments.filter(a => a.status === 'confirmed').length, icon: FaCheckCircle, color: 'text-emerald-500' },
                { label: 'Completed', value: appointments.filter(a => a.status === 'completed').length, icon: FaCheckCircle, color: 'text-blue-500' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-navy">{stat.value}</span>
                      <Icon className={stat.color} size={18} />
                    </div>
                    <p className="text-text-secondary text-sm">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-border">
              <h3 className="text-xl font-playfair font-bold text-navy mb-6">Your Appointments</h3>
              {appointments.length === 0 ? (
                <div className="text-center py-16">
                  <FaCalendarAlt className="mx-auto text-border text-5xl mb-4" />
                  <p className="text-text-secondary mb-6">No appointments yet</p>
                  <Link to="/appointment" className="gold-btn text-white px-8 py-3 rounded-xl inline-block font-semibold text-sm shadow-lg shadow-gold/20">Book an Appointment</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((apt) => {
                    const config = statusConfig[apt.status] || statusConfig.pending;
                    const StatusIcon = config.icon;
                    return (
                      <div key={apt._id} className="flex items-center justify-between p-4 rounded-2xl bg-cream">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl gold-gradient flex items-center justify-center text-white shadow-lg shadow-gold/20">
                            <FaGavel size={16} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-navy text-sm">{apt.practiceArea}</h4>
                            <p className="text-text-secondary text-xs">{new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {apt.time}</p>
                          </div>
                        </div>
                        <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg ${config.bg} ${config.color}`}>
                          <StatusIcon size={11} /> {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-border max-w-2xl">
              <h3 className="text-xl font-playfair font-bold text-navy mb-6">Profile Information</h3>
              <div className="space-y-4">
                {[
                  { label: 'Name', value: user?.name },
                  { label: 'Email', value: user?.email },
                  { label: 'Phone', value: user?.phone || 'Not provided' },
                  { label: 'Role', value: user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) },
                  { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A' },
                ].map((field, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <span className="text-text-secondary text-sm">{field.label}</span>
                    <span className="text-navy font-medium text-sm">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'documents' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-border">
              <h3 className="text-xl font-playfair font-bold text-navy mb-4">Your Documents</h3>
              <p className="text-text-secondary text-center py-16">No documents available yet.</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-border">
              <h3 className="text-xl font-playfair font-bold text-navy mb-4">Messages</h3>
              <p className="text-text-secondary text-center py-16">No messages yet.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
