import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { motion } from 'framer-motion';
import { Headphones, Briefcase, Database, Calculator, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  Headphones: Headphones,
  Briefcase: Briefcase,
  Database: Database,
  Calculator: Calculator,
  Truck: Truck
};

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('tier', { ascending: true })
        .order('hourly_rate', { ascending: true });
      
      if (!error) setServices(data);
      setLoading(false);
    };

    fetchServices();
  }, []);

  if (loading) return null;

  const tier1 = services.filter(s => s.tier === 1);
  const tier2 = services.filter(s => s.tier === 2);

  const ServiceCard = ({ service }) => {
    const Icon = iconMap[service.icon_name] || ArrowRight;
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl p-8 border border-brand-border hover:border-brand-blue-500/30 transition-all shadow-sm hover:shadow-xl hover:shadow-brand-blue-500/5 group"
      >
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors"
          style={{ backgroundColor: `${service.color_code}10`, color: service.color_code }}
        >
          <Icon size={28} />
        </div>
        
        <div className="flex items-center gap-2 mb-3">
           <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-brand-slate-100 text-brand-muted rounded-md">
             From £{parseFloat(service.hourly_rate).toFixed(2)} / hr
           </span>
           {service.buying_intent && (
             <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-amber-500/10 text-amber-600 rounded-md">
               {service.buying_intent.split(' ')[0]}
             </span>
           )}
        </div>

        <h3 className="font-display font-black text-2xl text-brand-text mb-4 group-hover:text-brand-blue-600 transition-colors">
          {service.title}
        </h3>
        
        <p className="text-brand-muted text-sm font-medium leading-relaxed mb-6">
          {service.description}
        </p>

        <ul className="space-y-3 mb-8">
          {service.keywords?.slice(0, 3).map((kw, i) => (
            <li key={i} className="flex items-start gap-2 text-xs font-bold text-brand-slate-500">
              <CheckCircle2 size={14} className="text-brand-blue-500 mt-0.5 shrink-0" />
              <span>{kw}</span>
            </li>
          ))}
        </ul>

        <Link 
          to="/contact" 
          className="flex items-center gap-2 text-brand-blue-600 font-black text-xs uppercase tracking-widest group/link"
        >
          Discuss Requirements
          <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
        </Link>
      </motion.div>
    );
  };

  return (
    <section id="services" className="py-24 px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-display font-black text-5xl md:text-6xl text-brand-text mb-6 tracking-tighter">
            Dedicated Services for <span className="text-brand-blue-500">Modern Businesses</span>
          </h2>
          <p className="text-brand-muted text-lg font-medium max-w-2xl mx-auto">
            Scale your operations with specialized remote talent managed locally in India and overseen from the UK.
          </p>
        </div>

        {/* Tier 1 Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-display font-black text-2xl text-brand-text uppercase tracking-tight whitespace-nowrap">
              Operational Essentials
            </h3>
            <div className="h-px bg-brand-border w-full"></div>
            <span className="text-xs font-black text-brand-blue-500 uppercase tracking-widest bg-brand-blue-50 px-4 py-2 rounded-full border border-brand-blue-100">
              Standard Tier
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tier1.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Tier 2 Section */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-display font-black text-2xl text-brand-text uppercase tracking-tight whitespace-nowrap">
              Specialized & Strategic
            </h3>
            <div className="h-px bg-brand-border w-full"></div>
            <span className="text-xs font-black text-purple-500 uppercase tracking-widest bg-purple-50 px-4 py-2 rounded-full border border-purple-100">
              Premium Tier
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tier2.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
