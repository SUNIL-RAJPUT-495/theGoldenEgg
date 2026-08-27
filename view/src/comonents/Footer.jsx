import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MessageCircle, MapPin, QrCode, Smartphone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#1A2E22] text-stone-300 dark:bg-stone-950 border-t border-[#14241b] pt-16 pb-8 transition-colors duration-300 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 8. FOOTER — TRUST & TRANSPARENCY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Column 1: Brand Summary & Location */}
          <div className="space-y-4">
            <span className="text-2xl font-serif font-black text-white tracking-tight">
              <b>The Golden Egg</b>
            </span>
            <p className="text-xs text-[#C28E58] font-extrabold tracking-widest uppercase block">
              100% ORGANIC • ETHICAL FARMING
            </p>
            <p className="text-sm text-stone-300 leading-relaxed font-sans">
              Pure, thoughtfully grown food and botanical products born from a living ecosystem.
            </p>
            <div className="flex items-center space-x-2 text-xs text-[#C28E58] pt-1">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>Periyapatna, Mysore District, Karnataka, India.</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-serif font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-stone-300 hover:text-[#C28E58] transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="/products" className="text-stone-300 hover:text-[#C28E58] transition-colors">Shop</Link>
              </li>
              <li>
                <a href="/#ecosystem" className="text-stone-300 hover:text-[#C28E58] transition-colors">Food Forest</a>
              </li>
              <li>
                <a href="/#ethos" className="text-stone-300 hover:text-[#C28E58] transition-colors">Ethical Pledge</a>
              </li>
              <li>
                <Link to="/contact" className="text-stone-300 hover:text-[#C28E58] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Standard */}
          <div className="space-y-4">
            <h3 className="text-white font-serif font-bold text-lg">Core Standard</h3>
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3 shadow-inner">
              <div className="flex items-center space-x-2 text-[#C28E58] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4" />
                <span>Zero-Culling Commitment</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-semibold">
                100% Zero-Culling Policy • Ethical Farming Commitment
              </p>
              <p className="text-[11px] text-stone-400 leading-relaxed font-sans">
                Every bird remains a valued citizen of our food forest, living out its full, natural lifespan in complete freedom.
              </p>
            </div>
          </div>

          {/* Column 4: Mobile QR Scanner */}
          <div className="space-y-3">
            <h3 className="text-white font-serif font-bold text-base flex items-center gap-1.5">
              <QrCode className="h-4 w-4 text-[#C28E58]" />
              <span>Scan to Visit</span>
            </h3>
            <a
              href="https://thegoldenegg.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center text-center space-y-2.5 shadow-inner hover:border-[#C28E58]/50 hover:bg-white/[0.08] transition-all group max-w-[200px]"
              title="Click or Scan to visit thegoldenegg.co.in"
            >
              <div className="relative p-2 bg-white rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 border-2 border-emerald-600/30 rounded-xl pointer-events-none animate-pulse"></div>
                <img
                  src="/qr-code.svg"
                  alt="Scan QR Code to open https://thegoldenegg.co.in/"
                  className="w-32 h-32 object-contain block"
                />
                {/* Center Logo Overlay - Optimized for Scannability */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="h-8 w-12 bg-white p-0.5 rounded shadow border border-[#C28E58]/50 flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="The Golden Egg Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] font-semibold text-stone-200 flex items-center justify-center gap-1">
                  <Smartphone className="h-3 w-3 text-[#C28E58]" />
                  <span>Scan with Camera</span>
                </p>
                <p className="text-[10px] text-stone-400 font-sans">
                  <span className="text-[#C28E58] font-mono">thegoldenegg.co.in</span>
                </p>
              </div>
            </a>
          </div>

        </div>

        <hr className="border-white/10 my-8" />

        {/* Bottom Copy */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>
              &copy; {new Date().getFullYear()} <b>The Golden Egg</b> Food Forest. Periyapatna, Mysore District, Karnataka.
            </span>
            <span className="hidden sm:inline text-stone-600">•</span>
            <span>
              Powered by{' '}
              <a
                href="https://ashtrinox.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C28E58] hover:text-white transition-colors font-semibold underline decoration-[#C28E58]/40 underline-offset-2"
              >
                Ashtrinox
              </a>
            </span>
          </div>
          <div className="flex space-x-6">
            <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            <a href="mailto:support@thegoldenegg.org.in" className="hover:text-white transition-colors">support@thegoldenegg.org.in</a>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp chat widget */}
      <a
        href="https://wa.me/919876543210?text=Hi! I am interested in The Golden Egg organic products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl z-40 transition-all hover:scale-110 flex items-center justify-center"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 fill-white text-emerald-600" />
      </a>
    </footer>
  );
};
export default Footer;
