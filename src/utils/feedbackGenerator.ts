
// This file generates feedback in different personas

export type FeedbackPersona = 'hr' | 'brutal' | 'genz';

export interface FeedbackSection {
  title: string;
  content: string;
}

export interface FeedbackResult {
  title: string;
  summary: string;
  sections: FeedbackSection[];
  tips: string[];
}

export interface ResumeScores {
  content: number;
  design: number;
  ats: number;
  overall: number;
}

// Generate feedback based on ATS results and persona
export const generateFeedback = (
  resumeText: string,
  scores: ResumeScores,
  persona: FeedbackPersona
): FeedbackResult => {
  switch (persona) {
    case 'hr':
      return generateHRFeedback(resumeText, scores);
    case 'brutal':
      return generateBrutalFeedback(resumeText, scores);
    case 'genz':
      return generateGenZFeedback(resumeText, scores);
    default:
      return generateHRFeedback(resumeText, scores);
  }
};

// HR Professional feedback - professional, constructive
const generateHRFeedback = (resumeText: string, scores: ResumeScores): FeedbackResult => {
  const contentFeedback = getContentFeedback('hr', scores.content);
  const designFeedback = getDesignFeedback('hr', scores.design);
  const atsFeedback = getATSFeedback('hr', scores.ats);
  
  return {
    title: "HR Professional Review",
    summary: `Your resume scores ${scores.overall}/100 overall. It ${scores.overall >= 80 ? 'shows strong potential' : scores.overall >= 60 ? 'needs some refinement' : 'requires significant improvements'} to stand out in today's competitive job market.`,
    sections: [
      {
        title: "Content Evaluation",
        content: contentFeedback
      },
      {
        title: "Layout & Format Analysis",
        content: designFeedback
      },
      {
        title: "ATS Compatibility Review",
        content: atsFeedback
      }
    ],
    tips: [
      "Quantify your achievements with metrics where possible",
      "Tailor your resume to match the specific job description",
      "Use action verbs to start your bullet points",
      "Keep formatting consistent throughout",
      "Include a professional summary that highlights your value proposition"
    ]
  };
};

// Brutally Honest Friend feedback - candid, direct
const generateBrutalFeedback = (resumeText: string, scores: ResumeScores): FeedbackResult => {
  const contentFeedback = getContentFeedback('brutal', scores.content);
  const designFeedback = getDesignFeedback('brutal', scores.design);
  const atsFeedback = getATSFeedback('brutal', scores.ats);
  
  return {
    title: "Your Brutally Honest Friend's Take",
    summary: `Look, I'm not gonna sugarcoat it. Your resume scores a ${scores.overall}/100. ${scores.overall >= 80 ? "That's actually not bad, but let's get real about the issues." : scores.overall >= 60 ? "That's mediocre at best, and here's why:" : "That's pretty terrible, and we need to fix it ASAP:"}`,
    sections: [
      {
        title: "The Hard Truth About Your Content",
        content: contentFeedback
      },
      {
        title: "Your Design Choices... Yikes",
        content: designFeedback
      },
      {
        title: "Will Robots Even Read This?",
        content: atsFeedback
      }
    ],
    tips: [
      "Cut the fluff. No one cares that you're a 'passionate team player'",
      "Your job descriptions are putting people to sleep - be specific about what YOU did",
      "That format is so 2010. Update it or get left behind",
      "Stop using weak words like 'helped' and 'assisted' - own your achievements",
      "If you're over 30, one page. Period."
    ]
  };
};

// Gen-Z Lingo feedback - casual, trendy, emojis
const generateGenZFeedback = (resumeText: string, scores: ResumeScores): FeedbackResult => {
  const contentFeedback = getContentFeedback('genz', scores.content);
  const designFeedback = getDesignFeedback('genz', scores.design);
  const atsFeedback = getATSFeedback('genz', scores.ats);
  
  return {
    title: "The Vibe Check 💅",
    summary: `Okay so your resume is giving ${scores.overall}/100 energy ✨ ${scores.overall >= 80 ? "It's low-key fire but still needs some tweaks to be totally main character material." : scores.overall >= 60 ? "It's mid tbh, but with some glow-ups it could slay." : "It's giving flop, no cap. But we can fix the vibes, bestie!"}`,
    sections: [
      {
        title: "Content Check 📝",
        content: contentFeedback
      },
      {
        title: "Aesthetic Vibes 🎨",
        content: designFeedback
      },
      {
        title: "Robot Check 🤖",
        content: atsFeedback
      }
    ],
    tips: [
      "Your skills section needs to flex harder 💪",
      "That job you had for 2 months? Ghost it. 👻",
      "The font is giving 2012 energy. Level up 📈",
      "Drop in some buzzwords so the hiring manager doesn't scroll past ✋",
      "Your LinkedIn better match this energy or it's sus 🚩"
    ]
  };
};

