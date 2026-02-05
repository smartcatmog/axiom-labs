import React from 'react';
import { Shield, Activity, AlertTriangle, ArrowUpRight } from 'lucide-react';

const mockAssets = [
  { name: 'USDT', score: 85, status: 'S-Grade', color: '#10b981' },
  { name: 'USDC', score: 92, status: 'S-Grade', color: '#10b981' },
  { name: 'DAI', score: 78, status: 'Y-Grade', color: '#f59e0b' },
  { name: 'PYUSD', score: 88, status: 'S-Grade', color: '#10b981' },
  { name: 'USDE', score: 45, status: 'C-Grade', color: '#ef4444' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-navy-primary text-white pt-24 px-[7vw] pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-primary-light">Risk Dashboard</h1>
            <p className="text-secondary-light">Real-time stability monitoring and survival metrics.</p>
          </div>
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-mono text-accent-coral">
            Last Update: LIVE
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-6 border-l-4 border-emerald-500">
            <div className="flex items-center gap-3 mb-4 text-emerald-500">
              <Shield className="w-5 h-5" />
              <span className="font-semibold uppercase text-xs tracking-wider">Avg Market Health</span>
            </div>
            <div className="text-3xl font-bold">82.4/100</div>
          </div>
          <div className="glass-panel p-6 border-l-4 border-amber-500">
            <div className="flex items-center gap-3 mb-4 text-amber-500">
              <Activity className="w-5 h-5" />
              <span className="font-semibold uppercase text-xs tracking-wider">Volitality Index</span>
            </div>
            <div className="text-3xl font-bold">12.5%</div>
          </div>
          <div className="glass-panel p-6 border-l-4 border-red-500">
            <div className="flex items-center gap-3 mb-4 text-red-500">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold uppercase text-xs tracking-wider">High Risk Alerts</span>
            </div>
            <div className="text-3xl font-bold">3 Assets</div>
          </div>
        </div>

        {/* Asset Table */}
        <div className="glass-panel overflow-hidden border border-white/10">
          <div className="p-6 border-b border-white/10 bg-white/5 font-semibold">
            Stability Ranking
          </div>
          <div className="divide-y divide-white/10">
            {mockAssets.map((asset) => (
              <div key={asset.name} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">
                    {asset.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{asset.name}</div>
                    <div className="text-xs text-secondary-light">Collateralized Stablecoin</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-12 text-right">
                  <div>
                    <div className="text-xs text-secondary-light uppercase mb-1">Score</div>
                    <div className="text-xl font-mono font-bold" style={{ color: asset.color }}>
                      {asset.score}
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-xs text-secondary-light uppercase mb-1">Grade</div>
                    <div className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-tighter">
                      {asset.status}
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}