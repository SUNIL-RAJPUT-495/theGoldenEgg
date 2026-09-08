import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, Scale, Mail, Phone, MapPin, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'sec-1', title: '1. About The Golden Egg' },
    { id: 'sec-2', title: '2. Product Information' },
    { id: 'sec-3', title: '3. Food Product Disclaimer' },
    { id: 'sec-4', title: '4. Eligibility to Purchase' },
    { id: 'sec-5', title: '5. Orders' },
    { id: 'sec-6', title: '6. Pricing' },
    { id: 'sec-7', title: '7. Payment' },
    { id: 'sec-8', title: '8. Shipping & Delivery' },
    { id: 'sec-9', title: '9. Delivery Inspection' },
    { id: 'sec-10', title: '10. Cancellation Policy' },
    { id: 'sec-11', title: '11. Returns & Refunds' },
    { id: 'sec-12', title: '12. Refund Processing' },
    { id: 'sec-13', title: '13. Storage & Consumption' },
    { id: 'sec-14', title: '14. Intellectual Property' },
    { id: 'sec-15', title: '15. Website Use' },
    { id: 'sec-16', title: '16. Third-Party Services' },
    { id: 'sec-17', title: '17. Limitation of Liability' },
    { id: 'sec-18', title: '18. Changes to Products or Website' },
    { id: 'sec-19', title: '19. Privacy' },
    { id: 'sec-20', title: '20. Governing Law' },
    { id: 'sec-21', title: '21. Contact Us' }
  ];

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen text-stone-800 dark:text-stone-200 transition-colors duration-300 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#1A2E22] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
          <Scale className="w-80 h-80 text-white" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#C28E58] uppercase tracking-wider">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span>Legal</span>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-stone-300">Terms & Conditions</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
            Terms & Conditions
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
                Welcome to <strong>The Golden Egg</strong>. These Terms & Conditions govern your use of our website,{' '}
                <a href="https://thegoldenegg.co.in" target="_blank" rel="noopener noreferrer" className="text-[#C28E58] hover:underline font-semibold">
                  thegoldenegg.co.in
                </a>
                , and your purchase of our products, including Ragi Flour and other food products offered through the website.
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                By accessing or using our website and placing an order, you agree to be bound by these Terms & Conditions. Please read them carefully before using our website or purchasing our products.
              </p>
            </div>

            {/* Section 1 */}
            <section id="sec-1" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                1. About The Golden Egg
              </h2>
              <p>
                The Golden Egg is an online platform engaged in the sale of Ragi Flour and other food products. All products available on our website are subject to availability and may be changed or discontinued at our discretion.
              </p>
            </section>

            {/* Section 2 */}
            <section id="sec-2" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                2. Product Information
              </h2>
              <p>
                We make reasonable efforts to ensure that product descriptions, images, ingredients, nutritional information, pack sizes, and other product details displayed on the website are accurate.
              </p>
              <p>However:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>Actual product packaging may differ slightly from images displayed on the website.</li>
                <li>Product colours, texture, appearance, and packaging may vary between batches.</li>
                <li>Product information may be updated from time to time.</li>
                <li>Customers should carefully check the product packaging and label before consumption.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="sec-3" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                3. Food Product Disclaimer
              </h2>
              <p>
                Ragi Flour is a food product intended for consumption as directed on the product packaging.
              </p>
              <p>
                Customers are responsible for checking the ingredients, allergen information, nutritional information, and other product details before consuming the product.
              </p>
              <p>
                If you have any food allergy, intolerance, dietary restriction, or medical condition, consult an appropriate healthcare professional before consuming the product.
              </p>
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-xs text-amber-900 dark:text-amber-200">
                <strong>Disclaimer:</strong> The Golden Egg shall not be responsible for any adverse reaction resulting from failure to review product information or from consumption contrary to the product instructions.
              </div>
            </section>

            {/* Section 4 */}
            <section id="sec-4" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                4. Eligibility to Purchase
              </h2>
              <p>By placing an order through our website, you confirm that:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>You are legally capable of entering into a binding agreement.</li>
                <li>The information provided by you is accurate and complete.</li>
                <li>You are purchasing the products for lawful purposes.</li>
                <li>You will use the products in accordance with applicable laws and product instructions.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="sec-5" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                5. Orders
              </h2>
              <p>
                When you place an order on our website, you are making an offer to purchase the selected products. An order will be considered accepted only after confirmation by The Golden Egg.
              </p>
              <p>We reserve the right to:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>Accept or reject an order.</li>
                <li>Cancel an order due to product unavailability.</li>
                <li>Cancel an order where incorrect pricing or product information has been displayed.</li>
                <li>Cancel an order where fraudulent, suspicious, or unauthorized activity is suspected.</li>
                <li>Limit the quantity of products that may be purchased by a customer.</li>
              </ul>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                If an order is cancelled after payment has been received, the applicable amount will be refunded through the original or appropriate payment method.
              </p>
            </section>

            {/* Section 6 */}
            <section id="sec-6" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                6. Pricing
              </h2>
              <p>
                All product prices displayed on the website are subject to change without prior notice. Prices may include or exclude applicable taxes, delivery charges, or other charges as specifically mentioned during checkout.
              </p>
              <p>
                In case of an accidental pricing or technical error, The Golden Egg reserves the right to cancel the affected order and refund any amount already paid.
              </p>
            </section>

            {/* Section 7 */}
            <section id="sec-7" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                7. Payment
              </h2>
              <p>
                Customers may pay for their orders using the payment methods made available on the website. All payment information submitted through the website is processed through the applicable payment gateway or service provider.
              </p>
              <p>
                The Golden Egg does not knowingly store customers' complete payment card information on its own systems. An order may be cancelled if payment is unsuccessful, reversed, unauthorized, or flagged as fraudulent.
              </p>
            </section>

            {/* Section 8 */}
            <section id="sec-8" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                8. Shipping & Delivery
              </h2>
              <p>
                We aim to dispatch and deliver orders within the estimated time communicated at checkout or through order confirmation.
              </p>
              <p>Delivery timelines may vary depending on:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>Delivery location</li>
                <li>Product availability</li>
                <li>Courier or logistics service</li>
                <li>Weather conditions</li>
                <li>Holidays</li>
                <li>Government restrictions</li>
                <li>Unforeseen circumstances</li>
              </ul>
              <p>
                The estimated delivery time is not a guaranteed delivery date. Customers are responsible for providing a correct and complete delivery address and contact details. The Golden Egg shall not be responsible for delays or failed delivery caused by incorrect or incomplete information provided by the customer.
              </p>
            </section>

            {/* Section 9 */}
            <section id="sec-9" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                9. Delivery Inspection
              </h2>
              <p>
                Customers are advised to inspect the package at the time of delivery. If the package appears damaged, tampered with, opened, or otherwise compromised, customers should document the issue and contact The Golden Egg as soon as possible.
              </p>
              <p>
                For any complaint relating to damaged or incorrect products, customers may be required to provide photographs, videos, order details, or other information necessary to verify the complaint.
              </p>
            </section>

            {/* Section 10 */}
            <section id="sec-10" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                10. Cancellation Policy
              </h2>
              <p>
                Order cancellation requests may be accepted only if the order has not already been processed or dispatched. Once an order has been dispatched, cancellation may not be possible.
              </p>
              <p>
                For cancellation requests, customers should contact us using the contact details provided on our website as soon as possible after placing the order.
              </p>
            </section>

            {/* Section 11 */}
            <section id="sec-11" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                11. Returns & Refunds
              </h2>
              <p>
                Since Ragi Flour and other food products are consumable items, returns may be restricted for food safety and hygiene reasons.
              </p>
              <p>A replacement or refund may be considered in cases such as:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>Wrong product delivered.</li>
                <li>Product received in damaged condition.</li>
                <li>Product received in an opened or tampered condition.</li>
                <li>Product received with a manufacturing or packaging defect.</li>
                <li>Any other issue specifically approved by The Golden Egg.</li>
              </ul>
              <p>
                Customers should report eligible issues within <strong>48 hours of delivery</strong> and provide the order number along with relevant photographs or other evidence. Refunds, where approved, will normally be processed through the original payment method or another appropriate method.
              </p>
            </section>

            {/* Section 12 */}
            <section id="sec-12" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                12. Refund Processing
              </h2>
              <p>
                Once a refund has been approved, the processing time may vary depending on the payment method, bank, payment gateway, or financial institution.
              </p>
              <p>
                The Golden Egg shall not be responsible for delays caused by third-party payment providers or banks.
              </p>
            </section>

            {/* Section 13 */}
            <section id="sec-13" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                13. Storage & Consumption
              </h2>
              <p>
                Customers should store Ragi Flour according to the instructions provided on the product packaging.
              </p>
              <p>Customers are responsible for:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>Keeping the product properly stored.</li>
                <li>Keeping the package sealed when not in use.</li>
                <li>Checking the expiry or best-before date before consumption.</li>
                <li>Following the preparation and usage instructions provided on the packaging.</li>
              </ul>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                The Golden Egg shall not be responsible for deterioration caused by improper storage or handling after delivery.
              </p>
            </section>

            {/* Section 14 */}
            <section id="sec-14" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                14. Intellectual Property
              </h2>
              <p>
                All content available on the website, including but not limited to logos, brand names, product images, product descriptions, graphics, text, website design, videos, and illustrations, is owned by or licensed to The Golden Egg and is protected by applicable intellectual property laws.
              </p>
              <p>
                No content may be copied, reproduced, modified, distributed, or commercially used without prior written permission.
              </p>
            </section>

            {/* Section 15 */}
            <section id="sec-15" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                15. Website Use
              </h2>
              <p>You agree not to use the website:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>For any unlawful purpose.</li>
                <li>To attempt unauthorized access to the website or its systems.</li>
                <li>To introduce viruses, malicious code, or harmful software.</li>
                <li>To interfere with the operation or security of the website.</li>
                <li>To submit false, misleading, or fraudulent information.</li>
                <li>To misuse the website for unauthorized commercial purposes.</li>
              </ul>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                We reserve the right to restrict or terminate access to the website where misuse is suspected.
              </p>
            </section>

            {/* Section 16 */}
            <section id="sec-16" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                16. Third-Party Services
              </h2>
              <p>
                The website may use third-party service providers for payment processing, shipping, analytics, technology, communication, or other services.
              </p>
              <p>
                The Golden Egg is not responsible for independent actions, policies, or service interruptions caused by third-party providers, although we may assist customers in resolving issues where reasonably possible.
              </p>
            </section>

            {/* Section 17 */}
            <section id="sec-17" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                17. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, The Golden Egg shall not be liable for indirect, incidental, special, or consequential losses arising from the use of the website or consumption of products, except where such liability cannot legally be excluded.
              </p>
              <p>
                Nothing in these Terms & Conditions is intended to exclude or limit any consumer rights or statutory rights that cannot legally be excluded.
              </p>
            </section>

            {/* Section 18 */}
            <section id="sec-18" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                18. Changes to Products or Website
              </h2>
              <p>
                The Golden Egg reserves the right to modify, update, suspend, or discontinue any product, service, website feature, price, content, or functionality at any time without prior notice.
              </p>
            </section>

            {/* Section 19 */}
            <section id="sec-19" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                19. Privacy
              </h2>
              <p>
                The collection and use of customer information is governed by our{' '}
                <Link to="/privacy-policy" className="text-[#C28E58] hover:underline font-semibold">
                  Privacy Policy
                </Link>.
              </p>
              <p>
                By using the website, you acknowledge that you have read and understood the applicable privacy practices.
              </p>
            </section>

            {/* Section 20 */}
            <section id="sec-20" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                20. Governing Law
              </h2>
              <p>
                These Terms & Conditions shall be governed by and interpreted in accordance with the laws of <strong>India</strong>.
              </p>
              <p>
                Any dispute arising in connection with these Terms & Conditions or the use of the website shall be subject to the jurisdiction of the appropriate courts in <strong>Mysore, Karnataka, India</strong>.
              </p>
            </section>

            {/* Section 21 */}
            <section id="sec-21" className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                21. Contact Us
              </h2>
              <p>
                For questions, complaints, order-related issues, cancellations, refunds, or other concerns, please contact us through the contact details provided on our website.
              </p>

              <div className="bg-[#1A2E22]/5 dark:bg-stone-800/60 p-6 rounded-2xl border border-[#1A2E22]/10 dark:border-stone-700 space-y-3 text-xs sm:text-sm">
                <p className="font-serif font-bold text-[#1A2E22] dark:text-stone-100 text-base">
                  The Golden Egg
                </p>
                <div className="flex items-center space-x-3 text-stone-700 dark:text-stone-300">
                  <Mail className="w-4 h-4 text-[#C28E58] shrink-0" />
                  <span>Email: <a href="mailto:info@thegoldenegg.co.in" className="text-[#C28E58] hover:underline font-medium">info@thegoldenegg.co.in</a></span>
                </div>
                <div className="flex items-center space-x-3 text-stone-700 dark:text-stone-300">
                  <Phone className="w-4 h-4 text-[#C28E58] shrink-0" />
                  <span>Phone: <a href="tel:+917411932830" className="text-[#C28E58] hover:underline font-medium">+91 74119 32830</a></span>
                </div>
                <div className="flex items-start space-x-3 text-stone-700 dark:text-stone-300">
                  <MapPin className="w-4 h-4 text-[#C28E58] shrink-0 mt-0.5" />
                  <span>
                    Address: The Golden Egg, Doddanna ichanahalli village, Gonnikoppa road, Periyapatna, Mysore 571107, Karnataka, India
                  </span>
                </div>
              </div>
            </section>

            {/* Note Footer */}
            <div className="p-4 bg-stone-100 dark:bg-stone-800/80 rounded-xl text-xs text-stone-500 dark:text-stone-400 italic">
              Important Note: These Terms & Conditions are intended as a commercial website agreement for The Golden Egg website.
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
