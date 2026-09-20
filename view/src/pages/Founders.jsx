import React from 'react';
import { FoundersSection } from '../comonents/FoundersSection';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

export const Founders = () => {
  return (
    <div className="bg-white dark:bg-stone-950 min-h-screen text-stone-900 dark:text-stone-100 transition-colors duration-300">
      
      {/* Page Header / Hero Banner */}
      <div className="relative bg-[#1A2E22] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#C28E58_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#C28E58] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            Our Story &amp; Leadership
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-white">
            Founders &amp; Stewards
          </h1>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Meet the visionary minds nurturing our 4-acre food forest sanctuary in Periyapatna, Mysore.
          </p>
        </div>
      </div>

      {/* Main Founders Section */}
      <FoundersSection isStandalone={true} />

      {/* Bottom CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#F9F6F0] dark:bg-stone-900 rounded-3xl p-8 sm:p-12 border border-stone-200/70 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold text-[#1A2E22] dark:text-white">
              Experience the Harvest of Conscious Stewardship
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Explore our 100% pure, farm-grown Ragi flour and signature Annapurna botanical powders.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              to="/products"
              className="bg-[#1A2E22] hover:bg-[#14241b] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-md flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="h-4 w-4 text-[#C28E58]" />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent hover:bg-stone-200 dark:hover:bg-stone-800 text-[#1A2E22] dark:text-stone-200 border border-stone-300 dark:border-stone-700 font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Founders;
