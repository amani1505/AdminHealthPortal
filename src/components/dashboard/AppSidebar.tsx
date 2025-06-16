
import { useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  DollarSign,
  Shield,
  Settings,
  Home,
  FileText,
  BarChart,
  Bell,
  Activity,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const navigationItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    title: "User Management",
    icon: Users,
    items: [
      { title: "Providers", path: "/dashboard/providers" },
      { title: "Patients", path: "/dashboard/patients" },
      { title: "Administrators", path: "/dashboard/admins" },
    ],
  },
  {
    title: "Financial Operations",
    icon: DollarSign,
    items: [
      { title: "Commission Tracking", path: "/dashboard/commissions" },
      { title: "Payment Operations", path: "/dashboard/payments" },
      { title: "Financial Analytics", path: "/dashboard/analytics" },
    ],
  },
  {
    title: "Content Moderation",
    icon: Shield,
    items: [
      { title: "Service Listings", path: "/dashboard/services" },
      { title: "Reviews & Ratings", path: "/dashboard/reviews" },
      { title: "Communications", path: "/dashboard/communications" },
    ],
  },
  {
    title: "Reports",
    path: "/dashboard/reports",
    icon: BarChart,
  },
  {
    title: "System Health",
    path: "/dashboard/health",
    icon: Activity,
  },
  {
    title: "Notifications",
    path: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<string[]>(["User Management"]);

  const toggleItem = (title: string) => {
    setOpenItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const handleNavigation = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  return (
    <Sidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-sm">
      <SidebarHeader className="p-3 sm:p-4 lg:p-6 border-b border-slate-200/60">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <Shield className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-slate-900 text-sm lg:text-base truncate">HealthNexus</h2>
            <p className="text-xs text-slate-500 truncate">Admin Portal</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2 sm:p-3 lg:p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible open={openItems.includes(item.title)} onOpenChange={() => toggleItem(item.title)}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="w-full justify-between hover:bg-slate-100 data-[state=open]:bg-slate-50 text-sm"
                        >
                          <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
                            <item.icon className="w-4 h-4 shrink-0" />
                            <span className="font-medium text-slate-700 truncate">{item.title}</span>
                          </div>
                          {openItems.includes(item.title) ? (
                            <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 shrink-0 text-slate-400" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1">
                        <div className="ml-3 sm:ml-4 lg:ml-7 space-y-1 mt-1">
                          {item.items.map((subItem) => (
                            <SidebarMenuButton
                              key={subItem.title}
                              onClick={() => handleNavigation(subItem.path)}
                              className={`w-full justify-start text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 pl-2 lg:pl-3 py-2 rounded-md transition-colors cursor-pointer ${
                                location.pathname === subItem.path 
                                  ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800' 
                                  : ''
                              }`}
                            >
                              <span className="truncate">{subItem.title}</span>
                            </SidebarMenuButton>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full justify-start hover:bg-slate-100 transition-colors text-sm cursor-pointer ${
                        location.pathname === item.path 
                          ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800' 
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
                        <item.icon className="w-4 h-4 shrink-0" />
                        <span className="font-medium truncate">{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-2 sm:p-3 lg:p-4 border-t border-slate-200/60">
        <div className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-lg bg-slate-50">
          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-white">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">Admin User</p>
            <p className="text-xs text-slate-500 truncate">admin@healthnexus.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
