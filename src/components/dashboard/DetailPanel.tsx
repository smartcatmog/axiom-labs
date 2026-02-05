import type { AssetData } from '@/data/riskData';
import { getRiskColor } from '@/data/riskData';
import RiskRadarChart from './RadarChart';
import { X, Wallet, Scale, FileCheck, Shield, Droplets, Cpu, Percent, AlertCircle, TrendingUp } from 'lucide-react';

interface DetailPanelProps {
  asset: AssetData;
  comparisonAsset: AssetData | null;
  onClose: () => void;
  onSelectComparison: (asset: AssetData | null) => void;
  allAssets: AssetData[];
}

export default function DetailPanel({ 
  asset, 
  comparisonAsset, 
  onClose, 
  onSelectComparison,
  allAssets 
}: DetailPanelProps) {
  const scoreColor = getRiskColor(asset.total_score);

  const dimensionIcons: Record<string, React.ElementType> = {
    '偿付能力': Wallet,
    '审计透明度': FileCheck,
    '锚定稳定性': Scale,
    '法律合规': Shield,
    '流动性深度': Droplets,
    '协议依赖': Cpu,
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-5xl max-h-[90vh] overflow-auto rounded-3xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#0B0F1C]/90 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${scoreColor}20` }}
            >
              <span className="font-bold text-2xl" style={{ color: scoreColor }}>
                {asset.total_score}
              </span>
            </div>
            <div>
              <h2 className="text-primary-light font-bold text-2xl">{asset.ticker}</h2>
              <p className="text-secondary-light text-sm">{asset.risk_rating}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Comparison selector */}
            <select
              value={comparisonAsset?.ticker || ''}
              onChange={(e) => {
                const selected = allAssets.find(a => a.ticker === e.target.value);
                onSelectComparison(selected || null);
              }}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-primary-light text-sm focus:outline-none focus:border-accent-coral/50"
            >
              <option value="">对比选择...</option>
              {allAssets.filter(a => a.ticker !== asset.ticker).map(a => (
                <option key={a.ticker} value={a.ticker}>{a.ticker}</option>
              ))}
            </select>
            
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-secondary-light" />
            </button>
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-8">
          {/* Left: Radar Chart */}
          <div>
            <h3 className="text-primary-light font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-accent-coral" />
              风险维度分析
            </h3>
            <RiskRadarChart asset={asset} comparisonAsset={comparisonAsset} />
            
            {comparisonAsset && (
              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-accent-coral/30 border border-accent-coral" />
                  <span className="text-primary-light text-sm">{asset.ticker}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-500/30 border border-blue-500" />
                  <span className="text-primary-light text-sm">{comparisonAsset.ticker}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Dimension Scores */}
          <div>
            <h3 className="text-primary-light font-semibold mb-4">详细评分</h3>
            <div className="space-y-3">
              {Object.entries(asset.dimensions).map(([key, dim]) => {
                const Icon = dimensionIcons[dim.name] || Shield;
                const percentage = (dim.score / dim.max) * 100;
                const comparisonScore = comparisonAsset?.dimensions[key as keyof typeof asset.dimensions]?.score;
                
                return (
                  <div key={key} className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-coral/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-accent-coral" />
                        </div>
                        <div>
                          <p className="text-primary-light text-sm font-medium">{dim.name}</p>
                          <p className="text-secondary-light text-xs">权重 {(dim.weight * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-primary-light font-mono font-bold">{dim.score}/{dim.max}</span>
                        {comparisonScore !== undefined && (
                          <span className={`font-mono text-sm ${comparisonScore > dim.score ? 'text-blue-400' : 'text-secondary-light'}`}>
                            vs {comparisonScore}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-accent-coral to-orange-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom: Key Metrics */}
        <div className="p-6 border-t border-white/10">
          <h3 className="text-primary-light font-semibold mb-4">关键指标</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="w-4 h-4 text-secondary-light" />
                <span className="text-secondary-light text-xs">现金缓冲</span>
              </div>
              <p className="text-primary-light font-mono text-lg">{asset.cash_buffer}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-4 h-4 text-secondary-light" />
                <span className="text-secondary-light text-xs">流动性错配</span>
              </div>
              <p className="text-primary-light font-mono text-lg">{asset.liquidity_mismatch}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-secondary-light" />
                <span className="text-secondary-light text-xs">DeFi 收益率</span>
              </div>
              <p className="text-accent-coral font-mono text-lg">{asset.defi_yield}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-secondary-light" />
                <span className="text-secondary-light text-xs">风险等级</span>
              </div>
              <p className="text-primary-light font-mono text-lg">{asset.cap_level}</p>
            </div>
          </div>
        </div>

        {/* Action & Comment */}
        <div className="p-6 border-t border-white/10 bg-white/5">
          <div className="flex items-start gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-accent-coral flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-primary-light font-medium">{asset.action}</p>
            </div>
          </div>
          <p className="text-secondary-light text-sm ml-8">{asset.yield_comment}</p>
        </div>
      </div>
    </div>
  );
}
