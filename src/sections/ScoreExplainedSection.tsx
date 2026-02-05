import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Waves, TrendingUp, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ScoreExplainedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Scroll-driven reveal animation
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
      id="product"
      className="min-h-screen bg-navy-primary flex items-center py-20"
    >
      <div ref={contentRef} className="w-full max-w-7xl mx-auto px-[7vw]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-primary-light font-bold leading-[0.95]" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)' }}>
              <span className="block">One score.</span>
              <span className="block">Many signals.</span>
            </h2>
            
            <p className="text-secondary-light text-lg max-w-md leading-relaxed">
              We aggregate on-chain depth, volatility, funding, and custody health—then surface a single 0–100 reading you can act on.
            </p>
            
            <button className="btn-secondary flex items-center gap-2">
              Meet the engine
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Content - Card */}
          <div className="glass-panel p-8">
            <h3 className="text-primary-light font-semibold text-xl mb-6">
              What the score captures
            </h3>
            <ul className="space-y-5">
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-coral/10 flex items-center justify-center flex-shrink-0">
                  <Waves className="w-6 h-6 text-accent-coral" />
                </div>
                <div>
                  <p className="text-primary-light font-medium">Liquidity depth & slippage</p>
                  <p className="text-secondary-light text-sm">Real-time order book analysis</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-coral/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-accent-coral" />
                </div>
                <div>
                  <p className="text-primary-light font-medium">Volatility clustering</p>
                  <p className="text-secondary-light text-sm">Price stability monitoring</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-coral/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-accent-coral" />
                </div>
                <div>
                  <p className="text-primary-light font-medium">Custody + issuer health</p>
                  <p className="text-secondary-light text-sm">Reserve and audit tracking</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
