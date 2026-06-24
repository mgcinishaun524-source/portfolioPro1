import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
}

interface TestimonialGridProps {
  testimonials: Testimonial[];
  isDark: boolean;
}

export function TestimonialGrid({ testimonials, isDark }: TestimonialGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`p-8 rounded-2xl flex flex-col justify-between border transition-all duration-300 ${
            isDark 
              ? 'bg-zinc-900/50 border-white/5 hover:border-white/10 hover:bg-zinc-900' 
              : 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-lg'
          }`}
        >
          <div className="mb-8">
            <svg 
              className={`w-8 h-8 mb-6 opacity-20 ${isDark ? 'text-white' : 'text-zinc-900'}`} 
              fill="currentColor" 
              viewBox="0 0 32 32" 
              aria-hidden="true"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className={`text-sm leading-relaxed italic ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
              "{testimonial.content}"
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-lg ${
              isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'
            }`}>
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <h4 className={`text-sm font-bold tracking-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                {testimonial.name}
              </h4>
              <p className={`text-[10px] font-mono tracking-widest uppercase ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                {testimonial.role} // {testimonial.company}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
