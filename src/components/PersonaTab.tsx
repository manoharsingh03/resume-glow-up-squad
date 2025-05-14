
import { useState } from 'react';
import { FeedbackResult } from '@/utils/feedbackGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PersonaTabProps {
  hrFeedback: FeedbackResult;
  brutalFeedback: FeedbackResult;
  genzFeedback: FeedbackResult;
}

const PersonaTab = ({ hrFeedback, brutalFeedback, genzFeedback }: PersonaTabProps) => {
  const [activeTab, setActiveTab] = useState<string>("hr");

  // Helper to get the current feedback based on active tab
  const getCurrentFeedback = () => {
    switch (activeTab) {
      case 'hr':
        return hrFeedback;
      case 'brutal':
        return brutalFeedback;
      case 'genz':
        return genzFeedback;
      default:
        return hrFeedback;
    }
  };
  
  const feedback = getCurrentFeedback();

  return (
    <div>
      <Tabs defaultValue="hr" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="hr" className="data-[state=active]:bg-vibe-primary data-[state=active]:text-white">
            HR Professional
          </TabsTrigger>
          <TabsTrigger value="brutal" className="data-[state=active]:bg-vibe-accent data-[state=active]:text-white">
            Brutally Honest
          </TabsTrigger>
          <TabsTrigger value="genz" className="data-[state=active]:bg-vibe-secondary data-[state=active]:text-white">
            Gen-Z Vibes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="hr" className="mt-0">
          <FeedbackContent feedback={hrFeedback} />
        </TabsContent>
        
        <TabsContent value="brutal" className="mt-0">
          <FeedbackContent feedback={brutalFeedback} />
        </TabsContent>
        
        <TabsContent value="genz" className="mt-0">
          <FeedbackContent feedback={genzFeedback} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Separate component to display the feedback content
const FeedbackContent = ({ feedback }: { feedback: FeedbackResult }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-3">{feedback.title}</h2>
        <p className="text-lg">{feedback.summary}</p>
      </div>
      
      <div className="space-y-6">
        {feedback.sections.map((section) => (
          <Card key={section.title} className="overflow-hidden border">
            <div className="bg-gradient-to-r from-vibe-primary/80 to-vibe-secondary/80 py-3 px-4">
              <h3 className="text-lg font-medium text-white">{section.title}</h3>
            </div>
            <CardContent className="pt-4">
              <p>{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div>
        <h3 className="text-xl font-medium mb-4">Top Tips</h3>
        <ul className="space-y-2">
          {feedback.tips.map((tip, index) => (
            <li key={index} className="flex gap-2">
              <Check className="h-5 w-5 text-vibe-primary flex-shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PersonaTab;
