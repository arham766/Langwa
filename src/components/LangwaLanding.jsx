// src/components/LangwaLanding.jsx

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronRight,
  Globe,
  Book,
  Users,
  Star,
  Download,
  Menu,
  X,
  Check,
  ArrowRight,
  Play,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';

// Lazy load components for better performance
const LanguageLearningAnimation = React.lazy(() => import('./animations/LanguageLearningAnimation'));
const MobileLearningAnimation = React.lazy(() => import('./animations/MobileLearningAnimation'));
const FeaturesAnimation = React.lazy(() => import('./animations/FeaturesAnimation'));
const CommunityAnimation = React.lazy(() => import('./animations/CommunityAnimation'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <motion.div
      className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  </div>
);

// Blog Posts Data
const blogPosts = [
  {
    id: 1,
    title: "Mastering a New Language: Tips and Tricks",
    excerpt: "Discover effective strategies for language learning that will accelerate your progress...",
    date: "November 1, 2024",
    imageUrl: "/api/placeholder/600/400",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "The Science Behind Language Acquisition",
    excerpt: "Understanding how our brain processes new languages can help optimize your learning journey...",
    date: "October 28, 2024",
    imageUrl: "/api/placeholder/600/400",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Cultural Immersion: Beyond Words",
    excerpt: "Why understanding cultural context is crucial for true language mastery...",
    date: "October 25, 2024",
    imageUrl: "/api/placeholder/600/400",
    readTime: "6 min read"
  }
];

// Social Media Links
const socialLinks = [
  { icon: <Facebook size={20} />, url: "https://www.facebook.com/professional_dashboard", label: "Facebook" },
  { icon: <Twitter size={20} />, url: "https://x.com/Langwa_", label: "Twitter" },
  { icon: <Instagram size={20} />, url: "https://www.instagram.com/langwa.app/", label: "Instagram" },
  { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/company/104990471/admin/dashboard/", label: "LinkedIn" }
];

const LangwaLanding = () => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Dark theme state

  // Refs
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const threeSceneRef = useRef(null);

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Intersection observers
  const [featuresRef, featuresInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
    rootMargin: '50px',
  });

  const [communityRef, communityInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
    rootMargin: '50px',
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        ease: "easeOut",
        duration: 0.5
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
  };

  // Data
  const languages = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese'];

  const features = [
    {
      icon: <Globe className="w-12 h-12 text-purple-600" />,
      title: '40+ Languages',
      description: 'Learn any language with personalized lessons.',
      delay: 0,
    },
    {
      icon: <Book className="w-12 h-12 text-purple-600" />,
      title: 'Smart Learning',
      description: 'AI-powered curriculum adapts to your progress.',
      delay: 0.2,
    },
    {
      icon: <Users className="w-12 h-12 text-purple-600" />,
      title: 'Community',
      description: 'Practice with native speakers worldwide.',
      delay: 0.4,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah K.',
      role: 'Achieved B2 in Spanish',
      text: "Langwa made learning Spanish fun and effective. I'm now confident in my conversations!",
    },
    {
      name: 'Michael R.',
      role: 'Learning Japanese',
      text: 'The bite-sized lessons fit perfectly into my busy schedule. Great app!',
    },
    {
      name: 'Elena M.',
      role: 'French Learner',
      text: 'The interactive exercises and native speaker recordings are incredibly helpful.',
    },
  ];

  // Dark Theme Effect
  useEffect(() => {
    // Check for saved user preference in localStorage, default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkTheme(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Theme toggle handler
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    if (!isDarkTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Three.js background animation
  useEffect(() => {
    if (canvasRef.current && !threeSceneRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current, 
        alpha: true,
        antialias: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = window.innerWidth < 768 ? 200 : 500;
      const positions = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        color: isDarkTheme ? 0xcccccc : 0x6a0dad, // Change color based on theme
        size: 0.5,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      camera.position.z = 50;

      // Optimized animation loop
      let animationFrameId;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        particles.rotation.y += 0.0005;
        renderer.render(scene, camera);
      };

      animate();

      // Optimized resize handler
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
      };
    }
  }, [isDarkTheme]); // Re-run effect if theme changes to update particle color

  // GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate hero section
    gsap.from('.hero-content', {
      opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: '.hero-content',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
    });

    // Animate features section
    if (featuresInView) {
      gsap.from('.feature-card', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
        },
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [featuresInView]);

  // Language rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [languages.length]);

  // Navigation items including Blog
  const navigationItems = ['Features', 'Benefits', 'Community', 'Blog', 'Testimonials', 'Download'];

  return (
    // Update the main wrapper div to support dark mode with transition
    <div className={`min-h-screen ${isDarkTheme ? 'dark bg-gray-900' : 'bg-white'} overflow-x-hidden transition-colors duration-300`}>
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Enhanced Navigation with Social Links and Theme Toggle */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className={`fixed w-full z-50 ${isDarkTheme ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md shadow-sm transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`text-2xl font-bold ${isDarkTheme ? 'text-purple-400' : 'text-purple-700'} transition-colors duration-300`}>
                Langwa
              </span>
            </motion.div>

            {/* Desktop Navigation with Theme Toggle */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`${isDarkTheme ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-700'} transition-colors duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}

              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkTheme ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'} transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              {/* "Start Learning Free" Button */}
              <motion.button
                className={`${
                  isDarkTheme 
                    ? 'bg-purple-600 text-white hover:bg-purple-500' 
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                } px-6 py-2 rounded-full transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning Free
              </motion.button>
            </div>
            
            {/* Mobile menu button with Theme Toggle */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkTheme ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'} transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Social Links for Desktop */}
          <div className="hidden md:flex items-center space-x-4 absolute right-8 top-16">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkTheme ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-700'} transition-colors duration-300`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300"
            >
              <div className="px-4 py-2 space-y-1">
                {navigationItems.map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`${isDarkTheme ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-700'} block px-3 py-2 rounded-md transition-colors duration-300`}
                    whileHover={{ x: 10, color: '#7e22ce' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                {/* Mobile Social Links */}
                <div className="flex space-x-4 px-3 py-2">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${isDarkTheme ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-700'} transition-colors duration-300`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className={`relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 ${
          isDarkTheme 
            ? 'bg-gradient-to-br from-gray-900 to-gray-800'
            : 'bg-gradient-to-br from-purple-50 to-white'
        } overflow-hidden z-10 transition-colors duration-300`}
      >
        <motion.div
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Content */}
          <motion.div
            className="hero-content flex flex-col justify-center lg:pr-8"
            style={{ y }}
            variants={containerVariants}
          >
            <motion.h1
              className={`text-4xl md:text-6xl font-bold ${
                isDarkTheme ? 'text-white' : 'text-gray-900'
              } mb-6 transition-colors duration-300`}
              variants={itemVariants}
            >
              Master Any Language with{' '}
              <motion.span
                className={`${
                  isDarkTheme ? 'text-purple-400' : 'text-purple-600'
                } inline-block origin-center transition-colors duration-300`}
                
              >
                Langwa
              </motion.span>
            </motion.h1>

            {/* Language Rotation */}
            <motion.div
              className={`text-xl ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
              } mb-8 h-8 relative overflow-hidden transition-colors duration-300`}
              variants={itemVariants}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentLanguage}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute w-full"
                >
                  Learn {languages[currentLanguage]} Today!
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#7e22ce' }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 text-white px-8 py-3 rounded-full flex items-center justify-center group transition-colors duration-300"
              >
                Start Free Trial
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, borderColor: '#7e22ce', color: '#7e22ce' }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full flex items-center justify-center transition-colors duration-300"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Animation */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full flex items-center justify-center lg:justify-end min-h-[500px] lg:min-h-[600px]"
          >
            <Suspense fallback={<LoadingSpinner />}>
              <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl relative">
                <div className="aspect-[4/3] w-full">
                  <LanguageLearningAnimation />
                </div>
              </div>
            </Suspense>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        id="features"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 relative z-10 features-section transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className={`text-3xl font-bold text-center ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-900'
            } mb-12 transition-colors duration-300`}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Key Features
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`feature-card p-6 rounded-xl bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ delay: feature.delay }}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className={`mt-4 text-xl font-semibold ${
                    isDarkTheme ? 'text-white' : 'text-gray-900'
                  } transition-colors duration-300`}>{feature.title}</h3>
                  <p className={`mt-2 ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                  } transition-colors duration-300`}>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16">
            <Suspense fallback={<LoadingSpinner />}>
              <FeaturesAnimation />
            </Suspense>
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        id="benefits"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50 dark:bg-gray-900 relative z-10 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-3xl font-bold ${
              isDarkTheme ? 'text-white' : 'text-gray-900'
            } mb-6 transition-colors duration-300`}>
              Benefits of Using Langwa
            </h2>
            <ul className="space-y-4">
              {[
                'Personalized Learning Paths',
                'Real-Time Feedback',
                'Interactive Exercises',
                'Flexible Scheduling'
              ].map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Check className="h-6 w-6 text-purple-600 dark:text-yellow-400 mr-3" />
                  <span className={`text-gray-700 dark:text-gray-300 transition-colors duration-300`}>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="lg:w-1/2 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <MobileLearningAnimation />
            </Suspense>
          </motion.div>
        </div>
      </motion.section>

      {/* Community Section */}
      <motion.section
        ref={communityRef}
        id="community"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 relative z-10 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center">
          <motion.div
            className="lg:w-1/2 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <CommunityAnimation />
            </Suspense>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-3xl font-bold ${
              isDarkTheme ? 'text-white' : 'text-gray-900'
            } mb-6 transition-colors duration-300`}>
              Join Our Global Community
            </h2>
            <p className={`text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300`}>
              Connect with millions of learners worldwide. Share your progress, practice with native speakers, and be part of a supportive community that helps you achieve fluency.
            </p>
            <motion.button
              className={`bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-all flex items-center ${
                isDarkTheme ? 'bg-purple-500 hover:bg-purple-600' : ''
              }`}
              whileHover={{ scale: 1.05, backgroundColor: '#7e22ce' }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Blog Section */}
      <motion.section
        id="blog"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 relative z-10 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold text-center ${
            isDarkTheme ? 'text-gray-300' : 'text-gray-900'
          } mb-12 transition-colors duration-300`}>
            Latest from Our Blog
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                className={`bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transition-colors duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-sm">{post.date}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold ${
                    isDarkTheme ? 'text-white' : 'text-gray-900'
                  } mb-2 transition-colors duration-300`}>
                    {post.title}
                  </h3>
                  <p className={`text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300`}>
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${
                      isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                    } transition-colors duration-300`}>{post.readTime}</span>
                    <Link to={`/blog/${post.id}`}>
                      <motion.button
                        className={`text-purple-600 font-semibold transition-colors duration-300`}
                        whileHover={{ x: 5 }}
                      >
                        Read More →
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50 dark:bg-gray-900 relative z-10 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold text-center ${
            isDarkTheme ? 'text-gray-300' : 'text-gray-900'
          } mb-12 transition-colors duration-300`}>
            Join Thousands of Successful Language Learners
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl bg-white dark:bg-gray-700 shadow-lg transition-colors duration-300`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex flex-col items-start">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <p className={`text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300`}>{testimonial.text}</p>
                  <div>
                    <p className={`font-semibold ${
                      isDarkTheme ? 'text-white' : 'text-gray-900'
                    } transition-colors duration-300`}>{testimonial.name}</p>
                    <p className={`text-sm ${
                      isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                    } transition-colors duration-300`}>{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Download Section */}
      <motion.section
        id="download"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 relative z-10 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-3xl font-bold ${
            isDarkTheme ? 'text-gray-300' : 'text-gray-900'
          } mb-6 transition-colors duration-300`}>
            Start Learning Today
          </h2>
          <p className={`text-xl ${
            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
          } mb-8 transition-colors duration-300`}>
            Download Langwa and begin your language learning journey
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#"
              className={`flex items-center justify-center bg-black dark:bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="mr-2 h-5 w-5" />
              App Store
            </motion.a>
            <motion.a
              href="#"
              className={`flex items-center justify-center bg-black dark:bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="mr-2 h-5 w-5" />
              Google Play
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50 dark:bg-gray-900 relative z-10 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold text-center ${
            isDarkTheme ? 'text-gray-300' : 'text-gray-900'
          } mb-12 transition-colors duration-300`}>
            Get in Touch
          </h2>
          <div className="max-w-md mx-auto">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-300"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-300"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-300"
                  placeholder="Your Message"
                  rows="5"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className={`w-full bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-all duration-300`}
                whileHover={{ scale: 1.02, backgroundColor: '#7e22ce' }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8 relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Langwa</h3>
            <p className="text-gray-400">
              Making language learning accessible to everyone.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <motion.a
                  href="#"
                  className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}
                  whileHover={{ x: 5 }}
                >
                  About
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}
                  whileHover={{ x: 5 }}
                >
                  Careers
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}
                  whileHover={{ x: 5 }}
                >
                  Press
                </motion.a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <motion.a
                  href="#"
                  className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}
                  whileHover={{ x: 5 }}
                >
                  Blog
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}
                  whileHover={{ x: 5 }}
                >
                  Community
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}
                  whileHover={{ x: 5 }}
                >
                  Support
                </motion.a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <motion.a
                  href="#"
                  className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}
                  whileHover={{ x: 5 }}
                >
                  Privacy Policy
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}
                  whileHover={{ x: 5 }}
                >
                  Terms of Service
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}
                  whileHover={{ x: 5 }}
                >
                  Cookie Policy
                </motion.a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex justify-center space-x-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
        <div className="mt-12 text-center text-gray-500 dark:text-gray-400 transition-colors duration-300">
          &copy; {new Date().getFullYear()} Langwa. All rights reserved.
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                className="w-full rounded-lg"
                controls
                autoPlay
                src="/videos/app-demo.mp4"
              />
              <motion.button
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoPlaying(false)}
                aria-label="Close video"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LangwaLanding;

