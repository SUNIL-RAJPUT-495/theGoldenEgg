import React from 'react';
import { 
  Sprout, 
  Compass, 
  MapPin, 
  Award, 
  Briefcase, 
  Layers, 
  HeartHandshake, 
  CheckCircle2, 
  Quote, 
  Cpu, 
  Globe, 
  Users, 
  ShieldCheck, 
  Leaf,
  Wrench
} from 'lucide-react';
import chetanImg from '../assets/chetan-l.jpg';
import raghavendraImg from '../assets/raghavendra-yadav.jpg';

export const FoundersSection = ({ isStandalone = false }) => {
  return (
    <section id="founders" className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 ${isStandalone ? 'pt-8 pb-20' : 'py-12'}`}>
      
      {/* 1. SECTION HEADER & NARRATIVE INTRO */}
      <div className="text-center max-w-4xl mx-auto space-y-5">
        <div className="inline-flex items-center space-x-2 bg-[#C28E58]/15 border border-[#C28E58]/35 px-4 py-1.5 rounded-full">
          <Users className="h-4 w-4 text-[#C28E58]" />
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#C28E58]">
            Founders &amp; Stewards
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#1A2E22] dark:text-white leading-tight">
          Guiding Hands Behind the Living Food Forest
        </h2>

        <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed font-sans font-normal max-w-3xl mx-auto">
          <strong className="text-[#1A2E22] dark:text-stone-100 font-semibold">The Golden Egg</strong> began with a simple belief: that food, land, people, and wellbeing can be brought together in a more conscious and responsible way. At the heart of this journey are its two co-founders—<strong className="text-[#1A2E22] dark:text-white">Raghavendra Yadav</strong>, rooted in the land, and <strong className="text-[#1A2E22] dark:text-white">Chetan L</strong>, united by a shared vision to build around it.
        </p>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed font-sans max-w-3xl mx-auto">
          Together, they are nurturing The Golden Egg as a living food-forest ecosystem in Periyapatna, Mysore—grounded in responsible cultivation, respect for nature, and a long-term commitment to making healthy food and authentic wellbeing more accessible.
        </p>
      </div>

      {/* 2. DUAL FOUNDERS PROFILE CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        
        {/* FOUNDER 1: RAGHAVENDRA YADAV */}
        <div className="bg-[#F9F6F0] dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-200/70 dark:border-stone-800 shadow-md flex flex-col justify-between space-y-8 relative overflow-hidden transition-all hover:shadow-xl group">
          {/* Subtle Ambient Accent */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-600/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6">
            
            {/* Header / Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-emerald-600/40 dark:border-emerald-500/40 shadow-md ring-4 ring-emerald-600/10 bg-stone-200 dark:bg-stone-800">
                  <img 
                    src={raghavendraImg} 
                    alt="Raghavendra Yadav - Co-Founder & Farm Director" 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28E58] block mb-1">
                    Rooted in the Soil
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#1A2E22] dark:text-white">
                    Raghavendra Yadav
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-emerald-800 dark:text-emerald-400 mt-0.5">
                    Co-Founder &amp; Farm Director
                  </p>
                </div>
              </div>

              <div className="hidden xl:flex h-12 w-12 rounded-2xl bg-[#1A2E22] text-[#C28E58] items-center justify-center font-serif text-lg font-black shadow-inner shrink-0 border border-[#C28E58]/30">
                RY
              </div>
            </div>

            {/* Quick Badges / Chips */}
            <div className="flex flex-wrap gap-2 text-xs font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shadow-2xs">
                <MapPin className="h-3.5 w-3.5 text-[#C28E58]" />
                Native of Periyapatna
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shadow-2xs">
                <Sprout className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                Agricultural Heritage
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shadow-2xs">
                <Wrench className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Sewing Machine Engineer
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shadow-2xs">
                <Briefcase className="h-3.5 w-3.5 text-stone-500" />
                Ex-Manager at NIIT
              </span>
            </div>

            {/* Body Text / Detailed Biography */}
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
              <p>
                <strong className="text-[#1A2E22] dark:text-stone-100 font-semibold">Raghavendra Yadav</strong> is a co-founder of The Golden Egg Food Forest and a native of Periyapatna, Mysore district. Born into an agricultural family, he has a deep connection with the land and serves as the Farm Director of the four-acre food-forest ecosystem on which The Golden Egg has taken root.
              </p>

              <p>
                His journey has taken him across agriculture, technical work, livestock, and food management. Along the way, he worked as a sewing machine engineer, developed practical experience through livestock training, and gained knowledge in food management. He also built a professional career in Bengaluru as a Manager at NIIT before feeling drawn back to his agricultural roots.
              </p>

              <p>
                Returning to Periyapatna, Raghavendra brought together his diverse practical experience and a larger vision—to transform his family's conventional farmland into a thriving food-forest ecosystem and build an agricultural enterprise grounded in responsible cultivation, long-term stewardship, and respect for nature.
              </p>

              <p>
                The land forms the physical foundation of The Golden Egg, and Raghavendra has made the principal investment in transforming it into the food-forest ecosystem it is today. As Farm Director, he oversees the farm's development and day-to-day agricultural direction, drawing on his familiarity with the land, farming, local agricultural practices, livestock, and the realities of working with a living ecosystem.
              </p>

              <p>
                At The Golden Egg, his work extends from nurturing the food forest to supporting the cultivation of grains, pulses, produce, spices, and botanical food products. His practical understanding of agriculture and farm-based food systems helps translate the vision of The Golden Egg into something tangible—grown, nurtured, and developed on the land itself.
              </p>
            </div>

            {/* Philosophy Pull-Quote */}
            <div className="p-4 sm:p-5 bg-white dark:bg-stone-950 rounded-2xl border-l-4 border-emerald-600 dark:border-emerald-500 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-serif font-bold text-sm">
                <Quote className="h-4 w-4 rotate-180" />
                <span>Working With the Land</span>
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                “For Raghavendra, the food forest is more than a farm. It represents a way of working with the land—with respect for soil, biodiversity, natural cycles, and the generations that will inherit what is cultivated today.”
              </p>
            </div>

          </div>

          {/* Bottom Anchor / Essence Pill */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Sprout className="h-4 w-4 text-[#C28E58]" />
              The Roots &amp; Hands-On Experience
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md">
              Farm Director
            </span>
          </div>

        </div>

        {/* FOUNDER 2: CHETAN L */}
        <div className="bg-[#F9F6F0] dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-200/70 dark:border-stone-800 shadow-md flex flex-col justify-between space-y-8 relative overflow-hidden transition-all hover:shadow-xl group">
          {/* Subtle Ambient Accent */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C28E58]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6">
            
            {/* Header / Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-[#C28E58]/40 dark:border-[#C28E58]/40 shadow-md ring-4 ring-[#C28E58]/10 bg-stone-200 dark:bg-stone-800">
                  <img 
                    src={chetanImg} 
                    alt="Chetan L - Co-Founder & Sustainability Strategy Director" 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28E58] block mb-1">
                    Strategy &amp; Systems
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#1A2E22] dark:text-white">
                    Chetan L
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-[#a97745] dark:text-[#d3a16d] mt-0.5">
                    Co-Founder &amp; Sustainability Strategy Director
                  </p>
                </div>
              </div>

              <div className="hidden xl:flex h-12 w-12 rounded-2xl bg-[#C28E58] text-[#1A2E22] items-center justify-center font-serif text-lg font-black shadow-inner shrink-0 border border-[#1A2E22]/20">
                CL
              </div>
            </div>

            {/* Quick Badges / Chips */}
            <div className="flex flex-wrap gap-2 text-xs font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shadow-2xs">
                <Cpu className="h-3.5 w-3.5 text-[#C28E58]" />
                Renewable Energy Engineer
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shadow-2xs">
                <Award className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                MBA Gold Medalist
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shadow-2xs">
                <Globe className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                KPMG &amp; Accenture Alum
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shadow-2xs">
                <Layers className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                Assoc. Professor (SVYASA)
              </span>
            </div>

            {/* Body Text / Detailed Biography */}
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
              <p>
                <strong className="text-[#1A2E22] dark:text-stone-100 font-semibold">Chetan L</strong> is a co-founder of The Golden Egg Food Forest, bringing together engineering, management, sustainability, environmental conservation, and wellbeing in his approach to building ethical enterprises.
              </p>

              <p>
                A mechanical engineer specialising in renewable energy and an MBA Gold Medalist, Chetan has worked across strategy, systems, technology, and organisational execution. His professional experience includes serving as a KPMG-certified Management Consultant and as an End-to-End Test Architect at Accenture.
              </p>

              <p>
                His work in environmental conservation further shaped his commitment to sustainable living. As Programme Manager at the Hello Save Earth Foundation, he led environmental-conservation workshops across more than 300 institutions. He later founded the Nature Care Mission and continues his academic contribution as a Consulting Associate Professor at SVYASA University.
              </p>

              <p>
                Alongside his professional and academic work, Chetan's engagement with yoga and holistic wellbeing has influenced his broader view of sustainability—not simply as an environmental concern, but as a way of creating healthier relationships between people, nature, food, and the systems that support them.
              </p>

              <p>
                At The Golden Egg, Chetan focuses on sustainability strategy, systems, enterprise development, and translating the values of the food forest into a coherent and scalable model. He works to connect responsible cultivation with a larger vision of making healthy food and authentic wellbeing more accessible.
              </p>
            </div>

            {/* Philosophy Pull-Quote */}
            <div className="p-4 sm:p-5 bg-white dark:bg-stone-950 rounded-2xl border-l-4 border-[#C28E58] space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-[#C28E58] font-serif font-bold text-sm">
                <Quote className="h-4 w-4 rotate-180" />
                <span>Values-Led Scalability</span>
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                “He brings the systems. The vision is to build something that can grow without losing its values—connecting responsible cultivation with accessible, authentic wellbeing.”
              </p>
            </div>

          </div>

          {/* Bottom Anchor / Essence Pill */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-[#C28E58]" />
              The Systems &amp; Scalable Vision
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#a97745] dark:text-[#d3a16d] bg-[#C28E58]/15 px-2.5 py-1 rounded-md">
              Strategy Director
            </span>
          </div>

        </div>

      </div>

      {/* 3. THE SHARED VISION: "TWO PATHS. ONE VISION." */}
      <div className="bg-gradient-to-br from-[#1A2E22] via-[#223d2e] to-[#14241b] text-white rounded-3xl p-8 sm:p-12 lg:p-14 space-y-8 shadow-2xl border border-[#C28E58]/30 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C28E58]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#C28E58]/20 border border-[#C28E58]/40 px-3.5 py-1 rounded-full">
            <HeartHandshake className="h-3.5 w-3.5 text-[#C28E58]" />
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C28E58]">
              Shared Philosophy
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight">
            Two Paths. One Vision.
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-4 text-stone-200 text-sm sm:text-base leading-relaxed font-sans">
            <p>
              Raghavendra and Chetan come from different professional and life experiences, but their roles complement each other naturally. <strong className="text-white">One is rooted in the land. The other is focused on the systems around it.</strong>
            </p>
            
            <p>
              Together, they are building The Golden Egg around a simple principle: <strong className="text-[#C28E58] font-serif italic text-base sm:text-lg block my-1">“Create value without losing connection—with the soil, with nature, with animals, with food, and ultimately with human wellbeing.”</strong>
            </p>

            <p>
              The four-acre food forest in Periyapatna is the beginning of that journey—a living ecosystem where agriculture, biodiversity, responsible stewardship, and enterprise are brought together with the intention of creating something that can endure.
            </p>
          </div>

          {/* 4 Pillars of Connection */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl space-y-1.5">
              <Sprout className="h-5 w-5 text-[#C28E58]" />
              <h4 className="font-serif font-bold text-sm text-white">The Soil</h4>
              <p className="text-[11px] text-stone-300 leading-tight">Living fertility, rich organic carbon &amp; zero chemicals.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl space-y-1.5">
              <Leaf className="h-5 w-5 text-emerald-400" />
              <h4 className="font-serif font-bold text-sm text-white">Nature &amp; Animals</h4>
              <p className="text-[11px] text-stone-300 leading-tight">Biodiversity, ethical habitat &amp; 100% zero-culling.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl space-y-1.5">
              <ShieldCheck className="h-5 w-5 text-amber-400" />
              <h4 className="font-serif font-bold text-sm text-white">Pure Food</h4>
              <p className="text-[11px] text-stone-300 leading-tight">Nutrient-dense superfoods, grains &amp; botanicals.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl space-y-1.5">
              <HeartHandshake className="h-5 w-5 text-rose-400" />
              <h4 className="font-serif font-bold text-sm text-white">Human Wellbeing</h4>
              <p className="text-[11px] text-stone-300 leading-tight">Authentic wellness connecting health to the source.</p>
            </div>
          </div>

        </div>

        {/* Concluding Statement */}
        <div className="pt-6 border-t border-white/15 text-center sm:text-left relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif italic text-base sm:text-lg text-[#F9F6F0] max-w-2xl">
            “The Golden Egg is not simply about growing food. It is about creating a way of living that respects where food comes from—and where the future is going.”
          </p>
          <div className="shrink-0">
            <span className="px-4 py-2 rounded-full bg-[#C28E58] text-stone-950 font-extrabold text-xs uppercase tracking-widest shadow-md">
              Periyapatna, Mysore
            </span>
          </div>
        </div>

      </div>

    </section>
  );
};

export default FoundersSection;
