import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import TerminalHero from './components/TerminalHero';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import TechStack from './components/TechStack';
import ContactSection from './components/ContactSection';
import HiddenPage from './components/HiddenPage';
import ProjectDetail from './components/ProjectDetail';
import TerminalLoader from './components/TerminalLoader';

function HomePage({ 
  onEmojiClick, 
  clickedEmojis, 
  customCursor, 
  showHiddenPage, 
  setShowHiddenPage 
}: {
  onEmojiClick: (emoji: string) => void;
  clickedEmojis: string[];
  customCursor: { x: number; y: number };
  showHiddenPage: boolean;
  setShowHiddenPage: (show: boolean) => void;
}) {
  return (
    <>
      <main className="relative">
        <section id="home">
          <TerminalHero
            onEmojiClick={onEmojiClick}
            clickedEmojis={clickedEmojis}
          />
        </section>

        <ProjectsSection />
        <AboutSection />
        <TechStack />
        <ContactSection />
      </main>

      {/* Hidden Page */}
      <AnimatePresence>
        {showHiddenPage && (
          <HiddenPage onClose={() => setShowHiddenPage(false)} />
        )}
      </AnimatePresence>

      {/* Progress indicator for secret emoji hunt */}
      {clickedEmojis.length > 0 && clickedEmojis.length < 3 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 bg-gray-800/90 backdrop-blur-lg rounded-lg p-3 border border-cyan-500/30 z-40"
        >
          <div className="text-cyan-400 text-sm font-mono">
            Secret Hunt: {clickedEmojis.length}/3
          </div>
          <div className="flex gap-1 mt-1">
            {['🤖', '☕', '🚀'].map((emoji, index) => (
              <span
                key={index}
                className={`text-lg ${
                  clickedEmojis.includes(emoji) ? 'brightness-150 scale-110' : 'opacity-50'
                }`}
              >
                {emoji}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showHiddenPage, setShowHiddenPage] = useState(false);
  const [clickedEmojis, setClickedEmojis] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const location = useLocation();

  // Secret emoji sequence to unlock hidden page
  const secretEmojis = ['🤖', '☕', '🚀'];

  // Custom cursor effect (requestAnimationFrame for smoothness)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let running = true;
    const animate = () => {
      // Smooth follow
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x - 8}px, ${pos.current.y - 8}px, 0)`;
      }
      if (running) requestAnimationFrame(animate);
    };
    animate();
    return () => {
      running = false;
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.volume = 0.04;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted]);

  useEffect(() => {
    if (location.pathname === '/' && location.state && location.state.scrollTo === '#about') {
      const aboutSection = document.querySelector('#about');
      if (aboutSection) {
        setTimeout(() => {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
        }, 100); // slight delay to ensure DOM is ready
      }
    }
  }, [location]);

  // Handle emoji clicks for hidden page
  const handleEmojiClick = (emoji: string) => {
    if (!isMuted) {
      // Play click sound (would need actual audio implementation)
      console.log('🔊 Click sound');
    }

    const newClickedEmojis = [...clickedEmojis];
    if (!newClickedEmojis.includes(emoji)) {
      newClickedEmojis.push(emoji);
      setClickedEmojis(newClickedEmojis);

      // Check if all secret emojis have been clicked
      const hasAllSecretEmojis = secretEmojis.every(secretEmoji =>
        newClickedEmojis.includes(secretEmoji)
      );

      if (hasAllSecretEmojis) {
        setTimeout(() => {
          setShowHiddenPage(true);
        }, 500);
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (loading) {
    return <TerminalLoader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} ${!isDragging ? 'cursor-none' : ''}`}>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-[1000] mix-blend-difference ${window.innerWidth > 768 && !isDragging ? 'block' : 'hidden'}`}
        style={{ left: 0, top: 0 }}
      />

      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/portfolio-track.mp3"
        autoPlay
        loop
        muted={isMuted}
        preload="auto"
      />

      <Navigation
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage
              onEmojiClick={handleEmojiClick}
              clickedEmojis={clickedEmojis}
              customCursor={pos.current}
              showHiddenPage={showHiddenPage}
              setShowHiddenPage={setShowHiddenPage}
            />
          } 
        />
        <Route path="/project/:projectId" element={<ProjectDetail setIsMuted={setIsMuted} />} />
      </Routes>

      {/* Floating Music Toggle */}
      <motion.div
        className="fixed bottom-6 left-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.1 }}
      >
        <button
          onClick={() => setIsMuted((m) => !m)}
          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
        >
          {isMuted ? '🔇' : '🎵'}
        </button>
      </motion.div>
    </div>
  );
}

export default App;