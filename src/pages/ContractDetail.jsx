import React, { useRef, useState } from 'react';
import Layout from '../components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ShieldCheck, Download, CheckCircle, X, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';

const ContractDetail = () => {
  const navigate = useNavigate();
  const sigCanvas = useRef({});
  const [signed, setSigned] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  const clear = () => sigCanvas.current.clear();
  
  const handleSign = () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Please provide a signature first.");
      return;
    }
    
    setIsSigning(true);
    // Simulate API call
    setTimeout(() => {
      setSigned(true);
      setShowSignModal(false);
      setIsSigning(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-10 px-8">
        <Link to="/contracts" className="flex items-center gap-2 text-brand-muted hover:text-brand-blue-500 font-bold mb-8 transition-colors group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Contracts
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <p className="section-label !mb-0">Contract #LW-2026-042</p>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                signed ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {signed ? 'Signed & Active' : 'Pending Signature'}
              </span>
            </div>
            <h1 className="font-display text-4xl font-black tracking-tighter">Software Development <span className="text-brand-blue-500">Agreement.</span></h1>
          </div>
          {!signed && (
            <button 
              onClick={() => setShowSignModal(true)}
              className="btn-primary h-14 px-10 flex items-center gap-2 shadow-xl shadow-brand-blue-500/20"
            >
              Sign Contract
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[40px] border border-brand-border p-12 shadow-sm min-h-[800px] relative">
              <div className="prose prose-slate max-w-none">
                <h3 className="font-display font-black text-2xl mb-8">1. Scope of Work</h3>
                <p className="text-brand-muted leading-relaxed mb-6">
                  The Contractor agrees to provide professional software development services, including but not limited to frontend engineering, API integration, and database management for the LogicWave platform.
                </p>
                
                <h3 className="font-display font-black text-2xl mb-8 mt-12">2. Payment Terms</h3>
                <p className="text-brand-muted leading-relaxed mb-6">
                  Payments will be disbursed monthly in GBP (£) and converted to INR at the mid-market rate on the date of transaction. The agreed monthly retainer is £2,450.
                </p>

                <h3 className="font-display font-black text-2xl mb-8 mt-12">3. Compliance & Taxes</h3>
                <p className="text-brand-muted leading-relaxed mb-12">
                  The Contractor is responsible for all local tax filings in India. LogicWave will provide monthly payout reports and GST-compliant invoices where applicable.
                </p>

                <div className="mt-20 pt-20 border-t border-brand-border grid sm:grid-cols-2 gap-12">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-4">On behalf of LogicWave UK</p>
                    <div className="h-16 flex items-end border-b border-brand-border pb-2">
                      <p className="font-display text-xl font-black italic text-brand-text">Oliver Bennett</p>
                    </div>
                    <p className="text-xs font-bold text-brand-muted mt-2">Director, LogicWave Ltd.</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-4">Contractor Signature</p>
                    <div className="h-16 flex items-end border-b border-brand-border pb-2 relative">
                      {signed ? (
                        <div className="flex items-center gap-3">
                          <CheckCircle className="text-emerald-500" size={24} />
                          <p className="font-display text-xl font-black text-brand-text">Digitally Signed</p>
                        </div>
                      ) : (
                        <p className="text-brand-slate-300 italic text-sm">Awaiting signature...</p>
                      )}
                    </div>
                    <p className="text-xs font-bold text-brand-muted mt-2">Phantom Gaming</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-brand-blue-50 border border-brand-blue-100 rounded-[32px] p-8">
              <ShieldCheck className="text-brand-blue-500 mb-4" size={32} />
              <h3 className="font-display font-black text-lg text-brand-text mb-2">Legal Validity</h3>
              <p className="text-xs font-medium text-brand-muted leading-relaxed mb-6">
                This digital signature is legally binding under the UK Electronic Communications Act 2000 and the Indian IT Act 2000.
              </p>
              <div className="p-4 bg-white rounded-2xl border border-brand-blue-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle size={14} />
                </div>
                <p className="text-[10px] font-bold text-brand-text">Bank-grade encryption active</p>
              </div>
            </div>

            <button className="w-full btn-outline h-14 flex items-center justify-center gap-2">
              <Download size={18} /> Download as PDF
            </button>
          </div>
        </div>
      </div>

      {/* Signature Modal */}
      <AnimatePresence>
        {showSignModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSignModal(false)}
              className="absolute inset-0 bg-brand-text/60 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl relative z-10"
            >
              <div className="px-10 py-8 border-b border-brand-border flex items-center justify-between">
                <div>
                  <h2 className="font-display font-black text-2xl text-brand-text">Digital Signature</h2>
                  <p className="text-sm font-semibold text-brand-muted">Please draw your signature in the box below.</p>
                </div>
                <button 
                  onClick={() => setShowSignModal(false)}
                  className="w-10 h-10 rounded-full bg-brand-slate-50 flex items-center justify-center text-brand-muted hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-10">
                <div className="bg-brand-slate-50 border-2 border-brand-border rounded-3xl overflow-hidden relative group">
                  <SignatureCanvas 
                    ref={sigCanvas}
                    penColor="#191A66"
                    canvasProps={{
                      className: 'w-full h-64 cursor-crosshair'
                    }}
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button 
                      onClick={clear}
                      className="p-3 rounded-xl bg-white border border-brand-border text-brand-muted hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
                      title="Clear Signature"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleSign}
                    disabled={isSigning}
                    className="btn-primary flex-1 !py-5 shadow-xl shadow-brand-blue-500/20"
                  >
                    {isSigning ? 'Processing...' : 'Confirm & Sign Digitally'}
                  </button>
                </div>
                
                <p className="mt-6 text-center text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted opacity-50">
                  Transaction Securely Signed via LogicWave Auth
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ContractDetail;
