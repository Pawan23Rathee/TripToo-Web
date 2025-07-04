// src/data/mockOrders.js

const mockOrders = [
  {
    id: "ORD001",
    date: "2025-06-28",
    total: 159.00,
    status: "Delivered",
    items: [
      { productId: "prod1", name: "Tripel Kits (Green)", quantity: 1, price: 159.00, image: "/assets/product-1-main.png" },
    ],
  },
  {
    id: "ORD002",
    date: "2025-06-20",
    total: 458.00,
    status: "Processing",
    items: [
      { productId: "prod3", name: "Travel Kits (Snltist)", quantity: 1, price: 299.00, image: "/assets/product-3-main.png" },
      { productId: "prod4", name: "Travel Kits (Bripass)", quantity: 1, price: 159.00, image: "/assets/product-4-main.png" },
    ],
  },
  {
    id: "ORD003",
    date: "2025-06-15",
    total: 328.00,
    status: "Shipped",
    items: [
      { productId: "prod2", name: "Tripel Kits (Black)", quantity: 2, price: 164.00, image: "/assets/product-2-main.png" },
    ],
  },
  {
    id: "ORD004",
    date: "2025-06-01",
    total: 29.00,
    status: "Delivered",
    items: [
      { productId: "prod5", name: "Student Study Kit", quantity: 1, price: 29.00, image: "/assets/product-5-main.png" },
    ],
  },
];

export default mockOrders;