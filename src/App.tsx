/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, ChevronDown, Check, Video, Image, FileText, ChevronRight, Lock, Cloud, MessageSquare, Award, ArrowRight } from 'lucide-react';
import InteractiveWidget from './components/InteractiveWidget';
import PricingTable from './components/PricingTable';
import CheckoutModal from './components/CheckoutModal';
import PurchaseNotifications from './components/PurchaseNotifications';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
  highlight: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Jenkins',
    role: 'Lead Brand Director • GrowthLabs Enterprise',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    text: 'Upgrading our team workspace to Canva Pro has easily saved our creative staff 15+ hours of visual clutter and sizing templates every single week. In 1-click we rebrand complex campaigns for 12 social formats simultaneously. The ₹199 license payed for itself in the first week.',
    rating: 5,
    highlight: 'Saved 15 hours every single week!'
  },
  {
    name: 'Marcus Vance',
    role: 'Principal Digital Creator & Solopreneur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    text: 'Having millions of premium model pictures, high-res layouts, and royalty-free music clips inside a single hub changed how I launch YouTube hooks and courses. The Magic BG Remover is practically pure sorcery on hair edges.',
    rating: 5,
    highlight: 'Absolute game-changer for digital content creator streams'
  },
  {
    name: 'Elena Rostova',
    role: 'Creative Consultant • Studio Rostova',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    text: 'Client branding used to require maintaining multiple heavy files. Now, with up to 100 Brand Kits in Canva Pro, I easily swap customer colors and premium fonts on a workspace template in real-time while screen-sharing with clients.',
    rating: 5,
    highlight: 'Up to 100 distinct Brand Kits at my fingertips'
  }
];

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is included in the Canva Pro ₹199/month subscription?',
    answer: 'With Canva Pro, you get full, unlimited access to over 100 million premium photos, audio clips, videos, and graphic kits. Additionally, you unlock AI-led design utilities like Magic Eraser, Automatic Background Eraser, 1-Click Brand Kits (for up to 100 brands), Magic Resize overlays, transparent file export support, and 1TB of highly secured cloud space.'
  },
  {
    id: 'faq-2',
    question: 'How does the 14-day free trial authorization work?',
    answer: 'You can start completely free for 14 days. We authorize your account credentials to make sure you have instant unrestricted access to Canva Pro. If you do not intend to extend your creative package, simply downgrade anytime with one click in your account settings—no questions asked, no transaction fees.'
  },
  {
    id: 'faq-3',
    question: 'Can I swap between India (INR) pricing and USD billing?',
    answer: 'Absolutely! Our adaptive billing system supports multi-currency options. For instance, you can easily shift to ₹199/month for individual local cards, or select the standard $199/year recurring rate for global corporate licenses.'
  },
  {
    id: 'faq-4',
    question: 'Can I cancel or downgrade my licensing subscription plan?',
    answer: 'There are no tricky contracts or termination locks. You can modify, cancel, or suspend your Canva Pro credentials directly from your Billings workspace page. Revert back to the Canva Free layout and still retain standard free templates whenever you desire.'
  }
];

