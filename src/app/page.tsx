import { Articles } from "@/sections/Articles";
import { CallToAction } from "@/sections/CallToAction";
import CombinedForm from "@/sections/CombineForm";
import ContactUs from "@/sections/ContactUs";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import MobileProductSlider from "@/sections/MobileProductSlider";
import { ProductShowcase } from "@/sections/ProductShowcase";
import ReviewSystem from "@/sections/ReviewSystem";
import TeamSection from "@/sections/TeamSection";
import { Testimonial } from "@/sections/Testimonial";
import { Testimonials } from "@/sections/Testimonials";
import { Tracking } from "@/sections/Tracking";
import { Combine } from "lucide-react";

export default function Home() {
  return (
    <>
     
      <Header />
     
      {/* About section starts with Hero */}
      <div id="about" className="overflow-hidden">
        <Hero />
        <LogoTicker />
      </div>

      {/* Products section includes ProductShowcase and MobileProductSlider */}
      <div id="products" className="overflow-hidden">
        <ProductShowcase />
        <MobileProductSlider />
        <Tracking />
      </div>

      {/* Features section with Tracking */}
      <div id="features" className="overflow-hidden">
        <Testimonials />
      </div>

      {/* Testimonials section combines both testimonial components */}
      <div id="testimonials" className="overflow-hidden">
        <Testimonial />
      </div>

      {/* Team section */}
      <div id="team" className="overflow-hidden">
        <TeamSection />
      </div>

      {/* News section */}
      <div id="news" className="overflow-hidden">
        <Articles />
      </div>

      {/* Contact section includes ContactUs and CallToAction */}
      <div id="contact" className="overflow-hidden">
        <CombinedForm />
      </div>

      {/* Updates section would be added here when needed */}
      <div id="updates" className="overflow-hidden">
        <CallToAction />
      </div>

      <Footer />
     
    </>
  );
}
