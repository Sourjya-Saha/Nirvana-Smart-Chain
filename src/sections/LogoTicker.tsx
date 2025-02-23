"use client";

import acmeLogo from '@/assets/sddefault-removebg-preview.png';
import quantamLogo from '@/assets/VyvcKdbWHbTaN3QzRCQQS7pXASq1-303c31j4-removebg-preview.png';
import echoLogo from '@/assets/kyKz5-removebg-preview.png';
import celestialLogo from '@/assets/8k73hi03ck8mnm830xpu.png';
import pulse from '@/assets/ETH_logo_landscape_(gray).png';
import apexLogo from '@/assets/images__3_-removebg-preview (1).png';
import sckitLogo from '@/assets/images__2_-removebg-preview.png';
import pandas from '@/assets/images__1_-removebg-preview (1).png';
import metamask from '@/assets/1_eu3r8jvsCHDGj4z5f8Nkxg-removebg-preview (1).png';
import nextjs from '@/assets/nextjs-icon-2048x1234-pqycciiu.png';
import Image from 'next/image';
import {motion} from 'framer-motion';


export const LogoTicker = () => {
  return( <div className='py-8 md:py-12 bg-white'>
    <div className="container">
      <div className='flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]'>
      <motion.div className='flex gap-14 flex-none pr-14 ' animate={{
        translateX:"-50%",
      }}
      transition={{
        duration:12,
        repeat:Infinity,
        ease:"linear",
        repeatType:"loop",
      }}>
        <Image src={acmeLogo} alt='AcmeLogo'  className='logo-ticker-image' />
        <Image src={quantamLogo} alt='quantam Logo' className='logo-ticker-image'/>
        <Image src={echoLogo} alt='echo Logo' className='logo-ticker-image'/>
        <Image src={celestialLogo} alt='celestial Logo' className='logo-ticker-image'/>
        <Image src={pulse} alt='pulse Logo' className='logo-ticker-image'/>
        <Image src={apexLogo} alt='apex Logo' className='logo-ticker-image'/>
        <Image src={sckitLogo} alt='apex Logo' className='logo-ticker-image'/>
        <Image src={pandas} alt='apex Logo' className='logo-ticker-image'/>
        <Image src={metamask} alt='apex Logo' className='logo-ticker-image'/>
        <Image src={nextjs} alt='apex Logo' className='logo-ticker-image'/>

{/*2nd set off logo for anime */}
        <Image src={acmeLogo} alt='AcmeLogo'  className='logo-ticker-image' />
        <Image src={quantamLogo} alt='quantam Logo' className='logo-ticker-image'/>
        <Image src={echoLogo} alt='echo Logo' className='logo-ticker-image'/>
        <Image src={celestialLogo} alt='celestial Logo' className='logo-ticker-image'/>
        <Image src={pulse} alt='pulse Logo' className='logo-ticker-image'/>
        <Image src={apexLogo} alt='apex Logo' className='logo-ticker-image'/>
        <Image src={sckitLogo} alt='apex Logo' className='logo-ticker-image'/>
        <Image src={pandas} alt='apex Logo' className='logo-ticker-image'/>
        <Image src={metamask} alt='apex Logo' className='logo-ticker-image'/>
        <Image src={nextjs} alt='apex Logo' className='logo-ticker-image'/>
      </motion.div>
      </div>
    </div>

  </div>
  );
};
