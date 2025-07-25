"use client";
import { useState, useEffect, useCallback } from "react";
import { products } from "../utils/products";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Filter from "../components/Filter";
import Cart from "../components/Cart";
import { Product } from "../types/types";
import { motion } from "framer-motion";
import { ShoppingBag, Package, Filter as FilterIcon } from "lucide-react";

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    category: "",
  });

  const filterProducts = useCallback(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result = result.filter(
      (product) =>
        product.price >= priceRange.minPrice &&
        product.price <= priceRange.maxPrice
    );

    if (priceRange.category) {
      result = result.filter(
        (product) => product.category === priceRange.category
      );
    }

    setFilteredProducts(result);
  }, [
    searchQuery,
    priceRange.minPrice,
    priceRange.maxPrice,
    priceRange.category,
  ]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilter = useCallback(
    ({
      minPrice,
      maxPrice,
      category,
    }: {
      minPrice: number;
      maxPrice: number;
      category: string;
    }) => {
      setPriceRange({ minPrice, maxPrice, category });
    },
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center justify-center mb-4"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full mr-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Premium Store
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Discover our curated collection of premium products with
              unbeatable quality and style
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Section */}
          <div className="flex-1">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="w-full max-w-2xl mx-auto">
                <Search onSearch={handleSearch} />
              </div>
            </motion.div>

            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between mb-6 px-2"
            >
              <div className="flex items-center">
                <Package className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-700 font-medium">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "Product" : "Products"} Found
                </span>
                {(searchQuery || priceRange.category) && (
                  <span className="ml-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    Filters Applied
                  </span>
                )}
              </div>
            </motion.div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  We couldn't find any products matching your search criteria.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchQuery("");
                    setPriceRange({
                      minPrice: 0,
                      maxPrice: Infinity,
                      category: "",
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
                >
                  Clear All Filters
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 * index,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Sidebar with Filter and Cart */}
          <div className="lg:w-80 xl:w-96 space-y-6">
            {/* Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200"
            >
              <Filter onFilter={handleFilter} />
            </motion.div>

            {/* Cart Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Cart />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
