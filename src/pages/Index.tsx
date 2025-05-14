
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadSection from '@/components/UploadSection';

const Index = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUploaded = (file: File) => {
    setIsUploading(true);
    
    // Navigate to results page with the file
    navigate('/results', { state: { file } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="vibe-gradient-bg text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Vibe Check Your Resume
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90">
            Get feedback on your resume from three unique perspectives: HR Professional, Brutally Honest Friend, and Gen-Z Lingo by mona darling.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="#upload-section" 
              className="bg-white text-vibe-primary hover:bg-opacity-90 font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Check My Resume
            </a>
            <a 
              href="#how-it-works" 
              className="bg-transparent border-2 border-white hover:bg-white/10 font-medium px-8 py-3 rounded-lg transition-colors"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upload Your Resume</h2>
            <p className="text-vibe-text-light max-w-2xl mx-auto">
              Simply upload your resume in PDF or DOCX format and we'll provide you with instant feedback from multiple perspectives.
            </p>
          </div>

          <UploadSection onFileUploaded={handleFileUploaded} />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-vibe-text-light max-w-2xl mx-auto">
              Our vibe check process is simple, fast, and insightful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="vibe-card hover:shadow-lg">
              <div className="w-16 h-16 bg-vibe-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-vibe-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Upload Your Resume</h3>
              <p className="text-vibe-text-light text-center">
                Submit your resume in PDF or DOCX format through our simple upload interface.
              </p>
            </div>

            <div className="vibe-card hover:shadow-lg">
              <div className="w-16 h-16 bg-vibe-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-vibe-secondary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Instant Analysis</h3>
              <p className="text-vibe-text-light text-center">
                Our system analyzes your resume for content quality, design, and ATS compatibility.
              </p>
            </div>

            <div className="vibe-card hover:shadow-lg">
              <div className="w-16 h-16 bg-vibe-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-vibe-accent">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Get Feedback</h3>
              <p className="text-vibe-text-light text-center">
                Receive insights from three unique perspectives to help you improve your resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personas Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Your Resume Reviewers</h2>
            <p className="text-vibe-text-light max-w-2xl mx-auto">
              Get feedback from three different perspectives to give you a well-rounded view of your resume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-24 bg-vibe-primary flex items-center justify-center">
                <h3 className="text-xl font-bold text-white">HR Professional</h3>
              </div>
              <div className="p-6">
                <p className="text-vibe-text-light mb-4">
                  Professional, constructive feedback from a hiring manager's perspective. Get industry-standard advice on formatting, content, and presentation.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-vibe-primary rounded-full mr-2"></span>
                    <span>Professional evaluation</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-vibe-primary rounded-full mr-2"></span>
                    <span>Industry best practices</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-vibe-primary rounded-full mr-2"></span>
                    <span>Constructive suggestions</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-24 bg-vibe-accent flex items-center justify-center">
                <h3 className="text-xl font-bold text-white">Brutally Honest Friend</h3>
              </div>
              <div className="p-6">
                <p className="text-vibe-text-light mb-4">
                  Candid, direct feedback that doesn't sugar-coat the truth. Your friend who will tell you exactly what's wrong with your resume, no holding back.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-vibe-accent rounded-full mr-2"></span>
                    <span>No-filter truth bombs</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-vibe-accent rounded-full mr-2"></span>
                    <span>Direct improvement points</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-vibe-accent rounded-full mr-2"></span>
                    <span>Tough love approach</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-24 bg-vibe-secondary flex items-center justify-center">
                <h3 className="text-xl font-bold text-white">Gen-Z Lingo</h3>
              </div>
              <div className="p-6">
                <p className="text-vibe-text-light mb-4">
                  Fun, trendy feedback with Gen-Z slang and emojis. Get a modern perspective on how your resume is vibing with today's hiring trends.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-vibe-secondary rounded-full mr-2"></span>
                    <span>Trendy lingo & emojis</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-vibe-secondary rounded-full mr-2"></span>
                    <span>Modern perspective</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-vibe-secondary rounded-full mr-2"></span>
                    <span>Fresh take on old rules</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-vibe-text-light max-w-2xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="vibe-card">
              <h3 className="text-xl font-bold mb-2">Is my resume data secure?</h3>
              <p className="text-vibe-text-light">
                Yes! We don't store your resume after analysis. Your data is processed securely and then deleted automatically.
              </p>
            </div>

            <div className="vibe-card">
              <h3 className="text-xl font-bold mb-2">What file formats are supported?</h3>
              <p className="text-vibe-text-light">
                Currently, we support PDF and DOCX formats, which are the industry standards for resume submissions.
              </p>
            </div>

            <div className="vibe-card">
              <h3 className="text-xl font-bold mb-2">How accurate is the ATS simulation?</h3>
              <p className="text-vibe-text-light">
                Our ATS simulation provides a good approximation of how real Applicant Tracking Systems evaluate resumes, focusing on keywords, formatting, and readability.
              </p>
            </div>

            <div className="vibe-card">
              <h3 className="text-xl font-bold mb-2">Do I need to create an account?</h3>
              <p className="text-vibe-text-light">
                No! Vibe Check Resume is designed to be frictionless - just upload and get instant feedback without creating an account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 vibe-gradient-bg text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Vibe Check Your Resume?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Get the feedback you need to stand out in today's competitive job market.
          </p>
          <a 
            href="#upload-section" 
            className="bg-white text-vibe-primary hover:bg-opacity-90 font-medium px-8 py-3 rounded-lg transition-colors inline-block"
          >
            Upload My Resume
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Vibe Check Resume</h3>
            <p className="text-gray-400 mb-4">
              Making resume feedback fun, honest, and actionable.
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Vibe Check Resume. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
