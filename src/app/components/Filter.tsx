import { useEffect, useState } from "react";
import { categories } from "../utils/products";
import { motion } from "framer-motion";
import { Filter as FilterIcon, DollarSign, Tag } from "lucide-react";

interface FilterProps {
  onFilter: (filters: {
    minPrice: number;
    maxPrice: number;
    category: string;
  }) => void;
}

export default function Filter({ onFilter }: FilterProps) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const priceRange = {
      minPrice: minPrice ? parseFloat(minPrice) : 0,
      maxPrice: maxPrice ? parseFloat(maxPrice) : Infinity,
      category: category === "all" ? "" : category,
    };
    onFilter(priceRange);
  }, [minPrice, maxPrice, category, onFilter]);

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setCategory("all");
  };

  const hasActiveFilters = minPrice || maxPrice || category !== "all";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-700">
          <FilterIcon className="w-5 h-5 mr-2 text-blue-600" />
          <span className="font-semibold">Filters</span>
        </div>
        {hasActiveFilters && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
          >
            Clear All
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Range Filter */}
        <motion.div whileHover={{ scale: 1.01 }} className="space-y-3">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <DollarSign className="w-4 h-4 mr-1 text-green-600" />
            Price Range
          </label>
          <div className="flex items-center space-x-3">
            <div className="relative flex-1">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
                min="0"
                step="1"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">
                $
              </span>
            </div>
            <div className="flex-shrink-0 w-8 h-px bg-gray-300"></div>
            <div className="relative flex-1">
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
                min="0"
                step="1"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">
                $
              </span>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div whileHover={{ scale: 1.01 }} className="space-y-3">
          <label
            htmlFor="category"
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <Tag className="w-4 h-4 mr-1 text-purple-600" />
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white cursor-pointer transition-all"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) =>
                cat ? (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ) : null
              )}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
