
import Layout from "@/components/layout/Layout";
import { SettingsHeader } from "@/components/jobseeker/settings/SettingsHeader";
import { SettingsTabs } from "@/components/jobseeker/settings/SettingsTabs";

const JobSeekerSettings = () => {
  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto">
        <SettingsHeader />
        <SettingsTabs />
      </div>
    </Layout>
  );
};

export default JobSeekerSettings;
