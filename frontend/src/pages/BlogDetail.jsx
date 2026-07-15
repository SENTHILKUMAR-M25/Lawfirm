import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaFolder, FaFacebookF, FaTwitter, FaLinkedinIn, FaHeart } from 'react-icons/fa';
import ScrollReveal from '../components/common/ScrollReveal';
import API from '../utils/axios';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    API.get(`/blogs/slug/${slug}`).then(({ data }) => {
      if (data.blog) setBlog(data.blog);
    }).catch(() => {
      setBlog({
        title: 'Understanding Your Legal Rights in 2024',
        content: 'In todays complex legal landscape, understanding your rights is more important than ever. This comprehensive guide explores the fundamental legal protections available to every citizen and how to exercise them effectively. Knowledge of your legal rights empowers you to make informed decisions and protect yourself in various situations. From criminal proceedings to civil matters, being aware of your entitlements can significantly impact outcomes.',
        category: 'Legal Guide',
        author: 'John Anderson',
        createdAt: '2024-10-15',
        slug: 'legal-rights-2024',
      });
    });
  }, [slug]);

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <div className="animate-spin w-10 h-10 border-2 border-gold border-t-transparent rounded-full" />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="min-h-[35vh] hero-gradient flex items-center relative overflow-hidden pt-20">
        <div className="container-max section-padding relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link to="/blogs" className="inline-flex items-center gap-2 text-gold text-sm font-semibold mb-6 hover:gap-3 transition-all">
              <FaArrowLeft size={11} /> Back to Insights
            </Link>
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">{blog.category}</span>
            <h1 className="section-title text-white mt-3 mb-4 max-w-4xl">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm">
              <span className="flex items-center gap-2"><FaUser size={11} />{blog.author}</span>
              <span className="flex items-center gap-2"><FaCalendarAlt size={11} />{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-2"><FaFolder size={11} />{blog.category}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding py-20">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="prose max-w-none">
                  {blog.content?.split('\n').map((para, i) => (
                    para.trim() && <p key={i} className="text-text-secondary leading-relaxed mb-5 text-lg">{para}</p>
                  ))}
                </div>
              </ScrollReveal>

              <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-secondary">Share:</span>
                  <div className="flex gap-2">
                    {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                      <button key={i} className="w-8 h-8 rounded-xl bg-navy/5 flex items-center justify-center text-text-secondary hover:bg-gold hover:text-white transition-all duration-300">
                        <Icon size={12} />
                      </button>
                    ))}
                  </div>
                </div>
                <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-gold transition-colors duration-300">
                  <FaHeart size={14} /> Like ({blog.likes || 0})
                </button>
              </div>
            </div>

            <div>
              <div className="sticky top-28 space-y-6">
                <div className="premium-card p-6">
                  <h3 className="text-lg font-playfair font-bold text-navy mb-4">Categories</h3>
                  <div className="space-y-2">
                    {['Legal Guide', 'Corporate Law', 'Criminal Law', 'Family Law', 'Legal Tips'].map((cat, i) => (
                      <Link key={i} to="/blogs" className="block text-sm text-text-secondary hover:text-gold transition-colors py-1.5 gold-underline">{cat}</Link>
                    ))}
                  </div>
                </div>
                <div className="premium-card p-6">
                  <h3 className="text-lg font-playfair font-bold text-navy mb-4">Need Legal Help?</h3>
                  <p className="text-sm text-text-secondary mb-4">Schedule a consultation with our expert attorneys.</p>
                  <Link to="/appointment" className="gold-btn text-white w-full py-2.5 rounded-xl text-center block text-sm font-semibold shadow-lg shadow-gold/20">Book Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogDetail;
