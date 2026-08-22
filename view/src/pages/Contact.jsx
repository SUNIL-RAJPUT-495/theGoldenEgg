import React, { useState } from 'react';
import { Mail, MapPin, CheckCircle, Send, UserCheck } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry / Food Forest Story',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry / Food Forest Story',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-stone-950 transition-colors duration-300">
      
      {/* 9. CONTACT PAGE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28E58] bg-[#F9F6F0] dark:bg-stone-900 px-4 py-1.5 rounded-full inline-block">
          GET IN TOUCH
        </span>
        
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#1A2E22] dark:text-stone-100 tracking-tight leading-tight">
          We’d Love to Hear From You.
        </h1>
        
        <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
          Whether you have a question about our food forest, our ragi flour, our botanical and culinary powders, or our upcoming March 2027 Desi Egg launch—reach out below.
        </p>
      </section>

      {/* Visit & Connect + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visit & Connect */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-2xl font-serif font-bold text-[#1A2E22] dark:text-white">
              Visit & Connect
            </h2>

            <div className="space-y-6 text-sm text-stone-700 dark:text-stone-300 font-sans">
              
              {/* Location */}
              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-[#F9F6F0] dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800 shadow-sm">
                <MapPin className="h-6 w-6 text-[#C28E58] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-[#1A2E22] dark:text-white">Location</h3>
                  <p className="leading-relaxed">
                    Golden Egg Food Forest<br />
                    Periyapatna, Mysore District<br />
                    Karnataka, India
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-[#F9F6F0] dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800 shadow-sm">
                <Mail className="h-6 w-6 text-[#C28E58] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-[#1A2E22] dark:text-white">Email</h3>
                  <a href="mailto:support@thegoldenegg.org.in" className="text-[#C28E58] font-bold hover:underline">
                    support@thegoldenegg.org.in
                  </a>
                </div>
              </div>

              {/* Operational Note */}
              <p className="text-xs text-stone-600 dark:text-stone-400 italic leading-relaxed">
                Visits to the food forest are conducted by appointment to ensure our animal sanctuary and ecosystem remain undisturbed.
              </p>

              {/* Our Promise */}
              <div className="p-6 rounded-2xl bg-[#1A2E22] text-white space-y-3 shadow-lg">
                <div className="flex items-center space-x-2 text-[#C28E58] font-bold text-xs uppercase tracking-widest">
                  <UserCheck className="h-4 w-4" />
                  <span>Our Promise</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed italic font-serif">
                  Every inquiry is handled directly by our team. We do not use automated bots—because true connection starts with real people.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7 bg-[#F9F6F0] dark:bg-stone-900 p-8 sm:p-10 rounded-3xl border border-stone-200/60 dark:border-stone-800 shadow-sm">
            
            <div className="mb-6 space-y-1">
              <h3 className="text-2xl font-serif font-bold text-[#1A2E22] dark:text-white">
                Send Us a Message
              </h3>
            </div>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 rounded-2xl text-sm font-semibold flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>Thank you! Your message has been received. We will respond directly to your email shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-stone-950 px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1A2E22] text-sm"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-stone-950 px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1A2E22] text-sm"
                />
              </div>

              {/* Inquiry Topics (Exact 5 topics from Website Content Master) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Inquiry Topics <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-stone-950 px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1A2E22] text-sm font-medium text-stone-800 dark:text-stone-100"
                >
                  <option value="General Inquiry / Food Forest Story">General Inquiry / Food Forest Story</option>
                  <option value="Ragi Flour & Product Orders">Ragi Flour & Product Orders</option>
                  <option value="Botanical & Culinary Powders">Botanical & Culinary Powders</option>
                  <option value="March 2027 Desi Egg Waitlist">March 2027 Desi Egg Waitlist</option>
                  <option value="Farm Collaboration / Wholesale">Farm Collaboration / Wholesale</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-stone-950 px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1A2E22] text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#1A2E22] hover:bg-[#14241b] text-white font-bold text-sm py-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* Quick Support */}
      <section className="bg-[#F9F6F0] dark:bg-stone-900 border-t border-stone-200/60 dark:border-stone-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A2E22] dark:text-white text-center">
            Quick Support
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 bg-white dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-[#1A2E22] dark:text-white">
                Orders & Shipping
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                All active products are shipped directly from our Mysore food forest.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-[#1A2E22] dark:text-white">
                The 2-Year Shelf Life
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Curious about how our freeze-dried powders stay fresh without preservatives? Drop us a line above.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-[#1A2E22] dark:text-white">
                Egg Waitlist
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Want early access when our ethical Desi Eggs launch in March 2027? Join the waitlist.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
