import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  AlertTriangle, 
  Shield, 
  TrendingDown, 
  Activity, 
  Layers, 
  Scale,
  X,
  Check,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// 这里只保留 UI 的颜色和图标配置，文字从字典里读取
const riskGradesUI = [
  { grade: 'S', color: 'emerald' },
  { grade: 'Y', color: 'amber' },
  { grade: 'C', color: 'red' }
];

const principlesUI = [
  { number: '01', icon: TrendingDown },
  { number: '02', icon: Layers },
  { number: '03', icon: Activity }
];

export default function MethodologySection() {
  const { t } = useLanguage(); // 获取多语言数据
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [expandedGrade, setExpandedGrade] = useState<string | null>(null);

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
          stagger: 0.1,
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
      id="methodology"
      className="min-h-screen bg-navy-primary py-20"
    >
      <div ref={contentRef} className="w-full max-w-7xl mx-auto px-[7vw]">
        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-xs text-accent-coral uppercase tracking-wider mb-4 block">
            {t.methodology.header.tag}
          </span>
          <h2 className="text-primary-light font-bold leading-[0.95] mb-4" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)' }}>
            {t.methodology.header.title}
          </h2>
          <p className="text-secondary-light text-xl max-w-3xl leading-relaxed">
            {t.methodology.header.subtitle}
          </p>
          <p className="text-accent-coral font-mono text-sm mt-4">
            {t.methodology.header.motto}
          </p>
          <p className="text-secondary-light text-sm mt-2">
            {t.methodology.header.desc}
          </p>
        </div>

        {/* Problem Statement */}
        <div className="glass-panel p-8 mb-12">
          <h3 className="text-primary-light font-semibold text-xl mb-6 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-accent-coral" />
            {t.methodology.problem.title}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-5">
              <p className="text-secondary-light text-sm mb-2">{t.methodology.problem.box1Top}</p>
              <p className="text-primary-light font-medium">{t.methodology.problem.box1Bot}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-5">
              <p className="text-secondary-light text-sm mb-2">{t.methodology.problem.box2Top}</p>
              <p className="text-primary-light font-medium">{t.methodology.problem.box2Bot}</p>
            </div>
            <div className="bg-accent-coral/10 rounded-xl p-5 border border-accent-coral/20">
              <p className="text-secondary-light text-sm mb-2">{t.methodology.problem.box3Top}</p>
              <p className="text-primary-light font-medium">{t.methodology.problem.box3Bot}</p>
            </div>
          </div>
          <p className="text-secondary-light text-sm mt-6 leading-relaxed">
            {t.methodology.problem.desc1}<span className="text-primary-light font-medium">{t.methodology.problem.desc2}</span>。
          </p>
          <div className="mt-6 p-4 bg-white/5 rounded-xl border-l-4 border-accent-coral">
            <p className="text-secondary-light text-sm">
              <span className="text-primary-light font-medium">{t.methodology.problem.historyPrefix}</span>
              {t.methodology.problem.historyText}
            </p>
          </div>
        </div>

        {/* Three Principles */}
        <div className="mb-12">
          <h3 className="text-primary-light font-semibold text-xl mb-6 flex items-center gap-3">
            <Scale className="w-6 h-6 text-accent-coral" />
            {t.methodology.principles.title}
          </h3>
          <div className="space-y-4">
            {principlesUI.map((ui, idx) => {
              const data = t.methodology.principles.items[idx];
              return (
                <div key={ui.number} className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-coral/10 flex items-center justify-center flex-shrink-0">
                      <ui.icon className="w-6 h-6 text-accent-coral" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-accent-coral">{ui.number}</span>
                        <h4 className="text-primary-light font-semibold text-lg">{data.title}</h4>
                        <span className="text-secondary-light text-sm">{data.subtitle}</span>
                      </div>
                      <p className="text-secondary-light text-sm leading-relaxed">
                        {data.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How AXIOM Defines Stability */}
        <div className="glass-panel p-8 mb-12">
          <h3 className="text-primary-light font-semibold text-xl mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6 text-accent-coral" />
            {t.methodology.stability.title}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/5 rounded-xl p-5">
              <p className="text-secondary-light text-sm mb-2">{t.methodology.stability.tradTop}</p>
              <p className="text-primary-light">{t.methodology.stability.tradBot}</p>
            </div>
            <div className="bg-accent-coral/10 rounded-xl p-5 border border-accent-coral/20">
              <p className="text-secondary-light text-sm mb-2">{t.methodology.stability.axiomTop}</p>
              <p className="text-primary-light font-medium">{t.methodology.stability.axiomBot}</p>
            </div>
          </div>

          <p className="text-secondary-light text-sm mb-6">
            {t.methodology.stability.desc1}
            <span className="text-primary-light font-medium">{t.methodology.stability.desc2}</span>
            {t.methodology.stability.desc3}
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-5">
              <h4 className="text-primary-light font-medium mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                {t.methodology.stability.box1Title}
              </h4>
              <ul className="space-y-2 text-secondary-light text-sm">
                {t.methodology.stability.box1Bullets.map((bullet, i) => (
                  <li key={i}>• {bullet}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 rounded-xl p-5">
              <h4 className="text-primary-light font-medium mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-500" />
                {t.methodology.stability.box2Title}
              </h4>
              <ul className="space-y-2 text-secondary-light text-sm">
                {t.methodology.stability.box2Bullets.map((bullet, i) => (
                  <li key={i}>• {bullet}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 rounded-xl p-5">
              <h4 className="text-primary-light font-medium mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                {t.methodology.stability.box3Title}
              </h4>
              <ul className="space-y-2 text-secondary-light text-sm">
                {t.methodology.stability.box3Bullets.map((bullet, i) => (
                  <li key={i}>• {bullet}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent-coral/10 rounded-xl border border-accent-coral/20">
            <p className="text-primary-light text-center font-medium">
              {t.methodology.stability.conclusion1}<span className="text-accent-coral">{t.methodology.stability.conclusion2}</span>
            </p>
          </div>
        </div>

        {/* Risk Grades */}
        <div className="mb-12">
          <h3 className="text-primary-light font-semibold text-xl mb-6 flex items-center gap-3">
            <Layers className="w-6 h-6 text-accent-coral" />
            {t.methodology.grades.title}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {riskGradesUI.map((ui, idx) => {
              const data = t.methodology.grades.items[idx];
              return (
                <div 
                  key={ui.grade}
                  className={`glass-card p-6 cursor-pointer transition-all duration-300 ${
                    expandedGrade === ui.grade ? 'ring-2 ring-accent-coral' : 'hover:bg-white/8'
                  }`}
                  onClick={() => setExpandedGrade(expandedGrade === ui.grade ? null : ui.grade)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      ui.color === 'emerald' ? 'bg-emerald-500/20' :
                      ui.color === 'amber' ? 'bg-amber-500/20' : 'bg-red-500/20'
                    }`}>
                      <span className={`text-2xl font-bold ${
                        ui.color === 'emerald' ? 'text-emerald-500' :
                        ui.color === 'amber' ? 'text-amber-500' : 'text-red-500'
                      }`}>{ui.grade}</span>
                    </div>
                    <div>
                      <h4 className="text-primary-light font-semibold">{data.name}</h4>
                      <p className="text-secondary-light text-sm">{data.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-secondary-light text-xs uppercase tracking-wider">{t.methodology.grades.featuresLabel}</p>
                    {data.features.map((feature, i) => (
                      <p key={i} className="text-primary-light text-sm">• {feature}</p>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-secondary-light text-xs uppercase tracking-wider mb-2">{t.methodology.grades.meaningLabel}</p>
                    <p className="text-primary-light text-sm">{data.meaning}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What AXIOM Does NOT Do */}
        <div className="glass-panel p-8 mb-12">
          <h3 className="text-primary-light font-semibold text-xl mb-6 flex items-center gap-3">
            <X className="w-6 h-6 text-red-500" />
            {t.methodology.notDo.title}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {t.methodology.notDo.bullets.map((item, idx) => (
              <div key={idx} className="bg-white/5 rounded-xl p-4 text-center">
                <X className="w-5 h-5 text-red-500 mx-auto mb-2" />
                <p className="text-secondary-light text-sm">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-accent-coral/10 rounded-xl border border-accent-coral/20 text-center">
            <p className="text-primary-light font-medium">
              {t.methodology.notDo.footer1}<span className="text-accent-coral">{t.methodology.notDo.footer2}</span>
            </p>
          </div>
        </div>

        {/* Our Position */}
        <div className="glass-panel p-8 mb-12">
          <h3 className="text-primary-light font-semibold text-xl mb-6 flex items-center gap-3">
            <Info className="w-6 h-6 text-accent-coral" />
            {t.methodology.position.title}
          </h3>
          <p className="text-secondary-light text-lg leading-relaxed mb-6">
            {t.methodology.position.desc1}<span className="text-primary-light font-medium">{t.methodology.position.desc2}</span>
          </p>
          <p className="text-secondary-light leading-relaxed">
            {t.methodology.position.desc3}
          </p>
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-accent-coral font-mono text-sm">
              {t.methodology.position.motto}
            </p>
          </div>
        </div>

        {/* Appendix */}
        <div className="glass-card p-6">
          <h4 className="text-primary-light font-medium mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-secondary-light" />
            {t.methodology.appendix.title}
          </h4>
          <p className="text-secondary-light text-sm leading-relaxed">
            {t.methodology.appendix.p1}
          </p>
          <p className="text-secondary-light text-sm leading-relaxed mt-3">
            {t.methodology.appendix.p2}
          </p>
        </div>
      </div>
    </section>
  );
}