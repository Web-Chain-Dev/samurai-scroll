import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Send, MapPin, Mail } from 'lucide-react';
import zenImg from '@/assets/zen-garden.jpg';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.contact-content', { opacity: 0, y: 80 }, {
      opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-content', start: 'top 80%', toggleActions: 'play none none reverse' },
    });
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-15">
        <img src={zenImg} alt="" className="w-full h-full object-cover" loading="lazy" width={1200} height={800} />
      </div>
      <div className="absolute inset-0 bg-background/80" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="contact-content text-center mb-16">
          <p className="text-accent text-sm tracking-[0.4em] uppercase mb-4">Contact</p>
          <h2 className="font-display text-4xl md:text-6xl text-gradient-crimson mb-4">連絡</h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Ready to embark on a journey together? Send your message through the mist.
          </p>
        </div>

        <div className="contact-content grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="text-xs text-muted-foreground tracking-[0.3em] uppercase block mb-2">Name</label>
              <input
                type="text"
                className="w-full bg-muted border border-border px-4 py-3 text-foreground font-body focus:border-primary focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground tracking-[0.3em] uppercase block mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-muted border border-border px-4 py-3 text-foreground font-body focus:border-primary focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground tracking-[0.3em] uppercase block mb-2">Message</label>
              <textarea
                rows={5}
                className="w-full bg-muted border border-border px-4 py-3 text-foreground font-body focus:border-primary focus:outline-none transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>
            <button className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 font-heading tracking-widest uppercase text-sm hover:bg-crimson-glow transition-colors">
              <Send size={16} />
              Send Message
            </button>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="samurai-card p-6 flex items-start gap-4">
              <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-heading text-foreground mb-1">Location</h4>
                <p className="text-muted-foreground text-sm font-body">Kyoto, Japan — Available Worldwide</p>
              </div>
            </div>
            <div className="samurai-card p-6 flex items-start gap-4">
              <Mail size={20} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-heading text-foreground mb-1">Email</h4>
                <p className="text-muted-foreground text-sm font-body">hello@bushido.design</p>
              </div>
            </div>

            {/* Seal */}
            <div className="flex justify-center mt-8">
              <div className="w-24 h-24 border-2 border-primary/30 flex items-center justify-center rotate-12 animate-pulse-glow">
                <span className="text-3xl text-primary font-body -rotate-12">侍</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
