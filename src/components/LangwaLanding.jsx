// src/components/LangwaLanding.jsx

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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

const LangwaLanding = () => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
        color: 0x6a0dad,
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
  }, []);

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
return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Enhanced Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl font-bold text-purple-700">Langwa</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'Benefits', 'Community', 'Testimonials', 'Download'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-all"
                whileHover={{ scale: 1.05, backgroundColor: '#7e22ce' }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning Free
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.div 
              className="md:hidden"
              whileTap={{ scale: 0.9 }}
            >
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-gray-600 p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white shadow-lg overflow-hidden"
            >
              <div className="px-4 py-2 space-y-1">
                {['Features', 'Benefits', 'Community', 'Testimonials', 'Download'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-3 py-2 text-gray-600 hover:text-purple-700 transition-colors"
                    whileHover={{ x: 10, color: '#7e22ce' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  className="w-full text-center bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 mt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Learning Free
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-white overflow-hidden z-10"
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
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Master Any Language with{' '}
              <motion.span
                className="text-purple-600 inline-block origin-center"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: "easeInOut"
                }}
              >
                Langwa
              </motion.span>
            </motion.h1>

            {/* Language Rotation */}
            <motion.div
              className="text-xl text-gray-600 mb-8 h-8 relative overflow-hidden"
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
                className="bg-purple-600 text-white px-8 py-3 rounded-full flex items-center justify-center group"
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
                className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full flex items-center justify-center"
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
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative z-10 features-section"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-900 mb-12"
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
                className="feature-card p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all"
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
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
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
        className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50 relative z-10"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
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
                  <Check className="h-6 w-6 text-purple-600 mr-3" />
                  <span className="text-gray-700">{benefit}</span>
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
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative z-10"
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Join Our Global Community
            </h2>
            <p className="text-gray-600 mb-6">
              Connect with millions of learners worldwide. Share your progress, practice with native speakers, and be part of a supportive community that helps you achieve fluency.
            </p>
            <motion.button
              className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-all flex items-center"
              whileHover={{ scale: 1.05, backgroundColor: '#7e22ce' }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Rest of your sections (Testimonials, Download, Contact, Footer) remain the same */}
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
              >
                <X className="h-6 w-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Join Thousands of Successful Language Learners
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-white shadow-lg"
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
                  <p className="text-gray-600 mb-4">{testimonial.text}</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
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
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative z-10"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Start Learning Today
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Download Langwa and begin your language learning journey
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#"
              className="flex items-center justify-center bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="mr-2 h-5 w-5" />
              App Store
            </motion.a>
            <motion.a
              href="#"
              className="flex items-center justify-center bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all"
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
        className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Get in Touch
          </h2>
          <div className="max-w-md mx-auto">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Your Message"
                  rows="5"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-all"
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
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative z-10">
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
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  About
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Careers
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
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
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Blog
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Community
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
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
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Privacy Policy
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Terms of Service
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Cookie Policy
                </motion.a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Langwa. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LangwaLanding;