"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Send, User, Mail, MessageSquare, FileText, Star, Lightbulb, MapPin, Search, BarChart3, Rocket, ChevronDown, ChevronUp, Check, X, ThumbsUp, AlertTriangle, Clock, ArrowRight, Shield, FileCheck,Zap ,Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Contact Form Data Interface
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Review Form Data Interface - Updated with new question fields
interface ReviewFormData {
  name: string;
  trackingDifficulty: number;
  shortageImportance: number;
  verificationChallenge: number;
  communicationFrequency: number;
  visibilityImportance: number;
  counterfeitConcern: number;
  regulatoryWorkload: number;
  localRetailerComfort: string;
  localRetailerComment: string;
  barcodeUseful: number;
  alertsImportance: number;
  messagingValue: number;
  reportsNecessity: number;
  blockchainImportance: number;
  generalFeedback: string;
}

type StatusType = '' | 'sending' | 'success' | 'error';
type FormType = 'contact' | 'review';

const CombinedForm = () => {
  // Active form state
  const [activeForm, setActiveForm] = useState<FormType>('contact');
  
  // Contact form state
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Review form state - Updated with new question fields
  const [reviewFormData, setReviewFormData] = useState<ReviewFormData>({
    name: '',
    trackingDifficulty: 0,
    shortageImportance: 0,
    verificationChallenge: 0,
    communicationFrequency: 0,
    visibilityImportance: 0,
    counterfeitConcern: 0,
    regulatoryWorkload: 0,
    localRetailerComfort: '',
    localRetailerComment: '',
    barcodeUseful: 0,
    alertsImportance: 0,
    messagingValue: 0,
    reportsNecessity: 0,
    blockchainImportance: 0,
    generalFeedback: '',
  });
  
  const [status, setStatus] = useState<StatusType>('');
  const [focused, setFocused] = useState<string>('');
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [hoverRating, setHoverRating] = useState<number>(0);

  // Parallax effect setup
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -30]);
  const y3 = useTransform(scrollY, [0, 300], [0, -70]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  // Reset status when switching forms
  useEffect(() => {
    setStatus('');
  }, [activeForm]);

  // Toggle between contact and review forms
  const toggleForm = (form: FormType) => {
    setActiveForm(form);
  };

  // Expand/collapse question sections
  const toggleQuestion = (questionNumber: number) => {
    setActiveQuestion(activeQuestion === questionNumber ? 0 : questionNumber);
  };

  // Handle star rating selection
  const handleRatingChange = (field: string, rating: number) => {
    setReviewFormData(prev => ({
      ...prev,
      [field]: rating
    }));
  };

  // Handle contact form changes
  const handleContactChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle review form changes
  const handleReviewChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReviewFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle contact form submission
  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactFormData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setContactFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        console.error('Server error:', data.error);
      }
    } catch (error) {
      setStatus('error');
      console.error('Error sending message:', error);
    }
  };

  // Handle review form submission - Updated for new field names
  const handleReviewSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
  
    try {
      const response = await fetch('/api/pharma-reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewFormData), // Send the review data directly
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setStatus('success');
        setReviewFormData({
          name: '',
          trackingDifficulty: 0,
          shortageImportance: 0,
          verificationChallenge: 0,
          communicationFrequency: 0,
          visibilityImportance: 0,
          counterfeitConcern: 0,
          regulatoryWorkload: 0,
          localRetailerComfort: '',
          localRetailerComment: '',
          barcodeUseful: 0,
          alertsImportance: 0,
          messagingValue: 0,
          reportsNecessity: 0,
          blockchainImportance: 0,
          generalFeedback: '',
        });
        setActiveQuestion(0);
      } else {
        setStatus('error');
        console.error('Server error:', data.error);
      }
    } catch (error) {
      setStatus('error');
      console.error('Error submitting review:', error);
    }
  };

  // Star rating component - Updated with cleaner implementation
  const StarRating = ({ 
    field,
    value, 
    onChange,
    labelLow = "Not at all",
    labelHigh = "Extremely"
  }: { 
    field: string, 
    value: number, 
    onChange: (field: string, value: number) => void,
    labelLow?: string,
    labelHigh?: string
  }) => {
    const [hover, setHover] = useState(0);
    
    // Display rating or hover rating
    const displayRating = hover || value;
    
    // Emoji mapping based on rating
    const emojis = {
      0: { icon: "😶", label: "No rating" },
      1: { icon: "😞", label: labelLow },
      2: { icon: "🙁", label: "Somewhat"  },
      3: { icon: "😐", label: "Moderately" },
      4: { icon: "🙂", label: "Very" },
      5: { icon: "😄", label: labelHigh }
    };
    
    // Color mapping based on rating
    const getColor = (rating: number): string => {
      const colors: { [key: number]: string } = {
        0: "#CBD5E1", // gray
        1: "#EF4444", // red
        2: "#F97316", // orange
        3: "#FACC15", // yellow
        4: "#A3E635", // lime
        5: "#22C55E"  // green
      };
      return colors[rating] || "#CBD5E1";
    };
    
    return (
      <div className="w-full">
        <div className="flex flex-col items-center space-y-4">
          {/* Rating labels */}
          <div className="flex justify-between w-full text-xs md:text-sm text-gray-500 px-2 mb-1">
            <span>{labelLow}</span>
            <span>{labelHigh}</span>
          </div>
          
          {/* Stars */}
          <div className="flex items-center justify-between w-full px-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9, rotate: -5 }}
                onClick={() => onChange(field, star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none touch-manipulation p-1"
                aria-label={`Rate ${star} out of 5`}
              >
                <Star
                  className={`h-8 w-8 md:h-10 md:w-10 transition-all duration-300 ease-out ${
                    star <= displayRating ? "drop-shadow-lg" : ""
                  }`}
                  fill={star <= displayRating ? getColor(displayRating) : "transparent"}
                  stroke={star <= displayRating ? getColor(displayRating) : "#94A3B8"}
                  strokeWidth={2}
                />
              </motion.button>
            ))}
          </div>
          
          {/* Rating display */}
          <AnimatePresence mode="wait">
            {displayRating > 0 && (
              <motion.div 
                key={displayRating}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  className="relative bg-gradient-to-br from-blue-50 to-purple-50 px-6 py-3 rounded-full shadow-md border border-gray-100"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: displayRating >= 4 ? [0, -1, 1, -1, 0] : 0
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: displayRating >= 5 ? Infinity : 0,
                    repeatDelay: 2
                  }}
                >
                  <div className="flex items-center gap-2">
                    <motion.span 
                      className="text-2xl md:text-3xl"
                      animate={{ 
                        rotate: displayRating >= 4 ? [0, 10, -10, 10, 0] : 0,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 0.5, 
                        repeat: displayRating >= 4 ? Infinity : 0,
                        repeatDelay: 2
                      }}
                    >
                     {emojis[displayRating as keyof typeof emojis].icon}
                    </motion.span>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: getColor(displayRating) }}
                    >
                     {emojis[displayRating as keyof typeof emojis].label}
                    </span>
                  </div>
                  
                  {/* Rating value badge */}
                  <motion.div 
                    className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-xs font-bold"
                    style={{ backgroundColor: getColor(displayRating), color: displayRating >= 3 ? "white" : "black" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    {displayRating}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  // Render expandable question sections for review form
  const renderQuestionSection = (
    questionNumber: number,
    icon: React.ReactNode,
    title: string,
    content: React.ReactNode
  ) => {
    const isActive = activeQuestion === questionNumber;
    
    return (
      <motion.div 
        className="mb-4 sm:mb-6 bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: questionNumber * 0.1 }}
      >
        <button
          type="button"
          onClick={() => toggleQuestion(questionNumber)}
          className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
          aria-expanded={isActive}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-blue-600">
              {icon}
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 text-left">{title}</h3>
          </div>
          {isActive ? (
            <ChevronUp className="h-5 w-5 flex-shrink-0 text-blue-600" />
          ) : (
            <ChevronDown className="h-5 w-5 flex-shrink-0 text-blue-600" />
          )}
        </button>
        
        {isActive && (
          <motion.div 
            className="px-4 sm:px-6 py-3 sm:py-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {content}
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-6 sm:py-8 md:py-12 overflow-hidden">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Page heading */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16 space-y-2 sm:space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center">
            <div className="tag bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              Contact Us
            </div>
          </div>
          <h2 className="heading text-center text-5xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter mt-5">
            Get in Touch
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
            We&apos;d love to hear from you! 💬 Share your experience or ask any questions—your feedback helps us enhance our pharmaceutical inventory and tracking system 🚀
          </p>
        </motion.div>

        {/* Form toggle buttons */}
        <div className="flex justify-center mb-8">
          <motion.div 
            className="bg-white p-1.5 rounded-full shadow-xl flex items-center border border-gray-100 backdrop-blur-sm bg-opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)",
              y: -2
            }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: activeForm !== 'contact' ? "rgba(243, 244, 246, 0.8)" : ""
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleForm('contact')}
              className={`py-2.5 px-3 sm:px-7 rounded-full transition-all duration-300 flex items-center gap-2 sm:gap-3 ${
                activeForm === 'contact' 
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              initial={false}
              animate={activeForm === 'contact' ? {
                y: 0,
                opacity: 1
              } : {
                y: 0,
                opacity: 0.8
              }}
            >
              <motion.div
                animate={{ rotate: activeForm === 'contact' ? 0 : -10 }}
                transition={{ type: "spring" }}
              >
                <Mail className="h-5 w-5 stroke-[2.5]" />
              </motion.div>
              <span className="font-medium text-sm sm:text-base whitespace-nowrap">Get Support</span>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: activeForm !== 'review' ? "rgba(243, 244, 246, 0.8)" : ""
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleForm('review')}
              className={`py-2.5 px-3 sm:px-7 rounded-full transition-all duration-300 flex items-center gap-2 sm:gap-3 ${
                activeForm === 'review' 
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              initial={false}
              animate={activeForm === 'review' ? {
                y: 0,
                opacity: 1
              } : {
                y: 0,
                opacity: 0.8
              }}
            >
              <motion.div
                animate={{ 
                  rotate: activeForm === 'review' ? 0 : 10,
                  scale: activeForm === 'review' ? [1, 1.2, 1] : 1
                }}
                transition={{ 
                  rotate: { type: "spring" },
                  scale: { repeat: activeForm === 'review' ? Infinity : 0, repeatDelay: 3 }
                }}
              >
                <ThumbsUp className="h-5 w-5 stroke-[2.5]" />
              </motion.div>
              <span className="font-medium text-sm sm:text-base whitespace-nowrap">Share Feedback</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Form container */}
        <motion.div 
          className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-8 md:p-12 transform transition-all duration-300 hover:shadow-2xl border border-gray-100"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {activeForm === 'contact' ? (
              <motion.div
                key="contact-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <form onSubmit={handleContactSubmit} className="space-y-6 sm:space-y-8">
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="relative">
                      <label 
                        htmlFor="contact-name" 
                        className={`absolute left-10 transition-all duration-300 ${
                          focused === 'contact-name' || contactFormData.name 
                            ? '-top-3 text-sm text-blue-600 bg-white px-2 font-medium' 
                            : 'top-3 text-gray-500'
                        }`}
                      >
                        Name
                      </label>
                      <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={contactFormData.name}
                        onChange={handleContactChange}
                        onFocus={() => setFocused('contact-name')}
                        onBlur={() => setFocused('')}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div className="relative">
                      <label 
                        htmlFor="email" 
                        className={`absolute left-10 transition-all duration-300 ${
                          focused === 'email' || contactFormData.email 
                            ? '-top-3 text-sm text-blue-600 bg-white px-2 font-medium' 
                            : 'top-3 text-gray-500'
                        }`}
                      >
                        Email
                      </label>
                      <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactFormData.email}
                        onChange={handleContactChange}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused('')}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label 
                      htmlFor="subject" 
                      className={`absolute left-10 transition-all duration-300 ${
                        focused === 'subject' || contactFormData.subject 
                          ? '-top-3 text-sm text-blue-600 bg-white px-2 font-medium' 
                          : 'top-3 text-gray-500'
                      }`}
                    >
                      Subject
                    </label>
                    <FileText className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={contactFormData.subject}
                      onChange={handleContactChange}
                      onFocus={() => setFocused('subject')}
                      onBlur={() => setFocused('')}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="relative">
                    <label 
                      htmlFor="message" 
                      className={`absolute left-10 transition-all duration-300 ${
                        focused === 'message' || contactFormData.message 
                          ? '-top-3 text-sm text-blue-600 bg-white px-2 font-medium' 
                          : 'top-3 text-gray-500'
                      }`}
                    >
                      Message
                    </label>
                    <MessageSquare className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={contactFormData.message}
                      onChange={handleContactChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('')}
                      required
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-md sm:shadow-lg text-sm sm:text-base"
                  >
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </motion.button>

                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 text-green-800 rounded-lg p-3 sm:p-4 flex items-center justify-center border border-green-200 text-sm sm:text-base"
                    >
                      <p>Message sent successfully! We&apos;ll get back to you soon.</p>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 text-red-800 rounded-lg p-3 sm:p-4 flex items-center justify-center border border-red-200 text-sm sm:text-base"
                    >
                      <p>Failed to send message. Please try again later.</p>
                    </motion.div>
                  )}
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="review-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <form onSubmit={handleReviewSubmit} className="space-y-6 sm:space-y-8">
                  {/* Reviewer Name */}
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <label 
                      htmlFor="review-name" 
                      className={`absolute left-10 transition-all duration-300 ${
                        focused === 'review-name' || reviewFormData.name 
                          ? '-top-3 text-sm text-blue-600 bg-white px-2 font-medium' 
                          : 'top-3 text-gray-500'
                      }`}
                    >
                      Your Name
                    </label>
                    <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="review-name"
                      name="name"
                      value={reviewFormData.name}
                      onChange={handleReviewChange}
                      onFocus={() => setFocused('review-name')}
                      onBlur={() => setFocused('')}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                    </motion.div>

{/* Questionnaire sections */}
{renderQuestionSection(
  1,
  <Search className="h-5 w-5 text-blue-600" />,
  "Current Challenges",
  <div className="space-y-6">
    <div className="space-y-4">
    <p className=" text-[16px] font-semibold  leading-[30px] tracking-tight text-[#010D3E] ">1. How difficult is it to track inventory in your current system?</p>
      <StarRating 
        field="trackingDifficulty" 
        value={reviewFormData.trackingDifficulty} 
        onChange={handleRatingChange}
        labelLow="Not difficult"
        labelHigh="Extremely difficult"
      />
    </div>
    
    <div className="space-y-4">
    <p className=" text-[16px] font-semibold  leading-[30px] tracking-tight text-[#010D3E] ">2. How important is addressing medication shortages to your organization?</p>
      <StarRating 
        field="shortageImportance" 
        value={reviewFormData.shortageImportance} 
        onChange={handleRatingChange}
        labelLow="Not important"
        labelHigh="Critically important"
      />
    </div>
    
    <div className="space-y-4">
    <p className=" text-[16px] font-semibold  leading-[30px] tracking-tight text-[#010D3E] ">3. How challenging is verification of medication authenticity currently?</p>
      <StarRating 
        field="verificationChallenge" 
        value={reviewFormData.verificationChallenge} 
        onChange={handleRatingChange}
        labelLow="Not challenging"
        labelHigh="Very challenging"
      />
    </div>
  </div>
)}

{renderQuestionSection(
  2,
  <MapPin className="h-5 w-5 text-blue-600" />,
  "Supply Chain Communication",
  <div className="space-y-6">
    <div className="space-y-4">
    <p className=" text-[16px] font-semibold  leading-[30px] tracking-tight text-[#010D3E] ">1. How frequently do you need to communicate with supply chain partners?</p>
      <StarRating 
        field="communicationFrequency" 
        value={reviewFormData.communicationFrequency} 
        onChange={handleRatingChange}
        labelLow="Rarely"
        labelHigh="Very frequently"
      />
    </div>
    
    <div className="space-y-4">
    <p className=" text-[16px] font-semibold  leading-[30px] tracking-tight text-[#010D3E] ">2. How important is real-time visibility into your supply chain?</p>
      <StarRating 
        field="visibilityImportance" 
        value={reviewFormData.visibilityImportance} 
        onChange={handleRatingChange}
        labelLow="Not important"
        labelHigh="Critical"
      />
    </div>
  </div>
)}

{renderQuestionSection(
  3,
  <Shield className="h-5 w-5 text-blue-600" />,
  "Security & Compliance",
  <div className="space-y-6">
    <div className="space-y-4">
    <p className=" text-[16px] font-semibold  leading-[30px] tracking-tight text-[#010D3E] ">1. How concerned are you about counterfeit medications?</p>
      <StarRating 
        field="counterfeitConcern" 
        value={reviewFormData.counterfeitConcern} 
        onChange={handleRatingChange}
        labelLow="Not concerned"
        labelHigh="Very concerned"
      />
    </div>
    
    <div className="space-y-4">
    <p className=" text-[16px] font-semibold  leading-[30px] tracking-tight text-[#010D3E] ">2. How much of a burden is regulatory compliance for your team?</p>
      <StarRating 
        field="regulatoryWorkload" 
        value={reviewFormData.regulatoryWorkload} 
        onChange={handleRatingChange}
        labelLow="Minor burden"
        labelHigh="Major burden"
      />
    </div>
    
    <div className="space-y-4">
    <p className=" text-[16px] font-semibold  leading-[30px] tracking-tight text-[#010D3E] ">3. Do you feel local retailers can authenticate medications securely?</p>
  
    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 justify-center">
        <button
          type="button"
          onClick={() => setReviewFormData({...reviewFormData, localRetailerComfort: 'Yes'})}
        className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full ${
            reviewFormData.localRetailerComfort === 'Yes' 
            ? 'bg-green-100 text-green-800 border-2 border-green-500'
            : 'bg-gray-100 text-gray-700 border-2 border-transparent'
        } transition-all duration-200 w-full sm:w-auto`}
        >
          <div className="flex items-center justify-center gap-2">
            <Check className={`h-5 w-5 ${reviewFormData.localRetailerComfort === 'Yes' ? 'text-green-500' : 'text-gray-400'}`} />
            <span>Yes</span>
          </div>
        </button>
        
        <button
          type="button"
          onClick={() => setReviewFormData({...reviewFormData, localRetailerComfort: 'No'})}
          className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full ${
            reviewFormData.localRetailerComfort === 'No' 
            ? 'bg-red-100 text-red-800 border-2 border-red-500'
            : 'bg-gray-100 text-gray-700 border-2 border-transparent'
        } transition-all duration-200 w-full sm:w-auto`}
        >
          <div className="flex items-center justify-center gap-2">
            <X className={`h-5 w-5 ${reviewFormData.localRetailerComfort === 'No' ? 'text-red-500' : 'text-gray-400'}`} />
            <span>No</span>
          </div>
        </button>
      </div>
      
      {reviewFormData.localRetailerComfort && (
        <div className="mt-4">
          <textarea
            name="localRetailerComment"
            value={reviewFormData.localRetailerComment}
            onChange={handleReviewChange}
            placeholder="Please explain your answer..."
            className="w-full p-3 border border-gray-200 rounded-lg"
            rows={3}
          />
        </div>
      )}
    </div>
  </div>
)}

