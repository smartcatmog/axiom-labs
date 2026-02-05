import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // ⚠️ 确认你的 Key 还是那个以 AIza 开头的字符串
  const API_KEY = "AIzaSyC0qN0r-5z6s4jgbRIeg5zMasMuX18Oo9I"; 

  const handleAsk = async () => {
    if (!input) return;
    setLoading(true);
    setResult("");
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      // 改用 1.5-flash-latest，这在很多地区更稳定
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      
      const prompt = `As a crypto risk analyst for AXIOM Labs, evaluate this asset: ${input}. Provide a short summary.`;
      const request = await model.generateContent(prompt);
      const response = await request.response;
      setResult(response.text());
    } catch (error: any) {
      console.error(error);
      // 如果你在英国直接点，可能还是会报错，这是正常的
      setResult("API Error: " + error.message + "\n\n(Note: If you are in the UK/EU, please use a VPN set to USA to test this locally.)");
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel p-8 my-10 border border-accent-coral/30 relative z-20 text-left">
      <h3 className="text-primary-light font-bold text-xl mb-4">Gemini Risk Analyst</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <input 
          className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl text-primary-light" 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter asset (e.g. BTC)..."
        />
        <button onClick={handleAsk} disabled={loading} className="bg-accent-coral text-white font-bold px-8 py-3 rounded-xl">
          {loading ? "Thinking..." : "Analyze"}
        </button>
      </div>
      {result && <div className="mt-6 p-4 bg-white/5 rounded-xl border-l-4 border-accent-coral text-secondary-light text-sm whitespace-pre-wrap">{result}</div>}
    </div>
  );
}