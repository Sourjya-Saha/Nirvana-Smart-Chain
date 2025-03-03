"use client";
import ArrowIcon from "@/assets/arrow-right.svg";
import medicineBottleImage from "@/assets/Screenshot_2025-02-22_021910-removebg-preview.png";
import Image from "next/image";
import medicinePill1 from "@/assets/Screenshot_2025-02-22_024152-removebg-preview.png";
import medicinePill2 from "@/assets/Screenshot_2025-02-22_024152-removebg-preview.png";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue, // Import useMotionValue
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const bottleRef = useRef(null);
  const pill1Ref = useRef(null);
  const pill2Ref = useRef(null);
  
  // Device detection for adaptive animations
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);
  
  // Advanced scroll controls with responsive adjustments
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  // Interactive hover state for dynamic elements
  const [hoverState, setHoverState] = useState({
    bottle: false,
    pill1: false,
    pill2: false,
    cta: false
  });
  
  // Enhanced scroll-based transforms
  const translateY = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, isMobile ? -100 : -250]
  );
  
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [1, 1.1, isMobile ? 0.95 : 0.85]
  );
  
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [1, 0.85, 0.6]
  );
  
  const rotation = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [0, 15, 30]
  );

  // Create MotionValues for mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Transform MotionValues for different elements
  const bottleX = useTransform(
    mouseX,
    [-1, 1],
    [isMobile ? -10 : -30, isMobile ? 10 : 30]
  );
  
  const bottleRotateY = useTransform(
    mouseX,
    [-1, 1],
    [isMobile ? -5 : -15, isMobile ? 5 : 15]
  );
  
  const bottleRotateX = useTransform(
    mouseY,
    [-1, 1],
    [isMobile ? 5 : 15, isMobile ? -5 : -15]
  );
  
  const pill1X = useTransform(
    mouseX,
    [-1, 1],
    [isMobile ? 10 : 30, isMobile ? -10 : -30]
  );
  
  const pill1Y = useTransform(
    mouseY,
    [-1, 1],
    [isMobile ? 10 : 30, isMobile ? -10 : -30]
  );
  
  const pill2X = useTransform(
    mouseX,
    [-1, 1],
    [isMobile ? -15 : -45, isMobile ? 15 : 45]
  );
  
  const pill2Y = useTransform(
    mouseY,
    [-1, 1],
    [isMobile ? -15 : -45, isMobile ? 15 : 45]
  );
  
  // Fancy pill animations
  const pillAnimation = {
    hover: {
      scale: 1.2,
      rotate: 15,
      transition: { duration: 0.4 }
    },
    tap: {
      scale: 0.9,
      rotate: -15,
      transition: { duration: 0.2 }
    },
    float: {
      y: [-15, 15],
      rotate: [-5, 5],
      transition: {
        y: { repeat: Infinity, repeatType: "mirror", duration: 3.5, ease: "easeInOut" },
        rotate: { repeat: Infinity, repeatType: "mirror", duration: 4, ease: "easeInOut" }
      }
    }
  };
  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] pt-8 pb-20 md:pt-12 md:pb-16 bg-gradient-to-br from-[#0a1b4d] via-[#183EC2] to-[#EAEEFE] overflow-hidden"
    >
      {/* Animated geometric patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {Array.from({ length: isMobile ? 15 : 30 }).map((_, i) => {
          const size = Math.random() * (isMobile ? 30 : 60) + (isMobile ? 10 : 20);
          const xPos = Math.random() * 100;
          const yPos = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = 10 + Math.random() * 20;
          
          return (
            <motion.div
              key={`shape-${i}`}
              className="absolute"
              style={{
                width: size,
                height: size,
                left: `${xPos}%`,
                top: `${yPos}%`,
                borderRadius: Math.random() > 0.5 ? '50%' : `${Math.floor(Math.random() * 40) + 10}%`,
                border: `${Math.random() > 0.7 ? '1px' : '0px'} solid rgba(255,255,255,0.1)`,
                background: Math.random() > 0.8 
                  ? `linear-gradient(135deg, rgba(24, 62, 194, 0.2), rgba(255, 255, 255, 0.1))`
                  : 'transparent',
                backdropFilter: `blur(${Math.random() * 5}px)`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                rotate: [0, Math.random() * 360],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, Math.random() * 0.5 + 0.8, 1],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>
      
      {/* Energy waves */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1/3 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 100% 70% at 50% 100%, rgba(73, 102, 241, 0.4), transparent)`
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container relative z-10 h-full flex flex-col justify-center" ref={contentRef}>
        <div className="md:flex items-center md:gap-8 lg:gap-12">
          <motion.div 
            className="md:w-[478px] lg:w-[520px]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="text-sm inline-flex border border-[#ffffff]/20 px-3 py-1 rounded-lg tracking-tight bg-white/20 backdrop-blur-md"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <motion.span
                animate={{ color: ['#ffffff', '#a0c4ff', '#ffffff'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Version 1.0 is Here
              </motion.span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mt-6"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
              }}
              style={{
                background: 'linear-gradient(to right, #ffffff 20%, #89CFF0 40%, #ffffff 60%, #a0c4ff 80%)',
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
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-white/90 tracking-tighter mt-6"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              📱 <motion.strong 
                    whileHover={{ color: "#89CFF0" }}
                   >Web & Android App:</motion.strong> Prevent counterfeits, ensure accurate inventory, and enhance tracking. <br />
              💊 <motion.strong 
                    whileHover={{ color: "#89CFF0" }}
                   >Advanced Drug Inventory System:</motion.strong> Monitor drug consumption patterns, ensure transparency, and boost efficiency. <br />
              📊 <motion.strong 
                    whileHover={{ color: "#89CFF0" }}
                   >Dashboard-Based Monitoring:</motion.strong> Track vendors, shipments, and hospital drug usage in real-time. <br />
              🚚 <motion.strong 
                    whileHover={{ color: "#89CFF0" }}
                   >Improved Procurement:</motion.strong> Ensure drug availability, streamline distribution, and enforce quality controls.<br/>
              🛡️ <motion.strong 
                    whileHover={{ color: "#89CFF0" }}
                   >Enhanced Security:</motion.strong> We provide
              cutting-edge tracking technology 🔍 to verify authenticity and safeguard patients from dangerous scams.
            </motion.p>

            <motion.div 
              className="flex gap-3 items-center mt-8"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
              }}
            >
              <motion.button 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(0, 30, 255, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoverState({...hoverState, cta: true})}
                onHoverEnd={() => setHoverState({...hoverState, cta: false})}
              >
                <span className="relative z-10">Launching soon! 🚀</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-500 to-blue-600"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    opacity: hoverState.cta ? 1 : 0
                  }}
                />
                <motion.div
                  className="absolute -inset-1 rounded-lg opacity-30 bg-blue-400 blur-md"
                  animate={{ 
                    scale: [0.9, 1.1, 0.9],
                    opacity: [0.2, 0.4, 0.2] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity 
                  }}
                />
              </motion.button>
              
              <motion.button 
                className="flex items-center gap-1 px-6 py-3 rounded-lg font-medium text-white/90 relative"
                whileHover={{ x: 5, color: "#ffffff" }}
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
          </motion.div>

          <div className="mt-12 md:mt-0 md:h-[550px] lg:h-[648px] md:flex-1 relative perspective">
            {/* Medicine Bottle with enhanced animations */}
            <motion.div
              ref={bottleRef}
              className="relative md:absolute md:h-full md:w-auto md:max-w-none md:left-0 lg:left-[65px]"
              style={{
                y: translateY,
                scale: scale,
                opacity: opacity,
                transformStyle: "preserve-3d",
                x: bottleX,
                rotateY: bottleRotateY,
                rotateX: bottleRotateX,
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoverState({...hoverState, bottle: true})}
              onHoverEnd={() => setHoverState({...hoverState, bottle: false})}
            >
              <motion.div className="relative">
                <motion.img
                  src={medicineBottleImage.src}
                  alt="Medicine Bottle"
                  className="w-full h-auto"
                  animate={{
                    y: [-10, 10],
                    rotate: [-2, 2],
                  }}
                  transition={{
                    y: {
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 3,
                      ease: "easeInOut",
                    },
                    rotate: {
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 5,
                      ease: "easeInOut",
                    }
                  }}
                  style={{
                    filter: "drop-shadow(0 20px 30px rgba(0, 30, 128, 0.4))",
                  }}
                />
                
                {/* Hover effect */}
                <AnimatePresence>
                  {hoverState.bottle && (
                    <motion.div
                      className="absolute inset-0 bg-blue-400/20 rounded-3xl blur-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.2 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
                            
                {/* Scanning effect */}
                <motion.div
                  className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"
                  initial={{ top: "-50px" }}
                  animate={{ top: ["0%", "100%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Medicine Pill 1 - Enhanced with 3D effects */}
            <motion.div
              ref={pill1Ref}
              className="absolute sm:top-[-2rem] sm:left-[-2rem] md:-top-10 md:-left-22 sm:w-20 md:w-28 lg:w-40"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                rotateZ: rotation,
                x: pill1X,
                y: pill1Y,
                transformStyle: "preserve-3d",
              }}
              whileHover="hover"
              whileTap="tap"
            
              variants={pillAnimation}
              onHoverStart={() => setHoverState({...hoverState, pill1: true})}
              onHoverEnd={() => setHoverState({...hoverState, pill1: false})}
            >
              <motion.div className="relative">
                <motion.img
                  src={medicinePill1.src}
                  width={220}
                  height={220}
                  alt="Medicine Pill"
                  className="w-full h-auto"
                  style={{
                    filter: "drop-shadow(0 10px 25px rgba(0, 30, 128, 0.4))",
                  }}
                />
                
                {/* Hover glow */}
                <AnimatePresence>
                  {hoverState.pill1 && (
                    <motion.div
                      className="absolute inset-0 bg-blue-300/30 rounded-full blur-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.5 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
                
                {/* Particle trail effect */}
                {!isMobile && Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={`trail-1-${i}`}
                    className="absolute w-3 h-3 rounded-full bg-blue-500/30 blur-sm"
                    animate={{
                      opacity: [0.8, 0],
                      scale: [1, 0.5],
                      top: ['50%', `${40 + Math.random() * 20}%`],
                      left: ['50%', `${40 + Math.random() * 20}%`],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Medicine Pill 2 - Enhanced with 3D effects */}
            <motion.div
              ref={pill2Ref}
              className="absolute sm:bottom-0 sm:right-0 md:bottom-16 md:right-8 lg:bottom-24 lg:right-16 sm:w-20 md:w-28 lg:w-40"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{
                rotateZ: 30,
                x: pill2X,
                y: pill2Y,
                transformStyle: "preserve-3d",
              }}
              whileHover="hover"
              whileTap="tap"
            
              variants={{
                ...pillAnimation,
                float: {
                  y: [0, -20, 0],
                  rotate: [30, 60, 30],
                  transition: {
                    y: { repeat: Infinity, repeatType: "mirror", duration: 4, ease: "easeInOut" },
                    rotate: { repeat: Infinity, repeatType: "mirror", duration: 6, ease: "easeInOut" }
                  }
                }
              }}
              onHoverStart={() => setHoverState({...hoverState, pill2: true})}
              onHoverEnd={() => setHoverState({...hoverState, pill2: false})}
            >
              <motion.div className="relative md:right-[-180px]">
                <motion.img
                  src={medicinePill2.src}
                  width={220}
                  alt="Medicine Pill"
                  className="w-full h-auto "
                  style={{
                    filter: "drop-shadow(0 15px 20px rgba(0, 30, 128, 0.35))",
                  }}
                />
                
                {/* Hover glow */}
                <AnimatePresence>
                  {hoverState.pill2 && (
                    <motion.div
                      className="absolute inset-0 bg-indigo-300/30 rounded-full blur-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.5 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Small floating medicine particles with responsive behavior */}
            {/* {Array.from({ length: isMobile ? 8 : 15 }).map((_, i) => {
              const size = Math.random() * 8 + 4;
              const xPos = 20 + Math.random() * 60;
              const yPos = 20 + Math.random() * 60;
              const duration = 3 + Math.random() * 7;
              
              return (
                <motion.div
                  key={`pill-particle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: size,
                    height: size,
                    left: `${xPos}%`,
                    top: `${yPos}%`,
                    background: `rgba(${24 + Math.random() * 50}, ${60 + Math.random() * 100}, ${190 + Math.random() * 65}, ${0.4 + Math.random() * 0.6})`,
                    boxShadow: `0 0 ${size * 2}px rgba(${24 + Math.random() * 50}, ${60 + Math.random() * 100}, ${190 + Math.random() * 65}, 0.5)`,
                  }}
                  animate={{
                    x: [0, Math.random() * 50 - 25],
                    y: [0, Math.random() * 50 - 25],
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              );
            })} */}
          </div>
        </div>
      </div>
      
      {/* Digital circuit pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: isMobile ? "150px 150px" : "200px 200px",
          }}
          animate={{
            backgroundPosition: ['0px 0px', '200px 200px'],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>
      
      {/* Add global styles for 3D effects */}
      <style jsx global>{`
        .perspective {
          perspective: 1200px;
        }
        @media (max-width: 768px)
          .perspective {
            perspective: 800px;
          }
        }
      `}</style>
    </section>
  );
};
