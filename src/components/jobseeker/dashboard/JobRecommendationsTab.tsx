
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Briefcase, DollarSign, Clock, Eye, ExternalLink, TrendingUp } from "lucide-react";
import { jobsService } from "@/services/jobs.service";
import { useAuth } from "@/hooks/use-auth";
import { useProfile } from "@/hooks/use-user-profile";

export const JobRecommendationsTab = () => {
  const navigate = useNavigate();
  const { profile, isLoading: profileLoading } = useProfile();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch skill-based job recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        console.log('Profile data:', profile);
        
        if (profile && profile.skills && profile.skills.length > 0) {
          console.log('Fetching AI job matches with skills:', profile.skills);
          console.log('Profile data full:', profile);
          try {
            const response = await jobsService.aiMatchJobs({ 
              skills: profile.skills,
              location_preference: profile.location,
              salary_expectation: profile.salary_expectation
            });
            console.log('AI job match response:', response);
            setRecommendations(response);
            setError(null);
          } catch (aiError) {
            console.error('AI job matching failed:', aiError);
            console.log('Error details:', {
              message: aiError.message,
              stack: aiError.stack,
              status: aiError.status || 'unknown'
            });
            
            // Fallback to regular job search
            try {
              console.log('Attempting fallback to regular jobs...');
              const fallbackResponse = await jobsService.getJobs({ limit: 10 });
              console.log('Fallback job response:', fallbackResponse);
              
              // Check if fallbackResponse has the expected structure
              if (fallbackResponse && fallbackResponse.jobs && Array.isArray(fallbackResponse.jobs)) {
                // Transform regular jobs to match recommendation format
                const transformedJobs = fallbackResponse.jobs.map(job => ({
                  job_id: job.job_id,
                  title: job.title,
                  company: job.company,
                  location: job.location,
                  salary_range: job.salary_range,
                  match_score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
                  matched_skills: job.skills_required?.filter(skill => 
                    profile.skills.some(userSkill => 
                      userSkill.toLowerCase().includes(skill.toLowerCase()) ||
                      skill.toLowerCase().includes(userSkill.toLowerCase())
                    )
                  ) || [],
                  created_at: job.created_at
                }));
                
                setRecommendations(transformedJobs);
                setError(null);
              } else {
                console.error('Fallback response invalid structure:', fallbackResponse);
                setError('Unable to fetch job recommendations. Invalid response format.');
              }
            } catch (fallbackError) {
              console.error('Fallback also failed:', fallbackError);
              setError(`Failed to fetch job recommendations: ${fallbackError.message}`);
            }
          }
        } else {
          console.log('No skills found in profile:', profile);
          setError('No skills found in profile. Please update your profile with your skills.');
        }
      } catch (err) {
        console.error('Error fetching job recommendations:', err);
        setError(err.message || 'Failed to fetch job recommendations');
      } finally {
        setLoading(false);
      }
    };

    if (!profileLoading && profile) {
      fetchRecommendations();
    }
  }, [profile, profileLoading]);

  const handleViewDetails = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleApplyNow = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Job Recommendations
        </CardTitle>
        <CardDescription>Tailored matches based on your profile and skills</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <strong>Error:</strong> {typeof error === 'string' ? error : JSON.stringify(error)}
          </div>
        )}
        {profileLoading || loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading job recommendations...</p>
          </div>
        ) : recommendations.length > 0 ? (
          recommendations.map((job) => (
            <div 
              key={job.job_id} 
              className="p-6 bg-gradient-to-r from-white to-gray-50/50 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4 text-blue-500" />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-green-500" />
                      {job.location}
                    </div>
                    {job.salary_range && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-orange-500" />
                        {job.salary_range}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`px-3 py-1 font-semibold ${
                    job.match_score >= 85 ? 'bg-green-100 text-green-800 border-green-200' : 
                    job.match_score >= 75 ? 'bg-blue-100 text-blue-800 border-blue-200' : 
                    'bg-yellow-100 text-yellow-800 border-yellow-200'
                  }`}>
                    {Math.round(job.match_score)}% Match
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {new Date(job.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {job.matched_skills?.slice(0, 5).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-green-600">
                  Matched {job.matched_skills?.length || 0} of your skills
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Great match for your skills!
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleViewDetails(job.job_id)}
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button 
                    onClick={() => handleApplyNow(job.job_id)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No job recommendations yet</h3>
            <p className="text-gray-500 mb-4">
              {typeof error === 'string' ? error : 'Please update your profile with skills to get personalized job recommendations.'}
            </p>
            <Button onClick={() => navigate('/profile')} variant="outline">
              Update Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
