import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import {
  copilotModes,
  instructionsData,
  customAgentsData,
} from "../data/documentation";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const allDocs = [...copilotModes, ...instructionsData, ...customAgentsData];

  const fuse = new Fuse(allDocs, {
    keys: ["title", "description", "content"],
    threshold: 0.3,
    includeScore: true,
  });

  useEffect(() => {
    if (query.length > 1) {
      const searchResults = fuse.search(query);
      setResults(searchResults.slice(0, 5));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (item: any) => {
    const doc = item.item;

    // Map doc ID to route
    let route = "/";
    if (copilotModes.find((m) => m.id === doc.id)) {
      route = `/modes/${doc.id}`;
    } else if (instructionsData.find((i) => i.id === doc.id)) {
      route = `/instructions/${doc.id}`;
    } else if (customAgentsData.find((c) => c.id === doc.id)) {
      route = `/custom-agents`;
    }

    navigate(route);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher dans la documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
        />
      </div>

      {isOpen && results.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => handleSelect(result)}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 border-b border-gray-200 dark:border-slate-700 last:border-b-0 transition-colors"
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {result.item.title}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {result.item.description}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
