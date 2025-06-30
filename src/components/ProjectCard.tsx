import React from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  why: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  easterEgg: string;
  gradient: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [showEasterEgg, setShowEasterEgg] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className={`relative p-6 rounded-xl bg-gradient-to-br ${project.gradient} backdrop-blur-lg border border-white/10 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-1`}>
        
        {/* Glitch effect overlay */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>
            <motion.div
              animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="text-amber-400 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowEasterEgg(!showEasterEgg);
              }}
            >
              <Sparkles size={20} />
            </motion.div>
          </div>

          <p className="text-gray-200 text-lg mb-4 italic">
            "{project.why}"
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 bg-black/30 backdrop-blur text-cyan-300 rounded-full text-sm border border-cyan-500/30 hover:border-cyan-400/50 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <motion.div
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Click to explore →
            </motion.div>
            <div className="flex gap-2 ml-auto">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-all border border-cyan-500/30 hover:border-cyan-400/50 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} />
                  Live
                </motion.a>
              )}
              {project.codeUrl && (
                <motion.a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all border border-purple-500/30 hover:border-purple-400/50 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={14} />
                  Code
                </motion.a>
              )}
            </div>
          </div>

          {/* Easter Egg */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: showEasterEgg ? 1 : 0,
              height: showEasterEgg ? 'auto' : 0
            }}
            className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-sm overflow-hidden"
          >
            💫 {project.easterEgg}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;