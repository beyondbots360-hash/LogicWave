import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, FileText, CreditCard, TrendingUp,
  Clock, CheckCircle, AlertCircle, ArrowUpRight,
  Building2, ShieldCheck, Plus
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const KPICard = ({ icon: Icon, label, value, sub, delay }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -5, shadow: '0 20px 40px -15px rgba(14,140,231,0.1)' }}
    className="bg-white p-8 rounded-[32px] border border-brand-border shadow-sm hover:border-brand-blue-500/30 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-8">
      <div className="w-12 h-12 rounded-2xl bg-brand-blue-50 flex items-center justify-center text-brand-blue-500">
        <Icon size={20} />
      </div>
      <ArrowUpRight size={14} className="text-brand-muted" />
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-2">{label}</p>
    <p className="font-display text-4xl font-black text-brand-text mb-1">{value}</p>
    <p className="text-sm font-semibold text-brand-muted">{sub}</p>
  </motion.div>
);

const Dashboard = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const isContractor = profile?.role === 'contractor';
  const isAdmin = profile?.role === 'admin';
  
  const [pendingBlogs, setPendingBlogs] = useState([]);

  useEffect(() => {
    if (isAdmin) {
      fetchPendingBlogs();
    }
  }, [isAdmin]);

  const fetchPendingBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setPendingBlogs(data || []);
    } catch (error) {
      console.error('Error fetching pending blogs:', error.message);
    }
  };

  const handleBlogAction = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .update({ status: newStatus })
        .eq('id', id);
        
      if (error) throw error;
      setPendingBlogs(prev => prev.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error updating blog:', error.message);
      alert('Failed to update blog status.');
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-10 px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="section-label mb-2">Overview</p>
            <h1 className="font-display text-4xl font-black tracking-tighter">
              Welcome back, <span className="text-brand-blue-500">{profile?.full_name?.split(' ')[0] || 'User'}</span>.
            </h1>
          </div>
          {profile?.role === 'admin' && (
            <div className="flex items-center gap-4">
              <Link to="/payroll" className="btn-outline h-12 flex items-center">Payroll Overview</Link>
              <button
                onClick={() => navigate('/workers')}
                className="btn-primary h-12 flex items-center gap-2"
              >
                <Plus size={18} /> Invite Worker
              </button>
            </div>
          )}
        </motion.div>

        {/* KPIs or Onboarding Stepper */}
        {isContractor ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-[32px] border border-brand-border p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-brand-border">
                <div>
                  <h2 className="font-display font-black text-2xl text-brand-text mb-2">Onboarding Progress</h2>
                  <p className="text-sm font-semibold text-brand-muted">Complete these steps to unlock your first payout.</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue-500 mb-1">Status</p>
                  <p className="font-display text-xl font-black text-brand-text">1 of 4 <span className="text-brand-muted text-sm font-medium">Done</span></p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-6 left-12 right-12 h-1 bg-brand-slate-100 -z-10 rounded-full" />
                <div className="hidden md:block absolute top-6 left-12 w-1/4 h-1 bg-emerald-500 -z-10 rounded-full" />
                
                {[
                  { step: 1, title: 'Identity (KYC)', desc: 'Verify your ID', status: 'completed', icon: ShieldCheck },
                  { step: 2, title: 'Tax Documents', desc: 'PAN & GST Details', status: 'current', icon: FileText, link: '/documents' },
                  { step: 3, title: 'Sign Contract', desc: 'Master Service Agreement', status: 'pending', icon: FileText, link: '/contracts/LW-2026-042' },
                  { step: 4, title: 'Bank Details', desc: 'Add withdrawal method', status: 'pending', icon: CreditCard, link: '/settings' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center text-center relative z-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all ${
                      s.status === 'completed' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 
                      s.status === 'current' ? 'bg-brand-blue-500 text-white shadow-lg shadow-brand-blue-500/20 ring-4 ring-brand-blue-50' : 
                      'bg-white border-2 border-brand-border text-brand-muted'
                    }`}>
                      {s.status === 'completed' ? <CheckCircle size={20} /> : <s.icon size={20} />}
                    </div>
                    <p className={`font-bold mb-1 ${s.status === 'pending' ? 'text-brand-muted' : 'text-brand-text'}`}>{s.title}</p>
                    <p className="text-[11px] font-semibold text-brand-muted mb-4">{s.desc}</p>
                    
                    {s.status === 'current' && (
                      <Link to={s.link} className="btn-primary !py-2 !px-4 !text-[10px] w-full max-w-[140px]">
                        Start Now
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          >
            <KPICard icon={Users} label="Total Workforce" value="—" sub="Active UK Team" />
            <KPICard icon={FileText} label="Active Contracts" value="—" sub="Pending Signature" />
            <KPICard icon={CreditCard} label="Monthly Payroll" value="£0.00" sub="Next run in 12 days" />
            <KPICard icon={ShieldCheck} label="Compliance" value="100%" sub="All policies active" />
          </motion.div>
        )}

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 card bg-white"
          >
            {isAdmin && pendingBlogs.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-extrabold text-xl tracking-tight">Pending Blog Approvals</h2>
                  <span className="badge-blue !bg-amber-50 !text-amber-600 !border-amber-200">{pendingBlogs.length} Pending</span>
                </div>
                <div className="space-y-4">
                  <AnimatePresence>
                    {pendingBlogs.map((blog) => (
                      <motion.div 
                        key={blog.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-start justify-between p-6 rounded-3xl border border-brand-border bg-white shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-brand-slate-50 flex items-center justify-center text-brand-blue-500 shrink-0">
                            <FileText size={20} />
                          </div>
                          <div>
                            <h3 className="font-bold text-brand-text mb-1">{blog.title}</h3>
                            <p className="text-sm font-medium text-brand-muted line-clamp-1 max-w-md mb-3">{blog.content}</p>
                            <div className="flex gap-4">
                              <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted">By: {blog.author_name}</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted">SEO Score: {blog.seo_score}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleBlogAction(blog.id, 'rejected')}
                            className="btn-outline !text-[11px] !py-2 !px-4 hover:!bg-red-50 hover:!border-red-200 hover:!text-red-500"
                          >
                            Reject
                          </button>
                          <button 
                            onClick={() => handleBlogAction(blog.id, 'published')}
                            className="btn-primary !text-[11px] !py-2 !px-4"
                          >
                            Approve & Publish
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-10">
              <h2 className="font-display font-extrabold text-xl tracking-tight">Recent Activity</h2>
              <button className="text-xs font-bold text-brand-blue-500 hover:underline">View All</button>
            </div>
            
            <div className="space-y-6">
              {[
                { icon: CheckCircle, title: 'Supabase Connected', desc: 'Secure connection established to London region (eu-west-2).', time: 'Just now', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { icon: AlertCircle, title: 'Identity Verification', desc: 'Invite your first employee to complete their identity check.', time: '1 hour ago', color: 'text-amber-500', bg: 'bg-amber-50' },
                { icon: Clock, title: 'Contract Template', desc: 'New "UK Standard Contractor" template added to your library.', time: '2 hours ago', color: 'text-brand-blue-500', bg: 'bg-brand-blue-50' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 p-6 rounded-3xl border border-brand-border hover:border-brand-blue-500/20 transition-all group">
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} shrink-0`}>
                    <item.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-brand-text">{item.title}</p>
                      <p className="text-[11px] font-bold text-brand-muted">{item.time}</p>
                    </div>
                    <p className="text-sm font-medium text-brand-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <div className="card bg-brand-text text-white border-none p-10">
              <h3 className="font-display font-black text-2xl mb-4 leading-tight">Scale your team with confidence.</h3>
              <p className="text-brand-slate-400 text-sm font-medium mb-8 leading-relaxed">
                LogicWave handles the heavy lifting of UK compliance, payroll, and contracts.
              </p>
              <button className="w-full btn-primary !shadow-none">View Pricing Plans</button>
            </div>

            <div className="card p-8 bg-brand-blue-50 border-brand-blue-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-brand-blue-500 shadow-sm mb-6">
                <ShieldCheck size={32} />
              </div>
              <h4 className="font-display font-black text-lg mb-2">UK Compliance Hub</h4>
              <p className="text-xs font-semibold text-brand-muted mb-6 leading-relaxed">
                Your company is fully compliant with the latest HMRC and GDPR standards.
              </p>
              <span className="badge-blue !bg-white">Status: Active</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
