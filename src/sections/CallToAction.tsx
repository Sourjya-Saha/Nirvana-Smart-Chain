"use client";
import ArrowIcon from "@/assets/arrow-right.svg";
import StarImage from "@/assets/Screenshot_2025-02-22_053800-removebg-preview.png";
import springImage from "@/assets/Screenshot_2025-02-22_053800-removebg-preview.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-16 overflow-x-clip"
    >
      <div className="container">
        <div className="section-heading relative">
        <h2 className="heading text-center text-4xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter mt-5">
  Stay Tuned for Updates!
</h2>
<p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
  Celebrate the joy of accomplishment with an app designed to track 
  your inventory and monitor your supply chain.
</p>
<p className="text-center text-[20px] leading-[28px] tracking-tight text-[#010D3E] mt-3 font-semibold">
  Launching soon! 🚀
</p>

          
          {/* Left image: smaller and rotated -45 degrees (flipped) */}
          {/* Left image: rotated -45 degrees (flipped) with responsive sizing */}
<motion.div
  className="absolute sm:left-[-30px] md:left-[-9rem] lg:-left-[19rem] sm:top-[-2rem] md:top-[-5rem] lg:-top-[8rem]"
  style={{
    translateY,
    rotate: -45, // Rotated at -45 degrees (flipped)
  }}
>
  <Image
    src={StarImage.src}
    alt="starimage"
    className="sm:w-[60px] md:w-40  "
    width={140}
    height={140}
  />
</motion.div>

{/* Right image: rotated 45 degrees with responsive sizing */}
<motion.div
  className="absolute sm:right-[-30px] md:right-[-9rem] lg:-right-[19rem] sm:top-[7rem] md:top-[-1rem] lg:top-0"
  style={{
    translateY,
    rotate: 45, // Rotated at 45 degrees
  }}
>
  <Image
    src={springImage.src}
    alt="springimage"
    className="sm:w-[60px] md:w-40  "
    width={180}
    height={180}
  />
</motion.div>
        </div>
        
        {/* <div className="flex gap-2 mt-10 justify-center">
          <button className="btn btn-primary"> Launching soon! 🚀</button>
          <button className="btn btn-text gap-1">
            <span>Learn more</span>
            <ArrowIcon className="h-5 w-5" />
          </button>
        </div> */}
      </div>
    </section>
  );
};
