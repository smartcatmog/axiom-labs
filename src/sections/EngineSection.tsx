import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Database, Cpu, Bell } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function EngineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="engine"
      className="min-h-screen bg-navy-primary flex items-center py-20"
    >
      <div ref={contentRef} className="w-full max-w-7xl mx-auto px-[7vw]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-primary-light font-bold leading-[0.95]" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)' }}>
              <span className="block">Ingest.</span>
              <span className="block">Analyze.</span>
              <span className="block">Alert.</span>
            </h2>
            
            <p className="text-secondary-light text-lg max-w-md leading-relaxed">
              Our engine ingests on-chain and off-chain signals, runs them through a multi-factor model, and surfaces actionable alerts—within seconds.
            </p>
            
            <button className="btn-secondary flex items-center gap-2">
              Read the docs
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Content - Steps Card */}
          <div className="glass-panel p-8 relative overflow-hidden">
            {/* Scan Line */}
            <div className="absolute left-0 right-0 h-[1px] bg-accent-coral/25 scan-line pointer-events-none" />
            
            <h3 className="text-primary-light font-semibold text-xl mb-6">
              How it works
            </h3>
            
            <div className="space-y-6">
              {/* Step 1: Ingest */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-coral/10 flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-accent-coral" />
                </div>
                <div>
                  <h4 className="text-primary-light font-semibold text-lg mb-1">1. Ingest</h4>
                  <p className="text-secondary-light text-sm">CEX + on-chain + custody feeds</p>
                </div>
              </div>

              {/* Step 2: Analyze */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-coral/10 flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-6 h-6 text-accent-coral" />
                </div>
                <div>
                  <h4 className="text-primary-light font-semibold text-lg mb-1">2. Analyze</h4>
                  <p className="text-secondary-light text-sm">Multi-factor risk scoring</p>
                </div>
              </div>

              {/* Step 3: Alert */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-coral/10 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-6 h-6 text-accent-coral" />
                </div>
                <div>
                  <h4 className="text-primary-light font-semibold text-lg mb-1">3. Alert</h4>
                  <p className="text-secondary-light text-sm">Webhook, email, API</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
