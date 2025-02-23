"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ProductImage from "@/assets/Screenshot 2025-02-23 022010.png";
import ProductImg from "@/assets/Screenshot_2025-02-18-23-08-36-25.jpg";
import Productimg from "@/assets/Screenshot 2025-02-23 022430.png";
import ProductIMG from "@/assets/Screenshot 2025-02-23 022046.png";
import Pyeramid from "@/assets/Screenshot_2025-02-22_024152-removebg-preview.png";
import TubeImage from "@/assets/Screenshot_2025-02-22_024152-removebg-preview.png";

const ThreeDMobileCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef(null);
  const touchStartX = useRef(null);

  const images = [
    ProductImg,
    ProductImage,
    Productimg,
    ProductIMG
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 15, 0]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setDirection(-1);
        setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
      } else {
        setDirection(1);
        setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
      }
    }
    touchStartX.current = null;
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      rotateY: direction > 0 ? -45 : 45,
      scale: 0.8,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  const PhoneFrame = ({ imageIndex, offset = 0, isMain = false }) => {
    const xOffset = offset * 300;
    const scale = isMain ? 1 : 0.8;
    const zIndex = isMain ? 10 : 0;
    const opacity = isMain ? 1 : 0.5;
    
    return (
      <motion.div
        className="absolute w-[320px] rounded-[3rem] overflow-hidden bg-white"
        style={{
          height: '650px',
          border: '12px solid #1a1a1a',
          transform: `translate(${xOffset}px, 0) scale(${scale})`,
          filter: isMain ? 'none' : 'blur(4px)',
          opacity,
          zIndex,
        }}
        animate={{ 
          x: xOffset,
          scale,
          opacity,
          filter: isMain ? 'none' : 'blur(4px)'
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-2xl" />
        <div className="relative h-full">
          <Image
            src={images[imageIndex]}
            alt={`Phone Screen ${imageIndex + 1}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-12 bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-[740px] mx-auto">
          <div className="flex justify-center mb-6">
            <motion.div 
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              NSC Mobile App
            </motion.div>
          </div>
          
          <motion.h2 
            className="heading text-center text-5xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your Pharmacy in Your Pocket
          </motion.h2>
          
          <motion.p 
            className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Easily browse, order, and manage medications anytime, anywhere.
            Order medicines online hassle-free 🏥
            Track real-time driver location for deliveries 🚛
            Ensure medicine authenticity by scanning the QR 🧾
            Stay secure, connected & in control with NSC! 📱
          </motion.p>

          <div className="relative perspective-1000 h-[700px]">
            <div className="absolute inset-0 flex justify-center items-center">
              {/* Previous Phone */}
              <PhoneFrame
                imageIndex={(currentImageIndex - 1 + images.length) % images.length}
                offset={-1}
              />
              
              {/* Main Phone */}
              <motion.div 
                className="relative w-[320px] rounded-[3rem] shadow-2xl overflow-hidden bg-white"
                style={{
                  height: '650px',
                  border: '12px solid #1a1a1a',
                  transformStyle: 'preserve-3d',
                  rotateY,
                  zIndex: 10,
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-2xl z-10" />
                
                <div 
                  className="h-full w-full"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={currentImageIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute w-full h-full"
                    >
                      <Image 
                        src={images[currentImageIndex]}
                        alt={`App Screen ${currentImageIndex + 1}`}
                        layout="fill"
                        objectFit="cover"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              </motion.div>

              {/* Next Phone */}
              <PhoneFrame
                imageIndex={(currentImageIndex + 1) % images.length}
                offset={1}
              />
            </div>

            {/* Decorative Elements */}
            <motion.img
              src={Pyeramid.src}
              alt="Pyramid Image"
              className="absolute md:-right-36 md:top-[-2rem] sm:w-24 md:w-40 lg:w-64 sm:right-[-45px] sm:top-[-2rem]"
              style={{ translateY }}
            />

            <div className="absolute md:left-[-9rem] sm:left-[-40px] sm:bottom-0 md:bottom-0 scale-x-[-1] rotate-[-8deg]">
              <motion.img
                src={TubeImage.src}
                alt="Tube Image"
                className="sm:w-24 md:w-40 lg:w-64"
                style={{ translateY }}
              />
            </div>

            {/* Navigation Dots */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
              {images.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                    currentImageIndex === index 
                      ? 'bg-blue-500' 
                      : 'bg-white'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: currentImageIndex === index ? 1.2 : 1,
                    opacity: currentImageIndex === index ? 1 : 0.7
                  }}
                  onClick={() => {
                    setDirection(index > currentImageIndex ? 1 : -1);
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeDMobileCarousel;