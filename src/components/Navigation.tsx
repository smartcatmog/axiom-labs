import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart3 } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Methodology', href: '#methodology' },
  { label: 'Product', href: '#product' },
  { label: 'Engine', href: '#engine' },
  { label: 'Security', href: '#security' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isDashboard
            ? 'bg-[#070A12]/80 backdrop-blur-xl border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-[7vw] py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-primary-light font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
          >
            AXIOM
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {!isDashboard && navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-secondary-light text-sm hover:text-primary-light transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Dashboard Link + CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/dashboard"
              className={`flex items-center gap-2 text-sm transition-colors ${
                isDashboard ? 'text-accent-coral' : 'text-secondary-light hover:text-primary-light'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              仪表盘
            </Link>
            {!isDashboard && (
              <button 
                onClick={() => scrollToSection('#contact')}
                className="btn-primary text-sm py-2.5 px-5"
              >
                Request a demo
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-light p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-[#070A12]/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {!isDashboard && navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-primary-light text-2xl font-medium hover:text-accent-coral transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-2xl font-medium hover:text-accent-coral transition-colors ${
              isDashboard ? 'text-accent-coral' : 'text-primary-light'
            }`}
          >
            仪表盘
          </Link>
          {!isDashboard && (
            <button 
              onClick={() => scrollToSection('#contact')}
              className="btn-primary mt-4"
            >
              Request a demo
            </button>
          )}
        </div>
      </div>
    </>
  );
}
