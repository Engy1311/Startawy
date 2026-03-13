import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  TrendingUp,
  MessageSquare,
  FileText,
  Calendar,
  User,
  MessageCircle,
  LogOut,
  BarChart3,
  Users,
  DollarSign,
  Clock,
  Target,
  Package,
  UserCheck,
  Receipt,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import logoImage from "@/assets/69567af9ba0ecce1dfd02dd8c710a5e15af2845c.png";

interface SidebarProps {
  userRole?: "founder" | "consultant" | "admin";
}

export function Sidebar({ userRole = "founder" }: SidebarProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const founderMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: TrendingUp, label: "Budget Analysis", path: "/budget-analysis" },
    { icon: MessageSquare, label: "StartBot", path: "/ai-chatbot" },
    { icon: FileText, label: "Startawy Library", path: "/startawy-library" },
    { icon: Calendar, label: "Book Consultant", path: "/book-consultant" },
    { icon: BarChart3, label: "My Sessions", path: "/my-sessions" },
    { icon: Package, label: "My Startawy Plan", path: "/my-plan" },
    { icon: Receipt, label: "My Payments", path: "/my-payments" },
    { icon: MessageCircle, label: "Feedback", path: "/feedback" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const consultantMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/consultant/dashboard" },
    { icon: Calendar, label: "My Sessions", path: "/consultant/sessions" },
    { icon: Users, label: "My Clients", path: "/consultant/clients" },
    { icon: DollarSign, label: "My Earnings", path: "/consultant/earnings" },
    { icon: Target, label: "Recommendations", path: "/consultant/recommendations" },
    { icon: FileText, label: "Follow-Up Plans", path: "/consultant/follow-up-plans" },
    { icon: Clock, label: "Availability Schedule", path: "/consultant/availability" },
    { icon: User, label: "Profile", path: "/consultant/profile" },
  ];

  const adminMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: UserCheck, label: "Manage Founders", path: "/admin/founders" },
    { icon: Users, label: "Manage Consultants", path: "/admin/consultants" },
    { icon: Package, label: "Manage Packages", path: "/admin/packages" },
    { icon: MessageCircle, label: "Review Feedback", path: "/admin/feedback" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: User, label: "Profile", path: "/admin/profile" },
  ];

  const menuItems =
    userRole === "consultant" ? consultantMenuItems :
      userRole === "admin" ? adminMenuItems :
        founderMenuItems;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        {isMobileOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 min-h-screen flex flex-col
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className={`p-6 border-b border-gray-200 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
          {!isCollapsed && (
            <Link to={userRole === "consultant" ? "/consultant/dashboard" : userRole === "admin" ? "/admin/dashboard" : "/dashboard"} className="flex items-center gap-3">
              <img src={logoImage} alt="Startawy" className="h-8 object-contain mix-blend-multiply dark:mix-blend-normal dark:brightness-0 dark:invert" />
            </Link>
          )}
          {isCollapsed && (
            <Link to={userRole === "consultant" ? "/consultant/dashboard" : userRole === "admin" ? "/admin/dashboard" : "/dashboard"} className="flex items-center justify-center">
              <img src={logoImage} alt="Startawy" className="h-8 w-8 object-contain mix-blend-multiply dark:mix-blend-normal dark:brightness-0 dark:invert" />
            </Link>
          )}
          {/* Collapse Button - Desktop Only */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                      } ${isCollapsed ? "justify-center" : ""}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <Link
            to="/login"
            className={`flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors ${isCollapsed ? "justify-center" : ""
              }`}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}