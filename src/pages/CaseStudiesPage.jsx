import PublicLayout from '../components/layout/PublicLayout';
import { motion } from 'framer-motion';
import RequestCallBack from '../components/sections/RequestCallBack';

const CaseStudiesPage = () => {
  return (
    <PublicLayout>
      <div className="bg-white">
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-brand-slate-50 border-b border-brand-border">
          <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
             <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent z-10"></div>
            <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover grayscale" />
          </div>
          
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-2 text-brand-muted font-bold text-xs uppercase tracking-widest mb-6">
                <span>Home</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-500/30"></span>
                <span className="text-brand-blue-500">Case Studies</span>
              </div>
              <h1 className="font-display font-black text-7xl text-brand-text mb-4 tracking-tighter">
                Case Studies
              </h1>
            </motion.div>
          </div>
          
          {/* Abstract Decorations */}
          <div className="absolute top-20 right-20 grid grid-cols-4 gap-2 opacity-10">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-text"></div>
            ))}
          </div>
          <div className="absolute bottom-10 left-10 opacity-10">
             <svg width="100" height="40" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M0 20C20 20 20 0 40 0C60 0 60 40 80 40C100 40 100 20 120 20" strokeDasharray="4 4"/>
             </svg>
          </div>
        </section>

        {/* Coming Soon Content */}
        <section className="max-w-7xl mx-auto px-8 py-32 text-center">
           <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
           >
              <h2 className="font-display font-black text-6xl md:text-8xl text-brand-text mb-8 tracking-tighter">
                Coming <span className="text-brand-blue-500">Soon...</span>
              </h2>
              <p className="text-brand-muted text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                We're currently documenting our success stories. Stay tuned to see how we've helped UK businesses scale their operations with top-tier remote talent.
              </p>
           </motion.div>
        </section>

        <RequestCallBack />
      </div>
    </PublicLayout>
  );
};

export default CaseStudiesPage;
