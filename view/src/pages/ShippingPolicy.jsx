import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, PackageCheck, AlertCircle, Mail, Phone, MapPin, ChevronRight, FileText } from 'lucide-react';

export const ShippingPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'sec-1', title: '1. Shipping Availability' },
    { id: 'sec-2', title: '2. Order Processing Time' },
    { id: 'sec-3', title: '3. Estimated Delivery Time' },
    { id: 'sec-4', title: '4. Shipping Charges' },
    { id: 'sec-5', title: '5. Order Tracking' },
    { id: 'sec-6', title: '6. Delivery Delays' },
    { id: 'sec-7', title: '7. Incorrect or Incomplete Address' },
    { id: 'sec-8', title: '8. Damaged or Tampered Packages' },
    { id: 'sec-9', title: '9. Undelivered or Returned Shipments' },
    { id: 'sec-10', title: '10. Contact Us' }
  ];

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen text-stone-800 dark:text-stone-200 transition-colors duration-300 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#1A2E22] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
          <Truck className="w-80 h-80 text-white" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#C28E58] uppercase tracking-wider">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span>Legal</span>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-stone-300">Shipping Policy</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
            Shipping Policy
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-2">
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Last Updated: <b>September 8, 2026</b>
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
                Thank you for choosing <strong>The Golden Egg</strong>. We are committed to ensuring that your order of Ragi Flour and other products reaches you safely and on time.
              </p>
            </div>

            {/* Timelines Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" /> Order Processing
                </span>
                <p className="text-emerald-800 dark:text-emerald-200">
                  Dispatched within <strong>1–3 business days</strong> after order confirmation.
                </p>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-600" /> Estimated Delivery
                </span>
                <p className="text-amber-800 dark:text-amber-200">
                  Generally delivered within <strong>3–7 business days</strong> across serviceable locations in India.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <section id="sec-1" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                1. Shipping Availability
              </h2>
              <p>
                We currently deliver orders to serviceable locations across India. Delivery availability may vary depending on the location and courier serviceability.
              </p>
            </section>

            {/* Section 2 */}
            <section id="sec-2" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                2. Order Processing Time
              </h2>
              <p>
                Orders are generally processed and dispatched within <strong>1–3 business days</strong> after successful confirmation of the order.
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Orders placed on Sundays, public holidays, or during exceptional circumstances may take additional time to process.
              </p>
            </section>

            {/* Section 3 */}
            <section id="sec-3" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                3. Estimated Delivery Time
              </h2>
              <p>
                Once dispatched, orders are generally delivered within <strong>3–7 business days</strong>, depending on the delivery location, courier availability, weather conditions, and other logistical factors.
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Delivery to remote or non-serviceable areas may take longer.
              </p>
            </section>

            {/* Section 4 */}
            <section id="sec-4" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                4. Shipping Charges
              </h2>
              <p>
                Applicable shipping charges, if any, will be displayed at checkout before you complete your purchase.
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Any promotional free-shipping offer will be subject to the terms and conditions applicable to that offer.
              </p>
            </section>

            {/* Section 5 */}
            <section id="sec-5" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                5. Order Tracking
              </h2>
              <p>
                Once your order has been dispatched, you may receive tracking details through your registered contact information, such as email or mobile number.
              </p>
              <p>
                You can use the tracking information provided to check the current status of your shipment.
              </p>
            </section>

            {/* Section 6 */}
            <section id="sec-6" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                6. Delivery Delays
              </h2>
              <p>
                While we make reasonable efforts to deliver your order within the estimated timeframe, delivery may occasionally be delayed due to circumstances beyond our control, including:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>Adverse weather conditions</li>
                <li>Natural disasters</li>
                <li>Transportation or logistics disruptions</li>
                <li>Courier-related delays</li>
                <li>Public holidays</li>
                <li>Incorrect or incomplete delivery information</li>
                <li>Other unforeseen circumstances</li>
              </ul>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                In such cases, we appreciate your patience and cooperation.
              </p>
            </section>

            {/* Section 7 */}
            <section id="sec-7" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                7. Incorrect or Incomplete Address
              </h2>
              <p>
                Customers are responsible for providing accurate and complete delivery information while placing an order.
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                The Golden Egg will not be responsible for delays, failed deliveries, or additional shipping charges resulting from incorrect, incomplete, or inaccurate address or contact information provided by the customer.
              </p>
            </section>

            {/* Section 8 */}
            <section id="sec-8" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                8. Damaged or Tampered Packages
              </h2>
              <p>
                If your package appears damaged, opened, or tampered with at the time of delivery, please avoid accepting the package where possible and contact us immediately.
              </p>
              <p>
                For any issue regarding a damaged or incorrect product, please contact our customer support team with your order details and relevant photographs/videos of the package and product.
              </p>
            </section>

            {/* Section 9 */}
            <section id="sec-9" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                9. Undelivered or Returned Shipments
              </h2>
              <p>
                If an order cannot be delivered because of an incorrect address, recipient unavailability, refusal to accept the shipment, or repeated failed delivery attempts, the shipment may be returned to us.
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Any re-shipping of such orders may be subject to additional shipping charges.
              </p>
            </section>

            {/* Section 10 */}
            <section id="sec-10" className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                10. Contact Us
              </h2>
              <p>
                If you have any questions regarding shipping, delivery, or your order, please contact <strong>The Golden Egg</strong> through the contact details provided on our website.
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
                  <Mail className="w-4 h-4 text-[#C28E58] shrink-0" />
                  <span>Email: <a href="mailto:info@thegoldenegg.co.in" className="text-[#C28E58] hover:underline font-medium">info@thegoldenegg.co.in</a></span>
                </div>
                <div className="flex items-center space-x-3 text-stone-700 dark:text-stone-300">
                  <Phone className="w-4 h-4 text-[#C28E58] shrink-0" />
                  <span>Phone: <a href="tel:+917411932830" className="text-[#C28E58] hover:underline font-medium">+91 74119 32830</a></span>
                </div>
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