export default function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutPrice, setCheckoutPrice] = useState(199);
  const [checkoutCurrency, setCheckoutCurrency] = useState('₹');
  const [checkoutPeriod, setCheckoutPeriod] = useState('Lifetime Access');
  const [activeFAQ, setActiveFAQ] = useState<string | null>('faq-1');
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 45 });

  useEffect(() => {
    const storageKey = 'canva_pro_lifetime_promo_end';
    let endTimeStr = localStorage.getItem(storageKey);
    let endTimeObj: Date;

    if (!endTimeStr) {
      const now = new Date();
      const targetTime = now.getTime() + (2 * 60 * 60 + 14 * 60 + 45) * 1000;
      endTimeObj = new Date(targetTime);
      localStorage.setItem(storageKey, endTimeObj.toISOString());
    } else {
      endTimeObj = new Date(endTimeStr);
      if (endTimeObj.getTime() < Date.now()) {
        const now = new Date();
        const targetTime = now.getTime() + (2 * 60 * 60 + 14 * 60 + 45) * 1000;
        endTimeObj = new Date(targetTime);
        localStorage.setItem(storageKey, endTimeObj.toISOString());
      }
    }

    const interval = setInterval(() => {
      const diff = endTimeObj.getTime() - Date.now();
      if (diff <= 0) {
        const now = new Date();
        const targetTime = now.getTime() + (2 * 60 * 60 + 14 * 60 + 45) * 1000;
        endTimeObj = new Date(targetTime);
        localStorage.setItem(storageKey, endTimeObj.toISOString());
        setTimeLeft({ hours: 2, minutes: 14, seconds: 45 });
      } else {
        const totalSecs = Math.floor(diff / 1000);
        const h = Math.floor(totalSecs / 3600);
        const m = Math.floor((totalSecs % 3600) / 60);
        const s = totalSecs % 60;
        setTimeLeft({ hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLaunchCheckout = (price: number, currency: string, period: string) => {
    setCheckoutPrice(price);
    setCheckoutCurrency(currency);
    setCheckoutPeriod(period);
    setCheckoutOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between selection:bg-purple-100 selection:text-canva-purple" id="app-root">
      
      {/* Main Page Layout Container */}
      <main className="flex-1 pb-16">
        
        {/* HERO SECTION */}
        <section className="relative pt-8 md:pt-14 pb-16 px-6 overflow-hidden bg-radial from-white via-slate-50 to-slate-50" id="hero-section">
          {/* Dynamic Limited-Time Offer Countdown Timer instead of the branding */}
          <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center mb-10 text-center" id="hero-brand-top">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-[10px] sm:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-2 mb-3 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
              <span>🚨 EXCLUSIVE ONE-TIME FLASH DEAL AVAILABLE 🚨</span>
            </div>
            
            <p className="text-[10px] text-slate-400 font-extrabold mb-2 uppercase tracking-widest">
              LIFETIME SUCCESS LICENSES CONCLUDING IN
            </p>

            <div className="flex items-center justify-center gap-3 bg-white border border-slate-100 p-3 sm:p-4 rounded-xl shadow-xs px-6 sm:px-8 relative overflow-hidden" id="countdown-timer-container">
              {/* Highlight strip on the left */}
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-rose-500 to-pink-500" />
              
              <div className="flex flex-col items-center">
                <span className="font-mono text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-400 mt-0.5">Hours</span>
              </div>
              
              <span className="text-xl font-bold text-rose-300 animate-pulse">:</span>

              <div className="flex flex-col items-center">
                <span className="font-mono text-xl sm:text-2xl font-black text-rose-600 tracking-tight">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-400 mt-0.5">Mins</span>
              </div>

              <span className="text-xl font-bold text-rose-300 animate-pulse">:</span>

              <div className="flex flex-col items-center">
                <span className="font-mono text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-400 mt-0.5">Secs</span>
              </div>

              <div className="ml-3 pl-3 sm:ml-4 sm:pl-4 border-l border-slate-100 flex flex-col items-start text-left shrink-0">
                <span className="text-emerald-600 font-extrabold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  97% OFF
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-tight mt-1 flex flex-col">
                  <span>Was: <del className="text-slate-300 font-normal">₹6,999/yr</del></span>
                  <span className="text-slate-800 font-black">Now: ₹199 Only</span>
                </span>
              </div>
            </div>
          </div>
          {/* Visual absolute vectors floating */}
          <div className="absolute top-20 left-10 w-24 h-24 bg-purple-500/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-36 h-36 bg-cyan-500/5 blur-3xl pointer-events-none" />

          <div className="w-full max-w-6xl mx-auto text-center space-y-8 relative">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/8 to-pink-500/8 text-canva-purple px-4 py-1.5 rounded-full text-xs font-extrabold shadow-xs">
              <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>ACTIVATE CANVA PRO ₹199 LIFETIME</span>
            </div>

            {/* Giant Title display font */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] font-display max-w-4xl mx-auto">
              Design anything. Publish everywhere. Let <span className="canva-gradient-text">Canva Pro</span> do the work.
            </h1>

            <p className="text-slate-600 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
              Step into the fast lane. Unlock high-fidelity templates, AI-driven magic resizing tools, background erasers, and brand kits. A 1-year subscription to Canva Pro costs <span className="line-through font-medium text-slate-400">₹6,999</span> — claim lifetime access now for only <span className="text-[#e8472a] font-black">₹199 only</span>!
            </p>

            {/* Twin Conversion Call-to-Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4" id="hero-ctas">
              <button
                id="btn-hero-subscribe"
                onClick={() => handleLaunchCheckout(199, '₹', 'Lifetime Access')}
                className="cursor-pointer w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-extrabold text-white canva-gradient-bg shadow-lg hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Activate Canva Pro • ₹199 Lifetime</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Premium Selected Purchase Option Box */}
            <div className="w-full max-w-md mx-auto bg-white border border-rose-200/80 p-4 sm:p-5 rounded-2xl shadow-sm text-left relative overflow-hidden transition-all hover:border-rose-300 mt-6" id="hero-purchase-option-info-box">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500" />
              
              <div className="flex items-center justify-between mb-3" id="purchase-option-header">
                <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-rose-600 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  Purchase Option Selected
                </span>
                <span className="text-[9px] sm:text-[10px] bg-rose-50 text-rose-600 px-2.5 py-0.5 rounded-full font-bold">
                  97% Flash Discount
                </span>
              </div>
              
              <div className="flex items-start justify-between gap-3" id="purchase-option-details">
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight">Canva Pro Lifetime Package</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Instant, unlimited cloud activation to 100M+ templates and brand design kits.</p>
                </div>
                <div className="text-right shrink-0" id="purchase-option-pricing">
                  <div className="text-lg sm:text-xl font-black text-[#e8472a]">₹199</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400 line-through font-semibold">₹6,999/yr</div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-slate-400 font-medium" id="purchase-option-benefits">
                <span className="flex items-center gap-1 text-slate-500">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  No recurring charges (One-Time)
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  Instant activation link
                </span>
              </div>
            </div>

            {/* Minimalist Grid floating item badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-3xl mx-auto text-left" id="hero-badges-deck">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-canva-purple flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">100M+ Assets</div>
                  <div className="text-[10px] text-slate-400">Photos, vectors & videos</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                  <Image className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">Magic AI</div>
                  <div className="text-[10px] text-slate-400">1-Click BG Erasing</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">Brand Kit</div>
                  <div className="text-[10px] text-slate-400 font-medium">Auto color swap</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">1TB Storage</div>
                  <div className="text-[10px] text-slate-400">Expansive workspace space</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEMO CONTAINER GRAPHICS */}
        <section className="px-6 py-6" id="app-interactive-demo">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-display">Experience absolute creative superpowers</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">Explore features that turn layout creation into high-speed creative production.</p>
          </div>
          <InteractiveWidget />
        </section>

        {/* PRICING GRID SECTION */}
        <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100" id="pricing-section">
          <div className="text-center space-y-4 mb-16 px-4">
            <div className="inline-block bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Flexible & Fair Subscriptions
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
              Unpack plans that fit <span className="canva-gradient-text">your ambition</span>.
            </h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto font-medium">
              Start with free drafts. Upgrade to <strong className="text-slate-800">Canva Pro for just ₹199 Lifetime</strong> (standard 1-year subscription costs <span className="line-through text-slate-400">₹6,999</span>) and unlock all premium templates.
            </p>
          </div>

          <PricingTable onSubscribe={handleLaunchCheckout} />
        </section>

        {/* TRUST BANNER - TESTIMONIALS */}
        <section className="py-16 px-6 max-w-6xl mx-auto" id="testimonials-section">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-extrabold font-display text-slate-900">Validated by creative teams worldwide</h3>
              <p className="text-slate-500 text-sm">See how designers, students, and businesses upgrade design operations.</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold bg-amber-50 px-3.5 py-1.5 rounded-xl">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
              <span>4.9 / 5.0 Core rating based on 1.2M user surveys</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="testimonials-grid">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                id={`testimonial-card-${idx}`}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Rating star panel */}
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <strong className="text-slate-900 text-sm font-bold block">{t.highlight}</strong>
                  <p className="text-slate-600 text-xs leading-relaxed italic">"{t.text}"</p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-slate-100/80 mt-6">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border-2 border-purple-100"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{t.name}</h5>
                    <p className="text-[10px] text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FREQUENT ACCORDION QUESTIONS */}
        <section className="py-16 md:py-20 px-6 bg-slate-50 border-t border-slate-100" id="faq-section">
          <div className="w-full max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display">Frequently asked questions</h2>
              <p className="text-slate-500 text-sm">Need details on billing, permissions, or plan sharing? We have answers.</p>
            </div>

            <div className="space-y-3" id="faq-accordion-group">
              {FAQS.map((faq) => {
                const isExpanded = activeFAQ === faq.id;
                return (
                  <div
                    key={faq.id}
                    id={faq.id}
                    className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300"
                  >
                    <button
                      id={`btn-faq-toggle-${faq.id}`}
                      onClick={() => setActiveFAQ(isExpanded ? null : faq.id)}
                      className="cursor-pointer w-full text-left px-6 py-4.5 flex items-center justify-between text-slate-900 font-semibold gap-4 hover:bg-slate-50"
                    >
                      <span className="text-sm md:text-base">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-canva-purple' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-5 pt-1 text-slate-600 text-xs leading-relaxed border-t border-slate-50">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* INTUITIVE BLUEPRINT CONVERSION BOX */}
        <section className="px-6 py-8" id="pre-footer-cta">
          <div className="w-full max-w-5xl mx-auto rounded-3xl canva-gradient-bg p-8 md:p-12 text-white text-center space-y-6 relative overflow-hidden shadow-xl">
            {/* Visual background lights */}
            <div className="absolute top-0 left-0 w-60 h-60 bg-white/5 rounded-full filter blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-900/10 rounded-full filter blur-3xl pointer-events-none" />

            <div className="space-y-3 relative">
              <h3 className="font-display text-3xl md:text-4xl font-extrabold leading-none">Ready to unleash your absolute visual voice?</h3>
              <p className="text-sm sm:text-base text-purple-100 max-w-xl mx-auto">
                Join Sarah, Marcus, and million other creative leads. Claim your Canva Pro license setup for just <strong>₹199 for Lifetime Access</strong>.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 relative">
              <button
                id="btn-pre-footer-subscribe"
                onClick={() => handleLaunchCheckout(199, '₹', 'Lifetime Access')}
                className="cursor-pointer w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-4 px-8 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Get Lifetime Access Now</span>
                <Sparkles className="w-4.5 h-4.5 text-pink-300 animate-bounce" />
              </button>
              
              <button
                id="btn-pre-footer-pricing"
                onClick={() => scrollToSection('pricing-section')}
                className="cursor-pointer w-full sm:w-auto bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold py-4 px-8 rounded-xl text-sm transition-all"
              >
                View Pricing Details
              </button>
            </div>

            <p className="text-[10px] text-purple-200 mt-2 relative">No recurring fees or hidden subscriptions. Enjoy standard and vector templates forever.</p>
          </div>
        </section>
      </main>

      {/* Visual Footnotes Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-850 text-xs" id="app-footer">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-display text-white text-lg font-black tracking-wide">
              <div className="w-7 h-7 rounded-lg canva-gradient-bg flex items-center justify-center text-white font-extrabold text-xs">
                C
              </div>
              <span>Canva Pro</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Simulated, highly polished subscription workspace built as an interactive showcase, highlighting key Pro conversions for $199 USD.
            </p>
          </div>

          <div className="space-y-3">
            <h6 className="text-[11px] font-bold uppercase tracking-wider text-white">Interactive Modules</h6>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => scrollToSection('demo-section')} className="hover:text-white cursor-pointer block">Background Eraser</button></li>
              <li><button onClick={() => scrollToSection('demo-section')} className="hover:text-white cursor-pointer block">Instant Brand Swapper</button></li>
              <li><button onClick={() => scrollToSection('demo-section')} className="hover:text-white cursor-pointer block">Magic Layout Sizer</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h6 className="text-[11px] font-bold uppercase tracking-wider text-white">Design Resources</h6>
            <ul className="space-y-2 text-[11px]">
              <li><span className="opacity-60 block">100M+ Premium Stock Assets</span></li>
              <li><span className="opacity-60 block">Up to 100 Brand Directories</span></li>
              <li><span className="opacity-60 block">Standard & Vector Typographies</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h6 className="text-[11px] font-bold uppercase tracking-wider text-white">Trust Assurance</h6>
            <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 p-2.5 rounded-lg text-slate-300">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-[10px]">Licensed secure activation for metaminds098@gmail.com</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-snug">
              Guaranteed secure processing under industry security logs using 256bit bank layers.
            </p>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© 2026 Canva Pro Interactive Project. All rights reserved. Built with pride for designers globally.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 transition-colors">Privacy Workspace</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors">Cookie Configurations</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors">Security Laws</span>
          </div>
        </div>
      </footer>

      {/* Live purchase dynamic popups feed */}
      <PurchaseNotifications onTriggerCheckout={handleLaunchCheckout} />

      {/* Checkout overlay modal wizard component */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        selectedPlanPrice={checkoutPrice}
        selectedPlanCurrency={checkoutCurrency}
        selectedPlanPeriod={checkoutPeriod}
      />
    </div>
  );
}
