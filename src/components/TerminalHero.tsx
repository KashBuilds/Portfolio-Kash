import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronRight } from 'lucide-react';

interface TerminalHeroProps {
  onEmojiClick?: (emoji: string) => void;
  clickedEmojis?: string[];
}

const TerminalHero: React.FC<TerminalHeroProps> = () => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const commands = [
    { command: 'whoami', output: 'Kash - Full Stack Developer' },
    { command: 'ls skills/', output: 'React TypeScript Node.js Python AI/ML' },
    { command: 'cat passion.txt', output: 'Building innovative solutions with cutting-edge technology' },
    { command: 'git status', output: 'Always ready to commit to excellence' }
  ];

  useEffect(() => {
    const typeCommand = async () => {
      const current = commands[currentCommand];
      
      // Type the command
      for (let i = 0; i <= current.command.length; i++) {
        setDisplayText(`$ ${current.command.slice(0, i)}`);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Show output
      await new Promise(resolve => setTimeout(resolve, 500));
      setDisplayText(`$ ${current.command}\n${current.output}`);
      
      // Wait before next command
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Move to next command
      setCurrentCommand((prev) => (prev + 1) % commands.length);
    };

    typeCommand();
  }, [currentCommand]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl lg:text-7xl font-bold mb-6"
              >
                <span className="text-white">Hi, I'm </span>
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Kash
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed"
              >
                A passionate <span className="text-cyan-400 font-semibold">Full Stack Developer</span> who transforms ideas into elegant digital experiences using cutting-edge technologies.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25"
              >
                View My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition-all transform hover:scale-105"
              >
                Get In Touch
              </button>
            </motion.div>
          </motion.div>

          {/* Right side - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden">
              {/* Terminal header */}
              <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Terminal size={16} className="text-gray-400" />
                  <span className="text-gray-400 text-sm">kash@portfolio:~</span>
                </div>
              </div>

              {/* Terminal content */}
              <div className="p-6 h-64 font-mono text-sm">
                <div className="text-green-400">
                  <pre className="whitespace-pre-wrap">
                    {displayText}
                    {showCursor && <span className="text-white">|</span>}
                  </pre>
                </div>
              </div>
            </div>

            {/* Floating code snippets */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-purple-600 text-white px-3 py-1 rounded text-xs font-mono shadow-lg"
            >
              React.tsx
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-cyan-600 text-white px-3 py-1 rounded text-xs font-mono shadow-lg"
            >
              Node.js
            </motion.div>
          </motion.div>
        </div>
        </div>

      {/* Scroll indicator - moved outside .max-w-6xl */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronRight className="rotate-90" size={20} />
          </motion.div>
        </motion.div>
    </section>
  );
};

export default TerminalHero;