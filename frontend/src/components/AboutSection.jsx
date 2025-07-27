import React from 'react';
import { Code, Database, Brain, Globe, Languages } from 'lucide-react';
import { personalInfo, languages, learningFocus } from './mock';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-xl text-gray-600">
              Passionate about technology and continuous learning
            </p>
          </div>

          {/* About Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">My Journey</h3>
              <p className="text-gray-700 leading-relaxed">
                As a Computer Science student, I'm on an exciting journey of continuous learning and growth. 
                My passion lies in bridging the gap between creative front-end design and the logical world 
                of data science and machine learning.
              </p>
              <p className="text-gray-700 leading-relaxed">
                I believe in learning by doing, which is why I continuously work on practical projects 
                that challenge me to apply theoretical knowledge to real-world problems. From building 
                responsive websites to exploring data patterns, every project teaches me something new.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Currently, I'm expanding my skill set into the fascinating world of AI and machine learning, 
                where I see immense potential for creating solutions that can make a meaningful impact.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Current Focus</h3>
              <div className="grid grid-cols-1 gap-4">
                {learningFocus.map((focus, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{focus.area}</h4>
                    <p className="text-sm text-gray-600 mb-2">{focus.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {focus.tools.map((tool, toolIndex) => (
                        <span 
                          key={toolIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Overview */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Technical Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Front-End</h4>
                <p className="text-sm text-gray-600">HTML, CSS, Responsive Design</p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <Database className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Programming</h4>
                <p className="text-sm text-gray-600">Python, Java, SQL</p>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Data Science</h4>
                <p className="text-sm text-gray-600">Pandas, NumPy, ML</p>
              </div>
              
              <div className="text-center p-6 bg-orange-50 rounded-lg">
                <Globe className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Networking</h4>
                <p className="text-sm text-gray-600">IP, LAN/WAN, ICT</p>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Languages</h3>
            <div className="flex justify-center items-center space-x-8">
              <Languages className="h-8 w-8 text-gray-400" />
              <div className="flex space-x-6">
                {languages.map((lang, index) => (
                  <div key={index} className="text-center">
                    <div className="font-semibold text-gray-900">{lang.name}</div>
                    <div className="text-sm text-gray-600">{lang.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;