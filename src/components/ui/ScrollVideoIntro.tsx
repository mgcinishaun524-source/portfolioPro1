import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollVideoIntroProps {
  onComplete: () => void;
  videoSrc: string;
}

export function ScrollVideoIntro({ onComplete, videoSrc }: ScrollVideoIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Handle video loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      console.log('Video loaded successfully');
      setVideoLoaded(true);
    };

    const handleError = (e: Event) => {
      console.error('Video loading error:', e);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // Transform scroll progress to video time
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoLoaded) return;

    let rafId: number;
    
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Use requestAnimationFrame for smoother performance
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        if (video.duration && !isComplete) {
          // Map scroll progress (0-1) to video time (0-duration)
          const newTime = latest * video.duration;
          video.currentTime = newTime;

          // Check if video has reached the end
          if (latest >= 0.99) {
            setIsComplete(true);
            // Clean up immediately when complete
            setTimeout(() => {
              onComplete();
              // Pause and clear video to free memory
              video.pause();
              video.removeAttribute('src');
              video.load();
            }, 300);
          }
        }
      });
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      unsubscribe();
    };
  }, [scrollYProgress, onComplete, isComplete, videoLoaded]);

  // Fade out effect when complete
  const opacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full"
      style={{ 
        height: '500vh', // 5x viewport height for smooth scroll control
        opacity: isComplete ? 0 : 1,
      }}
    >
      {/* Sticky video container */}
      <motion.div 
        className="sticky top-0 left-0 w-full h-screen flex items-center justify-center bg-black overflow-hidden"
        style={{ opacity }}
      >
        {/* Loading indicator */}
        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/40 text-sm font-mono">Loading video...</div>
          </div>
        )}

        {/* Video element */}
        <video
          ref={videoRef}
          className="w-full h-full"
          preload="auto"
          playsInline
          muted
          crossOrigin="anonymous"
          style={{
            objectFit: 'contain',
            imageRendering: 'auto',
            WebkitTransform: 'translate3d(0,0,0)',
            transform: 'translate3d(0,0,0)',
            willChange: 'transform',
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Scroll indicator */}
        {videoLoaded && (
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="text-xs font-mono tracking-widest uppercase">Scroll to explore</p>
            <motion.div
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 bg-white/60 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
