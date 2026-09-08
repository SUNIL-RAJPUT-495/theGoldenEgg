import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, AlertTriangle, CheckCircle, Mail, Phone, ChevronRight, FileText, Clock } from 'lucide-react';

export const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'sec-1', title: '1. Order Cancellation' },
    { id: 'sec-2', title: '2. Returns and Refunds' },
    { id: 'sec-3', title: '3. Refund Process' },
    { id: 'sec-4', title: '4. Non-Refundable Situations' },
    { id: 'sec-5', title: '5. Damaged or Incorrect Product' },
    { id: 'sec-6', title: '6. Failed or Undelivered Orders' },
    { id: 'sec-7', title: '7. Contact Us' }
  ];

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen text-stone-800 dark:text-stone-200 transition-colors duration-300 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#1A2E22] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
          <RotateCcw className="w-80 h-80 text-white" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#C28E58] uppercase tracking-wider">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span>Legal</span>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-stone-300">Refund & Cancellation Policy</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
            Refund & Cancellation Policy
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-2">
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Effective Date: <b>08/09/2026</b>
            </span>
            <span className="text-stone-400">• Website: <b>thegoldenegg.co.in</b></span>
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sticky Quick Nav Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-[#C28E58] uppercase tracking-widest flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Table of Contents
              </h3>
              <nav className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1 text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1 px-2 rounded text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-[#1A2E22] dark:hover:text-stone-100 transition-colors truncate"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Policy Document Content */}
          <div className="lg:col-span-3 space-y-8 bg-white dark:bg-stone-900 p-6 sm:p-10 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm leading-relaxed text-sm">
            
            {/* Intro */}
            <div className="p-5 bg-stone-100/70 dark:bg-stone-800/50 rounded-xl border border-stone-200/80 dark:border-stone-700/80 space-y-3">
              <p className="font-medium text-stone-900 dark:text-stone-100">
                Thank you for shopping with <strong>The Golden Egg</strong>. We value your trust and strive to provide high-quality Ragi Flour and other food products.
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Please read our Refund and Cancellation Policy carefully before placing an order.
              </p>
            </div>

            {/* Quick Summary Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" /> Reporting Timeframe
                </span>
                <p className="text-amber-800 dark:text-amber-200">
                  Issues must be reported within <strong>48 hours of delivery</strong> with photos/videos.
                </p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Food Safety Note
                </span>
                <p className="text-emerald-800 dark:text-emerald-200">
                  Consumables non-returnable unless damaged, defective, or incorrect product delivered.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <section id="sec-1" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                1. Order Cancellation
              </h2>
              <p>Orders can be cancelled only before they have been processed or dispatched.</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>Customers may request cancellation by contacting us as soon as possible after placing the order.</li>
                <li>Once an order has been processed, packed, or dispatched, cancellation may not be possible.</li>
                <li>If the cancellation request is accepted, the eligible refund will be initiated to the original payment method.</li>
                <li>Shipping or transaction charges, if applicable, may be non-refundable.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section id="sec-2" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                2. Returns and Refunds
              </h2>
              <p>
                As <em>Ragi Flour is a food/consumable product</em>, we generally do not accept returns after delivery due to food safety and hygiene reasons.
              </p>
              <p>However, customers may be eligible for a replacement or refund if:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>The product received is damaged or tampered with.</li>
                <li>The wrong product was delivered.</li>
                <li>The package is empty or substantially damaged upon delivery.</li>
                <li>The product received has a manufacturing or quality-related issue.</li>
              </ul>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Customers should report such issues within <strong>48 hours of delivery</strong> and provide photographs/videos of the product and packaging where applicable.
              </p>
            </section>

            {/* Section 3 */}
            <section id="sec-3" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                3. Refund Process
              </h2>
              <p>Once the reported issue is reviewed and approved by The Golden Egg:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>A replacement may be provided, subject to product availability; or</li>
                <li>An eligible refund will be processed to the original payment method.</li>
              </ul>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Refund processing time may vary depending on the payment method and banking/payment service provider.
              </p>
            </section>

            {/* Section 4 */}
            <section id="sec-4" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                4. Non-Refundable Situations
              </h2>
              <p>Refunds or replacements may not be provided in the following situations:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>The customer has changed their mind after receiving the product.</li>
                <li>The product has been opened, consumed, or used.</li>
                <li>The product was improperly stored after delivery.</li>
                <li>The customer provides incorrect or incomplete delivery information.</li>
                <li>The issue is reported after the specified reporting period.</li>
                <li>The product is damaged due to mishandling by the customer.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="sec-5" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                5. Damaged or Incorrect Product
              </h2>
              <p>
                If you receive a damaged, defective, or incorrect product, please contact us at the earliest with your{' '}
                <strong>order number and clear photographs/videos of the product and packaging</strong>.
              </p>
              <p>
                Our team will review the complaint and determine whether a replacement or refund is applicable.
              </p>
            </section>

            {/* Section 6 */}
            <section id="sec-6" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                6. Failed or Undelivered Orders
              </h2>
              <p>
                If an order cannot be delivered because of an incorrect address, unavailable recipient, repeated delivery failure, or other circumstances attributable to the customer, the order may be cancelled or returned to us. Any refund in such cases will be subject to applicable shipping and handling charges.
              </p>
            </section>

            {/* Section 7 */}
            <section id="sec-7" className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                7. Contact Us
              </h2>
              <p>
                For cancellation, refund, or product-related complaints, please contact <strong>The Golden Egg</strong> through the contact details provided on our website:
              </p>

              <div className="bg-[#1A2E22]/5 dark:bg-stone-800/60 p-6 rounded-2xl border border-[#1A2E22]/10 dark:border-stone-700 space-y-3 text-xs sm:text-sm">
                <p className="font-serif font-bold text-[#1A2E22] dark:text-stone-100 text-base">
                  The Golden Egg
                </p>
                <div className="flex items-center space-x-3 text-stone-700 dark:text-stone-300">
                  <span className="font-semibold text-stone-900 dark:text-stone-100 shrink-0">Website:</span>
                  <a href="https://thegoldenegg.co.in" target="_blank" rel="noopener noreferrer" className="text-[#C28E58] hover:underline font-medium">
                    thegoldenegg.co.in
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-stone-700 dark:text-stone-300">
                  <Phone className="w-4 h-4 text-[#C28E58] shrink-0" />
                  <span>Contact: <a href="tel:+917411932830" className="text-[#C28E58] hover:underline font-medium">+91 74119 32830</a></span>
                </div>
              </div>
            </section>

            {/* Footer Notice */}
            <div className="p-4 bg-stone-100 dark:bg-stone-800/80 rounded-xl text-xs text-stone-500 dark:text-stone-400 italic">
              By placing an order on our website, you acknowledge and agree to the terms of this Refund and Cancellation Policy. The Golden Egg reserves the right to modify this policy at any time. Any changes will be updated on this page.
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
