import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import calligraphyImg from '@/assets/calligraphy.jpg';
import landscapeImg from '@/assets/landscape-ink.jpg';

gsap.registerPlugin(ScrollTrigger);

const virtues = [
  { kanji: '義', romaji: 'Gi', meaning: 'Righteousness' },
  { kanji: '勇', romaji: 'Yū', meaning: 'Courage' },
  { kanji: '仁', romaji: 'Jin', meaning: 'Benevolence' },
  { kanji: '礼', romaji: 'Rei', meaning: 'Respect' },
  { kanji: '誠', romaji: 'Makoto', meaning: 'Honesty' },
  { kanji: '名誉', romaji: 'Meiyo', meaning: 'Honor' },
  { kanji: '忠義', romaji: 'Chūgi', meaning: 'Loyalty' },
];

const PhilosophyZoom: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Zoom into calligraphy image as you scroll
    const zoomTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
      },
    });

    zoomTl
      .fromTo(zoomRef.current, { scale: 1, opacity: 1 }, { scale: 8, opacity: 0, duration: 1, ease: 'power2.in' })
      .fromTo(textRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }, 0.5);

    // Stagger virtues
    zoomTl.fromTo(
      '.virtue-card',
      { opacity: 0, y: 60, rotateY: 45 },
      { opacity: 1, y: 0, rotateY: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out' },
      0.6
    );
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="relative h-screen overflow-hidden bg-background">
      {/* Background ink landscape */}
      <div className="absolute inset-0 opacity-20">
        <img src={landscapeImg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
      </div>

      {/* Zoom layer - calligraphy */}
      <div ref={zoomRef} className="absolute inset-0 flex items-center justify-center z-10">
        <img
          src={calligraphyImg}
          alt="Japanese calligraphy"
          className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-full"
          loading="lazy"
          width={800}
          height={800}
          style={{ boxShadow: 'var(--shadow-crimson)' }}
        />
      </div>

      {/* Content revealed after zoom */}
      <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
        <h2 className="font-display text-4xl md:text-6xl text-gradient-crimson mb-4 text-center">
          Seven Virtues
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-md font-body text-sm tracking-widest uppercase">
          The code that forged legends
        </p>

        {/* Virtues grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl">
          {virtues.map((v) => (
            <div
              key={v.romaji}
              className="virtue-card samurai-card p-6 flex flex-col items-center gap-2 group cursor-pointer hover:border-primary/50 transition-colors"
            >
              <span className="text-4xl md:text-5xl text-primary font-body transition-transform group-hover:scale-110 duration-300">
                {v.kanji}
              </span>
              <span className="text-xs text-accent tracking-widest uppercase">{v.romaji}</span>
              <span className="text-[10px] text-muted-foreground">{v.meaning}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophyZoom;
