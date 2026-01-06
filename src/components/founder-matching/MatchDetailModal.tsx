import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Clock,
  DollarSign,
  Building,
  Target,
  Share2,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";
import { MatchProfile } from "@/services/founder-matching.service";

interface MatchDetailModalProps {
  match: MatchProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAction: (
    targetUserId: string,
    action: "view" | "interest" | "decline"
  ) => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({
  match,
  open,
  onOpenChange,
  onAction,
}) => {
  const skillOverlap = match.skills_compatibility;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Co-Founder Match Details</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                Match Score: {Math.round(match.match_score * 100)}%
              </Badge>
              {match.match_status === "mutual_interest" && (
                <Badge variant="default">Mutual Interest</Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium">{match.location || "Remote"}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">
                  Time Commitment
                </div>
                <div className="font-medium">{match.time_commitment}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">
                  Funding Status
                </div>
                <div className="font-medium">{match.funding_status}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Vision & Problem Comparison */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Business Vision Alignment
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Vision Similarity</span>
                  <span className="font-medium">
                    {Math.round(match.vision_similarity * 100)}%
                  </span>
                </div>
                <Progress
                  value={match.vision_similarity * 100}
                  className="h-2"
                />
              </div>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">
                  {match.business_vision}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Problem Statement</h3>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">
                  {match.problem_statement}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Skills Overlap */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Skills Compatibility</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Skills Overlap</span>
                <span className="font-medium">
                  {Math.round(skillOverlap * 100)}%
                </span>
              </div>
              <Progress value={skillOverlap * 100} className="h-2" />
            </div>
            <div className="flex flex-wrap gap-2">
              {match.required_skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Contact & Actions */}
          {match.match_status === "mutual_interest" ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Chat
                </Button>
                <Button variant="outline" className="justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Schedule Call
                </Button>
                <Button variant="outline" className="justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Profile
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => onAction(match.user_id, "decline")}
              >
                Decline
              </Button>
              {match.match_status !== "interest" && (
                <Button
                  variant="default"
                  onClick={() => onAction(match.user_id, "interest")}
                >
                  Express Interest
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
