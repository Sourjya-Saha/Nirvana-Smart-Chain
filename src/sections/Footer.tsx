"use client";
import Logo from "@/assets/Screenshot 2024-09-24 054804.png";
import Image from "next/image";
import SocialX from '@/assets/social-x.svg';
import SocialInsta from '@/assets/social-insta.svg';
import SocialLinkedIIn from '@/assets/social-linkedin.svg';
import SocialPin from '@/assets/social-pin.svg';
import SocialYt from '@/assets/social-youtube.svg';

export const Footer = () => {
  // Function to handle smooth scrolling
  const scrollToSection = (sectionId: string) => {  // <-- Explicitly define type
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = element.offsetTop - 100; // Adjust offset to account for header height
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  // Navigation items array to maintain consistency with header
  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Products', id: 'products' },
    { label: 'Features', id: 'features' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'News', id: 'news' },
    { label: 'Contact', id: 'contact' },
    { label: 'Updates', id: 'updates' }
  ];

  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-95 blur"></div>
            <Image src={Logo} alt="Saas app" height={45} width={45} className="relative rounded-lg" />
          </div>
        </div>
        
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex justify-center gap-6 mt-6">
          <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
            <SocialInsta />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:opacity-80 transition-opacity">
            <SocialLinkedIIn />
          </a>
          <a href="#" aria-label="Twitter" className="hover:opacity-80 transition-opacity">
            <SocialX />
          </a>
          <a href="#" aria-label="Pinterest" className="hover:opacity-80 transition-opacity">
            <SocialPin />
          </a>
          <a href="#" aria-label="YouTube" className="hover:opacity-80 transition-opacity">
            <SocialYt />
          </a>
        </div>

        <p className="mt-6">&copy; 2025 Nirvana Smart-Chain, Pvt Ltd. All rights reserved</p>
      </div>
    </footer>
  );
};
