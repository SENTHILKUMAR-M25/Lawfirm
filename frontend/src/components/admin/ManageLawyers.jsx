import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaPlus, FaEdit, FaTrash, FaTimes, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import API from '../../utils/axios';
import toast from 'react-hot-toast';

const emptyLawyer = { name: '', image: '', experience: '', qualification: '', specialization: '', languages: '', about: '', email: '', phone: '', isActive: true, order: 0 };

const ManageLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyLawyer);
  const [saving, setSaving] = useState(false);
  const perPage = 10;

  const fetchData = async () => {
    try {
      const { data } = await API.get('/lawyers?all=true');
      setLawyers(data.lawyers);
    } catch { toast.error('Failed to load lawyers'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setForm(emptyLawyer); setModal('create'); };
  const openEdit = (lawyer) => { setForm({ ...lawyer, experience: String(lawyer.experience), specialization: lawyer.specialization?.join(', ') || '', languages: lawyer.languages?.join(', ') || '' }); setModal('edit'); };

  const handleSave = async () => {
    if (!form.name || !form.qualification) { toast.error('Name and qualification are required'); return; }
    setSaving(true);
    try {
      const payload = { ...form, experience: Number(form.experience), specialization: form.specialization ? form.specialization.split(',').map(s => s.trim()).filter(Boolean) : [], languages: form.languages ? form.languages.split(',').map(s => s.trim()).filter(Boolean) : [] };
      if (modal === 'create') {
        const { data } = await API.post('/lawyers', payload);
        setLawyers(prev => [data.lawyer, ...prev]);
        toast.success('Lawyer created');
      } else {
        const { data } = await API.put(`/lawyers/${form._id}`, payload);
        setLawyers(prev => prev.map(l => l._id === form._id ? data.lawyer : l));
        toast.success('Lawyer updated');
      }
      setModal(null);
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lawyer?')) return;
    try {
      await API.delete(`/lawyers/${id}`);
      setLawyers(prev => prev.filter(l => l._id !== id));
      toast.success('Lawyer deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const filtered = lawyers.filter(l => l.name?.toLowerCase().includes(search.toLowerCase()) || l.qualification?.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const inputClass = "w-full px-3 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 text-navy";

  if (loading) return <div className="text-center py-12 text-text-secondary">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-playfair font-bold text-navy">Lawyers</h2>
        <button onClick={openCreate} className="gold-btn text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"><FaPlus size={12} /> Add Lawyer</button>
      </div>
      <div className="relative w-full sm:w-64 mb-6">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
        <input type="text" placeholder="Search..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-border text-center">
          <FaUserTie size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-text-secondary">No lawyers found</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-3xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-navy">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden md:table-cell">Qualification</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden lg:table-cell">Experience</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden lg:table-cell">Specialization</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy">Status</th>
                    <th className="text-right px-4 py-3 font-semibold text-navy">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(l => (
                    <tr key={l._id} className="border-b border-border last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3"><p className="font-medium text-navy">{l.name}</p></td>
                      <td className="px-4 py-3 text-text-secondary hidden md:table-cell">{l.qualification}</td>
                      <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">{l.experience} yrs</td>
                      <td className="px-4 py-3 hidden lg:table-cell"><div className="flex flex-wrap gap-1">{l.specialization?.slice(0, 2).map((s, i) => <span key={i} className="text-xs bg-gray-100 text-text-secondary px-2 py-0.5 rounded">{s}</span>)}</div></td>
                      <td className="px-4 py-3"><span className={`text-xs font-medium px-2 py-1 rounded-lg ${l.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{l.isActive ? 'Active' : 'Inactive'}</span></td>
                      <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(l)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><FaEdit size={14} /></button>
                        <button onClick={() => handleDelete(l._id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><FaTrash size={14} /></button>
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

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50" onClick={() => setModal(null)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-playfair font-bold text-navy">{modal === 'create' ? 'Add Lawyer' : 'Edit Lawyer'}</h3>
              <button onClick={() => setModal(null)} className="p-1.5 text-gray-400 hover:text-navy"><FaTimes size={18} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="block text-xs text-text-secondary mb-1">Name *</label><input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inputClass} /></div>
                <div><label className="block text-xs text-text-secondary mb-1">Qualification *</label><input value={form.qualification} onChange={e => setForm(p => ({ ...p, qualification: e.target.value }))} className={inputClass} /></div>
                <div><label className="block text-xs text-text-secondary mb-1">Experience (years)</label><input type="number" value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))} className={inputClass} /></div>
                <div><label className="block text-xs text-text-secondary mb-1">Email</label><input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className={inputClass} /></div>
                <div><label className="block text-xs text-text-secondary mb-1">Phone</label><input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className={inputClass} /></div>
                <div className="col-span-2"><label className="block text-xs text-text-secondary mb-1">Specialization (comma separated)</label><input value={form.specialization} onChange={e => setForm(p => ({ ...p, specialization: e.target.value }))} className={inputClass} /></div>
                <div className="col-span-2"><label className="block text-xs text-text-secondary mb-1">Languages (comma separated)</label><input value={form.languages} onChange={e => setForm(p => ({ ...p, languages: e.target.value }))} className={inputClass} /></div>
                <div className="col-span-2"><label className="block text-xs text-text-secondary mb-1">About</label><textarea rows={3} value={form.about} onChange={e => setForm(p => ({ ...p, about: e.target.value }))} className={inputClass} /></div>
                <div className="col-span-2"><label className="block text-xs text-text-secondary mb-1">Image URL</label><input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} className={inputClass} /></div>
                <div><label className="block text-xs text-text-secondary mb-1">Order</label><input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: Number(e.target.value) }))} className={inputClass} /></div>
                <div className="flex items-end"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} className="accent-gold" /><span className="text-sm text-navy">Active</span></label></div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button onClick={() => setModal(null)} className="px-4 py-2 border border-border rounded-xl text-sm text-text-secondary hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="gold-btn text-white px-6 py-2 rounded-xl text-sm font-semibold disabled:opacity-50">{saving ? 'Saving...' : (modal === 'create' ? 'Create' : 'Update')}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ManageLawyers;
