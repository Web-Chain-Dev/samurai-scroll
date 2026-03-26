import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin();

const navLinks = [
  { label: '武士', href: '#hero', sub: 'Home' },
  { label: '道', href: '#philosophy', sub: 'Philosophy' },
  { label: '作品', href: '#works', sub: 'Works' },
  { label: '技', href: '#skills', sub: 'Skills' },
  { label: '声', href: '#testimonials', sub: 'Voices' },
  { label: '連絡', href: '#contact', sub: 'Contact' },
];

const SamuraiNavbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="font-display text-2xl text-gradient-crimson tracking-widest">
          侍
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex flex-col items-center gap-0.5 relative"
            >
              <span className="text-foreground text-lg font-heading transition-colors group-hover:text-primary">
                {link.label}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] transition-colors group-hover:text-accent">
                {link.sub}
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border px-6 py-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-4"
              >
                <span className="text-2xl font-heading text-primary">{link.label}</span>
                <span className="text-sm text-muted-foreground uppercase tracking-widest">{link.sub}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default SamuraiNavbar;
