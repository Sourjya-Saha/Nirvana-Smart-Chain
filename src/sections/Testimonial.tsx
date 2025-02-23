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
import { motion } from "framer-motion";
import React from 'react';

const testimonials = [
  {
    text: "MedTrack&apos;s real-time dashboard has revolutionized how we manage our inventory. We can now track every product from manufacture to delivery with complete transparency.",
    imageSrc: avatar1.src,
    name: "Dr. Rajesh Kumar",
    username: "Metro Hospital, Delhi",
  },
  {
    text: "The 2-step verification system gives us confidence that all our medical supplies are authentic. We&apos;ve eliminated counterfeit products completely since implementing MedTrack.",
    imageSrc: avatar2.src,
    name: "Priya Sharma",
    username: "Quality Manager, Apollo Pharmacy",
  },
  {
    text: "The AI medicine prediction model has improved our patient care significantly. We can now offer personalized medicine recommendations with 95% accuracy.",
    imageSrc: avatar3.src,
    name: "Dr. Anika Singh",
    username: "AIIMS Research Division",
  },
  {
    text: "Shipment tracking has never been easier. We&apos;ve reduced delivery discrepancies by 67% and improved customer satisfaction scores to an all-time high.",
    imageSrc: avatar4.src,
    name: "Vikram Mehta",
    username: "LogiMed Distributors",
  },
  {
    text: "The encrypted QR system provides detailed analytics on each product scan. This data has been invaluable for our marketing team to understand consumer behavior.",
    imageSrc: avatar5.src,
    name: "Ananya Desai",
    username: "Digital Marketing Lead, Sun Pharma",
  },
  {
    text: "The OCR technology has streamlined our prescription processing. What used to take hours now happens in minutes with near-perfect accuracy.",
    imageSrc: avatar6.src,
    name: "Dr. Mohammed Ali",
    username: "Fortis Healthcare",
  },
  {
    text: "The drug consumption pattern model helped us optimize our inventory by 40%. We no longer overstock or run out of essential medications.",
    imageSrc: avatar7.src,
    name: "Sanjay Patel",
    username: "Inventory Manager, Max Healthcare",
  },
  {
    text: "The regional illness prediction model gave us a 3-month head start on manufacturing crucial antibiotics before the monsoon season. This competitive edge was game-changing.",
    imageSrc: avatar8.src,
    name: "Dr. Kavita Reddy",
    username: "Epidemiologist, ICMR",
  },
  {
    text: "Our patients love being able to verify medication authenticity through the app. It&apos;s built trust in our brand and increased customer loyalty measurably.",
    imageSrc: avatar9.src,
    name: "Rahul Gupta",
    username: "Customer Experience, MedPlus",
  },
];

// We'll create one long row instead of columns
const TestimonialsRow = ({ testimonials, duration = 80 }) => (
  <div className="overflow-hidden whitespace-nowrap w-full">
    <motion.div 
      animate={{
        translateX: '-50%',
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }} 
      className="inline-flex gap-6"
    >
      {[...new Array(2)].fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {testimonials.map(({ text, imageSrc, name, username }, idx) => (
            <div key={idx} className="card inline-block mb-[15px] w-80 whitespace-normal align-top">
              <div className="min-h-32">{text}</div>
              <div className="flex items-center gap-2 mt-5">
                <Image
                  src={imageSrc}
                  alt="image"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text text-[19px] font-medium tracking-tighter leading-5">{name}</div>
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

export const Testimonial = () => {
  return (
    <>
      <section className="bg-white">
        <div className="container mx-auto">
          <div className="section-heading">
            <div className="flex justify-center">
              <div className="tag mt-10 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">Version 1.0 is here</div>
            </div>
            <div className="max-w-[640px] mx-auto">
              <h2 className="heading text-center text-5xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter mt-5">
                What Our Clients Say
              </h2>
              <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
                See how Nirvana Smart-Chain is transforming supply chain management and enhancing patient care across India&apos;s healthcare ecosystem.
              </p>
            </div>
          </div>
          
          <div className="mt-16 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] overflow-hidden">
            <div className="py-8">
              <TestimonialsRow testimonials={testimonials} duration={40} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
