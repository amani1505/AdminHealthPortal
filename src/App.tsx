
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProvidersPage from "./pages/ProvidersPage";
import PatientsPage from "./pages/PatientsPage";
import AdministratorsPage from "./pages/AdministratorsPage";
import CommissionsPage from "./pages/CommissionsPage";
import PaymentsPage from "./pages/PaymentsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ServicesPage from "./pages/ServicesPage";
import ReviewsPage from "./pages/ReviewsPage";
import CommunicationsPage from "./pages/CommunicationsPage";
import ReportsPage from "./pages/ReportsPage";
import HealthPage from "./pages/HealthPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="providers" element={<ProvidersPage />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="admins" element={<AdministratorsPage />} />
            <Route path="commissions" element={<CommissionsPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="communications" element={<CommunicationsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="health" element={<HealthPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
