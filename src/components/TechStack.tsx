import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

// Add prop type for setIsDragging
interface TechStackProps {
  setIsDragging?: (dragging: boolean) => void;
}

const TechStack: React.FC<TechStackProps> = ({ setIsDragging }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const rafRef = useRef<number | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 400 });

  const techStacks = [
    { name: 'TypeScript', category: 'language', color: 'from-blue-500 to-blue-600' },
    { name: 'Supabase', category: 'backend', color: 'from-green-500 to-green-600' },
    { name: 'Vite', category: 'build', color: 'from-yellow-500 to-orange-500' },
    { name: 'Flask', category: 'backend', color: 'from-gray-600 to-gray-700' },
    { name: 'YOLOv5', category: 'ai', color: 'from-red-500 to-pink-500' },
    { name: 'OpenAI API', category: 'ai', color: 'from-cyan-500 to-blue-500' },
    { name: 'AI APIs', category: 'ai', color: 'from-cyan-400 to-blue-400' },
    { name: 'Framer', category: 'design', color: 'from-purple-600 to-pink-600' },
    { name: 'UX Writing', category: 'design', color: 'from-indigo-500 to-purple-500' },
    { name: 'Terminal Wizardry', category: 'tools', color: 'from-green-400 to-cyan-400' },
    { name: 'HTML/CSS', category: 'language', color: 'from-pink-500 to-yellow-500' },
    { name: 'JavaScript', category: 'language', color: 'from-yellow-400 to-yellow-600' },
    { name: 'Python', category: 'language', color: 'from-yellow-400 to-red-500' },
    { name: 'PostgreSQL', category: 'backend', color: 'from-blue-800 to-blue-400' },
    { name: 'Three.js / 3D', category: 'design', color: 'from-gray-800 to-black', badge: 'learning' }
  ];

  const categoryColors = {
    blockchain: 'border-purple-500/50 bg-purple-500/10',
    language: 'border-blue-500/50 bg-blue-500/10',
    backend: 'border-green-500/50 bg-green-500/10',
    build: 'border-yellow-500/50 bg-yellow-500/10',
    ai: 'border-red-500/50 bg-red-500/10',
    web3: 'border-orange-500/50 bg-orange-500/10',
    design: 'border-pink-500/50 bg-pink-500/10',
    tools: 'border-cyan-500/50 bg-cyan-500/10'
  };

  // Pill size
  const pillW = 160;
  const pillH = 48;

  // Pyramid layout for initial positions
  const getInitialPositions = (containerWidth: number) => {
    const rows = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11],
      [12, 13],
      [14]
    ];
    const positions: { x: number; y: number }[] = Array(techStacks.length).fill(null).map(() => ({ x: 0, y: 0 }));
    let y = 0;
    rows.forEach((row, i) => {
      const totalW = row.length * pillW + (row.length - 1) * 16;
      let x = (containerWidth - totalW) / 2; // Centered in container
      row.forEach(idx => {
        positions[idx] = { x, y };
        x += pillW + 16;
      });
      y += pillH + 16;
    });
    return positions;
  };

  // Setup physics
  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerSize;

    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Body = Matter.Body;
    const engine = Engine.create();
    engine.world.gravity.y = 0; // Disable vertical gravity
    engine.world.gravity.x = 0; // Disable horizontal gravity
    engineRef.current = engine;
    // Create boundaries
    const boundaries = [
      Bodies.rectangle(width / 2, -20, width, 40, { isStatic: true }), // top
      Bodies.rectangle(width / 2, height + 20, width, 40, { isStatic: true }), // bottom
      Bodies.rectangle(-20, height / 2, 40, height, { isStatic: true }), // left
      Bodies.rectangle(width + 20, height / 2, 40, height, { isStatic: true }) // right
    ];
    World.add(engine.world, boundaries);
    // Create pills
    const initial = getInitialPositions(width);
    const bodies = techStacks.map((_, i) =>
      Bodies.rectangle(
        initial[i].x + pillW / 2,
        initial[i].y + pillH / 2,
        pillW,
        pillH,
        {
          restitution: 0.7,
          friction: 0.1,
          frictionAir: 0.08,
          label: String(i)
        }
      )
    );
    bodiesRef.current = bodies;
    World.add(engine.world, bodies);
    // Animation loop
    const update = () => {
      Engine.update(engine, 1000 / 60);
      setPositions(
        bodies.map(b => ({ x: b.position.x - pillW / 2, y: b.position.y - pillH / 2 }))
      );
      rafRef.current = requestAnimationFrame(update);
    };
    update();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
    // eslint-disable-next-line
  }, [containerSize.width]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: 400 // Keep height fixed or make responsive
        });
      }
    };

    handleResize(); // Initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Drag logic
  const handlePointerDown = (i: number, e: React.PointerEvent) => {
    setDraggedIndex(i);
    if (setIsDragging) setIsDragging(true);
    document.body.style.cursor = 'auto';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggedIndex !== null && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const body = bodiesRef.current[draggedIndex];
      Matter.Body.setPosition(body, { x, y });
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
    }
  };

  const handlePointerUp = () => {
    setDraggedIndex(null);
    if (setIsDragging) setIsDragging(false);
    document.body.style.cursor = 'none';
  };

  // Initial positions for first render
  useEffect(() => {
    setPositions(getInitialPositions(containerSize.width));
    // eslint-disable-next-line
  }, [containerSize.width]);

  return (
    <section id="tech" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/50 to-black/80"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={containerRef}
          className="relative mx-auto"
          style={{ width: '100%', height: 400, touchAction: 'none' }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {positions.map((pos, i) => {
            const tech = techStacks[i];
            return (
              <div
                key={tech.name}
                style={{
                  position: 'absolute',
                  left: pos.x,
                  top: pos.y,
                  width: pillW,
                  height: pillH,
                  zIndex: draggedIndex === i ? 20 : 10,
                  cursor: draggedIndex === i ? 'grabbing' : 'grab',
                  transition: draggedIndex === i ? 'none' : 'box-shadow 0.2s',
                  boxShadow: draggedIndex === i ? '0 8px 32px 0 rgba(0,0,0,0.25)' : '0 2px 8px 0 rgba(0,0,0,0.10)'
                }}
                onPointerDown={e => handlePointerDown(i, e)}
              >
                <div
                  className={`relative px-4 py-2 rounded-full select-none ${
                    categoryColors[tech.category as keyof typeof categoryColors]
                  } border backdrop-blur-lg shadow-lg transition-all duration-300 w-full h-full flex items-center justify-center`}
                >
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${tech.color} opacity-20`}></div>
                  <div className="relative flex items-center gap-2">
                    <span className="text-white font-semibold">{tech.name}</span>
                    {tech.badge && (
                      <span className="px-2 py-1 text-xs bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                        {tech.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Category Legend */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          {Object.entries(categoryColors).map(([category, styles]) => (
            <div
              key={category}
              className={`px-3 py-1 rounded-full text-sm ${styles} border backdrop-blur-lg`}
            >
              <span className="text-gray-300 capitalize">{category}</span>
            </div>
          ))}
        </div>
        {/* Drag instruction */}
        <p className="text-center mt-8 text-gray-500 text-sm">
          💡 Try dragging the tech pills around - they move around!
        </p>
      </div>
    </section>
  );
};

export default TechStack;