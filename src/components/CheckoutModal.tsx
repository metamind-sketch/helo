/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CreditCard, Shield, Check, Mail, Lock, CheckCircle, ArrowRight, X } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanPrice: number;
  selectedPlanCurrency: string;
  selectedPlanPeriod: string;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  selectedPlanPrice,
  selectedPlanCurrency,
  selectedPlanPeriod,
}: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('metaminds098@gmail.com');
  const [fullName, setFullName] = useState('Alex Martin');
  
  // Card payment details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardName, setCardName] = useState('Alex Martin');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardBrand, setCardBrand] = useState<'visa' | 'mastercard' | 'generic'>('generic');

  // Confetti particles for success view
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; size: number; delay: number }[]>([]);

  useEffect(() => {
    if (cardNumber.startsWith('4')) {
      setCardBrand('visa');
    } else if (cardNumber.startsWith('5')) {
      setCardBrand('mastercard');
    } else {
      setCardBrand('generic');
    }
  }, [cardNumber]);

  const generateConfetti = () => {
    const colors = ['#8B3DFF', '#FF4181', '#00C4CC', '#FFB800', '#10B981'];
    const particles = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 50, // relative to center
      y: Math.random() * -120 - 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 6,
      delay: Math.random() * 0.4
    }));
    setConfetti(particles);
  };

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(3);
        generateConfetti();
      }, 1600); // simulate processing
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm" id="checkout-container">
      {/* Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col"
        id="checkout-card"
      >
        {/* Head/Logo */}
        <div className="bg-slate-55 flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg canva-gradient-bg flex items-center justify-center text-white font-extrabold text-sm select-none">
              C
            </div>
            <span className="font-display font-extrabold text-lg text-slate-900">Canva <span className="text-canva-purple font-semibold hover:opacity-90">PRO</span></span>
          </div>

          <button
            id="btn-close-modal"
            onClick={onClose}
            className="cursor-pointer text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-3 gap-0.5 bg-slate-100 text-[11px] font-bold text-center border-b border-slate-100 uppercase tracking-widest text-slate-400">
          <div className={`py-2 px-3 ${step >= 1 ? 'bg-purple-50 text-canva-purple border-b-2 border-canva-purple' : ''}`}>1. Account</div>
          <div className={`py-2 px-3 ${step >= 2 ? 'bg-purple-50 text-canva-purple border-b-2 border-canva-purple' : ''}`}>2. Payment</div>
          <div className={`py-2 px-3 ${step >= 3 ? 'bg-purple-50 text-canva-purple border-b-2 border-canva-purple' : ''}`}>3. Verify</div>
        </div>

        {/* Forms Content */}
        <div className="p-6 flex-1 overflow-y-auto max-h-[75vh]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step-1-form"
                onSubmit={handleNextStep}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-5"
                id="form-account-setup"
              >
                <div>
                  <h4 className="font-display text-xl font-bold text-slate-900 tracking-tight">Confirm account credentials</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Your subscription will bind to this email address. Fill out details to generate a secure activation space.
                  </p>
                </div>

                {/* Email Prepopulate details */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">Registered Email</label>
                    <div className="relative">
                      <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="checkout-input-email"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your-name@domain.com"
                        className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-hidden focus:border-canva-purple focus:ring-1 focus:ring-canva-purple font-medium text-slate-800 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">Full Name</label>
                    <input
                      id="checkout-input-name"
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setCardName(e.target.value);
                      }}
                      placeholder="Alex Martin"
                      className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 outline-hidden focus:border-canva-purple focus:ring-1 focus:ring-canva-purple font-medium text-slate-800 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Invoice Summary widget */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                    <span>Plan Category</span>
                    <span className="font-bold text-slate-800 uppercase tracking-wider">Canva Pro Lifetime / Annual</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                    <span>Billed Standard Period</span>
                    <span className="font-bold text-slate-800">{selectedPlanPeriod}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200/50 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-800">Total Billed Due Now</span>
                    <span className="text-xl font-extrabold text-canva-purple font-display">
                      {selectedPlanCurrency === '$' ? '$' : '₹'}{selectedPlanPrice}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="btn-account-continue"
                    type="submit"
                    className="cursor-pointer w-full canva-gradient-bg text-white hover:opacity-95 font-semibold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <span>Proceed to Secure Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                key="step-2-form"
                onSubmit={handleNextStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
                id="form-billing-details"
              >
                <div>
                  <h4 className="font-display text-xl font-bold text-slate-900 tracking-tight">Add secure payment provider</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Simulate a secure Stripe transaction using dummy credentials for demonstration.
                  </p>
                </div>

                {/* Animated Simulated Card */}
                <div className="relative w-full h-44 rounded-2xl canva-gradient-bg p-5 text-white flex flex-col justify-between shadow-lg overflow-hidden select-none mb-2" id="simulated-card-badge">
                  {/* Glassmorphic circle overlays */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-extrabold opacity-75">CANVA PRO PREMIER SUBSCRIBER</span>
                      <div className="text-xs font-mono font-medium opacity-90 mt-1">{email}</div>
                    </div>
                    {/* Brand indicator logos */}
                    {cardBrand === 'visa' && (
                      <span className="text-lg font-black italic tracking-wider bg-white/10 px-2 py-1 rounded">VISA</span>
                    )}
                    {cardBrand === 'mastercard' && (
                      <span className="text-lg font-black italic tracking-wider bg-white/10 px-2 py-1 rounded">MC</span>
                    )}
                    {cardBrand === 'generic' && (
                      <CreditCard className="w-6 h-6 text-white/80" />
                    )}
                  </div>

                  <div className="my-auto">
                    <span className="text-lg sm:text-xl font-mono tracking-widest block py-1">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </span>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[7px] uppercase tracking-wider block opacity-60">Cardholder</span>
                      <span className="text-xs font-medium uppercase font-display max-w-[180px] truncate block">{cardName || 'FULL NAME'}</span>
                    </div>
                    <div>
                      <span className="text-[7px] uppercase tracking-wider block opacity-60">Expires</span>
                      <span className="text-xs font-mono block">{cardExpiry || 'MM/YY'}</span>
                    </div>
                    <div>
                      <span className="text-[7px] uppercase tracking-wider block opacity-60">CVV</span>
                      <span className="text-xs font-mono block">{cardCVV ? '•••' : '•••'}</span>
                    </div>
                  </div>
                </div>

                {/* Card Fields */}
                <div className="space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">Card Number</label>
                    <div className="relative">
                      <CreditCard className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="checkout-input-card-number"
                        required
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="4111 2222 3333 4444  (4=Visa, 5=MC)"
                        className="w-full bg-slate-50 pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 outline-hidden focus:border-canva-purple focus:ring-1 focus:ring-canva-purple font-mono font-medium text-slate-800 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">Card Expiry</label>
                      <input
                        id="checkout-input-card-expiry"
                        required
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 outline-hidden focus:border-canva-purple focus:ring-1 focus:ring-canva-purple font-mono font-medium text-slate-800 transition-all text-sm text-center"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">CVV / Code</label>
                      <input
                        id="checkout-input-card-cvv"
                        required
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 outline-hidden focus:border-canva-purple focus:ring-1 focus:ring-canva-purple font-mono font-medium text-slate-800 transition-all text-sm text-center"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">Name on Payment Card</label>
                    <input
                      id="checkout-input-card-name"
                      required
                      type="text"
                      placeholder="Alex Martin"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 outline-hidden focus:border-canva-purple focus:ring-1 focus:ring-canva-purple font-medium text-slate-800 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="btn-payment-submit"
                    type="submit"
                    disabled={isProcessing}
                    className="cursor-pointer w-full bg-slate-900 border border-slate-900 text-white hover:bg-slate-800 font-semibold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying with Card Issuer...</span>
                      </div>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-emerald-400" />
                        <span>Authorize Secure Transaction • {selectedPlanCurrency === '$' ? '$' : '₹'}{selectedPlanPrice}</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256bit AES Bank-grade SSL Certificate Protection. Billed secure demo sandbox.</span>
                </p>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div
                key="step-3-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6 flex flex-col items-center relative overflow-hidden"
                id="visual-checkout-success"
              >
                {/* Confetti simulation container */}
                <div className="absolute inset-0 pointer-events-none" id="confetti-holder">
                  {confetti.map((c) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      animate={{ 
                        opacity: [1, 1, 0],
                        x: c.x * 6,
                        y: [-25, c.y, 400],
                        rotate: [0, Math.random() * 360, Math.random() * 720]
                      }}
                      transition={{ 
                        duration: Math.random() * 1.5 + 2, 
                        delay: c.delay,
                        ease: 'easeOut'
                      }}
                      className="absolute left-1/2 top-1/2 rounded-xs"
                      style={{ 
                        backgroundColor: c.color, 
                        width: c.size, 
                        height: c.size,
                      }}
                    />
                  ))}
                </div>

                {/* Animated checkmark halo */}
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0.6 }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute -inset-2 rounded-full bg-emerald-50 pointer-events-none"
                  />
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg relative">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display text-2xl font-black text-slate-900 tracking-tight">Purchase Authorized!</h4>
                  <p className="text-sm text-slate-600 font-medium px-4">
                    Congratulations <span className="text-canva-purple font-semibold">{fullName}</span>, your Canva Pro creative license is now fully active!
                  </p>
                  <p className="text-blue-600 text-xs font-semibold bg-blue-50 px-3 py-1 rounded-full inline-block">
                    Activation code with workspace instructions sent to: {email}
                  </p>
                </div>

                {/* Simulated Invoice Receipt */}
                <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-5 w-full space-y-3.5 text-left text-xs text-slate-600">
                  <div className="flex justify-between font-bold border-b pb-2 text-slate-800">
                    <span>Invoice Details</span>
                    <span className="font-mono text-[10px]">#CIV-{(Math.floor(Math.random() * 900000) + 100000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Premium Subscription Package</span>
                    <span className="font-semibold text-slate-800">Canva Pro Professional</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Authorized Owner Email</span>
                    <span className="font-semibold text-slate-800">{email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reference Transaction ID</span>
                    <span className="font-mono text-[10px]">txn_prod_{(Math.random().toString(36).substr(2, 9))}</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed pt-3.5 text-slate-800 font-bold text-sm">
                    <span>Billed Paid Charge</span>
                    <span className="text-emerald-600 font-display">
                      {selectedPlanCurrency === '$' ? '$' : '₹'}{selectedPlanPrice}
                    </span>
                  </div>
                </div>

                <div className="pt-2 w-full">
                  <button
                    id="btn-finish-checkout"
                    onClick={() => {
                      onClose();
                      setStep(1);
                    }}
                    className="cursor-pointer w-full text-slate-900 hover:bg-slate-100 border border-slate-200 font-semibold py-3 rounded-xl text-sm transition-all shadow-xs"
                  >
                    Exit Order Workspace
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
