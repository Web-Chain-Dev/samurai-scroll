import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import cherryImg from '@/assets/cherry-blossoms.jpg';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Takeshi Yamamoto',
    role: 'Creative Director',
    text: 'Working with this samurai of design was like witnessing a master calligrapher at work — every stroke deliberate, every detail perfected.',
    rating: 5,
    kanji: '山本',
  },
  {
    name: 'Sakura Tanaka',
    role: 'Brand Strategist',
    text: 'The level of craftsmanship and attention to detail is unparalleled. They brought our vision to life with the precision of a katana.',
    rating: 5,
    kanji: '田中',
  },
  {
    name: 'Hiroshi Nakamura',
    role: 'Tech Lead',
    text: 'Like a ronin who has mastered every weapon, they command every technology with grace and deadly efficiency.',
    rating: 5,
    kanji: '中村',
  },
  {
    name: 'Yuki Watanabe',
    role: 'CEO',
    text: 'Our digital presence was transformed into something extraordinary — a true work of art that carries the spirit of bushido.',
    rating: 5,
    kanji: '渡辺',
  },
];

const TestimonialsCarousel: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useGSAP(() => {
    gsap.fromTo('.testimonial-title', { opacity: 0, y: 80 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.testimonial-title', start: 'top 85%', toggleActions: 'play none none reverse' },
    });
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const navigate = (dir: number) => {
    setIsAutoPlay(false);
    setCurrent((p) => (p + dir + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-15">
        <img src={cherryImg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
      </div>
      <div className="absolute inset-0 bg-background/70" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="testimonial-title text-center mb-16">
          <p className="text-accent text-sm tracking-[0.4em] uppercase mb-4">Testimonials</p>
          <h2 className="font-display text-4xl md:text-6xl text-gradient-gold mb-4">声</h2>
          <p className="text-muted-foreground">Words from honored allies</p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => navigate(-1)}
              className="w-12 h-12 border border-border hover:border-primary flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={20} className="text-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsAutoPlay(false); setCurrent(i); }}
                  className={`w-8 h-1 transition-all duration-300 ${
                    i === current ? 'bg-primary w-12' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => navigate(1)}
              className="w-12 h-12 border border-border hover:border-primary flex items-center justify-center transition-colors"
            >
              <ChevronRight size={20} className="text-foreground" />
            </button>
          </div>

          {/* Card */}
          <div className="samurai-card p-8 md:p-12 relative">
            {/* Quote icon */}
            <Quote size={48} className="text-primary/20 absolute top-6 right-6" />

            {/* Kanji watermark */}
            <span className="absolute bottom-4 right-8 text-8xl font-body text-foreground/5">
              {testimonials[current].kanji}
            </span>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={16} className="text-accent fill-accent" />
              ))}
            </div>

            {/* Text */}
            <p className="text-foreground text-lg md:text-2xl font-body leading-relaxed mb-8 italic">
              "{testimonials[current].text}"
            </p>

            <div className="katana-line w-16 mb-6" />

            {/* Author */}
            <div>
              <p className="font-heading text-lg text-foreground">{testimonials[current].name}</p>
              <p className="text-muted-foreground text-sm">{testimonials[current].role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
