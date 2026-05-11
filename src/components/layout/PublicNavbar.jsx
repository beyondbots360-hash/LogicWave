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
          {['Home', 'Service', 'Shop'].map((item) => (
            <button key={item} className="text-[15px] font-bold text-brand-text hover:text-brand-blue-500 transition-colors">{item}</button>
          ))}
          <Link to="/blog" className="text-[15px] font-bold text-brand-text hover:text-brand-blue-500 transition-colors">Resources</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/login" className="text-[15px] font-bold text-brand-text hover:text-brand-blue-500 transition-colors mr-4">
            Login
          </Link>
          <Link to="/signup" className="btn-primary">
            Get A Quote <ArrowRight size={18} />
          </Link>
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu (Optional but good for UX) */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-brand-border px-8 py-6 flex flex-col gap-4">
          {['Home', 'Service', 'Shop'].map((item) => (
            <button key={item} className="text-left font-bold text-brand-text">{item}</button>
          ))}
          <Link to="/blog" className="font-bold text-brand-text">Resources</Link>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;
