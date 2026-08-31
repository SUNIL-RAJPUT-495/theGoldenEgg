import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  ArrowRight, Heart, ShoppingCart, Sparkles, CheckCircle, 
  Box, Leaf, ShieldCheck, Globe, Download, X, Check, Calendar, Sprout
} from 'lucide-react';
import forestimage from '../assets/forestimage.jpeg';

export const Home = () => {
  const { products, addToCart, toggleWishlist, wishlist } = useContext(AppContext);
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

As we scale our proven model from our foundational food forest in Periyapatna to international soil, The Golden Egg invites visionary global partners and investors to co-create the future of conscious agriculture.

We are opening strategic opportunities to establish larger, self-sustaining food forest farms abroad, dedicated exclusively to cultivating our signature Annapurna Collection—pure, chemical-free kitchen essentials and long-shelf-life botanical powders.

By blending ancestral wisdom with ethical, zero-culling stewardship, this partnership offers a rare chance to scale high-impact, regenerative agriculture while meeting the booming global demand for uncompromising food transparency and wellness.

Contact Email: support@thegoldenegg.org.in
Location: The Golden Egg Food Forest, Periyapatna, Mysore District, Karnataka, India
====================================================`;
    const blob = new Blob([briefContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'The_Golden_Egg_Global_Expansion_Brief.txt';
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

  return (
    <div className="space-y-24 pb-24 font-sans bg-white dark:bg-stone-950 transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1A2E22] text-white">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#1A2E22]/95 via-[#1A2E22]/80 to-black/70" />
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80"
          alt="The Golden Egg Food Forest"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-8">
          
          <div className="inline-block bg-[#C28E58]/20 backdrop-blur-md border border-[#C28E58]/40 px-6 py-2 rounded-full">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#C28E58]">
              Organic Food Forest 
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-tight text-white drop-shadow-md">
            Rooted in Nature.<br />
            <span className="italic font-normal text-[#F9F6F0]">Grown with Compassion.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#F9F6F0]/90 max-w-3xl mx-auto font-light leading-relaxed">
            Welcome to <b>The Golden Egg</b>—a thriving 4-acre food forest where hyper-local soil meets uncompromised purity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
            <Link
              to="/products"
              className="bg-[#C28E58] hover:bg-[#a97745] text-stone-950 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-xl hover:scale-105"
            >
              Explore Ragi Flour
            </Link>
            
            <a
              href="#ethos"
              className="bg-transparent hover:bg-white/10 text-[#F9F6F0] border-2 border-[#F9F6F0]/40 hover:border-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full transition-all backdrop-blur-sm"
            >
              Our Ethical Promise
            </a>
          </div>

        </div>
      </section>

      {/* 2. THE FOOD FOREST INTRODUCTION & STORY (Placed immediately beneath Hero Section) */}
      <section id="food-forest" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F9F6F0] dark:bg-stone-900 rounded-3xl p-8 sm:p-14 border border-stone-200/60 dark:border-stone-800 space-y-10 shadow-sm">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C28E58] bg-white dark:bg-stone-800 px-4 py-1.5 rounded-full inline-block">
              <b>THE GOLDEN EGG</b> FOOD FOREST
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#1A2E22] dark:text-white leading-tight">
              Pure, Chemical-Free Superfoods Born from a Living Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            <div className="lg:col-span-7 space-y-6 text-stone-700 dark:text-stone-300 text-base leading-relaxed font-sans">
              <p className="font-medium text-stone-800 dark:text-stone-100 text-lg">
                <b>The Golden Egg</b> began with a singular vision: to nurture high-nutrition, forest-grazed Desi eggs through pure, organic, and natural farming. Today, that vision has grown into a vibrant, multi-layered Food Forest in Periyapatna, Mysore district.
              </p>

              <p>
                We cultivate natural, chemical-free produce, health-restoring grains, seasonal fruits, vegetables, pulses, and spices. Every product from our soil is a step toward conscious living and uncompromised wellness.
              </p>

              <div className="pt-4 border-t border-stone-300/60 dark:border-stone-800 space-y-3">
                <h3 className="text-xl font-serif font-bold text-[#1A2E22] dark:text-white">
                  Our Story: Rooted in Nature, Guided by Compassion
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  <b>The Golden Egg</b> was founded on 4 acres of lush forest agricultural land, designed from day one to honor nature's design. As our birds grazed freely across green, fenced pastures, the natural synergy between livestock, soil, and vegetation transformed our land into a self-sustaining food forest, expanding far beyond poultry into chemical-free abundance.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[360px] h-80 sm:h-96 lg:h-full rounded-2xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-800">
              <img
                src={forestimage}
                alt="The Golden Egg 4-Acres Lush Food Forest Ecosystem"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <p className="text-white text-xs font-semibold uppercase tracking-widest drop-shadow">
                  4-Acre Forest Ecosystem • Periyapatna, Mysore
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. THE CORE ETHOS (ZERO-CULLING) */}
      <section id="ethos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center rounded-3xl overflow-hidden bg-[#F9F6F0] dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 shadow-md">
          
          <div className="lg:col-span-5 relative h-80 lg:h-full min-h-[420px] bg-stone-200">
            <img
              src="/kadaknath-rooster.jpg"
              alt="Free Roaming Organic Rooster at The Golden Egg Farm"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C28E58]">
              THE HEART OF <b>THE GOLDEN EGG</b>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#1A2E22] dark:text-white leading-tight flex items-center flex-wrap gap-4">
              <span>Life Without Compromise.</span>
              
            </h2>

            <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              In conventional farming, animals are often treated as commodities and their value can be reduced to their productive output. At <b>The Golden Egg</b>, we believe otherwise. We never cull our birds. Even after reaching their natural menopausal stage, every single bird remains a valued citizen of our food forest, living out its full, natural lifespan in complete freedom. They contribute naturally to soil fertility and ecological balance, proving that farming can be deeply productive without losing its soul.
            </p>

            <div className="p-6 bg-white dark:bg-stone-950 rounded-2xl border-l-4 border-[#C28E58] space-y-1 shadow-sm">
              <p className="font-serif italic text-base sm:text-lg text-[#1A2E22] dark:text-stone-200">
                “True sustainability starts with how we treat the living ecosystem we share.”
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CURRENT OFFERING (PRODUCT PREVIEW CARD - MINIMALIST IMMERSIVE DESIGN) */}
      <section id="offering" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F9F6F0] dark:bg-stone-900 rounded-3xl p-8 sm:p-12 border border-stone-200/60 dark:border-stone-800 space-y-10 shadow-sm">
          
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28E58] block">
              Harvested Today, From Our Food Forest
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#1A2E22] dark:text-white leading-tight">
              Organic Ragi Flour
            </h2>
          </div>

          {/* Minimalist Immersive Product Preview Card */}
          <div className="bg-white dark:bg-stone-950 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full bg-stone-100 dark:bg-stone-900 overflow-hidden">
              <img
                src="/ragi-flour-5kg.jpg"
                alt="Organic Ragi Flour"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#C28E58] text-stone-950 text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                100% Organically Grown
              </div>
            </div>

            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
              <div className="space-y-5">
                {/* Why Ragi Qualifies as a Nutraceutical */}
                <div className="p-5 bg-[#F9F6F0] dark:bg-stone-900/90 rounded-2xl border border-[#C28E58]/30 dark:border-stone-800 space-y-3 shadow-sm">
                  <h4 className="text-lg sm:text-xl font-serif font-extrabold text-[#1A2E22] dark:text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#C28E58] shrink-0" />
                    Why Ragi Qualifies as a Nutraceutical
                  </h4>
                  <div className="space-y-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                    <p>
                      <strong className="text-[#1A2E22] dark:text-stone-100 font-semibold">• Anti-Diabetic Properties:</strong> Ragi has a low glycemic index and is packed with polyphenols and high dietary fiber. These compounds slow down digestion and glucose absorption, preventing post-meal blood sugar spikes.
                    </p>
                    <p>
                      <strong className="text-[#1A2E22] dark:text-stone-100 font-semibold">• Bone Health &amp; Osteoporosis Prevention:</strong> It contains an exceptional amount of calcium (~344 mg per 100g), which is 5 to 30 times higher than other major cereals. This makes it a natural therapeutic food for maintaining bone density and preventing osteoporosis.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A2E22] dark:text-white pt-2">
                  Traditional Grain, Modern Vitality
                </h3>

                <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                  Ragi, also known as finger millet, nachni or mandua, has long been valued in Indian kitchens for its distinctive earthy taste and naturally occurring nutrients. Our Organic Ragi Flour brings this traditional grain into the modern kitchen as a versatile flour made from organically grown ragi.
                </p>

                {/* Key Benefits Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 bg-[#F9F6F0] dark:bg-stone-900 rounded-xl text-center space-y-1">
                    <span className="text-[11px] font-bold text-[#1A2E22] dark:text-stone-200 block">Organic Millet</span>
                  </div>
                  <div className="p-3 bg-[#F9F6F0] dark:bg-stone-900 rounded-xl text-center space-y-1">
                    <span className="text-[11px] font-bold text-[#1A2E22] dark:text-stone-200 block">Nutritious Fibre</span>
                  </div>
                  <div className="p-3 bg-[#F9F6F0] dark:bg-stone-900 rounded-xl text-center space-y-1">
                    <span className="text-[11px] font-bold text-[#1A2E22] dark:text-stone-200 block">Rich in Calcium</span>
                  </div>
                  <div className="p-3 bg-[#F9F6F0] dark:bg-stone-900 rounded-xl text-center space-y-1">
                    <span className="text-[11px] font-bold text-[#1A2E22] dark:text-stone-200 block">Gluten-Free</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100 dark:border-stone-850 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-stone-400 font-bold uppercase block">Starting From</span>
                  <span className="text-2xl font-black text-[#1A2E22] dark:text-white">₹690 / 5KG</span>
                </div>

                <Link
                  to="/products"
                  className="bg-[#1A2E22] hover:bg-[#14241b] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-md hover:scale-105 text-center flex items-center justify-center space-x-2"
                >
                  <span>Explore Ragi Flour</span>
                  <ArrowRight className="h-4 w-4 text-[#C28E58]" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. THE GOLDEN HARVEST — THE ANNAPURNA COLLECTION (Generous White Space & Visual Container) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#F9F6F0] dark:bg-stone-900/80 rounded-3xl border border-stone-200/60 dark:border-stone-800 shadow-sm space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28E58] bg-white dark:bg-stone-800 px-3 py-1 rounded-md inline-block">
              THE ANNAPURNA COLLECTION
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#1A2E22] dark:text-white leading-tight">
              The Annapurna Collection: Nature, Preserved.
            </h2>

            <h3 className="text-lg font-medium text-[#C28E58] italic font-serif">
              Pure, Heritage Essentials for your Kitchen.
            </h3>

            <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-medium">
              The Tomato, Onion, Beetroot, Carrot &amp; Spinach are the veggies used before it get rotten for transforming them into Frozen-Powder form for better usage till 2 to 3 years of span life.
            </p>

            <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Our food forest captures the essence of traditional Indian wellness. We have curated a signature range of dehydrated botanical and culinary powders—bringing the ancient wisdom of the soil directly to your home kitchen.
            </p>

            <div className="p-6 bg-white dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm">
              <h4 className="font-bold text-[#1A2E22] dark:text-white text-base flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-[#C28E58]" />
                <span>Built to Last, Naturally.</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Through advanced preservation techniques, our freeze-dried powders offer an exceptional shelf life of over 2 years—without a single synthetic additive or preservative. Pure, potent, and pantry-ready.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            
            {/* Culinary Foundations */}
            <div className="bg-white dark:bg-stone-950 p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C28E58]">
                <Box className="h-4 w-4" />
                <span>Culinary Foundations — The Essentials</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {culinaryEssentials.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#F9F6F0] dark:bg-stone-900 rounded-xl space-y-1 border border-stone-200/50 dark:border-stone-800">
                    <h5 className="font-bold text-sm text-[#1A2E22] dark:text-white">{item.name}</h5>
                    <p className="text-xs text-stone-600 dark:text-stone-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Botanical Wellness */}
            <div className="bg-white dark:bg-stone-950 p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C28E58]">
                <Leaf className="h-4 w-4" />
                <span>Botanical Wellness — The Apothecary</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {botanicalApothecary.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#F9F6F0] dark:bg-stone-900 rounded-xl space-y-1 border border-stone-200/50 dark:border-stone-800">
                    <h5 className="font-bold text-sm text-[#1A2E22] dark:text-white">{item.name}</h5>
                    <p className="text-xs text-stone-600 dark:text-stone-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-right">
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-[#1A2E22] hover:bg-[#14241b] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-transform hover:scale-105 shadow-md"
              >
                <span>Shop Annapurna Powders</span>
                <ArrowRight className="h-4 w-4 text-[#C28E58]" />
              </Link>
            </div>

          </div>

        </div>

      </section>

      {/* 6. THE JOURNEY & ECOSYSTEM */}
      <section id="ecosystem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28E58] bg-[#F9F6F0] dark:bg-stone-900 px-4 py-1.5 rounded-full inline-block">
            OUR JOURNEY & ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#1A2E22] dark:text-white">
            A Living, Breathing Ecosystem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Foundation */}
          <div className="bg-[#F9F6F0] dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/60 dark:border-stone-800 space-y-4 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28E58] bg-white dark:bg-stone-800 px-3 py-1 rounded-md inline-block">
                The Foundation
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#1A2E22] dark:text-white">
                4 Acres of Food Forest Permaculture
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
          <div className="bg-[#F9F6F0] dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/60 dark:border-stone-800 space-y-4 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
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
          <div className="bg-[#1A2E22] text-white p-8 rounded-3xl border border-[#14241b] space-y-4 relative flex flex-col justify-between shadow-xl hover:shadow-2xl transition-shadow">
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

      {/* 7. CULTIVATE A LEGACY OF PURITY (GLOBAL PARTNERSHIP INVITATION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1A2E22] via-[#243f2f] to-[#14241b] text-white p-8 sm:p-12 lg:p-16 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C28E58] bg-white/10 px-4 py-1.5 rounded-full inline-block">
              GLOBAL PARTNERSHIP INVITATION
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              Invest in the Future of Conscious Agriculture
            </h2>
          </div>

          <div className="max-w-4xl space-y-4 text-stone-200 text-sm sm:text-base leading-relaxed relative z-10 font-sans">
            <p>
              As we scale our proven model from our foundational food forest in Periyapatna to international soil, <b>The Golden Egg</b> invites visionary global partners and investors to co-create the future of conscious agriculture.
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

      {/* 8. FUTURE ANTICIPATION & LEAD CAPTURE (DEEP FOREST GREEN CONTAINER #1A2E22 WITH GENEROUS PADDING) */}
      <section className="bg-[#1A2E22] text-white py-24 transition-colors duration-300 border-t border-[#14241b]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C28E58] bg-white/10 px-4 py-1.5 rounded-full inline-block">
              COMING MARCH 2027
            </span>
            
            <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
              The Return of the Ethical Desi Egg
            </h2>
            
            <p className="text-base sm:text-lg text-[#F9F6F0]/90 max-w-2xl mx-auto leading-relaxed font-light">
              Our flock is expanding naturally and stress-free within our food forest sanctuary. Our life-honored, forest-grazed Desi eggs will officially launch in March 2027.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl font-serif font-bold text-[#C28E58]">
                Why Wait for <b>The Golden Egg</b>?
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
                  <b>The Golden Egg</b> Difference
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
                  className="w-full bg-white/10 text-white placeholder-stone-400 px-4 py-3.5 rounded-xl border border-white/20 focus:outline-none focus:border-[#C28E58] text-sm"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="flex-1 bg-white/10 text-white placeholder-stone-400 px-4 py-3.5 rounded-xl border border-white/20 focus:outline-none focus:border-[#C28E58] text-sm"
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
