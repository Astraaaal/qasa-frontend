import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  Package,
  Wallet,
  User,
  Home,
  HelpCircle,
  ChevronDown,
  LogOut,
  Settings,
  Menu,
  X,
  Sun,
  SunMoon,
  Moon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import qasaLogo from '../assets/qASA-logo.png';
import { ThemeContext } from "../context/ThemeContext";

interface NavItemProps {
  label: string;
  path: string;
  isActive?: boolean;
}


const NavItem = ({ label, path, isActive = false }: NavItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={path}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
              isActive
                ? "bg-[#1C61A1] text-white"
                : "text-[#20476E] hover:bg-[#F0F0F0]",
            )}
          >
            <span className="font-sans text-sm">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const TopNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "/login";
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Financial Summary",
      path: "/financial-summary",
    },
    {
      label: "Sales Performance",
      path: "/sales-performance",
    },
    {
      label: "Procurement",
      path: "/procurement",
    },
    {
      label: "Inventory",
      path: "/inventory",
    },
    {
      label: "Cash Flow",
      path: "/cash-flow",
    }
  ];

  return (
    <div className="w-full bg-white border-b border-[#DCDCDC]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2">
              <img src={qasaLogo} alt="Custom Logo" className="h-6 w-6" />
              <h1 className="text-xl font-bold text-[#20476E] font-sans">
                qASA
              </h1>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-[#20476E]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Links - hidden on mobile, shown on desktop */}
          <div className="hidden md:flex md:ml-8 space-x-1">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                label={item.label}
                path={item.path}
                isActive={currentPath === item.path}
              />
            ))}
          </div>

          {/* User Profile Dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2"
                >
                  <span className="text-sm font-medium text-gray-700">
                    Michael Angelo Gonzales
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 !bg-white !backdrop-blur-none shadow-md border border-gray-200">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                <button
                  onClick={() => console.log('Toggle Help')} // replace with your help toggle function
                  className="flex items-center w-full text-left hover:text-[#0078D7]"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </button>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem /*asChild*/>
                <button
                  onClick={toggleTheme}
                  className="flex items-center w-full text-left hover:text-[#0078D7]"
                >
                  {theme === "dark" ? <Sun className="mr-2 h-4 w-4"/> : <Moon className="mr-2 h-4 w-4"/>}
                  <span>Theme</span>
                </button>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem /*asChild*/>
                <button
                  onClick={() => {
                    const confirmed = window.confirm("Are you sure you want to log out?");
                    if (confirmed) {
                      localStorage.removeItem("loggedIn");
                      window.location.href = "/login";
                    }
                  }}
                  className="flex items-center w-full text-left hover:text-[#FF0000]"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation - shown when menu is open */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 bg-white border-t border-[#DCDCDC]">
            <div className="flex flex-col space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                    currentPath === item.path
                      ? "bg-[#1C61A1] text-white"
                      : "text-[#20476E] hover:bg-[#F0F0F0]",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="font-sans text-sm">{item.label}</span>
                </Link>
              ))}

              <div className="flex items-center justify-between px-3 py-2 mt-2 border-t border-[#DCDCDC]">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Michael Angelo Gonzales
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Horizontal scrollable navigation for tablets/small screens */}
        <div className="md:hidden overflow-x-auto py-2 scrollbar-hide">
          <div className="flex space-x-1 min-w-max">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                label={item.label}
                path={item.path}
                isActive={currentPath === item.path}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;