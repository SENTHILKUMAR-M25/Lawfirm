import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaImage, FaPlus, FaTrash, FaTimes, FaSearch } from 'react-icons/fa';
import API from '../../utils/axios';
import toast from 'react-hot-toast';

const emptyItem = { title: '', image: '', category: 'office', isActive: true };

const ManageGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyItem);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await API.get('/gallery?all=true');
      setItems(data.gallery);
    } catch { toast.error('Failed to load gallery'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setForm(emptyItem); setModal('create'); };

  const handleSave = async () => {
    if (!form.image) { toast.error('Image URL is required'); return; }
    setSaving(true);
    try {
      const { data } = await API.post('/gallery', form);
      setItems(prev => [data.gallery, ...prev]);
      toast.success('Gallery item created');
      setModal(null);
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return;
    try {
      await API.delete(`/gallery/${id}`);
      setItems(prev => prev.filter(item => item._id !== id));
      toast.success('Gallery item deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const filtered = items.filter(item =>
    item.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.category?.toLowerCase().includes(search.toLowerCase())
  );

  const inputClass = "w-full px-3 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 text-navy";

  if (loading) return <div className="text-center py-12 text-text-secondary">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-playfair font-bold text-navy">Gallery</h2>
        <button onClick={openCreate} className="gold-btn text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"><FaPlus size={12} /> Add Image</button>
      </div>
      <div className="relative w-full sm:w-64 mb-6">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
        <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-border text-center">
          <FaImage size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-text-secondary">No gallery items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(item => (
            <div key={item._id} className="bg-white rounded-2xl border border-border overflow-hidden group hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                {item.image ? <img src={item.image} alt={item.title || 'Gallery'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="flex items-center justify-center h-full text-gray-300"><FaImage size={32} /></div>}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleDelete(item._id)} className="p-1.5 bg-white/90 backdrop-blur rounded-lg text-red-400 hover:bg-red-50 shadow"><FaTrash size={12} /></button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-navy truncate">{item.title || 'Untitled'}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400 capitalize">{item.category}</span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${item.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{item.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50" onClick={() => setModal(null)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-playfair font-bold text-navy">Add Gallery Image</h3>
              <button onClick={() => setModal(null)} className="p-1.5 text-gray-400 hover:text-navy"><FaTimes size={18} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs text-text-secondary mb-1">Title</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className={inputClass} /></div>
              <div><label className="block text-xs text-text-secondary mb-1">Image URL *</label><input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} className={inputClass} /></div>
              {form.image && <img src={form.image} alt="Preview" className="w-full h-40 object-cover rounded-xl" onError={e => { e.target.style.display = 'none'; }} />}
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-text-secondary mb-1">Category</label><select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className={inputClass}><option value="office">Office</option><option value="team">Team</option><option value="event">Event</option><option value="court">Court</option><option value="other">Other</option></select></div>
                <div className="flex items-end"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} className="accent-gold" /><span className="text-sm text-navy">Active</span></label></div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button onClick={() => setModal(null)} className="px-4 py-2 border border-border rounded-xl text-sm text-text-secondary hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="gold-btn text-white px-6 py-2 rounded-xl text-sm font-semibold disabled:opacity-50">{saving ? 'Saving...' : 'Add Image'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ManageGallery;
