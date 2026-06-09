/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Image as ImageIcon, Sliders, RefreshCw, LayoutGrid, CheckCircle2, Copy } from 'lucide-react';
import { BrandTheme, TemplateSize } from '../types';

const BRAND_THEMES: BrandTheme[] = [
  {
    id: 'sunset-glow',
    name: 'Sunset Glow (Earthy)',
    primaryColor: '#F97316', // orange-500
    secondaryColor: '#FFEDD5', // orange-100
    accentColor: '#3F3F46', // zinc-700
    fontFamily: '"Outfit", sans-serif',
    logoShape: 'circle'
  },
  {
    id: 'neon-wave',
    name: 'Neon Wave (Modern Tech)',
    primaryColor: '#8B5CF6', // violet-500
    secondaryColor: '#06B6D4', // cyan-500
    accentColor: '#0F172A', // slate-900
    fontFamily: '"JetBrains Mono", monospace',
    logoShape: 'square'
  },
  {
    id: 'eco-breeze',
    name: 'Eco Breeze (Organic)',
    primaryColor: '#10B981', // emerald-500
    secondaryColor: '#ECFDF5', // emerald-501
    accentColor: '#064E3B', // emerald-900
    fontFamily: 'Georgia, serif',
    logoShape: 'triangle'
  },
  {
    id: 'pastel-dreams',
    name: 'Dreamy Pastel (Soft)',
    primaryColor: '#EC4899', // pink-500
    secondaryColor: '#FDF2F8', // pink-50
    accentColor: '#581C87', // purple-900
    fontFamily: '"Inter", sans-serif',
    logoShape: 'star'
  }
];

const TEMPLATE_SIZES: TemplateSize[] = [
  { name: 'Instagram Square', icon: '📱', width: 'w-64', height: 'h-64', aspect: '1/1' },
  { name: 'TikTok / Story', icon: '🎥', width: 'w-48', height: 'h-80', aspect: '9/16' },
  { name: 'YouTube Banner', icon: '📺', width: 'w-80', height: 'h-40', aspect: '16/9' }
];

