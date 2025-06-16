
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useInsights } from "@/hooks/use-insights-provider";
import { InsightsProvider } from "@/hooks/use-insights-provider";
import InsightsHero from "@/components/insights/InsightsHero";
import InsightsFilters from "@/components/insights/InsightsFilters";
import InsightsTabsContent from "@/components/insights/InsightsTabsContent";

const InsightsContent = () => {
  const [industry, setIndustry] = useState("all-industries");
  const [region, setRegion] = useState("all-regions");
  
  const {
    marketData,
    industryInsights,
    regionalData,
    salaryByRoleData,
    jobTrendData,
    skillDemandData,
  } = useInsights();

  // Filter data based on selected filters
  const filteredIndustryInsights = industry === "all-industries" 
    ? industryInsights 
    : industryInsights.filter(insight => 
        insight.industry.toLowerCase().includes(industry.replace('-', ' '))
      );

  const filteredRegionalData = region === "all-regions"
    ? regionalData
    : regionalData.filter(data =>
        data.region.toLowerCase().includes(region.replace('-', ' '))
      );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-12">
          <InsightsHero />
          
          <InsightsFilters
            industry={industry}
            region={region}
            setIndustry={setIndustry}
            setRegion={setRegion}
          />

          <InsightsTabsContent
            marketData={marketData}
            salaryByRoleData={salaryByRoleData}
            jobTrendData={jobTrendData}
            skillDemandData={skillDemandData}
            filteredIndustryInsights={filteredIndustryInsights}
            filteredRegionalData={filteredRegionalData}
          />
        </div>
      </div>
    </Layout>
  );
};

const Insights = () => {
  return (
    <InsightsProvider>
      <InsightsContent />
    </InsightsProvider>
  );
};

export default Insights;
