import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 dark:bg-stone-950 border-t border-stone-800 pt-16 pb-8 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter & Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <span className="text-2xl font-bold text-white tracking-tight">
              The Golden Egg
            </span>
            <p className="text-xs text-organic-gold-500 font-semibold tracking-wider uppercase mt-1 mb-4">
              Certified Organic
            </p>
            <p className="text-sm text-stone-400 mb-6">
              Milling goodness and health directly from our organic millet farms in Mysore. Gluten-free, nutrient-dense finger millet (ragi) superfoods.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-8 w-8 rounded-full bg-stone-800 hover:bg-organic-green-700 flex items-center justify-center text-white transition-colors">
                F
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-stone-800 hover:bg-organic-green-700 flex items-center justify-center text-white transition-colors">
                I
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-stone-800 hover:bg-organic-green-700 flex items-center justify-center text-white transition-colors">
                T
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Shop & Recipes</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">Organic Ragi Flour (5KG)</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">Organic Ragi Flour (2KG)</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">Organic Ragi Flour (1KG)</Link>
              </li>
              <li>
                <Link to="/#recipes" className="hover:text-white transition-colors">Organic Recipes</Link>
              </li>
            </ul>
          </div>

          {/* Manufacturer & Location */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Manufacturer Details</h3>
            <ul className="space-y-4 text-sm text-stone-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-organic-gold-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Processed & MFG BY:</strong><br />
                  The Golden Egg<br />
                  Doddanna Ichahalli Village, Gonikoppa Road, Periyapatna, MYSORE - 571107
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-organic-gold-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-organic-gold-500" />
                <span>hello@thegoldenegg.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Newsletter</h3>
            <p className="text-sm text-stone-400 mb-4">
              Subscribe to receive recipe ideas, discount coupons, and farm updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex relative">
              <input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-800 text-white pl-4 pr-12 py-2.5 rounded-lg border border-stone-700 focus:outline-none focus:border-organic-green-600 text-sm"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bg-organic-green-700 hover:bg-organic-green-600 text-white p-1.5 rounded-md transition-colors"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-organic-green-600 font-semibold mt-2 animate-pulse">
                Successfully subscribed! Check your inbox.
              </p>
            )}
          </div>

        </div>

        <hr className="border-stone-800 my-8" />

        {/* Legals & Copy */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 space-y-4 md:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} The Golden Egg. All Rights Reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-stone-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-400 transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-stone-400 transition-colors">Return & Refund Policy</a>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp chat widget */}
      <a
        href="https://wa.me/919876543210?text=Hi! I am interested in ordering Organic Ragi Flour."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3.5 rounded-full shadow-2xl z-40 transition-all hover:scale-110 flex items-center justify-center animate-bounce duration-1000"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 fill-white text-green-500" />
      </a>
    </footer>
  );
};
export default Footer;
