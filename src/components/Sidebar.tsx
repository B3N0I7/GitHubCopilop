import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Layers,
  FileText,
  Bot,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { navigation } from "../data/documentation";

interface SidebarProps {
  isOpen: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Layers,
  FileText,
  Bot,
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([
    "/modes",
    "/instructions",
  ]);

  const toggleExpand = (path: string) => {
    setExpandedItems((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } overflow-y-auto`}
    >
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon ? iconMap[item.icon] : null;
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.path);
          const active = isActive(item.path);

          return (
            <div key={item.path}>
              <div
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  active
                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                }`}
              >
                <Link to={item.path} className="flex items-center gap-3 flex-1">
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="font-medium">{item.title}</span>
                </Link>

                {hasChildren && (
                  <button
                    onClick={() => toggleExpand(item.path)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              {hasChildren && isExpanded && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children!.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        location.pathname === child.path
                          ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
