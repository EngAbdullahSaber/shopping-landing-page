import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full">
      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 4px 20px rgba(59, 130, 246, 0.15)"
            : "0 1px 3px rgba(0, 0, 0, 0.05)",
          borderColor: isFocused ? "#3B82F6" : "#E5E7EB",
        }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-12 pr-12 py-4 text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none text-base"
        />

        <motion.div
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
          animate={{
            color: isFocused ? "#3B82F6" : "#9CA3AF",
          }}
          transition={{ duration: 0.2 }}
        >
          <SearchIcon className="h-5 w-5" />
        </motion.div>

        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#FEF2F2",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-red-500 rounded-full transition-colors duration-200"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