export default function InteractiveWidget() {
  const [activeTab, setActiveTab] = useState<'remover' | 'brand' | 'resize'>('remover');
  
  // Background remover states
  const [sliderVal, setSliderVal] = useState<number>(50);
  const [isRemovingBG, setIsRemovingBG] = useState(false);

  // Brand Kit states
  const [selectedTheme, setSelectedTheme] = useState<BrandTheme>(BRAND_THEMES[0]);

  // Magic resize states
  const [selectedSize, setSelectedSize] = useState<TemplateSize>(TEMPLATE_SIZES[0]);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden bg-white shadow-xl border border-slate-100 mb-16" id="demo-section">
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-100 flex-wrap md:flex-nowrap bg-slate-50/50 p-2 gap-1">
        <button
          id="btn-tab-remover"
          onClick={() => setActiveTab('remover')}
          className={`flex-1 py-4 px-6 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'remover'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
          }`}
        >
          <Sparkles className={`w-4 h-4 ${activeTab === 'remover' ? 'text-canva-purple' : 'text-slate-400'}`} />
          <span>Magic Eraser / BG Remover</span>
          <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider scale-90">PRO</span>
        </button>

        <button
          id="btn-tab-brand"
          onClick={() => setActiveTab('brand')}
          className={`flex-1 py-4 px-6 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'brand'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
          }`}
        >
          <LayoutGrid className={`w-4 h-4 ${activeTab === 'brand' ? 'text-canva-purple' : 'text-slate-400'}`} />
          <span>1-Click Brand Kit Kit</span>
          <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider scale-90">PRO</span>
        </button>

        <button
          id="btn-tab-resize"
          onClick={() => setActiveTab('resize')}
          className={`flex-1 py-4 px-6 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'resize'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${activeTab === 'resize' ? 'text-canva-purple' : 'text-slate-400'}`} />
          <span>Magic Auto-Resize</span>
          <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider scale-90">PRO</span>
        </button>
      </div>

      {/* Widget Showcase Area */}
      <div className="p-6 md:p-10 bg-white">
        <AnimatePresence mode="wait">
          {activeTab === 'remover' && (
            <motion.div
              key="remover"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              id="widget-remover"
            >
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI-Powered Creative Tools
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
                  Erase busy backgrounds in <span className="canva-gradient-text">one swipe</span>.
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Isolate portraits, product photos, or objects flawlessly with high-precision AI. No green screens or tedious masking. Just click, swipe, and get transparent results.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-slate-700 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Automatic subject feathering and hair edge-detection</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Ideal for eCommerce catalogs, YouTube covers, and headshots</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="btn-remover-demo"
                    onClick={() => {
                      setIsRemovingBG(true);
                      setTimeout(() => {
                        setSliderVal(0);
                        setIsRemovingBG(false);
                      }, 1000);
                    }}
                    className="cursor-pointer bg-canva-purple text-white hover:opacity-90 px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    {isRemovingBG ? 'Processing Fine Edges...' : 'Auto-Remove Background'}
                  </button>
                </div>
              </div>

              {/* Slider Image Mask Interface */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-slate-100 bg-slate-900 select-none shadow-2xl">
                  {/* Checkerboard Transparent Background */}
                  <div 
                    className="absolute inset-0 bg-white" 
                    style={{ 
                      backgroundImage: 'radial-gradient(#e2e8f0 20%, transparent 20%), radial-gradient(#e2e8f0 20%, transparent 20%)',
                      backgroundSize: '16px 16px',
                      backgroundPosition: '0 0, 8px 8px'
                    }} 
                  />

                  {/* Cutout Portrait (Subject with Transparent BG) */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
                      alt="Subject portrait transparent mockup"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover rounded-xl filter select-none pointer-events-none"
                    />
                  </div>

                  {/* Dirty/Messy Backdrop Overlay */}
                  <div 
                    className="absolute inset-y-0 right-0 overflow-hidden"
                    style={{ left: `${sliderVal}%` }}
                  >
                    <div 
                      className="absolute inset-0 w-[448px] h-[448px] aspect-square flex items-center justify-center p-8 bg-slate-200"
                      style={{ 
                        transform: `translateX(-${sliderVal}%)`,
                        width: '448px'
                      }}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
                        alt="Subject portrait raw original"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover rounded-xl filter contrast-75 brightness-75 bg-amber-500 blur-sm brightness-95 select-none pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-linear-to-tr from-slate-900/60 to-slate-800/20 mix-blend-multiply rounded-xl m-8" />
                      <div className="absolute top-12 right-12 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-mono px-2.5 py-1 rounded-md tracking-wider">
                        ORIGINAL BACKDROP
                      </div>
                    </div>
                  </div>

                  {/* Left overlay badge */}
                  <div className="absolute top-4 left-4 bg-purple-600 border border-purple-400 text-white text-xs font-bold px-2.5 py-1 rounded-md tracking-wider shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-pink-300" />
                    BG REMOVED
                  </div>

                  {/* Interactive Slider Bar */}
                  <div 
                    className="absolute inset-y-0 w-1 bg-white hover:bg-purple-200 cursor-ew-resize flex items-center justify-center transition-all shadow-lg"
                    style={{ left: `${sliderVal}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-2xl border border-slate-200 text-xs font-bold font-mono">
                      ↔
                    </div>
                  </div>

                  {/* Invisible mouse event trigger for easy click-and-drag */}
                  <input 
                    id="slider-bg-remover"
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderVal} 
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
                  />
                </div>
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-400 font-medium">
                  <Sliders className="w-3.5 h-3.5 text-slate-500" />
                  <span>Drag the slider overlay to isolate the subject instantly</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'brand' && (
            <motion.div
              key="brand"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              id="widget-brand"
            >
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-1.5 bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-xs font-semibold">
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Your Brand Identity Unified
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
                  Instantly publish in <span className="canva-gradient-text font-bold">your brand assets</span>.
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Store your logos, custom brand fonts, and verified color palettes. Rebrand any flyer, social graphic, or presentation layout matching your brand identity system in one tap.
                </p>

                {/* Brand Kit Palettes Selector */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block">Select Brand Theme Preset</label>
                  <div className="grid grid-cols-2 gap-2" id="brand-theme-presets">
                    {BRAND_THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        id={`btn-brand-${theme.id}`}
                        onClick={() => setSelectedTheme(theme)}
                        className={`cursor-pointer text-left p-3 rounded-xl border transition-all duration-300 ${
                          selectedTheme.id === theme.id
                            ? 'border-purple-600 bg-purple-50/40 ring-1 ring-purple-600 shadow-sm'
                            : 'border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-700 truncate mb-1.5">{theme.name}</div>
                        <div className="flex gap-1">
                          <span className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: theme.primaryColor }} />
                          <span className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: theme.secondaryColor }} />
                          <span className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: theme.accentColor }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Brand Mockup Mock Template Cards */}
              <div className="lg:col-span-7 flex flex-col md:flex-row gap-4 items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                {/* Visual Document 1: Corporate Business Card */}
                <motion.div
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-full max-w-[280px] aspect-[1.586/1] rounded-xl p-5 shadow-lg flex flex-col justify-between transition-colors duration-500 text-white"
                  style={{
                    backgroundColor: selectedTheme.accentColor,
                    borderColor: selectedTheme.primaryColor,
                    borderWidth: '2px',
                    fontFamily: selectedTheme.fontFamily
                  }}
                  id="brand-doc-card"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-extrabold opacity-95">Metaminds Inc.</h4>
                      <p className="text-[9px] opacity-75 mt-0.5" style={{ color: selectedTheme.secondaryColor }}>Creative Studio</p>
                    </div>
                    {/* Render custom logo shapes dynamically */}
                    <motion.div 
                      key={selectedTheme.id}
                      initial={{ scale: 0.5, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-5 h-5 flex items-center justify-center shrink-0"
                      style={{ backgroundColor: selectedTheme.primaryColor, borderRadius: selectedTheme.logoShape === 'circle' ? '9999px' : selectedTheme.logoShape === 'square' ? '4px' : '0' }}
                    >
                      <Sparkles className="w-2.5 h-2.5 text-white animate-pulse" />
                    </motion.div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-bold tracking-wide">Alex Morgan</p>
                    <p className="text-[8px] opacity-75" style={{ color: selectedTheme.secondaryColor }}>Principal Brand Director</p>
                    <div className="pt-1.5 border-t border-white/10 flex justify-between text-[7px] opacity-60">
                      <span>metaminds@example.com</span>
                      <span>+1 555-0199</span>
                    </div>
                  </div>
                </motion.div>

                {/* Visual Document 2: Square Social Graphic */}
                <motion.div
                  animate={{ scale: 1 }}
                  className="w-full max-w-[240px] aspect-square rounded-xl p-5 shadow-lg flex flex-col justify-between transition-colors duration-500"
                  style={{
                    backgroundColor: selectedTheme.secondaryColor,
                    borderColor: 'rgba(0,0,0,0.02)',
                    borderWidth: '1px',
                    fontFamily: selectedTheme.fontFamily
                  }}
                  id="brand-doc-instagram"
                >
                  <div className="flex items-center gap-1.5 text-[9px] font-bold" style={{ color: selectedTheme.accentColor }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedTheme.primaryColor }} />
                    <span>DAILY INSPIRATION</span>
                  </div>

                  <div className="my-auto py-2">
                    <h5 className="text-[17px] font-extrabold leading-tight text-slate-900" style={{ color: selectedTheme.accentColor }}>
                      Good <span style={{ color: selectedTheme.primaryColor }}>design</span> is a language, not a styling strategy.
                    </h5>
                  </div>

                  <div className="flex justify-between items-center text-[8px] border-t pt-2" style={{ borderColor: `${selectedTheme.accentColor}20` }}>
                    <span className="font-bold opacity-80" style={{ color: selectedTheme.accentColor }}>@metaminds</span>
                    <span className="opacity-60" style={{ color: selectedTheme.accentColor }}>canva.com/pro</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'resize' && (
            <motion.div
              key="resize"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              id="widget-resize"
            >
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                  Instant Layout Adaptability
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
                  One layout. <span className="canva-gradient-text">Every social format</span>.
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Design once, then click to instantly resize for TikTok Stories, Instagram posts, Twitter banners, and YouTube thumbnails. Smart AI realigns typography and scaling dynamically.
                </p>

                {/* Aspect Ratio Size Buttons */}
                <div className="space-y-2 pt-2" id="resize-formats">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block">Choose Target Shape</label>
                  <div className="flex flex-col gap-1.5">
                    {TEMPLATE_SIZES.map((size) => (
                      <button
                        key={size.name}
                        id={`btn-resize-${size.name.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => setSelectedSize(size)}
                        className={`cursor-pointer w-full text-left py-3 px-4 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                          selectedSize.name === size.name
                            ? 'border-purple-600 bg-purple-50/50 text-slate-900 font-semibold'
                            : 'border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{size.icon}</span>
                          <span className="text-sm">{size.name}</span>
                        </div>
                        <span className="text-xs font-mono text-slate-400 font-normal">{size.aspect} size</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Elastic Scaler Representation */}
              <div className="lg:col-span-7 flex items-center justify-center p-8 bg-slate-950 rounded-2xl border border-slate-900 overflow-hidden min-h-[380px]">
                <motion.div
                  layout
                  transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                  className={`${selectedSize.width} ${selectedSize.height} bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 rounded-2xl shadow-2xl p-6 text-white flex flex-col justify-between border border-white/20 relative`}
                  id="resize-mock-document"
                >
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/10 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] font-bold font-mono text-purple-200">
                    <Sparkles className="w-2 h-2 text-pink-300 animate-pulse" />
                    AUTO SIZED
                  </div>

                  {/* Header/Brand Section inside Resizable canvas */}
                  <motion.div layout className="space-y-1">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-pink-400">Canva Masterclass</div>
                    <h6 className="text-[16px] md:text-[18px] font-extrabold leading-tight tracking-tight">AI Creative Superpowers</h6>
                  </motion.div>

                  {/* Graphic Representation changes dynamically */}
                  <motion.div layout className="my-auto py-3 shrink-0 flex justify-center">
                    <div className="relative flex items-center justify-center">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.05, 1],
                          rotate: [0, 5, -5, 0] 
                        }}
                        transition={{ repeat: Infinity, duration: 6 }}
                        className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/10"
                      >
                        <Sparkles className="w-6 h-6 text-pink-300" />
                      </motion.div>
                      <div className="absolute -top-1 -right-1 bg-teal-400 text-slate-950 rounded-full text-[9px] font-extrabold px-1.5 py-0.5 rotate-12">
                        LIVE!
                      </div>
                    </div>
                  </motion.div>

                  {/* Footer CTA inside resizable canvas */}
                  <motion.div layout className="mt-auto space-y-1 pt-1 border-t border-white/10">
                    <div className="text-[8px] opacity-70">Monday, June 8 • 4:00 PM EST</div>
                    <div className="text-[9px] text-teal-300 font-bold tracking-wide">Register at canva.com/learn</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
