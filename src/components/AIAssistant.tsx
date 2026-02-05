import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // ⚠️ 关键：在这里粘贴你从 https://aistudio.google.com/ 申请的 Key
  const API_KEY = "在这里粘贴你的_GEMINI_API_KEY"; 
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleAsk = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const prompt = `As a crypto risk analyst for AXIOM Labs, evaluate the current risk profile of this asset: ${input}. Provide a short, professional summary.`;
      const response = await model.generateContent(prompt);
      setResult(response.response.text());
    } catch (error) {
      setResult("Error: Gemini API 连接失败，请检查 API Key 是否正确。");
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel p-8 my-10 border border-accent-coral/30 relative z-20">
      <h3 className="text-primary-light font-bold text-xl mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-accent-coral rounded-full animate-pulse"></span>
        Gemini AI Risk Analyst (Hackathon Edition)
      </h3>
      <div className="flex flex-col md:flex-row gap-4">
        <input 
          className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl text-primary-light focus:outline-none focus:border-accent-coral" 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter asset name (e.g. USDT, USDC, ETH)..."
        />
        <button 
          onClick={handleAsk} 
          disabled={loading}
          className="bg-accent-coral hover:bg-opacity-80 text-white font-bold px-8 py-3 rounded-xl disabled:opacity-50 transition-all"
        >
          {loading ? "Analyzing..." : "Analyze Risk"}
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-white/5 rounded-xl border-l-4 border-accent-coral">
          <p className="text-secondary-light text-sm leading-relaxed whitespace-pre-wrap">
            {result}
          </p>
        </div>
      )}
    </div>
  );
}