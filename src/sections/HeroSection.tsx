import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(content.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-navy-primary flex items-center justify-center relative overflow-hidden pt-20">
      <div ref={contentRef} className="w-full max-w-7xl mx-auto px-[7vw] py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-primary-light font-bold leading-[0.95]" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
              <span className="block">{t.hero.title1}</span>
              <span className="block">{t.hero.title2}</span>
              <span className="block">{t.hero.title3}</span>
            </h1>
            <p className="text-secondary-light text-lg max-w-md leading-relaxed">{t.hero.desc}</p>
            
            <div className="flex flex-wrap gap-4">
              {/* 修复：Demo 按钮跳转到看板页面 */}
              <a href="#/dashboard" className="btn-primary flex items-center gap-2 px-8 py-3 rounded-xl bg-accent-coral text-white font-bold no-underline">
                {t.hero.btnDemo}
                <ArrowRight className="w-4 h-4" />
              </a>
              {/* 修复：Engine 按钮跳转到下方的方法论区域 */}
              <a href="#methodology" className="btn-secondary flex items-center gap-2 px-8 py-3 rounded-xl border border-white/20 text-white font-bold no-underline hover:bg-white/5 transition-all">
                {t.hero.btnEngine}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="relative flex flex-col items-center gap-8">
            <img src="/hero-coin.png" alt="AXIOM" className="w-[280px] md:w-[360px] h-auto coin-rotate" />
            <div className="glass-panel p-6 w-full max-w-md text-left">
              <h3 className="text-primary-light font-semibold text-lg mb-3">{t.hero.cardTitle}</h3>
              <p className="text-secondary-light text-sm mb-4">{t.hero.cardDesc}</p>
              {/* 修复：Explore 链接跳转到看板 */}
              <a href="#/dashboard" className="text-accent-coral text-sm font-medium flex items-center gap-1 hover:underline">
                {t.hero.cardLink}
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}