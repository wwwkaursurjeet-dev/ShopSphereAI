import headphones from "../assets/images/headphones.jpg";
import iphone from "../assets/images/iphone.jpg";
import shoes from "../assets/images/shoes.jpg";
import watch from "../assets/images/watch.jpg";
import tablet from "../assets/images/tablet.jpg";
import bloothspeakers from "../assets/images/bloothspeakers.jpg";
import sneakers from "../assets/images/sneakers.jpg";
import macbook from "../assets/images/Mackbook.jpg";
import marshellspeakers from "../assets/images/Marshellspeakers.jpg";
import sonycamera from "../assets/images/Sonycamera.jpg";
import applemoniter from "../assets/images/Applemoniter.jpg";
import playstation5 from "../assets/images/Playstation5.jpg";

export const products = [
  { id: 1, name: "Wireless Headphones", price: 2999, image: headphones, description: "High quality wireless headphones with noise cancellation and deep bass sound experience.", stock: 5, discount: 50, category: "Electronics" , supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123"},

  { id: 2, name: "iPhone 15 Pro", price: 129999, image: iphone, description: "Latest iPhone with powerful performance, stunning display and pro-level camera system.", stock: 3, category: "Electronics" , supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123"},

  { id: 3, name: "Running Shoes", price: 4999, image: shoes, description: "Lightweight running shoes designed for comfort, durability and performance.", stock: 8, category: "Footwear", supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123" },

  { id: 4, name: "Smart Watch", price: 6999, image: watch, description: "Track your fitness, calls and notifications with this premium smart watch.", stock: 2, discount: 50, category: "Electronics" , supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123"},

  { id: 5, name: "Tablet Pro", price: 24999, image: tablet, description: "High-end tablet for work and entertainment.", stock: 4, category: "Electronics", supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123" },

  { id: 6, name: "Bluetooth Speaker", price: 1999, image: bloothspeakers, description: "Portable Bluetooth speaker with excellent sound quality.", stock: 10, category: "Electronics", supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123" },

  { id: 7, name: "Sneakers", price: 3999, image: sneakers, description: "Comfortable sneakers for daily wear.", stock: 6, category: "Footwear", supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123" },

  { id: 8, name: "Macbook Pro", price: 129999, image: macbook, description: "Powerful laptop for productivity and creativity.", stock: 2, discount: 50, category: "Electronics", supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123" },

  { id: 9, name: "Apple Monitor", price: 89000, image: applemoniter, description: "High-resolution monitor for professional work.", stock: 1, category: "Electronics", supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123" },

  { id: 10, name: "Marshall Speakers", price: 24800, image: marshellspeakers, description: "Premium speakers with crystal-clear sound.", stock: 5, category: "Electronics" , supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123"},

  { id: 11, name: "Sony Camera", price: 46900, image: sonycamera, description: "High-quality camera for photography enthusiasts.", stock: 4, category: "Electronics", supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123" },

  { id: 12, name: "Playstation 5", price: 67900, image: playstation5, description: "Next-gen gaming console with amazing performance.", stock: 0, category: "Gaming", supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123" }
];

export const signatureProducts = [
  { id: 101, name: "Elite Chrono Watch", price: 18999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", stock: 3, category: "Electronics" , supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123"},
  { id: 102, name: "Royal Leather Wallet", price: 7499, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad", stock: 5, category: "Accessories", supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123" },
  { id: 103, name: "Executive Sunglasses", price: 9999, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083", stock: 2, category: "Accessories" , supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123"},
  { id: 104, name: "Luxury Minimal Sneakers", price: 15999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", stock: 4, category: "Footwear", supplier: "ABC Electronics",
    supplierLink: "https://supplier.com/product/123" }
];

// Optional: Category list for homepage sections
export const categories = [
  { name: "Electronics", image: "/images/electronics-banner.jpg" },
  { name: "Footwear", image: "/images/footwear-banner.jpg" },
  { name: "Gaming", image: "/images/gaming-banner.jpg" },
  { name: "Accessories", image: "/images/accessories-banner.jpg" }
];
