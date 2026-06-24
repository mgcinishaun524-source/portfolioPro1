import React from 'react';
import { motion } from 'framer-motion';

interface SkillBadgeProps {
  category: string;
  items: string[];
  isDark: boolean;
  index: number;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ category, items, isDark, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
        isDark 
          ? 'border-white/5 bg-white/5 hover:border-white/10' 
          : 'border-zinc-200 bg-white hover:shadow-lg hover:border-zinc-300'
      }`}
    >
      <div className="flex items-center space-x-3 mb-6">
        <span className={`h-px w-8 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`} />
        <h3 className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
          {category}
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {items.map((skill, i) => (
          <span
            key={i}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              isDark 
                ? 'bg-zinc-800/50 text-zinc-300 border border-white/5 hover:bg-zinc-800' 
                : 'bg-zinc-100 text-zinc-700 border border-zinc-200 hover:bg-zinc-200'
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
