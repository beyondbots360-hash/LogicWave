import React from 'react';
import PublicLayout from '../components/layout/PublicLayout';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <PublicLayout>
      <div className="bg-white">
        {/* Top Addresses Section */}
        <section className="max-w-7xl mx-auto px-8 py-20 border-b border-brand-border">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-display font-black text-2xl text-brand-text mb-4">UK - Northampton</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                Pury Rd, Towcester NN12 7SU,<br />
                United Kingdom
              </p>
            </div>
            <div>
              <h3 className="font-display font-black text-2xl text-brand-text mb-4">India - Durgapur</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
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
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue-50 flex items-center justify-center text-brand-blue-500 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-black text-sm text-brand-text mb-1">Phone / Whatsapp</p>
                    <p className="text-brand-blue-600 font-bold text-lg">+91 9144128440</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 opacity-60">
                  <div className="w-14 h-14 rounded-2xl bg-brand-slate-50 flex items-center justify-center text-brand-muted shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-black text-sm text-brand-muted mb-1">E-mail</p>
                    <p className="text-brand-muted font-bold text-lg">Contact through phone</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#f1f8fc] p-10 md:p-14 rounded-[40px] border border-brand-blue-100 shadow-xl shadow-brand-blue-500/5"
            >
              <h3 className="font-display font-black text-3xl text-brand-text mb-2">Give Us a Message</h3>
              <p className="text-brand-muted text-sm font-bold mb-8">
                Your email address will not be published. Required fields are marked <span className="text-brand-blue-500">*</span>
              </p>

              <form className="space-y-6">
                <div>
                  <textarea 
                    placeholder="Message" 
                    className="w-full bg-white border border-brand-border rounded-2xl p-6 text-sm font-bold text-brand-text focus:outline-none focus:border-brand-blue-500 min-h-[160px] resize-none"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="bg-white border border-brand-border rounded-xl px-5 py-4 text-sm font-bold text-brand-text focus:outline-none focus:border-brand-blue-500"
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-white border border-brand-border rounded-xl px-5 py-4 text-sm font-bold text-brand-text focus:outline-none focus:border-brand-blue-500"
                    required
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone" 
                    className="bg-white border border-brand-border rounded-xl px-5 py-4 text-sm font-bold text-brand-text focus:outline-none focus:border-brand-blue-500"
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input type="checkbox" id="save-info" className="w-4 h-4 rounded border-brand-border text-brand-blue-500 focus:ring-brand-blue-500" />
                  <label htmlFor="save-info" className="text-[11px] font-bold text-brand-muted">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </div>

                <button className="btn-primary !bg-amber-500 hover:!bg-amber-600 border-none !py-4 !px-10 uppercase tracking-widest text-xs font-black shadow-lg shadow-amber-500/20">
                  Submit Post
                </button>
              </form>
            </motion.div>

          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default ContactPage;
