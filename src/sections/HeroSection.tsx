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

  // 动画效果
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

  // 安全获取翻译内容（防止因字典缺失导致白屏）
  const hero = t?.hero || {};

  return (
    <section ref={sectionRef} className="min-h-screen bg-navy-primary flex items-center justify-center relative overflow-hidden pt-20 text-white">
      <div ref={contentRef} className="w-full max-w-7xl mx-auto px-[7vw] py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center text-left">
          {/* 左侧：文字内容 */}
          <div className="space-y-8">
            <h1 className="font-bold leading-[0.95] text-white" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
              <span className="block">{hero.title1 || "See the risk"}</span>
              <span className="block">{hero.title2 || "before the"}</span>
              <span className="block">{hero.title3 || "market does."}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              {hero.desc || "A real-time risk oracle for stablecoins and crypto assets."}
            </p>
            
            <div className="flex flex-wrap gap-4">
              {/* 链接到 Dashboard 页面 */}
              <a href="#/dashboard" className="bg-[#ff4d4f] hover:bg-opacity-90 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 no-underline transition-all shadow-lg">
                {hero.btnDemo || "Demo"}
                <ArrowRight className="w-4 h-4" />
              </a>
              {/* 链接到下方 Methodology 锚点 */}
              <a href="#methodology" className="border border-white/20 hover:bg-white/5 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 no-underline transition-all">
                {hero.btnEngine || "Engine"}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 右侧：硬币和评分卡片 */}
          <div className="relative flex flex-col items-center gap-8">
            <img src="/hero-coin.png" alt="AXIOM" className="w-[280px] md:w-[360px] h-auto coin-rotate" />
            <div className="glass-panel p-6 w-full max-w-md text-left">
              <h3 className="text-white font-semibold text-lg mb-3">{hero.cardTitle || "Risk Score"}</h3>
              <p className="text-gray-400 text-sm mb-4">{hero.cardDesc || "0-100 index mapping stability."}</p>
              <a href="#/dashboard" className="text-[#ff4d4f] text-sm font-medium flex items-center gap-1 hover:underline">
                {hero.cardLink || "Explore"}
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}