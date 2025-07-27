import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Filter, Code, Database, Brain, Globe, Loader, AlertCircle } from 'lucide-react';
import { projects as mockProjects } from './mock';
import { projectsAPI } from '../services/api';

const ProjectsSection = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categories = ['All', 'Web Development', 'Programming', 'Data Science', 'Database'];

  // Load projects from API
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const apiProjects = await projectsAPI.getAll();
        
        // If no projects in database, use mock data
        if (apiProjects.length === 0) {
          setProjects(mockProjects);
        } else {
          setProjects(apiProjects);
        }
        setError(null);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects. Using sample data.');
        // Fallback to mock data
        setProjects(mockProjects);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Web Development':
        return <Code className="h-4 w-4" />;
      case 'Programming':
        return <Database className="h-4 w-4" />;
      case 'Data Science':
        return <Brain className="h-4 w-4" />;
      case 'Database':
        return <Globe className="h-4 w-4" />;
      default:
        return <Code className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h2>
              <p className="text-xl text-gray-600">
                Practical applications of my learning journey
              </p>
            </div>
            <div className="flex justify-center items-center py-12">
              <Loader className="h-8 w-8 animate-spin text-blue-600 mr-3" />
              <span className="text-gray-600">Loading projects...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h2>
            <p className="text-xl text-gray-600">
              Practical applications of my learning journey
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-3 mb-8">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <p className="text-yellow-800 text-sm">{error}</p>
            </div>
          )}

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  filter === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className={`${project.bgColor} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(project.category)}
                        <span className="text-sm font-medium text-gray-600">{project.category}</span>
                      </div>
                      <div className="flex space-x-2">
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                          >
                            <Github className="h-4 w-4 text-gray-600" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                          >
                            <ExternalLink className="h-4 w-4 text-gray-600" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className={`text-xl font-bold ${project.textColor} mb-3`}>
                      {project.title}
                    </h3>
                    
                    <p className={`${project.textColor} opacity-75 leading-relaxed mb-4`}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-white/20 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to See More?</h3>
              <p className="text-gray-600 mb-6">
                I'm constantly working on new projects and expanding my skills. 
                Check out my GitHub for the latest updates and code samples.
              </p>
              <a
                href="https://github.com/salmanbutt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <Github className="mr-2 h-5 w-5" />
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;