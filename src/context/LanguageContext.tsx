import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'zh';

const translations: any = {
  en: {
    nav: { about: "About", methodology: "Methodology", product: "Product", engine: "Engine", security: "Security", contact: "Contact", dashboard: "Dashboard", requestDemo: "Request a demo" },
    hero: { title1: "See the risk", title2: "before the", title3: "market does.", desc: "Real-time risk oracle.", btnDemo: "Demo", btnEngine: "Engine", cardTitle: "Risk Score", cardDesc: "0-100 index.", cardLink: "Explore" },
    methodology: {
      header: { tag: "METHODOLOGY", title: "AXIOM", subtitle: "Warning system.", motto: "Built for bear.", desc: "Analysis framework." },
      problem: { title: "What we solve?", box1Top: "Moody's", box1Bot: "Default", box2Top: "S&P", box2Bot: "Rules", box3Top: "AXIOM", box3Bot: "Chaos", desc1: "Order of ", desc2: "death", historyPrefix: "Note:", historyText: "Solvency is not survivability." },
      principles: { title: "Basic Laws", items: [{title:"Reject Bias",subtitle:"Bias",content:"Check Drawdown."},{title:"Structured",subtitle:"Risk",content:"Dismantle risk."},{title:"Signal",subtitle:"System",content:"Follow red light."}] },
      stability: { title: "Stability", tradTop: "Trad:", tradBot: "Safe?", axiomTop: "AXIOM:", axiomBot: "Exits?", desc1: "We use ", desc2: "Liquidity-First", desc3: " logic.", box1Title: "Static", box1Bullets: ["Quality"], box2Title: "Dynamic", box2Bullets: ["Pools"], box3Title: "Vectors", box3Bullets: ["Failure"], conclusion1: "Focus: ", conclusion2: "Who dies first." },
      grades: { title: "Tiers", featuresLabel: "FEAT", meaningLabel: "MEAN", items: [{name:"S",subtitle:"Sovereign",features:["Depth"],meaning:"Safety anchor."},{name:"Y",subtitle:"Yield",features:["Logic"],meaning:"Yield play."},{name:"C",subtitle:"Critical",features:["Broken"],meaning:"Casino."}] },
      notDo: { title: "NOT", bullets: ["No Fees", "No Price", "No Endorsment"], footer1: "Task: ", footer2: "Expose assumptions." },
      position: { title: "Position", desc1: "AXIOM:", desc2: "Real risk.", desc3: "Survival tools.", motto: "Building tools." },
      appendix: { title: "Appendix", p1: "Stablecoins peg.", p2: "AXIOM provides warnings." }
    }
  },
  zh: {
    nav: { about: "关于", methodology: "方法论", product: "产品", engine: "引擎", security: "安全", contact: "联系", dashboard: "仪表盘", requestDemo: "申请演示" },
    hero: { title1: "洞察风险", title2: "先于市场", title3: "一步。", desc: "实时风险预言机。", btnDemo: "演示", btnEngine: "引擎", cardTitle: "风险评分", cardDesc: "0-100 指数", cardLink: "探索" },
    methodology: {
      header: { tag: "方法论", title: "AXIOM", subtitle: "生存预警系统", motto: "为熊市而生", desc: "风险假设披露" },
      problem: { title: "我们在解决什么问题？", box1Top: "Moody's", box1Bot: "法律违约", box2Top: "标普", box2Bot: "制度稳定", box3Top: "AXIOM", box3Bot: "生存顺序", desc1: "解决 ", desc2: "市场里的死亡顺序", historyPrefix: "提示：", historyText: "偿付能力不等于生存能力。" },
      principles: { title: "基本法则", items: [{title:"拒绝偏差",subtitle:"幸存者偏差",content:"看最大回撤。"},{title:"结构化",subtitle:"结构风险",content:"风险可拆解。"},{title:"信号",subtitle:"信号系统",content:"红灯停，绿灯行。"}] },
      stability: { title: "定义稳定", tradTop: "传统：", tradBot: "资产安全吗？", axiomTop: "AXIOM：", axiomBot: "能退出吗？", desc1: "采用 ", desc2: "流动性优先", desc3: " 逻辑。", box1Title: "静态", box1Bullets: ["资产质量"], box2Title: "动态", box2Bullets: ["池深度"], box3Title: "向量", box3Bullets: ["脆弱度"], conclusion1: "核心：", conclusion2: "谁先死。" },
      grades: { title: "生存分区", featuresLabel: "特征", meaningLabel: "含义", items: [{name:"S",subtitle:"生存级",features:["流动性深"],meaning:"最后倒下。"},{name:"Y",subtitle:"收益级",features:["逻辑成立"],meaning:"博取收益。"},{name:"C",subtitle:"警告级",features:["断裂"],meaning:"随时归零。"}] },
      notDo: { title: "不做什么", bullets: ["不收费", "不测价", "不背书"], footer1: "任务：", footer2: "披露假设。" },
      position: { title: "立场", desc1: "相信：", desc2: "风险来自未知。", desc3: "生存预警。", motto: "生存工具。" },
      appendix: { title: "附录", p1: "稳定币 1:1。", p2: "提供脱钩预警。" }
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