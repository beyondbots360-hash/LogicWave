import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, ShieldCheck, Terminal } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { devLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans">
      {/* Left side: Branding */}
      <div className="lg:w-1/2 bg-brand-slate-900 p-12 xl:p-24 flex flex-col justify-between relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-full h-full bg-brand-blue-500/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
        
        <Link to="/" className="relative z-10">
          <img src="/logo.png" alt="LogicWave Logo" className="h-10 w-auto brightness-0 invert" />
        </Link>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 text-brand-blue-400 font-bold mb-6">
              <div className="w-8 h-[2px] bg-brand-blue-400" />
              <span className="uppercase tracking-[0.2em] text-[10px]">Welcome Back</span>
            </div>
            <h1 className="font-display text-5xl xl:text-6xl font-black leading-tight mb-8">
              Access your <span className="text-brand-blue-400">Global Hub.</span>
            </h1>
            <p className="text-brand-slate-400 text-lg font-medium leading-relaxed">
              Manage your workforce, review contracts, and execute payroll from a single high-security dashboard.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 text-brand-slate-500 text-sm font-bold">
          Protected by UK Enterprise Security Standards.
        </div>
      </div>

      {/* Right side: Form */}
      <div className="lg:w-1/2 p-12 xl:p-24 flex items-center justify-center bg-white">
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-black mb-3">Sign In</h2>
            <p className="text-brand-muted font-medium">Please enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-2xl flex items-center gap-3">
                <ShieldCheck size={18} /> {error}
              </div>
            )}

            <div>
              <label className="input-label">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-blue-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="john@company.co.uk"
                  className="input-field pl-8"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="input-label">Password</label>
              <div className="relative group">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-blue-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="input-field pl-8"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-brand-border text-brand-blue-500 focus:ring-brand-blue-500" />
                <span className="text-sm font-bold text-brand-muted">Remember me</span>
              </label>
              <a href="#" className="text-sm font-bold text-brand-blue-500 hover:underline">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-5 text-base rounded-2xl shadow-2xl shadow-brand-blue-500/30"
            >
              {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={20} />
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-brand-border"></div></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-brand-muted"><span className="bg-white px-4">Dev Tools</span></div>
            </div>

            <button 
              type="button"
              onClick={() => {
                devLogin('admin');
                navigate('/dashboard');
              }}
              className="w-full py-4 border-2 border-dashed border-brand-blue-200 text-brand-blue-500 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-brand-blue-50 transition-all"
            >
              <Terminal size={18} /> Dev Login (Bypass Rate Limit)
            </button>
          </form>

          <div className="mt-8 p-4 bg-brand-blue-50 border border-brand-blue-100 rounded-2xl">
            <p className="text-[10px] font-bold text-brand-blue-600 leading-relaxed">
              <span className="font-black uppercase tracking-widest block mb-1">💡 Project Tip:</span>
              To fix the "Rate Limit" permanently, go to your Supabase Dashboard → Auth → Providers → Email and disable "Confirm Email".
            </p>
          </div>

          <p className="mt-8 text-center text-sm font-bold text-brand-muted">
            Don't have an account? <Link to="/signup" className="text-brand-blue-500 hover:underline">Create Account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
