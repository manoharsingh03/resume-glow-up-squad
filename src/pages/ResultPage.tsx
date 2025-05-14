
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ResumeAnalyzer from '@/components/ResumeAnalyzer';
import ScoreCard from '@/components/ScoreCard';
import FeedbackCard from '@/components/FeedbackCard';
import PersonaTab from '@/components/PersonaTab';
import { ResumeScores, FeedbackResult, FeedbackPersona } from '@/utils/feedbackGenerator';
import { ATSScoreResult } from '@/utils/atsSimulator';
import { ArrowUp } from 'lucide-react';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [scores, setScores] = useState<ResumeScores | null>(null);
  const [atsResults, setAtsResults] = useState<ATSScoreResult | null>(null);
  const [feedbackResults, setFeedbackResults] = useState<Record<FeedbackPersona, FeedbackResult> | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Check for scroll position to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get the file from location state, if it doesn't exist, redirect to home
    if (location.state && location.state.file) {
      setFile(location.state.file);
    } else {
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

  const handleAnalysisComplete = (
    scoreResults: ResumeScores, 
    atsResult: ATSScoreResult,
    feedback: Record<FeedbackPersona, FeedbackResult>
  ) => {
    setScores(scoreResults);
    setAtsResults(atsResult);
    setFeedbackResults(feedback);
    setIsAnalysisComplete(true);
  };

  const handleTryAgain = () => {
    navigate('/', { replace: true });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!file) {
    return null; // Will redirect to home
  }

  return (
    <div className="min-h-screen bg-vibe-bg pb-16">
      {/* Header */}
      <header className="bg-white border-b py-4 px-4 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-vibe-primary">Vibe Check Resume</h1>
          <Button 
            variant="outline" 
            onClick={handleTryAgain}
            className="border-vibe-primary text-vibe-primary hover:bg-vibe-primary/10"
          >
            Check Another Resume
          </Button>
        </div>
      </header>
      
      <div className="container mx-auto px-4">
        {!isAnalysisComplete ? (
          <ResumeAnalyzer file={file} onAnalysisComplete={handleAnalysisComplete} />
        ) : (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Resume Vibe Check Results</h1>
              <p className="text-vibe-text-light text-lg max-w-2xl mx-auto">
                Here's what our different personas think about your resume. Each offers a unique perspective to help you improve.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              <div className="col-span-1">
                {scores && <ScoreCard scores={scores} />}
              </div>
              <div className="col-span-1 lg:col-span-2">
                {atsResults && <FeedbackCard atsResults={atsResults} />}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Detailed Feedback</h2>
              {feedbackResults && (
                <PersonaTab 
                  hrFeedback={feedbackResults.hr}
                  brutalFeedback={feedbackResults.brutal}
                  genzFeedback={feedbackResults.genz}
                />
              )}
            </div>
            
            <div className="text-center mt-10">
              <Button onClick={handleTryAgain} className="vibe-button-primary">
                Upload Another Resume
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-vibe-primary text-white p-3 rounded-full shadow-lg hover:bg-vibe-primary/90 transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default ResultPage;
