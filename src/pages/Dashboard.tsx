import { useState, useMemo } from 'react';
import { riskData } from '@/data/riskData';
import type { AssetData } from '@/data/riskData';
import AssetCard from '@/components/dashboard/AssetCard';
import DetailPanel from '@/components/dashboard/DetailPanel';
import { Search, Filter, BarChart3, TrendingUp, Shield, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const [selectedAsset, setSelectedAsset] = useState<AssetData | null>(null);
  const [comparisonAsset, setComparisonAsset] = useState<AssetData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRating, setFilterRating] = useState<string>('all');

  const filteredAssets = useMemo(() => {
    return riskData.filter(asset => {
      const matchesSearch = asset.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterRating === 'all' || 
                           (filterRating === 'low' && asset.total_score >= 85) ||
                           (filterRating === 'medium' && asset.total_score >= 60 && asset.total_score < 85) ||
                           (filterRating === 'high' && asset.total_score < 60);
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterRating]);

  const stats = useMemo(() => {
    const scores = riskData.map(a => a.total_score);
    return {
      avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      highest: Math.max(...scores),
      lowest: Math.min(...scores),
      count: riskData.length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-navy-primary pt-20 pb-12 px-4 md:px-[7vw]">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-8 h-8 text-accent-coral" />
          <h1 className="text-primary-light font-bold text-3xl md:text-4xl">
            稳定币风险评级仪表板
          </h1>
        </div>
        <p className="text-secondary-light max-w-2xl">
          基于多维度风险评估模型，实时监控主流稳定币的偿付能力、审计透明度、锚定稳定性等关键指标。
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-secondary-light" />
            <span className="text-secondary-light text-xs">平均风险评分</span>
          </div>
          <p className="text-primary-light font-bold text-2xl md:text-3xl">{stats.avgScore}</p>
        </div>
        <div className="glass-card p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-secondary-light text-xs">最高评分</span>
          </div>
          <p className="text-emerald-500 font-bold text-2xl md:text-3xl">{stats.highest}</p>
        </div>
        <div className="glass-card p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-secondary-light text-xs">最低评分</span>
          </div>
          <p className="text-red-500 font-bold text-2xl md:text-3xl">{stats.lowest}</p>
        </div>
        <div className="glass-card p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-secondary-light" />
            <span className="text-secondary-light text-xs">监控资产</span>
          </div>
          <p className="text-primary-light font-bold text-2xl md:text-3xl">{stats.count}</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-light" />
          <input
            type="text"
            placeholder="搜索资产 (如: USDC, USDT...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-primary-light placeholder:text-secondary-light/50 focus:outline-none focus:border-accent-coral/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-secondary-light" />
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-primary-light focus:outline-none focus:border-accent-coral/50"
          >
            <option value="all">全部风险等级</option>
            <option value="low">🟢 低风险 (85+)</option>
            <option value="medium">🟡 中等风险 (60-84)</option>
            <option value="high">🔴 高风险 (&lt;60)</option>
          </select>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredAssets.map((asset) => (
          <AssetCard
            key={asset.ticker}
            asset={asset}
            isSelected={selectedAsset?.ticker === asset.ticker}
            isComparison={comparisonAsset?.ticker === asset.ticker}
            onClick={() => setSelectedAsset(asset)}
          />
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-16">
          <p className="text-secondary-light">未找到匹配的资产</p>
        </div>
      )}

      {/* Detail Panel Modal */}
      {selectedAsset && (
        <DetailPanel
          asset={selectedAsset}
          comparisonAsset={comparisonAsset}
          onClose={() => {
            setSelectedAsset(null);
            setComparisonAsset(null);
          }}
          onSelectComparison={setComparisonAsset}
          allAssets={riskData}
        />
      )}

      {/* Legend */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <h3 className="text-primary-light font-semibold mb-4">风险等级说明</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1" />
            <div>
              <p className="text-primary-light font-medium">低风险 (85-100)</p>
              <p className="text-secondary-light text-sm">资产质量优良，建议持有并注意分散</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-500 mt-1" />
            <div>
              <p className="text-primary-light font-medium">中等风险 (60-84)</p>
              <p className="text-secondary-light text-sm">建议观察并设置持有上限，不做唯一底仓</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 mt-1" />
            <div>
              <p className="text-primary-light font-medium">高风险 (&lt;60)</p>
              <p className="text-secondary-light text-sm">风险较高，不建议作为底仓持有</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