{renderQuestionSection(
  4,
  <BarChart3 className="h-5 w-5 text-blue-600" />,
  "Technology Features",
  <div className="space-y-6">
    <div className="space-y-4">
    <p className=" text-[16px] font-semibold  leading-[30px] tracking-tight text-[#010D3E] ">1. How useful would barcode scanning be for authentication?</p>
      <StarRating 
        field="barcodeUseful" 
        value={reviewFormData.barcodeUseful} 
        onChange={handleRatingChange}
        labelLow="Not useful"
        labelHigh="Very useful"
      />
    </div>
    
    <div className="space-y-4">
    <p className=" text-[16px] font-semibold  leading-[30px] tracking-tight text-[#010D3E] ">2. How important are real-time alerts for inventory issues?</p>
      <StarRating 
        field="alertsImportance" 
        value={reviewFormData.alertsImportance} 
        onChange={handleRatingChange}
        labelLow="Not important"
        labelHigh="Critical"
      />
    </div>
    
    <div className="space-y-4">
    <p className=" text-[16px] font-semibold  leading-[30px] tracking-tight text-[#010D3E] ">3. How valuable would secure messaging between partners be?</p>
      <StarRating 
        field="messagingValue" 
        value={reviewFormData.messagingValue} 
        onChange={handleRatingChange}
        labelLow="Not valuable"
        labelHigh="Extremely valuable"
      />
    </div>
    
    <div className="space-y-4">
    <p className=" text-[16px] font-semibold  leading-[30px] tracking-tight text-[#010D3E] ">4. How necessary are custom reports for your operations?</p>
      <StarRating 
        field="reportsNecessity" 
        value={reviewFormData.reportsNecessity} 
        onChange={handleRatingChange}
        labelLow="Not necessary"
        labelHigh="Essential"
      />
    </div>
    
    <div className="space-y-4">
    <p className=" text-[16px] font-semibold  leading-[30px] tracking-tight text-[#010D3E] ">5. How important is blockchain for verification to your organization?</p>
      <StarRating 
        field="blockchainImportance" 
        value={reviewFormData.blockchainImportance} 
        onChange={handleRatingChange}
        labelLow="Not important"
        labelHigh="Very important"
      />
    </div>
  </div>
)}

