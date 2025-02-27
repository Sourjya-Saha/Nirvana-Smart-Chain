"use client";
import { useState, useEffect } from "react";
import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/Screenshot 2024-09-24 054804.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedText = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    'Welcome to NIRVANA SMART-CHAIN',
    'Stay Tuned for Updates! Launching soon! 🚀'
  ];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  useEffect(() => {
  let timeout: NodeJS.Timeout | null = null; // Explicitly define type

  const animate = () => {
    const currentMessage = messages[messageIndex];
    
    if (!isDeleting) {
      if (text.length < currentMessage.length) {
        setText(currentMessage.slice(0, text.length + 1));
        timeout = setTimeout(animate, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      if (text.length > 0) {
        setText(text.slice(0, -1));
        timeout = setTimeout(animate, deletingSpeed);
      } else {
        setIsDeleting(false);
        setMessageIndex((prev) => (prev + 1) % messages.length);
      }
    }
  };

  timeout = setTimeout(animate, typingSpeed);

  return () => {
    if (timeout) clearTimeout(timeout);
  };
}, [text, isDeleting, messageIndex]);


  return (
    <p className="text-white/60 md:block min-h-[24px]">
      {text}
    </p>
  );
};

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = element.offsetTop - 100; // Adjust offset to account for header height
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  }
  setMobileMenuOpen(false); // Close mobile menu after clicking
};


  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Products', id: 'products' },
    { label: 'Features', id: 'features' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
    { label: 'News', id: 'news' },
    { label: 'Updates', id: 'updates' }
  ];

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <AnimatedText />
      </div>
      <div className="py-5 relative">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="relative">
              <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-95 blur"></div>
              <Image src={Logo} alt="Saas app" height={45} width={45} className="relative rounded-lg" />
            </div>

            <button 
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className="hover:text-black transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tighter hover:bg-gray-800 transition-colors">
                Launching soon! 🚀
              </button>
            </nav>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-20 md:hidden"
                onClick={toggleMenu}
              />
              
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed top-[45px] right-0 h-full w-64 mt-[5px] bg-white shadow-lg z-30 md:hidden"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-4 border-b">
                    <p className="font-medium">Menu</p>
                    <button onClick={toggleMenu} className="p-2" aria-label="Close menu">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                  
                  <nav className="flex flex-col gap-1 p-4 bg-white">
                    {navItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.id);
                        }}
                        className="py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
