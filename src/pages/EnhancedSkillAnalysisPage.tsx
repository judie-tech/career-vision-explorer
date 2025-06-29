import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { jobMatchingService, MarketAnalysis, JobMatch } from '@/services/job-matching.service';

const EnhancedSkillAnalysisPage: React.FC = () => {
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketAnalysis = async () => {
      setLoading(true);
      const analysis = await jobMatchingService.analyzeJobMarket();
      setMarketAnalysis(analysis);
      setLoading(false);
    };

    fetchMarketAnalysis();
  }, []);

  if (loading || !marketAnalysis) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p>Loading market analysis...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Enhanced Skill Analysis
        </h1>

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
