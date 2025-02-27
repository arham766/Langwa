import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const LanguageLearningAnimation = ({ isDarkTheme = true }) => {
  const languages = [
    { text: 'Hello', lang: 'English', icon: <Globe className="w-4 h-4" /> },
    { text: 'Bonjour', lang: 'French', icon: <Globe className="w-4 h-4" /> },
    { text: 'Hola', lang: 'Spanish', icon: <Globe className="w-4 h-4" /> },
    { text: '你好', lang: 'Chinese', icon: <Globe className="w-4 h-4" /> },
    { text: 'こんにちは', lang: 'Japanese', icon: <Globe className="w-4 h-4" /> }
  ];

  // Colors for light/dark mode shapes
  const bgColorLight = '#faf5ff';
  const bgColorDark = '#08090A';    // Start of gradient
  const textColorLight = '#1f2937';
  const textColorDark = '#e2e8f0';
  const accentColorDark = '#1A1B1D'; // End of gradient

  return (
    <div className="w-full max-w-md mx-auto md:max-w-lg">
      <motion.svg
        viewBox="0 0 400 300"
        className="w-full h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <defs>
          {/* Dark gradient background */}
          <linearGradient id="darkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#08090A" />
            <stop offset="100%" stopColor="#1A1B1D" />
          </linearGradient>

          {/* Brand gradient for cards and elements */}
          <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5E6AD2" />
            <stop offset="100%" stopColor="#4B54AC" />
          </linearGradient>

          {/* Card gradient inside the language bars */}
          <linearGradient id="cardGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDarkTheme ? '#252529' : '#f5f3ff'} />
            <stop offset="100%" stopColor={isDarkTheme ? '#1E1E20' : '#ede9fe'} />
          </linearGradient>

          {/* Glow filter for card highlights */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor="#5E6AD2" floodOpacity="0.3" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="shadow" />
            <feComposite in="SourceGraphic" in2="shadow" operator="over" />
          </filter>

          {/* Ambient glow for background */}
          <radialGradient id="ambientGlow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
            <stop offset="0%" stopColor="#5E6AD2" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#5E6AD2" stopOpacity="0" />
          </radialGradient>

          {/* Glow for particles */}
          <radialGradient id="particleGlow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
            <stop offset="0%" stopColor="#A4A8E1" stopOpacity="1" />
            <stop offset="100%" stopColor="#5E6AD2" stopOpacity="0" />
          </radialGradient>

          {/* For subtle grid lines */}
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

        {/* Background */}
        <rect
          width="400"
          height="300"
          fill={isDarkTheme ? "url(#darkGradient)" : bgColorLight}
        />
        
        {/* Grid overlay */}
        <rect 
          width="400" 
          height="300" 
          fill="url(#gridPattern)" 
          opacity="0.3"
        />

        {/* Ambient glow */}
        <motion.circle
          cx="200"
          cy="150"
          r="150"
          fill="url(#ambientGlow)"
          animate={{
            r: [150, 160, 150],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Learning Interface Card */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Card Container */}
          <rect
            x="50"
            y="40"
            width="300"
            height="220"
            rx="16"
            fill={isDarkTheme ? '#1A1B1D' : '#ffffff'}
            filter="url(#glow)"
          />
          
          {/* Card inner stroke for enhanced effect */}
          <rect
            x="50"
            y="40"
            width="300"
            height="220"
            rx="16"
            fill="none"
            stroke={isDarkTheme ? '#5E6AD2' : '#7c3aed'}
            strokeOpacity="0.3"
            strokeWidth="1"
          />

          {/* Progress Bar Header */}
          <g transform="translate(70, 60)">
            <text
              fill={isDarkTheme ? '#A4A8E1' : textColorLight}
              fontSize="14"
              fontFamily="system-ui"
              fontWeight="500"
            >
              Learning Progress
            </text>
            <rect
              x="0"
              y="24"
              width="260"
              height="4"
              rx="2"
              fill={isDarkTheme ? '#252529' : '#e5e7eb'}
            />
            <motion.rect
              x="0"
              y="24"
              height="4"
              rx="2"
              fill="url(#brandGradient)"
              initial={{ width: 0 }}
              animate={{ width: 180 }}
              transition={{
                duration: 2,
                ease: "easeInOut"
              }}
            />
            
            {/* Animated progress indicator */}
            <motion.circle
              cx="180"
              cy="26"
              r="6"
              fill="#5E6AD2"
              filter="url(#glow)"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{
                duration: 0.5,
                delay: 2,
                ease: "easeOut"
              }}
            />
          </g>

          {/* Language Cards */}
          <g transform="translate(70, 100)">
            {languages.map((lang, index) => (
              <motion.g
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: [0, 1, 1, 0], 
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.6,
                  repeat: Infinity,
                  repeatDelay: languages.length * 0.6
                }}
              >
                <rect
                  x="0"
                  y={index * 32}
                  width="260"
                  height="28"
                  rx="8"
                  fill="url(#cardGradient)"
                />
                
                {/* Card highlight/glow on edge */}
                <rect
                  x="0"
                  y={index * 32}
                  width="260"
                  height="28"
                  rx="8"
                  fill="none"
                  stroke="#5E6AD2"
                  strokeOpacity="0.3"
                  strokeWidth="1"
                />
                
                <text
                  x="36"
                  y={index * 32 + 19}
                  fill={isDarkTheme ? '#A4A8E1' : textColorLight}
                  fontSize="14"
                  fontFamily="system-ui"
                >
                  {lang.text}
                </text>
                
                {/* Language icon with subtle glow */}
                <circle
                  cx="20"
                  cy={index * 32 + 14}
                  r="12"
                  fill={isDarkTheme ? '#252529' : '#f3e8ff'}
                />
                <foreignObject
                  x="16"
                  y={index * 32 + 10}
                  width="8"
                  height="8"
                  className={isDarkTheme ? 'text-brand-300' : 'text-brand-600'}
                >
                  {lang.icon}
                </foreignObject>
                
                <text
                  x="220"
                  y={index * 32 + 19}
                  fill={isDarkTheme ? '#8287D7' : '#6b7280'}
                  fontSize="12"
                  fontFamily="system-ui"
                >
                  {lang.lang}
                </text>
              </motion.g>
            ))}
          </g>

          {/* Decorative Circles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.circle
              key={i}
              r={i % 3 === 0 ? 3 : 2}
              fill={isDarkTheme ? `rgba(${164 + i * 5}, ${168 + i * 3}, ${225}, ${0.6 + i * 0.03})` : '#7c3aed'}
              initial={{
                x: 200 + Math.cos(i * Math.PI / 6) * 120,
                y: 150 + Math.sin(i * Math.PI / 6) * 120,
                opacity: 0
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Pulsing particles with trails */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.g key={`particle-${i}`}>
              <motion.circle
                cx={75 + i * 50}
                cy={250}
                r="4"
                fill="url(#particleGlow)"
                animate={{
                  y: [250, 230, 250],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 2 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
              <motion.path
                d={`M${75 + i * 50},250 Q${75 + i * 50 + 10},240 ${75 + i * 50},230`}
                stroke="#5E6AD2"
                strokeOpacity="0.3"
                strokeWidth="1"
                fill="none"
                animate={{
                  opacity: [0, 0.3, 0],
                  pathLength: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            </motion.g>
          ))}

          {/* Floating Words */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.text
              x="330"
              y="40"
              fill={isDarkTheme ? '#8287D7' : '#6b7280'}
              fontSize="12"
              fontFamily="system-ui"
              transform="rotate(15, 330, 40)"
              animate={{
                opacity: [0.4, 0.8, 0.4],
                y: [40, 35, 40]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Learn
            </motion.text>
            <motion.text
              x="70"
              y="280"
              fill={isDarkTheme ? '#8287D7' : '#6b7280'}
              fontSize="12"
              fontFamily="system-ui"
              transform="rotate(-10, 70, 280)"
              animate={{
                opacity: [0.4, 0.8, 0.4],
                y: [280, 275, 280]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              Practice
            </motion.text>
            <motion.text
              x="280"
              y="270"
              fill={isDarkTheme ? '#8287D7' : '#6b7280'}
              fontSize="12"
              fontFamily="system-ui"
              transform="rotate(5, 280, 270)"
              animate={{
                opacity: [0.4, 0.8, 0.4],
                y: [270, 265, 270]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              Master
            </motion.text>
          </motion.g>
          
          {/* UI Details and accents */}
          <motion.circle
            cx="320"
            cy="260"
            r="12"
            fill={isDarkTheme ? '#252529' : '#f3e8ff'}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.circle
            cx="320"
            cy="260"
            r="6"
            fill="url(#brandGradient)"
          />
        </motion.g>
        
        {/* Connection lines */}
        <motion.g opacity="0.2">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1="200"
              y1="150"
              x2={200 + Math.cos(i * Math.PI / 1.5) * 90}
              y2={150 + Math.sin(i * Math.PI / 1.5) * 90}
              stroke="#5E6AD2"
              strokeDasharray="3,3"
              animate={{
                strokeDashoffset: [0, 6]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.3
              }}
            />
          ))}
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default LanguageLearningAnimation;
