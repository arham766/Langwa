import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeaturesAnimation = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: '🎯',
      title: 'Achievement System',
      description: 'Track your progress with intelligent metrics and earn rewards as you learn',
      detail: 'Set personal goals, track daily streaks, and earn badges for consistent learning. Our AI adapts to your pace and celebrates your milestones.',
      gradient: 'feature1Gradient',
      delay: 0,
      color: '#a855f7'
    },
    {
      icon: '📚',
      title: 'Smart Resources',
      description: 'AI-curated learning materials tailored to your needs',
      detail: 'Access personalized lessons, interactive exercises, and cultural insights. Our AI continuously adapts content to match your learning style.',
      gradient: 'feature2Gradient',
      delay: 0.2,
      color: '#9333ea'
    },
    {
      icon: '⚡',
      title: 'Focused Practice',
      description: 'Personalized exercises that adapt to your learning curve',
      detail: 'Practice with native speakers, receive instant feedback, and focus on areas where you need the most improvement. Real-time pronunciation analysis helps perfect your accent.',
      gradient: 'feature3Gradient',
      delay: 0.4,
      color: '#7e22ce'
    }
  ];

  return (
    <div className="w-full bg-gray-900 min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row items-center gap-8 lg:gap-12">
          {/* Animation Container */}
          <div className="w-full xl:w-1/2 flex justify-center relative">
            {/* Background Blur Effect */}
            <motion.div
              className="absolute inset-0 bg-purple-600 opacity-10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.svg
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] relative z-10"
              initial="initial"
              animate="animate"
            >
              <defs>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </radialGradient>

                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feFlood floodColor="#a855f7" floodOpacity="0.3" />
                  <feComposite in2="blur" operator="in" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Animated Background */}
              <motion.circle
                cx="200"
                cy="200"
                r="180"
                fill="url(#centerGlow)"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Center Element */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.circle
                  cx="200"
                  cy="200"
                  r="60"
                  fill="#a855f7"
                  filter="url(#glow)"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    scale: isHovered ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />

                <motion.text
                  x="200"
                  y="190"
                  textAnchor="middle"
                  fill="white"
                  fontSize="22"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  SMART
                </motion.text>
                <motion.text
                  x="200"
                  y="215"
                  textAnchor="middle"
                  fill="white"
                  fontSize="18"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  LEARNING
                </motion.text>
              </motion.g>

              {/* Feature Nodes */}
              {features.map((feature, index) => {
                const angle = (index * 2 * Math.PI) / features.length - Math.PI / 2;
                const x = 200 + Math.cos(angle) * 120;
                const y = 200 + Math.sin(angle) * 120;

                return (
                  <motion.g
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: feature.delay }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                  >
                    <motion.line
                      x1="200"
                      y1="200"
                      x2={x}
                      y2={y}
                      stroke={feature.color}
                      strokeWidth="2"
                      strokeDasharray="4"
                      initial={{ pathLength: 0 }}
                      animate={{ 
                        pathLength: 1,
                        stroke: activeFeature === index ? '#fff' : feature.color
                      }}
                      transition={{ duration: 1, delay: feature.delay }}
                    />

                    <motion.circle
                      cx={x}
                      cy={y}
                      r="40"
                      fill={feature.color}
                      filter="url(#glow)"
                      whileHover={{ scale: 1.1 }}
                      animate={{
                        scale: activeFeature === index ? 1.15 : 1,
                        fill: activeFeature === index ? '#fff' : feature.color
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />

                    <motion.text
                      x={x}
                      y={y - 5}
                      textAnchor="middle"
                      fill={activeFeature === index ? feature.color : 'white'}
                      fontSize="20"
                    >
                      {feature.icon}
                    </motion.text>

                    <motion.text
                      x={x}
                      y={y + 15}
                      textAnchor="middle"
                      fill={activeFeature === index ? feature.color : 'white'}
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {feature.title}
                    </motion.text>
                  </motion.g>
                );
              })}

              {/* Enhanced Particle Effect */}
              {[...Array(12)].map((_, i) => (
                <motion.circle
                  key={`particle-${i}`}
                  r="2"
                  fill="#d8b4fe"
                  filter="url(#glow)"
                  initial={{
                    cx: 200,
                    cy: 200,
                    opacity: 0,
                  }}
                  animate={{
                    cx: 200 + Math.cos((i * Math.PI) / 6) * 160,
                    cy: 200 + Math.sin((i * Math.PI) / 6) * 160,
                    opacity: [0, 0.8, 0],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </motion.svg>
          </div>

          {/* Content Container */}
          <div className="w-full xl:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 px-4 sm:px-6 md:px-8"
            >
              <div className="text-center xl:text-left">
                <motion.h2 
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Intelligent Language Learning
                </motion.h2>
                <motion.p 
                  className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto xl:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Experience a revolutionary way to master languages with our AI-powered
                  platform. Smart learning adapts to your pace, while focused practice
                  ensures rapid progress.
                </motion.p>
              </div>

              {/* Interactive Feature Cards */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className={`p-6 rounded-xl transition-colors duration-300 cursor-pointer
                      ${activeFeature === index ? 'bg-purple-900 bg-opacity-50' : 'hover:bg-purple-900 hover:bg-opacity-30'}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: feature.delay + 0.5 }}
                    onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                  >
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                      <span className="text-3xl">{feature.icon}</span>
                      <div className="text-center lg:text-left">
                        <h3 className="text-white font-semibold text-xl mb-2">
                          {feature.title}
                        </h3>
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={activeFeature === index ? 'detail' : 'description'}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-gray-300"
                          >
                            {activeFeature === index ? feature.detail : feature.description}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced CTA Button */}
              <motion.div
                className="flex justify-center xl:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  className="group relative overflow-hidden rounded-full bg-purple-600 px-8 py-4 text-white font-semibold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-purple-500"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative flex items-center gap-2">
                    Start Learning Now
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesAnimation;
