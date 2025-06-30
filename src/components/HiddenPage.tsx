import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Gift } from 'lucide-react';

interface HiddenPageProps {
  onClose: () => void;
}

const HiddenPage: React.FC<HiddenPageProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-cyan-900/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23FFD700%22 fill-opacity=%220.1%22%3E%3Cstar cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center text-6xl mb-6 shadow-2xl shadow-purple-500/50">
            🎉
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent"
        >
          You Found It!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6 text-gray-300 text-lg mb-8"
        >
          <p>
            Congratulations, fellow explorer! You discovered the secret page by clicking the three emoji triggers. 
            This proves you have the curiosity and attention to detail that makes great developers.
          </p>
          
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-6 border border-yellow-400/30">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="text-yellow-400" size={24} />
              <h3 className="text-xl font-bold text-yellow-400">Secret Developer Wisdom</h3>
            </div>
            <blockquote className="text-cyan-300 italic text-lg">
              "The best features are often discovered by accident, 
              but the best easter eggs are hidden intentionally."
            </blockquote>
            <p className="text-gray-400 mt-2">- Kash's Law of Hidden Features</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <div className="text-2xl mb-2">🤖</div>
              <div className="text-sm text-purple-300">AI Curious</div>
            </div>
            <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
              <div className="text-2xl mb-2">☕</div>
              <div className="text-sm text-amber-300">Caffeine Powered</div>
            </div>
            <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-sm text-cyan-300">Always Shipping</div>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={onClose}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25 flex items-center gap-2 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          Back to Portfolio
        </motion.button>

        {/* Floating sparkles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles size={16} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HiddenPage;