import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, User, Building2, ShieldCheck, CheckCircle2, Terminal } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';

const SignupPage = () => {
  const navigate = useNavigate();
  const { devLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create Company
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .insert([{ name: formData.companyName }])
          .select()
          .single();

        if (companyError) throw companyError;

        // 3. Create Profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: authData.user.id,
            full_name: formData.fullName,
            role: 'admin',
            company_id: companyData.id
          }]);

        if (profileError) throw profileError;

        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans">
      {/* Left side: Content & Brand */}
      <div className="lg:w-1/2 bg-brand-slate-50 p-12 xl:p-24 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-brand-blue-500/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
        
        <Link to="/" className="relative z-10">
          <img src="/logo.png" alt="LogicWave Logo" className="h-10 w-auto" />
        </Link>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 text-brand-blue-500 font-bold mb-6">
              <div className="w-8 h-[2px] bg-brand-blue-500" />
              <span className="uppercase tracking-[0.2em] text-[10px]">Start Your Journey</span>
            </div>
            <h1 className="font-display text-5xl xl:text-6xl font-black leading-tight mb-8">
              Join the Future of <span className="text-brand-blue-500">Global HR.</span>
            </h1>
            <div className="space-y-6">
              {[
                'Full UK Compliance',
                ' GBP to INR Payroll',
                'Digital Contract Signing',
                'Real-time Management'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-brand-text font-bold">
                  <CheckCircle2 size={20} className="text-brand-blue-500" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 text-brand-muted text-sm font-bold">
          © 2026 LogicWave UK. All rights reserved.
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
            <h2 className="text-4xl font-black mb-3">Create Account</h2>
            <p className="text-brand-muted font-medium">Register your company to begin global hiring.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-2xl flex items-center gap-3">
                <ShieldCheck size={18} /> {error}
              </div>
            )}
            
            {success && (
              <div className="p-4 bg-brand-blue-50 border border-brand-blue-100 text-brand-blue-600 text-sm font-bold rounded-2xl flex items-center gap-3 animate-pulse">
                <CheckCircle2 size={18} /> Success! Redirecting to dashboard...
              </div>
            )}

            <div>
              <label className="input-label">Full Name</label>
              <div className="relative group">
                <User className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-blue-500 transition-colors" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="input-field pl-8"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="input-label">Company Name</label>
              <div className="relative group">
                <Building2 className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-blue-500 transition-colors" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="LogicWave UK Ltd"
                  className="input-field pl-8"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                />
              </div>
            </div>

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

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-5 text-base rounded-2xl shadow-2xl shadow-brand-blue-500/30"
            >
              {loading ? 'Creating Account...' : 'Get Started'} <ArrowRight size={20} />
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
              <Terminal size={18} /> Dev Quick Start (Bypass)
            </button>
          </form>

          <div className="mt-8 p-4 bg-brand-blue-50 border border-brand-blue-100 rounded-2xl">
            <p className="text-[10px] font-bold text-brand-blue-600 leading-relaxed">
              <span className="font-black uppercase tracking-widest block mb-1">💡 Project Tip:</span>
              To fix the "Rate Limit" permanently, go to your Supabase Dashboard → Auth → Providers → Email and disable "Confirm Email".
            </p>
          </div>

          <p className="mt-8 text-center text-sm font-bold text-brand-muted">
            Already have an account? <Link to="/login" className="text-brand-blue-500 hover:underline">Log In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
