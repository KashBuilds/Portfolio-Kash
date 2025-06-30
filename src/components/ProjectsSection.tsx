import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { useLocation } from 'react-router-dom';

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      id: 'gramchain',
      title: 'GramChain',
      why: 'Instagram meets blockchain - because social should be onchain',
      tags: ['Solana', 'React', 'Web3', 'Social'],
      codeUrl: 'https://github.com/KashBuilds/Gramchain-Kash',
      easterEgg: 'Posts don\'t just disappear - they live forever onchain.',
      gradient: 'from-pink-500/20 to-purple-600/20'
    },
    {
      id: 'coinvert',
      title: 'Coinvert',
      why: 'Live currency to Solana conversion with Coinvert extension.',
      tags: ['Solana', 'Conversion', 'API', 'Chrome Extension'],
      codeUrl: 'https://github.com/KashBuilds/CoinvertApp',
      easterEgg: 'Yes, you can finally ask "how much SOL is this kebab?" in real-time.',
      gradient: 'from-green-500/20 to-blue-600/20'
    },
    {
      id: 'clarity',
      title: 'Clarity',
      why: 'AI-powered sign language detection for accessibility',
      tags: ['YOLOv5', 'Computer Vision', 'AI', 'Accessibility'],
      codeUrl: 'https://github.com/KashBuilds/Clarity-Kash',
      easterEgg: 'Detects hand signs, 12+ languages, and... are you smiling right now?',
      gradient: 'from-blue-500/20 to-cyan-600/20'
    },
    {
      id: 'tradingintent',
      title: 'TradingIntent',
      why: 'Psychology meets trading - journal your way to better trades',
      tags: ['Solana', 'Trading', 'Psychology', 'Supabase'],
      codeUrl: 'https://github.com/KashBuilds/Intent-Kash',
      easterEgg: 'Logs your emotions pre-trade. Fear? Greed? Regret? We know.',
      gradient: 'from-amber-500/20 to-orange-600/20'
    },
    {
      id: 'bonkchain',
      title: 'BonkChain',
      why: 'Exclusive screener for Bonk ecosystem - because memes matter',
      tags: ['Cryptocurrency', 'Bonk', 'API', 'Tracker'],
      codeUrl: 'https://github.com/KashBuilds/BonkChain-Kash',
      easterEgg: 'Find a token with "bonk" in its name that actually rugs... if you dare',
      gradient: 'from-pink-500/20 to-yellow-400/20'
    },
    {
      id: 'cyber',
      title: 'Cyber Security Assessment',
      why: 'A practical security project combining binary exploitation and access control design',
      tags: ['Cybersecurity', 'Ghidra', 'GDB', 'RBAC'],
      codeUrl: '/cyber-report.pdf',
      easterEgg: 'Hint: A single missing byte in your payload can ruin everything.',
      gradient: 'from-slate-800/20 to-purple-600/20'
    }
  ];

  const location = useLocation();
  useEffect(() => {
    // Only scroll if coming from navigation with a target section
    if (location.state && (location.state as any).scrollTo) {
      const target = document.querySelector((location.state as any).scrollTo);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
        }, 100); // slight delay to ensure DOM is ready
      }
    }
  }, [location.state]);

  return (
    <section id="projects" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 pb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent leading-relaxed">
            Digital Experiments
            <span className="invisible">&nbsp;</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Each project is a playground for bold ideas. Some succeeded, some taught me lessons. All moved the needle forward.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce">
          ⚡
        </div>
        <div className="absolute bottom-[-8px] right-[-72px] text-6xl opacity-10 animate-pulse">
          🚀
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;