// Helper functions to generate specific feedback based on scores and persona
function getContentFeedback(persona: FeedbackPersona, score: number): string {
  // Different feedback based on persona and score
  if (persona === 'hr') {
    if (score >= 80) {
      return "Your resume effectively communicates your professional experience and skills. The content is well-structured with clear achievements and responsibilities. To enhance it further, consider adding more quantifiable results and industry-specific terminology.";
    } else if (score >= 60) {
      return "Your resume provides a satisfactory overview of your experience, but lacks some depth in demonstrating your impact. Consider replacing generic duty descriptions with specific achievements. Make sure each role clearly shows your contribution and value-add to previous organizations.";
    } else {
      return "Your resume content needs substantial improvement. The descriptions are too generic and don't effectively showcase your skills or accomplishments. Focus on articulating your specific contributions in each role and quantify your achievements where possible.";
    }
  } else if (persona === 'brutal') {
    if (score >= 80) {
      return "Not terrible. I'm surprised. Your experience doesn't put me to sleep immediately, but you're still underselling yourself. Too many generic statements that anyone could write. Where's the proof you actually did something worthwhile? Show me numbers or I'm not buying it.";
    } else if (score >= 60) {
      return "Let me be real - this content is boring. 'Responsible for...' Who cares? Tell me what you ACTUALLY did. Your bullet points read like a job description, not achievements. You think hiring managers have time to figure out if you're good? Prove it or lose the job to someone who can.";
    } else {
      return "This is bad. Really bad. Did you even try? Your content is so generic I have no idea what you actually do. 'Team player'? 'Detail-oriented'? Yawn. Everyone says that. Give me specifics or don't bother applying. This reads like AI wrote it - and badly.";
    }
  } else { // genz
    if (score >= 80) {
      return "Your resume content is kinda slaying tbh 💅 You're giving main character energy with those achievements! Still, some parts are a bit basic 🥱 Level up by adding more receipts (stats & numbers) to flex your impact. Make it impossible for them to scroll past you! ✨";
    } else if (score >= 60) {
      return "The content is mid, bestie 😬 You're not really showing why you're that girl/guy for the job. Your bullet points are giving copy-paste energy. Need to zhuzh it up with some standout moments and flex your actual impact. Right now it's just not giving what it's supposed to give. 🤷‍♀️";
    } else {
      return "I'm sorry but your resume is flopping hard 💀 The content is giving nothing, absolutely zero personality or achievements. It's drier than BeReal on a Monday. You need a serious glow-up - add your W's, delete the basic stuff, and make it POP off. No cap, it needs work! 🚨";
    }
  }
}

function getDesignFeedback(persona: FeedbackPersona, score: number): string {
  // Different feedback based on persona and score for design/format
  if (persona === 'hr') {
    if (score >= 80) {
      return "The layout of your resume is professional and well-organized. The hierarchy of information makes it easy to scan and locate key information. The formatting choices enhance readability while maintaining a professional appearance.";
    } else if (score >= 60) {
      return "Your resume layout is acceptable but could be improved for better visual hierarchy. Consider refining the spacing between sections and ensuring consistent formatting throughout. A cleaner design would make it easier for recruiters to quickly identify your qualifications.";
    } else {
      return "The design and formatting of your resume need significant attention. The current layout makes it difficult to quickly scan for important information. Consider adopting a cleaner, more consistent format with clear section headings and appropriate use of white space.";
    }
  } else if (persona === 'brutal') {
    if (score >= 80) {
      return "Your design isn't offensive, which is better than most. But it's safe - too safe. It won't stand out in a stack of resumes. And those margins? Either too tight or too loose. Pick a side. At least it's readable, which is more than I can say for most people's design disasters.";
    } else if (score >= 60) {
      return "Your formatting is inconsistent and it's driving me crazy. Pick a style and stick with it! Some bullets have periods, others don't. Different spacing between sections. Are you trying to annoy the person reading this? Because that's a bold strategy for getting hired.";
    } else {
      return "Did you format this in the dark? It's a visual nightmare. Too many fonts, weird spacing, and is that... Comic Sans? No one's reading past the header with this layout. It screams 'I don't care enough to make this look professional.' Start over from scratch.";
    }
  } else { // genz
    if (score >= 80) {
      return "Your resume layout is clean AF 👌 The aesthetic is professional but not boring! Love how scannable it is - giving organized queen/king vibes. Maybe add a *tiny* pop of color to make your name or sections stand out? Just enough to catch the eye but not full clown mode! 🎨";
    } else if (score >= 60) {
      return "The design is giving template energy 🥴 It's not terrible but it's definitely serving basic. Your formatting is all over the place - pick a style and commit to it! Some consistency would seriously level up your professional aesthetic. Right now it's like your resume can't decide what vibe it's going for. 📝";
    } else {
      return "OMG the layout is chaotic evil 💀 It's literally hurting my eyes to look at this formatting! Too many fonts, weird spacing - it's giving 'I just learned how to use Microsoft Word' energy. No shade but this needs a total redesign if you want anyone to actually read it! 🚩🚩🚩";
    }
  }
}

