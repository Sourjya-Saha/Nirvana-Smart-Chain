"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Send, User, Mail, MessageSquare, FileText, Star, Lightbulb, MapPin, Search, BarChart3, Rocket, ChevronDown, ChevronUp, Check, X , ThumbsUp } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Contact Form Data Interface
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Review Form Data Interface
interface ReviewFormData {
  name: string;
  ideaRating: number;
  liveTraceRating: number;
  authenticationSecure: string;
  authenticationComment: string;
  dashboardEffectiveness: number;
  improvementSuggestions: string;
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
  
  // Review form state
  const [reviewFormData, setReviewFormData] = useState<ReviewFormData>({
    name: '',
    ideaRating: 0,
    liveTraceRating: 0,
    authenticationSecure: '',
    authenticationComment: '',
    dashboardEffectiveness: 0,
    improvementSuggestions: '',
  });
  
  const [status, setStatus] = useState<StatusType>('');
  const [focused, setFocused] = useState<string>('');
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [hoverRating, setHoverRating] = useState<{ idea: number, liveTrace: number, dashboard: number }>({
    idea: 0,
    liveTrace: 0,
    dashboard: 0
  });

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
  const handleRatingChange = (type: 'idea' | 'liveTrace' | 'dashboard', rating: number) => {
    setReviewFormData(prev => ({
      ...prev,
      [type === 'idea' ? 'ideaRating' : type === 'liveTrace' ? 'liveTraceRating' : 'dashboardEffectiveness']: rating
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

  // Handle review form submission
  const handleReviewSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/pharma-reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewFormData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setReviewFormData({
          name: '',
          ideaRating: 0,
          liveTraceRating: 0,
          authenticationSecure: '',
          authenticationComment: '',
          dashboardEffectiveness: 0,
          improvementSuggestions: '',
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

  // Star rating component
  // const StarRating = ({ 
  //   type, 
  //   value, 
  //   onChange 
  // }: { 
  //   type: 'idea' | 'liveTrace' | 'dashboard', 
  //   value: number, 
  //   onChange: (type: 'idea' | 'liveTrace' | 'dashboard', value: number) => void 
  // }) => {
  //   return (
  //     <div className="flex items-center justify-center sm:justify-start space-x-1 md:space-x-2">
  //       {[1, 2, 3, 4, 5].map((star) => (
  //         <motion.button
  //           key={star}
  //           type="button"
  //           whileHover={{ scale: 1.2 }}
  //           whileTap={{ scale: 0.9 }}
  //           onClick={() => onChange(type, star)}
  //           onMouseEnter={() => setHoverRating(prev => ({ ...prev, [type]: star }))}
  //           onMouseLeave={() => setHoverRating(prev => ({ ...prev, [type]: 0 }))}
  //           className="focus:outline-none touch-manipulation"
  //           aria-label={`Rate ${star} stars`}
  //         >
  //           <Star
  //             className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${
  //               star <= (hoverRating[type] || value)
  //                 ? 'text-yellow-400 fill-yellow-400'
  //                 : 'text-gray-300'
  //             } transition-all duration-200`}
  //           />
  //         </motion.button>
  //       ))}
  //     </div>
  //   );
  // };

  const StarRating = ({ 
    type, 
    value, 
    onChange 
  }: { 
    type: 'idea' | 'liveTrace' | 'dashboard', 
    value: number, 
    onChange: (type: 'idea' | 'liveTrace' | 'dashboard', value: number) => void 
  }) => {
    const [hoverRating, setHoverRating] = useState(0);
    
    // Emoji mapping based on rating
    const emojis = {
      0: { icon: "😶", label: "No rating" },
      1: { icon: "😞", label: "Very Dissatisfied" },
      2: { icon: "🙁", label: "Dissatisfied" },
      3: { icon: "😐", label: "Neutral" },
      4: { icon: "🙂", label: "Satisfied" },
      5: { icon: "😄", label: "Very Satisfied" }
    };
    
    // Color mapping based on rating
    const getColor = (rating) => {
      const colors = {
        0: "#CBD5E1", // gray
        1: "#EF4444", // red
        2: "#F97316", // orange
        3: "#FACC15", // yellow
        4: "#A3E635", // lime
        5: "#22C55E"  // green
      };
      return colors[rating] || "#CBD5E1";
    };
    
    // Display rating or hover rating
    const displayRating = hoverRating || value;
    
    return (
      <div className="w-full">
        <div className="flex flex-col items-center space-y-4">
          {/* Stars */}
          <div className="flex items-center justify-center space-x-1 md:space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9, rotate: -5 }}
                onClick={() => onChange(type, star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none touch-manipulation p-1"
                aria-label={`Rate ${star} stars`}
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
          
          {/* Happiness Meter */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={displayRating}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              {displayRating > 0 && (
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
                      {emojis[displayRating].icon}
                    </motion.span>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: getColor(displayRating) }}
                    >
                      {emojis[displayRating].label}
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
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Progress Meter */}
          <motion.div 
            className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${(displayRating / 5) * 100}%` }}
              style={{ backgroundColor: getColor(displayRating) }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </motion.div>
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
      {/* Background effects */}
      {/* <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        <motion.div 
          className="absolute top-20 left-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 rounded-full bg-purple-200 opacity-20 blur-3xl"
          style={{ y: y2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 rounded-full bg-cyan-200 opacity-20 blur-3xl"
          style={{ y: y3 }}
        />
      </motion.div> */}
      
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Page heading */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16 space-y-2 sm:space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            <div className="flex justify-center">
            <div className="tag  bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              Contact Us
            </div>
          </div>
          <h2 className="heading text-center text-5xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter mt-5">
            Get in Touch
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
          We’d love to hear from you! 💬 Share your experience or ask any questions—your feedback helps us enhance our pharmaceutical inventory and tracking system 🚀
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
                      <p>Message sent successfully! We'll get back to you soon.</p>
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

                  {/* Question 1: System Idea */}
                  {renderQuestionSection(
                    1,
                    <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6" />,
                    "How do you like our idea of an advanced drug inventory and tracking system?",
                    <div className="space-y-3 sm:space-y-4">
                      <p className="text-sm sm:text-base text-gray-600">Rate from 1 to 5 stars</p>
                      <div className="flex justify-center py-2 sm:py-4">
                        <StarRating
                          type="idea"
                          value={reviewFormData.ideaRating}
                          onChange={handleRatingChange}
                        />
                      </div>
                    </div>
                  )}

                  {/* Question 2: Live & Trace Feature */}
                  {renderQuestionSection(
                    2,
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />,
                    "How useful do you find our Live & Trace feature for real-time tracking?",
                    <div className="space-y-3 sm:space-y-4">
                      <p className="text-sm sm:text-base text-gray-600">Rate from 1 to 5 stars</p>
                      <div className="flex justify-center py-2 sm:py-4">
                        <StarRating
                          type="liveTrace"
                          value={reviewFormData.liveTraceRating}
                          onChange={handleRatingChange}
                        />
                      </div>
                    </div>
                  )}

                  {/* Question 3: Product Authentication */}
                  {renderQuestionSection(
                    3,
                    <Search className="h-5 w-5 sm:h-6 sm:w-6" />,
                    "Does our product authentication system help you feel more secure against counterfeits?",
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 justify-center">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setReviewFormData(prev => ({ ...prev, authenticationSecure: 'Yes' }))}
                          className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full ${
                            reviewFormData.authenticationSecure === 'Yes'
                              ? 'bg-green-100 text-green-800 border-2 border-green-500'
                              : 'bg-gray-100 text-gray-700 border-2 border-transparent'
                          } transition-all duration-200 w-full sm:w-auto`}
                        >
                          <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                          Yes
                        </motion.button>
                        
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setReviewFormData(prev => ({ ...prev, authenticationSecure: 'No' }))}
                          className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full ${
                            reviewFormData.authenticationSecure === 'No'
                              ? 'bg-red-100 text-red-800 border-2 border-red-500'
                              : 'bg-gray-100 text-gray-700 border-2 border-transparent'
                          } transition-all duration-200 w-full sm:w-auto`}
                        >
                          <X className="h-4 w-4 sm:h-5 sm:w-5" />
                          No
                        </motion.button>
                      </div>

                      {reviewFormData.authenticationSecure && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="pt-2"
                        >
                          <label htmlFor="authenticationComment" className="block text-sm sm:text-base text-gray-700 mb-2">
                            Comments (optional):
                          </label>
                          <textarea
                            id="authenticationComment"
                            name="authenticationComment"
                            value={reviewFormData.authenticationComment}
                            onChange={handleReviewChange}
                            rows={3}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            placeholder="Please share any additional thoughts..."
                          />
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Question 4: Dashboard Effectiveness */}
                  {renderQuestionSection(
                    4,
                    <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6" />,
                    "How effective is the dashboard in providing clear insights?",
                    <div className="space-y-3 sm:space-y-4">
                      <p className="text-sm sm:text-base text-gray-600">Rate from 1 to 5 stars</p>
                      <div className="flex justify-center py-2 sm:py-4">
                        <StarRating
                          type="dashboard"
                          value={reviewFormData.dashboardEffectiveness}
                          onChange={handleRatingChange}
                        />
                      </div>
                    </div>
                  )}

                  {/* Question 5: Feature Improvements */}
                  {renderQuestionSection(
                    5,
                    <Rocket className="h-5 w-5 sm:h-6 sm:w-6" />,
                    "What feature do you think would make our system even better?",
                    <div className="space-y-3 sm:space-y-4">
                      <textarea
                        id="improvementSuggestions"
                        name="improvementSuggestions"
                        value={reviewFormData.improvementSuggestions}
                        onChange={handleReviewChange}
                        rows={4}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Share your ideas for future enhancements..."
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                       {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-md sm:shadow-lg text-sm sm:text-base"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              {status === 'sending' ? 'Submitting...' : 'Submit Feedback'}
            </motion.button>

                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 text-green-800 rounded-lg p-3 sm:p-4 flex items-center justify-center border border-green-200 text-sm sm:text-base"
                    >
                      <p>Thank you for your valuable feedback! Your insights will help us improve our system.</p>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 text-red-800 rounded-lg p-3 sm:p-4 flex items-center justify-center border border-red-200 text-sm sm:text-base"
                    >
                      <p>Failed to submit your review. Please try again later.</p>
                    </motion.div>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default CombinedForm;