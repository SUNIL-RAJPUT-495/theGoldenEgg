import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  ArrowRight, Heart, ShoppingCart, Sparkles, CheckCircle, 
  Box, Leaf, HelpCircle, ShieldCheck, Globe, Download, X, Check, Calendar, Sprout
} from 'lucide-react';

export const Home = () => {
  const { products, addToCart, toggleWishlist, wishlist } = useContext(AppContext);
  const [selectedRecipe, setSelectedRecipe] = useState('Porridge');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  // Partnership Modal state
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const [partnerFormData, setPartnerFormData] = useState({
    name: '',
    email: '',
    organization: '',
    country: '',
    message: ''
  });
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (waitlistEmail) {
      setWaitlistSubmitted(true);
      setWaitlistEmail('');
      setWaitlistName('');
      setTimeout(() => setWaitlistSubmitted(false), 6000);
    }
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    setPartnerSubmitted(true);
    setTimeout(() => {
      setPartnerSubmitted(false);
      setShowPartnershipModal(false);
      setPartnerFormData({ name: '', email: '', organization: '', country: '', message: '' });
    }, 4000);
  };

  const handleDownloadBrief = () => {
    const briefContent = `====================================================
THE GOLDEN EGG - GLOBAL EXPANSION BRIEF
Rooted in Nature. Grown with Compassion.
Periyapatna, Mysore District, Karnataka, India
====================================================

GLOBAL PARTNERSHIP INVITATION
Invest in the Future of Conscious Agriculture

As we scale our proven model from our foundational food forest in Periyapatna to international soil, Golden Egg invites visionary global partners and investors to co-create the future of conscious agriculture.

We are opening strategic opportunities to establish larger, self-sustaining food forest farms abroad, dedicated exclusively to cultivating our signature Annapurna Collection—pure, chemical-free kitchen essentials and long-shelf-life botanical powders.

By blending ancestral wisdom with ethical, zero-culling stewardship, this partnership offers a rare chance to scale high-impact, regenerative agriculture while meeting the booming global demand for uncompromising food transparency and wellness.

Contact Email: support@thegoldenegg.org.in
Location: Golden Egg Food Forest, Periyapatna, Mysore District, Karnataka, India
====================================================`;
    const blob = new Blob([briefContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Golden_Egg_Global_Expansion_Brief.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Annapurna Collection Categories (Exact text from document)
  const culinaryEssentials = [
    { name: "Turmeric Powder", desc: "Deeply golden, high-curcumin roots." },
    { name: "Garlic & Onion Powder", desc: "Rich, umami-packed aromatics." },
    { name: "Ginger & Pepper Powder", desc: "Potent heat, sun-dried for maximum potency." },
    { name: "Tomato & Carrot Powder", desc: "Concentrated ingredients for soups, stews and smoothies." },
    { name: "Beetroot Powder", desc: "A vibrant addition to everyday recipes." }
  ];

  const botanicalApothecary = [
    { name: "Tulsi (Holy Basil) Powder", desc: "A traditional botanical for everyday wellness rituals." },
    { name: "Rose Powder", desc: "Sustainably harvested petals for culinary infusion and skincare." }
  ];

  // Everyday Uses matching document text
  const recipes = {
    Porridge: {
      title: "Ragi Porridge",
      description: "Prepare a smooth, comforting porridge with water or milk, and customize with sweet or savoury ingredients."
    },
    Rotis: {
      title: "Ragi Rotis",
      description: "Knead into dough and prepare traditional flatbreads to serve with dals, vegetables and curries."
    },
    Dosas: {
      title: "Ragi Dosas",
      description: "Blend with dosa batter to create crisp, flavourful breakfast or light-meal options."
    },
    Pancakes: {
      title: "Ragi Pancakes",
      description: "Add to your favourite pancake recipe for a distinctive, nutty grain flavour."
    },
    Bakes: {
      title: "Ladoos, Cookies & Bakes",
      description: "Use in homemade ladoos, cookies and other traditional or contemporary baked preparations."
    }
  };

  // Exact 6 FAQs from Website Content Master document
  const faqs = [
    {
      question: "Is ragi powder the same as ragi flour?",
      answer: "Yes. In everyday usage, ragi powder and ragi flour generally refer to finely milled finger millet used for cooking and baking."
    },
    {
      question: "What can I make with Organic Ragi Flour?",
      answer: "It can be used for rotis, dosas, porridges, pancakes, ladoos, cookies and other homemade preparations."
    },
    {
      question: "Is the ragi flour organic?",
      answer: "The product is positioned as organic ragi flour. The final packaging should carry the applicable organic certification and approved organic claim."
    },
    {
      question: "Is ragi naturally gluten-free?",
      answer: "Ragi is naturally gluten-free. Individuals with celiac disease or medically diagnosed gluten sensitivity should check the product label for applicable processing and allergen information."
    },
    {
      question: "How should I store ragi flour after opening?",
      answer: "Keep it tightly sealed in a cool, dry place away from moisture, heat and direct sunlight."
    },
    {
      question: "Can ragi be included in an everyday diet?",
      answer: "Ragi can be included as part of a varied and balanced diet. Individual dietary needs and preferences may differ."
    }
  ];

  return (
    <div className="space-y-24 pb-24 font-sans bg-white dark:bg-stone-950 transition-colors duration-300">
      
      {/* 1. THE HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#1A2E22] text-white">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#1A2E22]/90 via-[#1A2E22]/75 to-black/70" />
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80"
          alt="Golden Egg Food Forest"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-8">
          
          <div className="inline-block bg-[#C28E58]/20 backdrop-blur-md border border-[#C28E58]/40 px-6 py-2 rounded-full">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#C28E58]">
              100% ORGANIC • ETHICAL FARMING
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-tight text-white drop-shadow-md">
            Rooted in Nature.<br />
            <span className="italic font-normal text-[#F9F6F0]">Grown with Compassion.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#F9F6F0]/90 max-w-3xl mx-auto font-light leading-relaxed">
            Welcome to Golden Egg—a thriving 4-acre food forest where hyper-local soil meets uncompromised purity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
            <a
              href="#offering"
              className="bg-[#C28E58] hover:bg-[#a97745] text-stone-950 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-xl hover:scale-105"
            >
              Explore Ragi Flour
            </a>
            
            <a
              href="#ethos"
              className="bg-transparent hover:bg-white/10 text-[#F9F6F0] border-2 border-[#F9F6F0]/40 hover:border-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full transition-all backdrop-blur-sm"
            >
              Our Ethical Promise
            </a>
          </div>

        </div>
      </section>

      {/* 2. THE CORE ETHOS */}
      <section id="ethos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center rounded-3xl overflow-hidden bg-[#F9F6F0] dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 shadow-md">
          
          <div className="lg:col-span-5 relative h-80 lg:h-full min-h-[420px] bg-stone-200">
            <img
              src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80"
              alt="The Heart of Golden Egg"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C28E58]">
              THE HEART OF GOLDEN EGG
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#1A2E22] dark:text-white leading-tight">
              Life Without Compromise.
            </h2>

            <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              In conventional farming, animals are often treated as commodities and their value can be reduced to their productive output. At Golden Egg, we believe otherwise. We never cull our birds.
            </p>

            <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Even after reaching their natural menopausal stage, every single bird remains a valued citizen of our food forest, living out its full, natural lifespan in complete freedom. They contribute naturally to soil fertility and ecological balance, proving that farming can be deeply productive without losing its soul.
            </p>

            <div className="p-6 bg-white dark:bg-stone-950 rounded-2xl border-l-4 border-[#C28E58] space-y-1 shadow-sm">
              <p className="font-serif italic text-base sm:text-lg text-[#1A2E22] dark:text-stone-200">
                “True sustainability starts with how we treat the living ecosystem we share.”
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CURRENT OFFERING */}
      <section id="offering" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header & Main Narrative */}
        <div className="bg-[#F9F6F0] dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200/60 dark:border-stone-800 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28E58] block">
              3. CURRENT OFFERING
            </span>
            <p className="text-sm font-bold text-[#C28E58] uppercase tracking-wider">
              Harvested Today, From Our Forest
            </p>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#1A2E22] dark:text-white leading-tight">
            Organic Ragi Flour
          </h2>

          <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Ragi, also known as finger millet, nachni or mandua, has long been valued in Indian kitchens for its distinctive earthy taste and naturally occurring nutrients.
          </p>

          <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            The Golden Egg’s Organic Ragi Flour brings this traditional grain into the modern kitchen as a versatile flour made from organically grown ragi.
          </p>

          <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Made from carefully selected organic finger millet grains, our ragi is cleaned and processed before being milled into a convenient flour for everyday cooking. It is suited to traditional Indian preparations as well as contemporary recipes.
          </p>
        </div>

        {/* Why Choose Organic Ragi? */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A2E22] dark:text-white">
              Why Choose Organic Ragi?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm hover:shadow-md transition-all">
              <h4 className="font-bold text-base text-[#1A2E22] dark:text-white">Organic Finger Millet</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Made from organically grown ragi, reflecting our commitment to working with nature and building a food system rooted in care, responsibility and respect for the living ecosystem.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm hover:shadow-md transition-all">
              <h4 className="font-bold text-base text-[#1A2E22] dark:text-white">Naturally Nutritious</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Ragi naturally provides carbohydrates, plant protein, dietary fibre and minerals.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm hover:shadow-md transition-all">
              <h4 className="font-bold text-base text-[#1A2E22] dark:text-white">Naturally Rich in Calcium</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Ragi is naturally known for its calcium content, an important mineral in a balanced diet.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm hover:shadow-md transition-all">
              <h4 className="font-bold text-base text-[#1A2E22] dark:text-white">Naturally Gluten-Free</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Ragi itself is naturally gluten-free. Please refer to the product label for applicable processing and allergen information.
              </p>
            </div>

          </div>
        </div>

        {/* From Grain to Flour */}
        <div className="p-8 sm:p-10 bg-[#1A2E22] text-white rounded-3xl space-y-3 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            From Grain to Flour
          </h3>
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
            Our ragi flour begins with carefully selected organic finger millet grains. The grains undergo appropriate cleaning and processing before being milled into flour.
          </p>
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
            The finished flour is packed to make it convenient for everyday use in the home kitchen.
          </p>
        </div>

        {/* Everyday Uses */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A2E22] dark:text-white">
              Everyday Uses
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-4 flex flex-col space-y-3">
              {Object.keys(recipes).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedRecipe(key)}
                  className={`w-full text-left px-6 py-4 rounded-2xl flex items-center justify-between font-bold text-sm border transition-all ${
                    selectedRecipe === key
                      ? 'bg-[#1A2E22] text-white border-[#1A2E22] shadow-md'
                      : 'bg-[#F9F6F0] dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{recipes[key].title}</span>
                  <CheckCircle className={`h-4 w-4 ${selectedRecipe === key ? 'text-[#C28E58]' : 'text-stone-300 dark:text-stone-700'}`} />
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 bg-[#F9F6F0] dark:bg-stone-900 p-8 sm:p-10 rounded-3xl border border-stone-200/60 dark:border-stone-800 space-y-4">
              <h4 className="text-2xl font-serif font-bold text-[#1A2E22] dark:text-white">
                {recipes[selectedRecipe].title}
              </h4>
              <p className="text-base text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                {recipes[selectedRecipe].description}
              </p>
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <Link to="/products" className="text-xs font-bold text-[#C28E58] hover:underline flex items-center space-x-1">
                  <span>Shop Ragi Flour</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Organic Ragi Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.filter(p => p.category === 'Organic Flours').slice(0, 3).map((p) => {
            const isWish = wishlist.some(item => item._id === p._id);
            return (
              <div
                key={p._id}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="relative pt-[80%] bg-[#F9F6F0] dark:bg-stone-850 overflow-hidden">
                  <img
                    src={p.images?.[0] || 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=600&q=80'}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-4 right-4 h-10 w-10 bg-white/90 dark:bg-stone-900/90 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 text-stone-500 hover:text-red-500 transition-all shadow-sm"
                  >
                    <Heart className={`h-5 w-5 ${isWish ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C28E58] bg-[#F9F6F0] dark:bg-stone-800 px-2.5 py-1 rounded-md inline-block">
                      {p.category}
                    </span>
                    <h4 className="font-serif font-bold text-lg text-[#1A2E22] dark:text-white">
                      {p.name}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
                    <div className="text-2xl font-black text-[#1A2E22] dark:text-white">
                      ₹{p.price}
                    </div>
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="bg-[#1A2E22] hover:bg-[#14241b] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-transform hover:scale-105 shadow-md flex items-center space-x-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-4xl mx-auto space-y-8 pt-8 border-t border-stone-200 dark:border-stone-800">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#1A2E22] dark:text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#F9F6F0] dark:bg-stone-900 rounded-2xl border border-stone-200/50 dark:border-stone-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex justify-between items-center font-bold text-sm sm:text-base text-[#1A2E22] dark:text-white focus:outline-none"
                  >
                    <span className="flex items-center space-x-3 pr-4">
                      <HelpCircle className="h-5 w-5 text-[#C28E58] shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed border-t border-stone-200/60 dark:border-stone-800">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* 4. THE GOLDEN HARVEST — THE ANNAPURNA COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#F9F6F0] dark:bg-stone-900/70 rounded-3xl border border-stone-200/60 dark:border-stone-800 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28E58]">
              4. THE GOLDEN HARVEST — THE ANNAPURNA COLLECTION
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1A2E22] dark:text-white leading-tight">
              The Annapurna Collection: Nature, Preserved.
            </h2>

            <h4 className="text-lg font-medium text-[#C28E58] italic font-serif">
              Pure, Heritage Essentials for your Kitchen.
            </h4>

            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Our food forest captures the essence of traditional Indian wellness. We have curated a signature range of dehydrated botanical and culinary powders—bringing the ancient wisdom of the soil directly to your home kitchen.
            </p>

            <div className="p-6 bg-white dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm">
              <h5 className="font-bold text-[#1A2E22] dark:text-white text-base flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-[#C28E58]" />
                <span>Built to Last, Naturally.</span>
              </h5>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Through advanced preservation techniques, our freeze-dried powders offer an exceptional shelf life of over 2 years—without a single synthetic additive or preservative. Pure, potent, and pantry-ready.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            
            {/* Culinary Foundations */}
            <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C28E58]">
                <Box className="h-4 w-4" />
                <span>Culinary Foundations — The Essentials</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {culinaryEssentials.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#F9F6F0] dark:bg-stone-900 rounded-xl space-y-1">
                    <h5 className="font-bold text-sm text-[#1A2E22] dark:text-white">{item.name}</h5>
                    <p className="text-xs text-stone-600 dark:text-stone-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Botanical Wellness */}
            <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C28E58]">
                <Leaf className="h-4 w-4" />
                <span>Botanical Wellness — The Apothecary</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {botanicalApothecary.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#F9F6F0] dark:bg-stone-900 rounded-xl space-y-1">
                    <h5 className="font-bold text-sm text-[#1A2E22] dark:text-white">{item.name}</h5>
                    <p className="text-xs text-stone-600 dark:text-stone-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-right">
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-[#1A2E22] hover:bg-[#14241b] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-transform hover:scale-105 shadow-md"
              >
                <span>Shop Annapurna Powders</span>
                <ArrowRight className="h-4 w-4 text-[#C28E58]" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 5. THE JOURNEY & ECOSYSTEM */}
      <section id="ecosystem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28E58]">
            5. THE JOURNEY & ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#1A2E22] dark:text-white">
            A Living, Breathing Ecosystem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Foundation */}
          <div className="bg-[#F9F6F0] dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/60 dark:border-stone-800 space-y-4 relative flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28E58] bg-white dark:bg-stone-800 px-3 py-1 rounded-md inline-block">
                The Foundation
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#1A2E22] dark:text-white">
                4 Acres of Forest Agriculture
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                Designed from day one to honor nature’s design, transforming raw land into a self-sustaining food forest.
              </p>
            </div>
            <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center space-x-2 text-xs font-bold text-stone-500">
              <Sprout className="h-4 w-4 text-[#C28E58]" />
              <span>Periyapatna, Mysore</span>
            </div>
          </div>

          {/* Expansion */}
          <div className="bg-[#F9F6F0] dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/60 dark:border-stone-800 space-y-4 relative flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28E58] bg-white dark:bg-stone-800 px-3 py-1 rounded-md inline-block">
                The Expansion
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#1A2E22] dark:text-white">
                Chemical-Free Abundance
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                Cultivating seasonal fruits, vegetables, grains, pulses, spices, and premium natural powders.
              </p>
            </div>
            <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center space-x-2 text-xs font-bold text-stone-500">
              <Leaf className="h-4 w-4 text-[#C28E58]" />
              <span>100% Zero Chemicals</span>
            </div>
          </div>

          {/* Future */}
          <div className="bg-[#1A2E22] text-white p-8 rounded-3xl border border-[#14241b] space-y-4 relative flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28E58] bg-white/10 px-3 py-1 rounded-md inline-block">
                The Future
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">
                The 2027 Flock Launch
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-medium">
                Ethical, stress-free expansion of our native Naati-Koli flock, leading up to our commercial desi egg launch in March 2027.
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 flex items-center space-x-2 text-xs font-bold text-[#C28E58]">
              <Calendar className="h-4 w-4" />
              <span>Launch: March 2027</span>
            </div>
          </div>

        </div>
      </section>

      {/* 6. CULTIVATE A LEGACY OF PURITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1A2E22] via-[#243f2f] to-[#14241b] text-white p-8 sm:p-12 lg:p-16 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C28E58] bg-white/10 px-4 py-1.5 rounded-full inline-block">
              6. CULTIVATE A LEGACY OF PURITY
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              Global Partnership Invitation
            </h2>

            <h3 className="text-lg sm:text-2xl font-medium text-[#C28E58] font-serif">
              Invest in the Future of Conscious Agriculture
            </h3>
          </div>

          <div className="max-w-4xl space-y-4 text-stone-200 text-sm sm:text-base leading-relaxed relative z-10 font-sans">
            <p>
              As we scale our proven model from our foundational food forest in Periyapatna to international soil, Golden Egg invites visionary global partners and investors to co-create the future of conscious agriculture.
            </p>
            <p>
              We are opening strategic opportunities to establish larger, self-sustaining food forest farms abroad, dedicated exclusively to cultivating our signature Annapurna Collection—pure, chemical-free kitchen essentials and long-shelf-life botanical powders.
            </p>
            <p className="font-medium text-white pt-2">
              By blending ancestral wisdom with ethical, zero-culling stewardship, this partnership offers a rare chance to scale high-impact, regenerative agriculture while meeting the booming global demand for uncompromising food transparency and wellness.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 pt-4 relative z-10">
            <button
              onClick={() => setShowPartnershipModal(true)}
              className="bg-[#C28E58] hover:bg-[#a97745] text-stone-950 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-xl hover:scale-105 flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span>Explore International Partnership</span>
            </button>

            <button
              onClick={handleDownloadBrief}
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all flex items-center space-x-2 backdrop-blur-sm"
            >
              <Download className="h-4 w-4" />
              <span>Download Global Expansion Brief</span>
            </button>
          </div>

        </div>
      </section>

      {/* 7. FUTURE ANTICIPATION & LEAD CAPTURE */}
      <section className="bg-[#1A2E22] text-white py-20 transition-colors duration-300 border-t border-[#14241b]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C28E58] bg-white/10 px-4 py-1.5 rounded-full inline-block">
              7. FUTURE ANTICIPATION & LEAD CAPTURE
            </span>

            <p className="text-xs font-bold text-[#C28E58] tracking-widest uppercase">
              COMING MARCH 2027
            </p>
            
            <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
              The Return of the Ethical Desi Egg
            </h2>
            
            <p className="text-base sm:text-lg text-[#F9F6F0]/90 max-w-2xl mx-auto leading-relaxed">
              Our flock is expanding naturally and stress-free within our food forest sanctuary. Our life-honored, forest-grazed Desi eggs will officially launch in March 2027.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl font-serif font-bold text-[#C28E58]">
                Why Wait for Golden Egg?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="p-6 bg-red-950/40 border border-red-900/40 rounded-2xl space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-red-400 block">
                  The Industrial Reality
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                  Standard commercial egg production can involve intensive systems that place birds in environments far removed from natural living conditions.
                </p>
              </div>

              <div className="p-6 bg-emerald-950/50 border border-emerald-800/40 rounded-2xl space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">
                  The Golden Egg Difference
                </h4>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans font-medium">
                  Our forest-grazed, life-honored birds will be raised within a living ecosystem, guided by our zero-culling and ethical farming principles.
                </p>
              </div>

            </div>
          </div>

          {/* Lead Capture Form */}
          <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/15 text-center space-y-6 shadow-2xl">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                Join the Inner Circle
              </h3>
              <p className="text-xs sm:text-sm text-[#F9F6F0]/80">
                Get Priority Access
              </p>
            </div>

            {waitlistSubmitted ? (
              <div className="p-5 bg-emerald-900/90 text-emerald-200 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2">
                <Check className="h-5 w-5 text-emerald-400 shrink-0" />
                <span>You are on the VIP Inner Circle waitlist! We will notify you in March 2027.</span>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  value={waitlistName}
                  onChange={(e) => setWaitlistName(e.target.value)}
                  className="w-full bg-white/10 text-white placeholder-stone-400 px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:border-[#C28E58] text-sm"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="flex-1 bg-white/10 text-white placeholder-stone-400 px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:border-[#C28E58] text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-[#C28E58] hover:bg-[#a97745] text-stone-950 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md shrink-0"
                  >
                    Get Priority Access
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Global Partnership Modal */}
      {showPartnershipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setShowPartnershipModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:hover:text-white p-2 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28E58]">
                GLOBAL PARTNERSHIP INVITATION
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#1A2E22] dark:text-white">
                Invest in the Future of Conscious Agriculture
              </h3>
            </div>

            {partnerSubmitted ? (
              <div className="p-6 bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 rounded-2xl text-sm font-semibold flex items-center space-x-3">
                <Check className="h-6 w-6 text-emerald-600 shrink-0" />
                <span>Thank you for reaching out. Our team will get back to you shortly.</span>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={partnerFormData.name}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, name: e.target.value })}
                    className="w-full bg-stone-100 dark:bg-stone-800 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#C28E58]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={partnerFormData.email}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, email: e.target.value })}
                    className="w-full bg-stone-100 dark:bg-stone-800 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#C28E58]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Company / Organization"
                    value={partnerFormData.organization}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, organization: e.target.value })}
                    className="w-full bg-stone-100 dark:bg-stone-800 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#C28E58]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Country / Region *"
                    value={partnerFormData.country}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, country: e.target.value })}
                    className="w-full bg-stone-100 dark:bg-stone-800 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#C28E58]"
                  />
                </div>

                <textarea
                  rows={3}
                  required
                  placeholder="Your Partnership Inquiry *"
                  value={partnerFormData.message}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, message: e.target.value })}
                  className="w-full bg-stone-100 dark:bg-stone-800 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#C28E58]"
                />

                <button
                  type="submit"
                  className="w-full bg-[#1A2E22] hover:bg-[#14241b] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <span>Submit Partnership Inquiry</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
export default Home;
