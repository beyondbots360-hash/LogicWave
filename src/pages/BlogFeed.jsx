import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';

const blogs = [
  {
    title: 'How to Hire Remote Talent in India: A Complete Guide',
    excerpt: 'Hiring across borders is complex. This guide covers everything from legal compliance to cultural nuances when hiring in the Indian tech hub...',
    date: '12 May 2026',
    author: 'LogicWave Editorial',
    category: 'Remote Hiring',
    slug: 'hire-remote-talent-india-guide',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'UK vs India Payroll: Key Differences You Need to Know',
    excerpt: 'Comparing the two payroll systems can be daunting. We break down the tax structures, statutory benefits, and compliance requirements for both regions...',
    date: '08 May 2026',
    author: 'Global HR Team',
    category: 'Global Payroll',
    slug: 'uk-india-payroll-differences',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'The Future of Global HR in 2026',
    excerpt: 'Artificial intelligence and remote-first culture are reshaping the HR landscape. Discover the top trends that will define global employment this year...',
    date: '01 May 2026',
    author: 'James Wilson',
    category: 'HR Technology',
    slug: 'future-global-hr-2026',
    image: 'https://images.unsplash.com/photo-1451187534639-22c26774e230?auto=format&fit=crop&q=80&w=800'
  }
];

const BlogFeed = () => {
  return (
    <PublicLayout>
      <div className="bg-brand-slate-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-brand-text text-white py-24 px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue-50 blur-[120px] rounded-full translate-x-1/2" />
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                LogicWave Insights
              </span>
              <h1 className="font-display text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
                Expert Perspectives on <span className="text-brand-blue-500 italic">Global Scale.</span>
              </h1>
              <p className="text-xl text-brand-slate-300 font-medium leading-relaxed mb-10">
                Navigate the complexities of UK-India hiring, payroll, and compliance with our latest guides and industry research.
              </p>
              
              <div className="flex items-center gap-4 max-w-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search articles..."
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-brand-blue-500 focus:bg-white/20 transition-all text-white"
                  />
                </div>
                <button className="bg-white text-brand-text p-4 rounded-2xl hover:bg-brand-blue-500 hover:text-white transition-all">
                  <Filter size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs.map((blog, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[40px] overflow-hidden border border-brand-border group hover:shadow-2xl transition-all duration-500 flex flex-col"
                >
                  <Link to={`/blog/${blog.slug}`} className="block aspect-[16/10] overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </Link>
                  
                  <div className="p-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue-500 bg-brand-blue-50 px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-brand-muted text-[10px] font-bold uppercase tracking-widest">
                        <Calendar size={12} /> {blog.date}
                      </div>
                    </div>
                    
                    <h2 className="font-display text-2xl font-black text-brand-text mb-4 group-hover:text-brand-blue-500 transition-colors leading-tight">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h2>
                    
                    <p className="text-brand-muted text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-8 border-t border-brand-border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-slate-100 flex items-center justify-center text-brand-blue-500 font-black text-[10px]">
                          {blog.author.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-brand-text">{blog.author}</span>
                      </div>
                      <Link 
                        to={`/blog/${blog.slug}`}
                        className="text-brand-blue-500 hover:text-brand-text transition-colors"
                      >
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Newsletter CTA */}
            <div className="mt-24 bg-brand-blue-500 rounded-[48px] p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="font-display text-4xl font-black text-white mb-6">Get global expansion tips in your inbox.</h3>
                <p className="text-white/80 font-medium mb-10">Join 5,000+ HR leaders receiving our weekly UK-India compliance updates.</p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 w-full bg-white rounded-2xl py-5 px-6 text-sm font-bold text-brand-text focus:outline-none"
                  />
                  <button className="w-full sm:w-auto bg-brand-text text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default BlogFeed;
