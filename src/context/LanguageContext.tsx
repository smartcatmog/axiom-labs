import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'zh';

const translations: any = {
  en: {
    nav: { about: "About", methodology: "Methodology", product: "Product", engine: "Engine", security: "Security", contact: "Contact", dashboard: "Dashboard", requestDemo: "Request a demo" },
    hero: { title1: "See the risk", title2: "before the", title3: "market does.", desc: "A real-time risk oracle.", btnDemo: "Request a demo", btnEngine: "View the engine", cardTitle: "Risk Score", cardDesc: "0-100 index.", cardLink: "Explore" },
    methodology: {
      header: { tag: "METHODOLOGY", title: "AXIOM", subtitle: "Risk warning system.", motto: "Built for bear, tested in bull.", desc: "Born for the bear market." },
      problem: { title: "What we solve?", box1Top: "Moody's", box1Bot: "Default", box2Top: "S&P", box2Bot: "Rules", box3Top: "AXIOM", box3Bot: "Chaos", desc1: "Order of ", desc2: "death", historyPrefix: "Note:", historyText: "Solvency is not survivability." }
    }
  },
  zh: {
    nav: { about: "关于", methodology: "方法论", product: "产品", engine: "引擎", security: "安全", contact: "联系", dashboard: "仪表盘", requestDemo: "申请演示" },
    hero: { title1: "洞察风险", title2: "先于市场", title3: "一步。", desc: "实时风险预言机。", btnDemo: "申请演示", btnEngine: "查看引擎", cardTitle: "风险评分", cardDesc: "0-100 指数", cardLink: "探索" },
    methodology: {
      header: { tag: "方法论", title: "AXIOM", subtitle: "资产生存预警系统", motto: "为熊市而生，在牛市验证", desc: "风险预警系统。" },
      problem: { title: "我们在解决什么问题？", box1Top: "Moody's", box1Bot: "法律违约", box2Top: "标普", box2Bot: "制度稳定", box3Top: "AXIOM", box3Bot: "生存顺序", desc1: "解决 ", desc2: "市场里的死亡顺序", historyPrefix: "提示：", historyText: "偿付能力不等于生存能力。" }
    }
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  // 【防崩溃 Proxy 机制】
  // 如果页面访问了不存在的翻译字段，返回空字符串而不是直接报错死机
  const t = new Proxy(translations[lang], {
    get: (target, section) => {
      if (target[section]) {
        return new Proxy(target[section], {
          get: (subTarget, key) => subTarget[key] || ""
        });
      }
      return new Proxy({}, { get: () => "" });
    }
  });

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