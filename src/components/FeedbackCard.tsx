
import { ATSScoreResult } from "@/utils/atsSimulator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FeedbackCardProps {
  atsResults: ATSScoreResult;
}

const FeedbackCard = ({ atsResults }: FeedbackCardProps) => {
  // Function to get color based on score
  const getColorClass = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Function to get progress color based on score
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="overflow-hidden border-2">
      <div className="bg-gradient-to-r from-vibe-accent to-vibe-primary h-2"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-heading">ATS Simulation Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-5">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">ATS Score</span>
            <span className={`font-bold text-lg ${getColorClass(atsResults.overallScore)}`}>
              {atsResults.overallScore}/100
            </span>
          </div>
          <Progress 
            value={atsResults.overallScore} 
            className={`h-2 ${getProgressColor(atsResults.overallScore)}`}
          />
          <p className="text-sm text-vibe-text-light mt-2">
            This score estimates how well your resume would perform in Applicant Tracking Systems.
          </p>
        </div>

        <div className="space-y-6 mb-6">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Keywords</span>
              <span className={getColorClass(atsResults.keywordScore)}>{atsResults.keywordScore}%</span>
            </div>
            <Progress 
              value={atsResults.keywordScore} 
              className={`h-1.5 ${getProgressColor(atsResults.keywordScore)}`} 
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Formatting</span>
              <span className={getColorClass(atsResults.formattingScore)}>{atsResults.formattingScore}%</span>
            </div>
            <Progress 
              value={atsResults.formattingScore} 
              className={`h-1.5 ${getProgressColor(atsResults.formattingScore)}`} 
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Readability</span>
              <span className={getColorClass(atsResults.readabilityScore)}>{atsResults.readabilityScore}%</span>
            </div>
            <Progress 
              value={atsResults.readabilityScore} 
              className={`h-1.5 ${getProgressColor(atsResults.readabilityScore)}`} 
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Key Suggestions</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {atsResults.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Keywords Found</h4>
            <div className="flex flex-wrap gap-2">
              {atsResults.keywordsFound.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                  {keyword}
                </Badge>
              ))}
              {atsResults.keywordsFound.length === 0 && (
                <span className="text-sm text-vibe-text-light">No relevant keywords detected</span>
              )}
            </div>
          </div>
          
          {atsResults.keywordsMissing.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Consider Adding</h4>
              <div className="flex flex-wrap gap-2">
                {atsResults.keywordsMissing.slice(0, 5).map((keyword, index) => (
                  <Badge key={index} variant="outline" className="border-orange-300 text-orange-800">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
