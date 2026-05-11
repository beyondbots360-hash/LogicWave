import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockWorkers } from '../lib/mockData';
import Layout from '../components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, Search, Mail, CheckCircle,
  Clock, X, Send,
  ShieldCheck, FileText, CreditCard, MapPin, ExternalLink
} from 'lucide-react';

const statusConfig = {
  active: { label: 'Active', bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
  onboarding: { label: 'Onboarding', bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500' },
  invited: { label: 'Invited', bg: 'bg-brand-blue-50', text: 'text-brand-blue-600', dot: 'bg-brand-blue-400' },
};

const WorkerCard = ({ worker, onViewDetails }) => {
  const status = statusConfig[worker.status];
  const progressPct = `${(worker.onboarding / 4) * 100}%`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[32px] border border-brand-border p-8 hover:border-brand-blue-500/30 hover:shadow-xl hover:shadow-brand-blue-500/5 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-blue-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-brand-blue-500/20">
            {worker.initials}
          </div>
          <div>
            <p className="font-display font-black text-lg text-brand-text leading-tight">{worker.name}</p>
            <p className="text-sm font-semibold text-brand-muted">{worker.role}</p>
          </div>
        </div>
        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${status.bg} ${status.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-muted">
          <Mail size={13} className="shrink-0" /> {worker.email}
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-muted">
          <MapPin size={13} className="shrink-0" /> {worker.location}
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-brand-text">
          <CreditCard size={13} className="shrink-0 text-brand-blue-500" /> {worker.rate}
        </div>
      </div>

      {/* Onboarding Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">Onboarding</p>
          <p className="text-[10px] font-black text-brand-text">{worker.onboarding}/4 Steps</p>
        </div>
        <div className="w-full h-1.5 bg-brand-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: progressPct }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`h-full rounded-full ${worker.onboarding === 4 ? 'bg-emerald-500' : 'bg-brand-blue-500'}`}
          />
        </div>
      </div>

      {/* Compliance Badges */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${worker.kyc === 'verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-slate-100 text-brand-muted'}`}>
          <ShieldCheck size={10} /> KYC {worker.kyc === 'verified' ? '✓' : '—'}
        </span>
        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${worker.contract === 'signed' ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-slate-100 text-brand-muted'}`}>
          <FileText size={10} /> Contract {worker.contract === 'signed' ? '✓' : '—'}
        </span>
      </div>

      <div className="flex items-center gap-3 pt-6 border-t border-brand-border">
        <button
          onClick={() => onViewDetails(worker)}
          className="flex-1 btn-primary !py-3 !text-xs !shadow-none gap-2"
        >
          View Profile <ExternalLink size={13} />
        </button>
        <button className="p-3 rounded-xl border border-brand-border text-brand-muted hover:text-brand-blue-500 hover:border-brand-blue-500 transition-all">
          <Mail size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const InviteModal = ({ onClose }) => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: '', rate: '' });

  const handleSend = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { onClose(); }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-text/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl relative z-10"
      >
        <div className="px-10 py-8 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue-500 flex items-center justify-center text-white">
              <Send size={20} />
            </div>
            <div>
              <h2 className="font-display font-black text-2xl text-brand-text">Invite Worker</h2>
              <p className="text-sm font-semibold text-brand-muted">Send an onboarding invite link.</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-brand-slate-50 flex items-center justify-center text-brand-muted hover:bg-red-50 hover:text-red-500 transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-10">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="font-display font-black text-2xl text-brand-text mb-2">Invite Sent!</h3>
              <p className="text-brand-muted font-semibold">A secure onboarding link has been emailed to <strong>{form.email}</strong>.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSend} className="space-y-6">
              <div>
                <label className="input-label">Full Name</label>
                <input type="text" required placeholder="e.g. Arjun Sharma" className="input-field"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="input-label">Email Address</label>
                <input type="email" required placeholder="worker@company.in" className="input-field"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="input-label">Job Role / Title</label>
                <input type="text" required placeholder="e.g. Senior Frontend Engineer" className="input-field"
                  value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
              </div>
              <div>
                <label className="input-label">Monthly Rate (GBP)</label>
                <input type="text" required placeholder="e.g. 2450" className="input-field"
                  value={form.rate} onChange={e => setForm({ ...form, rate: e.target.value })} />
              </div>
              <button type="submit" className="btn-primary w-full !py-5 shadow-xl shadow-brand-blue-500/20 mt-4">
                Send Onboarding Invite <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const WorkersPage = () => {
  const navigate = useNavigate();
  const [showInvite, setShowInvite] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = mockWorkers.filter(w => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || w.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-10 px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-2">Team Management</p>
            <h1 className="font-display text-4xl font-black tracking-tighter">
              Your <span className="text-brand-blue-500">Workforce.</span>
            </h1>
          </div>
          <button onClick={() => setShowInvite(true)} className="btn-primary h-14 px-10 flex items-center gap-2 shadow-xl shadow-brand-blue-500/20">
            <Plus size={18} /> Invite Worker
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Workers', value: mockWorkers.length, icon: Users, color: 'text-brand-blue-500', bg: 'bg-brand-blue-50' },
            { label: 'Active', value: mockWorkers.filter(w => w.status === 'active').length, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Onboarding', value: mockWorkers.filter(w => w.status === 'onboarding' || w.status === 'invited').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-[28px] border border-brand-border p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center ${s.color}`}>
                <s.icon size={22} />
              </div>
              <div>
                <p className="font-display text-3xl font-black text-brand-text">{s.value}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-brand-border rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-brand-blue-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            {['all', 'active', 'onboarding', 'invited'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-brand-blue-500 text-white shadow-lg shadow-brand-blue-500/20' : 'bg-white border border-brand-border text-brand-muted hover:text-brand-text'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Workers Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Users size={48} className="text-brand-border mx-auto mb-4" />
            <p className="font-bold text-brand-muted text-lg">No workers found.</p>
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(w => (
              <WorkerCard key={w.id} worker={w} onViewDetails={() => navigate(`/workers/${w.id}`)} />
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
      </AnimatePresence>
    </Layout>
  );
};

export default WorkersPage;
