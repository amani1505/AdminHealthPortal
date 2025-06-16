
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { UserManagementSection } from "@/components/dashboard/sections/UserManagementSection";
import { FinancialSection } from "@/components/dashboard/sections/FinancialSection";
import { ContentModerationSection } from "@/components/dashboard/sections/ContentModerationSection";

const Dashboard = () => {
  return (
    <>
      <StatsOverview />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <UserManagementSection />
        <FinancialSection />
      </div>
      <ContentModerationSection />
    </>
  );
};

export default Dashboard;
