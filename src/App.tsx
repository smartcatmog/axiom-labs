import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import MethodologySection from './sections/MethodologySection';
import ScoreExplainedSection from './sections/ScoreExplainedSection';
import MarketSnapshotSection from './sections/MarketSnapshotSection';
import EngineSection from './sections/EngineSection';
import InstitutionsSection from './sections/InstitutionsSection';
import SecuritySection from './sections/SecuritySection';
import ContactSection from './sections/ContactSection';
import Dashboard from './pages/Dashboard';

function HomePage() {
  return (
    <main className="relative z-10">
      <HeroSection />
      <AboutSection />
      <MethodologySection />
      <ScoreExplainedSection />
      <MarketSnapshotSection />
      <EngineSection />
      <InstitutionsSection />
      <SecuritySection />
      <ContactSection />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <div className="relative bg-navy-primary min-h-screen">
        <LanguageSwitcher />
        <div className="grain-overlay" />
        <div className="vignette" />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}