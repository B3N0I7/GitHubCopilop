import React from "react";
import { Menu, Moon, Sun, Github } from "lucide-react";
import SearchBar from "./SearchBar";

interface HeaderProps {
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          <div className="flex items-center gap-2">
            <Github className="w-6 h-6 text-gray-900 dark:text-white" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              GitHub Copilot Docs By Lafouine
            </h1>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <SearchBar />
        </div>

        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
