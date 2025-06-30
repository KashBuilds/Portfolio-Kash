import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection: React.FC = () => {
  const [currentBelief, setCurrentBelief] = useState(0);
  
  const beliefs = [
    {
      statement: "AI agents will change how we build.",
      context: "We're moving from writing code to directing intelligence. The future developer stack includes AI as a partner."
    },
    {
      statement: "Good code is code that ships.",
      context: "Perfection is the enemy of done. I'd rather have something imperfect in user's hands than something perfect in my localhost."
    },
    {
      statement: "If it failed, I learned.",
      context: "Every failed project is a compressed lesson. The archive of my side projects is my real education."
    }
  ];

  const nextBelief = () => {
    setCurrentBelief((prev) => (prev + 1) % beliefs.length);
  };

  const prevBelief = () => {
    setCurrentBelief((prev) => (prev - 1 + beliefs.length) % beliefs.length);
  };

  return (
    <section id="about" className="py-20 bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-cyan-900/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Manifesto Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Build Fast. Learn Loud.
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  I build digital systems where form meets function - fast, secure and intelligently designed. From AI-driven interfaces to cyber-resilient web apps, every project I touch blends code, design & automation to push the boundary of what's possible.
                </p>
                <p>
                  I try to ship early, learn in the open and evolve through iteration. My workflow spans model training, UI/UX prototyping and backend logic - always with an eye on performance, <Link to={{ pathname: "/project/clarity" }} state={{ fromAbout: true }}><span className="glow-text">clarity</span></Link> and creativity.
                </p>
                <p>
                  Currently deep in AI agents, zero-knowledge systems and cyber-aware applications - the kind of tools that feel like magic but are built with precision.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-cyan-500 pl-6">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Core Philosophy</h3>
              <p className="text-gray-300 text-lg italic">
                "Technology should extend human potential without compromising integrity.<br />
                Great software isn't just useful: it's thoughtful, secure and well-crafted."
              </p>
            </div>
          </motion.div>

          {/* Beliefs Slider */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Things I Live By</h3>
                <div className="flex gap-2">
                  <button
                    onClick={prevBelief}
                    className="p-2 bg-gray-800/50 hover:bg-gray-700/50 text-cyan-400 rounded-lg transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextBelief}
                    className="p-2 bg-gray-800/50 hover:bg-gray-700/50 text-cyan-400 rounded-lg transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBelief}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <Quote className="text-cyan-400 mt-1 flex-shrink-0" size={24} />
                    <blockquote className="text-2xl font-bold text-white leading-tight">
                      {beliefs[currentBelief].statement}
                    </blockquote>
                  </div>
                  <p className="text-gray-300 text-lg pl-9">
                    {beliefs[currentBelief].context}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Belief indicators */}
              <div className="flex gap-2 mt-6 pl-9">
                {beliefs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBelief(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentBelief
                        ? 'bg-cyan-400 scale-125'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-6 -right-6 text-4xl"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              ⚡
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -left-6 text-4xl"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🧠
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;