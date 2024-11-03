import React from 'react';
import { motion } from 'framer-motion';

const LanguageLearningAnimation = () => {
  return (
    <div className="w-full max-w-lg mx-auto md:max-w-xl lg:max-w-2xl flex justify-center items-center">
      <motion.svg
        viewBox="0 0 800 600"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Definitions */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f3e8ff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#faf5ff', stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="deviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#7e22ce', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated Background */}
        <motion.rect
          x="0"
          y="0"
          width="800"
          height="600"
          fill="url(#bgGradient)"
          animate={{
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Background Patterns */}
        <g opacity="0.3">
          {[
            { cx: 100, cy: 100, initialR: 20, animateR: 25 },
            { cx: 700, cy: 500, initialR: 15, animateR: 20 },
            { cx: 200, cy: 500, initialR: 25, animateR: 30 }
          ].map((circle, index) => (
            <motion.circle
              key={index}
              cx={circle.cx}
              cy={circle.cy}
              r={circle.initialR}
              fill="#e9d5ff"
              animate={{
                r: [circle.initialR, circle.animateR, circle.initialR]
              }}
              transition={{
                duration: 3 + index,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </g>

        {/* Main Device Group */}
        <motion.g
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          transform="translate(400, 250)"
        >
          {/* Laptop */}
          <g>
            {/* Laptop Screen */}
            <motion.rect
              x="600"
              y="100"
              width="300"
              height="200"
              rx="10"
              fill="url(#deviceGradient)"
              filter="url(#glow)"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <rect x="-140" y="-90" width="280" height="180" rx="5" fill="white" />
            
            {/* Screen Content */}
            <g>
              {/* Progress Bar */}
              <motion.rect
                x="-120"
                y="-70"
                height="10"
                rx="5"
                fill="#f3e8ff"
                initial={{ width: 0 }}
                animate={{ width: 240 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Learning Cards */}
              {[-120, 0].map((x, index) => (
                <motion.rect
                  key={index}
                  x={x}
                  y="-40"
                  width="100"
                  height="30"
                  rx="5"
                  fill={index === 0 ? "#e9d5ff" : "#d8b4fe"}
                  animate={{
                    x: [x, x + 5, x]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                />
              ))}

              {/* Language Text */}
              {[
                { x: -100, text: "Hello", color: "#6b21a8" },
                { x: 0, text: "Hola", color: "#7e22ce" },
                { x: 100, text: "Bonjour", color: "#9333ea" }
              ].map((item, index) => (
                <motion.text
                  key={index}
                  x={item.x}
                  y="20"
                  fontFamily="Arial"
                  fontSize="20"
                  fill={item.color}
                  animate={{
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {item.text}
                </motion.text>
              ))}
            </g>
          </g>

          {/* Laptop Base */}
          <motion.path
            d="M-180 100 L180 100 L150 150 L-150 150 Z"
            fill="url(#deviceGradient)"
            animate={{
              d: [
                "M-180 100 L180 100 L150 150 L-150 150 Z",
                "M-185 100 L185 100 L155 150 L-155 150 Z",
                "M-180 100 L180 100 L150 150 L-150 150 Z"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.g>

        {/* Mobile Device */}
        <motion.g
          transform="translate(600, 250)"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Phone Body */}
          <motion.rect
            x="-40"
            y="-80"
            width="80"
            height="160"
            rx="10"
            fill="url(#deviceGradient)"
            filter="url(#glow)"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <rect x="-35" y="-75" width="70" height="150" rx="8" fill="white" />
          
          {/* App Cards */}
          {[-65, -15, 35].map((y, index) => (
            <motion.rect
              key={index}
              x="-30"
              width="60"
              height="40"
              rx="5"
              fill={["#e9d5ff", "#d8b4fe", "#c084fc"][index]}
              animate={{
                y: [y, y + 5, y]
              }}
              transition={{
                duration: 2 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.g>

        {/* Floating Elements */}
        <motion.g>
          {/* Language Icons */}
          <g transform="translate(200, 150)">
            {["🌍", "📚", "🎯"].map((icon, index) => (
              <motion.text
                key={index}
                x={index * 50}
                fontSize="30"
                fill={["#6b21a8", "#7e22ce", "#9333ea"][index]}
                animate={{
                  y: [0, -10 - index * 5, 0]
                }}
                transition={{
                  duration: 2 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {icon}
              </motion.text>
            ))}
          </g>

          {/* Achievement Stars */}
          {[
            { cx: 100, cy: 430 },
            { cx: 700, cy: 230 }
          ].map((pos, index) => (
            <motion.path
              key={index}
              d="M0 -20 L5 0 L25 5 L10 20 L15 40 L0 30 L-15 40 L-10 20 L-25 5 L-5 0 Z"
              fill="#ffd700"
              filter="url(#glow)"
              transform={`translate(${pos.cx} ${pos.cy})`}
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </motion.g>

        {/* Progress Elements */}
        <motion.g transform="translate(100, 500)">
          <motion.circle
            cx="0"
            cy="0"
            r="30"
            fill="none"
            stroke="#a855f7"
            strokeWidth="4"
            animate={{
              strokeDasharray: ["0 188.5", "188.5 0"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <text
            x="0"
            y="5"
            fontSize="12"
            fill="#6b21a8"
            textAnchor="middle"
          >
            Progress
          </text>
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default LanguageLearningAnimation;
