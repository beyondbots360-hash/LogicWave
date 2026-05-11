import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { 
  TrendingUp, Calendar, Download, 
  Info, CheckCircle2, Wallet, ArrowRight
} from 'lucide-react';
import { mockPayrolls } from '../lib/mockData';

const PayrollPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const transactions = mockPayrolls;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-10 px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-2">Payroll & Payments</p>
            <h1 className="font-display text-4xl font-black tracking-tighter">GBP <span className="text-brand-blue-500">Transfers.</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn-outline h-12 flex items-center gap-2">
              <Download size={18} /> Tax Reports
            </button>
            <button className="btn-primary h-12 flex items-center gap-2">
               Execute Batch Run <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Balance Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-brand-text text-white p-10 rounded-[40px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-500/20 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <Wallet className="text-brand-blue-400 mb-6" size={32} />
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-slate-400 mb-2">Total Monthly Spend</p>
            <p className="text-4xl font-black mb-1 tracking-tighter">£14,250.00</p>
            <p className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <TrendingUp size={14} /> +12.5% from last month
            </p>
          </div>

          <div className="bg-white border border-brand-border p-10 rounded-[40px] shadow-sm">
            <Calendar className="text-brand-blue-500 mb-6" size={32} />
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted mb-2">Next Pay Cycle</p>
            <p className="text-4xl font-black mb-1 tracking-tighter text-brand-text">25 May</p>
            <p className="text-xs font-bold text-brand-muted">Auto-pay enabled for 8 workers</p>
          </div>

          <div className="bg-brand-blue-50 border border-brand-blue-100 p-10 rounded-[40px]">
            <Info className="text-brand-blue-500 mb-6" size={32} />
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-blue-500 mb-2">UK Compliance Status</p>
            <p className="text-4xl font-black mb-1 tracking-tighter text-brand-blue-900">Verified</p>
            <p className="text-xs font-bold text-brand-blue-600">HMRC Tax calculations active</p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-[40px] border border-brand-border overflow-hidden">
          <div className="px-10 py-8 border-b border-brand-border flex items-center justify-between">
            <div className="flex gap-8">
              {['Upcoming', 'Completed', 'Failed'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`text-sm font-black uppercase tracking-widest transition-all ${
                    activeTab === tab.toLowerCase() ? 'text-brand-blue-500' : 'text-brand-muted hover:text-brand-text'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button className="text-xs font-bold text-brand-blue-500 hover:underline">Download CSV</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-slate-50/50">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Worker</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Amount (GBP)</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Pay Date</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {transactions.map((t, i) => (
                  <tr key={i} className="hover:bg-brand-slate-50/50 transition-colors">
                    <td className="px-10 py-6">
                      <div>
                        <p className="font-bold text-brand-text">{t.workerName}</p>
                      </div>
                    </td>
                    <td className="px-10 py-6 font-black text-brand-text text-lg">£{t.amountGBP}</td>
                    <td className="px-10 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        t.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-blue-50 text-brand-blue-600'
                      }`}>
                        {t.status === 'paid' && <CheckCircle2 size={12} />}
                        {t.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-sm font-bold text-brand-muted">{t.paidOn || t.month}</td>
                    <td className="px-10 py-6 text-right">
                      <button className="p-2 text-brand-muted hover:text-brand-blue-500">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PayrollPage;
