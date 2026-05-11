import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Calendar, User, ArrowUpRight, 
  MessageSquare, Bookmark, Link as LinkIcon 
} from 'lucide-react';
import PublicLayout from '../components/layout/PublicLayout';

const blogs = {
  'hire-remote-talent-india-guide': {
    title: 'How to Hire Remote Talent in India: A Complete Guide',
    date: '12 May 2026',
    author: 'LogicWave Editorial',
    category: 'Remote Hiring',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>Why India is the Global Tech Hub of 2026</h2>
      <p>In the rapidly evolving landscape of global employment, India remains the premier destination for remote technical talent. With a workforce that is not only highly skilled but also proficient in English and accustomed to global working standards, it's no surprise that UK-based companies are increasingly looking East.</p>
      
      <p>However, hiring in India isn't just about finding the right developer. It's about navigating a complex legal and regulatory environment that includes everything from Permanent Account Numbers (PAN) to Goods and Services Tax (GST) compliance.</p>

      <h2>The Legal Landscape: Employer of Record (EOR)</h2>
      <p>For most UK businesses, setting up a local legal entity in India is prohibitive. This is where the Employer of Record model becomes essential. An EOR allows you to hire talent legally without the overhead of a subsidiary, handling all local tax withholdings and benefits compliance.</p>

      <blockquote>
        "The key to successful remote hiring in India is local compliance. If you get the contracts and tax filings right from day one, you build trust with your workforce that pays dividends in retention."
      </blockquote>

      <h2>Managing Cultural Integration</h2>
      <p>Remote work across a 4.5 or 5.5-hour time difference (depending on DST) requires intentional communication. Successful teams often adopt an 'overlap' period where critical meetings happen, while leaving the rest of the day for deep, focused work.</p>
    `
  },
  'uk-india-payroll-differences': {
    title: 'UK vs India Payroll: Key Differences You Need to Know',
    date: '08 May 2026',
    author: 'Global HR Team',
    category: 'Global Payroll',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>Decoding the Pay Stub</h2>
      <p>When a UK company hires in India, the first point of confusion is often the structure of the salary. In the UK, we're used to 'Basic' and perhaps a few taxable benefits. In India, a standard CTC (Cost to Company) structure includes Basic, HRA (House Rent Allowance), LTA (Leave Travel Allowance), and Special Allowance.</p>

      <h2>Taxation and Withholdings</h2>
      <p>India's income tax system has undergone significant changes in 2026. Understanding the 'Old Regime' vs. the 'New Regime' is critical for ensuring your employees are taking home the maximum possible amount after tax.</p>
    `
  }
};

const BlogPostDetail = () => {
  const { slug } = useParams();
  const blog = blogs[slug] || blogs['hire-remote-talent-india-guide'];

  return (
    <PublicLayout>
      <article className="bg-white min-h-screen">
        {/* Hero Area */}
        <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-text via-brand-text/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-1.5 rounded-full bg-brand-blue-500 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                    {blog.category}
                  </span>
                  <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
                    {blog.readTime}
                  </span>
                </div>
                <h1 className="font-display text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-8">
                  {blog.title}
                </h1>
                <div className="flex items-center gap-6 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-black text-xs">
                      {blog.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{blog.author}</p>
                      <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">{blog.date}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto px-8 py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row gap-16 relative">
            {/* Sidebar Actions */}
            <aside className="lg:w-16 lg:sticky lg:top-32 h-fit space-y-4">
              <div className="flex lg:flex-col gap-2">
                {[
                  { icon: ArrowUpRight, label: 'LinkedIn' },
                  { icon: ArrowUpRight, label: 'Twitter' },
                  { icon: LinkIcon, label: 'Link' },
                  { icon: Bookmark, label: 'Save' }
                ].map((item, i) => (
                  <button 
                    key={i}
                    className="w-12 h-12 rounded-2xl bg-brand-slate-50 flex items-center justify-center text-brand-muted hover:text-brand-blue-500 hover:bg-brand-blue-50 transition-all group"
                    title={item.label}
                  >
                    <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                ))}
              </div>
            </aside>

            {/* Main Article Body */}
            <div className="flex-1">
              <div 
                className="prose prose-lg prose-slate max-w-none 
                  prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight prose-headings:text-brand-text
                  prose-p:text-brand-muted prose-p:font-medium prose-p:leading-relaxed
                  prose-blockquote:border-l-4 prose-blockquote:border-brand-blue-500 prose-blockquote:bg-brand-blue-50 prose-blockquote:p-8 prose-blockquote:rounded-r-3xl prose-blockquote:italic prose-blockquote:font-display prose-blockquote:text-xl
                  prose-img:rounded-[32px] prose-img:shadow-2xl"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              <div className="mt-20 pt-10 border-t border-brand-border flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {['#RemoteHiring', '#IndiaTech', '#GlobalPayroll', '#HR2026'].map(tag => (
                    <span key={tag} className="text-[10px] font-black text-brand-blue-500 uppercase tracking-widest hover:underline cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em]">Share Article</span>
                  <div className="flex gap-2">
                    <button className="text-brand-muted hover:text-brand-blue-500 transition-colors"><ArrowUpRight size={18} /></button>
                    <button className="text-brand-muted hover:text-brand-blue-500 transition-colors"><ArrowUpRight size={18} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Articles */}
        <section className="bg-brand-slate-50 py-24 px-8 border-t border-brand-border">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="font-display text-4xl font-black text-brand-text mb-12">Recommended <span className="text-brand-blue-500">Reading.</span></h3>
            <div className="grid md:grid-cols-2 gap-10">
              <Link to="/blog/uk-india-payroll-differences" className="bg-white rounded-[40px] p-8 flex gap-6 items-center border border-brand-border hover:shadow-xl transition-all group text-left">
                <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=200" alt="Payroll" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-brand-blue-500 uppercase tracking-widest mb-2">Next Post</p>
                  <h4 className="font-display font-black text-xl text-brand-text group-hover:text-brand-blue-500 transition-colors">UK vs India Payroll: Key Differences</h4>
                </div>
              </Link>
              <div className="bg-brand-text rounded-[40px] p-8 flex flex-col justify-center items-center border border-brand-text">
                <h4 className="font-display font-black text-xl text-white mb-4">Subscribe to our newsletter</h4>
                <div className="flex w-full gap-2">
                   <input type="email" placeholder="Email" className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-xs" />
                   <button className="bg-brand-blue-500 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Join</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </PublicLayout>
  );
};

export default BlogPostDetail;
