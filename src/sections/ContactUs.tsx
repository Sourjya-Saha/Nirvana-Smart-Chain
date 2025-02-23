"use client";

import { useState, FormEvent, ChangeEvent } from 'react';
import { Send, User, Mail, MessageSquare, FileText } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type StatusType = '' | 'sending' | 'success' | 'error';

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<StatusType>('');
  const [focused, setFocused] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        console.error('Server error:', data.error);
      }
    } catch (error) {
      setStatus('error');
      console.error('Error sending message:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-24">
      <div className="container max-w-3xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
        <h2 className="heading text-center text-5xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter mt-5">
              Contact Us
            </h2>
            <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 transform transition-all duration-300 hover:shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <label 
                  htmlFor="name" 
                  className={`absolute left-10 transition-all duration-300 ${
                    focused === 'name' || formData.name 
                      ? '-top-3 text-sm text-blue-600 bg-white px-2' 
                      : 'top-3 text-gray-500'
                  }`}
                >
                  Name
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
              </div>

              <div className="relative">
                <label 
                  htmlFor="email" 
                  className={`absolute left-10 transition-all duration-300 ${
                    focused === 'email' || formData.email 
                      ? '-top-3 text-sm text-blue-600 bg-white px-2' 
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
                  value={formData.email}
                  onChange={handleChange}
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
                  focused === 'subject' || formData.subject 
                    ? '-top-3 text-sm text-blue-600 bg-white px-2' 
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
                value={formData.subject}
                onChange={handleChange}
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
                  focused === 'message' || formData.message 
                    ? '-top-3 text-sm text-blue-600 bg-white px-2' 
                    : 'top-3 text-gray-500'
                }`}
              >
                Message
              </label>
              <MessageSquare className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                required
                rows={6}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div className="bg-green-50 text-green-800 rounded-lg p-4 flex items-center justify-center animate-fade-in">
                <p>Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-50 text-red-800 rounded-lg p-4 flex items-center justify-center animate-fade-in">
                <p>Failed to send message. Please try again.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
