import { useState } from 'react';
import { Send, Bot, Sparkles, Image as ImageIcon, Search, LayoutTemplate, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BloggerAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'assistant', text: "Hello! I'm your AI Blogger Assistant powered by OpenClaw. What would you like to create today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('Draft'); // Draft, Pending Approval
  
  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMsg = { id: Date.now(), type: 'user', text: inputValue };
    setMessages([...messages, newMsg]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'assistant', 
        text: "I've started researching that topic. I'll generate a draft for you shortly on the canvas." 
      }]);
      
      // Simulate draft generation
      setTimeout(() => {
        setDraft("# The Future of AI in Blogging\n\nArtificial Intelligence is revolutionizing how we create content. OpenClaw allows us to automate research and draft generation seamlessly.\n\n## 1. Automated Research\nUsing headless browsers, we can extract SEO data.\n\n## 2. High-Quality Drafts\nOpenAI powers the writing style to ensure it sounds human.");
      }, 1500);
    }, 1000);
  };

  const handleSubmitReview = () => {
    setStatus('Pending Approval');
    // In future: push to Supabase with 'Pending Approval' state
    alert('Blog submitted to Admin for review!');
  };

  return (
    <div className="flex h-screen bg-brand-slate-50 overflow-hidden font-sans">
      
      {/* Left Panel: Command Center (Chat) */}
      <div className="w-1/3 flex flex-col border-r border-brand-border bg-white shadow-xl z-10">
        <div className="p-6 border-b border-brand-border flex items-center justify-between bg-white/50 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Link to="/blog-dashboard" className="p-2 text-brand-muted hover:text-brand-text bg-brand-slate-50 rounded-full transition-colors">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-lg font-black text-brand-text flex items-center gap-2">
                <Bot size={20} className="text-brand-blue-500" /> Assistant
              </h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-brand-muted">Powered by OpenClaw</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-4 ${
                msg.type === 'user' 
                  ? 'bg-brand-blue-500 text-white rounded-tr-sm shadow-md' 
                  : 'bg-brand-slate-100 text-brand-text rounded-tl-sm border border-brand-border'
              }`}>
                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Chips */}
        <div className="p-4 bg-brand-slate-50 border-t border-brand-border overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-hide">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-border rounded-full text-xs font-bold text-brand-muted hover:text-brand-blue-500 hover:border-brand-blue-200 transition-colors shadow-sm">
            <Search size={14} /> Analyze SEO
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-border rounded-full text-xs font-bold text-brand-muted hover:text-brand-blue-500 hover:border-brand-blue-200 transition-colors shadow-sm">
            <LayoutTemplate size={14} /> Draft Post
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-border rounded-full text-xs font-bold text-brand-muted hover:text-brand-blue-500 hover:border-brand-blue-200 transition-colors shadow-sm">
            <ImageIcon size={14} /> Gen Image
          </button>
        </div>

        {/* Input Form */}
        <div className="p-6 bg-white border-t border-brand-border">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask the assistant to research or write..."
              className="w-full pl-6 pr-14 py-4 bg-brand-slate-50 border border-brand-border rounded-2xl focus:border-brand-blue-500 focus:ring-4 focus:ring-brand-blue-500/10 outline-none transition-all text-sm font-medium text-brand-text"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-brand-blue-500 text-white rounded-xl hover:bg-brand-blue-600 disabled:opacity-50 transition-all shadow-md shadow-brand-blue-500/20"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel: Canvas */}
      <div className="flex-1 flex flex-col bg-brand-slate-50 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
        
        <div className="p-6 border-b border-brand-border flex items-center justify-between bg-white/50 backdrop-blur-xl relative z-10">
          <div className="flex gap-6">
            <button className="text-sm font-black text-brand-blue-500 border-b-2 border-brand-blue-500 pb-1">Draft</button>
            <button className="text-sm font-bold text-brand-muted hover:text-brand-text transition-colors pb-1">Research</button>
            <button className="text-sm font-bold text-brand-muted hover:text-brand-text transition-colors pb-1">Media</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-full text-[10px] font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              {status}
            </div>
            <button 
              onClick={handleSubmitReview}
              disabled={!draft || status === 'Pending Approval'}
              className="flex items-center gap-2 px-6 py-2.5 bg-brand-text text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle2 size={16} />
              Submit for Review
            </button>
          </div>
        </div>

        <div className="flex-1 p-10 overflow-y-auto relative z-10">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl shadow-brand-slate-200/50 border border-brand-border min-h-[800px] p-12">
            {!draft ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-brand-muted space-y-4">
                <Sparkles size={48} className="text-brand-blue-200" />
                <h3 className="text-xl font-black text-brand-text">Canvas is Empty</h3>
                <p className="text-sm font-medium max-w-sm">Ask the assistant on the left to start researching or drafting your next big post.</p>
              </div>
            ) : (
              <div className="prose prose-brand max-w-none">
                <textarea 
                  className="w-full h-full min-h-[700px] resize-none outline-none text-brand-text leading-relaxed font-medium"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default BloggerAssistant;
