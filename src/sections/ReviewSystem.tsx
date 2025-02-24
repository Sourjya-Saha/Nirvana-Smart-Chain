"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Send, User, Star, MessageSquare, ChevronDown, ChevronUp, Check, X, Lightbulb, MapPin, Search, BarChart3, Rocket } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

const ReviewSystem = () => {
  // Form state
  const [formData, setFormData] = useState<ReviewFormData>({
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

  // Expand/collapse question sections
  const toggleQuestion = (questionNumber: number) => {
    setActiveQuestion(activeQuestion === questionNumber ? 0 : questionNumber);
  };

  // Handle star rating selection
  const handleRatingChange = (type: 'idea' | 'liveTrace' | 'dashboard', rating: number) => {
    setFormData(prev => ({
      ...prev,
      [type === 'idea' ? 'ideaRating' : type === 'liveTrace' ? 'liveTraceRating' : 'dashboardEffectiveness']: rating
    }));
  };

  // Handle text and selection changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/pharma-reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        // Reset form
        setFormData({
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

  // Star rating component - optimized for mobile with responsive sizing
  const StarRating = ({ 
    type, 
    value, 
    onChange 
  }: { 
    type: 'idea' | 'liveTrace' | 'dashboard', 
    value: number, 
    onChange: (type: 'idea' | 'liveTrace' | 'dashboard', value: number) => void 
  }) => {
    return (
      <div className="flex items-center justify-center sm:justify-start space-x-1 md:space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange(type, star)}
            onMouseEnter={() => setHoverRating(prev => ({ ...prev, [type]: star }))}
            onMouseLeave={() => setHoverRating(prev => ({ ...prev, [type]: 0 }))}
            className="focus:outline-none touch-manipulation"
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${
                star <= (hoverRating[type] || value)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              } transition-all duration-200`}
            />
          </motion.button>
        ))}
      </div>
    );
  };

  // Render expandable question sections - improved for mobile
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
      <motion.div 
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
      </motion.div>
      
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16 space-y-2 sm:space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Your Feedback Matters
          </h2>
          <p className="text-center text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-gray-700 mt-2 sm:mt-3 md:mt-5 max-w-2xl mx-auto">
            Help us enhance our pharmaceutical inventory and tracking system by sharing your experience.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-8 md:p-12 transform transition-all duration-300 hover:shadow-2xl border border-gray-100"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Reviewer Name */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <label 
                htmlFor="name" 
                className={`absolute left-10 transition-all duration-300 ${
                  focused === 'name' || formData.name 
                    ? '-top-3 text-sm text-blue-600 bg-white px-2 font-medium' 
                    : 'top-3 text-gray-500'
                }`}
              >
                Your Name
              </label>
              <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
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
                    value={formData.ideaRating}
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
                    value={formData.liveTraceRating}
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
                    onClick={() => setFormData(prev => ({ ...prev, authenticationSecure: 'Yes' }))}
                    className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full ${
                      formData.authenticationSecure === 'Yes'
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
                    onClick={() => setFormData(prev => ({ ...prev, authenticationSecure: 'No' }))}
                    className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full ${
                      formData.authenticationSecure === 'No'
                        ? 'bg-red-100 text-red-800 border-2 border-red-500'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent'
                    } transition-all duration-200 w-full sm:w-auto`}
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    No
                  </motion.button>
                </div>

                {formData.authenticationSecure && (
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
                      value={formData.authenticationComment}
                      onChange={handleChange}
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
                    value={formData.dashboardEffectiveness}
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
                  value={formData.improvementSuggestions}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Share your ideas for future enhancements..."
                />
              </div>
            )}

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

            {/* Status Messages */}
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
                <p>Failed to submit feedback. Please try again later.</p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewSystem;