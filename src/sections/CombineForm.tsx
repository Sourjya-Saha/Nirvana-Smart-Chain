"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Send, User, Mail, MessageSquare, FileText, Star, Lightbulb, MapPin, Search, BarChart3, Rocket, ChevronDown, ChevronUp, Check, X, ThumbsUp, AlertTriangle, Clock, Shield, Zap, Sparkles, Globe } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Language interface
interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

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

// Language options for the dropdown
const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
];

// Translations for all supported languages
const translations = {
  en: {
    // Page headings
    contactUs: "Contact Us",
    getInTouch: "Get in Touch",
    contactDescription: "We'd love to hear from you! 💬 Share your experience or ask any questions—your feedback helps us enhance our pharmaceutical inventory and tracking system 🚀",
    whyChooseUs: "Why Choose Us",
    // Form toggle buttons
    getSupport: "Get Support",
    shareFeedback: "Share Feedback",
    // Contact form
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    sendMessage: "Send Message",
    sending: "Sending...",
    successMessage: "Message sent successfully! We'll get back to you soon.",
    errorMessage: "Failed to send message. Please try again later.",
    // Review form sections
    currentChallenges: "Current Challenges",
    supplyChainCommunication: "Supply Chain Communication",
    securityCompliance: "Security & Compliance",
    technologyFeatures: "Technology Features",
    additionalFeedback: "Additional Feedback",
    // Review form questions - Current Challenges
    trackingDifficulty: "1. How difficult is it to track inventory in your current system?",
    notDifficult: "Not difficult",
    extremelyDifficult: "Extremely difficult",
    shortageImportance: "2. How important is addressing medication shortages to your organization?",
    notImportant: "Not important",
    criticallyImportant: "Critically important",
    verificationChallenge: "3. How challenging is verification of medication authenticity currently?",
    notChallenging: "Not challenging",
    veryChallenging: "Very challenging",
    // Review form questions - Supply Chain
    communicationFrequency: "1. How frequently do you need to communicate with supply chain partners?",
    rarely: "Rarely",
    veryFrequently: "Very frequently",
    visibilityImportance: "2. How important is real-time visibility into your supply chain?",
    critical: "Critical",
    // Review form questions - Security
    counterfeitConcern: "1. How concerned are you about counterfeit medications?",
    notConcerned: "Not concerned",
    veryConcerned: "Very concerned",
    regulatoryWorkload: "2. How much of a burden is regulatory compliance for your team?",
    minorBurden: "Minor burden",
    majorBurden: "Major burden",
    localRetailerQuestion: "3. Do you feel local retailers can authenticate medications securely?",
    yes: "Yes",
    no: "No",
    explainAnswer: "Please explain your answer...",
    // Review form questions - Technology
    barcodeUseful: "1. How useful would barcode scanning be for authentication?",
    notUseful: "Not useful",
    veryUseful: "Very useful",
    alertsImportance: "2. How important are real-time alerts for inventory issues?",
    messagingValue: "3. How valuable would secure messaging between partners be?",
    notValuable: "Not valuable",
    extremelyValuable: "Extremely valuable",
    reportsNecessity: "4. How necessary are custom reports for your operations?",
    notNecessary: "Not necessary",
    essential: "Essential",
    blockchainImportance: "5. How important is blockchain for verification to your organization?",
    veryImportant: "Very important",
    // Additional feedback
    additionalSuggestions: "Any additional suggestions or improvements you'd like to share?",
    shareSuggestions: "Share your thoughts here...",
    // Submit buttons
    submitFeedback: "Submit Feedback",
    submitting: "Submitting...",
    // Success/Error messages for review form
    reviewSuccessMessage: "Thank you for your valuable feedback! Your insights will help us improve our system.",
    reviewErrorMessage: "Failed to submit feedback. Please try again later.",
    // Feature section
    support247: "24/7 Support",
    supportDesc: "Get expert assistance whenever you need it with our dedicated support team.",
    earlyAccess: "Early Access",
    earlyAccessDesc: "Join our exclusive beta program and be the first to experience our innovative solution.",
    fastResponse: "Fast Response",
    fastResponseDesc: "We prioritize your questions with lightning-fast response times under 24 hours.",
    // Star rating responses
    noRating: "No rating",
    somewhat: "Somewhat",
    moderately: "Moderately",
    very: "Very",
    // Language selector
    selectLanguage: "Select Language"
  },
  hi: {
    contactUs: "संपर्क करें",
    getInTouch: "हमसे जुड़ें",
    contactDescription: "हम आपसे सुनना पसंद करेंगे! 💬 अपना अनुभव साझा करें या कोई प्रश्न पूछें - आपकी प्रतिक्रिया हमारी फार्मास्युटिकल इन्वेंटरी और ट्रैकिंग सिस्टम को बेहतर बनाने में मदद करती है 🚀",
    whyChooseUs: "हमें क्यों चुनें",
    getSupport: "सहायता प्राप्त करें",
    shareFeedback: "प्रतिक्रिया साझा करें",
    name: "नाम",
    email: "ईमेल",
    subject: "विषय",
    message: "संदेश",
    sendMessage: "संदेश भेजें",
    sending: "भेज रहा है...",
    successMessage: "संदेश सफलतापूर्वक भेजा गया! हम जल्द ही आपसे संपर्क करेंगे।",
    errorMessage: "संदेश भेजने में विफल। कृपया बाद में पुनः प्रयास करें।",
    currentChallenges: "वर्तमान चुनौतियां",
    supplyChainCommunication: "आपूर्ति श्रृंखला संचार",
    securityCompliance: "सुरक्षा और अनुपालन",
    technologyFeatures: "प्रौद्योगिकी विशेषताएं",
    additionalFeedback: "अतिरिक्त प्रतिक्रिया",
    trackingDifficulty: "1. आपके वर्तमान सिस्टम में इन्वेंटरी को ट्रैक करना कितना कठिन है?",
    notDifficult: "कठिन नहीं",
    extremelyDifficult: "अत्यधिक कठिन",
    shortageImportance: "2. आपके संगठन के लिए दवा की कमी का समाधान करना कितना महत्वपूर्ण है?",
    notImportant: "महत्वपूर्ण नहीं",
    criticallyImportant: "अत्यंत महत्वपूर्ण",
    verificationChallenge: "3. वर्तमान में दवा की प्रामाणिकता का सत्यापन कितना चुनौतीपूर्ण है?",
    notChallenging: "चुनौतीपूर्ण नहीं",
    veryChallenging: "बहुत चुनौतीपूर्ण",
    communicationFrequency: "1. आपको आपूर्ति श्रृंखला भागीदारों के साथ कितनी बार संवाद करने की आवश्यकता होती है?",
    rarely: "शायद ही कभी",
    veryFrequently: "बहुत बार",
    visibilityImportance: "2. आपकी आपूर्ति श्रृंखला में वास्तविक समय की दृश्यता कितनी महत्वपूर्ण है?",
    critical: "अत्यंत महत्वपूर्ण",
    counterfeitConcern: "1. आप नकली दवाओं के बारे में कितने चिंतित हैं?",
    notConcerned: "चिंतित नहीं",
    veryConcerned: "बहुत चिंतित",
    regulatoryWorkload: "2. आपकी टीम के लिए नियामक अनुपालन कितना बोझ है?",
    minorBurden: "छोटा बोझ",
    majorBurden: "बड़ा बोझ",
    localRetailerQuestion: "3. क्या आपको लगता है कि स्थानीय विक्रेता दवाओं को सुरक्षित रूप से प्रमाणित कर सकते हैं?",
    yes: "हां",
    no: "नहीं",
    explainAnswer: "कृपया अपने उत्तर की व्याख्या करें...",
    barcodeUseful: "1. प्रमाणीकरण के लिए बारकोड स्कैनिंग कितनी उपयोगी होगी?",
    notUseful: "उपयोगी नहीं",
    veryUseful: "बहुत उपयोगी",
    alertsImportance: "2. इन्वेंटरी समस्याओं के लिए वास्तविक समय के अलर्ट कितने महत्वपूर्ण हैं?",
    messagingValue: "3. भागीदारों के बीच सुरक्षित मैसेजिंग कितनी मूल्यवान होगी?",
    notValuable: "मूल्यवान नहीं",
    extremelyValuable: "अत्यधिक मूल्यवान",
    reportsNecessity: "4. आपके संचालन के लिए कस्टम रिपोर्ट कितनी आवश्यक हैं?",
    notNecessary: "आवश्यक नहीं",
    essential: "अनिवार्य",
    blockchainImportance: "5. आपके संगठन के लिए सत्यापन हेतु ब्लॉकचेन कितना महत्वपूर्ण है?",
    veryImportant: "बहुत महत्वपूर्ण",
    additionalSuggestions: "कोई अतिरिक्त सुझाव या सुधार जो आप साझा करना चाहते हैं?",
    shareSuggestions: "अपने विचार यहां साझा करें...",
    submitFeedback: "प्रतिक्रिया जमा करें",
    submitting: "जमा कर रहा है...",
    reviewSuccessMessage: "आपकी मूल्यवान प्रतिक्रिया के लिए धन्यवाद! आपकी अंतर्दृष्टि हमारे सिस्टम को बेहतर बनाने में मदद करेगी।",
    reviewErrorMessage: "प्रतिक्रिया जमा करने में विफल। कृपया बाद में पुनः प्रयास करें।",
    support247: "24/7 सहायता",
    supportDesc: "हमारी समर्पित सहायता टीम के साथ जब भी आपको आवश्यकता हो, विशेषज्ञ सहायता प्राप्त करें।",
    earlyAccess: "शीघ्र पहुंच",
    earlyAccessDesc: "हमारे विशेष बीटा प्रोग्राम में शामिल हों और हमारे नवीन समाधान का अनुभव पहले करें।",
    fastResponse: "त्वरित प्रतिक्रिया",
    fastResponseDesc: "हम आपके प्रश्नों का प्राथमिकता के साथ जवाब देते हैं, 24 घंटे के अंदर।",
    noRating: "कोई रेटिंग नहीं",
    somewhat: "थोड़ा",
    moderately: "मध्यम",
    very: "बहुत",
    selectLanguage: "भाषा चुनें"
  },
  bn: {
    contactUs: "যোগাযোগ করুন",
    getInTouch: "যোগাযোগ করুন",
    contactDescription: "আমরা আপনার কাছ থেকে শোনার অপেক্ষায় রয়েছি! 💬 আপনার অভিজ্ঞতা শেয়ার করুন বা কোনও প্রশ্ন করুন—আপনার মতামত আমাদের ফার্মাসিউটিক্যাল ইনভেন্টরি এবং ট্র্যাকিং সিস্টেম উন্নত করতে সাহায্য করবে 🚀",
    whyChooseUs: "আমাদের কেন বেছে নেবেন",
    getSupport: "সমর্থন প্রাপ্ত করুন",
    shareFeedback: "প্রতিক্রিয়া শেয়ার করুন",
    name: "নাম",
    email: "ইমেইল",
    subject: "বিষয়",
    message: "বার্তা",
    sendMessage: "বার্তা পাঠান",
    sending: "পাঠানো হচ্ছে...",
    successMessage: "বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
    errorMessage: "বার্তা পাঠাতে ব্যর্থ হয়েছে। দয়া করে পরে আবার চেষ্টা করুন।",
    currentChallenges: "বর্তমান চ্যালেঞ্জগুলি",
    supplyChainCommunication: "সরবরাহ চেইন যোগাযোগ",
    securityCompliance: "নিরাপত্তা ও সম্মতি",
    technologyFeatures: "প্রযুক্তি বৈশিষ্ট্য",
    additionalFeedback: "অতিরিক্ত প্রতিক্রিয়া",
    trackingDifficulty: "1. আপনার বর্তমান সিস্টেমে ইনভেন্টরি ট্র্যাক করা কতটা কঠিন?",
    notDifficult: "কঠিন নয়",
    extremelyDifficult: "অত্যন্ত কঠিন",
    shortageImportance: "2. আপনার সংস্থার জন্য ওষুধের অভাব মোকাবেলা কতটা গুরুত্বপূর্ণ?",
    notImportant: "গুরুতর নয়",
    criticallyImportant: "অত্যন্ত গুরুত্বপূর্ণ",
    verificationChallenge: "3. বর্তমান সময়ে ওষুধের প্রকৃততা যাচাই কতটা চ্যালেঞ্জিং?",
    notChallenging: "চ্যালেঞ্জিং নয়",
    veryChallenging: "খুব চ্যালেঞ্জিং",
    communicationFrequency: "1. আপনাকে কতবার সরবরাহ চেইন অংশীদারদের সাথে যোগাযোগ করতে হয়?",
    rarely: "কখনও কখনও",
    veryFrequently: "খুব প্রায়",
    visibilityImportance: "2. আপনার সরবরাহ চেইনে বাস্তব সময়ের দৃশ্যমানতা কতটা গুরুত্বপূর্ণ?",
    critical: "অত্যন্ত গুরুত্বপূর্ণ",
    counterfeitConcern: "1. আপনি কতটা চিন্তিত ওষুধের নকল হওয়ার বিষয়ে?",
    notConcerned: "চিন্তিত নই",
    veryConcerned: "খুব চিন্তিত",
    regulatoryWorkload: "2. আপনার দলের জন্য নিয়ন্ত্রণ সম্মতি কতটা চাপযুক্ত?",
    minorBurden: "সামান্য বোঝা",
    majorBurden: "বড় বোঝা",
    localRetailerQuestion: "3. আপনি কি মনে করেন স্থানীয় খুচরা বিক্রেতারা ওষুধের নিরাপদ যাচাই করতে পারে?",
    yes: "হ্যাঁ",
    no: "না",
    explainAnswer: "আপনার উত্তর ব্যাখ্যা করুন...",
    barcodeUseful: "1. যাচাইকরণের জন্য বারকোড স্ক্যানিং কতটা কার্যকর হবে?",
    notUseful: "কার্যকর নয়",
    veryUseful: "খুব কার্যকর",
    alertsImportance: "2. ইনভেন্টরি সমস্যার জন্য বাস্তব সময়ের অ্যালার্টগুলি কতটা গুরুত্বপূর্ণ?",
    messagingValue: "3. অংশীদারদের মধ্যে নিরাপদ মেসেজিং কতটা মূল্যবান হবে?",
    notValuable: "মূল্যবান নয়",
    extremelyValuable: "অত্যন্ত মূল্যবান",
    reportsNecessity: "4. আপনার কার্যক্রমের জন্য কাস্টম রিপোর্ট কতটা প্রয়োজনীয়?",
    notNecessary: "প্রয়োজনীয় নয়",
    essential: "অত্যাবশ্যক",
    blockchainImportance: "5. আপনার সংস্থার জন্য যাচাইকরণের জন্য ব্লকচেইন কতটা গুরুত্বপূর্ণ?",
    veryImportant: "অত্যন্ত গুরুত্বপূর্ণ",
    additionalSuggestions: "আপনি কি কোনো অতিরিক্ত পরামর্শ বা উন্নতির প্রস্তাব দিতে চান?",
    shareSuggestions: "এখানে আপনার চিন্তাভাবনা শেয়ার করুন...",
    submitFeedback: "প্রতিক্রিয়া জমা দিন",
    submitting: "জমা দেওয়া হচ্ছে...",
    reviewSuccessMessage: "আপনার মূল্যবান প্রতিক্রিয়ার জন্য ধন্যবাদ! আপনার মতামত আমাদের সিস্টেম উন্নত করতে সাহায্য করবে।",
    reviewErrorMessage: "প্রতিক্রিয়া জমা দেওয়া ব্যর্থ। দয়া করে পরে আবার চেষ্টা করুন।",
    support247: "২৪/৭ সহায়তা",
    supportDesc: "যতবারই আপনার প্রয়োজন আমাদের বিশেষজ্ঞ সহায়তা দল থেকে সহায়তা পান।",
    earlyAccess: "প্রাথমিক প্রবেশাধিকার",
    earlyAccessDesc: "আমাদের এক্সক্লুসিভ বিটা প্রোগ্রামে যোগ দিন এবং আমাদের উদ্ভাবনী সমাধান প্রথমবারের মতো ব্যবহার করুন।",
    fastResponse: "দ্রুত প্রতিক্রিয়া",
    fastResponseDesc: "আমরা আপনার প্রশ্নগুলির জন্য দ্রুত প্রতিক্রিয়া প্রদান করি, ২৪ ঘণ্টার মধ্যে।",
    noRating: "কোন রেটিং নেই",
    somewhat: "একটু",
    moderately: "মাঝারি",
    very: "খুব",
    selectLanguage: "ভাষা নির্বাচন করুন"
  },
  te: {
    contactUs: "మమ్మల్ని సంప్రదించండి",
    getInTouch: "సంప్రదించండి",
    contactDescription: "మేము మీ నుండి వినడానికి ఇష్టపడతాము! 💬 మీ అనుభవాన్ని పంచుకోండి లేదా ఏవైనా ప్రశ్నలు అడగండి—మీ అభిప్రాయం మా ఫార్మాస్యూటికల్ ఇన్వెంటరీ మరియు ట్రాకింగ్ సిస్టమ్‌ను మెరుగుపరచడంలో సహాయపడుతుంది 🚀",
    whyChooseUs: "మమ్మల్ని ఎందుకు ఎంచుకోవాలి",
    getSupport: "మద్దతు పొందండి",
    shareFeedback: "అభిప్రాయాన్ని పంచుకోండి",
    name: "పేరు",
    email: "ఇమెయిల్",
    subject: "విషయం",
    message: "సందేశం",
    sendMessage: "సందేశం పంపండి",
    sending: "పంపుతోంది...",
    successMessage: "సందేశం విజయవంతంగా పంపబడింది! మేము త్వరలోనే మీకు తిరిగి అందిస్తాము.",
    errorMessage: "సందేశం పంపడంలో విఫలమైంది. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.",
    currentChallenges: "ప్రస్తుత సవాళ్లు",
    supplyChainCommunication: "సరఫరా చైన్ కమ్యూనికేషన్",
    securityCompliance: "భద్రత & అనుకూలత",
    technologyFeatures: "సాంకేతిక లక్షణాలు",
    additionalFeedback: "అదనపు అభిప్రాయం",
    trackingDifficulty: "1. మీ ప్రస్తుత వ్యవస్థలో ఇన్వెంటరీని ట్రాక్ చేయడం ఎంత కష్టమైనది?",
    notDifficult: "కష్టం కాదు",
    extremelyDifficult: "చాలా కష్టమైనది",
    shortageImportance: "2. మీ సంస్థకు మందుల కొరత పరిష్కరించడం ఎంత ముఖ్యమైనది?",
    notImportant: "ముఖ్యం కాదు",
    criticallyImportant: "అత్యంత ముఖ్యమైనది",
    verificationChallenge: "3. ప్రస్తుతం మందుల ప్రామాణికతను ధృవీకరించడం ఎంత సవాలుగా ఉంది?",
    notChallenging: "సవాలుగా లేదు",
    veryChallenging: "చాలా సవాలుగా ఉంది",
    communicationFrequency: "1. మీరు సరఫరా చైన్ భాగస్వాములతో ఎంత తరచుగా కమ్యూనికేట్ చేయాలి?",
    rarely: "అరుదుగా",
    veryFrequently: "చాలా తరచుగా",
    visibilityImportance: "2. మీ సరఫరా చైన్‌లో రియల్-టైమ్ దృశ్యమానత ఎంత ముఖ్యమైనది?",
    critical: "అత్యంత ముఖ్యమైనది",
    counterfeitConcern: "1. మీరు నకిలీ మందుల గురించి ఎంత ఆందోళన చెందుతున్నారు?",
    notConcerned: "ఆందోళన లేదు",
    veryConcerned: "చాలా ఆందోళన",
    regulatoryWorkload: "2. మీ బృందానికి నియంత్రణ అనుకూలత ఎంత భారంగా ఉంది?",
    minorBurden: "చిన్న భారం",
    majorBurden: "పెద్ద భారం",
    localRetailerQuestion: "3. స్థానిక రిటైలర్లు మందులను సురక్షితంగా ప్రామాణీకరించగలరని మీరు భావిస్తున్నారా?",
    yes: "అవును",
    no: "కాదు",
    explainAnswer: "దయచేసి మీ సమాధానాన్ని వివరించండి...",
    barcodeUseful: "1. ప్రామాణీకరణ కోసం బార్కోడ్ స్కానింగ్ ఎంత ఉపయోగకరంగా ఉంటుంది?",
    notUseful: "ఉపయోగకరం కాదు",
    veryUseful: "చాలా ఉపయోగకరం",
    alertsImportance: "2. ఇన్వెంటరీ సమస్యల కోసం రియల్-టైమ్ అలర్ట్‌లు ఎంత ముఖ్యమైనవి?",
    messagingValue: "3. భాగస్వాముల మధ్య సురక్షిత మెసేజింగ్ ఎంత విలువైనది అవుతుంది?",
    notValuable: "విలువైనది కాదు",
    extremelyValuable: "అత్యంత విలువైనది",
    reportsNecessity: "4. మీ ఆపరేషన్‌లకు కస్టమ్ నివేదికలు ఎంత అవసరం?",
    notNecessary: "అవసరం లేదు",
    essential: "అత్యవసరం",
    blockchainImportance: "5. మీ సంస్థకు ధృవీకరణ కోసం బ్లాక్‌చెయిన్ ఎంత ముఖ్యమైనది?",
    veryImportant: "చాలా ముఖ్యమైనది",
    additionalSuggestions: "మీరు పంచుకోవాలనుకుంటున్న ఏవైనా అదనపు సూచనలు లేదా మెరుగుదలలు ఉన్నాయా?",
    shareSuggestions: "మీ ఆలోచనలను ఇక్కడ పంచుకోండి...",
    submitFeedback: "అభిప్రాయాన్ని సమర్పించండి",
    submitting: "సమర్పిస్తోంది...",
    reviewSuccessMessage: "మీ విలువైన అభిప్రాయానికి ధన్యవాదాలు! మీ అంతర్దృష్టులు మా వ్యవస్థను మెరుగుపరచడంలో సహాయపడతాయి.",
    reviewErrorMessage: "అభిప్రాయాన్ని సమర్పించడంలో విఫలమైంది. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.",
    support247: "24/7 మద్దతు",
    supportDesc: "మా అంకితభావంతో కూడిన మద్దతు బృందంతో మీకు ఎప్పుడు అవసరమైనా నిపుణ సహాయం పొందండి.",
    earlyAccess: "ముందస్తు యాక్సెస్",
    earlyAccessDesc: "మా ప్రత్యేక బీటా ప్రోగ్రామ్‌లో చేరండి మరియు మా నవీన పరిష్కారాన్ని మొదటగా అనుభవించండి.",
    fastResponse: "వేగవంతమైన ప్రతిస్పందన",
    fastResponseDesc: "మేము మీ ప్రశ్నలకు 24 గంటలలోపు త్వరిత ప్రతిస్పందనలతో ప్రాధాన్యత ఇస్తాము.",
    noRating: "రేటింగ్ లేదు",
    somewhat: "కొంతవరకు",
    moderately: "మితంగా",
    very: "చాలా",
    selectLanguage: "భాష ఎంచుకోండి"
  },
  mr: {
    contactUs: "आमच्याशी संपर्क साधा",
    getInTouch: "संपर्कात रहा",
    contactDescription: "आम्हाला तुमच्याकडून ऐकायला आवडेल! 💬 तुमचा अनुभव सामायिक करा किंवा कोणतेही प्रश्न विचारा—तुमचा अभिप्राय आमच्या फार्मास्युटिकल इन्व्हेंटरी आणि ट्रॅकिंग सिस्टम सुधारण्यास मदत करतो 🚀",
    whyChooseUs: "आम्हाला का निवडावे",
    getSupport: "सहाय्य मिळवा",
    shareFeedback: "अभिप्राय सामायिक करा",
    name: "नाव",
    email: "ईमेल",
    subject: "विषय",
    message: "संदेश",
    sendMessage: "संदेश पाठवा",
    sending: "पाठवत आहे...",
    successMessage: "संदेश यशस्वीरित्या पाठवला! आम्ही लवकरच तुमच्याशी संपर्क साधू.",
    errorMessage: "संदेश पाठवण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.",
    currentChallenges: "सध्याचे आव्हाने",
    supplyChainCommunication: "पुरवठा साखळी संवाद",
    securityCompliance: "सुरक्षा आणि अनुपालन",
    technologyFeatures: "तंत्रज्ञान वैशिष्ट्ये",
    additionalFeedback: "अतिरिक्त अभिप्राय",
    trackingDifficulty: "1. तुमच्या सध्याच्या सिस्टममध्ये इन्व्हेंटरी ट्रॅक करणे किती अवघड आहे?",
    notDifficult: "अवघड नाही",
    extremelyDifficult: "अत्यंत अवघड",
    shortageImportance: "2. तुमच्या संस्थेसाठी औषधांची कमतरता दूर करणे किती महत्त्वाचे आहे?",
    notImportant: "महत्त्वाचे नाही",
    criticallyImportant: "अत्यंत महत्त्वाचे",
    verificationChallenge: "3. सध्या औषधांची प्रामाणिकता सत्यापित करणे किती आव्हानात्मक आहे?",
    notChallenging: "आव्हानात्मक नाही",
    veryChallenging: "अत्यंत आव्हानात्मक",
    communicationFrequency: "1. तुम्हाला पुरवठा साखळी भागीदारांशी किती वेळा संवाद साधावा लागतो?",
    rarely: "क्वचितच",
    veryFrequently: "अत्यंत वारंवार",
    visibilityImportance: "2. तुमच्या पुरवठा साखळीमध्ये रिअल-टाइम दृश्यमानता किती महत्त्वाची आहे?",
    critical: "अत्यंत महत्त्वाचे",
    counterfeitConcern: "1. तुम्ही बनावट औषधांबद्दल किती चिंतित आहात?",
    notConcerned: "चिंतित नाही",
    veryConcerned: "अत्यंत चिंतित",
    regulatoryWorkload: "2. तुमच्या टीमसाठी नियामक अनुपालन किती ओझे आहे?",
    minorBurden: "किरकोळ ओझे",
    majorBurden: "मोठे ओझे",
    localRetailerQuestion: "3. तुम्हाला वाटते का की स्थानिक विक्रेते औषधे सुरक्षितपणे प्रमाणित करू शकतात?",
    yes: "होय",
    no: "नाही",
    explainAnswer: "कृपया तुमचे उत्तर स्पष्ट करा...",
    barcodeUseful: "1. प्रमाणनासाठी बारकोड स्कॅनिंग किती उपयुक्त असेल?",
    notUseful: "उपयुक्त नाही",
    veryUseful: "खूप उपयुक्त",
    alertsImportance: "2. इन्व्हेंटरी समस्यांसाठी रिअल-टाइम अलर्ट्स किती महत्त्वाचे आहेत?",
    messagingValue: "3. भागीदारांमधील सुरक्षित संदेशवहन किती मूल्यवान होईल?",
    notValuable: "मूल्यवान नाही",
    extremelyValuable: "अत्यंत मूल्यवान",
    reportsNecessity: "4. तुमच्या ऑपरेशन्ससाठी कस्टम रिपोर्ट्स किती आवश्यक आहेत?",
    notNecessary: "आवश्यक नाही",
    essential: "आवश्यक",
    blockchainImportance: "5. तुमच्या संस्थेसाठी प्रमाणनासाठी ब्लॉकचेन किती महत्त्वाचे आहे?",
    veryImportant: "खूप महत्त्वाचे",
    additionalSuggestions: "कृपया तुम्हाला दिलेल्या उत्तरांमध्ये काही अतिरिक्त सूचना किंवा सुधारणा असल्यास ते येथे शेअर करा.",
    shareSuggestions: "तुमच्या विचारांची येथे शेअर करा...",
    submitFeedback: "अभिप्राय सादर करा",
    submitting: "सादर करत आहे...",
    reviewSuccessMessage: "तुमच्या मुल्यवान अभिप्रायासाठी धन्यवाद! तुमच्या निरीक्षणांमुळे आमच्या प्रणालीला सुधारण्यात मदत होईल.",
    reviewErrorMessage: "अभिप्राय सादर करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.",
    support247: "२४/७ सहाय्य",
    supportDesc: "आमच्या समर्पित सहाय्य टीमसह तुम्हाला कधीही तज्ज्ञ मदत मिळू शकते.",
    earlyAccess: "लवकर प्रवेश",
    earlyAccessDesc: "आमच्या विशेष बीटा प्रोग्रॅममध्ये सामील व्हा आणि आमच्या नवीनतम समाधानाचा अनुभव घ्या.",
    fastResponse: "जलद प्रतिसाद",
    fastResponseDesc: "आम्ही तुमच्या प्रश्नांना २४ तासांच्या आत तातडीने प्रतिसाद देतो.",
    noRating: "कोणतेही रेटिंग नाही",
    somewhat: "थोडे",
    moderately: "मध्यम",
    very: "खूप",
    selectLanguage: "भाषा निवडा"
  },
  ta: {
    contactUs: "தொடர்பு கொள்ளுங்கள்",
    getInTouch: "எங்களுடன் தொடர்பு கொள்ளுங்கள்",
    contactDescription: "நாங்கள் உங்களிடம் இருந்து கேட்க விரும்புகிறோம்! 💬 உங்கள் அனுபவத்தைப் பகிருங்கள் அல்லது கேள்வி கேளுங்கள்—உங்கள் பின்னூட்டம் எங்கள் மருத்துவ பொருளியல் மற்றும் கண்காணிப்பு அமைப்பை மேம்படுத்த உதவுகிறது 🚀",
    whyChooseUs: "நாம் ஏன் தேர்ந்தெடுக்கப்பட வேண்டும்",
    getSupport: "ஆதரவு பெறவும்",
    shareFeedback: "பின்னூட்டத்தைப் பகிரவும்",
    name: "பெயர்",
    email: "மின்னஞ்சல்",
    subject: "பொருள்",
    message: "செய்தி",
    sendMessage: "செய்தி அனுப்பவும்",
    sending: "அனுப்புதல்...",
    successMessage: "செய்தி வெற்றிகரமாக அனுப்பப்பட்டது! நாங்கள் விரைவில் உங்களுடன் தொடர்பு கொள்வோம்.",
    errorMessage: "செய்தி அனுப்ப முடியவில்லை. தயவுசெய்து பிறகு முயற்சிக்கவும்.",
    currentChallenges: "தற்போதைய சவால்கள்",
    supplyChainCommunication: "பொருள் சரக்கு தொடர்பு",
    securityCompliance: "பாதுகாப்பு மற்றும் பின்பற்றுதல்",
    technologyFeatures: "தொழில்நுட்ப அம்சங்கள்",
    additionalFeedback: "மேலதிக பின்னூட்டம்",
    trackingDifficulty: "1. உங்கள் தற்போதைய அமைப்பில் பொருள் கணக்கை எவ்வளவு கடினமாக்கின்றது?",
    notDifficult: "கடினம் இல்லை",
    extremelyDifficult: "அதிகமாக கடினம்",
    shortageImportance: "2. உங்கள் நிறுவனத்திற்கு மருந்து பற்றாக்குறை முக்கியமாக இருக்கிறதா?",
    notImportant: "முக்கியமில்லை",
    criticallyImportant: "மிகவும் முக்கியம்",
    verificationChallenge: "3. மருந்து ஆவணத்தை சரிபார்ப்பது எவ்வளவு சவாலாக இருக்கின்றது?",
    notChallenging: "சவாலானது இல்லை",
    veryChallenging: "மிகவும் சவாலானது",
    communicationFrequency: "1. நீங்கள் எவ்வளவு நேரத்திற்கு பொருள் சரக்கு பங்குதாரர்களுடன் தொடர்பு கொள்ள வேண்டும்?",
    rarely: "அரிதாக",
    veryFrequently: "மிகவும் அடிக்கடி",
    visibilityImportance: "2. உங்கள் பொருள் சரக்கு அமைப்பில் நேரடியாக பார்வை எவ்வளவு முக்கியம்?",
    critical: "மிகவும் முக்கியம்",
    counterfeitConcern: "1. நீங்கள் நகல் மருந்துகள் பற்றி எவ்வளவு கவலைப்பட்டுள்ளீர்கள்?",
    notConcerned: "கவலைப்படவில்லை",
    veryConcerned: "மிகவும் கவலைப்பட்டுள்ளேன்",
    regulatoryWorkload: "2. உங்கள் குழுவிற்கு வணிக ஒழுங்குமுறை உழைப்பு எவ்வளவு கடினமாக இருக்கின்றது?",
    minorBurden: "சிறிய பணமளிப்பு",
    majorBurden: "பெரிய பணமளிப்பு",
    localRetailerQuestion: "3. உள்ளூர் விற்பனையாளர்கள் மருந்துகளை பாதுகாப்பாகச் சான்றளிக்க முடியும் என்று நீங்கள் கருதுகிறீர்களா?",
    yes: "ஆம்",
    no: "இல்லை",
    explainAnswer: "தயவுசெய்து உங்கள் பதிலை விளக்கவும்...",
    barcodeUseful: "1. சான்று குறைக்க பரிசோதனை செய்ய எவ்வளவு பயனுள்ளதாக இருக்கும்?",
    notUseful: "பயனில்லை",
    veryUseful: "மிகவும் பயனுள்ளதாக",
    alertsImportance: "2. பொருள் கையாளலுக்கான நேரடி எச்சரிக்கைகள் எவ்வளவு முக்கியம்?",
    messagingValue: "3. பங்குதாரர்களுக்கு இடையே பாதுகாப்பான செய்தி தொடர்பு எவ்வளவு முக்கியமானது?",
    notValuable: "மிகவும் மதிப்பில்லாதது",
    extremelyValuable: "மிகவும் மதிப்பிடப்படுவது",
    reportsNecessity: "4. உங்கள் செயல்பாடுகளுக்கான தனிப்பயன் அறிக்கைகள் எவ்வளவு அவசியம்?",
    notNecessary: "முடிவுகளுக்கு தேவையில்லை",
    essential: "அவசியமானது",
    blockchainImportance: "5. உங்கள் நிறுவனத்திற்கு சான்றுகளை உறுதிப்படுத்துவதற்கான பிளாக்செயின் எவ்வளவு முக்கியம்?",
    veryImportant: "மிகவும் முக்கியம்",
    additionalSuggestions: "நீங்கள் என்னுடைய பரிந்துரைகள் அல்லது மேம்படுத்துதல்கள் பகிர விரும்புகிறீர்களா?",
    shareSuggestions: "உங்கள் கருத்துக்களை இங்கே பகிருங்கள்...",
    submitFeedback: "பின்னூட்டம் சமர்ப்பிக்கவும்",
    submitting: "சமர்ப்பிக்கப்படுகிறது...",
    reviewSuccessMessage: "உங்கள் மதிப்பிடப்பட்ட பின்னூட்டத்திற்கு நன்றி! உங்கள் பார்வை எங்கள் அமைப்பை மேம்படுத்த உதவும்.",
    reviewErrorMessage: "பின்னூட்டம் சமர்ப்பிக்க முடியவில்லை. தயவுசெய்து பிறகு முயற்சிக்கவும்.",
    support247: "24/7 ஆதரவு",
    supportDesc: "எப்போது வேண்டுமானாலும் எங்கள் விசாரணை குழுவினரின் உதவி பெறுங்கள்.",
    earlyAccess: "முன்னணி அனுமதி",
    earlyAccessDesc: "எங்கள் சொந்த பீட்டா திட்டத்தில் சேருங்கள் மற்றும் புதுப்பித்தலை அனுபவிக்கவும்.",
    fastResponse: "விரைவான பதில்",
    fastResponseDesc: "எங்கள் குழுவின் பதில்கள் மிக விரைவாக, 24 மணிநேரத்தில் பெறப்படும்.",
    noRating: "யாரும் மதிப்பிடவில்லை",
    somewhat: "சில அளவு",
    moderately: "மிதமான அளவு",
    very: "மிகவும்",
    selectLanguage: "மொழி தேர்வு செய்யவும்"
  },

  ur: {
    contactUs: "ہم سے رابطہ کریں",
    getInTouch: "ہم سے جڑیں",
    contactDescription: "ہم آپ سے سننا پسند کریں گے! 💬 اپنے تجربات شیئر کریں یا کوئی سوال پوچھیں—آپ کا فیڈبیک ہماری دواسازی کی انوینٹری اور ٹریکنگ سسٹم کو بہتر بنانے میں مدد کرے گا 🚀",
    whyChooseUs: "ہمیں کیوں منتخب کریں",
    getSupport: "مدد حاصل کریں",
    shareFeedback: "فیڈبیک شیئر کریں",
    name: "نام",
    email: "ای میل",
    subject: "موضوع",
    message: "پیغام",
    sendMessage: "پیغام بھیجیں",
    sending: "بھیجا جا رہا ہے...",
    successMessage: "پیغام کامیابی سے بھیجا گیا! ہم جلد ہی آپ سے رابطہ کریں گے۔",
    errorMessage: "پیغام بھیجنے میں ناکامی۔ براہ کرم بعد میں دوبارہ کوشش کریں۔",
    currentChallenges: "موجودہ چیلنجز",
    supplyChainCommunication: "سپلائی چین کمیونیکیشن",
    securityCompliance: "سیکیورٹی اور تعمیل",
    technologyFeatures: "ٹیکنالوجی کی خصوصیات",
    additionalFeedback: "اضافی فیڈبیک",
    trackingDifficulty: "1. آپ کے موجودہ سسٹم میں انوینٹری کو ٹریک کرنا کتنا مشکل ہے؟",
    notDifficult: "مشکل نہیں",
    extremelyDifficult: "انتہائی مشکل",
    shortageImportance: "2. آپ کی تنظیم کے لیے دوا کی کمی کو حل کرنا کتنا اہم ہے؟",
    notImportant: "اہم نہیں",
    criticallyImportant: "انتہائی اہم",
    verificationChallenge: "3. دوا کی صداقت کی تصدیق کرنا کتنا چیلنجنگ ہے؟",
    notChallenging: "چیلنجنگ نہیں",
    veryChallenging: "بہت چیلنجنگ",
    communicationFrequency: "1. آپ کو سپلائی چین کے شراکت داروں کے ساتھ کتنی بار رابطہ کرنا پڑتا ہے؟",
    rarely: "کبھی کبھار",
    veryFrequently: "بہت زیادہ",
    visibilityImportance: "2. آپ کی سپلائی چین میں حقیقی وقت کی ویژبلٹی کتنی اہم ہے؟",
    critical: "انتہائی اہم",
    counterfeitConcern: "1. آپ کو جعلی دواؤں کے بارے میں کتنا تشویش ہے؟",
    notConcerned: "فکرمند نہیں",
    veryConcerned: "بہت فکرمند ہوں",
    regulatoryWorkload: "2. آپ کی ٹیم کے لیے ضوابط کی تعمیل کتنا بوجھ ہے؟",
    minorBurden: "کم بوجھ",
    majorBurden: "بڑا بوجھ",
    localRetailerQuestion: "3. کیا آپ کو لگتا ہے کہ مقامی ریٹیلرز دوا کو محفوظ طریقے سے تصدیق کر سکتے ہیں؟",
    yes: "ہاں",
    no: "نہیں",
    explainAnswer: "براہ کرم اپنا جواب وضاحت سے بیان کریں...",
    barcodeUseful: "1. تصدیق کے لیے بارکوڈ اسکیننگ کتنی مفید ہوگی؟",
    notUseful: "مفید نہیں",
    veryUseful: "بہت مفید",
    alertsImportance: "2. انوینٹری مسائل کے لیے حقیقی وقت کے الرٹس کتنے اہم ہیں؟",
    messagingValue: "3. شراکت داروں کے درمیان محفوظ پیغام رسانی کتنی قیمتی ہوگی؟",
    notValuable: "قیمتی نہیں",
    extremelyValuable: "انتہائی قیمتی",
    reportsNecessity: "4. آپ کی کارروائیوں کے لیے حسب ضرورت رپورٹس کتنی ضروری ہیں؟",
    notNecessary: "ضروری نہیں",
    essential: "ضروری",
    blockchainImportance: "5. آپ کی تنظیم کے لیے تصدیق کے لیے بلاکچین کی اہمیت کتنی ہے؟",
    veryImportant: "انتہائی اہم",
    additionalSuggestions: "کیا آپ کوئی اضافی تجاویز یا بہتری شیئر کرنا چاہتے ہیں؟",
    shareSuggestions: "یہاں اپنے خیالات شیئر کریں...",
    submitFeedback: "فیڈبیک جمع کریں",
    submitting: "جمع کر رہا ہے...",
    reviewSuccessMessage: "آپ کے قیمتی فیڈبیک کا شکریہ! آپ کی آراء ہمارے سسٹم کو بہتر بنانے میں مدد کرے گی۔",
    reviewErrorMessage: "فیڈبیک جمع کرنے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔",
    support247: "24/7 سپورٹ",
    supportDesc: "جب بھی آپ کو ضرورت ہو، ہماری ماہر سپورٹ ٹیم سے مدد حاصل کریں۔",
    earlyAccess: "جلدی رسائی",
    earlyAccessDesc: "ہمارے خصوصی بیٹا پروگرام میں شامل ہوں اور ہماری جدید ترین حل کو پہلے استعمال کریں۔",
    fastResponse: "جلدی جواب",
    fastResponseDesc: "ہم آپ کے سوالات کو 24 گھنٹوں کے اندر تیز ترین جوابات فراہم کرتے ہیں۔",
    noRating: "کوئی درجہ بندی نہیں",
    somewhat: "کچھ حد تک",
    moderately: "معتدل",
    very: "بہت",
    selectLanguage: "زبان منتخب کریں"
  },
  gu: {
    contactUs: "સંપર્ક કરો",
    getInTouch: "અમારા સાથે સંપર્ક કરો",
    contactDescription: "અમે તમારી પાસેથી સાંભળવા માટે ઉત્સુક છીએ! 💬 તમારો અનુભવ શેર કરો અથવા કોઈ પ્રશ્ન પૂછો—તમારા પ્રતિસાદ દ્વારા અમારો ફાર્માસ્યુટિકલ સ્ટોર અને ટ્રેકિંગ સિસ્ટમ સુધારવામાં મદદ મળશે 🚀",
    whyChooseUs: "અમને કેમ પસંદ કરો",
    getSupport: "મદદ મેળવો",
    shareFeedback: "પ્રતિસાદ શેર કરો",
    name: "નામ",
    email: "ઇમેલ",
    subject: "વિષય",
    message: "સંદેશ",
    sendMessage: "સંદેશ મોકલો",
    sending: "મોકલાવવામાં આવી રહ્યું છે...",
    successMessage: "સંદેશ સફળતાપૂર્વક મોકલાયું! અમે ટૂંક સમયમાં તમારી સાથે સંપર્ક કરીશું.",
    errorMessage: "સંદેશ મોકલવામાં નિષ્ફળ. કૃપા કરીને થોડા સમયે ફરી પ્રયાસ કરો.",
    currentChallenges: "હાલના પડકારો",
    supplyChainCommunication: "સપ્લાય ચેઇન કમ્યુનિકેશન",
    securityCompliance: "સુરક્ષા અને નિયમન",
    technologyFeatures: "ટેકનોલોજી ફીચર્સ",
    additionalFeedback: "આગળનો પ્રતિસાદ",
    trackingDifficulty: "1. તમારું વર્તમાન સિસ્ટમમાં ઈન્વેન્ટરી ટ્રેક કરવું કેટલું મુશ્કેલ છે?",
    notDifficult: "મુશ્કેલ નથી",
    extremelyDifficult: "ખૂબ મુશ્કેલ",
    shortageImportance: "2. તમારું સંસ્થાન દવાઓની કમીને કેવી રીતે ટૂંકી શકે છે?",
    notImportant: "મહત્વનું નથી",
    criticallyImportant: "ખૂબ મહત્વપૂર્ણ",
    verificationChallenge: "3. દવા સાચી છે કે નહીં તે ચકાસવું કેટલું પડકારજનક છે?",
    notChallenging: "પ્રતિસાદ નથી",
    veryChallenging: "ખૂબ પડકારજનક",
    communicationFrequency: "1. તમને કેટલાં વાર સપ્લાય ચેઇન પાર્ટનર્સ સાથે વાતચીત કરવાની જરૂર પડે છે?",
    rarely: "કોઈ વખત",
    veryFrequently: "ખૂબ વાર",
    visibilityImportance: "2. તમારી સપ્લાય ચેઇનમાં મૌલિક દેખાવ કેટલો મહત્વપૂર્ણ છે?",
    critical: "ખૂબ મહત્વપૂર્ણ",
    counterfeitConcern: "1. તમે નકલી દવાઓ વિશે કેટલાંક ચિંતિત છો?",
    notConcerned: "ચિંતિત નથી",
    veryConcerned: "ખૂબ ચિંતિત",
    regulatoryWorkload: "2. તમારા ટિમ માટે નિયમનકારી અનુરૂપતા કેટલું ભાર છે?",
    minorBurden: "નમ્ર ભાર",
    majorBurden: "મોટો ભાર",
    localRetailerQuestion: "3. શું તમને લાગે છે કે સ્થાનિક રિટેઇલર્સ દવાઓને સુરક્ષિત રીતે ઓળખી શકે છે?",
    yes: "હા",
    no: "નહીં",
    explainAnswer: "કૃપા કરીને તમારો જવાબ વિગતે સમજાવો...",
    barcodeUseful: "1. બારકોડ સ્કેનિંગ પ્રામાણિકતા માટે કેટલું ઉપયોગી છે?",
    notUseful: "ઉપયોગી નથી",
    veryUseful: "ખૂબ ઉપયોગી",
    alertsImportance: "2. ઇન્વેન્ટરી મુદ્દાઓ માટે实时એલર્ટ કેટલાં મહત્વપૂર્ણ છે?",
    messagingValue: "3. પાર્ટનર્સ વચ્ચે સુરક્ષિત સંદેશાવ્યવહાર કેટલું કિંમતી છે?",
    notValuable: "કિંમત નથી",
    extremelyValuable: "ખૂબ કિંમતી",
    reportsNecessity: "4. તમારી કામગીરી માટે કસ્ટમ રિપોર્ટ કેટલા જરૂરી છે?",
    notNecessary: "આવશ્યક નથી",
    essential: "આવશ્યક",
    blockchainImportance: "5. તમારી સંસ્થાને દવા ચકાસવા માટે બ્લોકચેન કેટલુ મહત્વપૂર્ણ છે?",
    veryImportant: "ખૂબ મહત્વપૂર્ણ",
    additionalSuggestions: "શું તમે કોઈ વધુ સૂચનો અથવા સુધારાઓ શેર કરવા માંગતા છો?",
    shareSuggestions: "અહીં તમારા વિચારો શેર કરો...",
    submitFeedback: "પ્રતિસાદ મોકલો",
    submitting: "મોકલવામાં આવી રહ્યું છે...",
    reviewSuccessMessage: "તમારા મૂલ્યવાન પ્રતિસાદ માટે આભાર! તમારા વિચારોથી અમારો સિસ્ટમ સુધરશે.",
    reviewErrorMessage: "પ્રતિસાદ મોકલવામાં નિષ્ફળ. કૃપા કરીને ફરી પ્રયાસ કરો.",
    support247: "24/7 આધાર",
    supportDesc: "જ્યારે પણ તમારી જરૂર પડે, અમારા સહાયક ટીમથી મદદ મેળવો.",
    earlyAccess: "પ્રારંભિક પ્રવેશ",
    earlyAccessDesc: "અમારા વિશિષ્ટ બેટા કાર્યક્રમમાં જોડાઓ અને પ્રથમ વખત અમારા નવીનતમ ઉકેલનો અનુભવ કરો.",
    fastResponse: "ઝડપી પ્રતિસાદ",
    fastResponseDesc: "અમે તમારા પ્રશ્નોને 24 કલાકમાં ઝડપથી જવાબ આપીશું.",
    noRating: "કોઈ રેટિંગ નથી",
    somewhat: "કાંટાર્થ",
    moderately: "મધ્યમ",
    very: "ખૂબ",
    selectLanguage: "ભાષા પસંદ કરો"
  },  
  ml: {
    contactUs: "ഞങ്ങളുമായി ബന്ധപ്പെടുക",
    getInTouch: "ഞങ്ങളുമായി ബന്ധപ്പെടുക",
    contactDescription: "നമുക്ക് നിങ്ങളുടെ അനുഭവം കേട്ടാൽ സന്തോഷം! 💬 നിങ്ങളുടെ അനുഭവം പങ്കുവെയ്ക്കുക അല്ലെങ്കിൽ ചോദ്യം ചോദിക്കുക—നിങ്ങളുടെ ഫീഡ്ബാക്ക് ഞങ്ങളുടെ ഫാർമസ്യൂട്ടിക്കൽ ഇൻവെന്ററി மற்றும் ട്രാക്കിങ്ങ് സിസ്റ്റം മെച്ചപ്പെടുത്താൻ സഹായിക്കും 🚀",
    whyChooseUs: "നമ്മെ എന്ത് കാരണം തിരഞ്ഞെടുത്ത്?",
    getSupport: "സഹായം നേടുക",
    shareFeedback: "ഫീഡ്ബാക്ക് പങ്കുവെക്കുക",
    name: "പേര്",
    email: "ഇമെയിൽ",
    subject: "വിഷയം",
    message: "സന്ദേശം",
    sendMessage: "സന്ദേശം അയയ്ക്കുക",
    sending: "അയക്കുന്നു...",
    successMessage: "സന്ദേശം വിജയകരമായി അയച്ചിരിക്കുന്നു! ഞങ്ങൾ ഉടൻ നിങ്ങൾക്ക് തിരിച്ചടി നൽകും.",
    errorMessage: "സന്ദേശം അയക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.",
    currentChallenges: "നിലവിലെ വെല്ലുവിളികൾ",
    supplyChainCommunication: "പൊതു വിതരണ ശൃംഖല",
    securityCompliance: "സുരക്ഷയും പാലനവും",
    technologyFeatures: "സാങ്കേതിക ഗുണങ്ങൾ",
    additionalFeedback: "കൂടുതൽ ഫീഡ്ബാക്ക്",
    trackingDifficulty: "1. നിലവിലുള്ള സിസ്റ്റത്തിൽ ഇൻവെന്ററി ട്രാക്ക് ചെയ്യുന്നത് എത്ര ദു:ഖകരമാണ്?",
    notDifficult: "ദു:ഖകരം അല്ല",
    extremelyDifficult: "വളരെ ദു:ഖകരമാണ്",
    shortageImportance: "2. നിങ്ങളുടെ സ്ഥാപനത്തിന് മരുന്നിന്റെ ക്ഷാമം എത്ര പ്രധാനമാണ്?",
    notImportant: "പ്രധാനമല്ല",
    criticallyImportant: "അത്യന്തം പ്രധാനമാണ്",
    verificationChallenge: "3. മരുന്നിന്റെ അസൽ അവസ്ഥ പരിശോധിക്കുന്നത് എത്ര പ്രയാസമാണ്?",
    notChallenging: "പ്രയാസം ഇല്ല",
    veryChallenging: "വളരെ പ്രയാസമാണ്",
    communicationFrequency: "1. നിങ്ങൾ എത്ര സമയം വ്യാപകമായ വിതരണം പങ്കാളികളുമായി ബന്ധപ്പെടണം?",
    rarely: "ദൈനംദിനമായി",
    veryFrequently: "കൂടുതൽ പ്രാപ്തമായി",
    visibilityImportance: "2. നിങ്ങളുടെ വിതരണ ശൃംഖലയിൽ സമയോചിതമായ ദൃശ്യത എത്ര പ്രധാനമാണ്?",
    critical: "മികച്ച പ്രാധാന്യം",
    counterfeitConcern: "1. നിങ്ങൾക്ക് നകൽ മരുന്നുകളെ കുറിച്ച് എത്ര ആശങ്കകളുണ്ട്?",
    notConcerned: "ചിന്തയില്ല",
    veryConcerned: "വളരെ ആശങ്കപെടുന്നു",
    regulatoryWorkload: "2. നിങ്ങളുടെ ടീമിന് നിയമാനുസൃതമായ ജോലി എത്ര കടിയുള്ളതാണ്?",
    minorBurden: "ചെറിയ ഭാര",
    majorBurden: "പ്രധാന ഭാര",
    localRetailerQuestion: "3. നിങ്ങൾക്ക് തോന്നുമോ? പ്രാദേശിക റീട്ടെയ്ലറുകൾ മരുന്നുകൾ സുരക്ഷിതമായി സാധൂകരിക്കാമോ?",
    yes: "അതെ",
    no: "ഇല്ല",
    explainAnswer: "ദയവായി നിങ്ങളുടെ മറുപടി വിശദീകരിക്കുക...",
    barcodeUseful: "1. സ്ഥിരീകരണത്തിന് ബാർകോഡ് സ്കാനിംഗ് എത്ര ഉപകാരപ്രദമാണ്?",
    notUseful: "ഉപകാരപ്രദമല്ല",
    veryUseful: "വളരെ ഉപകാരപ്രദമാണ്",
    alertsImportance: "2. ഇൻവെന്ററി പ്രശ്നങ്ങൾ പരിഹരിക്കാൻ സമയബന്ധമായ അലേർട്ട് എത്ര പ്രധാനമാണ്?",
    messagingValue: "3. പങ്കാളികൾക്ക് ഇടയിലെ സുരക്ഷിത സന്ദേശഗതി എത്ര വിലമതിക്കുന്നതാണ്?",
    notValuable: "വിലയില്ല",
    extremelyValuable: "വളരെ വിലമതിക്കുന്നതാണ്",
    reportsNecessity: "4. നിങ്ങളുടെ പ്രവർത്തനങ്ങൾക്ക് കസ്റ്റം റിപ്പോർട്ടുകൾ എത്ര ആവശ്യമാണ്?",
    notNecessary: "ആവശ്യമാണ്",
    essential: "ആവശ്യമാണ്",
    blockchainImportance: "5. നിങ്ങളുടെ സ്ഥാപനത്തിന് സാന്ദ്രതയ്ക്കുള്ള ബ്ലോക്കചെയിനിന്റെ പ്രാധാന്യം എത്ര?",
    veryImportant: "മികച്ച പ്രാധാന്യം",
    additionalSuggestions: "മറ്റുള്ളതായുള്ള നിർദ്ദേശങ്ങൾ",
    shareSuggestions: "നിങ്ങളുടെ അഭിപ്രായങ്ങൾ ഇവിടെ പങ്കുവെക്കുക...",
    submitFeedback: "ഫീഡ്ബാക്ക് സമർപ്പിക്കുക",
    submitting: "സമർപ്പിക്കുകയാണ്...",
    reviewSuccessMessage: "നിങ്ങളുടെ വിലയേറിയ ഫീഡ്ബാക്കിനായി നന്ദി! നിങ്ങളുടെ അഭിപ്രായങ്ങൾ ഞങ്ങളുടെ സിസ്റ്റം മെച്ചപ്പെടുത്താൻ സഹായിക്കും.",
    reviewErrorMessage: "ഫീഡ്ബാക്ക് സമർപ്പിക്കാൻ പരാജയപ്പെട്ടു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.",
    support247: "24/7 പിന്തുണ",
    supportDesc: "എപ്പോൾ വേണമെങ്കിലും ഞങ്ങളുടെ സഹായക ടീം നിന്നെ സഹായിക്കും.",
    earlyAccess: "ആദ്യ പ്രവേശനം",
    earlyAccessDesc: "ഞങ്ങളുടെ പ്രത്യേക ബീറ്റാ പ്രോഗ്രാമിലേക്ക് ചേരുക, പുതിയ പരിഹാരങ്ങൾ ആദ്യം ഉപയോഗിക്കുക.",
    fastResponse: "വേഗതയിൽ പ്രതികരണം",
    fastResponseDesc: "ഞങ്ങളുടെ ടീമിന്റെ മറുപടികൾ 24 മണിക്കൂറിനുള്ളിൽ വേഗത്തിൽ ലഭിക്കും.",
    noRating: "ഇനിയും വിലയിരുത്തൽ ഇല്ല",
    somewhat: "ഒന്നുകൂടെ",
    moderately: "മിതമായ",
    very: "വളരെ",
    selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക"
  },
  kn: {
    contactUs: "ಸಂಪರ್ಕಿಸಿ",
    getInTouch: "ನಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ",
    contactDescription: "ನಾವು ನಿಮ್ಮಿಂದ ಕೇಳಲು ಇಚ್ಛಿಸುತ್ತೇವೆ! 💬 ನಿಮ್ಮ ಅನುಭವವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ ಅಥವಾ ಯಾವುದೇ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ—ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆ ನಮ್ಮ ಔಷಧ ಉದ್ಯಮ ಮತ್ತು ಟ್ರ್ಯಾಕಿಂಗ್ ಸಿಸ್ಟಂ ಅನ್ನು ಉತ್ತಮಗೊಳಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ 🚀",
    whyChooseUs: "ನಾವೇನು ಆಯ್ಕೆ ಮಾಡಬೇಕು",
    getSupport: "ಸಹಾಯ ಪಡೆಯಿರಿ",
    shareFeedback: "ಪ್ರতিক್ರಿಯೆ ಹಂಚಿಕೊಳ್ಳಿ",
    name: "ಹೆಸರು",
    email: "ಇಮೇಲ್",
    subject: "ವಿಷಯ",
    message: "ಸಂದೇಶ",
    sendMessage: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    sending: "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...",
    successMessage: "ಸಂದೇಶವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ! ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕಿಸೋಣ.",
    errorMessage: "ಸಂದೇಶ ಕಳುಹಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    currentChallenges: "ಪ್ರಸ್ತುತ ಸವಾಲುಗಳು",
    supplyChainCommunication: "ಪೂರೈಕೆ ಸರಪಳಿಯ ಸಂವಹನ",
    securityCompliance: "ಭದ್ರತೆ ಮತ್ತು ಅನುಸರಣೆ",
    technologyFeatures: "ತಂತ್ರಜ್ಞಾನ ವೈಶಿಷ್ಟ್ಯಗಳು",
    additionalFeedback: "ಅದನ್ಯವಾದ ಪ್ರತಿಕ್ರಿಯೆ",
    trackingDifficulty: "1. ನಿಮ್ಮ ಪ್ರಸ್ತುತ ವ್ಯವಸ್ಥೆಯಲ್ಲಿ ಇನ್ವೆಂಟರಿ ಟ್ರ್ಯಾಕ್ ಮಾಡುವುದು ಎಷ್ಟು ಕಷ್ಟಕರವಾಗಿದೆ?",
    notDifficult: "ಕಷ್ಟವಿಲ್ಲ",
    extremelyDifficult: "ಅತ್ಯಂತ ಕಷ್ಟಕರ",
    shortageImportance: "2. ನಿಮ್ಮ ಸಂಸ್ಥೆಗೆ ಔಷಧಿಯ ಕೊರತೆ ಪರಿಹರಿಸುವುದು ಎಷ್ಟು ಮುಖ್ಯವಾಗಿದೆ?",
    notImportant: "ಮುಖ್ಯವಲ್ಲ",
    criticallyImportant: "ಅತ್ಯಂತ ಮುಖ್ಯ",
    verificationChallenge: "3. ಔಷಧಿಯ ನಿಖರತೆ ಪರಿಶೀಲಿಸುವುದು ಎಷ್ಟು ಸವಾಲು?",
    notChallenging: "ಸವಾಲು ಇಲ್ಲ",
    veryChallenging: "ಅತ್ಯಂತ ಸವಾಲು",
    communicationFrequency: "1. ನೀವು ಪೂರೈಕೆ ಸರಪಳಿಯ ಸಹಭಾಗಿಗಳೊಂದಿಗೆ ಎಷ್ಟು ಬಾರಿ ಸಂಪರ್ಕ ಮಾಡಬೇಕಾಗುತ್ತದೆ?",
    rarely: "ಕೆಲವು ಸಮಯ",
    veryFrequently: "ಖುಬ್ ಹೆಚ್ಚು",
    visibilityImportance: "2. ನಿಮ್ಮ ಪೂರೈಕೆ ಸರಪಳಿಯಲ್ಲಿ ನೇರ ದರ್ಶನ ಎಷ್ಟು ಮುಖ್ಯವಾಗಿದೆ?",
    critical: "ಅತ್ಯಂತ ಮುಖ್ಯ",
    counterfeitConcern: "1. ನೀವು ನಕಲಿ ಔಷಧಿಗಳನ್ನು ಬಗ್ಗೆ ಎಷ್ಟು ಚಿಂತಿತವಾಗಿದ್ದೀರಿ?",
    notConcerned: "ಚಿಂತೆಯಿಲ್ಲ",
    veryConcerned: "ಖುಬ್ ಚಿಂತಿತ",
    regulatoryWorkload: "2. ನಿಮ್ಮ ತಂಡಕ್ಕೆ ನಿಯಮಿತ ಅನುಸರಣೆ ಎಷ್ಟು ಭಾರವಾಗಿದೆ?",
    minorBurden: "ತುಸು ಭಾರ",
    majorBurden: "ಪ್ರಮುಖ ಭಾರ",
    localRetailerQuestion: "3. ನಿಮ್ಮ ಅನಿಸಿಕೆ ಪ್ರಕಾರ, ಸ್ಥಳೀಯ ರೀಟೈಲರ್‌ಗಳು ಔಷಧಿಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರಮಾಣೀಕರಿಸಬಹುದೇ?",
    yes: "ಹೌದು",
    no: "ಇಲ್ಲ",
    explainAnswer: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಉತ್ತರವನ್ನು ವಿವರಿಸಿ...",
    barcodeUseful: "1. ಪ್ರಮಾಣೀಕರಣಕ್ಕಾಗಿ ಬಾರ್ಕೋಡ್ ಸ್ಕ್ಯಾನಿಂಗ್ ಎಷ್ಟು ಉಪಯುಕ್ತವಾಗಿದೆ?",
    notUseful: "ಉಪಯುಕ್ತವಲ್ಲ",
    veryUseful: "ಖುಬ್ ಉಪಯುಕ್ತ",
    alertsImportance: "2. ಇನ್ವೆಂಟರಿ ಸಮಸ್ಯೆಗಳಿಗಾಗಿ ನೇರ ಎಚ್ಚರಿಕೆಗಳು ಎಷ್ಟು ಮುಖ್ಯವಾಗಿವೆ?",
    messagingValue: "3. ಸಹಭಾಗಿಗಳ ನಡುವೆ ಸುರಕ್ಷಿತ ಸಂದೇಶ ಸಂವಹನ ಎಷ್ಟು ಮುಖ್ಯವಾಗಿದೆ?",
    notValuable: "ಮೌಲ್ಯವಿಲ್ಲ",
    extremelyValuable: "ಅತ್ಯಂತ ಮೌಲ್ಯಯುತ",
    reportsNecessity: "4. ನಿಮ್ಮ ಕಾರ್ಯಾಚರಣೆಗಳಿಗೆ ಕಸ್ಟಮ್ ವರದಿಗಳು ಎಷ್ಟು ಅಗತ್ಯವಿವೆ?",
    notNecessary: "ಅಗತ್ಯವಿಲ್ಲ",
    essential: "ಅಗತ್ಯವಿದೆ",
    blockchainImportance: "5. ನಿಮ್ಮ ಸಂಸ್ಥೆಗೆ ಔಷಧಿ ಪ್ರಮಾಣೀಕರಣಕ್ಕಾಗಿ ಬ್ಲಾಕ್‌ಚೈನ್ ಎಷ್ಟು ಮುಖ್ಯವಾಗಿದೆ?",
    veryImportant: "ಅತ್ಯಂತ ಮುಖ್ಯ",
    additionalSuggestions: "ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಸೂಚನೆಗಳು ಅಥವಾ ಸುಧಾರಣೆಗಳನ್ನು ಹಂಚಲು ಬಯಸುತ್ತೀರಾ?",
    shareSuggestions: "ನಿಮ್ಮ ಅಭಿಪ್ರಾಯಗಳನ್ನು ಇಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ...",
    submitFeedback: "ಪ್ರतिक್ರಿಯೆ ಸಲ್ಲಿಸಿ",
    submitting: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...",
    reviewSuccessMessage: "ನಿಮ್ಮ ಅಮೂಲ್ಯ ಪ್ರತಿಕ್ರಿಯೆಗೆ ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಅಭಿಪ್ರಾಯವು ನಮ್ಮ ಸಿಸ್ಟಂನ್ನು ಸುಧಾರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    reviewErrorMessage: "ಪ್ರतिक್ರಿಯೆ ಸಲ್ಲಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    support247: "24/7 ಬೆಂಬಲ",
    supportDesc: "ಯಾವಾಗಲೂ ಸಹಾಯ ಬೇಕಾದರೆ, ನಮ್ಮ ಪರಿಣಿತ ಬೆಂಬಲ ತಂಡದಿಂದ ಸಹಾಯ ಪಡೆಯಿರಿ.",
    earlyAccess: "ಹಣಿಯ ಪ್ರವೇಶ",
    earlyAccessDesc: "ನಮ್ಮ ವಿಶೇಷ ಬೇಟಾ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಸೇರಿ, ನಮ್ಮ ಇತ್ತೀಚಿನ ಪರಿಹಾರವನ್ನು ಮೊದಲೇ ಅನುಭವಿಸಿ.",
    fastResponse: "ವೇಗವಾಗಿ ಪ್ರತಿಕ್ರಿಯೆ",
    fastResponseDesc: "ನಮ್ಮ ತಂಡವು ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ 24 ಗಂಟೆಗಳೊಳಗೆ ವೇಗವಾಗಿ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತದೆ.",
    noRating: "ಯಾವುದೇ ರೇಟಿಂಗ್ ಇಲ್ಲ",
    somewhat: "ಊಹಿಸುವಂತೆ",
    moderately: "ಮಿತಿಯವರೆಗೆ",
    very: "ಖುಬ್",
    selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ"
  },
  pa: {
    contactUs: "ਸੰਪਰਕ ਕਰੋ",
    getInTouch: "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    contactDescription: "ਅਸੀਂ ਤੁਹਾਡੇ ਤੋਂ ਸੁਣਨਾ ਚਾਹੁੰਦੇ ਹਾਂ! 💬 ਆਪਣਾ ਅਨੁਭਵ ਸਾਂਝਾ ਕਰੋ ਜਾਂ ਸਵਾਲ ਪੁੱਛੋ—ਤੁਹਾਡੇ ਫੀਡਬੈਕ ਨਾਲ ਸਾਡੇ ਫਾਰਮਾਸਿਊਟਿਕਲ ਇਨਵੈਂਟਰੀ ਅਤੇ ਟ੍ਰੈਕਿੰਗ ਸਿਸਟਮ ਨੂੰ ਸੁਧਾਰਨ ਵਿੱਚ ਮਦਦ ਮਿਲੇਗੀ 🚀",
    whyChooseUs: "ਸਾਨੂੰ ਕਿਉਂ ਚੁਣੋ",
    getSupport: "ਮਦਦ ਪ੍ਰਾਪਤ ਕਰੋ",
    shareFeedback: "ਫੀਡਬੈਕ ਸਾਂਝਾ ਕਰੋ",
    name: "ਨਾਮ",
    email: "ਈਮੇਲ",
    subject: "ਵਿਸ਼ਾ",
    message: "ਸੁਨੇਹਾ",
    sendMessage: "ਸੁਨੇਹਾ ਭੇਜੋ",
    sending: "ਭੇਜਿਆ ਜਾ ਰਿਹਾ ਹੈ...",
    successMessage: "ਸੁਨੇਹਾ ਸਫਲਤਾਪੂਰਵਕ ਭੇਜਿਆ ਗਿਆ! ਅਸੀਂ ਜਲਦੀ ਹੀ ਤੁਹਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰਾਂਗੇ।",
    errorMessage: "ਸੁਨੇਹਾ ਭੇਜਣ ਵਿੱਚ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    currentChallenges: "ਮੌਜੂਦਾ ਚੁਣੌਤੀਆਂ",
    supplyChainCommunication: "ਸਪਲਾਈ ਚੇਨ ਸੰਪਰਕ",
    securityCompliance: "ਸੁਰੱਖਿਆ ਅਤੇ ਅਨੁਕੂਲਤਾ",
    technologyFeatures: "ਤਕਨੀਕੀ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
    additionalFeedback: "ਵਧੀਕ ਫੀਡਬੈਕ",
    trackingDifficulty: "1. ਤੁਹਾਡੇ ਮੌਜੂਦਾ ਸਿਸਟਮ ਵਿੱਚ ਇਨਵੈਂਟਰੀ ਟ੍ਰੈਕ ਕਰਨਾ ਕਿੰਨਾ ਮੁਸ਼ਕਲ ਹੈ?",
    notDifficult: "ਮੁਸ਼ਕਲ ਨਹੀਂ",
    extremelyDifficult: "ਬਹੁਤ ਮੁਸ਼ਕਲ",
    shortageImportance: "2. ਤੁਹਾਡੇ ਸੰਗਠਨ ਲਈ ਦਵਾਈ ਦੀ ਕਮੀ ਦਾ ਸਮਾਧਾਨ ਕਿੰਨਾ ਮਹੱਤਵਪੂਰਣ ਹੈ?",
    notImportant: "ਮਹੱਤਵਪੂਰਣ ਨਹੀਂ",
    criticallyImportant: "ਬਹੁਤ ਮਹੱਤਵਪੂਰਣ",
    verificationChallenge: "3. ਦਵਾਈ ਦੀ ਅਸਲਤਾ ਦੀ ਜਾਂਚ ਕਰਨਾ ਕਿੰਨਾ ਚੁਣੌਤੀਪੂਰਨ ਹੈ?",
    notChallenging: "ਚੁਣੌਤੀਪੂਰਨ ਨਹੀਂ",
    veryChallenging: "ਬਹੁਤ ਚੁਣੌਤੀਪੂਰਨ",
    communicationFrequency: "1. ਤੁਹਾਨੂੰ ਸਪਲਾਈ ਚੇਨ ਭਾਗੀਦਾਰਾਂ ਨਾਲ ਕਿੰਨੀ ਵਾਰੀ ਸੰਪਰਕ ਕਰਨਾ ਪੈਂਦਾ ਹੈ?",
    rarely: "ਕਦੇ ਕਦੇ",
    veryFrequently: "ਬਹੁਤ ਵਾਰ",
    visibilityImportance: "2. ਤੁਹਾਡੇ ਸਪਲਾਈ ਚੇਨ ਵਿੱਚ ਤਤਕਾਲ ਦ੍ਰਿਸ਼ਟੀਕੋਣ ਕਿੰਨਾ ਮਹੱਤਵਪੂਰਣ ਹੈ?",
    critical: "ਬਹੁਤ ਮਹੱਤਵਪੂਰਣ",
    counterfeitConcern: "1. ਤੁਹਾਨੂੰ ਨਕਲੀ ਦਵਾਈਆਂ ਬਾਰੇ ਕਿੰਨਾ ਚਿੰਤਿਤ ਹੋ?",
    notConcerned: "ਚਿੰਤਿਤ ਨਹੀਂ",
    veryConcerned: "ਬਹੁਤ ਚਿੰਤਿਤ",
    regulatoryWorkload: "2. ਤੁਹਾਡੇ ਟੀਮ ਲਈ ਨਿਯਮਾਂ ਦੀ ਪਾਲਣਾ ਕਿੰਨਾ ਬੋਝ ਹੈ?",
    minorBurden: "ਛੋਟਾ ਬੋਝ",
    majorBurden: "ਵੱਡਾ ਬੋਝ",
    localRetailerQuestion: "3. ਕੀ ਤੁਹਾਨੂੰ ਲੱਗਦਾ ਹੈ ਕਿ ਸਥਾਨਕ ਰੀਟੇਲਰ ਦਵਾਈਆਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਪ੍ਰਮਾਣਿਤ ਕਰ ਸਕਦੇ ਹਨ?",
    yes: "ਹਾਂ",
    no: "ਨਹੀਂ",
    explainAnswer: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਜਵਾਬ ਨੂੰ ਵੱਖਰੇ ਤਰੀਕੇ ਨਾਲ ਸਮਝਾਓ...",
    barcodeUseful: "1. ਪ੍ਰਮਾਣਿਕਤਾ ਲਈ ਬਾਰਕੋਡ ਸਕੈਨਿੰਗ ਕਿੰਨੀ ਲਾਭਕਾਰੀ ਹੋਵੇਗੀ?",
    notUseful: "ਲਾਭਕਾਰੀ ਨਹੀਂ",
    veryUseful: "ਬਹੁਤ ਲਾਭਕਾਰੀ",
    alertsImportance: "2. ਇਨਵੈਂਟਰੀ ਮੁੱਦਿਆਂ ਲਈ ਤਤਕਾਲ ਅਲਰਟ ਕਿੰਨਾ ਮਹੱਤਵਪੂਰਣ ਹੈ?",
    messagingValue: "3. ਭਾਗੀਦਾਰਾਂ ਦੇ ਵਿਚਕਾਰ ਸੁਰੱਖਿਅਤ ਸੰਦੇਸ਼ ਸਾਂਝਾ ਕਰਨਾ ਕਿੰਨਾ ਕੀਮਤੀ ਹੈ?",
    notValuable: "ਕੀਮਤੀ ਨਹੀਂ",
    extremelyValuable: "ਬਹੁਤ ਕੀਮਤੀ",
    reportsNecessity: "4. ਤੁਹਾਡੇ ਕਾਰਜਾਂ ਲਈ ਕਸਟਮ ਰਿਪੋਰਟਾਂ ਕਿੰਨੀ ਜਰੂਰੀ ਹਨ?",
    notNecessary: "ਜਰੂਰੀ ਨਹੀਂ",
    essential: "ਜਰੂਰੀ",
    blockchainImportance: "5. ਤੁਹਾਡੇ ਸੰਸਥਾਨ ਲਈ ਦਵਾਈ ਦੀ ਪ੍ਰਮਾਣਿਕਤਾ ਲਈ ਬਲੌਕਚੇਨ ਕਿੰਨੀ ਮਹੱਤਵਪੂਰਣ ਹੈ?",
    veryImportant: "ਬਹੁਤ ਮਹੱਤਵਪੂਰਣ",
    additionalSuggestions: "ਕੀ ਤੁਸੀਂ ਕੋਈ ਹੋਰ ਸੁਝਾਅ ਜਾਂ ਸੁਧਾਰ ਸਾਂਝੇ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
    shareSuggestions: "ਆਪਣੇ ਵਿਚਾਰ ਇੱਥੇ ਸਾਂਝੇ ਕਰੋ...",
    submitFeedback: "ਫੀਡਬੈਕ ਸਬਮਿਟ ਕਰੋ",
    submitting: "ਸਬਮਿਟ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    reviewSuccessMessage: "ਤੁਹਾਡੇ ਕੀਮਤੀ ਫੀਡਬੈਕ ਲਈ ਧੰਨਵਾਦ! ਤੁਹਾਡੇ ਵਿਚਾਰ ਸਾਡੇ ਸਿਸਟਮ ਨੂੰ ਸੁਧਾਰਣ ਵਿੱਚ ਸਹਾਇਕ ਸਾਬਤ ਹੋਣਗੇ.",
    reviewErrorMessage: "ਫੀਡਬੈਕ ਸਬਮਿਟ ਕਰਨ ਵਿੱਚ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.",
    support247: "24/7 ਸਹਾਇਤਾ",
    supportDesc: "ਜਦੋਂ ਵੀ ਤੁਹਾਨੂੰ ਸਹਾਇਤਾ ਦੀ ਲੋੜ ਹੋਵੇ, ਸਾਡੀ ਮਾਹਰ ਸਹਾਇਤਾ ਟੀਮ ਤੁਹਾਡੀ ਮਦਦ ਲਈ ਉਪਲਬਧ ਹੈ।",
    earlyAccess: "ਪਹਿਲਾ ਪ੍ਰਵੇਸ਼",
    earlyAccessDesc: "ਸਾਡੇ ਵਿਸ਼ੇਸ਼ ਬੇਟਾ ਕਾਰਜਕ੍ਰਮ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ ਅਤੇ ਸਾਡੇ ਨਵੇਂ ਹੱਲਾਂ ਦਾ ਪਹਿਲਾਂ ਅਨੁਭਵ ਕਰੋ।",
    fastResponse: "ਤੁਰੰਤ ਪ੍ਰਤਿਕ੍ਰਿਆ",
    fastResponseDesc: "ਸਾਡੀ ਟੀਮ ਤੁਹਾਡੇ ਪ੍ਰਸ਼ਨਾਂ ਲਈ 24 ਘੰਟਿਆਂ ਅੰਦਰ ਤੁਰੰਤ ਪ੍ਰਤਿਕ੍ਰਿਆ ਦੇਵੇਗੀ।",
    noRating: "ਕੋਈ ਰੇਟਿੰਗ ਨਹੀਂ",
    somewhat: "ਥੋੜ੍ਹਾ",
    moderately: "ਮਿਧਯਮ",
    very: "ਬਹੁਤ",
    selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ"
  }
  
  

}
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
  // Emoji mapping for ratings

