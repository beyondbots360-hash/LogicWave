import React from 'react';
import PublicNavbar from './PublicNavbar';
import { MapPin, Mail, Phone, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/* Brand social icons as inline SVG – lucide-react does not export Linkedin/Twitter/Instagram */
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const socialLinks = [
  { Icon: LinkedinIcon, href: 'https://linkedin.com/company/logicwave', label: 'LinkedIn' },
  { Icon: TwitterIcon,  href: 'https://twitter.com/logicwave',          label: 'Twitter' },
  { Icon: InstagramIcon, href: 'https://instagram.com/logicwave',       label: 'Instagram' },
];

const resourceLinks = [
  { label: 'Blog & News', href: '/blog' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

const serviceLinks = ['Direct Hiring', 'EOR Services', 'Payroll Management', 'Compliance Audit'];

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-brand-text font-sans flex flex-col">
      <PublicNavbar />

      <main className="pt-24 flex-1">
        {children}
      </main>

      <footer className="bg-[#0f172a] text-white pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto">

          {/* Main grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

            {/* Col 1 – Brand */}
            <div>
              <div className="mb-8">
                <img src="/logo.png" alt="LogicWave" className="h-10 w-auto brightness-0 invert" />
              </div>
              <p className="text-brand-slate-400 text-[15px] leading-relaxed mb-8 font-medium">
                Logic Wave Technologies provides skilled remote professionals and dedicated teams to help businesses build high-performance teams at optimized local costs.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-slate-400 hover:bg-brand-blue-500 hover:text-white transition-all border border-white/5"
                  >
                    <s.Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 – Contact */}
            <div>
              <h4 className="font-display font-black text-sm mb-10 uppercase tracking-widest text-white/90">Contact</h4>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 group">
                  <Phone size={18} className="text-brand-blue-400 group-hover:scale-110 transition-transform" />
                  <a href="tel:+919144128440" className="text-brand-slate-300 text-[15px] font-bold hover:text-white transition-colors">+91 91441 28440</a>
                </li>
                <li className="flex items-center gap-4 group">
                  <Mail size={18} className="text-brand-blue-400 group-hover:scale-110 transition-transform" />
                  <a href="mailto:info@logicwavetechnologies.com" className="text-brand-slate-300 text-[15px] font-bold hover:text-white transition-colors">info@logicwavetechnologies.com</a>
                </li>
                <li className="flex items-start gap-4 group">
                  <MapPin size={18} className="text-brand-blue-400 group-hover:scale-110 transition-transform mt-1" />
                  <p className="text-brand-slate-300 text-[15px] font-bold leading-relaxed">Pury Rd, Towcester NN12 7SU, United Kingdom</p>
                </li>
              </ul>
              <div className="mt-10">
                <a 
                  href="https://calendly.com/logicwavetechnologies/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-white/20 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-[#0f172a] transition-all group"
                >
                  Schedule a Meeting <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Col 3 – Top Links */}
            <div>
              <h4 className="font-display font-black text-sm mb-10 uppercase tracking-widest text-white/90">Top Links</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-brand-slate-400 text-[15px] font-bold hover:text-brand-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/blog" className="text-brand-slate-400 text-[15px] font-bold hover:text-brand-blue-400 transition-colors">Blog</Link></li>
                <li><Link to="/terms" className="text-brand-slate-400 text-[15px] font-bold hover:text-brand-blue-400 transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/faq" className="text-brand-slate-400 text-[15px] font-bold hover:text-brand-blue-400 transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Col 4 – Hire Professionals */}
            <div>
              <h4 className="font-display font-black text-sm mb-10 uppercase tracking-widest text-white/90">Hire Professionals</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-brand-slate-400 text-[15px] font-bold hover:text-brand-blue-400 transition-colors">Hire Text & Call Support</a></li>
                <li><a href="#" className="text-brand-slate-400 text-[15px] font-bold hover:text-brand-blue-400 transition-colors">Hire Email Support</a></li>
                <li><a href="#" className="text-brand-slate-400 text-[15px] font-bold hover:text-brand-blue-400 transition-colors">Hire Data Entry Support</a></li>
                <li><a href="#" className="text-brand-slate-400 text-[15px] font-bold hover:text-brand-blue-400 transition-colors">Hire Back Office Support</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-brand-slate-500 text-xs font-bold">
              Copyright © 2026 Logic Wave Technologies | All Right Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
