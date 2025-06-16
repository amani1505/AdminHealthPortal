
import { useState } from "react";
import { StatsOverview } from "./StatsOverview";
import { UserManagementSection } from "./sections/UserManagementSection";
import { FinancialSection } from "./sections/FinancialSection";
import { ContentModerationSection } from "./sections/ContentModerationSection";
import { ProvidersSection } from "./sections/ProvidersSection";
import { PatientsSection } from "./sections/PatientsSection";
import { AdministratorsSection } from "./sections/AdministratorsSection";
import { CommissionTrackingSection } from "./sections/CommissionTrackingSection";
import { PaymentOperationsSection } from "./sections/PaymentOperationsSection";
import { FinancialAnalyticsSection } from "./sections/FinancialAnalyticsSection";
import { ServiceListingsSection } from "./sections/ServiceListingsSection";
import { ReviewsRatingsSection } from "./sections/ReviewsRatingsSection";
import { CommunicationsSection } from "./sections/CommunicationsSection";
import { ReportsSection } from "./sections/ReportsSection";
import { SettingsSection } from "./sections/SettingsSection";

// Create a context to share the active section between components
import { createContext } from "react";

interface DashboardContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const DashboardContext = createContext<DashboardContextType>({
  activeSection: "dashboard",
  setActiveSection: () => {}
});

export function DashboardContent() {
  const [activeSection, setActiveSection] = useState("dashboard");

  console.log("Current active section:", activeSection); // Debug log

  const renderContent = () => {
    console.log("Rendering content for section:", activeSection); // Debug log
    
    switch (activeSection) {
      case "dashboard":
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
      case "providers":
        return <ProvidersSection />;
      case "patients":
        return <PatientsSection />;
      case "admins":
        return <AdministratorsSection />;
      case "commissions":
        return <CommissionTrackingSection />;
      case "payments":
        return <PaymentOperationsSection />;
      case "analytics":
        return <FinancialAnalyticsSection />;
      case "services":
        return <ServiceListingsSection />;
      case "reviews":
        return <ReviewsRatingsSection />;
      case "communications":
        return <CommunicationsSection />;
      case "reports":
        return <ReportsSection />;
      case "health":
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">System Health</h2>
              <p className="text-slate-600">This section is under development.</p>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Notifications</h2>
              <p className="text-slate-600">This section is under development.</p>
            </div>
          </div>
        );
      case "settings":
        return <SettingsSection />;
      default:
        console.log("Unknown section:", activeSection); // Debug log
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </h2>
              <p className="text-slate-600">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardContext.Provider value={{ activeSection, setActiveSection }}>
      <div className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 lg:space-y-8 overflow-auto">
        {renderContent()}
      </div>
    </DashboardContext.Provider>
  );
}
