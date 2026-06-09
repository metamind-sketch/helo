import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShoppingBag, CheckCircle } from 'lucide-react';

interface PurchaseNotificationProps {
  onTriggerCheckout: (price: number, currency: string, period: string) => void;
}

interface Purchase {
  name: string;
  city: string;
  timeAgo: string;
  avatar: string;
  plan: string;
  price: string;
}

const SIMULATED_PURCHASES: Purchase[] = [
  {
    name: 'Aarav Sharma',
    city: 'Mumbai',
    timeAgo: 'Just now',
    avatar: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=crop&q=80&w=120',
    plan: 'Canva Pro Lifetime',
    price: '₹199'
  },
  {
    name: 'Priya Iyer',
    city: 'Bengaluru',
    timeAgo: '32 seconds ago',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    plan: 'Canva Pro Lifetime',
    price: '₹199'
  },
  {
    name: 'Karan Malhotra',
    city: 'New Delhi',
    timeAgo: '1 minute ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    plan: 'Canva Pro Lifetime',
    price: '₹199'
  },
  {
    name: 'Ananya Deshmukh',
    city: 'Pune',
    timeAgo: '3 minutes ago',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120',
    plan: 'Canva Pro Lifetime',
    price: '₹199'
  },
  {
    name: 'Vikram Reddy',
    city: 'Hyderabad',
    timeAgo: '4 minutes ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    plan: 'Canva Pro Lifetime',
    price: '₹199'
  },
  {
    name: 'Sneha Patel',
    city: 'Ahmedabad',
    timeAgo: '7 minutes ago',
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=120',
    plan: 'Canva Pro Lifetime',
    price: '₹199'
  },
  {
    name: 'Rohan Verma',
    city: 'Gurugram',
    timeAgo: '11 minutes ago',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120',
    plan: 'Canva Pro Lifetime',
    price: '₹199'
  }
];

export default function PurchaseNotifications({ onTriggerCheckout }: PurchaseNotificationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay before showing the first notification
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Loop interval to rotate purchases
    const interval = setInterval(() => {
      setIsVisible(false);
      
      // Wait for exit animation to complete, then change index and show
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SIMULATED_PURCHASES.length);
        setIsVisible(true);
      }, 800); // Wait for exit animation (duration: 0.5s + small buffer)
      
    }, 12000); // Rotate every 12 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const currentPurchase = SIMULATED_PURCHASES[currentIndex];

  const handleDismiss = (e: MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-[99]" id="purchase-notification-container">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => onTriggerCheckout(199, '₹', 'Lifetime Access')}
            className="cursor-pointer bg-white rounded-xl shadow-lg border border-slate-100 p-2.5 max-w-[290px] sm:max-w-[320px] flex items-center gap-2.5 pr-6 relative hover:emerald-50 hover:border-purple-200 transition-all group overflow-hidden"
            id={`purchase-notification-card-${currentIndex}`}
          >
            {/* Soft decorative accent */}
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-canva-purple to-pink-500" />

            {/* Buyer Avatar with animated pulse online dot */}
            <div className="relative shrink-0">
              <img
                src={currentPurchase.avatar}
                alt={currentPurchase.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-slate-150"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white rounded-full animate-pulse" />
            </div>

            {/* Buyer Details */}
            <div className="flex-1 min-w-0 pr-1">
              <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1">
                <CheckCircle className="w-2.5 h-2.5 text-emerald-500 fill-emerald-50 shrink-0" />
                Verified Lifetime
              </p>
              <p className="text-[11px] font-bold text-slate-800 leading-tight mt-0.5 truncate">
                <span className="font-extrabold text-slate-900">{currentPurchase.name}</span> ({currentPurchase.city})
              </p>
              <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-500 font-medium">
                <span className="text-purple-600 font-extrabold shrink-0">
                  {currentPurchase.plan}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-400 text-[9px]">{currentPurchase.timeAgo}</span>
              </div>
            </div>

            {/* Price Badge */}
            <div className="shrink-0 text-right font-black text-rose-600 text-[11px] text-nowrap mr-1">
              {currentPurchase.price}
            </div>

            {/* Small shopping bag icon */}
            <div className="absolute top-2 right-2 text-purple-500 opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all">
              <ShoppingBag className="w-3 h-3 fill-purple-50" />
            </div>

            {/* Close cross */}
            <button
              onClick={handleDismiss}
              className="absolute bottom-1 right-1 p-1 text-slate-300 hover:text-slate-500 transition-colors rounded-full"
              aria-label="Dismiss banner"
              id="btn-dismiss-purchase-notification"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
