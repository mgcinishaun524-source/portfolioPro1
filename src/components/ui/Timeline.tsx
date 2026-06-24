import React from 'react';
import { motion } from 'framer-motion';

interface TimelineProps {
  experience: {
    title: string;
    company: string;
    date: string;
    description: string;
  }[];
  isDark: boolean;
}

export function Timeline({ experience, isDark }: TimelineProps) {
  return (
    <div className="relative border-l border-zinc-200 dark:border-zinc-800/50 ml-3 md:ml-6 py-6">
      {experience.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="mb-12 ml-8 md:ml-12 relative"
        >
          {/* Timeline Dot */}
          <span className={`absolute flex items-center justify-center w-4 h-4 rounded-full -left-[40px] md:-left-[56px] ring-4 ${
            isDark ? 'ring-[#030303] bg-zinc-700' : 'ring-[#fcfcfc] bg-zinc-300'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-zinc-400' : 'bg-zinc-600'}`} />
          </span>
          
          <div className="flex flex-col md:flex-row md:items-baseline md:space-x-4 mb-2">
            <h3 className={`text-xl font-display font-bold tracking-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
              {item.company}
            </h3>
            <span className={`text-xs font-mono tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
              {item.date}
            </span>
          </div>
          
          <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {item.title}
          </h4>
          
          <p className={`text-sm leading-relaxed max-w-2xl ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
