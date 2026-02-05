import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // ⚠️ 确保填入你那个以 ...VDFc 结尾的 Key
  const API_KEY = "AIzaSyCLvSK5aB-u91zuzUM-u7pUsnwSjPIVDFc"; 

  const handleAsk = async () => {
    if (!input) return;
    setLoading(true);
    setResult("");
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      
      // 【关键更新】：改用最新的 gemini-2.0-flash 
      // 这个模型目前在 Google AI Studio 是最新开放的
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      
      const prompt = `As a crypto risk analyst for AXIOM Labs, evaluate this asset: ${input}. Provide a short, professional summary.`;
      
      const request = await model.generateContent(prompt);
      const response = await request.response;
      const text = response.text();
      setResult(text);
    } catch (error: any) {
      console.error(error);
      // 增加针对区域限制的友好提示
      let errorMsg = error.message;
      if (errorMsg.includes("404") || errorMsg.includes("location")) {
          errorMsg = "Google API 区域限制：由于您在英国/欧盟，Gemini 免费版可能返回 404。请开启美国 VPN 后再点此按钮测试。";
      }
      setResult("API 状态: " + errorMsg);
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel p-8 my-10 border border-accent-coral/30 relative z-20 text-left">
      <h3 className="text-primary-light font-bold text-xl mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        Gemini 2.0 Risk Analyst
      </h3>
      <div className="flex flex-col md:flex-row gap-4">
        <input 
          className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl text-primary-light focus:outline-none focus:border-accent-coral" 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter asset (e.g. BTC, ETH, USDT)..."
        />
        <button 
          onClick={handleAsk} 
          disabled={loading}
          className="bg-accent-coral hover:bg-opacity-80 text-white font-bold px-8 py-3 rounded-xl disabled:opacity-50 transition-all"
        >
          {loading ? "AI is Thinking..." : "Analyze with Gemini 2.0"}
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-white/5 rounded-xl border-l-4 border-emerald-500">
          <p className="text-secondary-light text-sm leading-relaxed whitespace-pre-wrap">
            {result}
          </p>
        </div>
      )}
    </div>
  );
}