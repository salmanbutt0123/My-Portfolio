import React from 'react';
import { Code, Heart, Linkedin, Mail, MapPin, ArrowUp } from 'lucide-react';
import { personalInfo } from './mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Code className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">Muhammad Salman</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Computer Science student passionate about front-end development, 
                data science, and machine learning. Always learning and building.
              </p>
              <div className="flex space-x-4">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors duration-200"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors duration-200"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Quick Links</h3>
              <nav className="space-y-2">
                <a href="#home" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </a>
                <a href="#about" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  About
                </a>
                <a href="#skills" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  Skills
                </a>
                <a href="#projects" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  Projects
                </a>
                <a href="#education" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  Education
                </a>
                <a href="#contact" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Contact Info</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300 text-sm">{personalInfo.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              
              {/* Current Status */}
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-400">Available for Work</span>
                </div>
                <p className="text-xs text-gray-300">
                  Open to internships and freelance projects
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-1 text-gray-400 text-sm">
                <span>Built with</span>
                <Heart className="h-4 w-4 text-red-500" />
                <span>by Muhammad Salman</span>
              </div>
              
              <div className="text-gray-400 text-sm">
                © 2024 Muhammad Salman. All rights reserved.
              </div>
              
              <button
                onClick={scrollToTop}
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors duration-200 group"
              >
                <ArrowUp className="h-5 w-5 group-hover:transform group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;