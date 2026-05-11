import Layout from '../components/layout/Layout';
import { ShieldCheck, FileCheck, AlertTriangle, Download, Info } from 'lucide-react';

const ComplianceHub = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-10 px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-2">Legal & Tax</p>
            <h1 className="font-display text-4xl font-black tracking-tighter">Compliance <span className="text-brand-blue-500">Hub.</span></h1>
          </div>
          <button className="btn-primary h-12 flex items-center gap-2">
            <Download size={18} /> Export Compliance Pack
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[40px] border border-brand-border p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-brand-text mb-1 tracking-tight">HMRC Ready</h2>
                  <p className="text-brand-muted font-medium">Your payroll processes meet all UK tax regulations.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'IR35 Assessment', status: 'Verified', date: '2026-05-01', type: 'success' },
                  { title: 'Data Processing (GDPR)', status: 'Active', date: '2026-01-15', type: 'success' },
                  { title: 'Anti-Money Laundering', status: 'Pending Review', date: 'N/A', type: 'warning' },
                  { title: 'Right to Work Checks', status: 'Completed', date: '2026-05-05', type: 'success' },
                ].map((item, i) => (
                  <div key={i} className="p-6 border border-brand-border rounded-3xl hover:border-brand-blue-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-bold text-brand-text">{item.title}</p>
                      {item.type === 'success' ? (
                        <FileCheck size={18} className="text-emerald-500" />
                      ) : (
                        <AlertTriangle size={18} className="text-amber-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                        item.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-xs font-bold text-brand-muted">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-brand-blue-50 border border-brand-blue-100 rounded-[32px] p-8">
              <Info className="text-brand-blue-500 mb-4" size={24} />
              <h3 className="font-display font-black text-lg text-brand-text mb-2">Why is this important?</h3>
              <p className="text-sm font-medium text-brand-muted leading-relaxed mb-6">
                Hiring internationally carries specific risks. LogicWave assumes the liability for classification and tax remittance so you can scale safely.
              </p>
              <button className="text-sm font-black uppercase tracking-widest text-brand-blue-500 hover:text-brand-blue-600 transition-colors">
                Read our Legal Framework →
              </button>
            </div>

            <div className="bg-white border border-brand-border rounded-[32px] p-8">
              <h3 className="font-display font-black text-lg text-brand-text mb-6">Tax Documents</h3>
              <div className="space-y-4">
                {['P45 Template', 'P60 Summary Report', 'Corporate Tax Certificate'].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileCheck size={16} className="text-brand-muted group-hover:text-brand-blue-500 transition-colors" />
                      <span className="text-sm font-bold text-brand-text group-hover:text-brand-blue-500 transition-colors">{doc}</span>
                    </div>
                    <Download size={14} className="text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ComplianceHub;
