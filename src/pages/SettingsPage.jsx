import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Building2, Save, Landmark } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const SettingsPage = () => {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: formData.full_name })
        .eq('id', user.id);

      if (error) throw error;
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-10 px-8">
        <div className="mb-10">
          <p className="section-label mb-2">Preferences</p>
          <h1 className="font-display text-4xl font-black tracking-tighter">Account <span className="text-brand-blue-500">Settings.</span></h1>
        </div>

        <div className="bg-white rounded-[40px] border border-brand-border p-10 shadow-sm">
          <div className="flex items-center gap-6 mb-10 pb-10 border-b border-brand-border">
            <div className="w-24 h-24 rounded-full bg-brand-blue-500 flex items-center justify-center text-3xl text-white font-black shadow-xl shadow-brand-blue-500/20">
              {profile?.full_name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-black text-brand-text mb-1">{profile?.full_name}</h2>
              <p className="text-brand-muted font-bold mb-3">{user?.email}</p>
              <span className="badge-blue uppercase tracking-widest">{profile?.role}</span>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-8 max-w-xl">
            {success && (
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-bold border border-emerald-100 flex items-center gap-2">
                <Save size={16} /> Profile updated successfully!
              </div>
            )}

            <div>
              <label className="input-label">Full Name</label>
              <div className="relative group">
                <User className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-blue-500 transition-colors" size={18} />
                <input 
                  type="text" 
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  className="input-field pl-8"
                />
              </div>
            </div>

            <div>
              <label className="input-label">Email Address (Read-only)</label>
              <div className="relative group">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                <input 
                  type="email" 
                  value={user?.email || ''}
                  disabled
                  className="input-field pl-8 bg-brand-slate-50 cursor-not-allowed opacity-70"
                />
              </div>
            </div>

            {profile?.role === 'admin' && profile?.companies && (
              <div>
                <label className="input-label">Company Name</label>
                <div className="relative group">
                  <Building2 className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                  <input 
                    type="text" 
                    value={profile.companies.name}
                    disabled
                    className="input-field pl-8 bg-brand-slate-50 cursor-not-allowed opacity-70"
                  />
                </div>
                <p className="text-xs text-brand-muted mt-2 font-medium">To change company details, please contact LogicWave Support.</p>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full md:w-auto px-10 py-4 mt-8">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Withdrawal Methods (Contractor Only) */}
        {profile?.role === 'contractor' && (
          <div className="mt-8 bg-white rounded-[40px] border border-brand-border p-10 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue-50 flex items-center justify-center text-brand-blue-500">
                <Landmark size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-brand-text">Withdrawal Method</h2>
                <p className="text-brand-muted font-semibold text-sm">Where should we send your money?</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl border-2 border-brand-blue-500 bg-brand-blue-50/50 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-brand-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Primary</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-blue-500">
                  <Landmark size={18} />
                </div>
                <div>
                  <p className="font-bold text-brand-text">Local Bank Transfer (INR)</p>
                  <p className="text-xs text-brand-muted font-bold">Free • Arrives in 1-2 business days</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="input-label">Bank Name</label>
                  <input type="text" placeholder="e.g. HDFC Bank" className="input-field py-2" defaultValue="HDFC Bank" />
                </div>
                <div>
                  <label className="input-label">Account Holder Name</label>
                  <input type="text" placeholder="Name as per bank" className="input-field py-2" defaultValue={profile?.full_name} />
                </div>
                <div>
                  <label className="input-label">Account Number</label>
                  <input type="password" placeholder="••••••••4321" className="input-field py-2" defaultValue="123456789" />
                </div>
                <div>
                  <label className="input-label">IFSC Code</label>
                  <input type="text" placeholder="e.g. HDFC0001234" className="input-field py-2" defaultValue="HDFC0001234" />
                </div>
              </div>
            </div>

            <button className="w-full btn-outline border-dashed py-4 border-2">
              + Add another withdrawal method
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SettingsPage;
