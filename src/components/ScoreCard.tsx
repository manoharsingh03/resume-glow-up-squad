
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeScores } from "@/utils/feedbackGenerator";

interface ScoreCardProps {
  scores: ResumeScores;
}

const ScoreCard = ({ scores }: ScoreCardProps) => {
  // Function to determine badge color based on score
  const getBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-500 hover:bg-green-600";
    if (score >= 70) return "bg-lime-500 hover:bg-lime-600";
    if (score >= 60) return "bg-yellow-500 hover:bg-yellow-600";
    if (score >= 50) return "bg-orange-500 hover:bg-orange-600";
    return "bg-red-500 hover:bg-red-600";
  };

  // Function to get score description
  const getScoreDescription = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    if (score >= 50) return "Needs Work";
    return "Poor";
  };

  return (
    <Card className="overflow-hidden border-2">
      <div className="bg-gradient-to-r from-vibe-primary to-vibe-secondary h-2"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-heading">Resume Score Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-medium">Overall Score</span>
            <Badge className={`text-md px-3 py-1 ${getBadgeColor(scores.overall)}`}>
              {scores.overall}/100
            </Badge>
          </div>
          <p className="text-sm text-vibe-text-light">
            {getScoreDescription(scores.overall)} - This score reflects the overall quality of your resume.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Content Quality</h4>
              <p className="text-xs text-vibe-text-light">Experience, skills, achievements</p>
            </div>
            <Badge className={`${getBadgeColor(scores.content)}`}>{scores.content}/100</Badge>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Design & Formatting</h4>
              <p className="text-xs text-vibe-text-light">Layout, readability, visual appeal</p>
            </div>
            <Badge className={`${getBadgeColor(scores.design)}`}>{scores.design}/100</Badge>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">ATS Compatibility</h4>
              <p className="text-xs text-vibe-text-light">Keywords, parsing success</p>
            </div>
            <Badge className={`${getBadgeColor(scores.ats)}`}>{scores.ats}/100</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
