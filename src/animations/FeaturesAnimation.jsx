import React from 'react';
import { motion } from 'framer-motion';

const FeaturesAnimation = () => {
  // Feature data
  const features = [
    {
      icon: '📚',
      title: 'Resources',
      description: 'Comprehensive learning materials',
      gradient: 'feature1Gradient',
      delay: 0,
    },
    {
      icon: '🎯',
      title: 'Practice',
      description: 'Interactive exercises',
      gradient: 'feature2Gradient',
      delay: 0.2,
    },
    {
      icon: '🏆',
      title: 'Awards',
      description: 'Achievement system',
      gradient: 'feature3Gradient',
      delay: 0.4,
    },
    {
      icon: '📈',
      title: 'Progress',
      description: 'Track your journey',
      gradient: 'feature4Gradient',
      delay: 0.6,
    },
  ];

  return (
    <div
      className="relative w-96 h-96" // Adjust the size as needed
      style={{
        transform: 'translate(0, 0)', // Modify this to reposition the entire animation
      }}
    >
      <motion.svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        initial="initial"
        animate="animate"
      >
        {/* Definitions */}
        <defs>
          {/* Central Gradient */}
          <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#faf5ff', stopOpacity: 1 }}>
              <animate
                attributeName="stop-color"
                values="#faf5ff;#f3e8ff;#faf5ff"
                dur="5s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" style={{ stopColor: '#e9d5ff', stopOpacity: 1 }}>
              <animate
                attributeName="stop-color"
                values="#e9d5ff;#d8b4fe;#e9d5ff"
                dur="5s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Feature Gradients */}
          <linearGradient id="feature1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#c084fc', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="feature2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="feature3Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#7e22ce', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="feature4Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#7e22ce', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#6b21a8', stopOpacity: 1 }} />
          </linearGradient>

          {/* Glow Effects */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#f3e8ff" floodOpacity="0.5" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feFlood floodColor="#a855f7" floodOpacity="0.5" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background Pattern */}
        <motion.rect
          x="0"
          y="0"
          width="400"
          height="400"
          fill="url(#centerGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        />

        {/* Background Circles */}
        {[170, 140, 110].map((radius, index) => (
          <motion.circle
            key={`circle-${index}`}
            cx="200"
            cy="200"
            r={radius}
            fill="none"
            stroke={`hsl(280, ${90 - index * 10}%, ${90 - index * 5}%)`}
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 0.3 - index * 0.1,
              scale: 1,
              rotate: 360,
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        ))}

        {/* Central Hub */}
        <motion.g filter="url(#strongGlow)">
          <motion.circle
            cx="200"
            cy="200"
            r="80"
            fill="url(#centerGradient)"
            stroke="#a855f7"
            strokeWidth="4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              duration: 1.5,
              bounce: 0.4,
            }}
          />
          <motion.g>
            <motion.text
              x="200"
              y="190"
              textAnchor="middle"
              fontSize="32"
              fill="#7e22ce"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              🎓
            </motion.text>
            <motion.text
              x="200"
              y="220"
              textAnchor="middle"
              fontFamily="Arial"
              fontWeight="bold"
              fill="#6b21a8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <tspan fontSize="16">SMART</tspan>
              <tspan x="200" y="235" fontSize="14">
                LEARNING
              </tspan>
            </motion.text>
          </motion.g>
        </motion.g>

        {/* Feature Orbitals */}
        <motion.g
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {features.map((feature, index) => {
            const angle = (index * 360) / features.length;
            const x = 200 + 120 * Math.cos((angle * Math.PI) / 180);
            const y = 200 + 120 * Math.sin((angle * Math.PI) / 180);

            return (
              <motion.g
                key={feature.title}
                transform={`rotate(${-angle} ${x} ${y})`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: feature.delay }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.circle
                  cx={x}
                  cy={y}
                  r="45"
                  fill={`url(#${feature.gradient})`}
                  filter="url(#glow)"
                  animate={{
                    r: [45, 48, 45],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
                <text
                  x={x}
                  y={y - 5}
                  textAnchor="middle"
                  fontSize="24"
                  fill="#ffffff"
                  style={{ pointerEvents: 'none' }}
                >
                  {feature.icon}
                </text>
                <text
                  x={x}
                  y={y + 15}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#ffffff"
                  fontFamily="Arial"
                  style={{ pointerEvents: 'none' }}
                >
                  {feature.title}
                </text>

                {/* Progress Ring */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="50"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeDasharray="314"
                  initial={{ strokeDashoffset: 314 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{ opacity: 0.3 }}
                />
              </motion.g>
            );
          })}
        </motion.g>

        {/* Connection Lines */}
        <motion.g filter="url(#glow)">
          <motion.circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1"
            strokeDasharray="5,5"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.5,
              strokeDashoffset: [0, 100],
            }}
            transition={{
              opacity: { duration: 1 },
              strokeDashoffset: {
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          />
        </motion.g>

        {/* Particle Effects */}
        {[...Array(12)].map((_, i) => (
          <motion.circle
            key={`particle-${i}`}
            r="2"
            fill={`hsl(${280 + i * 5}, 90%, 80%)`}
            filter="url(#glow)"
            initial={{
              cx: 200,
              cy: 200,
              opacity: 0,
            }}
            animate={{
              cx: 200 + 120 * Math.cos((i * 30 * Math.PI) / 180),
              cy: 200 + 120 * Math.sin((i * 30 * Math.PI) / 180),
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
};

export default FeaturesAnimation;

