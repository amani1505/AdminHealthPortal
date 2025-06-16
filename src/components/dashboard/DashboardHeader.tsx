
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  return (
    <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
          <SidebarTrigger className="text-slate-600 hover:text-slate-900 shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 truncate">Dashboard</h1>
            <p className="text-xs sm:text-sm text-slate-500 truncate hidden xs:block">Healthcare Administration Portal</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 shrink-0">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search users, transactions..."
              className="pl-10 w-48 lg:w-80 bg-white border-slate-200 text-sm"
            />
          </div>
          
          <Button variant="ghost" size="sm" className="relative shrink-0 w-8 h-8 sm:w-9 sm:h-9">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full text-[9px] sm:text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Button variant="ghost" size="sm" className="shrink-0 w-8 h-8 sm:w-9 sm:h-9">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