// State for active form, question, and form status

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
  // State declarations
const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
const [currentLanguage, setCurrentLanguage] = useState('en');
  const [status, setStatus] = useState<StatusType>('');
  const [focused, setFocused] = useState<string>('');
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [hoverRating, setHoverRating] = useState<number>(0);


// 2. Create a variable to store the translations for the current language
const t = translations[currentLanguage as keyof typeof translations];


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
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-6 sm:py-8 md:py-12 overflow-hidden ">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Language selector */}
        <motion.div 
          className="flex justify-end mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              <Globe className="h-4 w-4 text-blue-500" />
              <span>{languages.find(lang => lang.code === currentLanguage)?.nativeName || 'English'}</span>
              {isLanguageDropdownOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {isLanguageDropdownOpen && (
              <motion.div 
                className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      setCurrentLanguage(language.code);
                      setIsLanguageDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 flex items-center justify-between ${
                      currentLanguage === language.code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    <span>{language.nativeName}</span>
                    <span className="text-xs text-gray-500">{language.name}</span>
                    {currentLanguage === language.code && <Check className="h-4 w-4 text-blue-600" />}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
  
        {/* Page heading */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16 space-y-2 sm:space-y-4 "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center">
            <div className="tag bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              {t.contactUs}
            </div>
          </div>
          <h2 className="heading text-center p-[10px] text-5xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter mt-5">
            {t.getInTouch}
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
            {t.contactDescription}
          </p>
        </motion.div>
  
        {/* Form toggle buttons */}
        <div className="flex justify-center mb-8 ">
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
              className={`py-2.5 px-3  rounded-full transition-all duration-300 flex items-center gap-2 sm:gap-3 ${
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
              <span className="font-medium text-sm sm:text-base whitespace-nowrap">{t.getSupport}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: activeForm !== 'review' ? "rgba(243, 244, 246, 0.8)" : ""
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleForm('review')}
              className={`py-2.5 px-3 rounded-full transition-all duration-300 flex items-center gap-2 sm:gap-3 ${
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
              <span className="font-medium text-sm sm:text-base whitespace-nowrap">{t.shareFeedback}</span>
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
    <motion.div key="contact-form"
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
                        {t.name}
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
                        {t.email}
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
                      {t.subject}
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
                      {t.message}
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
                    {status === 'sending' ? t.sending : t.sendMessage}
                  </motion.button>
  
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 text-green-800 rounded-lg p-3 sm:p-4 flex items-center justify-center border border-green-200 text-sm sm:text-base"
                    >
                      <p>{t.successMessage}</p>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 text-red-800 rounded-lg p-3 sm:p-4 flex items-center justify-center border border-red-200 text-sm sm:text-base"
                    >
                      <p>{t.errorMessage}</p>
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

                  {/* Question sections rendered dynamically */}
                  {renderQuestionSection(
                    1,
                    <Search className="h-5 w-5 text-blue-600" />,
                    t.currentChallenges,
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <p className="text-[16px] font-semibold leading-[30px] tracking-tight text-[#010D3E]">{t.trackingDifficulty}</p>
                        <StarRating 
                          field="trackingDifficulty" 
                          value={reviewFormData.trackingDifficulty} 
                          onChange={handleRatingChange}
                          labelLow={t.notDifficult}
                          labelHigh={t.extremelyDifficult}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-[16px] font-semibold leading-[30px] tracking-tight text-[#010D3E]">{t.shortageImportance}</p>
                        <StarRating 
                          field="shortageImportance" 
                          value={reviewFormData.shortageImportance} 
                          onChange={handleRatingChange}
                          labelLow={t.notImportant}
                          labelHigh={t.criticallyImportant}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-[16px] font-semibold leading-[30px] tracking-tight text-[#010D3E]">{t.verificationChallenge}</p>
                        <StarRating 
                          field="verificationChallenge" 
                          value={reviewFormData.verificationChallenge} 
                          onChange={handleRatingChange}
                          labelLow={t.notChallenging}
                          labelHigh={t.veryChallenging}
                        />
                      </div>
                    </div>
                  )}

                  {renderQuestionSection(
                    2,
                    <MapPin className="h-5 w-5 text-blue-600" />,
                    t.supplyChainCommunication,
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <p className="text-[16px] font-semibold leading-[30px] tracking-tight text-[#010D3E]">{t.communicationFrequency}</p>
                        <StarRating 
                          field="communicationFrequency" 
                          value={reviewFormData.communicationFrequency} 
                          onChange={handleRatingChange}
                          labelLow={t.rarely}
                          labelHigh={t.veryFrequently}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-[16px] font-semibold leading-[30px] tracking-tight text-[#010D3E]">{t.visibilityImportance}</p>
                        <StarRating 
                          field="visibilityImportance" 
                          value={reviewFormData.visibilityImportance} 
                          onChange={handleRatingChange}
                          labelLow={t.notImportant}
                          labelHigh={t.critical}
                        />
                      </div>
                    </div>
                  )}

                  {renderQuestionSection(
                    3,
                    <Shield className="h-5 w-5 text-blue-600" />,
                    t.securityCompliance,
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <p className="text-[16px] font-semibold leading-[30px] tracking-tight text-[#010D3E]">{t.counterfeitConcern}</p>
                        <StarRating 
                          field="counterfeitConcern" 
                          value={reviewFormData.counterfeitConcern} 
                          onChange={handleRatingChange}
                          labelLow={t.notConcerned}
                          labelHigh={t.veryConcerned}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-[16px] font-semibold leading-[30px] tracking-tight text-[#010D3E]">{t.regulatoryWorkload}</p>
                        <StarRating 
                          field="regulatoryWorkload" 
                          value={reviewFormData.regulatoryWorkload} 
                          onChange={handleRatingChange}
                          labelLow={t.minorBurden}
                          labelHigh={t.majorBurden}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-[16px] font-semibold leading-[30px] tracking-tight text-[#010D3E]">{t.localRetailerQuestion}</p>
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
                              <span>{t.yes}</span>
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
                              <span>{t.no}</span>
                            </div>
                          </button>
                        </div>
                        
                        {reviewFormData.localRetailerComfort && (
                          <div className="mt-4">
                            <textarea
                              name="localRetailerComment"
                              value={reviewFormData.localRetailerComment}
                              onChange={handleReviewChange}
                              placeholder={t.explainAnswer}
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
                    t.technologyFeatures,
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <p className="text-[16px] font-semibold leading-[30px] tracking-tight text-[#010D3E]">{t.barcodeUseful}</p>
                        <StarRating 
                          field="barcodeUseful" 
                          value={reviewFormData.barcodeUseful} 
                          onChange={handleRatingChange}
                          labelLow={t.notUseful}
                          labelHigh={t.veryUseful}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-[16px] font-semibold leading-[30px] tracking-tight text-[#010D3E]">{t.alertsImportance}</p>
                        <StarRating 
                          field="alertsImportance" 
                          value={reviewFormData.alertsImportance} 
                          onChange={handleRatingChange}
                          labelLow={t.notImportant}
                          labelHigh={t.critical}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-[16px] font-semibold leading-[30px] tracking-tight text-[#010D3E]">{t.messagingValue}</p>
                        <StarRating 
                          field="messagingValue" 
                          value={reviewFormData.messagingValue} 
                          onChange={handleRatingChange}
                          labelLow={t.notValuable}
                          labelHigh={t.extremelyValuable}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-[16px] font-semibold leading-[30px] tracking-tight text-[#010D3E]">{t.reportsNecessity}</p>
                        <StarRating 
                          field="reportsNecessity" 
                          value={reviewFormData.reportsNecessity} 
                          onChange={handleRatingChange}
                          labelLow={t.notNecessary}
                          labelHigh={t.essential}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-[16px] font-semibold leading-[30px] tracking-tight text-[#010D3E]">{t.blockchainImportance}</p>
                        <StarRating 
                          field="blockchainImportance" 
                          value={reviewFormData.blockchainImportance} 
                          onChange={handleRatingChange}
                          labelLow={t.notImportant}
                          labelHigh={t.veryImportant}
                        />
                      </div>
                    </div>
                  )}

                  {renderQuestionSection(
                    5,
                    <Lightbulb className="h-5 w-5 text-blue-600" />,
                    t.additionalFeedback,
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="generalFeedback" className="text-[16px] font-semibold leading-[30px] tracking-tight text-[#010D3E]">
                          {t.additionalSuggestions}
                        </label>
                        <textarea
                          id="generalFeedback"
                          name="generalFeedback"
                          value={reviewFormData.generalFeedback}
                          onChange={handleReviewChange}
                          rows={5}
                          className="w-full p-3 border border-gray-200 rounded-lg mt-2"
                          placeholder={t. shareSuggestions}
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
                    {status === 'sending' ? t.submitting : t.submitFeedback}
                  </motion.button>

                  {status === 'success' && (
                    <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 text-red-800 rounded-lg p-3 sm:p-4 flex items-center justify-center border border-red-200 text-sm sm:text-base"
                  >
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                    <p>{t.errorMessage}</p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Features section below form */}
      <motion.div 
        className="container max-w-5xl mx-auto mt-2 sm:px-6 md:px-0 py-4 sm:py-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.h2 
         className="heading text-center p-[10px] text-5xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t.whyChooseUs}
        </motion.h2>
        
        <div className="grid md:grid-cols-3  gap-6 sm:gap-8 mt-8 sm:mt-12">
          <motion.div 
            className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-100 overflow-hidden relative"
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
            <h3 className="text-xl font-bold mb-3 text-gray-800">{t.support247}</h3>
            <p className="text-gray-600">{t.supportDesc}</p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-purple-100 overflow-hidden relative"
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
            <h3 className="text-xl font-bold mb-3 text-gray-800">{t.earlyAccess}</h3>
            <p className="text-gray-600">{t.earlyAccessDesc}</p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-6  shadow-lg border border-green-100 overflow-hidden relative"
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
            <h3 className="text-xl font-bold mb-3 text-gray-800">{t.fastResponse}</h3>
            <p className="text-gray-600">{t.fastResponseDesc}</p>
          </motion.div>
        </div>
      </motion.div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-5 -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-5 translate-x-1/2 translate-y-1/2 z-0"></div>
    </section>
  );
};

export default CombinedForm;
