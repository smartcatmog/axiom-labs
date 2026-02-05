import type { AssetData } from '@/data/riskData';
import { getRiskColor } from '@/data/riskData';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface AssetCardProps {
  asset: AssetData;
  isSelected: boolean;
  onClick: () => void;
  isComparison?: boolean;
}

export default function AssetCard({ asset, isSelected, onClick, isComparison }: AssetCardProps) {
  const scoreColor = getRiskColor(asset.total_score);
  
  const getActionIcon = () => {
    if (asset.action.includes('🟢')) return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    if (asset.action.includes('🟡')) return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    return <AlertTriangle className="w-4 h-4 text-red-500" />;
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative p-4 md:p-5 rounded-2xl cursor-pointer transition-all duration-300
        ${isSelected 
          ? 'bg-white/10 border-2 border-accent-coral' 
          : isComparison
            ? 'bg-white/5 border-2 border-blue-500/50'
            : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
        }
      `}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-coral rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">✓</span>
        </div>
      )}
      {isComparison && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">vs</span>
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-primary-light font-bold text-xl">{asset.ticker}</h3>
          <p className="text-secondary-light text-xs">{asset.slug}</p>
        </div>
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${scoreColor}20` }}
        >
          <span className="font-bold text-lg" style={{ color: scoreColor }}>
            {asset.total_score}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-secondary-light">类型</span>
          <span className="text-primary-light font-mono text-xs">{asset.category}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-secondary-light">牌照</span>
          <span className="text-primary-light font-mono text-xs truncate max-w-[120px]">{asset.license}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-white/10">
        {getActionIcon()}
        <span className="text-secondary-light text-xs truncate">{asset.action.replace(/[🟢🟡🔴]/g, '').trim()}</span>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-secondary-light" />
          <span className="text-secondary-light text-xs">收益率</span>
        </div>
        <span className="text-accent-coral font-mono text-sm">{asset.defi_yield}</span>
      </div>
    </div>
  );
}
