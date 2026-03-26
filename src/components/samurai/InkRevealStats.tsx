import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import katanaImg from '@/assets/katana-detail.jpg';
import armorImg from '@/assets/armor.jpg';
import templeImg from '@/assets/temple-night.jpg';

gsap.registerPlugin(ScrollTrigger);

const items = [
  { image: katanaImg, label: 'Precision', value: '10+', desc: 'Years of Craft' },
  { image: armorImg, label: 'Protection', value: '200+', desc: 'Projects Delivered' },
  { image: templeImg, label: 'Sacred', value: '50+', desc: 'Awards Won' },
];

const InkRevealStats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Each card reveals via clip-path animation
    items.forEach((_, i) => {
      const card = `.ink-card-${i}`;
      const img = `.ink-img-${i}`;

      gsap.fromTo(card,
        { clipPath: 'circle(0% at 50% 50%)' },
        {
          clipPath: 'circle(75% at 50% 50%)',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo(img,
        { scale: 1.3 },
        {
          scale: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );
    });

    gsap.fromTo('.ink-stat', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.ink-stats-row', start: 'top 80%', toggleActions: 'play none none reverse' },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-8 bg-background">
      <div className="ink-stats-row max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <div key={i} className="ink-stat flex flex-col items-center text-center">
            {/* Circular image reveal */}
            <div className={`ink-card-${i} w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 relative`}>
              <img
                src={item.image}
                alt={item.label}
                className={`ink-img-${i} w-full h-full object-cover`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            <span className="text-5xl md:text-6xl font-display text-gradient-crimson mb-2">{item.value}</span>
            <span className="font-heading text-foreground text-lg mb-1">{item.desc}</span>
            <span className="text-muted-foreground text-xs tracking-[0.3em] uppercase">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InkRevealStats;
