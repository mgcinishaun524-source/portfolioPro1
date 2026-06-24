import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Figma } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  figmaUrl?: string;
  isDark: boolean;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, githubUrl, demoUrl, figmaUrl, isDark, index }) => {
  if (!title) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group flex flex-col relative overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-2 ${
        isDark 
          ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]' 
          : 'border-zinc-200 bg-white/50 hover:bg-white hover:shadow-xl'
      } backdrop-blur-sm`}
    >
      <div className="relative aspect-[4/3] overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-zinc-900/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        <div className="flex items-center space-x-3 mb-3">
          <span className={`h-px w-8 ${isDark ? 'bg-zinc-600' : 'bg-zinc-300'}`} />
          <span className={`text-[10px] font-mono tracking-widest uppercase ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
            0{index + 1} // Project
          </span>
        </div>
        <h3 className={`text-xl font-display font-bold tracking-tight mb-3 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed mb-8 flex-grow ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {description}
        </p>
        
        <div className="flex flex-wrap items-center gap-3 mt-auto">
          {figmaUrl && (
            <a
              href={figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-lg border transition-all active:scale-95 flex-1 ${
                isDark 
                  ? 'border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/50' 
                  : 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 hover:border-purple-300'
              }`}
            >
              <Figma className="w-4 h-4" /> Figma
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-lg transition-all active:scale-95 flex-1 ${
                isDark 
                  ? 'bg-white text-black hover:bg-zinc-200' 
                  : 'bg-zinc-900 text-white hover:bg-zinc-800'
              }`}
            >
              <ExternalLink className="w-4 h-4" /> Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-lg border transition-all active:scale-95 flex-1 ${
                isDark 
                  ? 'border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 hover:bg-white/5' 
                  : 'border-zinc-300 text-zinc-700 hover:text-black hover:border-zinc-400 hover:bg-zinc-50'
              }`}
            >
              <Github className="w-4 h-4" /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
