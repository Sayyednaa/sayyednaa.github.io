import React, { useState } from 'react';
import { Mail, Send, Github, Linkedin, Instagram, CheckCircle2 } from 'lucide-react';
import { SITE_METADATA } from '../../lib/constants';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    try {
      // Free endpoint or mailto fallback
      const response = await fetch(`https://formspree.io/f/mqaeovbd`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Fallback open mail client
        window.location.href = `mailto:${SITE_METADATA.email}?subject=Project Enquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
        setStatus('success');
      }
    } catch {
      window.location.href = `mailto:${SITE_METADATA.email}?subject=Project Enquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
      setStatus('success');
    }
  };

  return (
    <section id="contact" class="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-primary">Get in Touch</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">Let's Connect</h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mt-3">
            Whether you have an inquiry, a potential project, or simply wish to connect, my inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Social Channels & Info */}
          <div className="md:col-span-2 rounded-3xl backdrop-blur-glass bg-surface-dark border border-glass-border-dark p-8 shadow-glass space-y-6">
            <h3 className="text-lg font-bold text-white">Direct Channels</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Feel free to reach out directly via email or check my work and profile across developer networks.
            </p>

            <div className="space-y-2.5">
              <a
                href={`mailto:${SITE_METADATA.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-all text-xs font-medium"
              >
                <Mail className="w-4 h-4 text-accent-primary shrink-0" />
                <span className="truncate">{SITE_METADATA.email}</span>
              </a>

              <a
                href={SITE_METADATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-all text-xs font-medium"
              >
                <Github className="w-4 h-4 text-slate-300 shrink-0" />
                <span>github.com/Sayyednaa</span>
              </a>

              <a
                href={SITE_METADATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-all text-xs font-medium"
              >
                <Linkedin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>linkedin.com/in/sayyednaa</span>
              </a>

              <a
                href={SITE_METADATA.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-all text-xs font-medium"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-200 shrink-0">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>x.com/sayyednaa</span>
              </a>

              <a
                href={SITE_METADATA.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-all text-xs font-medium"
              >
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <span>instagram.com/sayyednaa</span>
              </a>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="md:col-span-3 rounded-3xl backdrop-blur-glass bg-surface-dark border border-glass-border-dark p-8 shadow-glass">
            {status === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Message Dispatched!</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto">
                  Thank you for reaching out. I'll get back to your inquiry promptly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 rounded-xl text-xs font-bold uppercase bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-accent-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="yourname@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-accent-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or questions..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-accent-primary transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-accent-primary hover:bg-accent-primary/90 text-white shadow-glow transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
