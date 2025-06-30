import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Rocket, Zap, Calendar, Eye, X, Play } from 'lucide-react';

interface ProjectData {
  id: string;
  title: string;
  date: string;
  oneLiner: string;
  heroImage: string;
  heroVideo?: string;
  description: string[];
  techStack: string[];
  challenges: Array<{
    problem: string;
    solution: string;
  }>;
  screenshots: Array<{
    url: string;
    caption: string;
    isEasterEgg?: boolean;
  }>;
  reflection: string;
  status: 'live' | 'completed' | 'ongoing' | 'archived';
  liveUrl?: string;
  codeUrl?: string;
  devLog?: string;
  embedVideo?: string;
}

const projectsData: Record<string, ProjectData> = {
  'gramchain': {
    id: 'gramchain',
    title: 'GramChain',
    date: 'June 2025',
    oneLiner: 'Instagram meets blockchain - because social should be onchain',
    heroImage: '/gramscan-dashboard.jpg',
    description: [
      "GramChain started as a wild idea: what if Instagram worked like a blockchain? Not just NFTs but every post, like and comment treated like a transaction.",
      "I built GramChain using React and Supabase, creating a fake blockchain system that logs each user interaction like it's a transaction. Each action - posting, liking, commenting - generates a record with a unique hash and timestamp.",
      "To make it feel real, I also built GramScan, a custom blockchain-style explorer where users can see every interaction across the platform like a real chain. It's all simulated but visually and functionally behaves like an onchain app."
    ],
    techStack: ['Solana', 'Supabase', 'React', 'TypeScript', 'Phantom Wallet', 'Metaplex', 'IPFS'],
    challenges: [
      {
        problem: "Building a fake blockchain that felt real without overcomplicating the stack",
        solution: "Implemented batched transactions and micro-payments, plus a 'free tier' using session keys for new users"
      },
      {
        problem: "Users didn't understand what was onchain vs simulated",
        solution: "Kept the experience fun and visual using tooltips, a \"See Tx\" button and explorer views that explain each log clearly while staying playful"
      },
      {
        problem: "Performance issues when the feed got too busy",
        solution: "Optimized Supabase queries, used indexed views for recent activity and limited explorer history with pagination for smooth UX"
      }
    ],
    screenshots: [
      {
        url: '/gramchain-feed.jpg',
        caption: 'Main feed showing onchain posts with transaction signatures'
      },
      {
        url: '/large-image.jpg',
        caption: 'Largened post format with buttons to see transaction'
      },
      {
        url: '/Liked-Post.jpg',
        caption: 'Liked Post Transaction',
      }
    ],
    reflection: "GramChain proved that onchain social is possible, but showed me we need better infrastructure. The project is live but I'm working on v2 with session keys and compressed NFTs.",
    status: 'ongoing',
    codeUrl: 'https://github.com/KashBuilds/Gramchain-Kash',
    devLog: "I was trying to mimic transaction hashes using crypto libraries - turns out a simple Date.now() mixed with a bit of randomness did the job just fine. Overengineering is easy when you're simulating a blockchain"
  },
  'coinvert': {
    id: 'coinvert',
    title: 'Coinvert',
    date: 'May 2025',
    oneLiner: 'See any price online in live SOL instantly',
    heroImage: '/coinvert-poster.png',
    heroVideo: '/coinvert-demo.mp4',
    description: [
      "Coinvert is a Chrome extension that converts any price you see online into its live value in Solana (SOL). Whether you're shopping, browsing SaaS tools or checking product listings, Coinvert shows you what it costs in SOL - updated in real time.",
      "The extension scans web pages for currency values, fetches the latest SOL price from CoinGecko and injects the converted amount right next to the original price without disrupting the site layout.",
      "I built it using vanilla JavaScript and the Chrome Extension APIs, with smooth DOM manipulation, custom toggles and real-time updates every few seconds.",
      "The project taught me that the best tools feel invisible - useful, clean and out of the way. This wasn't just about conversions, it was about creating something that fits naturally into how people browse."
    ],
    techStack: ['JavaScript', 'Chrome Extension API', 'CoinGecko API', 'DOM Manipulation', 'Real-time Updates'],
    challenges: [
      {
        problem: "Different websites format prices in inconsistent and unpredictable ways",
        solution: "Implemented a flexible price parsing system that can handle various formats and currencies"
      },
      {
        problem: "Some users wanted to keep seeing the original fiat price",
        solution: "Added a dual-display layout that shows both the fiat and SOL values on hover in a clean, readable format"
      }
    ],
    screenshots: [
      {
        url: '/coinvert-web.png',
        caption: 'Website for Coinvert'
      },
      {
        url: '/ebay-preview.png',
        caption: 'Example of Coinvert in action on eBay'
      },
      {
        url: '/webstore-preview.png',
        caption: 'Coinvert extension on the Chrome Web Store'
      }
    ],
    reflection: "Coinvert started as a playful side tool but ended up being genuinely useful. It made me realize how small UI overlays can bring crypto into everyday browsing without needing users to think about wallets or tokens.",
    status: 'live',
    codeUrl: 'https://github.com/KashBuilds/CoinvertApp',
    devLog: "The first version broke every site it touched - I was accidentally overwriting entire HTML elements instead of just injecting the SOL price. Took hours to realize I needed to clone and shadow style the injected element properly."
  },
  'clarity': {
    id: 'clarity',
    title: 'Clarity',
    date: 'December 2024',
    oneLiner: 'AI-powered sign language detection for accessibility',
    heroImage: '/clarity-hero.png',
    description: [
      "Clarity was my final year university project focused on bridging communication gaps using AI and computer vision.",
      "It detects American Sign Language gestures in real-time via webcam and translates them into spoken or written language instantly.",
      "Built with YOLOv5 trained on a custom dataset, with a React frontend and Flask backend handling model inference and predictions.",
      "The app runs at 30fps, supports full alphabet recognition and earned me a First Class grade for pushing accessibility through tech."
    ],
    techStack: ['YOLOv5', 'Python', 'Flask', 'Web Speech API', 'OpenCV', 'JavaScript', 'HTML/CSS'],
    challenges: [
      {
        problem: "Low lighting and noisy backgrounds caused the model to misclassify signs or fail entirely",
        solution: "Integrated OpenCV preprocessing to sharpen contrast and isolate the hand region, improving detection stability in poor conditions"
      },
      {
        problem: "Running the YOLOv5 model in real-time without freezing or crashing the browser",
        solution: "Offloaded inference to the Python Flask backend, streamed predictions back via AJAX polling to keep the browser responsive"
      },
      {
        problem: "Users struggled to form full sentences with only individual letter detection",
        solution: "Built a dynamic suggestion system that predicts common words based on previous inputs, improving usability and speed of communication"
      }
    ],
    screenshots: [
      {
        url: '/clarity-letter.png',
        caption: 'Real-time gesture detection with confidence scores'
      },
      {
        url: '/clarity-suggest.png',
        caption: 'Clarity\'s dynamic word suggestion system'
      },
      {
        url: '/clarity-interface.png',
        caption: 'Clarity\'s interface with real-time translation',
      }
    ],
    reflection: "Clarity helped me realise that AI isn't just about automation — it's about accessibility, communication and making tech more human. As my final year project, it pushed me technically and creatively, and earning a First Class for it made the journey even more worthwhile.",
    status: 'completed',
    codeUrl: 'https://github.com/KashBuilds/Clarity-Kash',
    devLog: "Tried testing signs at night with no light — model thought every gesture was a fist. Set up a flashlight near my monitor for a week until I added contrast boosting filters. Sometimes innovation is solved by desperation."
  },
  'tradingintent': {
    id: 'tradingintent',
    title: 'TradingIntent',
    date: 'February 2025',
    oneLiner: 'Psychology meets trading - journal your way to better trades',
    heroImage: '/intent-hero.png',
    heroVideo: '/intent-trailer.mp4',
    description: [
      "TradingIntent tackles the biggest problem in trading: psychology. It's a journaling app that tracks not just your trades, but your emotions, reasoning and decision-making patterns.",
      "Built with React and Supabase, integrated with Solana for tracking onchain trades. The app analyses your journal entries using sentiment analysis to identify emotional trading patterns.",
      "Features include trade logging, emotion tracking, pattern recognition and AI-powered insights that help traders understand their psychological biases.",
      "The project taught me that the best trading tools aren't about predicting markets - they're about understanding yourself."
    ],
    techStack: ['React', 'Supabase', 'Solana', 'Python', 'Natural Language Processing', 'Chart.js'],
    challenges: [
      {
        problem: "Some users didn't want to link their wallet immediately",
        solution: "Made wallet linking optional on signup and used conditional rendering to unlock wallet-specific features later - lowered entry barrier"
      },
      {
        problem: "Sentiment analysis was too generic for trading-specific emotions like FOMO and FUD",
        solution: "Fine-tuned a custom model on trading psychology literature and community discussions"
      }
    ],
    screenshots: [
      {
        url: '/dashboard.png',
        caption: 'Trade journal interface with emotion tracking'
      },
      {
        url: '/ai-analysis.png',
        caption: 'AI analysis feature'
      },
      {
        url: '/logging-trade.png',
        caption: 'Trade logging pop-up'
      }
    ],
    reflection: "TradingIntent helped me realize that most trading problems are human problems. At all time high, the app had 70+ active users who've improved their win rates by an average of 23%.",
    status: 'live',
    codeUrl: 'https://github.com/KashBuilds/Intent-Kash',
    devLog: "I realised I was skipping my own reflections during busy market sessions. That's when I changed the UX to prioritise quick entry-first journaling - no overthinking. If it helps me, it'll help someone else too."
  },
  'bonkchain': {
    id: 'bonkchain',
    title: 'BonkChain',
    date: 'June 2025',
    oneLiner: 'A fast, focused dashboard for tracking new token launches on Solana',
    heroImage: '/bonk-scan.png',
    description: [
      "BonkChain is a clean, responsive dashboard for tracking newly launched tokens on the Solana blockchain, with a focus on reliability, speed and clarity.",
      "Instead of listing every token, the tool filters specifically for tokens launched through the Bonk Launchpad - a popular on-chain platform - and displays important details like price, market cap, liquidity and creator information.",
      "I also built a custom blockchain-style explorer called BonkScan, which lets users inspect token details, creator wallets and launch history in a clear, readable format - similar to tools like Etherscan but simplified for this specific use case.",
      "What I learned: Building in Web3 often means dealing with incomplete or unstructured data. It challenged me to create fallback systems, handle inconsistent metadata and keep the UI smooth even when sources fail"
    ],
    techStack: ['React', 'Node.js', 'Next.js', 'Jupiter API', 'Solana RPC', 'TypeScript', 'Tailwind CSS'],
    challenges: [
      {
        problem: "There was no reliable API for filtering tokens launched via Bonk Launchpad",
        solution: "Built a custom data parser that cross-referenced on-chain metadata, known launch wallet patterns and token naming conventions to filter relevant tokens accurately"
      },
      {
        problem: "Some tokens were missing key information or had broken metadata",
        solution: "Designed a fallback system that reconstructs missing data from blockchain calls, ensuring tokens still appear usable and consistent in the UI"
      },
      {
        problem: "Users needed fast access to clean data without performance drops",
        solution: "Optimised data queries, implemented caching and lazy loading to ensure smooth performance even when processing hundreds of tokens"
      }
    ],
    screenshots: [
      {
        url: '/bonk-home.png',
        caption: 'Main screener interface with Bonk ecosystem tokens'
      },
      {
        url: '/network-log.png',
        caption: 'BonkChain sending requests to the API periodically'
      },
      {
        url: '/transfer-page.png',
        caption: 'Live feed of all token transfers, with specific filters to display relevant data',
      }
    ],
    reflection: "BonkChain taught me how to deal with unreliable data sources while keeping user experience smooth and accessible. It's not just a blockchain tool - it's a focused data filtering interface, designed to help people quickly understand new information, even in messy conditions. The structure and UX lessons apply far beyond Web3.",
    status: 'live',
    codeUrl: 'https://github.com/KashBuilds/BonkChain-Kash',
    devLog: "While testing, I noticed the UI was lagging when rendering too many tokens. I restructured the layout using virtual lists and reduced unnecessary re-renders - the difference in speed was immediate.."
  },
  'cyber': {
    id: 'cyber',
    title: 'Advanced Cyber Security Assessment',
    date: 'April 2025',
    oneLiner: 'Reverse-engineered a C vulnerability and redesigned access control',
    heroImage: '/debug-stack.png',
    description: [
      'This was a two-part university assessment for my Advanced Cyber Security module, combining low-level binary exploitation and access control policy design.',
      'The first part involved reverse-engineering a vulnerable C program using Ghidra and triggering a buffer overflow using GDB on Windows. I crafted a custom payload to overwrite the return address and execute a command prompt (cmd.exe) using the program\'s own logic.',
      'The second part focused on analyzing permission datasets from real businesses, detecting over-privileged users and role redundancy. I applied role mining techniques to restructure their access models into clean, efficient RBAC (Role-Based Access Control) systems.',
      'This project gave me hands-on experience in both technical exploitation and practical policy design, and earned me a First Class grade.'
    ],
    techStack: ['Ghidra', 'GDB', 'C (vulnerable app)', 'Role Mining', 'RBAC modeling', 'Python + Excel (for policy analysis)', 'Report Writeups'],
    challenges: [
      {
        problem: 'Couldn\'t determine the correct offset to trigger the buffer overflow',
        solution: 'Used Ghidra to trace stack frames and functions, then confirmed the overwrite point with GDB during runtime'
      },
      {
        problem: 'Client permission datasets were inconsistent and messy',
        solution: 'Mapped permissions into role matrices, identified overlap, and reduced role count while preserving coverage using RBAC design principles'
      },
      {
        problem: 'Needed to hijack the program\'s control flow to launch cmd.exe',
        solution: 'Wrote a payload that redirected execution to an existing system("start cmd") call within the binary'
      }
    ],
    screenshots: [
      {
        url: '/powershell-stack.png',
        caption: 'Compiling the vulnerable C program with gets(), confirming exploitable input handling'
      },
      {
        url: '/ghidra.png',
        caption: 'Disassembled shellcode from cmd.exe extracted using Ghidra for payload crafting'
      },
      {
        url: '/stack-dump.png',
        caption: 'GDB memory view showing stack overflow and overwritten values after payload injection'
      }
    ],
    reflection: 'This project gave me confidence to work across both offensive and defensive security. It taught me how to move from theory to hands-on execution, and how important clear access control is in preventing real-world breaches. Graded First Class and easily one of the most practical, challenging and rewarding builds I\'ve done.',
    status: 'completed',
    codeUrl: '/cyber-report.pdf',
    devLog: 'Spent hours wondering why my exploit wouldn\'t trigger - turns out I forgot a null byte at the end of my payload, which caused the return address to shift off by one. Small mistakes teach big lessons when working with memory.'
  }
};

