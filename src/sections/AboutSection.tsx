import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, TrendingUp, Users, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
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
      id="about"
      className="min-h-screen bg-navy-primary flex items-center py-20"
    >
      <div ref={contentRef} className="w-full max-w-7xl mx-auto px-[7vw]">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-accent-coral uppercase tracking-wider mb-4 block">
            About Us
          </span>
          <h2 className="text-primary-light font-bold leading-[0.95] mb-6" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)' }}>
            Veteran Risk Operators.<br />
            <span className="text-secondary-light">Built for the AI Agent Economy.</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: Story */}
          <div className="space-y-6">
            <p className="text-secondary-light text-lg leading-relaxed">
              We are a veteran team of risk operators and financial strategists with a specialized focus on 
              <span className="text-primary-light font-medium"> high-fidelity risk management</span> for 
              digital assets and Real-World Assets (RWA).
            </p>
            <p className="text-secondary-light text-lg leading-relaxed">
              We bring a unique <span className="text-accent-coral font-medium">"boots-on-the-ground"</span> perspective 
              to the emerging AI Agent economy, shaped by tenure at 
              <span className="text-primary-light font-medium"> Binance</span>, the world's largest cryptocurrency exchange.
            </p>
          </div>

          {/* Right: Highlight Card */}
          <div className="glass-panel p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-coral/10 rounded-full blur-3xl" />
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-accent-coral/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-7 h-7 text-accent-coral" />
              </div>
              <div>
                <h3 className="text-primary-light font-bold text-xl mb-2">BUSD Management Experience</h3>
                <p className="text-secondary-light text-sm leading-relaxed">
                  A core member of our team previously managed 
                  <span className="text-primary-light font-medium"> BUSD</span>, which at its peak was the 
                  world's third-largest stablecoin.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div>
                <p className="text-accent-coral font-bold text-3xl font-mono">$24B</p>
                <p className="text-secondary-light text-xs mt-1">Peak Market Cap</p>
              </div>
              <div>
                <p className="text-accent-coral font-bold text-3xl font-mono">#3</p>
                <p className="text-secondary-light text-xs mt-1">Global Ranking</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent-coral/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-accent-coral" />
            </div>
            <p className="text-primary-light font-bold text-2xl mb-1">Risk-First</p>
            <p className="text-secondary-light text-xs">Operational Philosophy</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent-coral/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-accent-coral" />
            </div>
            <p className="text-primary-light font-bold text-2xl mb-1">RWA + DeFi</p>
            <p className="text-secondary-light text-xs">Asset Coverage</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent-coral/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-accent-coral" />
            </div>
            <p className="text-primary-light font-bold text-2xl mb-1">Binance</p>
            <p className="text-secondary-light text-xs">Alumni Network</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent-coral/10 flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-accent-coral" />
            </div>
            <p className="text-primary-light font-bold text-2xl mb-1">$24B+</p>
            <p className="text-secondary-light text-xs">Assets Managed</p>
          </div>
        </div>
      </div>
    </section>
  );
}
