import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, FileText, CreditCard,
  LogOut, ShieldCheck, X, BarChart2, Bot, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', roles: ['admin', 'contractor'] },
  { icon: Users, label: 'Workforce', href: '/workers', roles: ['admin'] },
  { icon: FileText, label: 'Contracts', href: '/contracts', roles: ['admin', 'contractor'] },
  { icon: CreditCard, label: 'Payroll', href: '/payroll', roles: ['admin'] },
  { icon: CreditCard, label: 'My Earnings', href: '/earnings', roles: ['contractor'] },
  { icon: ShieldCheck, label: 'Compliance', href: '/compliance', roles: ['admin'] },
  { icon: ShieldCheck, label: 'My Documents', href: '/documents', roles: ['contractor'] },
  { icon: FileText,       label: 'Manage Blogs', href: '/blog-dashboard', roles: ['blogger'] },
  { icon: FileText,       label: 'Create Post',   href: '/blog-editor',    roles: ['blogger'] },
  { icon: BarChart2,      label: 'SEO Insights',  href: '/seo-insights',   roles: ['blogger'] },
];

const Sidebar = ({ isMobile, closeMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut, switchRole } = useAuth();
  
  const userRole = profile?.role || 'contractor';
  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  // ── Fix: navigate AFTER React commits the new role state ──────────────────
  // Using useRef+useEffect avoids the race condition where navigate() fires
  // in the same synchronous tick as switchRole(), before state is committed.
  const prevRoleRef = useRef(userRole);
  useEffect(() => {
    if (prevRoleRef.current !== userRole) {
      prevRoleRef.current = userRole;
      navigate(userRole === 'blogger' ? '/blog-dashboard' : '/dashboard');
    }
  }, [userRole, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <aside className={`${isMobile ? 'flex' : 'hidden md:flex'} fixed top-0 left-0 h-full w-72 bg-white border-r border-brand-border flex-col z-40`}>
      {/* Logo */}
      <div className="px-10 py-10 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-3" onClick={closeMobile}>
          <img src="/logo.png" alt="LogicWave Logo" className="h-8 w-auto" />
        </Link>
        {isMobile && (
          <button onClick={closeMobile} className="text-brand-muted hover:text-brand-text p-2 -mr-2">
            <X size={24} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-6 space-y-2 overflow-y-auto scrollbar-hide">
        <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-4">Main Menu</p>
        {filteredNavItems.map(({ icon: Icon, label, href }) => {
          const isActive = location.pathname === href;
          return (
            <Link
              key={href}
              to={href}
              onClick={closeMobile}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group ${
                isActive
                  ? 'bg-brand-blue-500 text-white shadow-xl'
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-blue-50'
              }`}
            >
              <Icon
                size={20}
                className={`shrink-0 ${isActive ? 'text-white' : 'text-brand-muted group-hover:text-brand-blue-500'}`}
              />
              {label}
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-white" 
                />
              )}
            </Link>
          );
        })}

        {/* AI Studio Button (Blogger Only) */}
        {userRole === 'blogger' && (
          <button
            onClick={() => {
              if (closeMobile) closeMobile();
              navigate('/blog-editor?ai=true');
            }}
            className="w-full mt-4 flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-bold bg-gradient-to-r from-brand-slate-900 to-brand-slate-800 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all group border border-brand-slate-700"
          >
            <div className="flex items-center gap-4">
              <Bot size={20} className="text-brand-blue-400" />
              <span>AI Studio</span>
            </div>
            <Sparkles size={16} className="text-amber-400 animate-pulse" />
          </button>
        )}
      </nav>

      {/* Bottom Profile */}
      <div className="p-8 space-y-4">
        <div className="p-6 rounded-3xl bg-brand-slate-100/50 border border-brand-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-blue-100 flex items-center justify-center text-brand-blue-500 font-bold text-xs">
              {profile?.full_name?.charAt(0) || 'L'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-brand-text truncate">{profile?.full_name || 'User'}</p>
              <p className="text-[10px] text-brand-muted font-bold uppercase truncate">{profile?.role}</p>
            </div>
          </div>
          <Link to="/settings" className="block text-center w-full py-2.5 rounded-xl bg-white border border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-text hover:bg-brand-blue-500 hover:text-white hover:border-brand-blue-500 transition-all">
            Settings
          </Link>
        </div>

        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 rounded-2xl w-full transition-all">
          <LogOut size={16} />
          Sign Out
        </button>

        {profile?.id === 'dev_user_999' && (
          <button 
            onClick={() => {
              switchRole(); // navigate is handled by useEffect above
            }} 
            className="flex items-center justify-center gap-2 mt-4 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-brand-blue-500 bg-brand-blue-50 border border-brand-blue-200 border-dashed hover:bg-brand-blue-100 rounded-2xl w-full transition-all"
            title="Switch between Admin, Contractor and Blogger view"
          >
            Switch Role: {profile.role}
          </button>
        )}
      </div>

    </aside>
  );
};

export default Sidebar;
