import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Star, Phone
} from 'lucide-react';
import PublicLayout from '../components/layout/PublicLayout';
import ServicesSection from '../components/sections/ServicesSection';

/* ── Animation Variants ── */
const maskReveal = {
  hidden: { y: '100%' },
  show: {
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const heroImages = [
  '/hero-1.png',
  '/hero-2.png',
  '/hero-3.png'
];



const LandingPage = () => {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PublicLayout>
      <div className="selection:bg-brand-blue-50 selection:text-brand-blue-600">

        {/* ── Hero Section ── */}
        <section className="relative pt-32 pb-0 px-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue-50/20 -skew-x-12 translate-x-1/4 pointer-events-none" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center relative z-10">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp} className="flex items-center gap-3 text-brand-blue-500 font-bold mb-6">
                <div className="w-8 h-[2px] bg-brand-blue-500" />
                <span className="uppercase tracking-[0.2em] text-[11px]">Best Human Resources Expert</span>
              </motion.div>

              <h1 className="font-display text-6xl xl:text-8xl font-black leading-[1] tracking-tight mb-8">
                <span className="mask-reveal">
                  <motion.span variants={maskReveal} className="mask-reveal-inner block">Grow Your Work</motion.span>
                </span>
                <span className="mask-reveal">
                  <motion.span variants={maskReveal} className="mask-reveal-inner block">
                    With <span className="text-brand-blue-500">Expert.</span>
                  </motion.span>
                </span>
              </h1>

              <motion.p variants={fadeUp} className="text-brand-muted text-lg max-w-lg leading-relaxed mb-10 font-medium">
                We provide the tools you need to hire, pay, and manage your workforce with complete UK compliance and digital ease.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-8">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/signup" className="btn-primary px-10 py-5 text-base">
                    Read More <ArrowRight size={18} />
                  </Link>
                </motion.div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-blue-50 flex items-center justify-center text-brand-blue-500">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Call Us Now</p>
                    <p className="text-lg font-bold">+44 (0) 20 123 4567</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image Slider */}
            <div className="relative h-[600px] xl:h-[700px] flex items-end justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroIdx}
                  initial={{ opacity: 0, scale: 1.1, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -50 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-end justify-center"
                >
                  <img
                    src={heroImages[heroIdx]}
                    alt="Professional"
                    className="h-full object-contain object-bottom"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-20 right-0 bg-white p-4 rounded-2xl shadow-xl z-30 flex items-center gap-3 border border-brand-border"
              >
                <div className="w-10 h-10 rounded-full bg-brand-blue-500 flex items-center justify-center text-white">
                  <Star size={18} fill="white" />
                </div>
                <div>
                  <p className="text-xs font-black">Trusted Partners</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={8} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-40 left-0 bg-brand-blue-500 p-6 rounded-full shadow-2xl z-30 text-white text-center min-w-[120px]"
              >
                <p className="text-2xl font-black">150+</p>
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-80">Companies</p>
              </motion.div>

              {/* Slider dots */}
              <div className="absolute bottom-10 right-10 flex gap-2 z-40">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroIdx(i)}
                    className={`h-3 rounded-full transition-all ${heroIdx === i ? 'bg-brand-blue-500 w-8' : 'bg-brand-blue-200 w-3'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Services Section ── */}
        <ServicesSection />

        {/* ── About Section ── */}
        <section className="py-24 px-8 bg-brand-slate-50">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img
                src="/contract-mockup.png"
                className="rounded-3xl shadow-2xl w-full"
                alt="HR Solutions"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-3xl shadow-2xl border border-brand-border hidden xl:block">
                <p className="text-brand-blue-500 text-5xl font-black mb-2">50+</p>
                <p className="text-brand-text font-bold text-xl uppercase tracking-tighter leading-none">
                  Years of <br /> Experience
                </p>
              </div>
            </div>

            <div>
              <p className="text-brand-blue-500 font-bold uppercase tracking-[0.3em] text-[11px] mb-4">Why Choose Us</p>
              <h2 className="font-display text-5xl font-black tracking-tight text-brand-text mb-8">
                Transforming Workplaces Through Innovative HR Solutions
              </h2>

              <div className="space-y-8">
                {[
                  { title: 'Global Talent Sourcing', desc: 'Access top talent across the UK and beyond.' },
                  { title: 'Employee Benefits', desc: 'Competitive benefits packages tailored for your team.' },
                  { title: 'Compliance & Risk', desc: 'Navigate UK employment law with total peace of mind.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-full border-2 border-brand-blue-500 flex items-center justify-center text-brand-blue-500 font-black shrink-0 group-hover:bg-brand-blue-500 group-hover:text-white transition-all">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-brand-muted text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
};

export default LandingPage;
