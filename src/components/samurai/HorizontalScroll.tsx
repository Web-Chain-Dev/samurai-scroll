import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import heroImg from '@/assets/hero-samurai.jpg';
import landscapeImg from '@/assets/landscape-ink.jpg';
import waveImg from '@/assets/wave.jpg';
import cherryImg from '@/assets/cherry-blossoms.jpg';
import dragonImg from '@/assets/dragon.jpg';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { image: heroImg, title: '武士', subtitle: 'The Warrior', quote: 'To know and to act are one and the same.' },
  { image: landscapeImg, title: '山水', subtitle: 'Mountains & Water', quote: 'In the landscape of spring, there is neither better nor worse.' },
  { image: waveImg, title: '波', subtitle: 'The Great Wave', quote: 'The wave does not fear the shore.' },
  { image: cherryImg, title: '桜', subtitle: 'Cherry Blossom', quote: 'Fall seven times, stand up eight.' },
  { image: dragonImg, title: '龍', subtitle: 'Dragon', quote: 'The dragon rises above the clouds.' },
];

const HorizontalScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Parallax each slide image
    slides.forEach((_, i) => {
      const el = track.children[i] as HTMLElement;
      if (!el) return;
      const img = el.querySelector('.h-scroll-img') as HTMLElement;
      if (img) {
        gsap.fromTo(img, { x: -50 }, {
          x: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            scrub: true,
          },
        });
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-background">
      {/* Progress line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-border z-10" />

      <div ref={trackRef} className="flex h-screen will-change-transform">
        {slides.map((slide, i) => (
          <div key={i} className="flex-shrink-0 w-screen h-screen relative flex items-center justify-center">
            {/* Background image with parallax */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.subtitle}
                className="h-scroll-img w-full h-full object-cover opacity-30"
                loading="lazy"
              />
            </div>

            {/* Vignette */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 4%) 100%)' }} />

            {/* Content */}
            <div className="relative z-10 text-center px-8 max-w-2xl">
              <span className="text-8xl md:text-[12rem] font-body text-primary/20 block leading-none mb-4">
                {slide.title}
              </span>
              <h3 className="font-heading text-3xl md:text-5xl text-foreground mb-6">{slide.subtitle}</h3>
              <div className="katana-line w-24 mx-auto mb-6" />
              <p className="text-muted-foreground font-body italic text-lg md:text-xl">
                "{slide.quote}"
              </p>
            </div>

            {/* Slide number */}
            <div className="absolute bottom-8 right-8 z-10">
              <span className="text-accent/30 font-display text-6xl">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;
