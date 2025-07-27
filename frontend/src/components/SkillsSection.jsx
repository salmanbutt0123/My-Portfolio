import React from 'react';
import { Code, Database, Brain, Globe, TrendingUp } from 'lucide-react';
import { skills } from './mock';

const SkillsSection = () => {
  const getIcon = (category) => {
    switch (category) {
      case 'Front-End Development':
        return <Code className="h-6 w-6" />;
      case 'Programming':
        return <Database className="h-6 w-6" />;
      case 'Data Science & ML':
        return <Brain className="h-6 w-6" />;
      case 'Networking & ICT':
        return <Globe className="h-6 w-6" />;
      default:
        return <TrendingUp className="h-6 w-6" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Intermediate':
        return 'bg-green-100 text-green-800';
      case 'Learning':
        return 'bg-blue-100 text-blue-800';
      case 'Basic':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
            <p className="text-xl text-gray-600">
              A comprehensive overview of my technical capabilities and learning journey
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skillCategory, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${skillCategory.color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
                      <div className={`${skillCategory.color.replace('bg-', 'text-')}`}>
                        {getIcon(skillCategory.category)}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{skillCategory.category}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(skillCategory.level)}`}>
                    {skillCategory.level}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full hover:bg-gray-200 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Proficiency</span>
                      <span>
                        {skillCategory.level === 'Intermediate' ? '70%' : 
                         skillCategory.level === 'Learning' ? '45%' : '30%'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${skillCategory.color} transition-all duration-500`}
                        style={{ 
                          width: skillCategory.level === 'Intermediate' ? '70%' : 
                                 skillCategory.level === 'Learning' ? '45%' : '30%'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Learning Journey */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Continuous Learning</h3>
              <p className="text-gray-600 mb-6">
                I'm always expanding my knowledge through practical projects and online courses
              </p>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">YouTube</div>
                  <div className="text-sm text-gray-600">Video Tutorials</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">Udemy</div>
                  <div className="text-sm text-gray-600">Structured Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">Projects</div>
                  <div className="text-sm text-gray-600">Hands-on Practice</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;