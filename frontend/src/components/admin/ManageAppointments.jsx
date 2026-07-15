import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaTrash, FaEye, FaTimes, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import API from '../../utils/axios';
import toast from 'react-hot-toast';

const statusColors = {
  pending: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  confirmed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
  completed: 'bg-blue-50 text-blue-600 border-blue-200',
};

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const perPage = 10;

  const fetchData = async () => {
    try {
      const { data } = await API.get('/appointments');
      setAppointments(data.appointments);
    } catch (err) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/appointments/${id}`, { status });
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status } : a));
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
      toast.success(`Appointment ${status}`);
    } catch { toast.error('Failed to update status'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment?')) return;
    try {
      await API.delete(`/appointments/${id}`);
      setAppointments(prev => prev.filter(a => a._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Appointment deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const filtered = appointments.filter(a =>
    a.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.email?.toLowerCase().includes(search.toLowerCase()) ||
    a.practiceArea?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  if (loading) return <div className="text-center py-12 text-text-secondary">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-playfair font-bold text-navy">Appointments</h2>
        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input type="text" placeholder="Search..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-border text-center">
          <FaCalendarAlt size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-text-secondary">No appointments found</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-3xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-navy">Client</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden md:table-cell">Practice Area</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden lg:table-cell">Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden lg:table-cell">Time</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy">Status</th>
                    <th className="text-right px-4 py-3 font-semibold text-navy">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(apt => (
                    <tr key={apt._id} className="border-b border-border last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <button onClick={() => setSelected(apt)} className="text-left">
                          <p className="font-medium text-navy">{apt.name}</p>
                          <p className="text-xs text-text-secondary">{apt.email}</p>
                        </button>
                      </td>
                      <td className="px-4 py-3 text-text-secondary hidden md:table-cell">{apt.practiceArea}</td>
                      <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">{new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">{apt.time}</td>
                      <td className="px-4 py-3">
                        <select value={apt.status} onChange={e => handleStatusUpdate(apt._id, e.target.value)} className={`text-xs font-medium px-2 py-1 rounded-lg border cursor-pointer ${statusColors[apt.status] || 'bg-gray-50 text-gray-600'}`}>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setSelected(apt)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="View"><FaEye size={14} /></button>
                          <button onClick={() => handleDelete(apt._id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><FaTrash size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg border border-border hover:bg-gray-50 disabled:opacity-30"><FaChevronLeft size={12} /></button>
              <span className="text-sm text-text-secondary px-3">Page {page} of {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg border border-border hover:bg-gray-50 disabled:opacity-30"><FaChevronRight size={12} /></button>
            </div>
          )}
        </>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-playfair font-bold text-navy">Appointment Details</h3>
              <button onClick={() => setSelected(null)} className="p-1.5 text-gray-400 hover:text-navy"><FaTimes size={18} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Name</p><p className="text-navy font-medium">{selected.name}</p></div>
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Email</p><p className="text-navy font-medium">{selected.email}</p></div>
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Phone</p><p className="text-navy font-medium">{selected.phone}</p></div>
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Practice Area</p><p className="text-navy font-medium">{selected.practiceArea}</p></div>
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Date</p><p className="text-navy font-medium">{new Date(selected.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p></div>
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Time</p><p className="text-navy font-medium">{selected.time}</p></div>
              </div>
              {selected.message && (
                <div><p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Message</p><p className="text-navy bg-gray-50 rounded-xl p-3 text-sm">{selected.message}</p></div>
              )}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="flex gap-2">
                  {['pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                    <button key={s} onClick={() => handleStatusUpdate(selected._id, s)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${selected.status === s ? 'gold-btn text-white' : 'border-border text-text-secondary hover:bg-gray-50'}`}>{s}</button>
                  ))}
                </div>
                <button onClick={() => { handleDelete(selected._id); }} className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ManageAppointments;
