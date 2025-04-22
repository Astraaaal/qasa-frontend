import React from "react";
import { Outlet } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import { Button } from "../ui/button";
import RefreshButton from "../dashboard/RefreshButton";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps = {}) => {
  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
      {/* Top Navigation */}
      <TopNavigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Secondary Header */}
        <header className="h-14 bg-white border-b border-[#DCDCDC] flex items-center px-4 justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-[#20476E]">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <RefreshButton/>
            <div className="bg-[#F0F0F0] px-3 py-1 rounded-md text-sm text-[#20476E]">
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-[#F0F0F0]">
          {children || <Outlet />}
        </main>

        {/* Footer */}
        <footer className="h-10 bg-white border-t border-[#DCDCDC] flex items-center justify-between px-6">
          <div className="text-xs text-gray-500">
            © 2025 qASA QTECHBSI. All rights reserved.
          </div>
          <div className="text-xs text-gray-500">Version UI</div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
