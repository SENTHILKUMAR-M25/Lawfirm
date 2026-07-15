import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaPlus, FaEdit, FaTrash, FaTimes, FaSearch } from 'react-icons/fa';
import API from '../../utils/axios';
import toast from 'react-hot-toast';

const emptyTestimonial = { name: '', role: 'Client', image: '', rating: 5, content: '', isActive: true, order: 0 };

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyTestimonial);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await API.get('/testimonials?all=true');
      setTestimonials(data.testimonials);
    } catch { toast.error('Failed to load testimonials'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setForm(emptyTestimonial); setModal('create'); };
  const openEdit = (t) => { setForm(t); setModal('edit'); };

  const handleSave = async () => {
    if (!form.name || !form.content) { toast.error('Name and content are required'); return; }
    setSaving(true);
    try {
      if (modal === 'create') {
        const { data } = await API.post('/testimonials', form);
        setTestimonials(prev => [data.testimonial, ...prev]);
        toast.success('Testimonial created');
      } else {
        const { data } = await API.put(`/testimonials/${form._id}`, form);
        setTestimonials(prev => prev.map(t => t._id === form._id ? data.testimonial : t));
        toast.success('Testimonial updated');
      }
      setModal(null);
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await API.delete(`/testimonials/${id}`);
      setTestimonials(prev => prev.filter(t => t._id !== id));
      toast.success('Testimonial deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const filtered = testimonials.filter(t => t.name?.toLowerCase().includes(search.toLowerCase()));

  const inputClass = "w-full px-3 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 text-navy";

  if (loading) return <div className="text-center py-12 text-text-secondary">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-playfair font-bold text-navy">Testimonials</h2>
        <button onClick={openCreate} className="gold-btn text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"><FaPlus size={12} /> Add Testimonial</button>
      </div>
      <div className="relative w-full sm:w-64 mb-6">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
        <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-border text-center">
          <FaStar size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-text-secondary">No testimonials found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map(t => (
            <div key={t._id} className="bg-white rounded-2xl p-5 border border-border flex items-start justify-between hover:shadow-md transition-shadow">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-playfair font-bold text-navy">{t.name}</h4>
                  <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => <FaStar key={i} size={12} className={i < t.rating ? 'text-gold' : 'text-gray-200'} />)}</div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${t.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{t.isActive ? 'Active' : 'Inactive'}</span>
                </div>
                <p className="text-sm text-text-secondary line-clamp-2">{t.content}</p>
                <p className="text-xs text-gray-400 mt-1">{t.role}</p>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <button onClick={() => openEdit(t)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><FaEdit size={14} /></button>
                <button onClick={() => handleDelete(t._id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><FaTrash size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50" onClick={() => setModal(null)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-playfair font-bold text-navy">{modal === 'create' ? 'Add Testimonial' : 'Edit Testimonial'}</h3>
              <button onClick={() => setModal(null)} className="p-1.5 text-gray-400 hover:text-navy"><FaTimes size={18} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-text-secondary mb-1">Name *</label><input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inputClass} /></div>
                <div><label className="block text-xs text-text-secondary mb-1">Role</label><input value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} className={inputClass} /></div>
              </div>
              <div><label className="block text-xs text-text-secondary mb-1">Content *</label><textarea rows={3} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} className={inputClass} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-text-secondary mb-1">Rating (1-5)</label><input type="number" min={1} max={5} value={form.rating} onChange={e => setForm(p => ({ ...p, rating: Number(e.target.value) }))} className={inputClass} /></div>
                <div><label className="block text-xs text-text-secondary mb-1">Order</label><input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: Number(e.target.value) }))} className={inputClass} /></div>
              </div>
              <div><label className="block text-xs text-text-secondary mb-1">Image URL</label><input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} className={inputClass} /></div>
              <div><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} className="accent-gold" /><span className="text-sm text-navy">Active</span></label></div>
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

export default ManageTestimonials;
