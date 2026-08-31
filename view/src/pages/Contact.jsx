import React, { useState, useContext } from 'react';
import { Mail, MapPin, CheckCircle, Send, UserCheck } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

export const Contact = () => {
  const { API_URL } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry / Food Forest Story',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    try {
      const res = await axios.post(`${API_URL}/inquiries`, formData);
      if (res.data.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry / Food Forest Story',
          message: ''
        });
      }
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setErrorMsg('Could not submit inquiry right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
                    The Golden Egg  
                    Doddanna ichanahalli village Gonnikoppa road
                    Periyapatna, Mysore 571107<br />
                    Karnataka, India
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-[#F9F6F0] dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800 shadow-sm">
                <Mail className="h-6 w-6 text-[#C28E58] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-[#1A2E22] dark:text-white">Email Us</h3>
                  <a href="mailto:info@thegoldenegg.co.in" className="text-[#C28E58] font-bold hover:underline">
                    info@thegoldenegg.co.in
                  </a>
                </div>
              </div>

              {/* Phone & WhatsApp Support */}
              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-[#F9F6F0] dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800 shadow-sm">
                <div className="p-2 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.705 1.754zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#1A2E22] dark:text-white">Call & WhatsApp Support</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-0.5">
                    <a
                      href="https://wa.me/917411932830"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-extrabold hover:underline text-base"
                    >
                      <span>+91 74119 32830</span>
                    </a>
                    <span className="text-xs text-stone-400 font-mono">(Direct Call & WhatsApp)</span>
                  </div>
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
                  APPOINTMENT Topics <span className="text-red-500">*</span>
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
