import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Download, Layers } from 'lucide-react';

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category: 'web' | 'mobile' | 'saas' | 'python';
  image: string;
  liveUrl?: string;
  downloadUrl?: string;
}

const CATEGORIES = [
  { label: 'All Projects', value: 'all' },
  { label: 'Web Applications', value: 'web' },
  { label: 'Mobile & Apps', value: 'mobile' },
  { label: 'SaaS & Platforms', value: 'saas' },
] as const;

export const ProjectsGrid: React.FC<{ projects: ProjectItem[] }> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
              activeCategory === cat.value
                ? 'bg-accent-primary text-white shadow-glow scale-105'
                : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Container */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="glass-card group relative flex flex-col rounded-3xl overflow-hidden backdrop-blur-glass bg-surface-dark border border-glass-border-dark hover:border-accent-primary/50 transition-all duration-500 hover:-translate-y-1.5 shadow-glass"
            >
              {/* Project Image Banner */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-950/80 border-b border-glass-border-dark flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Project Content */}
              <div className="flex flex-col flex-1 p-7">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-accent-primary border border-accent-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-accent-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-400 mb-8 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 text-white hover:bg-accent-primary transition-colors duration-200"
                    >
                      <span>Explore</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.downloadUrl && (
                    <a
                      href={project.downloadUrl}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 text-white hover:bg-accent-primary transition-colors duration-200"
                    >
                      <span>Download</span>
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
