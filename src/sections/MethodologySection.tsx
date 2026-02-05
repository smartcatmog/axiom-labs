import React from 'react';
import { AlertTriangle, Shield, Activity } from 'lucide-react';

export default function MethodologySection() {
  return (
    <section id="methodology" className="min-h-screen bg-navy-primary py-20 text-white px-[7vw]">
      <div className="max-w-7xl mx-auto">
        <span className="text-accent-coral font-mono text-sm uppercase tracking-widest block mb-4">Methodology</span>
        <h2 className="text-5xl font-bold mb-8">AXIOM Framework</h2>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="glass-panel p-8 border-l-4 border-accent-coral">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="text-accent-coral" /> 
              What we solve?
            </h3>
            <p className="text-secondary-light leading-relaxed">
              We solve the "Order of Death" in the crypto market. While traditional ratings focus on static assets, AXIOM focuses on real-time liquidity fractures and survival under extreme pressure.
            </p>
          </div>
          
          <div className="glass-panel p-8 border-l-4 border-emerald-500">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="text-emerald-500" /> 
              Survival First
            </h3>
            <p className="text-secondary-light leading-relaxed">
              Solvency does not equal Survivability. A project can be fully audited and still collapse in seconds if liquidity evaporates. AXIOM is your early warning system.
            </p>
          </div>
        </div>

        {/* 简单的三条法则 */}
        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-2xl flex gap-6 items-center">
            <div className="text-4xl font-black text-white/10 italic">01</div>
            <div>
              <h4 className="font-bold text-xl">Reject Bias</h4>
              <p className="text-secondary-light text-sm">We ignore APY. We only care about Max Drawdown.</p>
            </div>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl flex gap-6 items-center">
            <div className="text-4xl font-black text-white/10 italic">02</div>
            <div>
              <h4 className="font-bold text-xl">Structured Risk</h4>
              <p className="text-secondary-light text-sm">All risks are embedded in technical structures, not just market sentiment.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}