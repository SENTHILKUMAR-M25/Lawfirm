import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarAlt, FaEnvelope, FaUserTie, FaGavel, FaStar, FaImage, FaSignOutAlt, FaNewspaper, FaChartBar, FaPaperPlane, FaBars } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/axios';
import toast from 'react-hot-toast';

import ManageAppointments from '../../components/admin/ManageAppointments';
import ManageClients from '../../components/admin/ManageClients';
import ManageLawyers from '../../components/admin/ManageLawyers';
import ManagePracticeAreas from '../../components/admin/ManagePracticeAreas';
import ManageBlogs from '../../components/admin/ManageBlogs';
import ManageTestimonials from '../../components/admin/ManageTestimonials';
import ManageMessages from '../../components/admin/ManageMessages';
import ManageGallery from '../../components/admin/ManageGallery';
import ManageNewsletter from '../../components/admin/ManageNewsletter';

const adminTabs = [
  { id: 'overview', label: 'Overview', icon: FaChartBar },
  { id: 'appointments', label: 'Appointments', icon: FaCalendarAlt },
  { id: 'clients', label: 'Clients', icon: FaUsers },
  { id: 'lawyers', label: 'Lawyers', icon: FaUserTie },
  { id: 'practice-areas', label: 'Practice Areas', icon: FaGavel },
  { id: 'blogs', label: 'Blogs', icon: FaNewspaper },
  { id: 'testimonials', label: 'Testimonials', icon: FaStar },
  { id: 'contacts', label: 'Messages', icon: FaEnvelope },
  { id: 'gallery', label: 'Gallery', icon: FaImage },
  { id: 'newsletter', label: 'Newsletter', icon: FaPaperPlane },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/login'); return; }
    window.scrollTo(0, 0);
    API.get('/dashboard/stats').then(({ data }) => setStats(data.stats || {})).catch(() => {});
  }, [user?._id, navigate]);

  const handleLogout = () => { logout(); navigate('/'); toast.success('Logged out successfully.'); };

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers || 0, icon: FaUsers, color: 'from-blue-500 to-blue-600' },
    { label: 'Appointments', value: stats.totalAppointments || 0, icon: FaCalendarAlt, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Lawyers', value: stats.totalLawyers || 0, icon: FaUserTie, color: 'from-purple-500 to-purple-600' },
    { label: 'Blogs', value: stats.totalBlogs || 0, icon: FaNewspaper, color: 'from-orange-500 to-orange-600' },
    { label: 'Testimonials', value: stats.totalTestimonials || 0, icon: FaStar, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Messages', value: stats.totalContacts || 0, icon: FaEnvelope, color: 'from-red-500 to-red-600' },
    { label: 'Practice Areas', value: stats.totalAreas || 0, icon: FaGavel, color: 'from-indigo-500 to-indigo-600' },
    { label: 'Subscribers', value: stats.totalSubscribers || 0, icon: FaPaperPlane, color: 'from-teal-500 to-teal-600' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return null;
      case 'appointments': return <ManageAppointments />;
      case 'clients': return <ManageClients />;
      case 'lawyers': return <ManageLawyers />;
      case 'practice-areas': return <ManagePracticeAreas />;
      case 'blogs': return <ManageBlogs />;
      case 'testimonials': return <ManageTestimonials />;
      case 'contacts': return <ManageMessages />;
      case 'gallery': return <ManageGallery />;
      case 'newsletter': return <ManageNewsletter />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-cream">
      <div className={`fixed inset-0 bg-navy/50 z-40 lg:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setSidebarOpen(false)} />

      <aside className={`fixed lg:sticky top-0 inset-y-0 left-0 z-50 w-64 bg-navy transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 pt-8 h-full flex flex-col">
          <Link to="/" className="flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center text-white font-playfair font-bold shadow-lg shadow-gold/20">L</div>
            <div>
              <h3 className="text-white font-playfair font-bold text-sm">Law Firm</h3>
              <p className="text-gold text-[9px] tracking-[3px] uppercase">Admin Panel</p>
            </div>
          </Link>
          <nav className="space-y-1 flex-1">
            {adminTabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id ? 'gold-btn text-white shadow-lg shadow-gold/20' : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} /> {tab.label}
                </button>
              );
            })}
          </nav>
          <div className="pt-6 border-t border-white/10">
            <button onClick={handleLogout} className="flex items-center gap-3 text-white/40 hover:text-red-400 text-sm transition-colors duration-300 px-4 py-2 w-full">
              <FaSignOutAlt size={16} /> Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="bg-navy px-4 py-4 lg:hidden sticky top-0 z-30 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-white"><FaBars size={20} /></button>
          <span className="text-white font-playfair font-bold text-sm">Admin Panel</span>
          <button onClick={handleLogout} className="text-white/40 hover:text-gold transition-colors"><FaSignOutAlt size={18} /></button>
        </div>

        <div className="p-4 lg:p-8 pt-20 lg:pt-8">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl font-playfair font-bold text-navy mb-8">Dashboard Overview</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-border hover:shadow-md transition-shadow">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                        <Icon size={18} />
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold text-navy">{card.value}</div>
                      <p className="text-text-secondary text-sm mt-1">{card.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-border">
                  <h3 className="text-lg font-playfair font-bold text-navy mb-4">Recent Appointments</h3>
                  {(stats.recentAppointments || []).length === 0 ? (
                    <p className="text-text-secondary text-sm py-8 text-center">No recent appointments</p>
                  ) : (
                    <div className="space-y-3">
                      {stats.recentAppointments?.map((apt) => (
                        <div key={apt._id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                          <div>
                            <p className="text-navy font-medium text-sm">{apt.name}</p>
                            <p className="text-text-secondary text-xs">{apt.practiceArea} &mdash; {new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                          </div>
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                            apt.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                            apt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' :
                            'bg-gray-50 text-gray-600'
                          }`}>
                            {apt.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-3xl p-6 border border-border">
                  <h3 className="text-lg font-playfair font-bold text-navy mb-4">Recent Messages</h3>
                  {(stats.recentContacts || []).length === 0 ? (
                    <p className="text-text-secondary text-sm py-8 text-center">No recent messages</p>
                  ) : (
                    <div className="space-y-3">
                      {stats.recentContacts?.map((c) => (
                        <div key={c._id} className="py-3 border-b border-border last:border-0">
                          <p className="text-navy font-medium text-sm">{c.name} &mdash; {c.subject}</p>
                          <p className="text-text-secondary text-xs truncate">{c.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab !== 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {renderContent()}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
