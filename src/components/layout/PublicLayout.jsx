import React from 'react';
import PublicNavbar from './PublicNavbar';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
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

      <footer className="bg-[#0f172a] text-white pt-20 pb-10 px-8">
        <div className="max-w-7xl mx-auto">

          {/* Main grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Col 1 – Brand */}
            <div>
              <div className="mb-6">
                <img src="/logo.png" alt="LogicWave" className="h-10 w-auto brightness-0 invert" />
              </div>
              <p className="text-brand-slate-400 text-sm leading-relaxed mb-8">
                The world's most compliant global employment platform. We help UK businesses hire, pay, and manage remote talent in India with zero legal overhead.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-slate-400 hover:bg-brand-blue-500 hover:text-white transition-all"
                  >
                    <s.Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 – Resources */}
            <div>
              <h4 className="font-display font-black text-sm mb-8 uppercase tracking-widest text-white/70">Resources</h4>
              <ul className="space-y-4">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-brand-slate-400 text-sm font-medium hover:text-brand-blue-400 transition-colors flex items-center gap-2 group"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 – Services */}
            <div>
              <h4 className="font-display font-black text-sm mb-8 uppercase tracking-widest text-white/70">Our Services</h4>
              <ul className="space-y-4">
                {serviceLinks.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-brand-slate-400 text-sm font-medium hover:text-brand-blue-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 – Contact */}
            <div>
              <h4 className="font-display font-black text-sm mb-8 uppercase tracking-widest text-white/70">Contact Us</h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={15} className="text-brand-blue-400" />
                  </div>
                  <p className="text-brand-slate-400 text-sm leading-relaxed">
                    1st Floor, 25-27 High St,<br />
                    London, W5 5DB<br />
                    United Kingdom
                  </p>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Phone size={15} className="text-brand-blue-400" />
                  </div>
                  <a href="tel:+442012345678" className="text-brand-slate-400 text-sm hover:text-white transition-colors">
                    +44 (0) 20 123 4567
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Mail size={15} className="text-brand-blue-400" />
                  </div>
                  <a href="mailto:hello@logicwave.co.uk" className="text-brand-slate-400 text-sm hover:text-white transition-colors">
                    hello@logicwave.co.uk
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-brand-slate-500 text-xs">
              © 2026 LogicWave Solutions Ltd. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-brand-slate-500">
              <a href="#" className="hover:text-white transition-colors">GDPR Compliant</a>
              <span>·</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>·</span>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
