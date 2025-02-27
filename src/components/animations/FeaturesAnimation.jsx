import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Rocket, ArrowRight } from 'lucide-react';

const FeaturesAnimation = ({ isDarkTheme = true }) => {
  const features = [
    {
      Icon: Brain,
      title: "Smart Learning",
      description: "AI-powered personalized learning path",
      iconColor: "#A4A8E1"
    },
    {
      Icon: Target,
      title: "Focus Practice",
      description: "Target specific skills and track progress",
      iconColor: "#8287D7"
    },
    {
      Icon: Rocket,
      title: "Quick Progress",
      description: "Achieve fluency faster with adaptive lessons",
      iconColor: "#5E6AD2"
    }
  ];

  return (
    <section
      className={`py-16 transition-colors duration-300 relative overflow-hidden ${
        isDarkTheme
          ? 'bg-black'
          : 'bg-white'
      }`}
    >
      {/* Background patterns and lighting effects */}
      {isDarkTheme && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#08090A] to-[#1A1B1D] opacity-80"></div>
          
          {/* Grid pattern */}
          <svg 
            width="100%" 
            height="100%" 
            className="absolute inset-0 z-0 opacity-20"
          >
            <pattern 
              id="grid-pattern" 
              width="40" 
              height="40" 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d="M 40 0 L 0 0 0 40" 
                fill="none" 
                stroke="#5E6AD2" 
                strokeOpacity="0.2" 
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
          
          {/* Light orbs */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-500/5 filter blur-2xl"
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-500/10 filter blur-3xl"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </>
      )}

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className={`text-3xl font-bold mb-4 ${
              isDarkTheme ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Smarter Way to Learn
          </motion.h2>
          <motion.p 
            className={`text-lg ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Experience language learning powered by artificial intelligence
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className={`relative p-6 rounded-xl ${
                isDarkTheme 
                  ? 'bg-gray-900/80 backdrop-blur-md border border-gray-800/50' 
                  : 'bg-white hover:bg-gray-50'
              } shadow-lg transition-all duration-300 group`}
            >
              {/* Card glow effect on hover */}
              {isDarkTheme && (
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{}}
                  whileHover={{}}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-600/10 to-brand-500/10 rounded-xl" />
                  <div className="absolute inset-0 rounded-xl ring-1 ring-brand-500/20" />
                </motion.div>
              )}
              
              {/* Icon */}
              <motion.div
                className="mb-4 relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isDarkTheme ? 'bg-gray-800' : 'bg-purple-100'
                }`}>
                  <motion.div
                    animate={{
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <feature.Icon className={`w-6 h-6 ${
                      isDarkTheme ? `text-${feature.iconColor}` : 'text-purple-600'
                    }`} />
                  </motion.div>
                </div>
                
                {/* Icon background glow */}
                {isDarkTheme && (
                  <motion.div 
                    className="absolute inset-0 rounded-lg bg-brand-500/10 filter blur-md -z-10"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [0.8, 1.1, 0.8]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  />
                )}
              </motion.div>

              {/* Content */}
              <h3 className={`text-xl font-semibold mb-2 ${
                isDarkTheme ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={`${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>

              {/* Learn More Link */}
              <motion.div
                className={`mt-4 inline-flex items-center ${
                  isDarkTheme ? 'text-brand-300' : 'text-purple-600'
                } group cursor-pointer`}
                whileHover={{ x: 5 }}
              >
                Learn more
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.div>
              </motion.div>
              
              {/* Card corner accent */}
              {isDarkTheme && (
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-4 h-4 transform translate-x-2 -translate-y-2 rotate-45 bg-brand-500/20" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Interactive Feature Connections */}
        <div className="mt-16 relative">
          <svg 
            width="100%" 
            height="200"
            className="hidden md:block"
            viewBox="0 0 1000 200"
          >
            {/* Connection lines between features */}
            {isDarkTheme && (
              <>
                <motion.path
                  d="M200,30 C350,90 650,90 800,30"
                  fill="none"
                  stroke="#5E6AD2"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  strokeOpacity="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.path
                  d="M200,170 C350,110 650,110 800,170"
                  fill="none"
                  stroke="#5E6AD2"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  strokeOpacity="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    delay: 0.5,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Interactive nodes */}
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <motion.g key={`node-${index}`}>
                    <motion.circle
                      cx={200 + (index * 150)}
                      cy={100}
                      r="5"
                      fill="#5E6AD2"
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        y: [0, -5, 0, 5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                    />
                    <motion.circle
                      cx={200 + (index * 150)}
                      cy={100}
                      r="10"
                      fill="#5E6AD2"
                      opacity="0.2"
                      animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                    />
                  </motion.g>
                ))}
              </>
            )}
          </svg>
          
          {/* Mobile illustration */}
          <div className="md:hidden flex justify-center mt-8">
            <motion.div
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`h-16 w-1 ${isDarkTheme ? 'bg-gradient-to-b from-brand-500 to-transparent' : 'bg-purple-500'}`}
            />
          </div>
        </div>
        
        {/* Stats or additional feature info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
          {['40+ Languages', '10M+ Users', '500+ Lessons', '24/7 Support'].map((stat, index) => (
            <motion.div
              key={`stat-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (index * 0.1) }}
              className={`text-center p-4 rounded-lg ${
                isDarkTheme 
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/30' 
                  : 'bg-gray-50'
              }`}
            >
              <motion.p
                className={`text-lg font-medium ${
                  isDarkTheme ? 'text-white' : 'text-gray-900'
                }`}
                animate={{
                  y: [0, -2, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              >
                {stat}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesAnimation;
