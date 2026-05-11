import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, Globe } from 'lucide-react';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-brand-dark/80 backdrop-blur-md border-b border-brand-border z-30 flex items-center px-6 gap-4">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            placeholder="Search workers, contracts..."
            className="input pl-9 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Currency badge */}
        <div className="badge-blue">
          <Globe size={12} />
          <span>GBP £</span>
        </div>

        {/* Notifications */}
        <button className="relative btn-ghost p-2 rounded-xl">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center cursor-pointer">
          <span className="text-white font-bold text-xs">A</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
