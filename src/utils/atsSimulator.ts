
// This is a simple ATS simulator that analyzes keywords and formatting

export interface ATSScoreResult {
  overallScore: number;
  keywordScore: number;
  formattingScore: number;
  readabilityScore: number;
  suggestions: string[];
  keywordsFound: string[];
  keywordsMissing: string[];
}

// Common ATS keywords based on general resume best practices
const commonKeywords = [
  "experience", "skills", "education", "achievements", "results", 
  "leadership", "project", "team", "managed", "developed", "created",
  "implemented", "analyzed", "improved", "increased", "reduced", "led", 
  "communication", "professional", "responsible", "proficient", "expertise",
  "bachelor", "master", "certified", "training", "degree", "success", 
  "accomplished", "solution", "collaborate", "coordinated", "organized"
];

// Format issues that ATS systems might struggle with
const formatIssues = [
  { pattern: /[^\w\s\.\,\-\:\;\(\)\&\%\/\\]/, issue: "Special characters" },
  { pattern: /\.{2,}/, issue: "Using multiple periods (often in formatting)" },
  { pattern: /<[^>]*>/, issue: "HTML tags" },
  { pattern: /\[[^\]]*\]/, issue: "Square brackets" }
];

// Readability issues
const readabilityIssues = [
  { pattern: /[A-Z]{5,}/, issue: "Too many uppercase letters" },
  { pattern: /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/g, issue: "Email format" },
  { pattern: /(\b\d{3}[-.]?\d{3}[-.]?\d{4}\b)/, issue: "Phone number format" }
];

export const simulateATSReview = (resumeText: string): ATSScoreResult => {
  // Strip out non-text elements before analysis
  const cleanText = resumeText.toLowerCase();
  
  // Keywords analysis
  const keywordsFound: string[] = [];
  const keywordsMissing: string[] = [];
  
  commonKeywords.forEach(keyword => {
    if (cleanText.includes(keyword.toLowerCase())) {
      keywordsFound.push(keyword);
    } else {
      keywordsMissing.push(keyword);
    }
  });
  
  const keywordScore = Math.min(100, Math.round((keywordsFound.length / commonKeywords.length) * 100));
  
  // Formatting analysis
  let formatIssueCount = 0;
  formatIssues.forEach(issue => {
    if (issue.pattern.test(cleanText)) {
      formatIssueCount++;
    }
  });
  
  const formattingScore = Math.max(0, Math.round(100 - (formatIssueCount / formatIssues.length) * 100));
  
  // Readability analysis
  let readabilityIssueCount = 0;
  let readabilityMatches = false;
  
  readabilityIssues.forEach(issue => {
    if (issue.pattern.test(cleanText)) {
      readabilityMatches = true;
    } else {
      readabilityIssueCount++;
    }
  });
  
  const readabilityScore = readabilityMatches ? 100 : Math.max(0, Math.round(100 - (readabilityIssueCount / readabilityIssues.length) * 100));
  
  // Calculate overall score
  const overallScore = Math.round((keywordScore * 0.5) + (formattingScore * 0.3) + (readabilityScore * 0.2));
  
  // Generate suggestions
  const suggestions = [];
  
  if (keywordScore < 70) {
    suggestions.push(`Consider adding more industry-relevant keywords to your resume (${keywordsMissing.slice(0, 5).join(", ")}, etc.)`);
  }
  
  if (formattingScore < 70) {
    suggestions.push("Simplify formatting and avoid special characters that ATS systems struggle with");
  }
  
  if (readabilityScore < 70) {
    suggestions.push("Ensure contact information is properly formatted and avoid excessive capitalization");
  }
  
  return {
    overallScore,
    keywordScore,
    formattingScore,
    readabilityScore,
    suggestions,
    keywordsFound: keywordsFound.slice(0, 10), // Limit to top 10 keywords
    keywordsMissing: keywordsMissing.slice(0, 10) // Limit to top 10 missing keywords
  };
};

// Mock function to simulate extracting text from a resume file
export const extractTextFromResume = async (file: File): Promise<string> => {
  // In a real app, you would use a library to extract text from PDFs and DOCXs
  // For this demo, we'll return mock text to simulate resume content
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`
        John Doe
        Software Engineer
        john.doe@email.com | 555-123-4567

        EXPERIENCE
        Senior Software Developer, Tech Company
        Led development team on multiple projects
        Implemented new features in React and Node.js
        Improved application performance by 40%

        Junior Developer, Startup Inc.
        Designed and developed user interfaces
        Collaborated with team members on feature implementation

        EDUCATION
        Bachelor of Science in Computer Science
        University Name, Graduation Year

        SKILLS
        JavaScript, React, Node.js, Python, SQL, Git
        Team leadership, Project management, Communication
      `);
    }, 1500); // Simulate processing time
  });
};
