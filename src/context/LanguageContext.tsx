import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'zh';

const translations = {
  en: {
    nav: { about: "About", methodology: "Methodology", product: "Product", engine: "Engine", security: "Security", contact: "Contact", dashboard: "Dashboard", requestDemo: "Request a demo" },
    hero: { title1: "See the risk", title2: "before the", title3: "market does.", desc: "A real-time risk oracle for stablecoins and crypto assets.", btnDemo: "Request a demo", btnEngine: "View the engine", cardTitle: "What is the Risk Score?", cardDesc: "A 0–100 index that aggregates on-chain liquidity, volatility, and structural signals into a single, actionable reading.", cardLink: "Explore the methodology" },
    methodology: {
      header: { tag: "METHODOLOGY", title: "AXIOM", subtitle: "A crypto asset survival warning system designed for extreme market conditions.", motto: "Built for the bear market. Tested in the bull run.", desc: "Born for the bear market, validated in the bull run. AXIOM's Web3 Survival Sheet is a risk warning and hypothesis disclosure system, not a yield ranking." },
      problem: { title: "What problem are we solving?", box1Top: "What Moody's solves", box1Bot: "\"Default in the courtroom\"", box2Top: "What S&P is doing?", box2Bot: "\"Is it stable if everything runs by the book?\"", box3Top: "What AXIOM is doing?", box3Bot: "\"If the world suddenly breaks, does it die first or last?\"", desc1: "Because we understand: on-chain runs are instantaneous, funding flips, and insurance funds burn out. AXIOM solves ", desc2: "\"the order of death in the market\"", historyPrefix: "History has proven: ", historyText: "Solvency ≠ Survivability. A stablecoin, protocol, or yield product can die instantly due to liquidity fractures, structural failure, or correlation collapse even while 'fully reserved, compliant, and audited'." },
      principles: {
        title: "Required Reading: Three Basic Laws",
        items: [
          { title: "Reject Survivorship Bias", subtitle: "Survivorship Bias", content: "We don't look at APY, only Max Drawdown. If it can go to zero in extreme scenarios, the current 20% or 30% annualized yield has no risk meaning." },
          { title: "Risk is 'Structured'", subtitle: "Structured Risk", content: "Risk is never simply 'High/Medium/Low'; it is embedded in specific structures. All risks can be dismantled, quantified, and compared against historical failures." },
          { title: "Red Light Stop, Green Light Go", subtitle: "Signal System", content: "AXIOM does not give 'investment advice' but survival signals. When the [Operation Signal] flashes ❌ RED, withdraw funds immediately." }
        ]
      },
      stability: { title: "How AXIOM Defines \"Stability\"?", tradTop: "Traditional ratings focus on:", tradBot: "\"Does the asset side look safe enough?\"", axiomTop: "AXIOM focuses on:", axiomBot: "\"Can the market handle real-scale exits? Will your assets instantly go to zero?\"", desc1: "Therefore, we adopt a ", desc2: "Liquidity-First", desc3: " analysis framework.", box1Title: "Static Solvency", box1Bullets: ["Collateral asset quality", "Bankruptcy remoteness", "Legal enforceability"], box2Title: "Dynamic Liquidity", box2Bullets: ["On-chain pool depth", "CEX order books", "Slippage & delay of large exits"], box3Title: "Failure Vector Mapping", box3Bullets: ["Historical failures", "Structural similarity penalties", "Fragility weights"], conclusion1: "The conclusion is ", conclusion2: "under what conditions it dies first." },
      grades: { title: "AXIOM's Tiers", featuresLabel: "FEATURES", meaningLabel: "MEANING", items: [ { name: "Sovereign Grade", subtitle: "Survival Grade", features: ["Clear asset isolation", "Deepest liquidity"], meaning: "Capital safety anchor." }, { name: "Yield Grade", subtitle: "Yield Grade", features: ["Solvency logic holds"], meaning: "Exits must be monitored." }, { name: "Critical Risk", subtitle: "Survival Warning", features: ["Fractured liquidity"], meaning: "This is a casino." } ] },
      notDo: { title: "What AXIOM Does NOT Do", bullets: ["No rating fees", "No price prediction", "No buy/sell recommendations", "No project endorsements", "No 'AAA' safety illusions"], footer1: "AXIOM does only one thing: ", footer2: "Expose the assumptions." },
      position: { title: "Our Position", desc1: "AXIOM believes: ", desc2: "True risk comes from unknown bets.", desc3: "Web3 lacks a system to warn you that chairs might be missing.", motto: "AXIOM — Survival tools." },
      appendix: { title: "Appendix", p1: "A stablecoin is a cryptocurrency designed to maintain stable value.", p2: "Axiom provides Early warnings." }
    }
  },
  zh: {
    nav: { about: "关于", methodology: "方法论", product: "产品", engine: "引擎", security: "安全", contact: "联系", dashboard: "仪表盘", requestDemo: "申请演示" },
    hero: { title1: "洞察风险", title2: "先于市场", title3: "一步。", desc: "针对稳定币和加密资产的实时风险预言机。", btnDemo: "申请演示", btnEngine: "查看引擎", cardTitle: "什么是风险评分？", cardDesc: "一个 0-100 的指数，聚合了链上流动性、波动性和结构化信号。", cardLink: "探索方法论" },
    methodology: {
      header: { tag: "METHODOLOGY", title: "AXIOM", subtitle: "一套为极端行情而设计的加密资产生存预警系统", motto: "Built for the bear market. Tested in the bull run.", desc: "为熊市而生，在牛市验证。AXIOM 的 Web3 Survival Sheet，是一套风险预警系统。" },
      problem: { title: "我们在解决什么问题？", box1Top: "Moody's 解决的是", box1Bot: "\"法院里的违约\"", box2Top: "标普在做什么？", box2Bot: "\"如果一切按制度运行，它是否稳定？\"", box3Top: "AXIOM 在做什么？", box3Bot: "\"如果世界突然变坏，它先死还是后死？\"", desc1: "我们明白：链上 run 是瞬时的。AXIOM 解决的是", desc2: "\"市场里的死亡顺序\"", historyPrefix: "历史已经反复证明：", historyText: "账面偿付能力 ≠ 生存能力。资产可以在\"完全有储备、完全合规\"的状态下瞬间死亡。" },
      principles: {
        title: "使用前必读：三条基本法则",
        items: [
          { title: "拒绝幸存者偏差", subtitle: "Survivorship Bias", content: "我们不看 APY，只看最大回撤。如果可能归零，收益没有任何意义。" },
          { title: "风险是被\"结构化\"的", subtitle: "Structured Risk", content: "风险不是一句\"高 / 中 / 低\"，而是被嵌在具体结构里的。" },
          { title: "红灯停，绿灯行", subtitle: "Signal System", content: "亮起 ❌ 红灯，立即撤资，无论市场情绪如何。" }
        ]
      },
      stability: { title: "AXIOM 如何定义\"稳定\"？", tradTop: "传统评级关注的是：", tradBot: "\"资产端是否看起来足够安全？\"", axiomTop: "AXIOM 关注的是：", axiomBot: "\"市场能否承接真实规模的退出？\"", desc1: "因此，我们采用 ", desc2: "Liquidity-First", desc3: " 的分析框架。系统是动态实时的。", box1Title: "静态偿付能力", box1Bullets: ["抵押资产质量", "是否破产隔离", "法律可执行性"], box2Title: "动态流动性", box2Bullets: ["链上池子深度", "大额退出的滑点"], box3Title: "失败向量映射", box3Bullets: ["历史失败案例", "结构相似性惩罚", "机制脆弱度权重"], conclusion1: "结论是", conclusion2: "它在什么条件下会先死。" },
      grades: { title: "AXIOM 分区", featuresLabel: "特征", meaningLabel: "含义", items: [ { name: "Sovereign Grade", subtitle: "生存级", features: ["资产隔离清晰", "流动性最深"], meaning: "资金安全锚。" }, { name: "Yield Grade", subtitle: "收益级", features: ["偿付逻辑成立"], meaning: "博取收益，持续监控。" }, { name: "Critical Risk", subtitle: "生存警告", features: ["流动性断裂"], meaning: "这是赌场，随时归零。" } ] },
      notDo: { title: "AXIOM 不做什么", bullets: ["不收取费用", "不预测价格", "不推荐买卖", "不背书", "不用AAA制造幻觉"], footer1: "AXIOM 只做一件事：", footer2: "把系统生存假设暴露出来。" },
      position: { title: "我们的立场", desc1: "AXIOM 相信：", desc2: "真正的风险来自不知道自己在押什么。", desc3: "Web3 不缺收益工具，缺的是生存预警系统。", motto: "AXIOM — Building survival tools." },
      appendix: { title: "附录", p1: "稳定币是维持稳定价值的加密货币。", p2: "Axiom 旨在提供稳定性透明度。" }
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
  if (context === undefined) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}