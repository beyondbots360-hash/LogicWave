import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { mockWorkers } from '../lib/mockData';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  ChevronLeft, Mail, MapPin, CreditCard, ShieldCheck, FileText,
  Briefcase, Calendar, CheckCircle, Clock, AlertTriangle, Pencil, X
} from 'lucide-react';

const statusConfig = {
  active: { label: 'Active', bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
  onboarding: { label: 'Onboarding', bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500' },
  invited: { label: 'Invited', bg: 'bg-brand-blue-50', text: 'text-brand-blue-600', dot: 'bg-brand-blue-400' },
};

const WorkerProfile = () => {
  const { id } = useParams();
  const { profile } = useAuth();
  const isAdmin = profile?.role === 'admin';

  const worker = mockWorkers.find(w => w.id === id);
  const [showRateModal, setShowRateModal] = useState(false);
  const [newRate, setNewRate] = useState(worker?.monthlyRateGBP || '');

  if (!worker) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <AlertTriangle size={48} className="text-amber-400" />
          <h2 className="text-2xl font-black">Worker Not Found</h2>
          <Link to="/workers" className="btn-primary">← Back to Workforce</Link>
        </div>
      </Layout>
    );
  }

  const status = statusConfig[worker.status];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-10 px-8">
        {/* Back */}
        <Link to="/workers" className="flex items-center gap-2 text-brand-muted hover:text-brand-blue-500 font-bold mb-8 transition-colors group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Workforce
        </Link>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] border border-brand-border p-8 md:p-12 shadow-sm mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40 pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-[32px] bg-brand-blue-500 flex items-center justify-center text-white font-black text-4xl shadow-2xl shadow-brand-blue-500/30 shrink-0">
                {worker.initials}
              </div>
              <div>
                <h1 className="font-display text-4xl font-black tracking-tighter mb-1">{worker.name}</h1>
                <p className="text-lg font-semibold text-brand-muted flex items-center gap-2">
                  <Briefcase size={16} /> {worker.role}
                </p>
                <p className="text-sm font-medium text-brand-muted mt-1 flex items-center gap-2">
                  <Mail size={14} /> {worker.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-3 rounded-xl border border-brand-border text-brand-muted hover:text-brand-blue-500 hover:border-brand-blue-500 transition-all" title="Send Message">
                <Mail size={18} />
              </button>
              {isAdmin && (
                <button
                  onClick={() => setShowRateModal(true)}
                  className="btn-primary gap-2 !py-3 !px-6"
                >
                  <Pencil size={16} /> Adjust Rate
                </button>
              )}
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-brand-border relative z-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-2">Status</p>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${status.bg} ${status.text}`}>
                <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-2">Location</p>
              <p className="font-bold text-brand-text flex items-center gap-1.5 text-sm">
                <MapPin size={14} className="text-brand-blue-500 shrink-0" /> {worker.location}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-2">Joined</p>
              <p className="font-bold text-brand-text flex items-center gap-1.5 text-sm">
                <Calendar size={14} className="text-brand-blue-500 shrink-0" /> {worker.joinDate}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-2">Monthly Rate</p>
              <p className="font-black text-brand-text flex items-center gap-1.5 text-lg">
                <CreditCard size={14} className="text-brand-blue-500 shrink-0" /> {worker.rate}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[32px] border border-brand-border p-8"
          >
            <h3 className="font-display font-black text-xl mb-6">Compliance & Documents</h3>
            <div className="space-y-4">
              {[
                { label: 'KYC Verification', sub: 'Identity & Address Proof', field: worker.kyc, icon: ShieldCheck },
                { label: 'Active Contract',  sub: 'Signed Agreement on File', field: worker.contract, icon: FileText },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-4 bg-brand-surface rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.field === 'verified' || item.field === 'signed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-50 text-amber-500'}`}>
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-brand-text">{item.label}</p>
                      <p className="text-xs text-brand-muted">{item.sub}</p>
                    </div>
                  </div>
                  {item.field === 'verified' || item.field === 'signed'
                    ? <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                    : <span className="text-xs font-black uppercase tracking-wider text-amber-500">Pending</span>
                  }
                </div>
              ))}
            </div>

            {/* Onboarding progress */}
            <div className="mt-6 pt-6 border-t border-brand-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">Onboarding Progress</p>
                <p className="text-[10px] font-black text-brand-text">{worker.onboarding}/4 Steps</p>
              </div>
              <div className="w-full h-2 bg-brand-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(worker.onboarding / 4) * 100}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`h-full rounded-full ${worker.onboarding === 4 ? 'bg-emerald-500' : 'bg-brand-blue-500'}`}
                />
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[32px] border border-brand-border p-8"
          >
            <h3 className="font-display font-black text-xl mb-6">Recent Activity</h3>
            {worker.role.toLowerCase().includes('writer') || worker.role.toLowerCase().includes('blog') ? (
              <div className="space-y-4">
                {[
                  { title: 'Published Blog Post', sub: '"SEO Strategies for 2026"', date: 'May 09', color: 'bg-brand-blue-500' },
                  { title: 'Draft Submitted', sub: '"UK vs India Payroll Differences"', date: 'May 08', color: 'bg-amber-400' },
                  { title: 'Contract Signed', sub: 'Content & Blog Writing Agreement', date: 'May 09', color: 'bg-emerald-500' },
                ].map((ev, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${ev.color}`} />
                    <div className="flex-1 pb-4 border-b border-brand-border last:border-0">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-sm text-brand-text">{ev.title}</p>
                        <time className="text-xs font-medium text-brand-muted">{ev.date}</time>
                      </div>
                      <p className="text-xs text-brand-muted mt-0.5">{ev.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <Clock className="text-brand-border mb-3" size={32} />
                <p className="font-bold text-brand-muted text-sm">No recent activity yet.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Admin-only: Danger Zone */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-white rounded-[32px] border border-red-100 p-8"
          >
            <h3 className="font-display font-black text-xl text-red-500 mb-1">Admin Controls</h3>
            <p className="text-sm text-brand-muted font-medium mb-6">These actions are irreversible. Please proceed with caution.</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-2xl border-2 border-amber-200 text-amber-600 font-bold text-sm hover:bg-amber-50 transition-all">
                Pause Contract
              </button>
              <button className="px-6 py-3 rounded-2xl border-2 border-red-200 text-red-500 font-bold text-sm hover:bg-red-50 transition-all">
                Terminate Engagement
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Adjust Rate Modal */}
      {showRateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 bg-brand-text/60 backdrop-blur-sm"
            onClick={() => setShowRateModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[40px] w-full max-w-md p-10 shadow-2xl relative z-10"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display font-black text-2xl">Adjust Monthly Rate</h2>
                <p className="text-sm text-brand-muted font-medium mt-1">For {worker.name}</p>
              </div>
              <button onClick={() => setShowRateModal(false)} className="w-10 h-10 rounded-full bg-brand-surface flex items-center justify-center text-brand-muted hover:bg-red-50 hover:text-red-500 transition-all">
                <X size={20} />
              </button>
            </div>
            <div>
              <label className="input-label">New Monthly Rate (GBP)</label>
              <div className="relative group mt-2">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 font-black text-brand-blue-500">£</span>
                <input
                  type="number"
                  value={newRate}
                  onChange={e => setNewRate(e.target.value)}
                  className="input-field pl-6"
                  placeholder="e.g. 2500"
                />
              </div>
            </div>
            <button
              onClick={() => setShowRateModal(false)}
              className="btn-primary w-full mt-8 !py-4"
            >
              Confirm Rate Change
            </button>
            <p className="text-center text-[10px] font-black uppercase tracking-widest text-brand-muted mt-4 opacity-60">
              Change takes effect from next payroll cycle
            </p>
          </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default WorkerProfile;
