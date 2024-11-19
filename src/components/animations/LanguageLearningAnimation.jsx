import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const LanguageLearningAnimation = () => {
  const floatingAnimation = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const languages = [
    { text: 'Hello', lang: 'English', emoji: '🇬🇧' },
    { text: 'Bonjour', lang: 'French', emoji: '🇫🇷' },
    { text: 'Hola', lang: 'Spanish', emoji: '🇪🇸' },
    { text: '你好', lang: 'Chinese', emoji: '🇨🇳' },
    { text: 'こんにちは', lang: 'Japanese', emoji: '🇯🇵' },
  ];

  return (
    <div className="w-full max-w-lg mx-auto md:max-w-xl lg:max-w-2xl flex justify-center items-center">
      <motion.svg
        viewBox="0 0 800 600"
        className="w-full h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Enhanced Definitions */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#7e22ce', stopOpacity: 0.15 }} />
            <stop offset="50%" style={{ stopColor: '#9333ea', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#7e22ce', stopOpacity: 0.15 }} />
          </linearGradient>

          <linearGradient id="deviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#7e22ce', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#6b21a8', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="particleGradient">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* Enhanced Background */}
        <rect x="0" y="0" width="800" height="600" fill="url(#bgGradient)" />

        {/* Improved Animated Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.circle
            key={i}
            r={Math.random() * 5 + 2}
            fill="url(#particleGradient)"
            filter="url(#glow)"
            initial={{
              x: Math.random() * 800,
              y: Math.random() * 600,
              opacity: Math.random() * 0.6 + 0.4,
            }}
            animate={{
              x: Math.random() * 800,
              y: Math.random() * 600,
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Main Container Group */}
        <motion.g transform="translate(400, 300)">
          {/* Enhanced Device Group */}
          <motion.g
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: 'spring' }}
          >
            {/* Laptop Base with Enhanced Shadow */}
            <motion.path
              d="M-180 90 L180 90 L150 140 L-150 140 Z"
              fill="url(#deviceGradient)"
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* Enhanced Laptop Screen */}
            <motion.g
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {/* Screen Frame with Better Shadow */}
              <motion.rect
                x="-150"
                y="-120"
                width="300"
                height="200"
                rx="12"
                fill="url(#deviceGradient)"
                filter="url(#glow)"
              />

              {/* Enhanced Screen Content */}
              <rect
                x="-140"
                y="-110"
                width="280"
                height="180"
                rx="10"
                fill="#ffffff"
                stroke="#7e22ce"
                strokeWidth="2"
              />

              {/* Improved Learning Content */}
              <motion.g>
                {/* Enhanced Progress Bar */}
                <rect 
                  x="-120" 
                  y="-90" 
                  width="240" 
                  height="8" 
                  rx="4" 
                  fill="#f3e8ff" 
                />
                <motion.rect
                  x="-120"
                  y="-90"
                  height="8"
                  rx="4"
                  fill="#7e22ce"
                  initial={{ width: 0 }}
                  animate={{ width: 240 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Enhanced Language Cards */}
                {languages.map((lang, index) => (
                  <motion.g
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [-20, 0, 20],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.6,
                      ease: 'easeInOut',
                    }}
                  >
                    {/* Card Background with Gradient */}
                    <rect
                      x="-100"
                      y="-50"
                      width="200"
                      height="50"
                      rx="8"
                      fill={`hsl(${280 + index * 10}, 75%, ${90 - index * 5}%)`}
                      stroke="#6b21a8"
                      strokeWidth="1.5"
                    />
                    
                    {/* Language Text */}
                    <text
                      x="-80"
                      y="-25"
                      fill="#4a044e"
                      fontSize="18"
                      fontWeight="bold"
                      fontFamily="Arial"
                    >
                      {lang.text}
                    </text>
                    
                    {/* Language Name */}
                    <text
                      x="60"
                      y="-25"
                      fill="#6b21a8"
                      fontSize="14"
                      fontFamily="Arial"
                    >
                      {lang.lang} {lang.emoji}
                    </text>
                  </motion.g>
                ))}
              </motion.g>
            </motion.g>

            {/* Enhanced Achievement Badges */}
            {[0, 120, 240].map((angle, index) => (
              <motion.g
                key={index}
                transform={`rotate(${angle}) translate(200, 0)`}
                {...floatingAnimation}
                transition={{
                  delay: index * 0.3,
                }}
              >
                <circle
                  r="22"
                  fill="url(#deviceGradient)"
                  filter="url(#glow)"
                  stroke="#6b21a8"
                  strokeWidth="2"
                />
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="24"
                >
                  {['🌟', '📚', '🎯'][index]}
                </text>
              </motion.g>
            ))}

            {/* Enhanced Progress Ring */}
            <motion.g transform="translate(150, -100)">
              <circle r="28" fill="#f3e8ff" stroke="#e9d5ff" strokeWidth="4" />
              <motion.circle
                r="28"
                fill="none"
                stroke="#7e22ce"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="175.93"
                initial={{ strokeDashoffset: 175.93 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.text
                x="0"
                y="0"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#4a044e"
                fontSize="14"
                fontWeight="bold"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              >
                100%
              </motion.text>
            </motion.g>
          </motion.g>
        </motion.g>

        {/* Enhanced Decorative Elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.circle
            key={i}
            r="5"
            fill="#7e22ce"
            filter="url(#glow)"
            initial={{
              x: Math.random() * 800,
              y: Math.random() * 600,
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
};

export default LanguageLearningAnimation;
