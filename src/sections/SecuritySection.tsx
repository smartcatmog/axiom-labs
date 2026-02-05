import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Lock, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trustCards = [
  {
    icon: Eye,
    title: 'Read-Only',
    description: 'We observe public data. We never hold assets or keys.',
  },
  {
    icon: Lock,
    title: 'Encryption',
    description: 'Data in transit and at rest with modern standards.',
  },
  {
    icon: Server,
    title: 'Uptime',
    description: 'Redundant ingestion and failover for continuous coverage.',
  },
];

export default function SecuritySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(heading,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards animation
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Subtle parallax
        gsap.to(card, {
          y: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-navy-primary py-[10vh] px-[7vw]"
    >
      {/* Heading Block */}
      <div ref={headingRef} className="mb-12">
        <h2 
          className="text-primary-light font-bold mb-4"
          style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
        >
          Security by design
        </h2>
        <p className="text-secondary-light text-[clamp(14px,1.1vw,16px)] max-w-xl leading-relaxed">
          Read-only architecture. No custody. No trading permissions.
        </p>
      </div>

      {/* Trust Cards */}
      <div className="space-y-6">
        {trustCards.map((card, index) => (
          <div
            key={card.title}
            ref={el => { cardsRef.current[index] = el; }}
            className="glass-card p-6 w-full max-w-[86vw] mx-auto"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex items-center gap-4 md:w-1/3">
                <div className="w-12 h-12 rounded-xl bg-accent-coral/10 flex items-center justify-center flex-shrink-0">
                  <card.icon className="w-6 h-6 text-accent-coral" />
                </div>
                <h3 className="text-primary-light font-semibold text-lg">
                  {card.title}
                </h3>
              </div>
              <p className="text-secondary-light text-sm leading-relaxed md:w-2/3">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
