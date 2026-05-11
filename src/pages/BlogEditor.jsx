import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Save, Eye, ArrowLeft, List, Link as LinkIcon,
  Settings, ShieldCheck, CheckCircle,
  Send, Bot, Sparkles, Search, LayoutTemplate,
  Image as ImageIcon, CheckCircle2, PanelLeftClose, PanelLeftOpen
} from 'lucide-react';
import PinVerificationModal from '../components/auth/PinVerificationModal';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

/* ── Inline SVG icons for stability ── */
const BoldIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>
);
const ItalicIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
);
const BarChart3 = ({ size = 12, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 3v18h18"/><path d="M7 16h3"/><path d="M7 11h7"/><path d="M7 6h10"/></svg>
);

const BlogEditor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const openAI = searchParams.get('ai') === 'true';
  const { user, profile } = useAuth();

  // ── Editor State ──
  const [activeTab, setActiveTab] = useState('editor');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Global Payroll');
  // eslint-disable-next-line no-unused-vars
  const [metaDesc, setMetaDesc] = useState('');
  const [keywords, setKeywords] = useState('');

  // ── AI Panel State ──
  const [aiUnlocked, setAiUnlocked] = useState(false);
  const [showPinModal, setShowPinModal] = useState(openAI);
  const [aiOpen, setAiOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'assistant', text: "Hello! I'm your AI Co-Pilot. Ask me to research topics, draft content, or suggest SEO metadata." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [aiDraft, setAiDraft] = useState('');
  const [reviewStatus, setReviewStatus] = useState('Draft');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSeoLoading, setIsSeoLoading] = useState(false);
  const [seoAnalysis, setSeoAnalysis] = useState(null); // { score, suggestions, missingKeywords }

  // ── Handlers ──
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (!slug || slug === title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')) {
      setSlug(e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
    }
  };

  const handleAiSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isAiLoading) return;

    const userMessage = { id: Date.now(), type: 'user', text: inputValue };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInputValue('');
    setIsAiLoading(true);

    try {
      // Prepare history for OpenAI (standard GPT format)
      const chatHistory = newMessages.map(m => ({
        role: m.type === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const { data, error } = await supabase.functions.invoke('ai-blog-helper', {
        body: { 
          messages: chatHistory,
          type: 'draft' 
        }
      });

      if (error) throw error;

      const aiText = data.choices[0].message.content;
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1, 
        type: 'assistant',
        text: "I've generated a draft for you. Click 'Apply to Editor' to use it.",
        hasDraft: true
      }]);
      
      setAiDraft(aiText);
    } catch (err) {
      console.error('AI Error:', err);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'assistant',
        text: "Sorry, I encountered an error. Please make sure your OpenAI API key is set in Supabase secrets."
      }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleApplyToEditor = () => {
    if (!aiDraft) return;
    const lines = aiDraft.split('\n');
    const extractedTitle = lines[0]?.replace(/^#+\s*/, '') || '';
    const extractedContent = lines.slice(1).join('\n').trim();
    setTitle(extractedTitle);
    setContent(extractedContent);
    setSlug(extractedTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
    setMessages(prev => [...prev, {
      id: Date.now(), type: 'assistant',
      text: '✅ Draft applied to the editor! You can now refine it and configure SEO settings on the right panel.'
    }]);
  };

  const handleSubmitReview = async () => {
    setReviewStatus('Saving...');
    try {
      const { error } = await supabase.from('blogs').insert([{
        title,
        content,
        slug,
        category,
        keywords,
        meta_description: metaDesc,
        seo_score: seoAnalysis?.score || 0,
        status: 'pending',
        author_id: user?.id,
        author_name: profile?.full_name || 'Blogger'
      }]);
      
      if (error) throw error;
      
      setReviewStatus('Pending Approval');
      setMessages(prev => [...prev, {
        id: Date.now(), type: 'assistant',
        text: '📨 Blog submitted to Admin for review. You\'ll be notified when it\'s approved.'
      }]);
    } catch (error) {
      console.error('Error saving blog:', error.message);
      setReviewStatus('Draft');
      alert('Failed to submit blog. Please try again.');
    }
  };

  const seoChecklist = [
    { label: 'Focus keyword in title', status: title.toLowerCase().includes((keywords.split(',')[0] || '').trim().toLowerCase()) && keywords ? 'success' : 'pending' },
    { label: 'Slug contains keyword', status: slug.includes((keywords.split(',')[0] || '').trim().toLowerCase()) && keywords ? 'success' : 'pending' },
    { label: 'Meta description length', status: metaDesc.length > 50 && metaDesc.length < 160 ? 'success' : metaDesc.length === 0 ? 'pending' : 'warning' },
    { label: 'Content length (min 300 words)', status: content.split(' ').length > 300 ? 'success' : 'warning' },
    { label: 'Internal links included', status: content.includes('http') ? 'success' : 'warning' },
  ];

  const handleAnalyzeSeo = async () => {
    if (!content.trim() || isSeoLoading) return;
    
    setIsSeoLoading(true);
    setActiveTab('seo'); // Switch to SEO tab to show results

    try {
      const { data, error } = await supabase.functions.invoke('ai-blog-helper', {
        body: {
          type: 'seo_analyze',
          messages: [
            { 
              role: 'user', 
              content: `Analyze this blog post for SEO. 
              Title: ${title}
              Keywords: ${keywords}
              Content: ${content}`
            }
          ]
        }
      });

      if (error) throw error;

      const analysis = JSON.parse(data.choices[0].message.content);
      setSeoAnalysis(analysis);
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'assistant',
        text: `🔍 I've finished your SEO Audit! Your score is ${analysis.score}/100. Check the SEO tab for specific tips.`
      }]);
    } catch (err) {
      console.error('SEO Audit Error:', err);
    } finally {
      setIsSeoLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto py-8 px-6">
        {/* ── Top Bar ── */}
        <header className="flex items-center justify-between mb-8 pb-6 border-b border-brand-border">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/blog-dashboard')} className="p-3 rounded-2xl bg-brand-slate-50 text-brand-muted hover:text-brand-text transition-all">
              <ArrowLeft size={20} />
            </button>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-1">Writing Studio</p>
              <h1 className="font-display text-2xl font-black text-brand-text truncate max-w-md">
                {title || 'Untitled Post'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* AI Toggle */}
            <button
              onClick={() => {
                if (!aiUnlocked) { setShowPinModal(true); return; }
                setAiOpen(prev => !prev);
              }}
              className={`h-11 px-5 flex items-center gap-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
                aiOpen && aiUnlocked
                  ? 'bg-brand-slate-900 text-white border-brand-slate-700 shadow-lg'
                  : 'bg-white text-brand-muted border-brand-border hover:border-brand-blue-300 hover:text-brand-blue-500'
              }`}
            >
              <Bot size={16} />
              {aiOpen && aiUnlocked ? <PanelLeftClose size={14} /> : <PanelLeftOpen size={14} />}
              AI Co-Pilot
            </button>
            <button className="btn-outline h-11 flex items-center gap-2 text-xs">
              <Eye size={16} /> Preview
            </button>
            {reviewStatus === 'Draft' ? (
              <button className="btn-primary h-11 flex items-center gap-2 px-6 text-xs" onClick={handleSubmitReview} disabled={!content.trim()}>
                <Save size={16} /> Submit for Review
              </button>
            ) : (
              <div className="flex items-center gap-2 px-5 py-2.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-full text-[10px] font-black uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                {reviewStatus}
              </div>
            )}
          </div>
        </header>

        {/* ── Main Layout: AI Panel + Editor + Settings ── */}
        <div className="flex gap-8">

          {/* ── LEFT: AI Chat Panel (collapsible) ── */}
          <AnimatePresence>
            {aiOpen && aiUnlocked && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 380, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="shrink-0 overflow-hidden"
              >
                <div className="w-[380px] h-[calc(100vh-200px)] flex flex-col bg-white rounded-[32px] border border-brand-border shadow-sm">
                  {/* Header */}
                  <div className="p-5 border-b border-brand-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-blue-50 flex items-center justify-center">
                        <Bot size={18} className="text-brand-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-brand-text">AI Co-Pilot</h3>
                        <p className="text-[9px] uppercase tracking-widest font-bold text-brand-muted">Powered by OpenClaw</p>
                      </div>
                    </div>
                    <Sparkles size={16} className="text-amber-400 animate-pulse" />
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
                    {messages.map((msg) => (
                      <div key={msg.id}>
                        <div className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[90%] rounded-2xl p-3.5 ${
                            msg.type === 'user'
                              ? 'bg-brand-blue-500 text-white rounded-tr-sm shadow-md'
                              : 'bg-brand-slate-50 text-brand-text rounded-tl-sm border border-brand-border'
                          }`}>
                            <p className="text-xs font-medium leading-relaxed">{msg.text}</p>
                          </div>
                        </div>
                        {msg.hasDraft && aiDraft && !isAiLoading && (
                          <motion.button
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={handleApplyToEditor}
                            className="mt-2 ml-1 flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all"
                          >
                            <CheckCircle2 size={14} /> Apply to Editor
                          </motion.button>
                        )}
                      </div>
                    ))}
                    
                    {isAiLoading && (
                      <div className="flex justify-start">
                        <div className="bg-brand-slate-50 border border-brand-border rounded-2xl rounded-tl-sm p-4 flex gap-1.5 items-center">
                          <span className="w-1.5 h-1.5 bg-brand-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-brand-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-brand-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Chips */}
                  <div className="px-4 py-3 border-t border-brand-border overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-hide">
                    {[
                      { icon: Search, label: 'Analyze SEO', action: handleAnalyzeSeo },
                      { icon: LayoutTemplate, label: 'Draft Post', action: () => setInputValue('Write a blog post about...') },
                      { icon: ImageIcon, label: 'Gen Image', action: () => setMessages(prev => [...prev, { id: Date.now(), type: 'assistant', text: "Image generation is coming soon!" }]) },
                    ].map(chip => (
                      <button 
                        key={chip.label} 
                        onClick={chip.action}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-slate-50 border border-brand-border rounded-full text-[10px] font-bold text-brand-muted hover:text-brand-blue-500 hover:border-brand-blue-200 transition-colors"
                      >
                        <chip.icon size={12} /> {chip.label}
                      </button>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-brand-border">
                    <form onSubmit={handleAiSend} className="relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={isAiLoading ? "Thinking..." : "Ask the co-pilot..."}
                        disabled={isAiLoading}
                        className="w-full pl-4 pr-12 py-3 bg-brand-slate-50 border border-brand-border rounded-xl focus:border-brand-blue-500 focus:ring-2 focus:ring-brand-blue-500/10 outline-none transition-all text-xs font-medium text-brand-text disabled:opacity-50"
                      />
                      <button type="submit" disabled={!inputValue.trim() || isAiLoading} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-blue-500 text-white rounded-lg hover:bg-brand-blue-600 disabled:opacity-40 transition-all">
                        <Send size={14} />
                      </button>
                    </form>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* ── CENTER: Writing Area ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-[32px] border border-brand-border p-10 shadow-sm min-h-[calc(100vh-200px)] flex flex-col">
              <input
                type="text"
                placeholder="Enter a catchy title..."
                className="w-full text-3xl font-display font-black text-brand-text placeholder:text-brand-slate-200 border-none focus:outline-none mb-6"
                value={title}
                onChange={handleTitleChange}
              />

              {/* Toolbar */}
              <div className="flex items-center gap-1.5 mb-6 p-1.5 bg-brand-slate-50 rounded-xl w-fit">
                <button className="p-2 rounded-lg hover:bg-white text-brand-muted hover:text-brand-blue-500 transition-all"><BoldIcon size={16} /></button>
                <button className="p-2 rounded-lg hover:bg-white text-brand-muted hover:text-brand-blue-500 transition-all"><ItalicIcon size={16} /></button>
                <button className="p-2 rounded-lg hover:bg-white text-brand-muted hover:text-brand-blue-500 transition-all"><List size={16} /></button>
                <button className="p-2 rounded-lg hover:bg-white text-brand-muted hover:text-brand-blue-500 transition-all"><LinkIcon size={16} /></button>
                <div className="w-px h-5 bg-brand-border mx-1" />
                <button className="p-2 rounded-lg hover:bg-white text-brand-muted hover:text-brand-blue-500 transition-all flex items-center gap-1.5 text-[10px] font-bold">
                  <ImageIcon size={16} /> Image
                </button>
              </div>

              <textarea
                placeholder="Start writing your masterpiece..."
                className="w-full flex-1 text-base text-brand-text placeholder:text-brand-slate-300 border-none focus:outline-none resize-none leading-relaxed"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          {/* ── RIGHT: Settings / SEO Panel ── */}
          <div className="w-[300px] shrink-0 space-y-6">
            {/* Tabs */}
            <div className="flex p-1 bg-brand-slate-100 rounded-2xl">
              <button
                onClick={() => setActiveTab('editor')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === 'editor' ? 'bg-white text-brand-blue-500 shadow-sm' : 'text-brand-muted'
                }`}
              >
                <Settings size={12} /> Settings
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === 'seo' ? 'bg-white text-brand-blue-500 shadow-sm' : 'text-brand-muted'
                }`}
              >
                <ShieldCheck size={12} /> SEO
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'editor' ? (
                <motion.div key="settings" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} className="space-y-5">
                  {/* Permalink */}
                  <div className="bg-white p-6 rounded-[24px] border border-brand-border shadow-sm">
                    <h3 className="font-display font-black text-sm text-brand-text mb-4">Permalink</h3>
                    <label className="text-[9px] font-black uppercase tracking-widest text-brand-muted block mb-1.5">URL Slug</label>
                    <div className="flex items-center bg-brand-slate-50 rounded-xl px-3 border border-brand-border focus-within:border-brand-blue-500 transition-all">
                      <span className="text-brand-muted text-[10px] font-bold select-none">/blog/</span>
                      <input type="text" className="flex-1 bg-transparent border-none py-2.5 text-[11px] font-bold text-brand-text focus:outline-none" value={slug} onChange={(e) => setSlug(e.target.value)} />
                    </div>
                  </div>
                  {/* Category */}
                  <div className="bg-white p-6 rounded-[24px] border border-brand-border shadow-sm">
                    <h3 className="font-display font-black text-sm text-brand-text mb-4">Post Details</h3>
                    <label className="text-[9px] font-black uppercase tracking-widest text-brand-muted block mb-1.5">Category</label>
                    <select 
                      className="w-full bg-brand-slate-50 border border-brand-border rounded-xl py-2.5 px-3 text-[11px] font-bold text-brand-text focus:outline-none focus:border-brand-blue-500"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Global Payroll</option>
                      <option>Remote Hiring</option>
                      <option>UK-India Trade</option>
                      <option>HR Technology</option>
                    </select>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="seo" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} className="space-y-5">
                  {/* SEO Engine */}
                  <div className="bg-white p-6 rounded-[24px] border border-brand-border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-black text-sm text-brand-text">SEO Engine</h3>
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-brand-blue-50 rounded-full text-brand-blue-500">
                        <BarChart3 size={10} />
                        <span className="text-[9px] font-black tracking-widest uppercase">
                          Score: {isSeoLoading ? '...' : (seoAnalysis?.score || '0')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <button 
                        onClick={handleAnalyzeSeo}
                        disabled={isSeoLoading || !content}
                        className="w-full py-3 bg-brand-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isSeoLoading ? (
                          <span className="flex gap-1">
                            <span className="w-1 h-1 bg-white rounded-full animate-bounce" />
                            <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                          </span>
                        ) : (
                          <>
                            <Sparkles size={14} className="text-amber-400" />
                            Run AI Audit
                          </>
                        )}
                      </button>

                      <div>
                        <label className="text-[9px] font-black uppercase tracking-widest text-brand-muted block mb-1.5">Focus Keywords</label>
                        <input type="text" placeholder="e.g. Remote Hiring, India Payroll" className="input-field !text-[11px] font-bold !py-2.5" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* AI Suggestions Panel */}
                  {seoAnalysis && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-brand-blue-50/50 p-6 rounded-[24px] border border-brand-blue-100"
                    >
                      <h3 className="font-display font-black text-sm text-brand-blue-900 mb-3 flex items-center gap-2">
                        <Bot size={16} /> AI Insights
                      </h3>
                      <div className="space-y-3">
                        {seoAnalysis.suggestions.map((s, i) => (
                          <div key={i} className="flex gap-2">
                            <div className="w-1 h-1 rounded-full bg-brand-blue-400 mt-1.5 shrink-0" />
                            <p className="text-[10px] font-medium text-brand-blue-800 leading-relaxed">{s}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-brand-blue-100">
                        <p className="text-[9px] font-black text-brand-blue-400 uppercase tracking-widest mb-2">Try adding:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {seoAnalysis.missingKeywords.map((kw, i) => (
                            <span key={i} className="px-2 py-1 bg-white border border-brand-blue-200 rounded-md text-[9px] font-bold text-brand-blue-600">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* SEO Checklist */}
                  <div className="bg-white p-6 rounded-[24px] border border-brand-border shadow-sm">
                    <h3 className="font-display font-black text-sm text-brand-text mb-4">SEO Checklist</h3>
                    <ul className="space-y-3">
                      {seoChecklist.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className={`shrink-0 mt-0.5 ${item.status === 'success' ? 'text-emerald-500' : item.status === 'warning' ? 'text-amber-500' : 'text-brand-slate-300'}`}>
                            {item.status === 'success' ? <CheckCircle size={14} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />}
                          </div>
                          <span className={`text-[11px] font-bold ${item.status === 'pending' ? 'text-brand-muted' : 'text-brand-text'}`}>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* PIN Modal */}
      <PinVerificationModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSuccess={() => {
          setShowPinModal(false);
          setAiUnlocked(true);
          setAiOpen(true);
        }}
      />
    </Layout>
  );
};

export default BlogEditor;
