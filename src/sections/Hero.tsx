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
  useMotionValueEvent,
} from "framer-motion";
import { useRef } from "react";
export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
    >
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">
              Version 1.0 is Here
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6 ">
              Nirvana  SmartChain
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tighter mt-6">
  📱 <strong>Web & Android App:</strong> Prevent counterfeits, ensure accurate inventory, and enhance tracking. <br />
  💊 <strong>Advanced Drug Inventory System:</strong> Monitor drug consumption patterns, ensure transparency, and boost efficiency. <br />
  📊 <strong>Dashboard-Based Monitoring:</strong> Track vendors, shipments, and hospital drug usage in real-time. <br />
  🚚 <strong>Improved Procurement:</strong> Ensure drug availability, streamline distribution, and enforce quality controls.<br/>
  🛡️<strong>Enhanced Security:</strong>We provide
  cutting-edge tracking technology 🔍 to verify authenticity and safeguard patients from such dangerous scams .
</p>

            <div className="flex gap-1 items-center mt-[30px]">
              <button className="btn btn-primary"> Launching soon! 🚀</button>
              <button className="btn btn-text gap-1">
                <span>Learn More</span>
                <ArrowIcon className="h-5 w-5" />
              </button>
            </div>
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
    className="absolute sm:top-[-2rem] sm:left-[-2rem]  md:-top-10 md:-left-32  sm:w-20 md:w-32 lg:w-44"
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
