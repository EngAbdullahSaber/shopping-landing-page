import { Product } from "../types/types";

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 249.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    description:
      "Noise-cancelling wireless headphones with 30-hour battery life",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 299.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    description: "Advanced smartwatch with ECG and blood oxygen monitoring",
  },
  {
    id: 3,
    name: "Performance Running Shoes",
    price: 129.99,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    description: "Lightweight running shoes with responsive cushioning",
  },
  {
    id: 4,
    name: "Espresso Machine",
    price: 199.99,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    description: "Professional-grade espresso machine with milk frother",
  },
  {
    id: 5,
    name: "Travel Backpack",
    price: 89.99,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    description: "Weather-resistant backpack with USB charging port",
  },
  {
    id: 6,
    name: "Advanced Fitness Tracker",
    price: 99.99,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    description: "Waterproof fitness tracker with heart rate monitoring",
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: 79.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    description: "Portable speaker with 20-hour playtime",
  },
  {
    id: 8,
    name: "Yoga Mat",
    price: 49.99,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    description: "Eco-friendly non-slip yoga mat with carrying strap",
  },
  {
    id: 9,
    name: "Air Fryer",
    price: 129.99,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    description: "Digital air fryer with 8 cooking presets",
  },
  {
    id: 10,
    name: "Leather Wallet",
    price: 59.99,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    description: "Genuine leather wallet with RFID protection",
  },
  {
    id: 11,
    name: "4K Camera",
    price: 599.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    description: "Professional 4K camera with 24-105mm lens",
  },
  {
    id: 12,
    name: "Smart Scale",
    price: 49.99,
    category: "Health",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    description: "Bluetooth smart scale that tracks 12 body metrics",
  },
];

export const categories = [
  ...new Set(products.map((product) => product.category)),
];
