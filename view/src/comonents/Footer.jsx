import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MessageCircle, MapPin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#1A2E22] text-stone-300 dark:bg-stone-950 border-t border-[#14241b] pt-16 pb-8 transition-colors duration-300 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 8. FOOTER — TRUST & TRANSPARENCY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Brand Summary & Location */}
          <div className="space-y-4">
            <span className="text-2xl font-serif font-black text-white tracking-tight">
              Golden Egg
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

        </div>

        <hr className="border-white/10 my-8" />

        {/* Bottom Copy */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 space-y-4 md:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} Golden Egg Food Forest. Periyapatna, Mysore District, Karnataka.
          </div>
          <div className="flex space-x-6">
            <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            <a href="mailto:support@thegoldenegg.org.in" className="hover:text-white transition-colors">support@thegoldenegg.org.in</a>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp chat widget */}
      <a
        href="https://wa.me/919876543210?text=Hi! I am interested in Golden Egg organic products."
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
