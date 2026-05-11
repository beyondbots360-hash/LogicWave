import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { FileText, Upload, CheckCircle, AlertCircle, Shield, Info, Download, ArrowUpRight } from 'lucide-react';

const DocumentsPage = () => {
  const [uploads, setUploads] = useState({
    pan: { status: 'pending', file: null },
    gst: { status: 'none', file: null },
    id: { status: 'verified', file: 'passport_scan.pdf' },
    address: { status: 'pending', file: null }
  });

  const handleUpload = (type) => {
    // Simulation of file selection
    setUploads(prev => ({
      ...prev,
      [type]: { status: 'pending', file: 'uploading...' }
    }));
    
    setTimeout(() => {
      setUploads(prev => ({
        ...prev,
        [type]: { status: 'review', file: `${type}_doc_final.pdf` }
      }));
    }, 2000);
  };

  const docTypes = [
    { id: 'pan', label: 'PAN Card', desc: 'Permanent Account Number for Indian Tax compliance.', required: true },
    { id: 'gst', label: 'GST Registration', desc: 'Required if you are registered as a business entity.', required: false },
    { id: 'id', label: 'Identity Proof', desc: 'Passport or Aadhaar card for KYC verification.', required: true },
    { id: 'address', label: 'Address Proof', desc: 'Utility bill or bank statement (last 3 months).', required: true },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-10 px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-2">Compliance</p>
            <h1 className="font-display text-4xl font-black tracking-tighter">My <span className="text-brand-blue-500">Documents.</span></h1>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
            <Shield size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Secure Cloud Storage</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {docTypes.map((doc) => {
              const state = uploads[doc.id];
              return (
                <div key={doc.id} className="bg-white rounded-[32px] border border-brand-border p-8 hover:border-brand-blue-500/20 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                        state.status === 'verified' ? 'bg-emerald-50 text-emerald-500' : 
                        state.status === 'review' ? 'bg-amber-50 text-amber-500' : 'bg-brand-slate-50 text-brand-muted'
                      }`}>
                        <FileText size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display font-black text-lg text-brand-text">{doc.label}</h3>
                          {doc.required && <span className="text-[10px] font-black text-red-500 uppercase">Required</span>}
                        </div>
                        <p className="text-sm font-medium text-brand-muted max-w-md leading-relaxed">{doc.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {state.status === 'none' ? (
                        <button 
                          onClick={() => handleUpload(doc.id)}
                          className="btn-outline !py-3 !px-6 flex items-center gap-2 border-dashed border-2"
                        >
                          <Upload size={16} /> Upload
                        </button>
                      ) : state.status === 'pending' ? (
                        <div className="flex items-center gap-2 text-brand-blue-500 font-bold text-sm">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          >
                            <Info size={18} />
                          </motion.div>
                          Uploading...
                        </div>
                      ) : state.status === 'review' ? (
                        <div className="flex items-center gap-2 text-amber-500 font-bold text-sm bg-amber-50 px-4 py-2 rounded-xl">
                          <AlertCircle size={18} /> Awaiting Review
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-xl">
                          <CheckCircle size={18} /> Verified
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {state.file && state.status !== 'pending' && (
                    <div className="mt-6 pt-6 border-t border-brand-border flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-brand-muted">
                        <FileText size={14} /> {state.file}
                      </div>
                      <button className="text-brand-blue-500 hover:underline text-xs font-black uppercase tracking-widest flex items-center gap-1">
                        <Download size={12} /> View
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="space-y-6">
            <div className="card bg-brand-text text-white p-8 border-none overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-500/20 rounded-full blur-3xl" />
               <h3 className="font-display font-black text-xl mb-4 relative z-10">Verification Status</h3>
               <div className="space-y-4 mb-8 relative z-10">
                 <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-brand-slate-400">Completion</span>
                    <span>75%</span>
                 </div>
                 <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      className="h-full bg-brand-blue-500" 
                    />
                 </div>
               </div>
               <p className="text-xs text-brand-slate-400 font-medium leading-relaxed mb-6">
                 Please upload all required documents to avoid delays in your next payroll cycle.
               </p>
               <button className="w-full btn-primary !bg-white !text-brand-text !shadow-none">Contact Support</button>
            </div>

            <div className="card p-8 bg-brand-slate-50 border-brand-border text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-brand-text shadow-sm mb-4">
                <Shield size={24} />
              </div>
              <h4 className="font-display font-black text-lg mb-2">Live Identity Check</h4>
              <p className="text-xs font-medium text-brand-muted leading-relaxed mb-6">
                To comply with anti-money laundering (AML) laws, please complete a live selfie verification.
              </p>
              <button className="w-full btn-primary !bg-brand-text hover:!bg-black !shadow-none gap-2">
                Start Camera <ArrowUpRight size={16} />
              </button>
              <p className="text-[10px] font-bold text-brand-muted mt-4">Powered by Onfido™</p>
            </div>

            <div className="card p-8 bg-brand-blue-50 border-brand-blue-100">
               <h4 className="font-display font-black text-lg mb-4">Indian Tax Compliance</h4>
               <p className="text-xs font-medium text-brand-muted leading-relaxed mb-4">
                 As an Indian contractor working for a UK entity, you are responsible for filing your local taxes. LogicWave provides the necessary payout reports for your CA.
               </p>
               <ul className="space-y-3">
                 {['Form 16A assistance', 'GST Invoice templates', 'TDS Summary'].map((item, i) => (
                   <li key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-blue-600">
                     <CheckCircle size={12} /> {item}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
