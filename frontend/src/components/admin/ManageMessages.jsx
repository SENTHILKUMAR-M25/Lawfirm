import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaTrash, FaEnvelopeOpen, FaTimes, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import API from '../../utils/axios';
import toast from 'react-hot-toast';

const ManageMessages = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const perPage = 10;

  const fetchData = async () => {
    try {
      const { data } = await API.get('/contacts');
      setContacts(data.contacts);
    } catch { toast.error('Failed to load messages'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleMarkRead = async (id) => {
    try {
      await API.put(`/contacts/${id}`, { isRead: true });
      setContacts(prev => prev.map(c => c._id === id ? { ...c, isRead: true } : c));
      if (selected?._id === id) setSelected(prev => ({ ...prev, isRead: true }));
    } catch { toast.error('Failed to update'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await API.delete(`/contacts/${id}`);
      setContacts(prev => prev.filter(c => c._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Message deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const filtered = contacts.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.subject?.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => (a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1));
  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  if (loading) return <div className="text-center py-12 text-text-secondary">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-playfair font-bold text-navy">Messages</h2>
        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input type="text" placeholder="Search..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-border text-center">
          <FaEnvelope size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-text-secondary">No messages found</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-3xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-navy">From</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden md:table-cell">Subject</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden lg:table-cell">Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy">Status</th>
                    <th className="text-right px-4 py-3 font-semibold text-navy">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(c => (
                    <tr key={c._id} className={`border-b border-border last:border-0 hover:bg-gray-50/50 transition-colors ${!c.isRead ? 'bg-gold/5' : ''}`}>
                      <td className="px-4 py-3">
                        <button onClick={() => { setSelected(c); if (!c.isRead) handleMarkRead(c._id); }} className="text-left">
                          <p className={`font-medium ${!c.isRead ? 'text-navy' : 'text-text-secondary'}`}>{c.name}</p>
                          <p className="text-xs text-text-secondary">{c.email}</p>
                        </button>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell"><p className={`line-clamp-1 ${!c.isRead ? 'font-medium text-navy' : 'text-text-secondary'}`}>{c.subject}</p></td>
                      <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">{new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                      <td className="px-4 py-3">{c.isRead ? <span className="text-xs text-gray-400">Read</span> : <span className="text-xs font-medium text-gold bg-gold/10 px-2 py-1 rounded-lg">New</span>}</td>
                      <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-2">
                        <button onClick={() => { setSelected(c); if (!c.isRead) handleMarkRead(c._id); }} className={`p-1.5 rounded-lg transition-colors ${!c.isRead ? 'text-gold hover:bg-gold/10' : 'text-blue-500 hover:bg-blue-50'}`} title="View"><FaEnvelopeOpen size={14} /></button>
                        <button onClick={() => handleDelete(c._id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg" title="Delete"><FaTrash size={14} /></button>
                      </div></td>
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
              <h3 className="text-lg font-playfair font-bold text-navy">Message Details</h3>
              <button onClick={() => setSelected(null)} className="p-1.5 text-gray-400 hover:text-navy"><FaTimes size={18} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Name</p><p className="text-navy font-medium">{selected.name}</p></div>
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Email</p><p className="text-navy font-medium">{selected.email}</p></div>
                {selected.phone && <div><p className="text-xs text-text-secondary uppercase tracking-wider">Phone</p><p className="text-navy font-medium">{selected.phone}</p></div>}
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Date</p><p className="text-navy font-medium">{new Date(selected.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p></div>
              </div>
              <div><p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Subject</p><p className="text-navy font-medium">{selected.subject}</p></div>
              <div><p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Message</p><p className="text-navy bg-gray-50 rounded-xl p-4 text-sm whitespace-pre-wrap">{selected.message}</p></div>
              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <button onClick={() => handleDelete(selected._id)} className="px-4 py-2 border border-red-200 text-red-500 rounded-xl text-sm hover:bg-red-50">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ManageMessages;
