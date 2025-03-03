"use client";
import ArrowIcon from "@/assets/arrow-right.svg";
import cogImage from "@/assets/Screenshot_2025-02-22_021910-removebg-preview.png";
import Image from "next/image";
import cylinderImage from "@/assets/Screenshot_2025-02-22_024152-removebg-preview.png";
import noodleImage from "@/assets/Screenshot_2025-02-22_024152-removebg-preview.png";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  // Device detection for adaptive animations
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // NEW TEXT ANIMATIONS
  const headingAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const textStaggerAnimation = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const textLineAnimation = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const badgeAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    }
  };

  return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
    >
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            {/* Badge with new animation */}
            <motion.div 
              className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight"
              initial="initial"
              animate="animate"
              variants={badgeAnimation}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(255,255,255,0.3)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ 
                  color: ['#010D3E', '#183EC2', '#010D3E'],
                  textShadow: ['0 0 0px rgba(24,62,194,0)', '0 0 8px rgba(24,62,194,0.5)', '0 0 0px rgba(24,62,194,0)']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Version 1.0 is Here
              </motion.span>
            </motion.div>
            
            {/* Heading with new animation */}
            <motion.h1 
              className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6"
              initial="initial"
              animate="animate"
              variants={headingAnimation}
            >
              <motion.span
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(to right, #000000 20%, #001E80 40%, #000000 60%, #183EC2 80%)',
                  backgroundSize: '200% auto',
                  color: 'transparent',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['0% center', '200% center']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Nirvana SmartChain
              </motion.span>
            </motion.h1>
            
            {/* Text content with new stagger animation */}
            <motion.div 
              className="text-xl text-[#010D3E] tracking-tighter mt-6"
              initial="initial"
              animate="animate"
              variants={textStaggerAnimation}
            >
              <motion.p variants={textLineAnimation} className="mb-2">
                📱 <motion.strong 
                    whileHover={{ color: "#183EC2" }}
                   >Web & Android App:</motion.strong> Prevent counterfeits, ensure accurate inventory, and enhance tracking.
              </motion.p>
              <motion.p variants={textLineAnimation} className="mb-2">
                💊 <motion.strong 
                    whileHover={{ color: "#183EC2" }}
                   >Advanced Drug Inventory System:</motion.strong> Monitor drug consumption patterns, ensure transparency, and boost efficiency.
              </motion.p>
              <motion.p variants={textLineAnimation} className="mb-2">
                📊 <motion.strong 
                    whileHover={{ color: "#183EC2" }}
                   >Dashboard-Based Monitoring:</motion.strong> Track vendors, shipments, and hospital drug usage in real-time.
              </motion.p>
              <motion.p variants={textLineAnimation} className="mb-2">
                🚚 <motion.strong 
                    whileHover={{ color: "#183EC2" }}
                   >Improved Procurement:</motion.strong> Ensure drug availability, streamline distribution, and enforce quality controls.
              </motion.p>
              <motion.p variants={textLineAnimation}>
                🛡️ <motion.strong 
                    whileHover={{ color: "#183EC2" }}
                   >Enhanced Security:</motion.strong> We provide
                cutting-edge tracking technology 🔍 to verify authenticity and safeguard patients from dangerous scams.
              </motion.p>
            </motion.div>

            {/* Buttons with new animations */}
            <motion.div 
              className="flex gap-1 items-center mt-[30px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: 0.5,
                  duration: 0.5
                }
              }}
            >
              <motion.button 
                className="btn btn-primary"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(0, 30, 128, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  animate={{
                    textShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 8px rgba(255,255,255,0.5)', '0 0 0px rgba(255,255,255,0)']
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity 
                  }}
                >
                  Launching soon! 🚀
                </motion.span>
              </motion.button>
              
              <motion.button 
                className="btn btn-text gap-1"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Learn More</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowIcon className="h-5 w-5" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>

          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            <motion.img
              src={cogImage.src}
              alt="Cog Image"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 
              lg:left-[65px]"
              animate={{
                translateY: [-30, 0],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
            />
            {/* Cylinder Image */}
            <motion.img
              src={cylinderImage.src}
              width={220}
              height={220}
              alt="Cylinder"
              className="absolute sm:top-[-2rem] sm:left-[-2rem] md:-top-10 md:-left-32 sm:w-20 md:w-32 lg:w-44"
              style={{
                translateY: translateY,
              }}
            />

            {/* Noodle Image */}
            <motion.img
              src={noodleImage.src}
              width={220}
              alt="Noodle Image"
              className="absolute sm:top-[552px] sm:left-[300px] sm:w-20 md:w-32 lg:w-44 rotate-[30deg] md:top-[524px] md:left-[448px]"
              style={{
                rotate: 30,
                translateY: translateY,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
