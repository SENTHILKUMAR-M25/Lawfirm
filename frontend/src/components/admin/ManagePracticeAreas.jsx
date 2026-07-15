import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGavel, FaPlus, FaEdit, FaTrash, FaTimes, FaSearch } from 'react-icons/fa';
import API from '../../utils/axios';
import toast from 'react-hot-toast';

const emptyArea = { title: '', slug: '', description: '', icon: 'FaGavel', image: '', content: '', isActive: true, order: 0 };

const ManagePracticeAreas = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyArea);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await API.get('/practice-areas?all=true');
      setAreas(data.areas);
    } catch { toast.error('Failed to load practice areas'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setForm(emptyArea); setModal('create'); };
  const openEdit = (area) => { setForm(area); setModal('edit'); };

  const handleSave = async () => {
    if (!form.title || !form.description) { toast.error('Title and description are required'); return; }
    setSaving(true);
    try {
      const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const payload = { ...form, slug };
      if (modal === 'create') {
        const { data } = await API.post('/practice-areas', payload);
        setAreas(prev => [data.area, ...prev]);
        toast.success('Practice area created');
      } else {
        const { data } = await API.put(`/practice-areas/${form._id}`, payload);
        setAreas(prev => prev.map(a => a._id === form._id ? data.area : a));
        toast.success('Practice area updated');
      }
      setModal(null);
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this practice area?')) return;
    try {
      await API.delete(`/practice-areas/${id}`);
      setAreas(prev => prev.filter(a => a._id !== id));
      toast.success('Practice area deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const filtered = areas.filter(a => a.title?.toLowerCase().includes(search.toLowerCase()));
  const inputClass = "w-full px-3 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 text-navy";

  if (loading) return <div className="text-center py-12 text-text-secondary">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-playfair font-bold text-navy">Practice Areas</h2>
        <button onClick={openCreate} className="gold-btn text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"><FaPlus size={12} /> Add Practice Area</button>
      </div>
      <div className="relative w-full sm:w-64 mb-6">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
        <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-border text-center">
          <FaGavel size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-text-secondary">No practice areas found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map(area => (
            <div key={area._id} className="bg-white rounded-2xl p-5 border border-border flex items-start justify-between hover:shadow-md transition-shadow">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-playfair font-bold text-navy">{area.title}</h4>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${area.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{area.isActive ? 'Active' : 'Inactive'}</span>
                </div>
                <p className="text-sm text-text-secondary line-clamp-2">{area.description}</p>
                {area.slug && <p className="text-xs text-gray-400 mt-1">/{area.slug}</p>}
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <button onClick={() => openEdit(area)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><FaEdit size={14} /></button>
                <button onClick={() => handleDelete(area._id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><FaTrash size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50" onClick={() => setModal(null)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-playfair font-bold text-navy">{modal === 'create' ? 'Add Practice Area' : 'Edit Practice Area'}</h3>
              <button onClick={() => setModal(null)} className="p-1.5 text-gray-400 hover:text-navy"><FaTimes size={18} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs text-text-secondary mb-1">Title *</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value, slug: modal === 'create' ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : p.slug }))} className={inputClass} /></div>
              <div><label className="block text-xs text-text-secondary mb-1">Slug</label><input value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} className={inputClass} /></div>
              <div><label className="block text-xs text-text-secondary mb-1">Description *</label><textarea rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className={inputClass} /></div>
              <div><label className="block text-xs text-text-secondary mb-1">Icon (React Icon name)</label><input value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} className={inputClass} /></div>
              <div><label className="block text-xs text-text-secondary mb-1">Image URL</label><input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} className={inputClass} /></div>
              <div><label className="block text-xs text-text-secondary mb-1">Content</label><textarea rows={4} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} className={inputClass} /></div>
              <div className="grid grid-cols-2 gap-4">
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

export default ManagePracticeAreas;
