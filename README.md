# Samurai Scroll

create an immerise portfolio website. Samurai style. It should have a lot of stunning components, and lot of them image based(but mix it up well). It should have a lot of images. All components should have plenty of gsap animations and should look great. There should be a lot of very unique, creative and never before seen components they should still make sense and work well. It should have sliders, swipers, unique components and ideas never before made.  It must be stunning, the absolute best, and I can't stress this enough unique, website you ever made. It should feature components as good as these: // StorySection.tsx
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Star, Sparkles } from 'lucide-react';
import StatsSection from './Stats';
import { cardsData} from '../constants'; // adjust path
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const StorySection: React.FC = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subtitle
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 80, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    
      gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    


   
        




      


        


          


            
            Our Heritage
            
          



          


            From Orchard to
            
              Your Heart
              


                
              


            
          



          


            For three generations, we've been cultivating the perfect cherry. Our journey began in 1952
            with a simple dream: to share nature's sweetest gift with the world.
          


        



        


          {cardsData.map((card, index) => {
            const IconComponent = card.Icon;
            return (
              


                


                  


                  


                    


                      
                    


                    

{card.title}


                    

{card.description}


                    


                      


                        

{card.stat1.value}


                        

{card.stat1.label}


                      


                      


                        

{card.stat2.value}


                        

{card.stat2.label}


                      


                    


                  


                


              


            );
          })}
        



        
      


    


  );
};

export default StorySection; or these import React, { useEffect, useRef, useState } from 'react';

import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Star, Quote, ChevronLeft, ChevronRight, Heart, Users } from 'lucide-react';

import { testimonials } from '../constants';




gsap.registerPlugin(ScrollTrigger);




const TestimonialsSection: React.FC = () => {

const sectionRef = useRef(null);

const titleRef = useRef(null);

const carouselRef = useRef(null);

const [currentIndex, setCurrentIndex] = useState(0);

const [isAutoRotating, setIsAutoRotating] = useState(true);




useEffect(() => {

const ctx = gsap.context(() => {

// Title animation

gsap.fromTo(titleRef.current, 

        { 

opacity: 0, 

y: 100,

scale: 0.8

        },

        {

opacity: 1,

y: 0,

scale: 1,

duration: 1.2,

ease: "power3.out",

scrollTrigger: {

trigger: titleRef.current,

start: "top 80%",

toggleActions: "play none none reverse"

          }

        }

      );




// Carousel animation

gsap.fromTo(carouselRef.current,

        {

opacity: 0,

y: 50

        },

        {

opacity: 1,

y: 0,

duration: 1,

ease: "power2.out",

scrollTrigger: {

trigger: carouselRef.current,

start: "top 80%",

toggleActions: "play none none reverse"

          }

        }

      );




    }, sectionRef);




return () => ctx.revert();

  }, []);




// Auto-rotation effect

useEffect(() => {

if (!isAutoRotating) return;




const interval = setInterval(() => {

setCurrentIndex((prev) => (prev + 1) % testimonials.length);

    }, 4000); // Rotate every 4 seconds




return () => clearInterval(interval);

  }, [isAutoRotating]);




const nextTestimonial = () => {

setIsAutoRotating(false);

setCurrentIndex((prev) => (prev + 1) % testimonials.length);

// Resume auto-rotation after 10 seconds of inactivity

setTimeout(() => setIsAutoRotating(true), 10000);

  };




const prevTestimonial = () => {

setIsAutoRotating(false);

setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

// Resume auto-rotation after 10 seconds of inactivity

setTimeout(() => setIsAutoRotating(true), 10000);

  };




const selectTestimonial = (index: number) => {

setIsAutoRotating(false);

setCurrentIndex(index);

// Resume auto-rotation after 10 seconds of inactivity

setTimeout(() => setIsAutoRotating(true), 10000);

  };







const getCardPosition = (index: number) => {

const position = (index - currentIndex + testimonials.length) % testimonials.length;

switch (position) {

case 0: // Front card

return {

transform: 'translateY(0) scale(1)',

zIndex: 50,

opacity: 1

        };

case 1: // First card above

return {

transform: 'translateY(-90px) scale(0.9)',

zIndex: 40,

opacity: 0.8

        };

case 2: // Second card above

return {

transform: 'translateY(-180px) scale(0.8)',

zIndex: 30,

opacity: 0.6

        };

case 3: // First card below (appears above due to reverse stacking)

return {

transform: 'translateY(90px) scale(0.9)',

zIndex: 40,

opacity: 0.8

        };

case 4: // Second card below

return {

transform: 'translateY(180px) scale(0.8)',

zIndex: 30,

opacity: 0.6

        };

default:

return {

transform: 'translateY(-270px) scale(0.7)',

zIndex: 0,

opacity: 0

        };

    }

  };




return (





{/* Background Image */}





{/* Darker overlay for better text readability */}












{/* Background Pattern */}




















{/* Section Header */}











Customer Love









            What Our Customers



              Are Saying











            Don't just take our word for it. Here's what thousands of satisfied customers 

            have to say about our premium cherries.












{/* Testimonials Carousel */}





{/* Navigation Arrows */}
















{/* Carousel Container */}





{testimonials.map((testimonial, index) => {

const cardStyle = getCardPosition(index);




return (



 selectTestimonial(index)}

>









{/* Quote Icon */}














{/* Customer Info */}











{testimonial.verified && (





✓





                          )}











{testimonial.name}





{testimonial.role}





{testimonial.location}



{/* Rating */}





{[...Array(testimonial.rating)].map((_, i) => (



                            ))}






















{testimonial.purchaseCount} orders





{testimonial.verified && (



                              Verified Buyer



                          )}












{/* Testimonial Text */}









                          "{testimonial.text}"












{/* Bottom Stats */}















{testimonial.rating}.0





Rating













{testimonial.purchaseCount}





Orders

















Customer since





2022























              );

            })}








{/* Indicators */}





{testimonials.map((_, index) => (

 selectTestimonial(index)}

className={`w-4 h-4 lg:w-5 lg:h-5 rounded-full transition-all duration-300 ${

index === currentIndex ? 'bg-red-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'

}`}

/>

            ))}












{/* Trust Indicators */}













✓







100% Verified Reviews





All reviews are from real customers who have purchased our products























4.9/5 Average Rating





Based on over 10,000 customer reviews and testimonials























98% Would Recommend





Nearly all customers would recommend our cherries to friends



















  );

};




export default TestimonialsSection; Not a single normal or usual component. It should have a bunch of background images, and images in the components. Also a bunch of immersive components where for example you scroll and it zooms into some text and smoothly moves into a different component. So just as new and creative as possible

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/73b77d42-a55c-4c60-ab97-7b94c1890c4a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
