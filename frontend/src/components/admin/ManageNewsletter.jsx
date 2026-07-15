import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaTrash, FaTimes, FaSearch, FaChevronLeft, FaChevronRight, FaDownload } from 'react-icons/fa';
import API from '../../utils/axios';
import toast from 'react-hot-toast';

const ManageNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 15;

  const fetchData = async () => {
    try {
      const { data } = await API.get('/newsletter');
      setSubscribers(data.subscribers);
    } catch { toast.error('Failed to load subscribers'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this subscriber?')) return;
    try {
      await API.delete(`/newsletter/${id}`);
      setSubscribers(prev => prev.filter(s => s._id !== id));
      toast.success('Subscriber removed');
    } catch { toast.error('Failed to remove'); }
  };

  const exportCSV = () => {
    const csv = 'Email,Date Subscribed\n' + filtered.map(s => `"${s.email}","${new Date(s.createdAt).toLocaleDateString()}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'newsletter-subscribers.csv'; a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported');
  };

  const filtered = subscribers.filter(s => s.email?.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  if (loading) return <div className="text-center py-12 text-text-secondary">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-playfair font-bold text-navy">Newsletter Subscribers ({filtered.length})</h2>
        <div className="flex items-center gap-3">
          <button onClick={exportCSV} className="px-4 py-2 border border-border rounded-xl text-sm text-text-secondary hover:bg-gray-50 flex items-center gap-2"><FaDownload size={12} /> Export CSV</button>
          <div className="relative w-full sm:w-56">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input type="text" placeholder="Search email..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-border text-center">
          <FaPaperPlane size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-text-secondary">No subscribers found</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-3xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-navy">Email</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden md:table-cell">Subscribed</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden lg:table-cell">Status</th>
                    <th className="text-right px-4 py-3 font-semibold text-navy">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(s => (
                    <tr key={s._id} className="border-b border-border last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3"><p className="text-navy font-medium">{s.email}</p></td>
                      <td className="px-4 py-3 text-text-secondary hidden md:table-cell">{new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td className="px-4 py-3 hidden lg:table-cell"><span className={`text-xs font-medium px-2 py-1 rounded-lg ${s.isActive !== false ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{s.isActive !== false ? 'Active' : 'Inactive'}</span></td>
                      <td className="px-4 py-3 text-right"><button onClick={() => handleDelete(s._id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg" title="Remove"><FaTrash size={14} /></button></td>
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
    </motion.div>
  );
};

export default ManageNewsletter;
