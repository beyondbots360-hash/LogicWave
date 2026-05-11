import React from 'react';
import PublicLayout from '../components/layout/PublicLayout';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <PublicLayout>
      <div className="bg-white">
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-brand-slate-50">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <img src="/hero-2.png" alt="Background" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display font-black text-6xl text-brand-text mb-4 tracking-tighter">
                Contact With Us
              </h1>
              <div className="flex items-center gap-2 text-brand-muted font-bold text-sm">
                <span>Home</span>
                <span className="w-1 h-1 rounded-full bg-brand-muted/40"></span>
                <span className="text-brand-blue-500">Contact Us</span>
              </div>
            </motion.div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-12 h-12 border-4 border-amber-400/20 rounded-full blur-sm"></div>
          <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-brand-blue-500/5 rounded-full blur-2xl"></div>
        </section>

        {/* Map Section */}
        <section className="w-full h-[450px] bg-brand-slate-100 relative overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2448.243553229676!2d-1.0022415233157583!3d52.13898197196323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48771146399c5963%3A0x6b8f3a3f3a3a3a3a!2sPury%20Rd%2C%20Towcester%20NN12%207SU%2C%20UK!5e0!3m2!1sen!2sin!4v1715421500000!5m2!1sen!2sin" 
            className="w-full h-full border-0 grayscale opacity-80" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

        {/* Top Addresses Section */}
        <section className="max-w-7xl mx-auto px-8 py-20 border-b border-brand-border">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="group p-8 rounded-3xl hover:bg-brand-slate-50 transition-all border border-transparent hover:border-brand-border">
              <div className="w-12 h-12 bg-white border border-brand-border rounded-xl flex items-center justify-center text-brand-blue-500 mb-6 group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>
              <h3 className="font-display font-black text-2xl text-brand-text mb-4 uppercase tracking-tight">UK Office - Northampton</h3>
              <p className="text-brand-muted text-sm font-bold leading-relaxed">
                Pury Rd, Towcester NN12 7SU,<br />
                United Kingdom
              </p>
            </div>
            <div className="group p-8 rounded-3xl hover:bg-brand-slate-50 transition-all border border-transparent hover:border-brand-border">
              <div className="w-12 h-12 bg-white border border-brand-border rounded-xl flex items-center justify-center text-brand-blue-500 mb-6 group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>
              <h3 className="font-display font-black text-2xl text-brand-text mb-4 uppercase tracking-tight">India Office - Durgapur</h3>
              <p className="text-brand-muted text-sm font-bold leading-relaxed">
                31, Ambika City, Bidhan Nagar<br />
                Durgapur, West Bengal 713212
              </p>
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="max-w-7xl mx-auto px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            
            {/* Left Column: Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-black text-5xl text-brand-text mb-8 tracking-tighter">
                How can we <span className="text-brand-blue-500">help you?</span>
              </h2>
              <p className="text-brand-muted text-lg font-medium leading-relaxed mb-12 max-w-lg">
                Whether you're exploring dedicated remote staffing, operational support, or scalable workforce solutions, our team is here to assist. Share your requirements, and we'll connect with you to understand your goals and recommend the right support model for your business.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue-50 flex items-center justify-center text-brand-blue-500 shrink-0 shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-black text-xs uppercase tracking-widest text-brand-muted mb-1">Phone / Whatsapp</p>
                    <p className="text-brand-text font-black text-2xl">+91 9144128440</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue-50 flex items-center justify-center text-brand-blue-500 shrink-0 shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-black text-xs uppercase tracking-widest text-brand-muted mb-1">E-mail</p>
                    <p className="text-brand-text font-black text-xl">info@logicwavetechnologies.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#f1f8fc] p-10 md:p-14 rounded-[40px] border border-brand-blue-100 shadow-xl shadow-brand-blue-500/5 relative"
            >
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/30 -rotate-12">
                <Send size={20} />
              </div>
              <h3 className="font-display font-black text-3xl text-brand-text mb-2">Give Us a Message</h3>
              <p className="text-brand-muted text-sm font-bold mb-8">
                Your email address will not be published. Required fields are marked <span className="text-brand-blue-500">*</span>
              </p>

              <form className="space-y-6">
                <div>
                  <textarea 
                    placeholder="Message" 
                    className="w-full bg-white border border-brand-border rounded-2xl p-6 text-sm font-bold text-brand-text focus:outline-none focus:border-brand-blue-500 min-h-[160px] resize-none shadow-sm"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="bg-white border border-brand-border rounded-xl px-5 py-4 text-sm font-bold text-brand-text focus:outline-none focus:border-brand-blue-500 shadow-sm"
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-white border border-brand-border rounded-xl px-5 py-4 text-sm font-bold text-brand-text focus:outline-none focus:border-brand-blue-500 shadow-sm"
                    required
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone" 
                    className="bg-white border border-brand-border rounded-xl px-5 py-4 text-sm font-bold text-brand-text focus:outline-none focus:border-brand-blue-500 shadow-sm"
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input type="checkbox" id="save-info" className="w-4 h-4 rounded border-brand-border text-brand-blue-500 focus:ring-brand-blue-500" />
                  <label htmlFor="save-info" className="text-[11px] font-bold text-brand-muted">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </div>

                <button className="w-full btn-primary !bg-amber-500 hover:!bg-amber-600 border-none !py-5 !px-10 uppercase tracking-widest text-[11px] font-black shadow-lg shadow-amber-500/20">
                  Submit Post
                </button>
              </form>
            </motion.div>

          </div>
        </section>

        {/* Request A Call Back Section */}
        <section className="bg-[#0f172a] py-24 px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue-500/5 blur-3xl pointer-events-none"></div>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display font-black text-5xl text-white mb-6 tracking-tighter">
                  Request A <span className="text-brand-blue-400">Call Back</span>
                </h2>
                <p className="text-brand-slate-400 text-lg font-medium leading-relaxed max-w-md">
                  Share your details and our team will get in touch with you shortly to understand your requirements and assist you better.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Name *" 
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-sm font-bold text-white focus:outline-none focus:border-brand-blue-500"
                />
                <input 
                  type="email" 
                  placeholder="E-mail *" 
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-sm font-bold text-white focus:outline-none focus:border-brand-blue-500"
                />
                <input 
                  type="tel" 
                  placeholder="Phone *" 
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-sm font-bold text-white focus:outline-none focus:border-brand-blue-500"
                />
                <button className="btn-primary !bg-amber-500 hover:!bg-amber-600 border-none !py-5 uppercase tracking-widest text-[11px] font-black shadow-lg shadow-amber-500/20">
                  Send Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default ContactPage;
