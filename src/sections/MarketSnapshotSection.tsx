import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Activity, BarChart3, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MarketSnapshotSection() {
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
      className="min-h-screen bg-navy-primary flex items-center py-20"
    >
      <div ref={contentRef} className="w-full max-w-7xl mx-auto px-[7vw]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-primary-light font-bold leading-[0.95]" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)' }}>
              <span className="block">Real-time alerts.</span>
              <span className="block">Zero noise.</span>
            </h2>
            
            <p className="text-secondary-light text-lg max-w-md leading-relaxed">
              Set thresholds. Get notified when liquidity, volatility, or custody health crosses your line—before the market moves.
            </p>
            
            <button className="btn-secondary flex items-center gap-2">
              See a sample alert
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Content - Dashboard Card */}
          <div className="glass-panel p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-primary-light font-semibold text-xl flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent-coral" />
                Risk Monitor
              </h3>
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
            
            <div className="space-y-5">
              {/* Liquidity Depth */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-secondary-light" />
                    <span className="text-secondary-light text-sm">Liquidity Depth</span>
                  </div>
                  <span className="text-primary-light font-mono font-bold">87/100</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full metric-breathe" style={{ width: '87%' }} />
                </div>
              </div>

              {/* Volatility */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-secondary-light" />
                    <span className="text-secondary-light text-sm">Volatility</span>
                  </div>
                  <span className="text-primary-light font-mono font-bold">42/100</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full metric-breathe" style={{ width: '42%', animationDelay: '0.5s' }} />
                </div>
              </div>

              {/* Custody Health */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-secondary-light" />
                    <span className="text-secondary-light text-sm">Custody Health</span>
                  </div>
                  <span className="text-primary-light font-mono font-bold">94/100</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full metric-breathe" style={{ width: '94%', animationDelay: '1s' }} />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="font-mono text-xs text-secondary-light">Last update: 2s ago</span>
              <span className="text-accent-coral text-sm font-medium">View details →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
