const RequestCallBack = () => {
  return (
    <section className="bg-[#0f172a] py-24 px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue-500/5 blur-3xl pointer-events-none"></div>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute -left-10 -top-10 text-[180px] font-black text-white/5 select-none pointer-events-none">Re</div>
            <h2 className="font-display font-black text-5xl text-white mb-6 tracking-tighter relative z-10">
              Request A <span className="text-brand-blue-400">Call Back</span>
            </h2>
            <p className="text-brand-slate-400 text-lg font-medium leading-relaxed max-w-md relative z-10">
              Share your details and our team will get in touch with you shortly to understand your requirements and assist you better.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Name *" 
              className="bg-white border border-transparent rounded-lg px-6 py-5 text-sm font-bold text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
            />
            <input 
              type="email" 
              placeholder="E-mail *" 
              className="bg-white border border-transparent rounded-lg px-6 py-5 text-sm font-bold text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
            />
            <input 
              type="tel" 
              placeholder="Phone *" 
              className="bg-white border border-transparent rounded-lg px-6 py-5 text-sm font-bold text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
            />
            <button className="btn-primary !bg-amber-500 hover:!bg-amber-600 border-none !py-5 uppercase tracking-widest text-[11px] font-black shadow-lg shadow-amber-500/20">
              Send Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestCallBack;
