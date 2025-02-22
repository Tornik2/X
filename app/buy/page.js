"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Get email from AuthContext
import Image from "next/image";
import "./buy.css";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Hardcoded Products (No API Call)
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    esg_coins_price: 50,
    picture: "https://via.placeholder.com/300x200?text=Wireless+Headphones",
    merchant_id: 1, // Random merchant
  },
  {
    id: 2,
    name: "Smartwatch",
    esg_coins_price: 100,
    picture: "https://via.placeholder.com/300x200?text=Smartwatch",
    merchant_id: 2, // Random merchant
  },
  {
    id: 3,
    name: "Gaming Mouse",
    esg_coins_price: 150,
    picture: "https://via.placeholder.com/300x200?text=Gaming+Mouse",
    merchant_id: 3, // Random merchant
  },
];

export default function Merchant() {
  const { user, refreshUser } = useAuth(); // Get email from AuthContext
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handlePurchase = async (product) => {
    if (!user?.email) {
      setMessage("❌ User email not found. Please log in.");
      return;
    }

    setProcessing(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/internal/transactions/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email, // Use email from useAuth
          merchant_id: product.merchant_id, // Hardcoded merchant ID
          amount: product.esg_coins_price, // Price
        }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Transaction failed");
      }

      setMessage("✅ Purchase successful!");
      await refreshUser(); // Refresh user session
    } catch (error) {
      console.error("Purchase error:", error);
      setMessage("❌ Purchase failed: " + error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="merchant-container">
      <h1 className="merchant-title">Store</h1>
      <p className="merchant-description">
        Buy premium products and enjoy the best quality!
      </p>

      <p className="email-display">🟢 Logged in as: <strong>{user?.email || "No email found"}</strong></p>

      {message && <p className="status-message">{message}</p>}

      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Image
              className="product-image"
              src={product.picture}
              alt={product.name}
              width={300}
              height={200}
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.esg_coins_price}</p>
            <button
              className="purchase-button"
              onClick={() => handlePurchase(product)}
              disabled={processing}
            >
              {processing ? "Processing..." : "Purchase"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
