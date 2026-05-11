import Layout from '../components/layout/Layout';
import { CreditCard, ArrowUpRight, Download, Calendar, ExternalLink, Clock, FileText } from 'lucide-react';

const EarningsPage = () => {
  const earnings = [
    { id: 'PAY-102', date: '25 Apr 2026', amountGbp: '£2,450.00', amountInr: '₹2,58,450', status: 'Completed', method: 'Wire Transfer' },
    { id: 'PAY-101', date: '25 Mar 2026', amountGbp: '£2,450.00', amountInr: '₹2,57,120', status: 'Completed', method: 'Wire Transfer' },
    { id: 'PAY-100', date: '25 Feb 2026', amountGbp: '£1,225.00', amountInr: '₹1,28,340', status: 'Completed', method: 'Wire Transfer' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-10 px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-2">Wallet</p>
            <h1 className="font-display text-4xl font-black tracking-tighter">My <span className="text-brand-blue-500">Finances.</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn-outline h-12 flex items-center gap-2">
              <Download size={18} /> Tax Report
            </button>
            <button className="btn-primary h-12 flex items-center gap-2">
              Withdraw Funds <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        {/* Stats Grid - Wallet Style */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-brand-text text-white p-8 rounded-[32px] shadow-xl shadow-brand-text/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-slate-400 mb-2">Available Balance</p>
            <p className="font-display text-4xl font-black mb-1">£2,450.00</p>
            <p className="text-sm font-semibold text-emerald-400">≈ ₹2,58,450 INR</p>
            <button className="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-xs font-bold flex items-center justify-center gap-2">
              Withdraw to HDFC Bank <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-brand-border flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-2">Expected Next Payout</p>
              <p className="font-display text-3xl font-black text-brand-text mb-1">£2,450.00</p>
              <p className="text-sm font-semibold text-brand-blue-500">Processing: 25 May 2026</p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-amber-500 bg-amber-50 px-3 py-2 rounded-lg w-fit">
              <Clock size={12} /> Awaiting admin approval
            </div>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-brand-border flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-2">Total Withdrawn (YTD)</p>
              <p className="font-display text-3xl font-black text-brand-text mb-1">£3,675.00</p>
              <p className="text-sm font-semibold text-brand-muted">₹3,85,460 INR Total</p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-brand-muted">
              Updated just now
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-[40px] border border-brand-border p-10 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display font-black text-2xl text-brand-text tracking-tight">Payment History</h2>
            <div className="flex gap-2">
              <button className="p-3 rounded-xl bg-brand-slate-50 border border-brand-border text-brand-muted hover:text-brand-blue-500 transition-colors">
                <Calendar size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-brand-border text-left">
                  <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">Reference</th>
                  <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">Date</th>
                  <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">GBP Amount</th>
                  <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">INR Received</th>
                  <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">Status</th>
                  <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">Invoice</th>
                  <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {earnings.map((pay) => (
                  <tr key={pay.id} className="group hover:bg-brand-slate-50/50 transition-colors">
                    <td className="py-8">
                      <p className="font-bold text-brand-text">{pay.id}</p>
                      <p className="text-xs text-brand-muted font-medium">{pay.method}</p>
                    </td>
                    <td className="py-8 font-bold text-brand-text text-sm">{pay.date}</td>
                    <td className="py-8 font-display font-black text-brand-text">{pay.amountGbp}</td>
                    <td className="py-8 font-display font-black text-brand-blue-500">{pay.amountInr}</td>
                    <td className="py-8">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                        {pay.status}
                      </span>
                    </td>
                    <td className="py-8">
                      <button className="flex items-center gap-2 text-xs font-bold text-brand-blue-500 hover:underline">
                        <FileText size={14} /> INV-{pay.id.split('-')[1]}
                      </button>
                    </td>
                    <td className="py-8 text-right">
                      <button className="p-3 rounded-xl bg-white border border-brand-border text-brand-muted hover:text-brand-blue-500 hover:border-brand-blue-500 transition-all shadow-sm group-hover:shadow-md">
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-8 bg-brand-blue-50 border border-brand-blue-100 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-brand-blue-500 shadow-sm">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-brand-text">Mid-Market Rate Applied</p>
                <p className="text-xs font-semibold text-brand-muted">Calculated via LogicWave FX API (GBP/INR)</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-brand-blue-500 font-black text-xs uppercase tracking-widest hover:underline">
              View Conversion Breakdown <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EarningsPage;
