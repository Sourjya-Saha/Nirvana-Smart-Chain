"use client";
import Product from "@/assets/distributer dashboard.png";
import Pyeramid from "@/assets/Screenshot_2025-02-22_024152-removebg-preview.png";
import TubeImage from "@/assets/Screenshot_2025-02-22_024152-removebg-preview.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
// Import the video - this will work after webpack config is updated
// import IntroVideo from "@/assets/Intro Hult - Made with Clipchamp.mp4";

export const Articles = () => {
  const sectionRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Now using the imported video 
  const videos = [
    { 
      type: "youtube", 
      src: "https://www.youtube.com/embed/5mABTJ_osjk?autoplay=1&mute=1", 
      title: "YouTube Video 1" 
    },
    { 
      type: "youtube", 
      src: "https://www.youtube.com/embed/ROz5LYXH3JA?autoplay=1&mute=1", 
      title: "YouTube Video 2" 
    },
    { 
      type: "youtube", 
      src: "https://www.youtube.com/embed/RPD3qyDowQ8?autoplay=1&mute=1", 
      title: "YouTube Video 3" 
    }
  ];

  // Touch handlers for manual video switching
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartX.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (Math.abs(deltaX) > 50) {
      setCurrentVideoIndex((prev) =>
        deltaX > 0 ? (prev === 0 ? videos.length - 1 : prev - 1) : (prev === videos.length - 1 ? 0 : prev + 1)
      );
    }

    touchStartX.current = null;
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <>
      <section ref={sectionRef} className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-16 overflow-x-clip">
        <div className="container">
          <div className="max-w-[740px] mx-auto">
            <div className="flex justify-center">
              <div className="tag">Fighting Pharmaceutical Fraud</div>
            </div>
            <h2 className="heading text-center text-5xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter">
  Recent Fake Medicine Scandal
</h2>
<p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
Authorities have exposed a counterfeit drug operation, endangering lives ⚠️. Fake medicines disguised as genuine pose serious health risks. <b>NSC</b> tracking technology 🔍 ensures authenticity and protects patients 🛡️💊.
</p>

          </div>
          
          <div className="relative mt-10">
            <div className="relative w-full max-w-[90%] mx-auto sm:max-w-[95%] md:max-w-full">
              <div 
                className="relative aspect-video cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {videos[currentVideoIndex].type === "youtube" ? (
                  <iframe 
                    src={videos[currentVideoIndex].src}
                    title={videos[currentVideoIndex].title}
                    className="rounded-2xl shadow-2xl w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video 
                    src={videos[currentVideoIndex].src} 
                    autoPlay 
                    muted 
                    playsInline
                    controls
                    className="rounded-2xl shadow-2xl w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 flex gap-3">
                {videos.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentVideoIndex === index 
                        ? 'bg-blue-500 scale-110' 
                        : 'bg-white'
                    }`}
                  />
                ))}
              </div>
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
          </div>
        </div>
      </section>
    </>
  );
};
