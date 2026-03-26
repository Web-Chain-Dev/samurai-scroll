import React from 'react';

const FooterSection: React.FC = () => {
  return (
    <footer className="relative py-16 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <span className="font-display text-2xl text-gradient-crimson">侍</span>
          <span className="text-muted-foreground text-sm font-body">Bushido Portfolio © 2026</span>
        </div>

        <div className="katana-line w-32 md:hidden" />

        <div className="flex gap-8">
          {['Twitter', 'GitHub', 'Dribbble', 'LinkedIn'].map((s) => (
            <a key={s} href="#" className="text-muted-foreground text-xs tracking-widest uppercase hover:text-primary transition-colors font-heading">
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* Large decorative kanji */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15rem] font-body text-foreground/[0.02] leading-none pointer-events-none select-none">
        道
      </div>
    </footer>
  );
};

export default FooterSection;
