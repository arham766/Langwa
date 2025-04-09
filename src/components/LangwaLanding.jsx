// src/components/LangwaLanding.jsx
import React, { useEffect, useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Sun, Moon, ChevronRight, Globe, Book, Users, Star, Download, Menu, X, Check, ArrowRight, Play, Facebook, Twitter, Instagram, Linkedin, Clock, MapPin, Award, Zap, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Lazy load components for better performance
const LanguageLearningAnimation = React.lazy(() => import('./animations/LanguageLearningAnimation'));
const MobileLearningAnimation = React.lazy(() => import('./animations/MobileLearningAnimation'));
const FeaturesAnimation = React.lazy(() => import('./animations/FeaturesAnimation'));
const CommunityAnimation = React.lazy(() => import('./animations/CommunityAnimation'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <motion.div
      className="w-16 h-16 border-4 border-brand-100 border-t-brand-600 rounded-full"
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

// Trusted by companies
const trustedCompanies = [
  { name: "Microsoft", logo: "/api/placeholder/120/40", alt: "Microsoft logo" },
  { name: "Google", logo: "/api/placeholder/120/40", alt: "Google logo" },
  { name: "Amazon", logo: "/api/placeholder/120/40", alt: "Amazon logo" },
  { name: "Harvard University", logo: "/api/placeholder/120/40", alt: "Harvard University logo" },
  { name: "MIT", logo: "/api/placeholder/120/40", alt: "MIT logo" },
  { name: "Stanford", logo: "/api/placeholder/120/40", alt: "Stanford logo" }
];

// Language stats data
const languageStats = [
  { label: "Languages", value: "40+", icon: <Globe className="h-6 w-6" /> },
  { label: "Active Users", value: "2M+", icon: <Users className="h-6 w-6" /> },
  { label: "Success Rate", value: "94%", icon: <Award className="h-6 w-6" /> },
  { label: "Time Saved", value: "60%", icon: <Clock className="h-6 w-6" /> },
];

const LangwaLanding = () => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Set dark theme as default
  const [scrollY, setScrollY] = useState(0);
  const [showMobileCTA, setShowMobileCTA] = useState(false);

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
  const [heroInViewRef, heroInView] = useInView({
    threshold: 0.2
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

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Data
  const languages = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese'];

  // Enhanced features with more detail and unique icons
  const features = [
    {
      icon: <Globe className="w-16 h-16 text-brand-500" />,
      title: '40+ Languages',
      description: 'Learn any language with AI-powered personalized lessons tailored to your learning style.',
      delay: 0,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: <Brain className="w-16 h-16 text-brand-500" />,
      title: 'Neuroscience-Based',
      description: 'Our methods are built on the latest brain research for 5X faster memory retention.',
      delay: 0.2,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: <Zap className="w-16 h-16 text-brand-500" />,
      title: 'Quick Results',
      description: 'Just 15 minutes a day to reach conversational fluency in as little as 3 months.',
      delay: 0.4,
      gradient: 'from-amber-500 to-orange-600'
    },
  ];

  // Enhanced testimonials with more detail
  const testimonials = [
    {
      name: 'Sarah K.',
      role: 'Achieved B2 in Spanish in 10 weeks',
      image: '/api/placeholder/60/60',
      text: "Before Langwa, I tried 3 other apps with little progress. With Langwa's adaptive system, I reached conversation level in just 10 weeks! I'm now confident speaking with native speakers.",
      location: "New York, USA",
      stars: 5
    },
    {
      name: 'Michael R.',
      role: 'Mastered Japanese basics in 6 weeks',
      image: '/api/placeholder/60/60',
      text: 'The bite-sized lessons fit perfectly into my busy schedule. What sets Langwa apart is how it adapts to my learning pace and automatically reinforces words I struggle with. Great app!',
      location: "London, UK",
      stars: 5
    },
    {
      name: 'Elena M.',
      role: 'French learner',
      image: '/api/placeholder/60/60',
      text: 'The interactive exercises and native speaker recordings are incredibly helpful. I can practice speaking and get real-time feedback on my pronunciation. Much better than classroom learning!',
      location: "Berlin, Germany",
      stars: 5
    },
  ];

  // Set up mobile CTA visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Show mobile CTA after scrolling past hero section
      if (heroRef.current) {
        setShowMobileCTA(window.scrollY > heroRef.current.offsetHeight * 0.8);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark Theme Effect - Force dark mode by default
  useEffect(() => {
    // Check for saved user preference in localStorage, default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default to dark mode if not explicitly set to light
    if (savedTheme !== 'light') {
      setIsDarkTheme(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setIsDarkTheme(false);
      document.documentElement.classList.remove('dark');
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

  // Enhanced Three.js background animation for dark mode
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

      // Create particles with enhanced glow effect - more vibrant colors
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = window.innerWidth < 768 ? 500 : 1200;
      const positions = new Float32Array(particlesCount * 3);
      const sizes = new Float32Array(particlesCount);
      const colors = new Float32Array(particlesCount * 3);

      // Enhanced vibrant color palette
      const colorOptions = [
        new THREE.Color('#5E6AD2'), // Brand blue
        new THREE.Color('#FF5A5F'), // Vibrant pink
        new THREE.Color('#FFB400'), // Vibrant yellow
        new THREE.Color('#00D6A4'), // Turquoise
        new THREE.Color('#9C42F5'), // Purple
      ];

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        // Position particles in a 3D space
        positions[i3] = (Math.random() - 0.5) * 300;
        positions[i3 + 1] = (Math.random() - 0.5) * 200;
        positions[i3 + 2] = (Math.random() - 0.5) * 300;
        
        // Random sizes for particles - slightly larger for more presence
        sizes[i] = Math.random() * 3 + 0.8;
        
        // Set random colors from our options
        const colorIndex = Math.floor(Math.random() * colorOptions.length);
        const color = colorOptions[colorIndex];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Create a custom shader material for enhanced glowing particles
      const particlesMaterial = new THREE.ShaderMaterial({
        uniforms: {
          pointTexture: { value: new THREE.TextureLoader().load('/glow-particle.png') },
          uTime: { value: 0 },
          uSize: { value: 35 * renderer.getPixelRatio() } // Slightly larger particles
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float uTime;
          uniform float uSize;
          
          void main() {
            vColor = color;
            // Add some subtle movement to particles
            vec3 pos = position;
            pos.x += sin(uTime * 0.3 + position.z * 0.1) * 2.0;
            pos.y += cos(uTime * 0.2 + position.x * 0.1) * 2.0;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * uSize * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          uniform sampler2D pointTexture;
          
          void main() {
            vec4 texColor = texture2D(pointTexture, gl_PointCoord);
            // Enhanced glow effect
            gl_FragColor = vec4(vColor, 1.0) * texColor;
            gl_FragColor.a *= 0.8; // More visible particles
          }
        `,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        vertexColors: true
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      // Add ambient light to the scene for a brighter glow
      const ambientLight = new THREE.AmbientLight(0x404040, 3);
      scene.add(ambientLight);

      camera.position.z = 100;

      // Enhanced mouse interaction
      const mouse = new THREE.Vector2();
      const target = new THREE.Vector2();

      const onMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener('mousemove', onMouseMove);

      // Clock for animation timing
      const clock = new THREE.Clock();

      // Animation loop with enhanced interactivity
      let animationFrameId;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        particlesMaterial.uniforms.uTime.value = elapsedTime;

        // Smoothly interpolate mouse position with enhanced effect
        target.x += (mouse.x - target.x) * 0.06;
        target.y += (mouse.y - target.y) * 0.06;

        camera.position.x += (target.x * 60 - camera.position.x) * 0.06;
        camera.position.y += (target.y * 60 - camera.position.y) * 0.06;

        camera.lookAt(scene.position);

        // More dynamic rotation
        particles.rotation.y = elapsedTime * 0.06;
        particles.rotation.z = elapsedTime * 0.03;

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
        
        // Update particle size based on screen size
        particlesMaterial.uniforms.uSize.value = width < 768 ? 25 * renderer.getPixelRatio() : 35 * renderer.getPixelRatio();
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      threeSceneRef.current = scene;
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(animationFrameId);
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
      };
    }
  }, [isDarkTheme]); // Re-run if theme changes

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

    // Animate features section with more dynamic effects
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

    // Animated section backgrounds with enhanced parallax
    const sections = document.querySelectorAll('.parallax-section');
    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { backgroundPosition: '50% 0%' },
        {
          backgroundPosition: '50% 100%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    // Animate trusted companies logos
    gsap.from('.company-logo', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.trusted-section',
        start: 'top 90%',
      }
    });

    // Animate stats counters
    gsap.from('.stat-item', {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 85%',
      }
    });

    // Cleanup
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

  // Main navigation items with better labels
  const navigationItems = [
    { name: 'Features', href: '#features' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Download', href: '#download' }
  ];

  return (
    <div className={`min-h-screen scroll-smooth ${isDarkTheme ? 'dark bg-black' : 'bg-background-light'} overflow-x-hidden transition-colors duration-300`}>
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />
      
      {/* Ambient background gradient overlay for dark mode - enhanced with more vibrant colors */}
      {isDarkTheme && (
        <div className="fixed inset-0 bg-gradient-to-b from-blue-900/10 via-purple-900/10 to-black/20 pointer-events-none z-0"></div>
      )}

      {/* Navigation - enhanced with better accessibility */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className={`fixed w-full z-50 ${isDarkTheme ? 'bg-black/90' : 'bg-background-light/90'} backdrop-blur-lg shadow-lg shadow-brand-900/10 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-20">
            {/* Logo - enhanced with more presence */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`text-2xl md:text-3xl font-bold ${isDarkTheme ? 'text-brand-300' : 'text-brand-600'} transition-colors duration-300`}>
                Langwa
              </span>
            </motion.div>

            {/* Desktop Navigation - improved spacing and hierarchy */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`${isDarkTheme ? 'text-gray-300 hover:text-brand-300' : 'text-gray-600 hover:text-brand-600'} font-medium transition-colors duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkTheme ? 'bg-gray-800 text-yellow-400 border border-gray-700' : 'bg-gray-100 text-gray-600'} transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              {/* "Start Learning Free" Button - enhanced with gradient and glow */}
              <motion.button
                className={`${
                  isDarkTheme 
                    ? 'bg-gradient-to-r from-brand-500 to-purple-600 text-white hover:from-brand-600 hover:to-purple-700 ring-2 ring-brand-300/20 shadow-lg shadow-brand-500/20' 
                    : 'bg-gradient-to-r from-brand-600 to-purple-700 text-white hover:from-brand-700 hover:to-purple-800 shadow-md'
                } px-6 py-3 rounded-full font-semibold transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning Free
              </motion.button>
            </div>
            
            {/* Mobile menu toggler - enhanced with better touch targets */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                className={`p-3 rounded-full ${isDarkTheme ? 'bg-gray-800 text-yellow-400 border border-gray-700' : 'bg-gray-100 text-gray-600'} transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Social Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-4 absolute right-8 top-20">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkTheme ? 'text-gray-300 hover:text-brand-300' : 'text-gray-600 hover:text-brand-600'} transition-colors duration-300`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation - enhanced for better usability */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden ${isDarkTheme ? 'bg-gray-900 border-t border-gray-800' : 'bg-background-light'} shadow-lg transition-colors duration-300`}
            >
              <div className="px-4 py-2 space-y-1">
                {navigationItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`${isDarkTheme ? 'text-gray-300 hover:text-brand-300' : 'text-gray-600 hover:text-brand-600'} block px-3 py-4 rounded-md text-lg transition-colors duration-300`}
                    whileHover={{ x: 10 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                
                {/* Mobile Social Links */}
                <div className="flex space-x-6 px-3 py-4 justify-center">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${isDarkTheme ? 'text-gray-300 hover:text-brand-300' : 'text-gray-600 hover:text-brand-600'} transition-colors duration-300 p-2`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
                
                {/* Mobile CTA button */}
                <div className="px-3 py-4">
                  <motion.button
                    className={`w-full ${
                      isDarkTheme 
                        ? 'bg-gradient-to-r from-brand-500 to-purple-600 text-white hover:from-brand-600 hover:to-purple-700 ring-2 ring-brand-300/20' 
                        : 'bg-gradient-to-r from-brand-600 to-purple-700 text-white hover:from-brand-700 hover:to-purple-800'
                    } px-6 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center`}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Free Trial
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Sticky CTA - NEW */}
      <AnimatePresence>
        {showMobileCTA && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-40 md:hidden"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-brand-500 to-purple-600 text-white py-4 px-8 rounded-full font-semibold shadow-lg shadow-brand-500/30 ring-2 ring-brand-400/20 flex items-center justify-center"
            >
              Start Learning Free
              <ChevronRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Enhanced with better hierarchy and messaging */}
      <motion.section
        ref={heroRef}
        className={`relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 ${
          isDarkTheme 
            ? 'bg-black'
            : 'bg-background-light'
        } overflow-hidden z-10 transition-colors duration-300`}
      >
        {/* Animated lighting effect for dark mode - enhanced with more vibrant colors */}
        {isDarkTheme && (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '-2s' }}></div>
            <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-pink-600/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '-3s' }}></div>
          </>
        )}
        
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
            ref={heroInViewRef}
          >
            {/* Language badge - NEW */}
            <motion.div
              className="mb-6"
              variants={itemVariants}
            >
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                isDarkTheme 
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30' 
                  : 'bg-brand-100 text-brand-700 border border-brand-200'
              } transition-colors duration-300`}>
                The #1 AI-Powered Language Learning App
              </span>
            </motion.div>
          
            <motion.h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
                isDarkTheme ? 'text-white' : 'text-text-light'
              } mb-6 transition-colors duration-300`}
              variants={itemVariants}
            >
              Learn Languages{' '}
              <span className={`${
                isDarkTheme ? 'text-brand-300 bg-clip-text text-transparent bg-gradient-to-r from-brand-300 to-purple-400' : 'text-brand-600'
              } inline-block origin-center transition-colors duration-300`}>
                5x Faster
              </span>{' '}
              Than Traditional Methods
            </motion.h1>

            {/* Subtitle - NEW more compelling */}
            <motion.p
              className={`text-xl ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-700'
              } mb-6 max-w-xl transition-colors duration-300`}
              variants={itemVariants}
            >
              Langwa uses neuroscience and AI to adapt to your learning style, delivering personalized language lessons that stick in your long-term memory.
            </motion.p>

            {/* Language Rotation */}
            <motion.div
              className={`text-xl md:text-2xl ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
              } mb-8 h-10 relative overflow-hidden transition-colors duration-300`}
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
                  Start Learning {languages[currentLanguage]} Today!
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* CTA Buttons - enhanced with better visual hierarchy */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(94, 106, 210, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className={`${
                  isDarkTheme 
                    ? 'bg-gradient-to-r from-brand-500 to-purple-600 ring-2 ring-brand-400/20 shadow-lg shadow-brand-500/30' 
                    : 'bg-gradient-to-r from-brand-600 to-purple-700 shadow-md shadow-brand-600/20'
                } text-white px-8 py-4 rounded-full flex items-center justify-center group text-lg font-semibold transition-all duration-300`}
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
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: isDarkTheme ? '0 0 15px rgba(94, 106, 210, 0.2)' : 'none' 
                }}
                whileTap={{ scale: 0.95 }}
                className={`${
                  isDarkTheme 
                    ? 'border-2 border-brand-500/50 text-brand-300 hover:border-brand-400 bg-black/40' 
                    : 'border-2 border-brand-600 text-brand-600 bg-white/80'
                } px-8 py-4 rounded-full flex items-center justify-center text-lg font-medium transition-colors duration-300`}
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </motion.button>
            </motion.div>
            
            {/* Stat counters - NEW */}
            <motion.div
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
              variants={itemVariants}
            >
              {languageStats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className={`stat-item flex flex-col items-center p-3 rounded-xl ${
                    isDarkTheme
                      ? 'bg-gray-900/40 backdrop-blur-sm border border-gray-800'
                      : 'bg-white/70 backdrop-blur-sm shadow-sm border border-gray-100'
                  } transition-all duration-300`}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <div className={`${
                    isDarkTheme
                      ? 'text-brand-300'
                      : 'text-brand-600'
                  } mb-1`}>
                    {stat.icon}
                  </div>
                  <div className={`text-xl md:text-2xl font-bold ${
                    isDarkTheme
                      ? 'text-white'
                      : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs ${
                    isDarkTheme
                      ? 'text-gray-400'
                      : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Animation - enhanced with better visual appeal */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full flex items-center justify-center lg:justify-end min-h-[500px] lg:min-h-[600px]"
          >
            <Suspense fallback={<LoadingSpinner />}>
              <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl relative">
                {/* Enhanced glow effect behind the animation in dark mode */}
                {isDarkTheme && (
                  <div className="absolute inset-0 bg-gradient-radial from-brand-500/20 via-purple-500/10 to-transparent filter blur-3xl rounded-full"></div>
                )}
                <div className="aspect-[4/3] w-full relative z-10">
                  <LanguageLearningAnimation isDarkTheme={isDarkTheme} />
                </div>
              </div>
            </Suspense>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Trusted By Section - NEW */}
      <motion.section
        className={`py-12 px-4 sm:px-6 lg:px-8 ${
          isDarkTheme 
            ? 'bg-gray-900/30 backdrop-blur-md' 
            : 'bg-gray-50'
        } relative z-10 trusted-section transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h3
            className={`text-lg font-medium mb-8 ${
              isDarkTheme 
                ? 'text-gray-300' 
                : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            TRUSTED BY LEADING ORGANIZATIONS
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {trustedCompanies.map((company, index) => (
              <motion.div
                key={index}
                className="company-logo flex justify-center"
                whileHover={{ y: -5 }}
              >
                <img 
                  src={company.logo} 
                  alt={company.alt}
                  className={`h-8 md:h-10 ${isDarkTheme ? 'opacity-70 filter grayscale hover:grayscale-0 hover:opacity-100' : 'opacity-80 hover:opacity-100'} transition-all duration-300`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section - enhanced with better visual hierarchy */}
      <motion.section
        ref={featuresRef}
        id="features"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          isDarkTheme 
            ? 'bg-black' 
            : 'bg-white'
        } relative z-10 features-section transition-colors duration-300 parallax-section`}
      >
        {/* Animated lighting effects for dark mode - enhanced with more vibrant colors */}
        {isDarkTheme && (
          <>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '-2s' }}></div>
          </>
        )}
      
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkTheme ? 'text-white' : 'text-text-light'
              } mb-6 transition-colors duration-300`}
            >
              What Makes Langwa <span className={`${isDarkTheme ? 'text-brand-300' : 'text-brand-600'}`}>Different</span>
            </h2>
            <p className={`text-lg ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              Our app is built on the latest neuroscience research to help you learn languages faster and retain them longer.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`feature-card p-8 rounded-2xl ${
                  isDarkTheme 
                    ? 'bg-gradient-to-b from-gray-800/90 to-gray-900/90 backdrop-blur-md border border-gray-700/50' 
                    : 'bg-white border border-gray-100'
                } shadow-xl hover:shadow-2xl transition-all duration-500`}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.03,
                  boxShadow: isDarkTheme ? '0 20px 40px rgba(94, 106, 210, 0.2)' : '0 20px 40px rgba(0, 0, 0, 0.1)' 
                }}
                transition={{ delay: feature.delay }}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon with gradient background */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`${
                      isDarkTheme
                        ? `bg-gradient-to-br ${feature.gradient} p-4 rounded-xl shadow-lg shadow-brand-500/20`
                        : `bg-gradient-to-br ${feature.gradient} p-4 rounded-xl shadow-md`
                    } mb-6 text-white`}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3
                    className={`text-2xl font-bold ${
                      isDarkTheme ? 'text-white' : 'text-text-light'
                    } mb-4 transition-colors duration-300`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`${
                      isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                    } transition-colors duration-300 text-lg`}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20">
            <Suspense fallback={<LoadingSpinner />}>
              <FeaturesAnimation isDarkTheme={isDarkTheme} />
            </Suspense>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section - NEW */}
      <motion.section
        id="how-it-works"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          isDarkTheme 
            ? 'bg-gray-900/40 backdrop-blur-md' 
            : 'bg-gray-50'
        } relative z-10 transition-colors duration-300`}
      >
        {/* Animated lighting effect for dark mode */}
        {isDarkTheme && (
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        )}
      
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkTheme ? 'text-white' : 'text-text-light'
              } mb-6 transition-colors duration-300`}
            >
              How Langwa Works
            </h2>
            <p className={`text-lg ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              Our personalized learning system adapts to your pace and learning style
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Set Your Goals',
                description: 'Choose your target language and set your fluency goals. Our AI will create a personalized learning path.',
                icon: <Globe className="w-8 h-8" />,
                color: 'from-blue-500 to-indigo-600',
                delay: 0
              },
              {
                step: '02',
                title: 'Adaptive Learning',
                description: 'Our AI analyzes your progress and adapts lessons to focus on areas where you need more practice.',
                icon: <Brain className="w-8 h-8" />,
                color: 'from-purple-500 to-pink-600',
                delay: 0.2
              },
              {
                step: '03',
                title: 'Achieve Fluency',
                description: 'Regular practice with our spaced repetition system helps move words into your long-term memory.',
                icon: <Award className="w-8 h-8" />,
                color: 'from-amber-500 to-orange-600',
                delay: 0.4
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.delay }}
                className={`p-8 rounded-2xl ${
                  isDarkTheme 
                    ? 'bg-black/60 backdrop-blur-md border border-gray-800' 
                    : 'bg-white shadow-md border border-gray-100'
                } transition-all duration-300`}
                whileHover={{ 
                  y: -10, 
                  boxShadow: isDarkTheme ? '0 15px 30px rgba(0, 0, 0, 0.3)' : '0 15px 30px rgba(0, 0, 0, 0.1)' 
                }}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold mb-6`}>
                  {step.icon}
                </div>
                <h3 className={`text-sm font-medium ${isDarkTheme ? 'text-brand-300' : 'text-brand-600'} mb-2`}>STEP {step.step}</h3>
                <h4 className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-4`}>{step.title}</h4>
                <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section - enhanced with better visuals */}
      <motion.section
        id="benefits"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          isDarkTheme 
            ? 'bg-black' 
            : 'bg-white'
        } relative z-10 transition-colors duration-300 parallax-section`}
      >
        {/* Animated lighting effect for dark mode */}
        {isDarkTheme && (
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        )}
      
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <motion.div
            className="lg:w-1/2 lg:pr-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkTheme ? 'text-white' : 'text-gray-900'
              } mb-6 transition-colors duration-300`}
            >
              Why Choose <span className={isDarkTheme ? 'text-brand-300' : 'text-brand-600'}>Langwa</span> For Your Language Journey
            </h2>
            <p className={`text-lg ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              Unlike traditional apps that use generic lessons, Langwa adapts to your unique learning style, making every minute count.
            </p>
            <ul className="space-y-6">
              {[
                {
                  title: 'Personalized Learning Paths',
                  description: 'AI-powered system analyzes your strengths and weaknesses to create a custom curriculum.',
                  icon: <Globe />
                },
                {
                  title: 'Real-Time Pronunciation Feedback',
                  description: 'Advanced speech recognition corrects your pronunciation instantly.',
                  icon: <Users />
                },
                {
                  title: 'Adaptive Spaced Repetition',
                  description: 'Our algorithm schedules reviews at the optimal moment before you forget.',
                  icon: <Clock />
                },
                {
                  title: 'Interactive Cultural Context',
                  description: 'Learn the language within its cultural framework for deeper understanding.',
                  icon: <MapPin />
                }
              ].map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className={`flex-shrink-0 mt-1 flex items-center justify-center h-10 w-10 rounded-lg ${
                    isDarkTheme 
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30' 
                      : 'bg-brand-100 text-brand-600 border border-brand-200'
                  } mr-4`}>
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-2`}>
                      {benefit.title}
                    </h3>
                    <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                      {benefit.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="lg:w-1/2 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              {/* Add a subtle glow in dark mode */}
              {isDarkTheme && (
                <div className="absolute inset-0 bg-brand-500/10 filter blur-3xl rounded-full"></div>
              )}
              <div className={`rounded-2xl overflow-hidden ${isDarkTheme ? 'ring-2 ring-brand-500/20 shadow-xl shadow-brand-500/10' : 'shadow-2xl'}`}>
                <MobileLearningAnimation />
              </div>
            </Suspense>
          </motion.div>
        </div>
      </motion.section>

      {/* Community Section - enhanced */}
      <motion.section
        ref={communityRef}
        id="community"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          isDarkTheme 
            ? 'bg-gray-900/40 backdrop-blur-md' 
            : 'bg-gray-50'
        } relative z-10 transition-colors duration-300 parallax-section`}
      >
        {/* Animated lighting effect for dark mode */}
        {isDarkTheme && (
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        )}
      
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center">
          <motion.div
            className="lg:w-1/2 mt-12 lg:mt-0 lg:pr-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <div className={`rounded-2xl overflow-hidden ${isDarkTheme ? 'ring-2 ring-brand-500/20 shadow-xl shadow-brand-500/10' : 'shadow-2xl'}`}>
                <CommunityAnimation />
              </div>
            </Suspense>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkTheme ? 'text-white' : 'text-gray-900'
              } mb-6 transition-colors duration-300`}
            >
              Join Our Global Learning Community
            </h2>
            <p
              className={`${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
              } mb-6 text-lg transition-colors duration-300`}
            >
              Connect with millions of learners worldwide. Share your progress, practice with native speakers through video calls, and participate in language exchange programs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: 'Language Exchange',
                  description: 'Practice with native speakers worldwide in our secure chat platform'
                },
                {
                  title: 'Group Challenges',
                  description: 'Join weekly challenges to stay motivated and track your progress'
                },
                {
                  title: 'Cultural Events',
                  description: 'Participate in virtual cultural events to immerse yourself in the language'
                },
                {
                  title: 'Supportive Community',
                  description: 'Get help from both learners and professional language teachers'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`${
                    isDarkTheme 
                      ? 'bg-black/60 border border-gray-800' 
                      : 'bg-white border border-gray-100'
                  } p-4 rounded-xl`}
                >
                  <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-2`}>{item.title}</h3>
                  <p className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{item.description}</p>
                </motion.div>
              ))}
            </div>
            <motion.button
              className={`${
                isDarkTheme 
                  ? 'bg-gradient-to-r from-brand-500 to-purple-600 text-white hover:from-brand-600 hover:to-purple-700 ring-2 ring-brand-400/20 shadow-lg shadow-brand-500/20' 
                  : 'bg-gradient-to-r from-brand-600 to-purple-700 text-white hover:from-brand-700 hover:to-purple-800 shadow-md'
              } px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: isDarkTheme ? '0 0 20px rgba(94, 106, 210, 0.3)' : '0 0 15px rgba(94, 106, 210, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Join Community <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Section - NEW */}
      <motion.section
        id="pricing"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          isDarkTheme 
            ? 'bg-black' 
            : 'bg-white'
        } relative z-10 transition-colors duration-300`}
      >
        {/* Animated lighting effect for dark mode */}
        {isDarkTheme && (
          <>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-500/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '-3s' }}></div>
          </>
        )}
      
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkTheme ? 'text-white' : 'text-text-light'
              } mb-6 transition-colors duration-300`}
            >
              Simple, Transparent Pricing
            </h2>
            <p className={`text-lg ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              Start for free, upgrade when you're ready. Cancel anytime.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Basic',
                price: 'Free',
                period: 'Forever',
                description: 'Perfect for beginners and casual learners',
                features: [
                  'Core language lessons',
                  '10 minutes of practice per day',
                  'Basic vocabulary building',
                  'Progress tracking'
                ],
                cta: 'Get Started',
                highlighted: false,
                delay: 0
              },
              {
                name: 'Premium',
                price: '$9.99',
                period: 'per month',
                description: 'Our most popular plan for serious learners',
                features: [
                  'Unlimited daily practice',
                  'Advanced grammar lessons',
                  'Pronunciation feedback',
                  'Offline mode',
                  'No ads',
                  'Community access'
                ],
                cta: 'Start Free Trial',
                highlighted: true,
                delay: 0.1
              },
              {
                name: 'Ultimate',
                price: '$14.99',
                period: 'per month',
                description: 'Maximum results with personal coaching',
                features: [
                  'Everything in Premium',
                  'Weekly 1-on-1 tutor sessions',
                  'Personalized learning plan',
                  'Real-time conversation practice',
                  'Certificate upon completion'
                ],
                cta: 'Start Free Trial',
                highlighted: false,
                delay: 0.2
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: plan.delay }}
                className={`p-8 rounded-2xl ${
                  isDarkTheme 
                    ? plan.highlighted 
                      ? 'bg-gradient-to-b from-brand-900/90 to-purple-900/90 border-2 border-brand-500/50 shadow-xl shadow-brand-500/20' 
                      : 'bg-gray-900/80 border border-gray-800'
                    : plan.highlighted
                      ? 'bg-white border-2 border-brand-500 shadow-xl'
                      : 'bg-white border border-gray-200 shadow-lg'
                } relative transition-all duration-300`}
                whileHover={{ 
                  y: -10, 
                  boxShadow: isDarkTheme 
                    ? plan.highlighted 
                      ? '0 20px 40px rgba(94, 106, 210, 0.3)' 
                      : '0 15px 30px rgba(0, 0, 0, 0.3)'
                    : plan.highlighted
                      ? '0 20px 40px rgba(94, 106, 210, 0.2)'
                      : '0 15px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      isDarkTheme
                        ? 'bg-brand-500 text-white'
                        : 'bg-brand-600 text-white'
                    }`}>
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className={`text-xl font-bold ${
                  isDarkTheme 
                    ? plan.highlighted ? 'text-brand-300' : 'text-white' 
                    : plan.highlighted ? 'text-brand-600' : 'text-gray-900'
                } mb-2`}>
                  {plan.name}
                </h3>
                
                <div className="flex items-baseline mb-6">
                  <span className={`text-4xl font-bold ${
                    isDarkTheme ? 'text-white' : 'text-gray-900'
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`ml-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                    {plan.period}
                  </span>
                </div>
                
                <p className={`mb-6 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className={`h-5 w-5 mr-3 ${
                        isDarkTheme 
                          ? plan.highlighted ? 'text-brand-300' : 'text-brand-500' 
                          : 'text-brand-600'
                      }`} />
                      <span className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  className={`w-full py-3 rounded-lg font-semibold ${
                    plan.highlighted
                      ? isDarkTheme 
                        ? 'bg-gradient-to-r from-brand-500 to-purple-600 text-white shadow-lg shadow-brand-500/20' 
                        : 'bg-gradient-to-r from-brand-600 to-purple-700 text-white'
                      : isDarkTheme
                        ? 'bg-gray-800 text-white border border-gray-700'
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                  } transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section - enhanced */}
      <motion.section
        id="testimonials"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          isDarkTheme 
            ? 'bg-gray-900/40 backdrop-blur-md' 
            : 'bg-gray-50'
        } relative z-10 transition-colors duration-300 parallax-section`}
      >
        {/* Animated lighting effect for dark mode */}
        {isDarkTheme && (
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        )}
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkTheme ? 'text-white' : 'text-gray-900'
              } mb-6 transition-colors duration-300`}
            >
              Success Stories from Our Community
            </h2>
            <p className={`text-lg ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands of successful language learners who've achieved fluency with Langwa
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`p-8 rounded-2xl ${
                  isDarkTheme 
                    ? 'bg-black/60 backdrop-blur-md border border-gray-800' 
                    : 'bg-white shadow-lg border border-gray-100'
                } relative transition-colors duration-300`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  boxShadow: isDarkTheme ? '0 15px 30px rgba(0, 0, 0, 0.5)' : '0 15px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Quote mark */}
                <div className={`absolute -top-6 -left-2 text-6xl ${
                  isDarkTheme ? 'text-brand-500/30' : 'text-brand-200'
                } font-serif`}>
                  "
                </div>
                
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <div className="flex items-center mb-6">
                      {[...Array(testimonial.stars)].map((_, i) => (
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
                    <p
                      className={`${
                        isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                      } mb-6 text-lg italic transition-colors duration-300`}
                    >
                      "{testimonial.text}"
                    </p>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-brand-500"
                    />
                    <div className="ml-4">
                      <p
                        className={`font-semibold ${
                          isDarkTheme ? 'text-white' : 'text-gray-900'
                        } transition-colors duration-300`}
                      >
                        {testimonial.name}
                      </p>
                      <p
                        className={`text-sm ${
                          isDarkTheme ? 'text-brand-300' : 'text-brand-600'
                        } transition-colors duration-300 font-medium`}
                      >
                        {testimonial.role}
                      </p>
                      <p className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} flex items-center mt-1`}>
                        <MapPin className="w-3 h-3 mr-1" /> {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Blog Section - enhanced */}
      <motion.section
        id="blog"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          isDarkTheme 
            ? 'bg-black' 
            : 'bg-white'
        } relative z-10 transition-colors duration-300 parallax-section`}
      >
        {/* Animated lighting effect for dark mode */}
        {isDarkTheme && (
          <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-brand-500/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        )}
      
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2
                className={`text-3xl md:text-4xl font-bold ${
                  isDarkTheme ? 'text-white' : 'text-gray-900'
                } mb-4 transition-colors duration-300`}
              >
                Latest from Our Blog
              </h2>
              <p className={`text-lg ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} max-w-2xl`}>
                Tips, research findings, and stories from the language learning world
              </p>
            </div>
            <Link to="/blog">
              <motion.button
                className={`mt-4 md:mt-0 ${
                  isDarkTheme ? 'text-brand-300 border border-brand-500/30' : 'text-brand-600 border border-brand-200'
                } px-6 py-2 rounded-full font-medium inline-flex items-center transition-colors duration-300`}
                whileHover={{ x: 5 }}
              >
                View All Articles <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                className={`${
                  isDarkTheme 
                    ? 'bg-gray-900/80 backdrop-blur-md border border-gray-800' 
                    : 'bg-white shadow-lg border border-gray-100'
                } rounded-2xl overflow-hidden transition-colors duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  boxShadow: isDarkTheme ? '0 15px 30px rgba(0, 0, 0, 0.5)' : '0 15px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-52 object-cover"
                  />
                  <div className={`absolute inset-0 ${isDarkTheme ? 'bg-gradient-to-b from-transparent via-black/10 to-black/70' : 'bg-gradient-to-b from-transparent to-black/40'}`}></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white text-sm font-medium">{post.date}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold ${
                      isDarkTheme ? 'text-white' : 'text-gray-900'
                    } mb-4 transition-colors duration-300`}
                  >
                    {post.title}
                  </h3>
                  <p
                    className={`${
                      isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                    } mb-6 transition-colors duration-300`}
                  >
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm ${
                        isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                      } flex items-center transition-colors duration-300`}
                    >
                      <Clock className="w-4 h-4 mr-1" /> {post.readTime}
                    </span>
                    <Link to={`/blog/${post.id}`}>
                      <motion.button
                        className={`${
                          isDarkTheme ? 'text-brand-300' : 'text-brand-600'
                        } font-semibold transition-colors duration-300 flex items-center`}
                        whileHover={{ x: 5 }}
                      >
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Download Section - enhanced */}
      <motion.section
        id="download"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          isDarkTheme 
            ? 'bg-gradient-to-b from-gray-900/40 to-black backdrop-blur-md' 
            : 'bg-gradient-to-b from-gray-50 to-white'
        } relative z-10 transition-colors duration-300`}
      >
        {/* Animated lighting effect for dark mode */}
        {isDarkTheme && (
          <>
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '-3s' }}></div>
          </>
        )}
        
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
            <Globe className="w-96 h-96 text-brand-500" />
          </div>
        
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-3xl md:text-5xl font-bold ${
                isDarkTheme ? 'text-white' : 'text-gray-900'
              } mb-6 transition-colors duration-300`}
            >
              Start Your Language Journey Today
            </h2>
            <p
              className={`text-xl ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
              } mb-8 transition-colors duration-300 max-w-2xl mx-auto`}
            >
              Download Langwa now and join over 2 million people who are achieving fluency faster than they ever thought possible.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <motion.a
                href="#"
                className={`flex items-center justify-center ${
                  isDarkTheme 
                    ? 'bg-gray-800 border border-gray-700 text-white hover:bg-gray-700' 
                    : 'bg-black text-white hover:bg-gray-800'
                } px-8 py-4 rounded-xl transition-all duration-300`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: isDarkTheme ? '0 0 20px rgba(0, 0, 0, 0.3)' : '0 0 20px rgba(0, 0, 0, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="mr-3 h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </motion.a>
              <motion.a
                href="#"
                className={`flex items-center justify-center ${
                  isDarkTheme 
                    ? 'bg-gray-800 border border-gray-700 text-white hover:bg-gray-700' 
                    : 'bg-black text-white hover:bg-gray-800'
                } px-8 py-4 rounded-xl transition-all duration-300`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: isDarkTheme ? '0 0 20px rgba(0, 0, 0, 0.3)' : '0 0 20px rgba(0, 0, 0, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="mr-3 h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Get it on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </motion.a>
            </div>
            
            {/* App Rating */}
            <div className={`inline-flex items-center justify-center px-6 py-3 rounded-full ${
              isDarkTheme 
                ? 'bg-black/60 border border-gray-800' 
                : 'bg-gray-100'
            }`}>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className={`ml-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'} font-medium`}>
                4.8/5 from 50,000+ reviews
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section - enhanced */}
      <motion.section
        id="contact"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          isDarkTheme 
            ? 'bg-black' 
            : 'bg-white'
        } relative z-10 transition-colors duration-300`}
      >
        {/* Animated lighting effect for dark mode */}
        {isDarkTheme && (
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-brand-500/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        )}
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkTheme ? 'text-white' : 'text-gray-900'
              } mb-6 transition-colors duration-300`}
            >
              Get in Touch
            </h2>
            <p className={`text-lg ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-md`}>
              Have questions about Langwa? Our team is here to help you on your language learning journey.
            </p>
            
            <div className="space-y-6">
              {[
                {
                  icon: <MapPin className="h-6 w-6" />,
                  title: 'Our Headquarters',
                  content: '123 Innovation Avenue, San Francisco, CA 94103, USA'
                },
                {
                  icon: <Clock className="h-6 w-6" />,
                  title: 'Support Hours',
                  content: 'Monday to Friday: 9am - 6pm EST'
                },
                {
                  icon: <Globe className="h-6 w-6" />,
                  title: 'Global Support',
                  content: 'Support available in 8 languages'
                }
              ].map((item, index) => (
                <div key={index} className="flex">
                  <div className={`flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-xl ${
                    isDarkTheme 
                      ? 'bg-gray-800 text-brand-400' 
                      : 'bg-brand-100 text-brand-600'
                  } mr-4`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h3>
                    <p className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className={`rounded-2xl p-8 ${
              isDarkTheme 
                ? 'bg-gray-900/90 backdrop-blur-md border border-gray-800' 
                : 'bg-white shadow-xl border border-gray-100'
            }`}>
              <h3 className={`text-xl font-semibold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                Send Us a Message
              </h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      isDarkTheme 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'border border-gray-200 text-gray-900'
                    } transition-colors duration-300`}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      isDarkTheme 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'border border-gray-200 text-gray-900'
                    } transition-colors duration-300`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      isDarkTheme 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'border border-gray-200 text-gray-900'
                    } transition-colors duration-300`}
                    placeholder="How can we help you?"
                    rows="5"
                    required
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className={`w-full ${
                    isDarkTheme 
                      ? 'bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 ring-2 ring-brand-400/20 shadow-lg shadow-brand-500/20' 
                      : 'bg-gradient-to-r from-brand-600 to-purple-700 hover:from-brand-700 hover:to-purple-800 shadow-md'
                  } text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300`}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: isDarkTheme ? '0 0 15px rgba(94, 106, 210, 0.3)' : '0 0 15px rgba(94, 106, 210, 0.2)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer - enhanced */}
      <footer className={`${
        isDarkTheme 
          ? 'bg-black border-t border-gray-800' 
          : 'bg-gray-900'
      } text-white py-16 px-4 sm:px-6 lg:px-8 relative z-10 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          {/* Top section with logo and navigation */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-10 mb-16">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-6 text-white">Langwa</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Revolutionizing language learning with AI-powered, neuroscience-based methodology.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300 p-2 bg-gray-800 rounded-full"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="font-semibold text-lg mb-6 text-white">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Press', 'Partners', 'Investors'].map((item, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 block"
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="font-semibold text-lg mb-6 text-white">Resources</h4>
              <ul className="space-y-4">
                {['Blog', 'Community', 'Language Guides', 'API', 'Help Center'].map((item, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 block"
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="font-semibold text-lg mb-6 text-white">Products</h4>
              <ul className="space-y-4">
                {['Mobile App', 'Web App', 'Langwa for Teams', 'Langwa for Education', 'Premium Features'].map((item, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 block"
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="font-semibold text-lg mb-6 text-white">Legal</h4>
              <ul className="space-y-4">
                {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'GDPR', 'Accessibility'].map((item, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 block"
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Newsletter subscription */}
          <div className="border-t border-gray-800 pt-12 pb-8">
            <div className="max-w-3xl mx-auto text-center">
              <h4 className="text-xl font-semibold mb-6 text-white">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400 mb-6">
                Get language learning tips, cultural insights, and exclusive offers sent to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <motion.button
                  className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-4 rounded-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Bottom copyright */}
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500">
            <p className="mb-4">
              &copy; {new Date().getFullYear()} Langwa Inc. All rights reserved.
            </p>
            <p className="text-sm">
              Langwa is available worldwide. Learn a new language anytime, anywhere.
            </p>
          </div>
        </div>
      </footer>

      {/* Video Modal - enhanced with better usability */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video glow effect in dark mode */}
              {isDarkTheme && (
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 via-purple-500/20 to-brand-500/20 filter blur-xl rounded-3xl -z-10"></div>
              )}
              <video
                ref={videoRef}
                className="w-full rounded-xl"
                controls
                autoPlay
                src="/videos/app-demo.mp4"
              />
              <motion.button
                className="absolute -top-4 -right-4 text-white p-3 rounded-full bg-black/80 hover:bg-brand-500 border border-gray-700 shadow-lg"
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
