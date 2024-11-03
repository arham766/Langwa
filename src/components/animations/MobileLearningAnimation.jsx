import React from 'react';
import { motion } from 'framer-motion';

const MobileLearningAnimation = () => {
  // Animation variants
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const backgroundCircles = [
    { r: 180, opacity: 0.5, duration: 4 },
    { r: 160, opacity: 0.3, duration: 3 },
  ];

  const lessonCards = [
    { title: "Basic Phrases", progress: "80%", delay: 0 },
    { title: "Grammar", progress: "60%", delay: 0.2 },
    { title: "Vocabulary", progress: "45%", delay: 0.4 },
  ];

  const languageBubbles = [
    { cx: 60, cy: 150, text: "A", delay: 0 },
    { cx: 340, cy: 250, text: "B", delay: 0.3 },
  ];

  return (
    <motion.svg
      viewBox="0 0 400 400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      {/* Definitions */}
      <defs>
        <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#7e22ce', stopOpacity: 1 }} />
        </linearGradient>
        
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#c084fc', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#7e22ce', stopOpacity: 1 }} />
        </linearGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background Elements */}
      <g>
        {backgroundCircles.map((circle, index) => (
          <motion.circle
            key={index}
            cx="200"
            cy="200"
            r={circle.r}
            fill="#faf5ff"
            opacity={circle.opacity}
            animate={{
              r: [circle.r, circle.r + 5, circle.r],
            }}
            transition={{
              duration: circle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </g>

      {/* Phone Frame with 3D effect */}
      <motion.g
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 10, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Phone Shadow */}
        <motion.rect
          x="125"
          y="55"
          width="160"
          height="300"
          rx="20"
          fill="#6b21a8"
          opacity="0.2"
          filter="url(#glow)"
          animate={pulseAnimation}
        />
        
        {/* Main Phone Frame */}
        <motion.rect
          x="120"
          y="50"
          width="160"
          height="300"
          rx="20"
          fill="url(#phoneGradient)"
          filter="url(#glow)"
          animate={{
            y: [50, 55, 50],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.02 }}
        />
        
        {/* Screen */}
        <rect x="130" y="60" width="140" height="280" rx="15" fill="white" />
        
        {/* Status Bar */}
        <rect x="130" y="60" width="140" height="25" rx="15" fill="#f3e8ff" opacity="0.9" />
        <text x="145" y="77" fontSize="12" fill="#6b21a8">9:41</text>
        <rect x="240" y="67" width="15" height="10" rx="2" fill="#6b21a8" />
        
        {/* Navigation Bar */}
        <motion.g
          transform="translate(140, 85)"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <rect width="120" height="40" rx="20" fill="#f3e8ff" />
          <text x="10" y="25" fontSize="10" fill="#6b21a8">Learn</text>
          <text x="45" y="25" fontSize="10" fill="#6b21a8">Practice</text>
          <text x="85" y="25" fontSize="10" fill="#6b21a8">Profile</text>
        </motion.g>
      </motion.g>

      {/* App Interface */}
      <motion.g transform="translate(0, 20)">
        {/* Progress Section */}
        <g>
          <text x="150" y="130" fontSize="14" fill="#6b21a8" fontWeight="bold">
            Daily Progress
          </text>
          <rect x="150" y="140" width="100" height="10" rx="5" fill="#e9d5ff" />
          <motion.rect
            x="150"
            y="140"
            height="10"
            rx="5"
            fill="url(#progressGradient)"
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </g>

{/* Lesson Cards */}
<g>
  {lessonCards.map((card, index) => (
    <motion.g
      key={index}
      transform={`translate(0, ${170 + index * 60})`} // Adjust y-coordinate to prevent overlap
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: card.delay }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.rect
        x="0"
        y="170" // Adjust y as necessary
        width="100"
        height="50"
        rx="10"
        fill="#f3e8ff"
        stroke={["#d8b4fe", "#c084fc", "#a855f7"][index]}
        strokeWidth="2"
        animate={{
          x: [150, 155, 150],
        }}
        transition={{
          duration: 2 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <text x="165" y="190" fontSize="12" fill="#6b21a8" fontWeight="bold">
        {card.title}
      </text>
      <text x="165" y="210" fontSize="10" fill="#7e22ce">
        Progress: {card.progress}
      </text>
    </motion.g>
  ))}
</g>


        </motion.g>

      {/* Floating Elements */}
      <g>
        {/* Achievement Stars */}
        {[
          { path: "M280 120 L287 127 L295 120 L287 113 Z", cx: 287, cy: 120 },
          { path: "M100 200 L107 207 L115 200 L107 193 Z", cx: 107, cy: 200 },
        ].map((star, index) => (
          <motion.path
            key={index}
            d={star.path}
            fill="#9333ea"
            filter="url(#glow)"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: `${star.cx}px ${star.cy}px` }}
          />
        ))}

        {/* Language Bubbles */}
        {languageBubbles.map((bubble, index) => (
          <motion.g key={index}>
            <motion.circle
              cx={bubble.cx}
              cy={bubble.cy}
              r="15"
              fill="#e9d5ff"
              opacity="0.6"
              animate={{
                r: [15, 17, 15],
              }}
              transition={{
                duration: 2 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <text
              x={bubble.cx}
              y={bubble.cy + 5}
              fontSize="12"
              fill="#6b21a8"
              textAnchor="middle"
            >
              {bubble.text}
            </text>
          </motion.g>
        ))}

        {/* Achievement Badge */}
        <motion.g
          transform="translate(290, 300)"
          animate={pulseAnimation}
          whileHover={{ scale: 1.1 }}
        >
          <motion.circle
            cx="0"
            cy="0"
            r="20"
            fill="url(#progressGradient)"
            filter="url(#glow)"
            animate={{
              r: [22, 22, 20],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <text
            x="0"
            y="5"
            fontSize="20"
            fill="white"
            textAnchor="middle"
          >
            +1
          </text>
        </motion.g>
      </g>
    </motion.svg>
  );
};

export default MobileLearningAnimation;
            