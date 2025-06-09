import React from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  Package,
  Wallet,
  User,
  Home,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive?: boolean;
}

const NavItem = ({ icon, label, path, isActive = false }: NavItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
              isActive
                ? "bg-[#1C61A1] text-white"
                : "text-[#20476E] hover:bg-[#F0F0F0]",
            )}
          >
            <div className="w-5 h-5">{icon}</div>
            <span className="font-sans">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      icon: <Home size={20} />,
      label: "Financial Summary",
      path: "/",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Sales Performance",
      path: "/sales",
    },
    {
      icon: <ShoppingCart size={20} />,
      label: "Procurement",
      path: "/procurement",
    },
    {
      icon: <Package size={20} />,
      label: "Inventory",
      path: "/inventory",
    },
    {
      icon: <Wallet size={20} />,
      label: "Cash Flow",
      path: "/cash-flow",
    },
    {
      icon: <User size={20} />,
      label: "Account",
      path: "/account",
    },
  ];

  return (
    <div className="w-[250px] h-full bg-white border-r border-[#DCDCDC] flex flex-col">
      {/* Logo Section */}
      <div className="p-4 border-b border-[#DCDCDC] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <DollarSign size={24} className="text-[#0078D7]" />
          <h1 className="text-xl font-bold text-[#20476E] font-sans">
            AccuFinance
          </h1>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={currentPath === item.path}
          />
        ))}
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-[#DCDCDC]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0078D7] flex items-center justify-center text-white">
            <span className="text-sm font-bold">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-[#20476E]">John Doe</p>
            <p className="text-xs text-gray-500">Financial Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;