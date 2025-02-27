import React from 'react';
import { motion } from 'framer-motion';

const CommunityAnimation = ({ isDarkTheme = true }) => {
  const users = [
    { angle: 0, color: '#A4A8E1', status: 'Active', avatar: '👩', name: 'Sarah K.' },
    { angle: 72, color: '#8287D7', status: 'Learning', avatar: '👨', name: 'Robert M.' },
    { angle: 144, color: '#5E6AD2', status: 'Teaching', avatar: '👧', name: 'Emma P.' },
    { angle: 216, color: '#4B54AC', status: 'Active', avatar: '👦', name: 'Thomas L.' },
    { angle: 288, color: '#3A4186', status: 'Learning', avatar: '👩', name: 'Julia R.' }
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
      duration: 30,
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
      {/* Enhanced Gradients and Effects */}
      <defs>
        {/* Dark Gradient Definition */}
        <linearGradient id="darkGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#08090A" />
          <stop offset="100%" stopColor="#1A1B1D" />
        </linearGradient>
        
        {/* Radial brand gradient */}
        <radialGradient id="centerGlow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
          <stop offset="0%" stopColor="#5E6AD2" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#5E6AD2" stopOpacity="0"/>
        </radialGradient>
        
        {/* User circle gradient */}
        <linearGradient id="userGradient1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A4A8E1" />
          <stop offset="100%" stopColor="#8287D7" />
        </linearGradient>
        
        <linearGradient id="userGradient2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8287D7" />
          <stop offset="100%" stopColor="#5E6AD2" />
        </linearGradient>
        
        <linearGradient id="userGradient3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5E6AD2" />
          <stop offset="100%" stopColor="#4B54AC" />
        </linearGradient>
        
        <linearGradient id="userGradient4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4B54AC" />
          <stop offset="100%" stopColor="#3A4186" />
        </linearGradient>
        
        <linearGradient id="userGradient5" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3A4186" />
          <stop offset="100%" stopColor="#292E60" />
        </linearGradient>
        
        {/* Glow filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feFlood floodColor="#5E6AD2" floodOpacity="0.5" result="color"/>
          <feComposite in="color" in2="blur" operator="in" result="shadow"/>
          <feComposite in="SourceGraphic" in2="shadow" operator="over"/>
        </filter>
        
        {/* Subtle glow */}
        <filter id="subtleGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feColorMatrix 
            in="blur" 
            type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 18 -7"
            result="glow"
          />
          <feComposite in="SourceGraphic" in2="glow" operator="over"/>
        </filter>
        
        {/* Grid pattern */}
        <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path 
            d="M 40 0 L 0 0 0 40" 
            fill="none" 
            stroke="#5E6AD2" 
            strokeOpacity="0.05" 
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      {/* Full Background using the Gradient */}
      <rect
        width="400"
        height="400"
        fill="url(#darkGradient)"
      />
      
      {/* Grid pattern */}
      <rect
        width="400"
        height="400"
        fill="url(#gridPattern)"
        opacity="0.3"
      />
      
      {/* Ambient glow */}
      <motion.circle
        cx="200"
        cy="200"
        r="180"
        fill="url(#centerGlow)"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Background Circles */}
      <motion.circle
        cx="200"
        cy="200"
        r="150"
        fill="none"
        stroke="#5E6AD2"
        strokeWidth="0.5"
        strokeOpacity="0.2"
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
      
      <motion.circle
        cx="200"
        cy="200"
        r="120"
        fill="none"
        stroke="#5E6AD2"
        strokeWidth="0.5"
        strokeOpacity="0.1"
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Center Circle */}
      <motion.g>
        <motion.circle
          cx="200"
          cy="200"
          r="60"
          fill="#1A1B1D"
          stroke="#5E6AD2"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          animate={centerAnimation}
        />
        
        <motion.circle
          cx="200"
          cy="200"
          r="60"
          fill="none"
          stroke="#A4A8E1"
          strokeWidth="0.5"
          strokeOpacity="0.3"
          animate={{
            ...centerAnimation,
            strokeOpacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner glow */}
        <motion.circle
          cx="200"
          cy="200"
          r="45"
          fill="url(#centerGlow)"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.9, 1, 0.9]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Center Icon */}
        <motion.g filter="url(#subtleGlow)">
          <circle
            cx="200"
            cy="200"
            r="30"
            fill="#1A1B1D"
            stroke="#5E6AD2"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <motion.text
            x="200"
            y="200"
            textAnchor="middle"
            fontSize="24"
            fill="#A4A8E1"
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
        
        {/* Pulsing rings */}
        {[...Array(3)].map((_, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx="200"
            cy="200"
            r="60"
            fill="none"
            stroke="#5E6AD2"
            strokeWidth="1"
            strokeOpacity="0"
            initial={{ scale: 0.5 }}
            animate={{
              scale: [0.8, 1.5],
              strokeOpacity: [0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1
            }}
          />
        ))}
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
                fill={`url(#userGradient${index + 1})`}
                filter="url(#subtleGlow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
              
              {/* User border/ring */}
              <motion.circle
                cx="200"
                cy="100"
                r="30"
                fill="none"
                stroke="#A4A8E1"
                strokeWidth="0.5"
                strokeOpacity="0.5"
                animate={{
                  strokeOpacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }}
              />

              {/* User Icon */}
              <text
                x="200"
                y="98"
                textAnchor="middle"
                fill="#F4F5F8"
                fontSize="20"
                style={{ 
                  transform: `rotate(${-user.angle}deg)`,
                  transformOrigin: '200px 100px'
                }}
              >
                {user.avatar}
              </text>
              
              {/* User name tag */}
              <motion.g
                style={{ 
                  transform: `rotate(${-user.angle}deg)`,
                  transformOrigin: '200px 100px'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <rect
                  x="175"
                  y="117" 
                  width="50"
                  height="16"
                  rx="8"
                  fill="#1A1B1D"
                  stroke="#5E6AD2"
                  strokeWidth="0.5"
                  strokeOpacity="0.5"
                />
                <text
                  x="200"
                  y="128"
                  textAnchor="middle"
                  fill="#A4A8E1"
                  fontSize="8"
                >
                  {user.name}
                </text>
              </motion.g>

              {/* Status Indicator */}
              <motion.circle
                cx="220"
                cy="85"
                r="6"
                fill={
                  user.status === 'Active' 
                    ? '#22c55e' 
                    : user.status === 'Teaching' 
                      ? '#3b82f6' 
                      : '#eab308'
                }
                filter="url(#subtleGlow)"
                animate={{
                  opacity: [0.8, 1, 0.8],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              />

              {/* Connection Line to Center */}
              <motion.line
                x1="200"
                y1="130"
                x2="200"
                y2="170"
                stroke={user.color}
                strokeWidth="1"
                strokeDasharray="3,3"
                animate={connectionLineAnimation}
              />
              
              {/* Data particles traveling along connection line */}
              <motion.circle
                cx="200"
                cy="130"
                r="2"
                fill="#A4A8E1"
                animate={{
                  y: [130, 170],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              />
            </motion.g>
          </motion.g>
        ))}
      </g>

      {/* Central Connection Lines */}
      <g stroke="#5E6AD2" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.5">
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
          animate={{
            ...connectionLineAnimation,
            strokeDashoffset: [10, 0]
          }}
        />
        <motion.line
          x1="155"
          y1="155"
          x2="245"
          y2="245"
          animate={connectionLineAnimation}
        />
        <motion.line
          x1="155"
          y1="245"
          x2="245"
          y2="155"
          animate={{
            ...connectionLineAnimation,
            strokeDashoffset: [10, 0]
          }}
        />
      </g>

      {/* Data Packets */}
      {[...Array(8)].map((_, i) => (
        <motion.g
          key={`packet-${i}`}
          filter="url(#subtleGlow)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        >
          <motion.circle
            cx={200 + Math.cos((i * Math.PI) / 4) * (40 + (i % 3) * 10)}
            cy={200 + Math.sin((i * Math.PI) / 4) * (40 + (i % 3) * 10)}
            r="3"
            fill="#5E6AD2"
          />
        </motion.g>
      ))}

      {/* Particle Effects */}
      {[...Array(12)].map((_, i) => (
        <motion.circle
          key={`particle-${i}`}
          r="1.5"
          fill={`hsl(${240 + i * 5}, 70%, 80%)`}
          initial={{ 
            cx: 200,
            cy: 200,
            opacity: 0
          }}
          animate={{
            cx: 200 + Math.cos((i * Math.PI) / 6) * (70 + (i % 4) * 30),
            cy: 200 + Math.sin((i * Math.PI) / 6) * (70 + (i % 4) * 30),
            opacity: [0, 0.6, 0],
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
      
      {/* Edge glow effects */}
      <motion.circle
        cx="100"
        cy="100"
        r="50"
        fill="url(#centerGlow)"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.circle
        cx="300"
        cy="300"
        r="60"
        fill="url(#centerGlow)"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.svg>
  );
};

export default CommunityAnimation;