function getATSFeedback(persona: FeedbackPersona, score: number): string {
  // Different feedback based on persona and score for ATS compatibility
  if (persona === 'hr') {
    if (score >= 80) {
      return "Your resume demonstrates good ATS compatibility. The clear formatting and appropriate keyword usage should allow it to pass through most applicant tracking systems successfully. Continue to tailor keywords to specific job descriptions for optimal results.";
    } else if (score >= 60) {
      return "Your resume may encounter some challenges with ATS systems. Consider incorporating more industry-standard keywords relevant to your target positions. Also, ensure that your formatting is simple enough for automated systems to parse correctly.";
    } else {
      return "Your resume is likely to struggle with ATS systems in its current form. Complex formatting, insufficient keywords, and non-standard section headings may prevent your application from reaching human reviewers. Simplify the format and enhance relevant keyword usage.";
    }
  } else if (persona === 'brutal') {
    if (score >= 80) {
      return "You've managed to play the ATS game decently. The robots might actually let a human see this. But you're still missing key industry terms that could get you filtered out. Remember, it doesn't matter how good you are if the algorithm rejects you before anyone sees your resume.";
    } else if (score >= 60) {
      return "Your resume is probably getting filtered out by ATS systems. Too few keywords, weird formatting choices - it's like you want to stay unemployed. These systems are ruthless and you're not even trying to beat them. Add the right keywords or keep getting auto-rejected.";
    } else {
      return "Does the term 'Applicant Tracking System' mean anything to you? Because your resume is ATS poison. It's practically designed to get rejected. No relevant keywords, funky formatting - it's like you're actively trying to avoid getting hired. Fix this or don't bother applying online.";
    }
  } else { // genz
    if (score >= 80) {
      return "Your resume is pretty algorithm-friendly - those bots will probably let you through! 🤖 You've got enough of the right keywords to pass the vibe check. Still could sneak in a few more buzzwords from the job listing though... gotta game the system to get that bag! 💰";
    } else if (score >= 60) {
      return "Your resume might get ghosted by the ATS bots tbh 👻 Not enough of the right keywords and the format is confusing them. These algorithms are toxic gatekeepers fr, but you gotta play their game. Steal more words directly from the job posting - it's not plagiarism, it's strategy! 😤";
    } else {
      return "The ATS is gonna swipe left on your resume faster than a red flag on dating apps 🚫 Your keywords are not it, bestie. These robot systems are brutal and yours is giving them nothing to work with. Major yikes! Need to sprinkle in WAY more industry terms or you'll stay on read forever. ⚠️";
    }
  }
}

// Function to generate scores based on "analysis" of resume
// In a real app, this would be a much more sophisticated analysis
export const generateScores = (): ResumeScores => {
  // Generate random scores for demonstration
  const content = Math.floor(Math.random() * 40) + 60; // 60-100
  const design = Math.floor(Math.random() * 40) + 60;  // 60-100
  const ats = Math.floor(Math.random() * 40) + 60;     // 60-100
  
  // Overall score is weighted
  const overall = Math.floor(
    (content * 0.4) + (design * 0.3) + (ats * 0.3)
  );
  
  return {
    content,
    design,
    ats,
    overall
  };
};
