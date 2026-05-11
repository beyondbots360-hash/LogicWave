import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const PublicNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('title, slug, tier, hourly_rate')
        .order('tier', { ascending: true });
      if (!error) setServices(data);
    };
    fetchServices();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="LogicWave Logo" className="h-10 w-auto" />
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <Link to="/" className="text-[14px] font-extrabold text-brand-text hover:text-brand-blue-500 transition-colors">Home</Link>
          <Link to="/about" className="text-[14px] font-extrabold text-brand-text hover:text-brand-blue-500 transition-colors">About Us</Link>
          
          <div 
            className="relative"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <button className="text-[14px] font-extrabold text-brand-text hover:text-brand-blue-500 transition-colors flex items-center gap-1 py-4">
              Services <ChevronDown size={14} strokeWidth={3} className={`transition-transform ${showServices ? 'rotate-180' : ''}`} />
            </button>

            {showServices && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-white border border-brand-border rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-2 duration-200">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-blue-500 mb-4 px-2">Operational Essentials</h4>
                  <div className="flex flex-col gap-1">
                    {services.filter(s => s.tier === 1).map(s => (
                      <Link 
                        key={s.slug} 
                        to="/contact" 
                        className="p-3 rounded-xl hover:bg-brand-slate-50 transition-colors group"
                      >
                        <div className="text-[13px] font-bold text-brand-text group-hover:text-brand-blue-600 flex items-center justify-between">
                          {s.title}
                          <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[10px] text-brand-muted mt-0.5">From £{parseFloat(s.hourly_rate).toFixed(2)}/hr</div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="border-l border-brand-border pl-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-4 px-2">Specialized & Strategic</h4>
                  <div className="flex flex-col gap-1">
                    {services.filter(s => s.tier === 2).map(s => (
                      <Link 
                        key={s.slug} 
                        to="/contact" 
                        className="p-3 rounded-xl hover:bg-purple-50/50 transition-colors group"
                      >
                        <div className="text-[13px] font-bold text-brand-text group-hover:text-purple-600 flex items-center justify-between">
                          {s.title}
                          <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[10px] text-brand-muted mt-0.5">From £{parseFloat(s.hourly_rate).toFixed(2)}/hr</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/case-studies" className="text-[14px] font-extrabold text-brand-text hover:text-brand-blue-500 transition-colors">Case Studies</Link>
          <Link to="/blog" className="text-[14px] font-extrabold text-brand-text hover:text-brand-blue-500 transition-colors">Blog</Link>
          <Link to="/contact" className="text-[14px] font-extrabold text-amber-500 hover:text-amber-600 transition-colors">Contact Us</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/login" className="hidden sm:block text-[14px] font-extrabold text-brand-text hover:text-brand-blue-500 transition-colors mr-4">
            Login
          </Link>
          <div className="flex items-center gap-3">
             <button className="w-10 h-10 flex items-center justify-center bg-brand-slate-50 border border-brand-border rounded-xl text-brand-blue-500 hover:bg-brand-blue-50 transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
             </button>
             <Link to="/contact" className="btn-primary !bg-amber-500 hover:!bg-amber-600 border-none shadow-lg shadow-amber-500/20 uppercase tracking-widest text-[11px] font-black h-12 px-8 flex items-center justify-center">
                Let's Talk
             </Link>
          </div>
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-brand-border px-8 py-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          <Link to="/" className="font-bold text-brand-text">Home</Link>
          <Link to="/about" className="font-bold text-brand-text">About Us</Link>
          
          <div className="flex flex-col gap-2 pt-2 border-t border-brand-border">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue-500 px-2">Services</span>
            {services.map(s => (
              <Link key={s.slug} to="/contact" className="px-4 py-2 text-sm font-bold text-brand-muted hover:text-brand-blue-600">
                {s.title} <span className="text-[10px] font-medium ml-1 opacity-60">£{parseFloat(s.hourly_rate).toFixed(2)}</span>
              </Link>
            ))}
          </div>

          <Link to="/case-studies" className="font-bold text-brand-text">Case Studies</Link>
          <Link to="/blog" className="font-bold text-brand-text">Blog</Link>
          <Link to="/contact" className="font-bold text-amber-500">Contact Us</Link>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;

