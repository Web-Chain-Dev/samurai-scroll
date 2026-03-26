import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import templeImg from '@/assets/temple-night.jpg';
import armorImg from '@/assets/armor.jpg';
import dragonImg from '@/assets/dragon.jpg';
import zenImg from '@/assets/zen-garden.jpg';
import bambooImg from '@/assets/bamboo-forest.jpg';
import bridgeImg from '@/assets/red-bridge.jpg';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: 'Temple of Shadows', category: 'Architecture', image: templeImg, desc: 'Sacred spaces between darkness and light' },
  { id: 2, title: 'Crimson Guard', category: 'Identity', image: armorImg, desc: 'Armor forged in fire and tradition' },
  { id: 3, title: 'Dragon\'s Breath', category: 'Illustration', image: dragonImg, desc: 'Mythical beings rendered in ink and gold' },
  { id: 4, title: 'Zen Sanctuary', category: 'Environment', image: zenImg, desc: 'Where stillness speaks volumes' },
  { id: 5, title: 'Bamboo Passage', category: 'Photography', image: bambooImg, desc: 'Pathways through the ancient grove' },
  { id: 6, title: 'Moonlit Crossing', category: 'Landscape', image: bridgeImg, desc: 'Bridges between worlds' },
];

const PortfolioGrid: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useGSAP(() => {
    // Title
    gsap.fromTo('.portfolio-title', { opacity: 0, y: 80, scale: 0.8 }, {
      opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.portfolio-title', start: 'top 85%', toggleActions: 'play none none reverse' },
    });

    // Cards with stagger
    gsap.fromTo('.portfolio-card', { opacity: 0, y: 100, scale: 0.85 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: '.portfolio-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
    });
  }, []);

  return (
    <section ref={sectionRef} id="works" className="relative py-32 px-4 md:px-8 bg-background">
      {/* Section header */}
      <div className="portfolio-title text-center mb-20">
        <p className="text-accent text-sm tracking-[0.4em] uppercase mb-4 font-body">Portfolio</p>
        <h2 className="font-display text-4xl md:text-6xl text-gradient-gold mb-4">作品集</h2>
        <div className="katana-line w-32 mx-auto" />
      </div>

      {/* Masonry-style grid */}
      <div className="portfolio-grid max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`portfolio-card group relative overflow-hidden cursor-pointer ${
              index === 0 ? 'md:row-span-2' : ''
            } ${index === 3 ? 'md:col-span-2' : ''}`}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Image */}
            <div className={`relative overflow-hidden ${index === 0 ? 'h-[500px] md:h-full' : index === 3 ? 'h-[300px]' : 'h-[300px]'}`}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className={`absolute inset-0 bg-background/60 transition-opacity duration-500 ${
                hoveredId === project.id ? 'opacity-100' : 'opacity-0'
              }`} />

              {/* Crimson border on hover */}
              <div className={`absolute inset-0 border-2 border-primary transition-opacity duration-500 ${
                hoveredId === project.id ? 'opacity-100' : 'opacity-0'
              }`} />

              {/* Content overlay */}
              <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 ${
                hoveredId === project.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <span className="text-accent text-xs tracking-[0.3em] uppercase mb-2">{project.category}</span>
                <h3 className="font-heading text-2xl text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 font-body">{project.desc}</p>
                <div className="flex items-center gap-2 text-primary text-sm">
                  <span className="tracking-widest uppercase">View</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>

              {/* Bottom category tag always visible */}
              <div className={`absolute bottom-4 left-4 transition-opacity duration-300 ${
                hoveredId === project.id ? 'opacity-0' : 'opacity-100'
              }`}>
                <span className="bg-background/80 backdrop-blur-sm text-foreground text-xs px-3 py-1.5 tracking-widest uppercase font-heading">
                  {project.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioGrid;