{renderQuestionSection(
  5,
  <Lightbulb className="h-5 w-5 text-blue-600" />,
  "Additional Feedback",
  <div className="space-y-6">
    <div>
      <label htmlFor="generalFeedback" className=" text-[16px] font-semibold  leading-[30px] tracking-tight text-[#010D3E]  ">
        Any additional suggestions or improvements you&apos;d like to share?
      </label>
      <textarea
        id="generalFeedback"
        name="generalFeedback"
        value={reviewFormData.generalFeedback}
        onChange={handleReviewChange}
        rows={5}
        className="w-full p-3 border border-gray-200 rounded-lg mt-2"
        placeholder="Share your thoughts here..."
      />
    </div>
  </div>
)}

<motion.button
  type="submit"
  disabled={status === 'sending'}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-md sm:shadow-lg text-sm sm:text-base"
>
  <Rocket className="h-4 w-4 sm:h-5 sm:w-5" />
  {status === 'sending' ? 'Submitting...' : 'Submit Feedback'}
</motion.button>

{status === 'success' && (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-green-50 text-green-800 rounded-lg p-3 sm:p-4 flex items-center justify-center border border-green-200 text-sm sm:text-base"
  >
    <Check className="h-5 w-5 mr-2 text-green-600" />
    <p>Thank you for your valuable feedback! Your insights will help us improve our system.</p>
  </motion.div>
)}
{status === 'error' && (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-red-50 text-red-800 rounded-lg p-3 sm:p-4 flex items-center justify-center border border-red-200 text-sm sm:text-base"
  >
    <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
    <p>Failed to submit feedback. Please try again later.</p>
  </motion.div>
)}
</form>
</motion.div>
)}
</AnimatePresence>
</motion.div>
</div>

