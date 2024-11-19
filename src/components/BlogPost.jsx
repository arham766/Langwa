import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import * as THREE from 'three';
import { getBlogPost } from '../data/blogData';

const ShareButton = ({ icon: Icon, label, onClick, className }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`p-2 rounded-full flex items-center space-x-2 ${className}`}
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
    <span className="hidden md:inline">{label}</span>
  </motion.button>
);

const BlogPost = () => {
  const { id } = useParams();
  const post = getBlogPost(id);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const canvasRef = useRef(null);
  const threeSceneRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkTheme(true);
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        color: isDarkTheme ? 0xcccccc : 0x6a0dad,
        size: 0.5,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      camera.position.z = 50;

      const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0005;
        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
      };
    }
  }, [isDarkTheme]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`);
        break;
      default:
        navigator.clipboard.writeText(url);
    }
  };

  if (!post) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkTheme ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-purple-50 to-white'}`}>
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-4`}>
            404 - Post Not Found
          </h2>
          <Link 
            to="/"
            className={`text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-purple-50 to-white'} overflow-x-hidden`}>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? `${isDarkTheme ? 'bg-gray-900/90' : 'bg-white/90'} shadow-lg backdrop-blur-lg` 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <ArrowLeft className={`w-5 h-5 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} group-hover:transform group-hover:-translate-x-1 transition-transform`} />
              <span className={`text-lg font-bold ${isDarkTheme ? 'text-purple-400' : 'text-purple-700'}`}>
                Back to Blog
              </span>
            </Link>

            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkTheme ? 'bg-gray-800 text-yellow-400' : 'bg-purple-100 text-purple-700'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className={`text-4xl md:text-5xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-6`}>
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className={`flex items-center ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                <Calendar className="w-5 h-5 mr-2" />
                {post.date}
              </div>
              <div className={`flex items-center ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                <Clock className="w-5 h-5 mr-2" />
                {post.readTime}
              </div>
              <div className={`flex items-center ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                <span className="text-sm px-3 py-1 rounded-full bg-purple-100 dark:bg-gray-800">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="flex items-center mb-8">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className={`font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                  {post.author.name}
                </h3>
                <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                  {post.author.role}
                </p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden mb-8">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          </header>

          <div
            className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-4`}>
                Share this article
              </h3>
              <div className="flex items-center space-x-4">
                <ShareButton
                  icon={Facebook}
                  label="Facebook"
                  onClick={() => handleShare('facebook')}
                  className={`${isDarkTheme ? 'bg-gray-800 text-blue-400' : 'bg-blue-100 text-blue-600'}`}
                />
                <ShareButton
                  icon={Twitter}
                  label="Twitter"
                  onClick={() => handleShare('twitter')}
                  className={`${isDarkTheme ? 'bg-gray-800 text-sky-400' : 'bg-sky-100 text-sky-600'}`}
                />
                <ShareButton
                  icon={Linkedin}
                  label="LinkedIn"
                  onClick={() => handleShare('linkedin')}
                  className={`${isDarkTheme ? 'bg-gray-800 text-blue-400' : 'bg-blue-100 text-blue-600'}`}
                />
                <ShareButton
                  icon={Share2}
                  label="Copy Link"
                  onClick={() => handleShare('copy')}
                  className={`${isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`text-sm px-3 py-1 rounded-full ${
                    isDarkTheme 
                      ? 'bg-gray-800 text-gray-300' 
                      : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogPost;