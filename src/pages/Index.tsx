import SamuraiNavbar from '@/components/samurai/SamuraiNavbar';
import HeroSection from '@/components/samurai/HeroSection';
import PhilosophyZoom from '@/components/samurai/PhilosophyZoom';
import InkRevealStats from '@/components/samurai/InkRevealStats';
import PortfolioGrid from '@/components/samurai/PortfolioGrid';
import HorizontalScroll from '@/components/samurai/HorizontalScroll';
import ParallaxStory from '@/components/samurai/ParallaxStory';
import SkillsSection from '@/components/samurai/SkillsSection';
import TestimonialsCarousel from '@/components/samurai/TestimonialsCarousel';
import ContactSection from '@/components/samurai/ContactSection';
import FooterSection from '@/components/samurai/FooterSection';

const Index = () => {
  return (
    <div className="bg-background text-foreground">
      <SamuraiNavbar />
      <HeroSection />
      <PhilosophyZoom />
      <InkRevealStats />
      <PortfolioGrid />
      <HorizontalScroll />
      <ParallaxStory />
      <SkillsSection />
      <TestimonialsCarousel />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
