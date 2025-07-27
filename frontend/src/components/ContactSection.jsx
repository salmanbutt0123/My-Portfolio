import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { personalInfo } from './mock';
import { contactAPI } from '../services/api';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (submitStatus === 'error') {
      setSubmitStatus(null);
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim() || formData.name.length < 2) {
      setErrorMessage('Name must be at least 2 characters long');
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    if (!formData.subject.trim() || formData.subject.length < 5) {
      setErrorMessage('Subject must be at least 5 characters long');
      return false;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setErrorMessage('Message must be at least 10 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      await contactAPI.submit(formData);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Auto-reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">
              Let's connect and discuss opportunities or collaborations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a 
                        href={`mailto:${personalInfo.email}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Linkedin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">LinkedIn</p>
                      <a 
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        Connect with me
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p className="text-gray-600">{personalInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <a
                    href="#projects"
                    className="block text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    → View My Projects
                  </a>
                  <a
                    href="#skills"
                    className="block text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    → Technical Skills
                  </a>
                  <a
                    href="#education"
                    className="block text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    → Education & Certifications
                  </a>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Currently Available</h4>
                <p className="text-gray-700">
                  I'm open to internships, freelance projects, and collaboration opportunities 
                  in web development and data science.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
              
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h4>
                  <p className="text-gray-600">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Alert */}
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-700 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Enter subject"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                      placeholder="Your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;