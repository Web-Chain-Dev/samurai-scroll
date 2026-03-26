import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import armorImg from '@/assets/armor.jpg';
import katanaImg from '@/assets/katana-detail.jpg';
import templeImg from '@/assets/temple-night.jpg';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    image: armorImg,
    title: 'Discipline',
    kanji: '規律',
    text: 'Through relentless training and unwavering dedication, the samurai forged not just weapons, but character.',
    align: 'left' as const,
  },
  {
    image: katanaImg,
    title: 'Precision',
    kanji: '精密',
    text: 'Every stroke of the blade, every line of code — crafted with the precision of a master swordsmith.',
    align: 'right' as const,
  },
  {
    image: templeImg,
    title: 'Mastery',
    kanji: '熟練',
    text: 'True mastery is not the absence of failure, but the courage to face it with honor and learn from every battle.',
    align: 'left' as const,
  },
];

const ParallaxStory: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    layers.forEach((_, i) => {
      const layer = `.story-layer-${i}`;
      const img = `.story-img-${i}`;
      const text = `.story-text-${i}`;

      // Image parallax
      gsap.fromTo(img, { yPercent: 20 }, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: { trigger: layer, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // Text reveal
      gsap.fromTo(text,
        { opacity: 0, x: i % 2 === 0 ? -100 : 100 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: layer, start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      );

      // Kanji scale
      gsap.fromTo(`.story-kanji-${i}`,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1, opacity: 0.1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: layer, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );
    });
  }, []);

  return (
    <div ref={sectionRef}>
      {layers.map((layer, i) => (
        <section
          key={i}
          className={`story-layer-${i} relative min-h-screen flex items-center overflow-hidden`}
        >
          {/* Background kanji */}
          <div className={`story-kanji-${i} absolute inset-0 flex items-center justify-center pointer-events-none`}>
            <span className="text-[20rem] md:text-[30rem] font-body text-foreground/5 select-none leading-none">
              {layer.kanji}
            </span>
          </div>

          {/* Image */}
          <div className={`absolute ${layer.align === 'left' ? 'right-0' : 'left-0'} top-0 w-full md:w-1/2 h-full overflow-hidden`}>
            <img
              src={layer.image}
              alt={layer.title}
              className={`story-img-${i} w-full h-[120%] object-cover opacity-60`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-background via-background/50 to-transparent" />
          </div>

          {/* Text content */}
          <div className={`story-text-${i} relative z-10 max-w-xl px-8 md:px-16 ${
            layer.align === 'left' ? 'ml-0 md:ml-16' : 'ml-auto mr-0 md:mr-16'
          }`}>
            <span className="text-accent text-xs tracking-[0.5em] uppercase block mb-4">{layer.kanji}</span>
            <h3 className="font-heading text-4xl md:text-6xl text-foreground mb-6">{layer.title}</h3>
            <div className="katana-line w-20 mb-6" />
            <p className="text-muted-foreground text-lg font-body leading-relaxed">{layer.text}</p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ParallaxStory;
