import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { jobMatchingService, MarketAnalysis, JobMatch } from '@/services/job-matching.service';
import { TrendingUp, Brain, Target } from 'lucide-react';
import { toast } from 'sonner';

const EnhancedSkillAnalysisPage: React.FC = () => {
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis | null>(null);
  const [loading, setLoading] = useState(false); // Changed to false to prevent auto-loading

  // Removed auto-loading to prevent database slowdown
  // Market analysis now loads on user request only
  
  const fetchMarketAnalysis = async () => {
    setLoading(true);
    try {
      const analysis = await jobMatchingService.analyzeJobMarket();
      setMarketAnalysis(analysis);
      toast.success('Market analysis completed!');
    } catch (error) {
      console.error('Failed to fetch market analysis:', error);
      toast.error('Failed to load market analysis');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing job market and calculating skill matches...</p>
        </div>
      </Layout>
    );
  }

  if (!marketAnalysis) {
    return (
      <Layout>
        <div className="container mx-auto py-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Enhanced Skill Analysis
          </h1>
          
          <Card className="text-center py-12">
            <CardContent>
              <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready for Enhanced Skill Analysis?</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Get comprehensive insights into how your skills match the current job market. 
                We'll analyze 100+ job listings and provide detailed recommendations.
              </p>
              <Button onClick={fetchMarketAnalysis} disabled={loading} className="px-8 py-3">
                {loading ? 'Analyzing...' : 'Start Analysis'}
              </Button>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 mt-8">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span>Job Matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Skill Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span>AI Insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Career Growth</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Enhanced Skill Analysis
          </h1>
          <Button onClick={fetchMarketAnalysis} disabled={loading} variant="outline">
            {loading ? 'Refreshing...' : 'Refresh Analysis'}
          </Button>
        </div>

        {/* Average Market Score */}
        <Card>
          <CardHeader>
            <CardTitle>Average Market Match</CardTitle>
            <CardDescription>
              This score shows how well your skills match the average job requirements in the market.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">Average Match Score</span>
              <span className="text-2xl font-bold">{marketAnalysis.averageMatchScore}%</span>
            </div>
            <Progress value={marketAnalysis.averageMatchScore} />
          </CardContent>
        </Card>

        {/* Top Job Matches */}
        <Card>
          <CardHeader>
            <CardTitle>Top Job Matches</CardTitle>
            <CardDescription>
              These are the jobs where your skills fit best.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {marketAnalysis.topMatches.map((job: JobMatch) => (
              <div key={job.id} className="my-4">
                <h3 className="font-semibold text-xl">
                  {job.title} at {job.company}
                </h3>
                <p>Location: {job.location}</p>
                <p>Match Score: {job.matchScore}%</p>
                <p>Skills Matched: {job.matchedSkills.join(', ')}</p>
                <p>Skills Missing: {job.missingSkills.join(', ')}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills Demand Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Demand Analysis</CardTitle>
            <CardDescription>
              Most in-demand skills in the market.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marketAnalysis.skillDemand} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis dataKey="percentage" />
                <Tooltip />
                <Bar dataKey="demandCount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EnhancedSkillAnalysisPage;
