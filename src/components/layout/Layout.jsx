import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-0 left-0 h-full w-72 bg-white" onClick={(e) => e.stopPropagation()}>
             <Sidebar isMobile={true} closeMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
      
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <main className="md:pl-72 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <header className="h-24 px-6 md:px-12 flex items-center justify-between md:justify-end bg-white border-b border-brand-border sticky top-0 z-30 shrink-0">
          <button 
            className="md:hidden p-2 -ml-2 text-brand-muted hover:text-brand-blue-500"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-6">
            {profile?.role === 'admin' && (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black text-brand-muted uppercase tracking-widest">Balance</p>
                  <p className="text-sm font-black text-brand-text leading-tight">£142,500.00</p>
                </div>
                <div className="w-px h-8 bg-brand-border mx-2" />
              </>
            )}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-brand-blue-500 flex items-center justify-center text-white font-bold border-2 border-white shadow-lg shadow-brand-blue-500/20 group-hover:scale-105 transition-transform">
                  {profile?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="hidden lg:block">
                  <p className="text-xs font-bold text-brand-text">{profile?.full_name || 'User'}</p>
                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">{profile?.role || 'Guest'}</p>
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="p-2 text-brand-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-all ml-2"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <section className="relative flex-1">
          {children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
