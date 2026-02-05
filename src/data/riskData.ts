export interface Dimension {
  score: number;
  max: number;
  name: string;
  weight: number;
}

export interface AssetData {
  ticker: string;
  slug: string;
  category: string;
  license: string;
  total_score: number;
  risk_rating: string;
  cap_level: number;
  risk_free_rate: string;
  defi_yield: string;
  action: string;
  yield_comment: string;
  dimensions: {
    D1_Solvency: Dimension;
    D2_Audit: Dimension;
    D3_Peg: Dimension;
    D4_Legal: Dimension;
    D5_Liquidity: Dimension;
    D6_ProtocolDependency: Dimension;
  };
  cash_buffer: string;
  liquidity_mismatch: number;
}

export const riskData: AssetData[] = [
  {
    ticker: "USDC",
    slug: "usd-coin",
    category: "Regulated_Federal",
    license: "US_OCC_Charter_Cond",
    total_score: 96,
    risk_rating: "A2_Transparent",
    cap_level: 1,
    risk_free_rate: "3.70%",
    defi_yield: "3.41%",
    action: "🟢 可持有（注意分散）",
    yield_comment: "机会成本：该场景收益低于无风险利率（收益不代表币更安全）",
    dimensions: {
      D1_Solvency: { score: 20, max: 20, name: "偿付能力", weight: 0.3792851933 },
      D2_Audit: { score: 20, max: 20, name: "审计透明度", weight: 0.1400437637 },
      D3_Peg: { score: 18, max: 20, name: "锚定稳定性", weight: 0.1021152443 },
      D4_Legal: { score: 20, max: 20, name: "法律合规", weight: 0.1750547046 },
      D5_Liquidity: { score: 18, max: 20, name: "流动性深度", weight: 0.1400437637 },
      D6_ProtocolDependency: { score: 19, max: 20, name: "协议依赖", weight: 0.06 },
    },
    cash_buffer: "21%",
    liquidity_mismatch: 20.0,
  },
  {
    ticker: "PYUSD",
    slug: "paypal-usd",
    category: "Regulated_State",
    license: "US_NYDFS_Trust",
    total_score: 86,
    risk_rating: "A2_Transparent",
    cap_level: 3,
    risk_free_rate: "3.70%",
    defi_yield: "1.98%",
    action: "🟢 可持有（注意分散）",
    yield_comment: "机会成本：该场景收益低于无风险利率（收益不代表币更安全）",
    dimensions: {
      D1_Solvency: { score: 20, max: 20, name: "偿付能力", weight: 0.3792851933 },
      D2_Audit: { score: 18, max: 20, name: "审计透明度", weight: 0.1400437637 },
      D3_Peg: { score: 15, max: 20, name: "锚定稳定性", weight: 0.1021152443 },
      D4_Legal: { score: 19, max: 20, name: "法律合规", weight: 0.1750547046 },
      D5_Liquidity: { score: 10, max: 20, name: "流动性深度", weight: 0.1400437637 },
      D6_ProtocolDependency: { score: 20, max: 20, name: "协议依赖", weight: 0.06 },
    },
    cash_buffer: "15%",
    liquidity_mismatch: 18.0,
  },
  {
    ticker: "USDT",
    slug: "tether",
    category: "Offshore_Grey",
    license: "Offshore_BVI",
    total_score: 74,
    risk_rating: "B1_Watch",
    cap_level: 4,
    risk_free_rate: "3.70%",
    defi_yield: "3.33%",
    action: "🟡 观察/限额（不做唯一底仓）",
    yield_comment: "机会成本：该场景收益低于无风险利率（收益不代表币更安全）",
    dimensions: {
      D1_Solvency: { score: 14, max: 20, name: "偿付能力", weight: 0.3792851933 },
      D2_Audit: { score: 10, max: 20, name: "审计透明度", weight: 0.1400437637 },
      D3_Peg: { score: 18, max: 20, name: "锚定稳定性", weight: 0.1021152443 },
      D4_Legal: { score: 5, max: 20, name: "法律合规", weight: 0.1750547046 },
      D5_Liquidity: { score: 20, max: 20, name: "流动性深度", weight: 0.1400437637 },
      D6_ProtocolDependency: { score: 15, max: 20, name: "协议依赖", weight: 0.06 },
    },
    cash_buffer: "3%",
    liquidity_mismatch: 0.0,
  },
  {
    ticker: "DAI",
    slug: "dai",
    category: "Crypto_Collateralized",
    license: "OnChain_DAO",
    total_score: 74,
    risk_rating: "B1_Watch",
    cap_level: 3,
    risk_free_rate: "3.70%",
    defi_yield: "4.60%",
    action: "🟡 观察/限额（不做唯一底仓）",
    yield_comment: "收益高于无风险利率（注意：收益来自场景/策略，不代表币本体更安全）",
    dimensions: {
      D1_Solvency: { score: 15, max: 20, name: "偿付能力", weight: 0.3792851933 },
      D2_Audit: { score: 18, max: 20, name: "审计透明度", weight: 0.1400437637 },
      D3_Peg: { score: 16, max: 20, name: "锚定稳定性", weight: 0.1021152443 },
      D4_Legal: { score: 12, max: 20, name: "法律合规", weight: 0.1750547046 },
      D5_Liquidity: { score: 12, max: 20, name: "流动性深度", weight: 0.1400437637 },
      D6_ProtocolDependency: { score: 12, max: 20, name: "协议依赖", weight: 0.06 },
    },
    cash_buffer: "11%",
    liquidity_mismatch: 18.0,
  },
  {
    ticker: "USDe",
    slug: "ethena-usde",
    category: "Delta_Neutral",
    license: "None_Structured",
    total_score: 34,
    risk_rating: "C_HighRisk",
    cap_level: 4,
    risk_free_rate: "3.70%",
    defi_yield: "22.00%",
    action: "🔴 高风险（不做底仓）",
    yield_comment: "收益高于无风险利率（注意：收益来自场景/策略，不代表币本体更安全）",
    dimensions: {
      D1_Solvency: { score: 10, max: 20, name: "偿付能力", weight: 0.3792851933 },
      D2_Audit: { score: 12, max: 20, name: "审计透明度", weight: 0.1400437637 },
      D3_Peg: { score: 15, max: 20, name: "锚定稳定性", weight: 0.1021152443 },
      D4_Legal: { score: 10, max: 20, name: "法律合规", weight: 0.1750547046 },
      D5_Liquidity: { score: 15, max: 20, name: "流动性深度", weight: 0.1400437637 },
      D6_ProtocolDependency: { score: 12, max: 20, name: "协议依赖", weight: 0.06 },
    },
    cash_buffer: "3%",
    liquidity_mismatch: 0.0,
  },
];

export const getRiskColor = (score: number): string => {
  if (score >= 85) return "#10B981"; // emerald-500 - 绿色
  if (score >= 60) return "#F59E0B"; // amber-500 - 黄色
  return "#EF4444"; // red-500 - 红色
};

export const getRiskLevel = (score: number): string => {
  if (score >= 85) return "低风险";
  if (score >= 60) return "中等风险";
  return "高风险";
};

export const dimensionWeights = {
  D1_Solvency: 0.3792851933,
  D2_Audit: 0.1400437637,
  D3_Peg: 0.1021152443,
  D4_Legal: 0.1750547046,
  D5_Liquidity: 0.1400437637,
  D6_ProtocolDependency: 0.06,
};
