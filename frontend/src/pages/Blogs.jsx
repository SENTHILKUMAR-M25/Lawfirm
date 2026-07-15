import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaUser, FaFolder } from 'react-icons/fa';
import ScrollReveal from '../components/common/ScrollReveal';
import API from '../utils/axios';

const categories = ['All', 'Legal Guide', 'Corporate Law', 'Criminal Law', 'Family Law', 'Property Law', 'Legal Tips'];

const defaultBlogs = [
  { title: 'Understanding Your Legal Rights in 2024', excerpt: 'A comprehensive guide to navigating the complex legal landscape and protecting your rights.', slug: 'legal-rights-2024', category: 'Legal Guide', createdAt: '2024-10-15', author: 'John Anderson' },
  { title: 'Top 5 Corporate Law Changes This Year', excerpt: 'Stay informed about the latest corporate law changes affecting your business operations.', slug: 'corporate-law-changes', category: 'Corporate Law', createdAt: '2024-10-10', author: 'Sarah Mitchell' },
  { title: 'How to Choose the Right Lawyer for Your Case', excerpt: 'Expert tips on selecting the best legal representation for your specific situation.', slug: 'choose-right-lawyer', category: 'Legal Tips', createdAt: '2024-10-05', author: 'Robert Williams' },
];

const Blogs = () => {
  const [blogs, setBlogs] = useState(defaultBlogs);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  useEffect(() => {
    const params = { page, limit: 9 };
    if (category !== 'All') params.category = category;
    if (search) params.search = search;
    API.get('/blogs', { params }).then(({ data }) => {
      if (data.blogs?.length) { setBlogs(data.blogs); setTotalPages(data.pages || 1); }
    }).catch(() => {});
  }, [category, page, search]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="min-h-[45vh] hero-gradient flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.08),transparent_50%)]" />
        <div className="container-max section-padding relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-gold text-sm font-semibold tracking-[4px] uppercase">Our Insights</span>
            <h1 className="section-title text-white mt-4 mb-6">Legal Insights</h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">Expert legal analysis, updates, and guidance from our team.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding py-20">
        <div className="container-max">
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="input-field pl-11"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    category === cat ? 'gold-btn text-white shadow-lg shadow-gold/20' : 'bg-white border border-border text-text-secondary hover:border-gold'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map((blog, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <Link to={`/blog/${blog.slug || blog._id}`} className="premium-card overflow-hidden group block h-full">
                  <div className="h-44 bg-navy flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.08),transparent)]" />
                    <FaFolder className="text-white/10 text-5xl" />
                  </div>
                  <div className="p-6 lg:p-7">
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider">{blog.category}</span>
                    <h3 className="text-lg font-playfair font-bold text-navy mt-2 mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">{blog.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-3">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-text-secondary pt-4 border-t border-border">
                      <span className="flex items-center gap-1.5"><FaUser size={10} />{blog.author}</span>
                      <span className="flex items-center gap-1.5"><FaCalendarAlt size={10} />{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    page === i + 1 ? 'gold-btn text-white shadow-lg shadow-gold/20' : 'bg-white border border-border text-text-secondary hover:border-gold'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Blogs;
