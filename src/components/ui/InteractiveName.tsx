import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface InteractiveNameProps {
  isDark: boolean;
}

interface GeometricShape {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'rect' | 'circle' | 'triangle';
}

export function InteractiveName({ isDark }: InteractiveNameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [containerOffset, setContainerOffset] = useState({ x: 0, y: 0 });
  const [shapes, setShapes] = useState<GeometricShape[]>([]);

  useEffect(() => {
    // Generate random geometric shapes
    const generateShapes = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newShapes: GeometricShape[] = [];
      
      for (let i = 0; i < 12; i++) {
        const type = ['rect', 'circle', 'triangle'][Math.floor(Math.random() * 3)] as 'rect' | 'circle' | 'triangle';
        newShapes.push({
          id: i,
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          width: 40 + Math.random() * 60,
          height: 40 + Math.random() * 60,
          type,
        });
      }
      setShapes(newShapes);
    };

    generateShapes();
    window.addEventListener('resize', generateShapes);
    return () => window.removeEventListener('resize', generateShapes);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({ 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        });
      }
    };

    const updateContainerOffset = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerOffset({ x: rect.left, y: rect.top });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', updateContainerOffset);
    window.addEventListener('resize', updateContainerOffset);
    updateContainerOffset();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', updateContainerOffset);
      window.removeEventListener('resize', updateContainerOffset);
    };
  }, []);

  const letters = "SHAUN".split("");

  return (
    <div
      ref={containerRef}
      className={`relative py-32 px-6 overflow-hidden ${
        isDark ? 'bg-[#0a1929]' : 'bg-gradient-to-b from-slate-100 to-slate-200'
      }`}
    >
      {/* Fade gradient at the top */}
      <div 
        className={`absolute top-0 left-0 right-0 h-32 pointer-events-none z-20 ${
          isDark 
            ? 'bg-gradient-to-b from-black via-black/80 to-transparent' 
            : 'bg-gradient-to-b from-white via-white/80 to-transparent'
        }`}
      />

      {/* Cursor Coordinate Box */}
      <motion.div
        className={`fixed pointer-events-none z-50 ${
          isDark ? 'bg-zinc-800/80 border-zinc-600' : 'bg-white/80 border-zinc-300'
        } border backdrop-blur-sm px-3 py-2 text-xs font-mono`}
        style={{
          left: mousePosition.x + containerOffset.x + 20,
          top: mousePosition.y + containerOffset.y + 20,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {Math.round(mousePosition.x)}, {Math.round(mousePosition.y)}
      </motion.div>

      {/* Dotted lines following cursor */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      >
        <line
          x1={mousePosition.x}
          y1="0"
          x2={mousePosition.x}
          y2="100%"
          stroke={isDark ? '#4a5568' : '#94a3b8'}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1="0"
          y1={mousePosition.y}
          x2="100%"
          y2={mousePosition.y}
          stroke={isDark ? '#4a5568' : '#94a3b8'}
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Geometric shapes with connections */}
        {shapes.map((shape) => {
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - shape.x, 2) + 
            Math.pow(mousePosition.y - shape.y, 2)
          );
          const isNear = distance < 250;

          return (
            <g key={shape.id}>
              {/* Shape outline */}
              {shape.type === 'rect' && (
                <rect
                  x={shape.x - shape.width / 2}
                  y={shape.y - shape.height / 2}
                  width={shape.width}
                  height={shape.height}
                  fill="none"
                  stroke={isDark ? '#4a5568' : '#94a3b8'}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity={isNear ? 0.8 : 0.4}
                />
              )}
              {shape.type === 'circle' && (
                <circle
                  cx={shape.x}
                  cy={shape.y}
                  r={shape.width / 2}
                  fill="none"
                  stroke={isDark ? '#4a5568' : '#94a3b8'}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity={isNear ? 0.8 : 0.4}
                />
              )}
              {shape.type === 'triangle' && (
                <polygon
                  points={`${shape.x},${shape.y - shape.height / 2} ${shape.x - shape.width / 2},${shape.y + shape.height / 2} ${shape.x + shape.width / 2},${shape.y + shape.height / 2}`}
                  fill="none"
                  stroke={isDark ? '#4a5568' : '#94a3b8'}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity={isNear ? 0.8 : 0.4}
                />
              )}

              {/* Curved connection line to cursor when near */}
              {isNear && (
                <>
                  <path
                    d={`M ${shape.x} ${shape.y} Q ${(shape.x + mousePosition.x) / 2} ${(shape.y + mousePosition.y) / 2 - 50} ${mousePosition.x} ${mousePosition.y}`}
                    fill="none"
                    stroke={isDark ? '#60a5fa' : '#3b82f6'}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.5"
                  />
                  
                  {/* Coordinate label for shape */}
                  <text
                    x={shape.x}
                    y={shape.y + shape.height / 2 + 20}
                    fill={isDark ? '#94a3b8' : '#64748b'}
                    fontSize="11"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {Math.round(shape.x)}, {Math.round(shape.y)}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>

      <div className="w-full relative">
        <div className="flex justify-between items-center w-full px-4 md:px-8 lg:px-16">
          {letters.map((letter, index) => (
            <LetterWithOutline
              key={index}
              letter={letter}
              index={index}
              mousePosition={mousePosition}
              isDark={isDark}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={`mt-16 text-center text-xs md:text-sm font-mono tracking-widest uppercase ${
            isDark ? 'text-zinc-500' : 'text-zinc-600'
          }`}
        >
          Move your cursor around
        </motion.p>
      </div>
    </div>
  );
}

interface LetterWithOutlineProps {
  letter: string;
  index: number;
  mousePosition: { x: number; y: number };
  isDark: boolean;
}

function LetterWithOutline({ letter, index, mousePosition, isDark }: LetterWithOutlineProps) {
  const letterRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const updateBounds = () => {
      if (letterRef.current) {
        const rect = letterRef.current.getBoundingClientRect();
        const container = letterRef.current.closest('[class*="py-32"]');
        if (container) {
          const containerRect = container.getBoundingClientRect();
          setBounds({
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
            width: rect.width,
            height: rect.height,
          });
        }
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds);

    return () => {
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('scroll', updateBounds);
    };
  }, []);

  const distance = Math.sqrt(
    Math.pow(mousePosition.x - bounds.x, 2) + Math.pow(mousePosition.y - bounds.y, 2)
  );

  const maxDistance = 300;
  const proximity = Math.max(0, 1 - distance / maxDistance);
  const isNear = distance < maxDistance;

  // Calculate angle for gradient direction based on cursor position
  const angle = Math.atan2(mousePosition.y - bounds.y, mousePosition.x - bounds.x) * (180 / Math.PI);

  return (
    <motion.div
      ref={letterRef}
      initial={{ opacity: 0, y: 100, scale: 0.5, rotateX: -90 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="relative"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Connection line to cursor when near */}
      {isNear && proximity > 0.3 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            left: mousePosition.x - bounds.x,
            top: mousePosition.y - bounds.y,
            width: '200%',
            height: '200%',
          }}
        >
          <line
            x1={bounds.x}
            y1={bounds.y}
            x2={mousePosition.x}
            y2={mousePosition.y}
            stroke={isDark ? '#60a5fa' : '#3b82f6'}
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={proximity * 0.6}
          />
        </svg>
      )}

      {/* Dotted outline letter */}
      <div className="relative">
        {/* Base subtle outline */}
        <span
          className={`text-8xl md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-black select-none ${
            isDark ? 'text-transparent' : 'text-transparent'
          }`}
          style={{
            WebkitTextStroke: `1px ${isDark ? 'rgba(74, 85, 104, 0.15)' : 'rgba(71, 85, 105, 0.4)'}`,
            textStroke: `1px ${isDark ? 'rgba(74, 85, 104, 0.15)' : 'rgba(71, 85, 105, 0.4)'}`,
            paintOrder: 'stroke fill',
            transition: 'all 0.3s ease',
          }}
        >
          {letter}
        </span>
        
        {/* Activated glowing outline with gradient fill - only visible on hover */}
        <span
          className={`absolute inset-0 text-8xl md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-black select-none pointer-events-none`}
          style={{
            WebkitTextStroke: `2px ${isDark ? `rgba(96, 165, 250, ${proximity * 0.8})` : `rgba(59, 130, 246, ${proximity * 0.9})`}`,
            textStroke: `2px ${isDark ? `rgba(96, 165, 250, ${proximity * 0.8})` : `rgba(59, 130, 246, ${proximity * 0.9})`}`,
            background: isNear && proximity > 0.5
              ? isDark
                ? `linear-gradient(${angle}deg, rgba(96, 165, 250, ${proximity * 0.3}) 0%, rgba(59, 130, 246, ${proximity * 0.15}) 50%, transparent 100%)`
                : `linear-gradient(${angle}deg, rgba(59, 130, 246, ${proximity * 0.4}) 0%, rgba(96, 165, 250, ${proximity * 0.25}) 50%, rgba(37, 99, 235, ${proximity * 0.1}) 100%)`
              : 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            opacity: proximity,
            filter: isNear && proximity > 0.6 
              ? `drop-shadow(0 0 ${30 * proximity}px ${isDark ? 'rgba(96, 165, 250, 0.6)' : 'rgba(59, 130, 246, 0.7)'})`
              : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {letter}
        </span>

        {/* Geometric grid overlay on hover */}
        {isNear && proximity > 0.4 && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              opacity: isDark ? proximity * 0.3 : proximity * 0.4,
              mixBlendMode: 'overlay',
            }}
          >
            <defs>
              <pattern id={`grid-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke={isDark ? '#60a5fa' : '#3b82f6'}
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
          </svg>
        )}
      </div>
    </motion.div>
  );
}
