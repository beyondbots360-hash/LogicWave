import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { mockBlogs } from '../lib/mockData';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Search, Globe, Zap, Eye, ArrowUpRight,
  ShieldCheck, BarChart2, Target, ChevronRight
} from 'lucide-react';

const scoreColor = (score) => {
  if (score >= 85) return { bar: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50' };
  if (score >= 65) return { bar: 'bg-amber-400',  text: 'text-amber-600',   bg: 'bg-amber-50'   };
  return               { bar: 'bg-red-400',    text: 'text-red-600',     bg: 'bg-red-50'     };
};

const tips = [
  { icon: Target,    title: 'Target Long-Tail Keywords', desc: 'Focus on "hire remote developers India UK" to capture niche, high-intent traffic.' },
  { icon: TrendingUp, title: 'Improve Internal Linking', desc: '2 of your posts have no internal links. Add at least 3 per post to boost crawlability.' },
  { icon: Globe,     title: 'Add Meta Descriptions', desc: 'Your draft post is missing a meta description. This directly impacts click-through rate.' },
  { icon: Zap,       title: 'Compress Hero Images', desc: 'Reduce page load time by compressing images — aim for under 100 KB each.' },
];

const SEOInsights = () => {
  const publishedBlogs = mockBlogs.filter(b => b.status === 'Published');
  const avgSEO = Math.round(mockBlogs.reduce((acc, b) => acc + b.seoScore, 0) / mockBlogs.length);
  const totalViews = mockBlogs.reduce((acc, b) => acc + (parseInt(b.views.replace(',', '')) || 0), 0);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-10 px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-2">Search Performance</p>
            <h1 className="font-display text-4xl font-black tracking-tighter">
              SEO <span className="text-brand-blue-500">Insights.</span>
            </h1>
          </div>
          <Link to="/blog-dashboard" className="btn-outline h-12 flex items-center gap-2">
            <BarChart2 size={18} /> Back to Blog Dashboard
          </Link>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Avg. SEO Score',   value: avgSEO,              icon: ShieldCheck, color: 'text-brand-blue-500', bg: 'bg-brand-blue-50' },
            { label: 'Total Views',      value: totalViews.toLocaleString(), icon: Eye,        color: 'text-emerald-500', bg: 'bg-emerald-50'     },
            { label: 'Published Posts',  value: publishedBlogs.length, icon: Globe,       color: 'text-amber-500',   bg: 'bg-amber-50'       },
            { label: 'Avg. CTR',         value: '3.0%',              icon: TrendingUp,  color: 'text-purple-500',  bg: 'bg-purple-50'      },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-[28px] border border-brand-border p-6 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center ${s.color} shrink-0`}>
                <s.icon size={22} />
              </div>
              <div>
                <p className="font-display text-2xl font-black text-brand-text leading-none">{s.value}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mt-1">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Per-Post SEO Breakdown */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display font-black text-2xl mb-4">Post Performance</h2>
            {mockBlogs.map((blog, i) => {
              const sc = scoreColor(blog.seoScore);
              return (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[28px] border border-brand-border p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-brand-text truncate mb-1">{blog.title}</p>
                      <p className="text-[10px] font-bold text-brand-muted uppercase">/{blog.slug}</p>
                    </div>
                    <span className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      blog.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-slate-100 text-brand-muted'
                    }`}>{blog.status}</span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {/* SEO Score */}
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-brand-muted mb-2">SEO Score</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-brand-border rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${blog.seoScore}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className={`h-full rounded-full ${sc.bar}`}
                          />
                        </div>
                        <span className={`text-xs font-black ${sc.text}`}>{blog.seoScore}</span>
                      </div>
                    </div>
                    {/* Views */}
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-brand-muted mb-1">Views</p>
                      <p className="font-bold text-sm text-brand-text flex items-center gap-1">
                        <Eye size={13} className="text-brand-blue-500" /> {blog.views}
                      </p>
                    </div>
                    {/* CTR */}
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-brand-muted mb-1">CTR</p>
                      <p className="font-bold text-sm text-brand-text flex items-center gap-1">
                        <ArrowUpRight size={13} className="text-emerald-500" /> {blog.ctr}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Actionable Tips */}
          <div>
            <h2 className="font-display font-black text-2xl mb-4">Recommendations</h2>
            <div className="space-y-4">
              {tips.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[24px] border border-brand-border p-6 hover:border-brand-blue-500/30 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue-50 flex items-center justify-center text-brand-blue-500 shrink-0 group-hover:bg-brand-blue-500 group-hover:text-white transition-all">
                      <tip.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-brand-text mb-1">{tip.title}</p>
                      <p className="text-xs text-brand-muted leading-relaxed">{tip.desc}</p>
                    </div>
                    <ChevronRight size={16} className="text-brand-muted shrink-0 group-hover:text-brand-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Keyword Research CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 bg-brand-blue-500 rounded-[24px] p-6 text-white"
            >
              <Search size={28} className="mb-4 opacity-80" />
              <h3 className="font-display font-black text-lg mb-2">Keyword Planner</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-4">
                Discover high-value keywords for the UK–India HR niche.
              </p>
              <button className="w-full py-3 bg-white text-brand-blue-600 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-brand-blue-50 transition-all">
                Coming Soon
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SEOInsights;
