import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { 
  FileText,
  ShieldCheck, Eye, Zap,
  MoreVertical, Trash2, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';


const BlogDashboard = () => {
  const { profile } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBlogs();
  }, [profile]);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-10 px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-2">Content Strategy</p>
            <h1 className="font-display text-4xl font-black tracking-tighter">
              Blog <span className="text-brand-blue-500">Dashboard.</span>
            </h1>
          </div>
          <Link to="/blog-editor" className="btn-primary h-12 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg> Create New Post
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid sm:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Views', value: '2,090', icon: Eye, color: 'text-brand-blue-500' },
            { label: 'Avg. CTR', value: '3.0%', icon: Zap, color: 'text-emerald-500' },
            { label: 'Active Posts', value: '2', icon: Globe, color: 'text-amber-500' },
            { label: 'Avg. SEO Score', value: '85', icon: ShieldCheck, color: 'text-purple-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[28px] border border-brand-border flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-brand-slate-50 flex items-center justify-center ${stat.color}`}>
                <stat.icon size={22} />
              </div>
              <div>
                <p className="font-display text-2xl font-black text-brand-text">{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              type="text" 
              placeholder="Search blogs..."
              className="input-field pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-outline h-12 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg> Filters
          </button>
        </div>

        {/* Blog Table */}
        <div className="bg-white rounded-[40px] border border-brand-border overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-brand-slate-50/50 border-b border-brand-border">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Blog Title</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">SEO Score</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Views</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-brand-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue-50 flex items-center justify-center text-brand-blue-500">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-brand-text truncate max-w-xs">{blog.title}</p>
                        <p className="text-[10px] font-bold text-brand-muted uppercase">/{blog.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-brand-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${blog.seo_score > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${blog.seo_score || 0}%` }}
                        />
                      </div>
                      <span className="text-xs font-black text-brand-text">{blog.seo_score || 0}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-bold text-brand-text text-sm">
                    {/* Placeholder views */}
                    —
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      blog.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 
                      blog.status === 'pending' ? 'bg-amber-50 text-amber-600' : 
                      'bg-brand-slate-100 text-brand-muted'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-brand-muted hover:text-brand-blue-500 transition-colors">
                        <FileText size={18} />
                      </button>
                      <button className="p-2 text-brand-muted hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 text-brand-muted hover:text-brand-text transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDashboard;
