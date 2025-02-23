"use client";

import { useEffect, useState } from "react";
import "./merchant.css";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext"
import Modal from "../../components/Modal/Modal"

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Merchant() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // For success/error messages
  const [processing, setProcessing] = useState(false); // Prevent multiple clicks

  const params = useParams(); // Get URL parameters
  const id = params.merchant; // Extract merchant ID

  const { refreshUser } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/merchants/${id}/products`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const merchantName = products[0]?.merchant_name || "Merchant";

  // ✅ Purchase function (POST request to API)
  const handlePurchase = async (productId) => {
    setProcessing(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("❌ User not authenticated.");
        setProcessing(false);
        return;
      }

      const response = await fetch(`${API_URL}/purchases/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: productId, // Send product ID in request
        }),
      });

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
console.log(id === "4")
  return (
    
    <div className="max-width">
      {id === "4" ? (
          <div className="merchant-container">
          <h1 className="merchant-title">YourBanK Products</h1>
          <p className="merchant-description">
          Do Good with YourBanK.  Collect ESGC and Help Nature grow! Plant a tree or help animal shelter.
          </p>
  
          <h2 className="merchandise-title">Merchandise</h2>
  
          
        <Modal message={message} onClose={() => setMessage("")} />
  
            <div className="products-list">
              
                <div className="product-card">
                  <Image
                    className="product-image"
                    src={"/tree.jpg"}
                    alt={"plant a tree"}
                    width={300}
                    height={180}
                  />
                  <h3 className="product-name">Plant a tree</h3>
                  <p className="product-price">5 ESGC</p>
                  <button
                    className="purchase-button"
                    onClick={() => {
                      setMessage("✅ You have planted a tree!")
                    }}
                    disabled={processing}
                  >
                    {processing ? "Processing..." : "Purchase"}
                  </button>
                </div>
                <div className="product-card">
                  <Image
                    className="product-image"
                    src={"/animal.jpg"}
                    alt={"feed an animal"}
                    width={300}
                    height={180}
                  />
                  <h3 className="product-name">Feed an animal</h3>
                  <p className="product-price">5 ESGC</p>
                  <button
                    className="purchase-button"
                    onClick={() => {
                      setProcessing(true)
                      setMessage("✅ Now you've helped a cute animal!")
                      setProcessing(false)
                    }}
                    disabled={processing}
                  >
                    {processing ? "Processing..." : "Purchase"}
                  </button>
                </div>
              
            </div>
          
        </div>
        ) :  (<div className="merchant-container">
        <h1 className="merchant-title">{merchantName} Products</h1>
        <p className="merchant-description">
          {merchantName} produces chargers with recycled materials. Collect ESGC and buy merchandise with your hard-earned coins!
        </p>

        <h2 className="merchandise-title">Merchandise</h2>

        {loading && <p className="loading-message">Loading products...</p>}
        {error && <p className="error-message">{error}</p>}
      <Modal message={message} onClose={() => setMessage("")} />

        {!loading && !error && products.length > 0 ? (
          <div className="products-list">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <Image
                  className="product-image"
                  src={product.picture}
                  alt={product.name}
                  width={300}
                  height={180}
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.esg_coins_price} ESGC</p>
                <button
                  className="purchase-button"
                  onClick={() => handlePurchase(product.id)}


                  disabled={processing}
                >
                  {processing ? "Processing..." : "Purchase"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="no-products">No products available.</p>
        )}
      </div>)}

        



    </div>
  );
}