{/* Features section below form */}
<div className="container max-w-4xl mx-auto mt-2 sm:px-6 md:px-0 py-4 sm:py-6">
<h2 className="heading text-center text-5xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter mt-2">Why Choose Us</h2>
      
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <motion.div 
          className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg border border-blue-100 overflow-hidden relative"
          whileHover={{ y: -8, boxShadow: "0 16px 30px -10px rgba(59, 130, 246, 0.3)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-100 rounded-full opacity-20" />
          <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6 shadow-sm">
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">24/7 Support</h3>
          <p className="text-gray-600">Get expert assistance whenever you need it with our dedicated support team.</p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 shadow-lg border border-purple-100 overflow-hidden relative"
          whileHover={{ y: -8, boxShadow: "0 16px 30px -10px rgba(147, 51, 234, 0.3)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-100 rounded-full opacity-20" />
          <div className="h-14 w-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6 shadow-sm">
            <Sparkles className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Early Access</h3>
          <p className="text-gray-600">Join our exclusive beta program and be the first to experience our innovative solution.</p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-8 shadow-lg border border-green-100 overflow-hidden relative"
          whileHover={{ y: -8, boxShadow: "0 16px 30px -10px rgba(16, 185, 129, 0.3)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-100 rounded-full opacity-20" />
          <div className="h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center mb-6 shadow-sm">
            <Zap className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Fast Response</h3>
          <p className="text-gray-600">We prioritize your questions with lightning-fast response times under 24 hours.</p>
        </motion.div>
      </div>
    </div>
</section>
);
};

export default CombinedForm;