interface ProjectDetailProps {
  setIsMuted?: (muted: boolean) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ setIsMuted }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [wasMuted, setWasMuted] = useState<boolean | null>(null);

  const project = projectId ? projectsData[projectId] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  useEffect(() => {
    if (!lightboxImage) setIsZoomed(false);
  }, [lightboxImage]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const statusColors = {
    live: 'from-green-500 to-emerald-600',
    completed: 'from-blue-500 to-cyan-600',
    ongoing: 'from-yellow-500 to-orange-600',
    archived: 'from-gray-500 to-gray-600'
  };

  const statusIcons = {
    live: <Zap size={16} />,
    completed: <Eye size={16} />,
    ongoing: <Rocket size={16} />,
    archived: <Calendar size={16} />
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Floating scroll indicator */}
      <motion.div
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col items-center gap-2 text-cyan-400">
          <Rocket size={20} className="animate-bounce" />
          <div className="w-px h-20 bg-gradient-to-b from-cyan-400 to-transparent"></div>
        </div>
      </motion.div>

      {/* Back Button */}
      <motion.button
        onClick={() => {
          if (location.state && location.state.fromAbout) {
            navigate('/', { state: { scrollTo: '#about' } });
          } else {
            navigate('/', { state: { scrollTo: '#projects' } });
          }
        }}
        className="fixed top-20 left-6 z-40 flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-lg border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-gray-800/80 transition-all"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={20} />
        Back to Portfolio
      </motion.button>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-32 pb-12 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-cyan-400 font-mono">{project.date}</span>
            <div className={`flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${statusColors[project.status]} rounded-full text-white text-sm font-semibold`}>
              {statusIcons[project.status]}
              {project.status}
            </div>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {project.title}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 italic">
            "{project.oneLiner}"
          </p>
        </div>
      </motion.header>

      {/* Hero Media */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-cyan-500/20">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-[400px] lg:h-[600px] object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
              onClick={() => setLightboxImage(project.heroImage)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            {project.heroVideo && (
              <button
                onClick={() => {
                  if (setIsMuted) {
                    setWasMuted(prev => {
                      if (prev === null) {
                        setIsMuted(true);
                        return false;
                      }
                      return prev;
                    });
                  }
                  setShowVideo(true);
                }}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group"
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={32} className="text-white ml-1" />
                </div>
              </button>
            )}
          </div>
        </div>
      </motion.section>

      {/* What I Built */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 mb-20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-cyan-400">What I Built</h2>
          <div className="space-y-6">
            {project.description.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-lg text-gray-300 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Tech Stack */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 mb-20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-purple-400">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300 font-semibold hover:border-purple-400/50 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Challenges & Solutions */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 mb-20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-amber-400">Challenges & Solutions</h2>
          <div className="space-y-8">
            {project.challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-amber-500/20"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">🚨 Problem</h3>
                  <p className="text-gray-300">{challenge.problem}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">✅ Solution</h3>
                  <p className="text-gray-300">{challenge.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Screenshots Gallery */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 mb-20"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-pink-400">Screenshots</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative rounded-lg overflow-hidden border border-pink-500/20 hover:border-pink-400/50 transition-all">
                  <img
                    src={screenshot.url}
                    alt={screenshot.caption}
                    className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                    onClick={() => setLightboxImage(screenshot.url)}
                  />
                  {screenshot.isEasterEgg && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs animate-pulse">
                      ✨
                    </div>
                  )}
                </div>
                <p className="mt-3 text-sm text-gray-400">{screenshot.caption}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Dev Log */}
      {project.devLog && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-6 mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                💭 Dev Log Moment
              </h3>
              <p className="text-gray-300 italic text-lg leading-relaxed">
                {project.devLog}
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* Reflection & Status */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 mb-20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-green-400">Reflection</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            {project.reflection}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={20} />
                View Live
              </motion.a>
            )}
            {project.codeUrl && (
              <motion.a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                View Code
              </motion.a>
            )}
          </div>
        </div>
      </motion.section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-6 overflow-auto"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className={`relative max-w-5xl max-h-full${isZoomed ? ' flex items-center justify-center' : ''}`}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt="Enlarged view"
                className={
                  `rounded-lg cursor-zoom-in transition-all duration-300 ` +
                  (isZoomed
                    ? 'w-auto h-auto max-w-none max-h-none object-none object-center cursor-zoom-out'
                    : 'max-w-full max-h-full object-contain')
                }
                onClick={() => setIsZoomed(z => !z)}
                style={isZoomed ? { boxShadow: '0 0 0 4px #0ff8, 0 0 40px #0ff4' } : {}}
              />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (project.heroVideo || project.embedVideo) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-6"
            onClick={() => {
              setShowVideo(false);
              if (setIsMuted && wasMuted === false) {
                setIsMuted(false);
                setWasMuted(null);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {project.heroVideo ? (
                <video
                  src={project.heroVideo}
                  controls
                  autoPlay
                  className="w-full h-full rounded-lg"
                  ref={el => { if (el) el.volume = 0.2; }}
                />
              ) : project.embedVideo ? (
                <iframe
                  src={project.embedVideo}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              ) : null}
              <button
                onClick={() => {
                  setShowVideo(false);
                  if (setIsMuted && wasMuted === false) {
                    setIsMuted(false);
                    setWasMuted(null);
                  }
                }}
                className="absolute -top-12 right-0 w-10 h-10 bg-black/50 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;