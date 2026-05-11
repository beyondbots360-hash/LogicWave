import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const PublicNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="LogicWave Logo" className="h-10 w-auto" />
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <Link to="/" className="text-[14px] font-extrabold text-brand-text hover:text-brand-blue-500 transition-colors">Home</Link>
          <Link to="/about" className="text-[14px] font-extrabold text-brand-text hover:text-brand-blue-500 transition-colors">About Us</Link>
          <button className="text-[14px] font-extrabold text-brand-text hover:text-brand-blue-500 transition-colors flex items-center gap-1">Services <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></button>
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
        <div className="lg:hidden bg-white border-b border-brand-border px-8 py-6 flex flex-col gap-4">
          <Link to="/" className="font-bold text-brand-text">Home</Link>
          <button className="text-left font-bold text-brand-text">About Us</button>
          <button className="text-left font-bold text-brand-text">Services</button>
          <button className="text-left font-bold text-brand-text">Case Studies</button>
          <Link to="/blog" className="font-bold text-brand-text">Blog</Link>
          <Link to="/contact" className="font-bold text-amber-500">Contact Us</Link>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;
