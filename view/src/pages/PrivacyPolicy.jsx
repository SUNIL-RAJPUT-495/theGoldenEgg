import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, Mail, Phone, MapPin, ChevronRight, FileText } from 'lucide-react';

export const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'sec-1', title: '1. Information We Collect' },
    { id: 'sec-2', title: '2. How We Use Your Information' },
    { id: 'sec-3', title: '3. Payment Information' },
    { id: 'sec-4', title: '4. Cookies' },
    { id: 'sec-5', title: '5. Sharing of Information' },
    { id: 'sec-6', title: '6. Data Security' },
    { id: 'sec-7', title: '7. Data Retention' },
    { id: 'sec-8', title: '8. Your Rights' },
    { id: 'sec-9', title: "9. Children's Privacy" },
    { id: 'sec-10', title: '10. Third-Party Websites' },
    { id: 'sec-11', title: '11. Marketing Communications' },
    { id: 'sec-12', title: '12. Changes to This Privacy Policy' },
    { id: 'sec-13', title: '13. Contact Us' }
  ];

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen text-stone-800 dark:text-stone-200 transition-colors duration-300 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#1A2E22] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
          <ShieldCheck className="w-80 h-80 text-white" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#C28E58] uppercase tracking-wider">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span>Legal</span>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-stone-300">Privacy Policy</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
            Privacy Policy
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-2">
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Effective Date: <b>8 September 2026</b>
            </span>
            <span className="text-stone-400">• Website: <b>https://thegoldenegg.co.in/</b></span>
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
                Welcome to <strong>The Golden Egg</strong>. We respect your privacy and are committed to protecting the personal information you provide while using our website, purchasing our products, or communicating with us.
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                This Privacy Policy explains how we collect, use, store, and protect your information when you visit or use{' '}
                <a href="https://thegoldenegg.co.in/" target="_blank" rel="noopener noreferrer" className="text-[#C28E58] hover:underline font-semibold">
                  https://thegoldenegg.co.in/
                </a>.
              </p>
            </div>

            {/* Section 1 */}
            <section id="sec-1" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                1. Information We Collect
              </h2>
              <p>
                When you use our website or place an order, we may collect the following information:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>Full name</li>
                <li>Mobile/telephone number</li>
                <li>Email address</li>
                <li>Billing and shipping address</li>
                <li>Delivery details</li>
                <li>Order and purchase information</li>
                <li>Payment-related information required to process your order</li>
                <li>Any information you voluntarily provide when contacting us</li>
                <li>Technical information such as IP address, browser type, device information, and website usage data</li>
              </ul>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                We only collect information that is reasonably necessary for providing our products and services.
              </p>
            </section>

            {/* Section 2 */}
            <section id="sec-2" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                2. How We Use Your Information
              </h2>
              <p>The information collected may be used to:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>Process and fulfill your orders</li>
                <li>Arrange delivery of purchased products</li>
                <li>Communicate with you regarding your orders</li>
                <li>Respond to your enquiries and requests</li>
                <li>Provide customer support</li>
                <li>Process payments and refunds where applicable</li>
                <li>Improve our website, products, and customer experience</li>
                <li>Maintain records of transactions</li>
                <li>Prevent fraudulent or unauthorized activities</li>
                <li>Send promotional or marketing communications where you have provided appropriate consent</li>
                <li>Comply with applicable legal and regulatory requirements</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="sec-3" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                3. Payment Information
              </h2>
              <p>
                Payments made through our website may be processed by third-party payment service providers.
              </p>
              <p>
                The Golden Egg does not intend to store complete payment card details such as your full debit card or credit card number on its own servers. Payment information may be securely processed by the relevant payment service provider in accordance with its own privacy and security policies.
              </p>
            </section>

            {/* Section 4 */}
            <section id="sec-4" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                4. Cookies
              </h2>
              <p>
                Our website may use cookies and similar technologies to improve website functionality and user experience.
              </p>
              <p>Cookies may help us:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>Remember user preferences</li>
                <li>Understand how visitors use our website</li>
                <li>Improve website performance</li>
                <li>Analyze website traffic</li>
                <li>Provide relevant website functionality</li>
              </ul>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                You may choose to disable cookies through your browser settings. However, disabling certain cookies may affect the functionality of the website.
              </p>
            </section>

            {/* Section 5 */}
            <section id="sec-5" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                5. Sharing of Information
              </h2>
              <p>
                We do not sell or rent your personal information to third parties.
              </p>
              <p>
                We may share necessary information with trusted third parties when required to provide our services, including:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>Delivery and logistics partners</li>
                <li>Payment processing service providers</li>
                <li>Website hosting and technology service providers</li>
                <li>Analytics or website service providers</li>
                <li>Professional or legal advisors where necessary</li>
                <li>Government authorities or law-enforcement agencies when legally required</li>
              </ul>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Such information will be shared only to the extent reasonably necessary for the relevant purpose or where required by law.
              </p>
            </section>

            {/* Section 6 */}
            <section id="sec-6" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                6. Data Security
              </h2>
              <p>
                We take reasonable technical and organizational measures to protect your personal information against unauthorized access, misuse, alteration, disclosure, or destruction.
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                However, no method of transmitting information over the internet or storing information electronically can be guaranteed to be completely secure.
              </p>
            </section>

            {/* Section 7 */}
            <section id="sec-7" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                7. Data Retention
              </h2>
              <p>We retain personal information only for as long as reasonably necessary to:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>Fulfill your orders and provide customer support</li>
                <li>Maintain business and transaction records</li>
                <li>Resolve disputes</li>
                <li>Prevent fraud and misuse</li>
                <li>Comply with applicable legal, accounting, and regulatory requirements</li>
              </ul>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                When personal information is no longer required, we may securely delete or anonymize it.
              </p>
            </section>

            {/* Section 8 */}
            <section id="sec-8" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                8. Your Rights
              </h2>
              <p>Subject to applicable law, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-stone-700 dark:text-stone-300">
                <li>Request access to personal information held by us</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of personal information where legally permitted</li>
                <li>Withdraw consent for certain communications</li>
                <li>Opt out of promotional communications</li>
              </ul>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                You can contact us using the details provided below to exercise applicable privacy rights.
              </p>
            </section>

            {/* Section 9 */}
            <section id="sec-9" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                9. Children's Privacy
              </h2>
              <p>
                Our website and products are not intentionally directed toward children who are below the legally applicable age for providing personal information without parental or guardian consent.
              </p>
              <p>
                We do not knowingly collect personal information from children for independent use of our services.
              </p>
            </section>

            {/* Section 10 */}
            <section id="sec-10" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                10. Third-Party Websites
              </h2>
              <p>
                Our website may contain links to third-party websites, services, or platforms.
              </p>
              <p>
                We are not responsible for the privacy practices, security, or content of third-party websites. We recommend reviewing the privacy policies of those websites before providing them with personal information.
              </p>
            </section>

            {/* Section 11 */}
            <section id="sec-11" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                11. Marketing Communications
              </h2>
              <p>
                If you provide your contact details and consent to receive promotional communications, we may contact you about our products, offers, updates, or other relevant information.
              </p>
              <p>
                You may opt out of promotional communications at any time by contacting us or using the unsubscribe option provided in applicable communications.
              </p>
            </section>

            {/* Section 12 */}
            <section id="sec-12" className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                12. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our business, website, services, or applicable legal requirements.
              </p>
              <p>
                Any updated version will be published on this page with a revised <em>Effective Date</em>.
              </p>
            </section>

            {/* Section 13 */}
            <section id="sec-13" className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-stone-100">
                13. Contact Us
              </h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or the way we handle your personal information, please contact:
              </p>

              <div className="bg-[#1A2E22]/5 dark:bg-stone-800/60 p-6 rounded-2xl border border-[#1A2E22]/10 dark:border-stone-700 space-y-3 text-xs sm:text-sm">
                <p className="font-serif font-bold text-[#1A2E22] dark:text-stone-100 text-base">
                  The Golden Egg
                </p>
                <div className="flex items-center space-x-3 text-stone-700 dark:text-stone-300">
                  <span className="font-semibold text-stone-900 dark:text-stone-100 shrink-0">Website:</span>
                  <a href="https://thegoldenegg.co.in/" target="_blank" rel="noopener noreferrer" className="text-[#C28E58] hover:underline font-medium truncate">
                    https://thegoldenegg.co.in/
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
                <div className="flex items-start space-x-3 text-stone-700 dark:text-stone-300">
                  <MapPin className="w-4 h-4 text-[#C28E58] shrink-0 mt-0.5" />
                  <span>
                    Business Address: The Golden Egg, Doddanna ichanahalli village, Gonnikoppa road, Periyapatna, Mysore 571107, Karnataka, India
                  </span>
                </div>
              </div>
            </section>

            {/* Acknowledgment */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-xs text-emerald-900 dark:text-emerald-200">
              By using our website, you acknowledge that you have read and understood this Privacy Policy.
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
