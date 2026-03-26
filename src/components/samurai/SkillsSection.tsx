import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sword, Shield, Eye, Flame, Wind, Mountain } from 'lucide-react';
import waveImg from '@/assets/wave.jpg';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: Sword, name: 'Kenjutsu', level: 95, desc: 'UI/UX Design', kanji: '剣術' },
  { icon: Shield, name: 'Sōjutsu', level: 90, desc: 'Frontend Dev', kanji: '槍術' },
  { icon: Eye, name: 'Kyūjutsu', level: 88, desc: 'Brand Strategy', kanji: '弓術' },
  { icon: Flame, name: 'Bajutsu', level: 85, desc: 'Motion Design', kanji: '馬術' },
  { icon: Wind, name: 'Ninjutsu', level: 92, desc: 'Creative Direction', kanji: '忍術' },
  { icon: Mountain, name: 'Suieijutsu', level: 87, desc: '3D & Immersive', kanji: '水泳術' },
];

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.skills-title', { opacity: 0, y: 80 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.skills-title', start: 'top 85%', toggleActions: 'play none none reverse' },
    });

    // Slash reveal for each skill bar
    gsap.fromTo('.skill-item', { opacity: 0, x: -80 }, {
      opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.skills-grid', start: 'top 75%', toggleActions: 'play none none reverse' },
    });

    // Animate skill bars
    document.querySelectorAll('.skill-fill').forEach((el) => {
      const target = (el as HTMLElement).dataset.level;
      gsap.fromTo(el, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 px-4 md:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <img src={waveImg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="skills-title text-center mb-20">
          <p className="text-accent text-sm tracking-[0.4em] uppercase mb-4">Abilities</p>
          <h2 className="font-display text-4xl md:text-6xl text-gradient-crimson mb-4">武芸</h2>
          <p className="text-muted-foreground font-body">Martial Arts of the Digital Realm</p>
        </div>

        <div className="skills-grid space-y-8">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div key={skill.name} className="skill-item group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-border group-hover:border-primary transition-colors">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <span className="font-heading text-foreground text-lg">{skill.name}</span>
                      <span className="text-muted-foreground text-xs ml-3">{skill.desc}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-primary/30 font-body">{skill.kanji}</span>
                    <span className="text-accent font-heading text-sm">{skill.level}%</span>
                  </div>
                </div>

                {/* Bar */}
                <div className="h-1 bg-muted relative overflow-hidden">
                  <div
                    className="skill-fill h-full origin-left"
                    data-level={skill.level}
                    style={{
                      width: `${skill.level}%`,
                      background: 'linear-gradient(90deg, hsl(0 72% 45%), hsl(40 80% 55%))',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
