"use client";

import { useRef, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// Import your images
import ProductImage from "@/assets/Screenshot 2025-02-23 025855.png";
import ProductImg from "@/assets/Screenshot 2025-02-23 021706.png";
import Productimg from "@/assets/Screenshot 2025-02-23 021832.png";
import Pyeramid from "@/assets/Screenshot_2025-02-22_024152-removebg-preview.png";
import TubeImage from "@/assets/Screenshot_2025-02-22_024152-removebg-preview.png";

export const Tracking = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);

  // Define images array with proper typing
  const images: StaticImageData[] = [
    ProductImg,
    Productimg,
    ProductImage,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  // Touch handlers with proper TypeScript types
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
      } else {
        setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
      }
    }

    touchStartX.current = null;
  };

  return (
    <section 
      ref={sectionRef} 
      className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-14 overflow-x-clip"
    >
      <div className="container">
        <div className="max-w-[700px] mx-auto">
          <div className="flex justify-center">
            <div className="tag">Keep a track of your supply-chain tracking</div>
          </div>
          <h2 className="heading text-center text-5xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter">
            Supply Chain Tracking System
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
            <b>Real-time tracking</b> ✅ |<b> Seamless procurement</b> 🔄 | <b>Optimized distribution </b>🚚  
            <b>Chat Room</b> 💬 for instant driver-stakeholder communication.  
            Stay Efficient, Transparent & Connected with <b>NSC</b>! 🚀
          </p>
        </div>
        
        <div className="relative">
          <div className="relative w-full max-w-[90%] mx-auto sm:max-w-[95%] md:max-w-full mt-10">
            <div 
              className="relative aspect-video cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image 
                src={images[currentImageIndex]} 
                alt={`Product Image ${currentImageIndex + 1}`}
                className="rounded-2xl shadow-2xl w-full h-auto"
                layout="responsive"
              />
            </div>

            <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 flex gap-3">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentImageIndex === index 
                      ? 'bg-blue-500 scale-100' 
                      : 'bg-white'
                  }`}
                />
              ))}
            </div>
          </div>

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
        </div>
      </div>
    </section>
  );
};
