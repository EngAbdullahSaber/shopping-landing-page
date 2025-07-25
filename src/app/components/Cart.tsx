import { useCart } from "../context/CartContext";
import { FiShoppingCart, FiX, FiPlus, FiMinus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-4 h-fit max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center text-gray-800">
          <motion.div
            animate={{
              rotate: cart.length ? 0 : -10,
              scale: cart.length ? 1 : 1.1,
            }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <FiShoppingCart className="mr-3" size={24} />
          </motion.div>
          <span>
            Your Cart <span className="text-blue-600">({totalItems})</span>
          </span>
        </h2>
        {cart.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#fef2f2" }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded-md transition-colors"
          >
            Clear All
          </motion.button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {cart.length === 0 ? (
          <motion.div
            key="empty-cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center py-8 flex flex-col items-center"
          >
            <FiShoppingCart size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500 text-lg font-medium">
              Your cart is empty
            </p>
            <p className="text-gray-400 mt-1 text-sm">
              Add some items to get started
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="cart-items"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col flex-1 overflow-hidden"
          >
            <div className="overflow-y-auto pr-2 flex-1">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 0.3,
                    }}
                    className="flex justify-between items-center py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 truncate">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center ml-4">
                      <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                        <motion.button
                          whileTap={{ scale: 0.9, backgroundColor: "#f3f4f6" }}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 text-gray-600 hover:text-blue-600 rounded-l-lg transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus size={14} />
                        </motion.button>
                        <motion.span
                          key={`quantity-${item.id}-${item.quantity}`}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                          className="px-2 text-gray-800 font-medium w-6 text-center"
                        >
                          {item.quantity}
                        </motion.span>
                        <motion.button
                          whileTap={{ scale: 0.9, backgroundColor: "#f3f4f6" }}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 text-gray-600 hover:text-blue-600 rounded-r-lg transition-colors"
                        >
                          <FiPlus size={14} />
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#fef2f2" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="ml-3 p-2 text-red-500 hover:text-red-700 rounded-lg transition-colors"
                      >
                        <FiX size={16} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              layout
              transition={{ duration: 0.2 }}
              className="border-t border-gray-200 pt-4 mt-4"
            >
              <motion.div
                layout
                className="flex justify-between items-center mb-3"
              >
                <span className="text-gray-600">Subtotal:</span>
                <motion.span
                  key={`total-${totalPrice}`}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  className="text-lg font-bold text-gray-800"
                >
                  ${totalPrice.toFixed(2)}
                </motion.span>
              </motion.div>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>Shipping:</span>
                <span>Calculated at checkout</span>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                <Link href={"/checkout"}>Proceed to Checkout</Link>{" "}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
