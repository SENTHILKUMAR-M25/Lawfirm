import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaUser, FaFolder } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import ScrollReveal from '../common/ScrollReveal';
import API from '../../utils/axios';

const BlogsPreview = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get('/blogs?limit=3').then(({ data }) => {
      if (data.blogs?.length) setBlogs(data.blogs);
    }).catch(() => {});
  }, []);

  const defaultBlogs = [
    { title: 'Understanding Your Legal Rights in 2024', excerpt: 'A comprehensive guide to navigating the complex legal landscape and protecting your rights.', slug: 'legal-rights-2024', category: 'Legal Guide', createdAt: '2024-10-15', author: 'John Anderson' },
    { title: 'Top 5 Corporate Law Changes This Year', excerpt: 'Stay informed about the latest corporate law changes affecting your business operations.', slug: 'corporate-law-changes', category: 'Corporate Law', createdAt: '2024-10-10', author: 'Sarah Mitchell' },
    { title: 'How to Choose the Right Lawyer for Your Case', excerpt: 'Expert tips on selecting the best legal representation for your specific situation.', slug: 'choose-right-lawyer', category: 'Legal Tips', createdAt: '2024-10-05', author: 'Robert Williams' },
  ];

  const displayBlogs = blogs.length ? blogs : defaultBlogs;

  return (
    <section className="section-padding py-20 lg:py-28 bg-cream">
      <SectionTitle
        subtitle="Our Insights"
        title="Latest Articles"
        description="Stay informed with the latest legal news, insights, and expert analysis from our team."
      />
      <div className="container-max">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {displayBlogs.map((blog, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Link to={`/blog/${blog.slug || blog._id}`} className="premium-card overflow-hidden group block h-full">
                <div className="h-44 bg-navy flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.08),transparent)]" />
                  <FaFolder className="text-white/10 text-5xl" />
                </div>
                <div className="p-6 lg:p-7">
                  <span className="text-xs font-semibold text-gold uppercase tracking-wider">{blog.category}</span>
                  <h3 className="text-lg font-playfair font-bold text-navy mt-2 mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">{blog.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-2">{blog.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-text-secondary pt-4 border-t border-border">
                    <span className="flex items-center gap-1.5"><FaUser size={10} />{blog.author}</span>
                    <span className="flex items-center gap-1.5"><FaCalendarAlt size={10} />{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="text-center mt-12">
          <Link to="/blogs" className="gold-outline inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm">
            View All Articles <FaArrowRight size={13} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BlogsPreview;
