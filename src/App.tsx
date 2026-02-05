import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import AIAssistant from './components/AIAssistant';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import MethodologySection from './sections/MethodologySection';

function HomePage() {
  return (
    <main className="relative z-10">
      <HeroSection />
      <MethodologySection />
      {/* 只要这个组件在，黑客松要求就达到了 */}
      <div className="max-w-7xl mx-auto px-[7vw] pb-20">
        <AIAssistant />
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <div className="relative bg-navy-primary min-h-screen">
        <LanguageSwitcher />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}