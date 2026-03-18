import { Link } from "react-router";
import { Bell, Search, Sun, Moon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { useProfileStore } from "../store/useProfileStore";
import { useConsultantProfileStore } from "../store/useConsultantProfileStore";
import { useAdminProfileStore } from "../store/useAdminProfileStore";

interface TopBarProps {
  userRole?: "founder" | "consultant" | "admin";
}

export function TopBar({ userRole = "founder" }: TopBarProps) {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const founderName = useProfileStore((state) => state.formData.fullName);
  const consultantName = useConsultantProfileStore((state) => state.formData.fullName);
  const adminName = useAdminProfileStore((state) => state.formData.fullName);

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const userProfiles = {
    founder: {
      name: founderName || "Startup Founder",
      role: "Startup Founder",
      initials: getInitials(founderName || "Startup Founder"),
      profileLink: "/profile",
    },
    consultant: {
      name: consultantName || "Financial Consultant",
      role: "Financial Consultant",
      initials: getInitials(consultantName || "Financial Consultant"),
      profileLink: "/consultant/profile",
    },
    admin: {
      name: adminName || "Platform Admin",
      role: "Admin",
      initials: getInitials(adminName || "Platform Admin"),
      profileLink: "/admin/profile",
    },
  };

  const user = userProfiles[userRole];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-4 lg:ml-0 transition-colors">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-50 dark:bg-gray-800 dark:text-white"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 ml-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <Link to={user.profileLink} className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{user.role}</div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
              {user.initials}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}