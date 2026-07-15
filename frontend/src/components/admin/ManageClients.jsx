import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaTrash, FaEye, FaTimes, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import API from '../../utils/axios';
import toast from 'react-hot-toast';

const ManageClients = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const perPage = 10;

  const fetchData = async () => {
    try {
      const { data } = await API.get('/users?all=true');
      setUsers(data.users);
    } catch { toast.error('Failed to load users'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleToggleActive = async (id, isActive) => {
    try {
      await API.put(`/users/${id}`, { isActive });
      setUsers(prev => prev.map(u => u._id === id ? { ...u, isActive } : u));
      toast.success(isActive ? 'User activated' : 'User deactivated');
    } catch { toast.error('Failed to update user'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user? This cannot be undone.')) return;
    try {
      await API.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('User deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  if (loading) return <div className="text-center py-12 text-text-secondary">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-playfair font-bold text-navy">Clients</h2>
        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input type="text" placeholder="Search users..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-border text-center">
          <FaUsers size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-text-secondary">No users found</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-3xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-navy">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden md:table-cell">Email</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden lg:table-cell">Phone</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden lg:table-cell">Role</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy">Status</th>
                    <th className="text-right px-4 py-3 font-semibold text-navy">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(u => (
                    <tr key={u._id} className="border-b border-border last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <button onClick={() => setSelected(u)} className="text-left">
                          <p className="font-medium text-navy">{u.name}</p>
                          <p className="text-xs text-text-secondary">Joined {new Date(u.createdAt).toLocaleDateString()}</p>
                        </button>
                      </td>
                      <td className="px-4 py-3 text-text-secondary hidden md:table-cell">{u.email}</td>
                      <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">{u.phone || '—'}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className={`text-xs font-medium px-2 py-1 rounded-lg ${u.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>{u.role}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleToggleActive(u._id, !u.isActive)} className={`text-xs font-medium px-2 py-1 rounded-lg border ${u.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'}`}>{u.isActive ? 'Active' : 'Inactive'}</button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setSelected(u)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="View"><FaEye size={14} /></button>
                          {u.role !== 'admin' && <button onClick={() => handleDelete(u._id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><FaTrash size={14} /></button>}
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
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-playfair font-bold text-navy">User Details</h3>
              <button onClick={() => setSelected(null)} className="p-1.5 text-gray-400 hover:text-navy"><FaTimes size={18} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Name</p><p className="text-navy font-medium">{selected.name}</p></div>
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Email</p><p className="text-navy font-medium">{selected.email}</p></div>
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Phone</p><p className="text-navy font-medium">{selected.phone || '—'}</p></div>
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Role</p><p className="text-navy font-medium capitalize">{selected.role}</p></div>
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Address</p><p className="text-navy font-medium">{selected.address || '—'}</p></div>
                <div><p className="text-xs text-text-secondary uppercase tracking-wider">Joined</p><p className="text-navy font-medium">{new Date(selected.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ManageClients;
