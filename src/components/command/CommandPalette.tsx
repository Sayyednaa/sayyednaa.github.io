import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, FolderGit2, Mail, ExternalLink, Moon, Sun, Download, Sparkles, User, Code, Layers } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const handleCustomOpen = () => setOpen(true);
    window.addEventListener('open-command-palette', handleCustomOpen);
    document.addEventListener('keydown', down);

    return () => {
      document.removeEventListener('keydown', down);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  const navigateTo = (url: string) => {
    setOpen(false);
    if (url.startsWith('http') || url.startsWith('mailto')) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  };

  const toggleTheme = () => {
    setOpen(false);
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <Command className="w-full text-slate-200">
          <div className="flex items-center px-4 border-b border-white/10">
            <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Search projects, sections, commands..."
              className="w-full h-14 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
            <kbd className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-400">ESC</kbd>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-3 space-y-1 text-sm">
            <Command.Empty className="py-6 text-center text-sm text-slate-500">
              No matching results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-xs font-semibold text-slate-500 uppercase px-2 py-1">
              <Command.Item
                onSelect={() => navigateTo('#home')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                <Sparkles className="w-4 h-4 text-accent-primary" />
                <span>Home / Overview</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo('#about')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                <User className="w-4 h-4 text-accent-primary" />
                <span>About Sayyed</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo('#skills')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                <Code className="w-4 h-4 text-accent-primary" />
                <span>Technical Arsenal</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo('#projects')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                <Layers className="w-4 h-4 text-accent-primary" />
                <span>Selected Works / Projects</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Projects" className="text-xs font-semibold text-slate-500 uppercase px-2 py-1 mt-2">
              <Command.Item
                onSelect={() => navigateTo('https://xuniquelabs.com')}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FolderGit2 className="w-4 h-4 text-cyan-400" />
                  <span>Xunique Labs</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo('https://ourhomeindia.com')}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FolderGit2 className="w-4 h-4 text-emerald-400" />
                  <span>OurHomeIndia</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo('https://mrnothing.in')}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FolderGit2 className="w-4 h-4 text-amber-400" />
                  <span>Mr.Nothing</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo('#projects')}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FolderGit2 className="w-4 h-4 text-purple-400" />
                  <span>Room Management App</span>
                </div>
                <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-slate-400">Mobile</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Preferences & Actions" className="text-xs font-semibold text-slate-500 uppercase px-2 py-1 mt-2">
              <Command.Item
                onSelect={toggleTheme}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Toggle Dark / Light Mode</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo('https://x.com/sayyednaa')}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-slate-300" />
                  <span>Follow on X (@sayyednaa)</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">x.com/sayyednaa</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo('https://instagram.com/sayyednaa')}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-pink-400" />
                  <span>Instagram (@sayyednaa)</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">instagram.com/sayyednaa</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo('mailto:sayyednawababdulali@gmail.com')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Send Email (sayyednawababdulali@gmail.com)</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="px-4 py-3 bg-slate-950/60 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span>Navigation:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">↓</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">↵</kbd>
            </span>
            <span>Sayyed Nawab Abdul Ali Portfolio</span>
          </div>
        </Command>
      </div>
    </div>
  );
};
