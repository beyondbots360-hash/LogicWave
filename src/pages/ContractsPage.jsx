import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { supabase } from '../lib/supabase';
import { mockWorkers } from '../lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Plus, Search, Filter,
  CheckCircle2, Clock, AlertCircle, ArrowRight, X, Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ContractsPage = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContract, setNewContract] = useState({
    title: '',
    amount: '',
    contractor_id: '',
  });

  const fetchContracts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error(error);
    else setContracts(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchContracts();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('contracts')
      .insert([newContract]);
    
    if (error) alert(error.message);
    else {
      setIsModalOpen(false);
      fetchContracts();
      setNewContract({ title: '', amount: '', contractor_id: '' });
    }
  };

  const handleSign = async (id) => {
    const { error } = await supabase
      .from('contracts')
      .update({ status: 'signed' })
      .eq('id', id);
    
    if (error) alert(error.message);
    else fetchContracts();
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-10 px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-2">Legal & Compliance</p>
            <h1 className="font-display text-4xl font-black tracking-tighter">Digital <span className="text-brand-blue-500">Contracts.</span></h1>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary h-12 flex items-center gap-2"
          >
            <Plus size={18} /> Create New Contract
          </button>
        </div>

        {/* Filters/Search */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search contracts..."
              className="w-full bg-white border border-brand-border rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-brand-blue-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-brand-border rounded-2xl text-sm font-bold text-brand-muted hover:text-brand-text transition-all">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[40px] border border-brand-border overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-slate-50/50 border-b border-brand-border">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Contract Title</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">Date</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="w-8 h-8 border-4 border-brand-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-brand-muted font-bold">Loading contracts...</p>
                  </td>
                </tr>
              ) : contracts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <p className="text-brand-muted font-bold text-lg mb-2">No contracts found.</p>
                    <p className="text-brand-muted text-sm font-medium">Create your first digital contract to get started.</p>
                  </td>
                </tr>
              ) : (
                contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-brand-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-blue-50 flex items-center justify-center text-brand-blue-500">
                          <FileText size={18} />
                        </div>
                        <div>
                          <Link
                            to={`/contracts/${contract.id}`}
                            className="font-bold text-brand-text hover:text-brand-blue-500 transition-colors"
                          >
                            {contract.title}
                          </Link>
                          <p className="text-[10px] font-bold text-brand-muted uppercase">UK-IND-00{contract.id.slice(0, 4)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-bold text-brand-text">
                      £{parseFloat(contract.amount).toLocaleString()}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        contract.status === 'signed' ? 'bg-emerald-50 text-emerald-600' : 
                        contract.status === 'completed' ? 'bg-brand-blue-50 text-brand-blue-600' : 
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {contract.status === 'signed' ? <CheckCircle2 size={12} /> : 
                         contract.status === 'pending' ? <Clock size={12} /> : 
                         <AlertCircle size={12} />}
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-brand-muted">
                      {new Date(contract.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      {contract.status === 'pending' ? (
                        <button 
                          onClick={() => handleSign(contract.id)}
                          className="text-xs font-black uppercase tracking-widest text-brand-blue-500 hover:text-brand-blue-600 transition-colors"
                        >
                          Simulate Sign
                        </button>
                      ) : (
                        <button className="p-2 text-brand-muted hover:text-brand-blue-500 transition-all">
                          <Download size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Contract Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl p-12 overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-brand-slate-50 text-brand-muted transition-all"
              >
                <X size={20} />
              </button>

              <div className="mb-10">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue-500 flex items-center justify-center text-white mb-6">
                  <FileText size={24} />
                </div>
                <h2 className="text-3xl font-black mb-2 tracking-tight">Create Contract</h2>
                <p className="text-brand-muted font-medium">Define the terms for your new employee or contractor.</p>
              </div>

              <form onSubmit={handleCreate} className="space-y-6">
                <div>
                  <label className="input-label">Contract Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Senior Software Engineer"
                    className="input-field"
                    value={newContract.title}
                    onChange={(e) => setNewContract({...newContract, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="input-label">Assign to Worker</label>
                  <select
                    required
                    className="w-full bg-transparent border-b-2 border-brand-border py-4 text-brand-text text-sm font-medium focus:outline-none focus:border-brand-blue-500 transition-all appearance-none cursor-pointer"
                    value={newContract.contractor_id}
                    onChange={(e) => setNewContract({...newContract, contractor_id: e.target.value})}
                  >
                    <option value="">Select a worker...</option>
                    {mockWorkers.map(w => (
                      <option key={w.id} value={w.id}>{w.name} — {w.email}</option>
                    ))}
                  </select>
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary w-full py-5 text-base rounded-2xl shadow-2xl shadow-brand-blue-500/30 mt-8"
                >
                  Generate Contract <ArrowRight size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ContractsPage;
