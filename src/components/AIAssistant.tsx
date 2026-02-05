import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // ⚠️ 必须在这里填入 AIza 开头的真实 Key
  const API_KEY = "AIzaSyC0qN0r-5z6s4jgbRIeg5zMasMuX18Oo9I"; 

  const handleAsk = async () => {
    if (!input) return;
    if (API_KEY.includes("在这里")) {
        setResult("错误：你还没填入真实的 API Key！请去 Google AI Studio 申请。");
        return;
    }

    setLoading(true);
    setResult("");
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `As a crypto risk analyst for AXIOM Labs, evaluate the current risk profile of this asset: ${input}. Provide a short, professional summary.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
    } catch (error: any) {
      console.error(error);
      setResult("API 调用失败: " + (error.message || "请检查网络或 Key 是否有效"));
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
          placeholder="Enter asset name (e.g. BTC, ETH)..."
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
        <div className="mt-6 p-4 bg-white/5 rounded-xl border-l-4 border-accent-coral text-left">
          <p className="text-secondary-light text-sm leading-relaxed whitespace-pre-wrap">
            {result}
          </p>
        </div>
      )}
    </div>
  );
}