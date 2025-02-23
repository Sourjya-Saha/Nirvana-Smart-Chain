"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import avatar1 from "@/assets/Untitled design (5).png";
import avatar2 from "@/assets/Untitled design (6).png";
import avatar3 from "@/assets/Untitled design (7).png";
import avatar4 from "@/assets/Untitled design (8).png";
const teamMembers = [
  {
    name: "Srinjoy Roy",
    position: "CEO & Founder",
    description: "Defines the company's vision, mission, and long-term goals",
    imageSrc: avatar1.src // Replace with actual image path
  },
  {
    name: "Sourjya Saha",
    position: "CTO & Founder",
    description: "Leads the company's technology roadmap and innovation strategies",
    imageSrc: avatar2.src // Replace with actual image path
  },
  {
    name: "Aritra Dhar",
    position: "CISO & Founder",
    description: "Develops and enforces cybersecurity policies, risk mitigation strategies, and compliance frameworks",
    imageSrc: avatar3.src // Replace with actual image path
  },
  {
    name: "Indranil Kundu",
    position: "CFO",
    description: "Manages financial strategy, budgeting, and resource allocation",
    imageSrc: avatar4.src // Replace with actual image path
  }
];

const TeamRow = ({ teamMembers, duration = 80 }) => (
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
          {teamMembers.map((member, idx) => (
            <div key={idx} className="card inline-block mb-[15px] w-80 whitespace-normal align-top bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 relative overflow-hidden rounded-full">
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text text-2xl font-bold tracking-tighter mb-2">
                  {member.name}
                </div>
                <div className="text-blue-600 font-semibold mb-3 tracking-tight">
                  {member.position}
                </div>
                <div className="text-gray-600 leading-relaxed min-h-20">
                  {member.description}
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export const TeamSection = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag mt-10 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              Meet Our Team
            </div>
          </div>
          <div className="max-w-[640px] mx-auto">
            <h2 className="heading text-center text-5xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter mt-5">
              The Minds Behind Nirvana Smart-Chain
            </h2>
            <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
              Our dedicated team combines expertise in blockchain, healthcare, and technology to revolutionize supply chain management.
            </p>
          </div>
        </div>
        
        <div className="mt-16 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] overflow-hidden">
          <div className="py-8">
            <TeamRow teamMembers={teamMembers} duration={40} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;