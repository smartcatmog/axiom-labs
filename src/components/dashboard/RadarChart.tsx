import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import type { AssetData } from '@/data/riskData';

interface RadarChartProps {
  asset: AssetData;
  comparisonAsset?: AssetData | null;
}

export default function RiskRadarChart({ asset, comparisonAsset }: RadarChartProps) {
  const data = Object.entries(asset.dimensions).map(([key, dim]) => ({
    dimension: dim.name,
    current: dim.score,
    max: dim.max,
    comparison: comparisonAsset ? comparisonAsset.dimensions[key as keyof typeof asset.dimensions].score : null,
  }));

  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="rgba(244, 246, 255, 0.1)" />
          <PolarAngleAxis 
            dataKey="dimension" 
            tick={{ fill: '#A7B0C8', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 20]} 
            tick={{ fill: '#A7B0C8', fontSize: 10 }}
            stroke="rgba(244, 246, 255, 0.1)"
          />
          <Radar
            name={asset.ticker}
            dataKey="current"
            stroke="#FF4D2E"
            strokeWidth={2}
            fill="#FF4D2E"
            fillOpacity={0.3}
          />
          {comparisonAsset && (
            <Radar
              name={comparisonAsset.ticker}
              dataKey="comparison"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="#3B82F6"
              fillOpacity={0.2}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
