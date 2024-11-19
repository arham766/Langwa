import React from 'react';
import { motion } from 'framer-motion';

const MobileLearningAnimation = () => {
  return (
    <motion.svg
      viewBox="0 0 800 600"
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Circles */}
      <motion.circle
        cx="400"
        cy="300"
        r="250"
        fill="#374151"
        opacity="0.6"
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
        fill="#4B5563"
        opacity="0.4"
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

      {/* Mobile Phone */}
      <motion.g
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Phone Frame */}
        <rect
          x="300"
          y="100"
          width="200"
          height="400"
          rx="25"
          fill="#9333EA"
        />
        
        {/* Phone Screen */}
        <rect
          x="310"
          y="110"
          width="180"
          height="380"
          rx="20"
          fill="white"
        />

        {/* Status Bar */}
        <rect
          x="310"
          y="110"
          width="180"
          height="30"
          rx="20"
          fill="#F3E8FF"
        />
        <text
          x="325"
          y="130"
          fontSize="14"
          fill="#6B21A8"
        >
          9:41
        </text>

        {/* Navigation Bar */}
        <rect
          x="320"
          y="150"
          width="160"
          height="40"
          rx="20"
          fill="#F3E8FF"
        />
        <text x="335" y="175" fontSize="14" fill="#6B21A8">Learn</text>
        <text x="385" y="175" fontSize="14" fill="#6B21A8">Practice</text>
        <text x="445" y="175" fontSize="14" fill="#6B21A8">Profile</text>

        {/* Daily Progress */}
        <text
          x="335"
          y="220"
          fontSize="20"
          fill="#6B21A8"
          fontWeight="bold"
        >
          Daily Progress
        </text>

        {/* Progress Bar */}
        <rect
          x="335"
          y="240"
          width="130"
          height="10"
          rx="5"
          fill="#F3E8FF"
        />
        <motion.rect
          x="335"
          y="240"
          width="0"
          height="10"
          rx="5"
          fill="#9333EA"
          animate={{ width: 90 }}
          transition={{
            duration: 1.5,
            ease: "easeOut"
          }}
        />

        {/* Vocabulary Card */}
        <rect
          x="335"
          y="270"
          width="130"
          height="70"
          rx="15"
          fill="white"
          stroke="#9333EA"
          strokeWidth="2"
        />
        <text
          x="350"
          y="300"
          fontSize="16"
          fill="#6B21A8"
          fontWeight="bold"
        >
          Vocabulary
        </text>
        <text
          x="350"
          y="320"
          fontSize="14"
          fill="#6B21A8"
        >
          Progress: 45%
        </text>
      </motion.g>

      {/* Language Bubbles */}
      <motion.g>
        {/* Bubble A */}
        <motion.circle
          cx="200"
          cy="250"
          r="35"
          fill="#F3E8FF"
          opacity="0.8"
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <text
          x="200"
          y="260"
          fontSize="20"
          fill="#6B21A8"
          textAnchor="middle"
        >
          A
        </text>

        {/* Bubble B */}
        <motion.circle
          cx="600"
          cy="350"
          r="35"
          fill="#F3E8FF"
          opacity="0.8"
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
        <text
          x="600"
          y="360"
          fontSize="20"
          fill="#6B21A8"
          textAnchor="middle"
        >
          B
        </text>
      </motion.g>

      {/* Small Decorative Circle */}
      <motion.circle
        cx="500"
        cy="200"
        r="10"
        fill="#9333EA"
        opacity="0.6"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.svg>
  );
};

export default MobileLearningAnimation;
