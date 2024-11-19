import React from 'react';
import { motion } from 'framer-motion';

const CommunityAnimation = () => {
  const users = [
    { angle: 0, color: '#d8b4fe', status: 'Active' },
    { angle: 72, color: '#c084fc', status: 'Learning' },
    { angle: 144, color: '#a855f7', status: 'Teaching' },
    { angle: 216, color: '#9333ea', status: 'Active' },
    { angle: 288, color: '#7e22ce', status: 'Learning' }
  ];

  const centerAnimation = {
    r: [60, 65, 60],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const orbitAnimation = (startAngle) => ({
    rotate: [startAngle, startAngle + 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  });

  const userHoverAnimation = {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  };

  const connectionLineAnimation = {
    strokeDashoffset: [0, 10],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  };

  return (
    <motion.svg
      viewBox="0 0 400 400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Definitions */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Gradient for glow effect */}
        <radialGradient id="centerGlow">
          <stop offset="0%" stopColor="#f3e8ff" stopOpacity="1"/>
          <stop offset="100%" stopColor="#f3e8ff" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Background Circles */}
      <motion.circle
        cx="200"
        cy="200"
        r="150"
        fill="none"
        stroke="#f3e8ff"
        strokeWidth="1"
        opacity="0.2"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Center Circle */}
      <motion.g filter="url(#glow)">
        <motion.circle
          cx="200"
          cy="200"
          r="60"
          fill="#f3e8ff"
          stroke="#a855f7"
          strokeWidth="4"
          animate={centerAnimation}
        />
        
        {/* Center Icon */}
        <motion.text
          x="200"
          y="200"
          textAnchor="middle"
          fontSize="24"
          fill="#6b21a8"
          dominantBaseline="middle"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          👥
        </motion.text>
      </motion.g>

      {/* Orbiting Users */}
      <g>
        {users.map((user, index) => (
          <motion.g
            key={index}
            animate={orbitAnimation(user.angle)}
            style={{ originX: "200px", originY: "200px" }}
          >
            <motion.g
              whileHover={userHoverAnimation}
              style={{ originX: "200px", originY: "100px" }}
            >
              {/* User Circle */}
              <motion.circle
                cx="200"
                cy="100"
                r="30"
                fill={user.color}
                filter="url(#glow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />

              {/* User Icon */}
              <text
                x="200"
                y="110"
                textAnchor="middle"
                fill="#4c1d95"
                fontSize="20"
                style={{ 
                  transform: `rotate(${-user.angle}deg)`,
                  transformOrigin: '200px 100px'
                }}
              >
                👤
              </text>

              {/* Status Indicator */}
              <motion.circle
                cx="220"
                cy="85"
                r="6"
                fill={user.status === 'Active' ? '#22c55e' : 
                      user.status === 'Teaching' ? '#3b82f6' : '#eab308'}
                animate={{
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Connection Line to Center */}
              <motion.line
                x1="200"
                y1="130"
                x2="200"
                y2="170"
                stroke={user.color}
                strokeWidth="2"
                strokeDasharray="5,5"
                animate={connectionLineAnimation}
              />
            </motion.g>
          </motion.g>
        ))}
      </g>

      {/* Central Connection Lines */}
      <g stroke="#a855f7" strokeWidth="2" strokeDasharray="5,5">
        <motion.line
          x1="200"
          y1="140"
          x2="200"
          y2="260"
          animate={connectionLineAnimation}
        />
        <motion.line
          x1="140"
          y1="200"
          x2="260"
          y2="200"
          animate={connectionLineAnimation}
        />
      </g>

      {/* Particle Effects */}
      {[...Array(8)].map((_, i) => (
        <motion.circle
          key={i}
          r="2"
          fill={`hsl(${280 + i * 10}, 70%, 80%)`}
          initial={{ 
            cx: 200,
            cy: 200,
            opacity: 0
          }}
          animate={{
            cx: 200 + Math.cos((i * Math.PI) / 4) * 100,
            cy: 200 + Math.sin((i * Math.PI) / 4) * 100,
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.svg>
  );
};

export default CommunityAnimation;