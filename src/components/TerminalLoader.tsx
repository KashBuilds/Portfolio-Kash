import React, { useState, useEffect } from 'react';

interface TerminalLoaderProps {
  onComplete: () => void;
}

const TerminalLoader: React.FC<TerminalLoaderProps> = ({ onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'npx kash-portfolio';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setShowCursor(false);
          setTimeout(onComplete, 500);
        }, 1000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center z-50">
      <div className="font-mono text-green-400 text-xl md:text-2xl">
        <div className="mb-4 text-gray-400">
          Initializing portfolio...
        </div>
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">$</span>
          <span>{displayText}</span>
          {showCursor && <span className="animate-pulse text-green-400">|</span>}
        </div>
      </div>
    </div>
  );
};

export default TerminalLoader; 