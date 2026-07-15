import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaPlus, FaEdit, FaTrash, FaTimes, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import API from '../../utils/axios';
import toast from 'react-hot-toast';

const emptyBlog = { title: '', slug: '', excerpt: '', content: '', image: '', category: '', tags: '', author: 'Admin', isPublished: true };

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyBlog);
  const [saving, setSaving] = useState(false);
  const perPage = 10;

  const fetchData = async () => {
    try {
      const { data } = await API.get('/blogs?all=true&limit=100');
      setBlogs(data.blogs);
    } catch { toast.error('Failed to load blogs'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setForm(emptyBlog); setModal('create'); };
  const openEdit = (blog) => { setForm({ ...blog, tags: blog.tags?.join(', ') || '' }); setModal('edit'); };

  const handleSave = async () => {
    if (!form.title || !form.content) { toast.error('Title and content are required'); return; }
    setSaving(true);
    try {
      const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const payload = { ...form, slug, tags: form.tags ? form.tags.split(',').map(s => s.trim()).filter(Boolean) : [] };
      if (modal === 'create') {
        const { data } = await API.post('/blogs', payload);
        setBlogs(prev => [data.blog, ...prev]);
        toast.success('Blog created');
      } else {
        const { data } = await API.put(`/blogs/${form._id}`, payload);
        setBlogs(prev => prev.map(b => b._id === form._id ? data.blog : b));
        toast.success('Blog updated');
      }
      setModal(null);
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    try {
      await API.delete(`/blogs/${id}`);
      setBlogs(prev => prev.filter(b => b._id !== id));
      toast.success('Blog deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const filtered = blogs.filter(b => b.title?.toLowerCase().includes(search.toLowerCase()) || b.category?.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const inputClass = "w-full px-3 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 text-navy";

  if (loading) return <div className="text-center py-12 text-text-secondary">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-playfair font-bold text-navy">Blogs</h2>
        <button onClick={openCreate} className="gold-btn text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"><FaPlus size={12} /> Add Blog</button>
      </div>
      <div className="relative w-full sm:w-64 mb-6">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
        <input type="text" placeholder="Search..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-border text-center">
          <FaNewspaper size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-text-secondary">No blogs found</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-3xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-navy">Title</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden lg:table-cell">Author</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy hidden lg:table-cell">Views</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy">Status</th>
                    <th className="text-right px-4 py-3 font-semibold text-navy">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(blog => (
                    <tr key={blog._id} className="border-b border-border last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3"><p className="font-medium text-navy line-clamp-1">{blog.title}</p></td>
                      <td className="px-4 py-3 hidden md:table-cell"><span className="text-xs bg-gray-100 text-text-secondary px-2 py-1 rounded">{blog.category}</span></td>
                      <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">{blog.author}</td>
                      <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">{blog.views || 0}</td>
                      <td className="px-4 py-3"><span className={`text-xs font-medium px-2 py-1 rounded-lg ${blog.isPublished ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-600'}`}>{blog.isPublished ? 'Published' : 'Draft'}</span></td>
                      <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(blog)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><FaEdit size={14} /></button>
                        <button onClick={() => handleDelete(blog._id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><FaTrash size={14} /></button>
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
          <div className="bg-white rounded-3xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-playfair font-bold text-navy">{modal === 'create' ? 'Add Blog' : 'Edit Blog'}</h3>
              <button onClick={() => setModal(null)} className="p-1.5 text-gray-400 hover:text-navy"><FaTimes size={18} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs text-text-secondary mb-1">Title *</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value, slug: modal === 'create' ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : p.slug }))} className={inputClass} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-text-secondary mb-1">Slug</label><input value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} className={inputClass} /></div>
                <div><label className="block text-xs text-text-secondary mb-1">Category *</label><input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className={inputClass} /></div>
              </div>
              <div><label className="block text-xs text-text-secondary mb-1">Excerpt</label><textarea rows={2} value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} className={inputClass} /></div>
              <div><label className="block text-xs text-text-secondary mb-1">Content *</label><textarea rows={6} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} className={inputClass} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-text-secondary mb-1">Image URL</label><input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} className={inputClass} /></div>
                <div><label className="block text-xs text-text-secondary mb-1">Author</label><input value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} className={inputClass} /></div>
              </div>
              <div><label className="block text-xs text-text-secondary mb-1">Tags (comma separated)</label><input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} className={inputClass} /></div>
              <div><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isPublished} onChange={e => setForm(p => ({ ...p, isPublished: e.target.checked }))} className="accent-gold" /><span className="text-sm text-navy">Published</span></label></div>
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

export default ManageBlogs;
