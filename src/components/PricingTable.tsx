/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, HelpCircle, Shield, Star, Users, Zap } from 'lucide-react';

interface PricingTableProps {
  onSubscribe: (price: number, currency: string, period: string) => void;
}

export default function PricingTable({ onSubscribe }: PricingTableProps) {
  const [billingCycle, setBillingCycle] = useState<'yearly' | 'monthly'>('monthly');
  const [currency, setCurrency] = useState<'USD' | 'INR' | 'EUR'>('INR');

  // Plan Prices Map
  const prices = {
    USD: {
      free: 0,
      pro: 199,
      teams: 499,
      symbol: '$',
      periodSuffix: 'One-Time Payment, Lifetime Access',
      periodLabel: ' Lifetime',
    },
    INR: {
      free: 0,
      pro: 199,
      teams: 999,
      symbol: '₹',
      periodSuffix: 'One-Time Payment, Lifetime Access',
      periodLabel: ' Lifetime',
    },
    EUR: {
      free: 0,
      pro: 199,
      teams: 499,
      symbol: '€',
      periodSuffix: 'One-Time Payment, Lifetime Access',
      periodLabel: ' Lifetime',
    },
  };

  const currentPrices = prices[currency];

  const plans = [
    {
      id: 'pro',
      name: 'Canva Pro',
      description: 'Value ₹6,999/yr — Claim complete high-fidelity libraries, Magic AI, and background erasers forever.',
      price: currentPrices.pro,
      symbol: currentPrices.symbol,
      period: currentPrices.periodLabel,
      periodSuffix: currentPrices.periodSuffix,
      features: [
        '100+ million premium photos, audio & videos',
        '610,000+ premium vector templates with daily updates',
        'Background Remover / Magic AI Object Eraser',
        'Up to 100 Brand Kits with unique color schemes & assets',
        'Magic Auto-Resize layout configurations',
        'Download premium designs with transparent backdrops',
        '1TB of dedicated highly-secure cloud storage',
        'Direct 24/7 premium support channels'
      ],
      ctaText: 'Get Lifetime Canva Pro',
      isPopular: true,
      isPro: true,
      color: 'border-purple-600 bg-white ring-2 ring-purple-600/35 relative'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4" id="pricing-table-container">
      {/* Dynamic Selector Toggles */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
        {/* Unified Lifetime Licensing Activated Badge */}
        <div className="bg-emerald-50 border border-emerald-200/60 px-5 py-2.5 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs font-bold" id="billing-interval-selector">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>⚡ UNIFIED LIFETIME CREATIVE LICENSING ACTIVATED</span>
        </div>

        {/* Currency Switch Selector */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200" id="currency-switcher">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-2">Currency:</span>
          {(['USD', 'EUR', 'INR'] as const).map((curr) => (
            <button
              key={curr}
              id={`btn-curr-${curr.toLowerCase()}`}
              onClick={() => setCurrency(curr)}
              className={`cursor-pointer px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                currency === curr
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Card Deck */}
      <div className="grid grid-cols-1 gap-8 items-stretch max-w-lg mx-auto mb-16" id="pricing-deck">
        {plans.map((plan) => (
          <div
            key={plan.id}
            id={`pricing-card-${plan.id}`}
            className={`rounded-3xl p-6 md:p-8 flex flex-col justify-between border transition-all hover:shadow-xl ${plan.color}`}
          >
            {/* Ribbon Badge for Popular Pro Choice */}
            {plan.isPopular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-canva-purple text-white text-[11px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-300 stroke-amber-300 animate-pulse" />
                <span>Most Popular Choice</span>
              </span>
            )}

            <div className="space-y-6">
              {/* Header metadata */}
              <div>
                <h4 className="font-display text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>{plan.name}</span>
                  {plan.isPro && <Zap className="w-5 h-5 text-canva-purple fill-purple-100 shrink-0" />}
                </h4>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed min-h-[40px]">{plan.description}</p>
              </div>

              {/* Price Indicator */}
              <div className="border-y border-slate-100 py-4">
                {plan.isPro && currency === 'INR' && (
                  <div className="text-[11px] font-extrabold text-rose-500 mb-1 tracking-tight">
                    Standard Price: <span className="line-through">₹6,999/yr</span> (Save 97%)
                  </div>
                )}
                {plan.isPro && currency === 'USD' && (
                  <div className="text-[11px] font-extrabold text-rose-500 mb-1 tracking-tight">
                    Standard Price: <span className="line-through">$199/yr</span> (Save 90%)
                  </div>
                )}
                {plan.isPro && currency === 'EUR' && (
                  <div className="text-[11px] font-extrabold text-rose-500 mb-1 tracking-tight">
                    Standard Price: <span className="line-through">€199/yr</span> (Save 90%)
                  </div>
                )}
                <div className="flex items-baseline gap-1" id={`price-display-${plan.id}`}>
                  <span className="text-4xl font-extrabold text-slate-950 font-display">{plan.symbol}{plan.price}</span>
                  {plan.period && <span className="text-slate-500 font-bold text-sm">{plan.period}</span>}
                </div>
                <div className="text-xs text-slate-400 font-bold mt-1 tracking-wide uppercase">{plan.periodSuffix}</div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-slate-600 uppercase tracking-widest">Included Capabilities:</h5>
                <ul className="space-y-3" id={`features-list-${plan.id}`}>
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-slate-700 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA action button */}
            <div className="mt-8 pt-4">
              <button
                id={`btn-subscribe-${plan.id}`}
                onClick={() => onSubscribe(plan.price, plan.symbol, plan.periodSuffix)}
                className={`cursor-pointer w-full py-4 px-6 rounded-xl text-center text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.isPro
                    ? 'bg-canva-purple text-white hover:opacity-90 shadow-md hover:shadow-lg'
                    : 'bg-slate-150 border border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span>{plan.ctaText}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Certifications banner */}
      <div className="bg-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-200 text-xs text-slate-500 font-semibold" id="checkout-trust-badges">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Full 100% money-back guarantee within the first 14 days of activation. No complex hoops.</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>Used by over 135+ million creators and professional workspace directories globally.</span>
        </div>
      </div>
    </div>
  );
}
