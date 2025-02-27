import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MobileLearningAnimation = ({ isDarkTheme = true }) => {
  const svgRef = useRef(null);

  // Create particle effect on mount
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Cleanup function to remove particles on unmount
    return () => {
      // Cleanup logic here if needed
    };
  }, []);

  return (
    <motion.svg
      ref={svgRef}
      viewBox="0 0 800 600"
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Gradients and Filters */}
      <defs>
        <linearGradient id="darkGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#08090A" />
          <stop offset="100%" stopColor="#1A1B1D" />
        </linearGradient>
        
        <radialGradient id="glowGradient" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
          <stop offset="0%" stopColor="#5E6AD2" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#5E6AD2" stopOpacity="0" />
        </radialGradient>
        
        <radialGradient id="brandGlow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
          <stop offset="0%" stopColor="#5E6AD2" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#5E6AD2" stopOpacity="0" />
        </radialGradient>
        
        <filter id="phoneGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <linearGradient id="phoneGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5E6AD2" />
          <stop offset="100%" stopColor="#4B54AC" />
        </linearGradient>
        
        <linearGradient id="screenGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E1E20" />
          <stop offset="100%" stopColor="#252529" />
        </linearGradient>
        
        <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#5E6AD2" strokeOpacity="0.05" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Full Background using the Gradient */}
      <rect
        width="800"
        height="600"
        fill="url(#darkGradient)"
      />
      
      {/* Grid pattern overlay */}
      <rect 
        width="800" 
        height="600" 
        fill="url(#gridPattern)" 
        opacity="0.3"
      />

      {/* Background Glow */}
      <motion.circle
        cx="400"
        cy="300"
        r="300"
        fill="url(#glowGradient)"
        animate={{
          opacity: [0.6, 0.8, 0.6],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Background Circles */}
      <motion.circle
        cx="400"
        cy="300"
        r="250"
        fill="none"
        stroke="#5E6AD2"
        strokeOpacity="0.15"
        strokeWidth="1"
        animate={{
          r: [250, 255, 250],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.circle
        cx="400"
        cy="300"
        r="200"
        fill="none"
        stroke="#5E6AD2"
        strokeOpacity="0.1"
        strokeWidth="1"
        animate={{
          r: [200, 205, 200],
        }}
        transition={{
          duration: 4,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Particle effects */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.circle
          key={`particle-${i}`}
          r="2"
          fill="#5E6AD2"
          opacity="0.5"
          initial={{
            cx: 400 + Math.cos(i * Math.PI / 5) * 150 * Math.random(),
            cy: 300 + Math.sin(i * Math.PI / 5) * 150 * Math.random(),
          }}
          animate={{
            cx: 400 + Math.cos((i * Math.PI / 5) + 0.01) * 150 * Math.random(),
            cy: 300 + Math.sin((i * Math.PI / 5) + 0.01) * 150 * Math.random(),
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + i % 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Mobile Phone */}
      <motion.g
        filter="url(#phoneGlow)"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Phone Glow Effect */}
        <motion.ellipse
          cx="400"
          cy="300"
          rx="140"
          ry="240"
          fill="url(#brandGlow)"
          opacity="0.5"
          animate={{
            opacity: [0.5, 0.7, 0.5],
            rx: [140, 145, 140],
            ry: [240, 245, 240]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Phone Frame */}
        <rect
          x="300"
          y="100"
          width="200"
          height="400"
          rx="25"
          fill="url(#phoneGradient)"
        />
        
        {/* Subtle phone edge highlight */}
        <motion.rect
          x="300"
          y="100"
          width="200"
          height="400"
          rx="25"
          fill="none"
          stroke="#A4A8E1"
          strokeWidth="1"
          strokeOpacity="0.3"
          animate={{
            strokeOpacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Phone Screen */}
        <rect
          x="310"
          y="110"
          width="180"
          height="380"
          rx="20"
          fill="url(#screenGradient)"
        />

        {/* Status Bar */}
        <rect
          x="310"
          y="110"
          width="180"
          height="30"
          rx="20"
          fill="#252529"
        />
        <motion.text
          x="325"
          y="130"
          fontSize="14"
          fill="#A4A8E1"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          9:41
        </motion.text>

        {/* Navigation Bar */}
        <rect
          x="320"
          y="150"
          width="160"
          height="40"
          rx="20"
          fill="#1A1B1D"
        />
        <motion.g
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <text x="335" y="175" fontSize="14" fill="#5E6AD2">Learn</text>
          <text x="385" y="175" fontSize="14" fill="#8287D7">Practice</text>
          <text x="445" y="175" fontSize="14" fill="#8287D7">Profile</text>
        </motion.g>

        {/* Daily Progress */}
        <motion.text
          x="335"
          y="220"
          fontSize="20"
          fill="#A4A8E1"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Daily Progress
        </motion.text>

        {/* Progress Bar */}
        <rect
          x="335"
          y="240"
          width="130"
          height="10"
          rx="5"
          fill="#1A1B1D"
        />
        <motion.rect
          x="335"
          y="240"
          width="0"
          height="10"
          rx="5"
          fill="#5E6AD2"
          animate={{ width: 90 }}
          transition={{
            duration: 1.5,
            ease: "easeOut"
          }}
        />

        {/* Vocabulary Card */}
        <motion.rect
          x="335"
          y="270"
          width="130"
          height="70"
          rx="15"
          fill="#1A1B1D"
          stroke="#5E6AD2"
          strokeWidth="1"
          strokeOpacity="0.5"
          whileHover={{ 
            y: -5,
            strokeOpacity: 1,
            transition: { duration: 0.3 }
          }}
        />
        <motion.text
          x="350"
          y="300"
          fontSize="16"
          fill="#A4A8E1"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Vocabulary
        </motion.text>
        <motion.text
          x="350"
          y="320"
          fontSize="14"
          fill="#8287D7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          Progress: 45%
        </motion.text>
        
        {/* Additional App Elements - Charts */}
        <motion.rect
          x="335"
          y="350"
          width="130"
          height="70"
          rx="15"
          fill="#1A1B1D"
          stroke="#5E6AD2"
          strokeWidth="1"
          strokeOpacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          whileHover={{ 
            y: -5,
            strokeOpacity: 1,
            transition: { duration: 0.3 }
          }}
        />
        <motion.text
          x="350"
          y="375"
          fontSize="16"
          fill="#A4A8E1"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          Stats
        </motion.text>
        
        {/* Mini chart */}
        <motion.polyline
          points="350,390 365,385 380,395 395,380 410,387 425,377 440,385"
          stroke="#5E6AD2"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        />
      </motion.g>

      {/* Language Bubbles */}
      <motion.g>
        {/* Bubble A */}
        <motion.circle
          cx="200"
          cy="250"
          r="35"
          fill="#1A1B1D"
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.circle
          cx="200"
          cy="250"
          r="35"
          fill="none"
          stroke="#5E6AD2"
          strokeWidth="1"
          strokeOpacity="0.5"
          animate={{
            y: [-5, 5, -5],
            strokeOpacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.text
          x="200"
          y="260"
          fontSize="20"
          fill="#A4A8E1"
          textAnchor="middle"
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          A
        </motion.text>

        {/* Bubble B */}
        <motion.circle
          cx="600"
          cy="350"
          r="35"
          fill="#1A1B1D"
          animate={{
            y: [5, -5, 5],
          }}
          transition={{
            duration: 3,
            delay: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.circle
          cx="600"
          cy="350"
          r="35"
          fill="none"
          stroke="#5E6AD2"
          strokeWidth="1"
          strokeOpacity="0.5"
          animate={{
            y: [5, -5, 5],
            strokeOpacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            delay: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.text
          x="600"
          y="360"
          fontSize="20"
          fill="#A4A8E1"
          textAnchor="middle"
          animate={{
            y: [5, -5, 5],
          }}
          transition={{
            duration: 3,
            delay: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          B
        </motion.text>
        
        {/* New Bubble C */}
        <motion.circle
          cx="500"
          cy="180"
          r="25"
          fill="#1A1B1D"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -5, 0]
          }}
          transition={{
            opacity: { delay: 2, duration: 0.5 },
            scale: { delay: 2, duration: 0.5 },
            y: {
              delay: 2,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        <motion.circle
          cx="500"
          cy="180"
          r="25"
          fill="none"
          stroke="#5E6AD2"
          strokeWidth="1"
          strokeOpacity="0.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -5, 0],
            strokeOpacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            opacity: { delay: 2, duration: 0.5 },
            scale: { delay: 2, duration: 0.5 },
            y: {
              delay: 2,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            strokeOpacity: {
              delay: 2,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        <motion.text
          x="500"
          y="185"
          fontSize="16"
          fill="#A4A8E1"
          textAnchor="middle"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -5, 0]
          }}
          transition={{
            opacity: { delay: 2, duration: 0.5 },
            scale: { delay: 2, duration: 0.5 },
            y: {
              delay: 2,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          C
        </motion.text>
      </motion.g>

      {/* Connection lines between bubbles */}
      <motion.line
        x1="230"
        y1="250"
        x2="295"
        y2="260"
        stroke="#5E6AD2"
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="5,5"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          strokeDashoffset: [0, 10]
        }}
        transition={{
          opacity: { delay: 0.2, duration: 0.5 },
          strokeDashoffset: {
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />
      
      <motion.line
        x1="505"
        y1="180"
        x2="545"
        y2="200"
        stroke="#5E6AD2"
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="5,5"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          strokeDashoffset: [0, 10]
        }}
        transition={{
          opacity: { delay: 2.2, duration: 0.5 },
          strokeDashoffset: {
            delay: 2.2,
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />

      {/* Small Decorative Circles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.circle
          key={`circle-${i}`}
          cx={200 + i * 100}
          cy={450 + (i % 2) * 30}
          r="8"
          fill="#1A1B1D"
          stroke="#5E6AD2"
          strokeWidth="1"
          strokeOpacity="0.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
            strokeOpacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            opacity: { delay: 0.1 * i, duration: 0.5 },
            scale: { delay: 0.1 * i, duration: 0.5 },
            y: {
              delay: 0.1 * i,
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            strokeOpacity: {
              delay: 0.1 * i,
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      ))}
    </motion.svg>
  );
};

export default MobileLearningAnimation;
