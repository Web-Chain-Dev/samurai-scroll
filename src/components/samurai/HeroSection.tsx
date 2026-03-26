import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import heroImg from '@/assets/hero-samurai.jpg';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Image scale reveal
    tl.fromTo(imageRef.current, { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' });

    // Title characters stagger
    const chars = titleRef.current?.querySelectorAll('.hero-char');
    if (chars) {
      tl.fromTo(chars, { opacity: 0, y: 80, rotateX: 90 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.08, ease: 'back.out(1.7)' }, '-=1');
    }

    // Subtitle
    tl.fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3');

    // Katana line slash
    tl.fromTo('.hero-katana', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power4.out' }, '-=0.5');

    // Scroll parallax on hero image
    gsap.to(imageRef.current, {
      yPercent: 30,
      scale: 1.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Fade out content on scroll
    gsap.to(overlayRef.current, {
      opacity: 0,
      y: -100,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: '30% top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  const titleText = 'BUSHIDO';

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <img
        ref={imageRef}
        src={heroImg}
        alt="Samurai warrior silhouette"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/40" />

      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 4%) 100%)' }} />

      {/* Content */}
      <div ref={overlayRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Japanese character above */}
        <p className="text-6xl md:text-8xl text-primary/60 font-body mb-4 hero-subtitle">武士道</p>

        {/* Main title with character animation */}
        <div ref={titleRef} className="perspective-1000 flex gap-1 md:gap-3 mb-6">
          {titleText.split('').map((char, i) => (
            <span
              key={i}
              className="hero-char inline-block text-5xl md:text-8xl lg:text-9xl font-display text-foreground tracking-[0.15em]"
              style={{ textShadow: '0 0 40px hsl(0 72% 45% / 0.4)' }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Katana line */}
        <div className="hero-katana katana-line w-48 md:w-96 mb-6 origin-left" />

        {/* Subtitle */}
        <p className="hero-subtitle text-muted-foreground text-lg md:text-xl font-body tracking-[0.3em] uppercase max-w-lg">
          The Way of the Warrior
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-xs text-muted-foreground tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
