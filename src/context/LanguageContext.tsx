import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'zh';

const translations = {
  en: {
    nav: { about: "About", methodology: "Methodology", product: "Product", engine: "Engine", security: "Security", contact: "Contact", dashboard: "Dashboard", requestDemo: "Request a demo" },
    hero: { title1: "See the risk", title2: "before the", title3: "market does.", desc: "A real-time risk oracle for stablecoins and crypto assets.", btnDemo: "Request a demo", btnEngine: "View the engine", cardTitle: "What is the Risk Score?", cardDesc: "A 0–100 index that aggregates on-chain liquidity, volatility, and structural signals.", cardLink: "Explore the methodology" },
    methodology: {
      header: { tag: "METHODOLOGY", title: "AXIOM", subtitle: "Survival warning system.", motto: "Built for bear, tested in bull.", desc: "Risk warning and hypothesis disclosure system." },
      problem: { title: "What problem are we solving?", box1Top: "Moody's", box1Bot: "\"Default\"", box2Top: "S&P", box2Bot: "\"Stability\"", box3Top: "AXIOM", box3Bot: "\"Survival\"", desc1: "We solve ", desc2: "\"the order of death\"", historyPrefix: "History: ", historyText: "Solvency ≠ Survivability." }
    }
  },
  zh: {
    nav: { about: "关于", methodology: "方法论", product: "产品", engine: "引擎", security: "安全", contact: "联系", dashboard: "仪表盘", requestDemo: "申请演示" },
    hero: { title1: "洞察风险", title2: "先于市场", title3: "一步。", desc: "针对稳定币和加密资产的实时风险预言机。", btnDemo: "申请演示", btnEngine: "查看引擎", cardTitle: "什么是风险评分？", cardDesc: "一个 0-100 的指数，聚合链上信号。", cardLink: "探索方法论" },
    methodology: {
      header: { tag: "方法论", title: "AXIOM", subtitle: "生存预警系统", motto: "为熊市而生，在牛市验证", desc: "风险预警与假设披露系统。" },
      problem: { title: "我们在解决什么问题？", box1Top: "Moody's", box1Bot: "法院违约", box2Top: "标普", box2Bot: "制度稳定性", box3Top: "AXIOM", box3Bot: "生存顺序", desc1: "我们解决", desc2: "市场里的死亡顺序", historyPrefix: "历史证明：", historyText: "账面偿付能力 ≠ 生存能力。" }
    }
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) throw new Error('useLanguage error');
  return context;
}