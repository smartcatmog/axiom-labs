import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'zh';

const translations = {
  en: {
    nav: { about: "About", methodology: "Methodology", product: "Product", engine: "Engine", security: "Security", contact: "Contact", dashboard: "Dashboard", requestDemo: "Request a demo" },
    hero: {
      title1: "See the risk", title2: "before the", title3: "market does.",
      desc: "A real-time risk oracle for stablecoins and crypto assets.",
      btnDemo: "Request a demo", btnEngine: "View the engine",
      cardTitle: "What is the Risk Score?", cardDesc: "0-100 Index", cardLink: "Explore"
    },
    methodology: {
      header: {
        tag: "METHODOLOGY", title: "AXIOM", subtitle: "Survival warning system.",
        motto: "Built for bear.", desc: "Risk warning system."
      },
      problem: {
        title: "What problem are we solving?",
        box1Top: "Moody's", box1Bot: "Default",
        box2Top: "S&P", box2Bot: "Stability",
        box3Top: "AXIOM", box3Bot: "Survival",
        desc1: "Order of ", desc2: "death",
        historyPrefix: "History: ", historyText: "Solvency."
      },
      principles: { title: "Laws", items: [{title:"1",subtitle:"s",content:"c"},{title:"2",subtitle:"s",content:"c"},{title:"3",subtitle:"s",content:"c"}] },
      stability: { 
        title: "Stability", tradTop: "T", tradBot: "B", axiomTop: "A", axiomBot: "B", desc1: "D", desc2: "L", desc3: "A",
        box1Title: "S", box1Bullets: [], box2Title: "D", box2Bullets: [], box3Title: "F", box3Bullets: [],
        conclusion1: "C", conclusion2: "D"
      },
      grades: { title: "Grades", featuresLabel: "F", meaningLabel: "M", items: [{name:"S",subtitle:"S",features:[],meaning:"M"},{name:"Y",subtitle:"Y",features:[],meaning:"M"},{name:"C",subtitle:"C",features:[],meaning:"M"}] },
      notDo: { title: "Not", bullets: [], footer1: "F", footer2: "F" },
      position: { title: "P", desc1: "D", desc2: "D", desc3: "D", motto: "M" },
      appendix: { title: "A", p1: "P", p2: "P" }
    }
  },
  zh: {
    nav: { about: "关于", methodology: "方法论", product: "产品", engine: "引擎", security: "安全", contact: "联系", dashboard: "仪表盘", requestDemo: "申请演示" },
    hero: {
      title1: "洞察风险", title2: "先于市场", title3: "一步。",
      desc: "针对稳定币和加密资产的实时风险预言机。",
      btnDemo: "申请演示", btnEngine: "查看引擎",
      cardTitle: "什么是风险评分？", cardDesc: "0-100 指数", cardLink: "探索"
    },
    methodology: {
      header: {
        tag: "方法论", title: "AXIOM", subtitle: "生存预警系统",
        motto: "为熊市而生", desc: "风险预警系统。"
      },
      problem: {
        title: "我们在解决什么问题？",
        box1Top: "Moody's", box1Bot: "法院违约",
        box2Top: "标普", box2Bot: "制度稳定性",
        box3Top: "AXIOM", box3Bot: "生存顺序",
        desc1: "我们解决", desc2: "市场里的死亡顺序",
        historyPrefix: "历史证明：", historyText: "账面偿付能力。"
      },
      principles: { title: "法则", items: [{title:"1",subtitle:"s",content:"c"},{title:"2",subtitle:"s",content:"c"},{title:"3",subtitle:"s",content:"c"}] },
      stability: { 
        title: "定义", tradTop: "T", tradBot: "B", axiomTop: "A", axiomBot: "B", desc1: "D", desc2: "L", desc3: "A",
        box1Title: "S", box1Bullets: [], box2Title: "D", box2Bullets: [], box3Title: "F", box3Bullets: [],
        conclusion1: "C", conclusion2: "D"
      },
      grades: { title: "分级", featuresLabel: "F", meaningLabel: "M", items: [{name:"S",subtitle:"S",features:[],meaning:"M"},{name:"Y",subtitle:"Y",features:[],meaning:"M"},{name:"C",subtitle:"C",features:[],meaning:"M"}] },
      notDo: { title: "不做的", bullets: [], footer1: "F", footer2: "F" },
      position: { title: "立场", desc1: "D", desc2: "D", desc3: "D", motto: "M" },
      appendix: { title: "附录", p1: "P", p2: "P" }
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