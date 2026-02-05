import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, ArrowRight, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const copy = copyRef.current;
    const form = formRef.current;

    if (!section || !copy || !form) return;

    const ctx = gsap.context(() => {
      // Copy animation
      gsap.fromTo(copy,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: copy,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Form animation
      gsap.fromTo(form,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section 
      ref={sectionRef} 
      className="bg-navy-secondary py-[12vh] px-[7vw]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left - Closing Copy */}
          <div ref={copyRef}>
            <h2 
              className="text-primary-light font-bold mb-6"
              style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
            >
              Ready to see the risk?
            </h2>
            <p className="text-secondary-light text-[clamp(14px,1.1vw,16px)] leading-relaxed mb-8">
              Talk to our team and set up a demo tailored to your assets.
            </p>
            
            <div className="flex items-center gap-4 mb-8">
              <button className="btn-primary flex items-center gap-2">
                Request a demo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Email Contact */}
            <div className="glass-card p-5 inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-coral/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent-coral" />
              </div>
              <div>
                <p className="text-secondary-light text-xs mb-0.5">Email us</p>
                <a 
                  href="mailto:vivicui@gmail.com" 
                  className="text-primary-light font-mono text-sm hover:text-accent-coral transition-colors"
                >
                  vivicui@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div ref={formRef}>
            <div className="glass-panel p-6 md:p-8">
              <h3 className="text-primary-light font-semibold text-lg mb-6">
                Send us a message
              </h3>
              
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-emerald-500" />
                  </div>
                  <p className="text-primary-light font-medium">Message sent!</p>
                  <p className="text-secondary-light text-sm mt-2">
                    We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-secondary-light text-xs font-mono uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-primary-light text-sm focus:outline-none focus:border-accent-coral/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-secondary-light text-xs font-mono uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-primary-light text-sm focus:outline-none focus:border-accent-coral/50 transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-secondary-light text-xs font-mono uppercase tracking-wider mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-primary-light text-sm focus:outline-none focus:border-accent-coral/50 transition-colors"
                      placeholder="Your company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-secondary-light text-xs font-mono uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-primary-light text-sm focus:outline-none focus:border-accent-coral/50 transition-colors resize-none"
                      placeholder="Tell us about your needs..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2 mt-2"
                  >
                    Send message
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-primary-light font-bold text-xl tracking-tight">
                AXIOM
              </span>
            </div>
            
            <p className="text-secondary-light text-xs">
              © AXIOM Labs — All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-secondary-light text-xs hover:text-primary-light transition-colors">
                Privacy
              </a>
              <a href="#" className="text-secondary-light text-xs hover:text-primary-light transition-colors">
                Terms
              </a>
              <a href="#" className="text-secondary-light text-xs hover:text-primary-light transition-colors">
                API Status
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
