import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Sun, Moon, Code, MapPin, Send } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { SpotlightHover } from "@/components/ui/spotlight-hover";

import { projects, skills, experience, testimonials, profileImage } from "@/data";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Timeline } from "@/components/ui/Timeline";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { TestimonialGrid } from "@/components/ui/TestimonialGrid";
import { InteractiveName } from "@/components/ui/InteractiveName";

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(!isDark);

  // Main website content
  return (
    <motion.div 
      className={`min-h-screen font-sans selection:bg-zinc-500/30 transition-colors duration-500 relative flex flex-col justify-between ${
        isDark ? "bg-[#030303] text-zinc-100" : "bg-[#fcfcfc] text-zinc-800"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Background radial gradient */}
      <div className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
        isDark 
          ? "bg-[radial-gradient(circle_at_center,_all-gradient-stops)] from-zinc-900/20 via-transparent to-transparent opacity-100" 
          : "bg-[radial-gradient(circle_at_center,_all-gradient-stops)] from-zinc-200/40 via-transparent to-transparent opacity-100"
      }`} />
      
      {/* Navigation Bar */}
      <header className="fixed top-0 w-full px-6 h-20 flex items-center justify-between z-50 backdrop-blur-md border-b border-white/5 bg-transparent">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${
              isDark ? "bg-zinc-900" : "bg-zinc-100"
            }`}>
              <Code className={`h-4.5 w-4.5 ${isDark ? "text-zinc-200" : "text-zinc-700"}`} />
            </div>
            <span className={`font-display font-semibold tracking-tight text-sm uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>
              Mgcini Shaun <span className="text-zinc-500 font-normal">Moyo</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-[10px] font-bold uppercase tracking-[0.3em]">
            {["About", "Projects", "Skills", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`transition-colors duration-200 ${
                  isDark ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {link}
              </a>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 active:scale-95 flex items-center justify-center ${
              isDark 
                ? "bg-zinc-900 text-yellow-400 hover:bg-zinc-800" 
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
            aria-label="Toggle visual mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="w-full min-h-screen flex items-center justify-center relative z-10 pt-20">
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col justify-between py-2 space-y-8"
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] sm:text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase block">
                  Senior Systems Architect // Full-Stack Engineer
                </span>
                <h1 className={`text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.9] uppercase transition-all duration-300 ${
                  isDark 
                    ? "bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500" 
                    : "text-zinc-900"
                }`}>
                  Mgcini<br/>Shaun
                </h1>
              </div>
              
              <p className={`text-sm sm:text-base leading-relaxed max-w-md font-sans transition-colors duration-300 border-l-2 pl-4 ${
                isDark ? "text-zinc-400 border-zinc-700" : "text-zinc-600 border-zinc-300"
              }`}>
                Crafting elegant full-stack solutions, creative digital experiences, and modular backend code bases with precision and modern design-forward standards.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#projects"
                  className={`inline-flex items-center space-x-2 font-black text-[10px] sm:text-xs px-8 py-4 uppercase tracking-[0.3em] transition-all active:scale-95 ${
                    isDark 
                      ? "bg-white hover:bg-zinc-200 text-black" 
                      : "bg-zinc-900 hover:bg-zinc-800 text-white"
                  }`}
                >
                  <span>Access Projects</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a 
                  href="#contact"
                  className={`inline-flex items-center space-x-2 font-black text-[10px] sm:text-xs px-8 py-4 uppercase tracking-[0.3em] border transition-all active:scale-95 ${
                    isDark 
                      ? "border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-white" 
                      : "border-zinc-300 hover:bg-zinc-100 text-zinc-700"
                  }`}
                >
                  <span>Initiate Contact</span>
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-6 relative h-[400px] sm:h-[500px] lg:h-[600px] w-full"
          >
            <Spotlight className="-top-20 left-0 md:left-20" fill={isDark ? "white" : "#94a3b8"} />
            <SpotlightHover className={isDark ? "from-zinc-100/10 via-zinc-200/5 to-transparent" : "from-zinc-550/5 via-zinc-400/5 to-transparent"} size={380} />

            <div className="w-full h-full absolute inset-0 rounded-2xl overflow-hidden">
              <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full pointer-events-auto" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-40 px-6 relative z-10 border-b border-zinc-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl group"
          >
            <img src={profileImage} alt="Mgcini Shaun Moyo" className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className={`h-[1px] w-16 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`}></div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>01 // About Me</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none">The Vision.</h2>
            <p className={`text-base leading-relaxed mb-12 border-l-2 pl-8 ${isDark ? 'text-zinc-400 border-zinc-800' : 'text-zinc-600 border-zinc-200'}`}>
              I am a Full-Stack Software Engineer specializing in advanced digital development, dedicated to building robust, offline-first infrastructures and automated platform solutions. My approach bridges technical excellence with high-performance execution, transforming complex compliance, logic, and data challenges into seamless, high-contrast digital experiences.
            </p>
            <div className={`grid grid-cols-2 gap-16 border-t pt-12 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <div>
                <h4 className="text-4xl font-black mb-2">50+</h4>
                <p className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Projects Completed</p>
              </div>
              <div>
                <h4 className="text-4xl font-black mb-2">3+</h4>
                <p className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Years Experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 md:py-40 px-6 relative z-10 border-b border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className={`h-[1px] w-16 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`}></div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>02 // Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Selected Works.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => p.title).map((project, idx) => (
              <ProjectCard
                key={idx}
                title={project.title}
                description={project.description}
                image={project.image}
                githubUrl={project.githubUrl}
                demoUrl={project.demoUrl}
                figmaUrl={project.figmaUrl}
                isDark={isDark}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 md:py-40 px-6 relative z-10 border-b border-zinc-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className={`h-[1px] w-12 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`}></div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>03 // Expertise</span>
              <div className={`h-[1px] w-12 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`}></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Technical Skills.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, idx) => (
              <SkillBadge
                key={idx}
                category={skillGroup.category}
                items={skillGroup.items}
                isDark={isDark}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 md:py-40 px-6 relative z-10 border-b border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-black/50">
        <div className="max-w-3xl mx-auto">
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-[1px] w-12 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`}></div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>04 // Journey</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Experience.</h2>
          </div>
          <Timeline experience={experience} isDark={isDark} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 md:py-40 px-6 relative z-10 border-b border-zinc-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className={`h-[1px] w-12 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`}></div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>05 // Feedback</span>
              <div className={`h-[1px] w-12 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`}></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Client & Colleague.</h2>
          </div>
          <TestimonialGrid testimonials={testimonials} isDark={isDark} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-40 px-6 relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: isDark ? 0.25 : 0.15,
              mixBlendMode: isDark ? 'screen' : 'multiply',
            }}
          >
            <source src="/12778064_3840_2160_30fps.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlay for readability */}
          <div 
            className={`absolute inset-0 ${
              isDark 
                ? 'bg-gradient-to-b from-black/40 via-black/60 to-black/80' 
                : 'bg-gradient-to-b from-white/40 via-white/60 to-white/80'
            }`}
          />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-[1px] w-12 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`}></div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>06 // Contact</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">Let's Connect.</h2>
            <p className={`mb-16 leading-relaxed max-w-md ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Interested in collaborating or have a project in mind? Reach out and let's build something exceptional together.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all ${isDark ? 'bg-white/5 border-white/10 group-hover:border-white/30' : 'bg-zinc-50 border-zinc-200 group-hover:border-zinc-400'}`}>
                  <Mail className={`w-5 h-5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`} />
                </div>
                <div>
                  <p className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Email</p>
                  <p className={`font-semibold transition-colors ${isDark ? 'group-hover:text-white' : 'group-hover:text-black'}`}>mgcinishaun524@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all ${isDark ? 'bg-white/5 border-white/10 group-hover:border-white/30' : 'bg-zinc-50 border-zinc-200 group-hover:border-zinc-400'}`}>
                  <MapPin className={`w-5 h-5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`} />
                </div>
                <div>
                  <p className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Location</p>
                  <p className={`font-semibold transition-colors ${isDark ? 'group-hover:text-white' : 'group-hover:text-black'}`}>Remote // Global</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-8 md:p-12 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10 backdrop-blur-md' : 'bg-white border-zinc-200 shadow-xl'}`}
          >
            <form className="space-y-8" action="https://formsubmit.co/mgcinishaun524@gmail.com" method="POST">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className={`text-[9px] font-bold uppercase tracking-[0.3em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Name</label>
                  <input type="text" name="name" required className={`w-full p-4 text-sm focus:outline-none transition-all border-b ${isDark ? 'bg-transparent border-zinc-700 focus:border-white text-white' : 'bg-transparent border-zinc-300 focus:border-black text-black'}`} placeholder="Your Name" />
                </div>
                <div className="space-y-3">
                  <label className={`text-[9px] font-bold uppercase tracking-[0.3em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Email</label>
                  <input type="email" name="email" required className={`w-full p-4 text-sm focus:outline-none transition-all border-b ${isDark ? 'bg-transparent border-zinc-700 focus:border-white text-white' : 'bg-transparent border-zinc-300 focus:border-black text-black'}`} placeholder="email@address.com" />
                </div>
              </div>
              <div className="space-y-3">
                <label className={`text-[9px] font-bold uppercase tracking-[0.3em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Message</label>
                <textarea name="message" required rows={4} className={`w-full p-4 text-sm focus:outline-none transition-all border-b resize-none ${isDark ? 'bg-transparent border-zinc-700 focus:border-white text-white' : 'bg-transparent border-zinc-300 focus:border-black text-black'}`} placeholder="How can I help you?"></textarea>
              </div>
              <button type="submit" className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-4 hover:-translate-y-1 ${isDark ? 'bg-white text-black hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-black text-white hover:bg-zinc-800 hover:shadow-xl'}`}>
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative py-12 px-6 border-t z-10 overflow-hidden ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: isDark ? 0.15 : 0.1,
              mixBlendMode: isDark ? 'screen' : 'multiply',
            }}
          >
            <source src="/PixVerse_V6_Image_Text_540P_30Second_Video_Pro (1).mp4" type="video/mp4" />
            {/* Fallback background */}
          </video>
          {/* Gradient overlay */}
          <div 
            className={`absolute inset-0 ${
              isDark 
                ? 'bg-gradient-to-t from-black via-black/80 to-black/60' 
                : 'bg-gradient-to-t from-white via-white/80 to-white/60'
            }`}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2.5">
            <span className="font-display font-black tracking-tight text-xl uppercase">
              Mgcini Shaun
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-[0.3em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
              © {new Date().getFullYear()}
            </span>
          </div>
          
          <div className="flex gap-6">
            <a href="https://github.com/mgcinishaun524-source" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-black'}`}>
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className={`transition-colors ${isDark ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-black'}`}>
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Name */}
      <InteractiveName isDark={isDark} />
    </motion.div>
  );
}
