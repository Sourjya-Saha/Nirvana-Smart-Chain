"use client";
import avatar1 from "@/assets/images (4).png";
import avatar2 from "@/assets/How_to_Find_a_Solidity_Developer_for_Hire_Comprehensive_Guide.png";
import avatar3 from "@/assets/images__2_-removebg-preview.png";
import avatar4 from "@/assets/images (1).png";
import avatar5 from "@/assets/60c844afa62d003266774427_Screenshot-2021-03-26-at-13.37.png";
import avatar6 from "@/assets/images.jpeg";
import avatar7 from "@/assets/images (2).png";
import avatar8 from "@/assets/images.jpeg";
import avatar9 from "@/assets/flutter.png";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import React from 'react';

const testimonials = [
  {
    text: " Real time interactive dashboard - products , shipment details , order details",
    imageSrc: avatar1.src,
    name: "Interactive Dashboard",
    username: "",
  },
  {
    text: "Supplychain - 2 step verification wallet address based and QR based verification",
    imageSrc: avatar2.src,
    name: "Supplychain",
    username: "",
  },
  {
    text: " Personalised medicine- AI medicine prediction model for consumer symptoms",
    imageSrc: avatar3.src,
    name: "AI based personalised medicines",
    username: "",
  },
  {
    text: "Supplychain tracking - track the path of any product shipped",
    imageSrc: avatar4.src,
    name: "Supplychain - Tracking",
    username: "",
  },
  {
    text: "Encrypted dynamic QR tracking system- tracks the number of scans",
    imageSrc: avatar5.src,
    name: "Encrypted dynamic QR",
    username: "",
  },
  {
    text: "OCR - automate orders for consumers by uploading respective prescription",
    imageSrc: avatar6.src,
    name: "Optical Character Recognition",
    username: "",
  },
  {
    text: "Hospital Drug consumption pattern recognition learning model",
    imageSrc: avatar7.src,
    name: "AI based drug consumption model",
    username: "",
  },
  {
    text: "Prediction model of which illness is rising amongst Indian regions and prediction of possible future trending drugs so that we can gain advantage over other manufacturers",
    imageSrc: avatar8.src,
    name: "AI Prediction model",
    username: "",
  },
  {
    text: "Flutter based android app for consumers having features like tracking supply chain for a particular product for checking its authenticity",
    imageSrc: avatar9.src,
    name: "Future Scope - App for consumers",
    username: "",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => (
  <div className={props.className}>
    <motion.div
      animate={{
        translateY: '-50%',
      }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...new Array(2)].fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(({ text, imageSrc, name, username }, cardIndex) => (
            <div key={`${name}-${cardIndex}-${index}`} className="card">
              <div>{text}</div>
              <div className="flex items-center gap-2 mt-5">
                <Image
                  src={imageSrc}
                  alt={`${name} avatar`}
                  width={40}
                  height={40}
                  className="h-10 w-19 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text text-[19px] font-medium tracking-tighter leading-5">
                    {name}
                  </div>
                  <div className="leading-5 tracking-tight">{username}</div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  return (
    <>
      <section className="bg-white">
        <div className="container">
          <div className="section-heading">
            <div className="flex justify-center">
              <div className="tag mt-10">Version 1.0 is here</div>
            </div>
            <div className="max-w-[640px] mx-auto">
              <h2 className="heading text-center text-5xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter mt-5">
                Our Features
              </h2>
              <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
                dolorem placeat, pariatur illum nisi eum.
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-6 max-h-[738px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] mt-10 overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn
              testimonials={secondColumn}
              duration={19}
              className="hidden md:block"
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block"
              duration={17}
            />
          </div>
        </div>
      </section>
    </>
  );
};
