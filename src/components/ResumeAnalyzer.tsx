
import { useState, useEffect } from 'react';
import { extractTextFromResume, simulateATSReview, ATSScoreResult } from '@/utils/atsSimulator';
import { generateScores, generateFeedback, ResumeScores, FeedbackPersona, FeedbackResult } from '@/utils/feedbackGenerator';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

interface ResumeAnalyzerProps {
  file: File;
  onAnalysisComplete: (
    scores: ResumeScores,
    atsResults: ATSScoreResult,
    feedbackResults: Record<FeedbackPersona, FeedbackResult>
  ) => void;
}

const ResumeAnalyzer = ({ file, onAnalysisComplete }: ResumeAnalyzerProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Starting analysis...");
  const { toast } = useToast();

  useEffect(() => {
    const analyzeResume = async () => {
      try {
        // Step 1: Extract text from resume
        setStatus("Extracting text from your resume...");
        setProgress(10);
        const resumeText = await extractTextFromResume(file);
        
        setProgress(30);
        setStatus("Running ATS simulation...");
        // Step 2: Run ATS simulation
        const atsResults = simulateATSReview(resumeText);
        
        setProgress(50);
        setStatus("Generating scores...");
        // Step 3: Generate scores (in a real app, this would be based on actual analysis)
        const scores = generateScores();
        
        setProgress(70);
        setStatus("Creating persona feedback...");
        // Step 4: Generate feedback from each persona
        const feedbackResults = {
          hr: generateFeedback(resumeText, scores, 'hr'),
          brutal: generateFeedback(resumeText, scores, 'brutal'),
          genz: generateFeedback(resumeText, scores, 'genz')
        };
        
        setProgress(90);
        setStatus("Finalizing your vibe check...");
        
        // Small delay to show the progress completing
        setTimeout(() => {
          setProgress(100);
          setStatus("Analysis complete!");
          
          // Pass results to parent component
          onAnalysisComplete(scores, atsResults, feedbackResults);
        }, 800);
        
      } catch (error) {
        toast({
          title: "Analysis failed",
          description: "We couldn't analyze your resume. Please try again.",
          variant: "destructive",
        });
        console.error("Resume analysis error:", error);
      }
    };

    analyzeResume();
  }, [file, onAnalysisComplete, toast]);

  return (
    <div className="max-w-lg mx-auto py-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Analyzing Your Resume</h2>
        <p className="text-vibe-text-light mb-8">{status}</p>
        
        <div className="w-full bg-gray-100 rounded-full h-4 mb-4 overflow-hidden">
          <Progress value={progress} className="h-4" />
        </div>
        
        <div className="flex justify-between text-sm text-vibe-text-light">
          <span>Extracting</span>
          <span>ATS Check</span>
          <span>Personas</span>
        </div>
      </div>
      
      <div className="vibe-card animate-pulse-soft">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-vibe-primary/20"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
