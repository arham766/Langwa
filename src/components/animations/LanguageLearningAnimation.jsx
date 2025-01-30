import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Book, Target, Check, Star, ChevronRight } from 'lucide-react';

const LanguageLearningAnimation = ({ isDarkTheme }) => {
  const languages = [
    { text: 'Hello', lang: 'English', icon: <Globe className="w-4 h-4" /> },
    { text: 'Bonjour', lang: 'French', icon: <Globe className="w-4 h-4" /> },
    { text: 'Hola', lang: 'Spanish', icon: <Globe className="w-4 h-4" /> },
    { text: '你好', lang: 'Chinese', icon: <Globe className="w-4 h-4" /> },
    { text: 'こんにちは', lang: 'Japanese', icon: <Globe className="w-4 h-4" /> }
  ];

  const bgColor = isDarkTheme ? '#1a1a2e' : '#faf5ff';
  const textColor = isDarkTheme ? '#e2e8f0' : '#1f2937';
  const accentColor = isDarkTheme ? '#9333ea' : '#7c3aed';

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
          <linearGradient id="cardGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDarkTheme ? '#2d1b69' : '#f5f3ff'} />
            <stop offset="100%" stopColor={isDarkTheme ? '#1f1147' : '#ede9fe'} />
          </linearGradient>
          
          <filter id="softShadow">
            <feDropShadow 
              dx="0" 
              dy="2" 
              stdDeviation="3" 
              floodColor={isDarkTheme ? '#000' : '#6b21a8'} 
              floodOpacity="0.15"
            />
          </filter>

          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path 
              d="M 40 0 L 0 0 0 40" 
              fill="none" 
              stroke={isDarkTheme ? '#ffffff10' : '#00000010'} 
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        {/* Background with subtle grid */}
        <rect width="400" height="300" fill={bgColor} />
        <rect width="400" height="300" fill="url(#grid)" />

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
            fill={isDarkTheme ? '#1f2937' : 'white'}
            filter="url(#softShadow)"
          />

          {/* Progress Bar Header */}
          <g transform="translate(70, 60)">
            <text
              fill={textColor}
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
              fill={isDarkTheme ? '#374151' : '#e5e7eb'}
            />
            <motion.rect
              x="0"
              y="24"
              height="4"
              rx="2"
              fill={accentColor}
              initial={{ width: 0 }}
              animate={{ width: 180 }}
              transition={{
                duration: 2,
                ease: "easeInOut"
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
                <text
                  x="36"
                  y={index * 32 + 19}
                  fill={textColor}
                  fontSize="14"
                  fontFamily="system-ui"
                >
                  {lang.text}
                </text>
                <text
                  x="220"
                  y={index * 32 + 19}
                  fill={isDarkTheme ? '#9ca3af' : '#6b7280'}
                  fontSize="12"
                  fontFamily="system-ui"
                >
                  {lang.lang}
                </text>
              </motion.g>
            ))}
          </g>

          {/* Decorative Elements */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.circle
              key={i}
              r="2"
              fill={accentColor}
              initial={{
                x: 200 + Math.cos(i * Math.PI/4) * 120,
                y: 150 + Math.sin(i * Math.PI/4) * 120,
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Writing Elements */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
          >
            <text
              x="330"
              y="40"
              fill={isDarkTheme ? '#9ca3af' : '#6b7280'}
              fontSize="12"
              fontFamily="system-ui"
              transform="rotate(15, 330, 40)"
            >
              Learn
            </text>
            <text
              x="70"
              y="280"
              fill={isDarkTheme ? '#9ca3af' : '#6b7280'}
              fontSize="12"
              fontFamily="system-ui"
              transform="rotate(-10, 70, 280)"
            >
              Practice
            </text>
            <text
              x="280"
              y="270"
              fill={isDarkTheme ? '#9ca3af' : '#6b7280'}
              fontSize="12"
              fontFamily="system-ui"
              transform="rotate(5, 280, 270)"
            >
              Master
            </text>
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default LanguageLearningAnimation;
