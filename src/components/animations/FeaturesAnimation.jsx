import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Rocket, ArrowRight } from 'lucide-react';

const FeaturesAnimation = ({ isDarkTheme }) => {
  const features = [
    {
      Icon: Brain,
      title: "Smart Learning",
      description: "AI-powered personalized learning path"
    },
    {
      Icon: Target,
      title: "Focus Practice",
      description: "Target specific skills and track progress"
    },
    {
      Icon: Rocket,
      title: "Quick Progress",
      description: "Achieve fluency faster with adaptive lessons"
    }
  ];

  return (
    // Use a gradient if dark theme, or white if light theme
    <section
      className={`py-16 transition-colors duration-300 ${
        isDarkTheme
          ? 'bg-gradient-to-br from-[#08090A] to-[#1A1B1D]'
          : 'bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
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
                  ? 'bg-[#1A1B1D] hover:bg-[#2C2D2F]' 
                  : 'bg-white hover:bg-gray-50'
              } shadow-lg transition-all duration-300 group`}
            >
              {/* Highlight Overlay (Optional) */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <motion.div
                className="mb-4 relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isDarkTheme ? 'bg-purple-900' : 'bg-purple-100'
                }`}>
                  <feature.Icon className={`w-6 h-6 ${
                    isDarkTheme ? 'text-purple-300' : 'text-purple-600'
                  }`} />
                </div>
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
                className="mt-4 inline-flex items-center text-purple-600 dark:text-purple-400 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                Learn more
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesAnimation;
