"use client";

import { useEffect, useState } from "react";

import Image from 'next/image';
import Link from 'next/link';
import './merchants.css';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Use environment variable

// Fetch merchants from API
async function fetchMerchants(token) {
  try {
    const response = await fetch(`${API_URL}/merchants`, {
      method: "GET",
      headers: {
        "Authorization": token ? `Bearer ${token}` : "", // Pass Bearer token
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch merchants");

    return await response.json();
  } catch (error) {
    console.error("Error fetching merchants:", error);
    return []; // Return empty array if request fails
  }
}


export default function Merchants() {
  const [merchants, setMerchants] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const fetchedMerchants = await fetchMerchants(token);
        setMerchants(fetchedMerchants);
      } catch (err) {
        setError("Failed to load merchants.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(merchants)
  return (
    <div className="container">
        <div className='max-width'>
            
        <div className='hero'>
            <div className="section-heading">
            Welcome to ESG 
            <br/>
             merchants!
            </div>
            <Image src="/caring.png" alt="taking care of nature" width={400} height={250} className="caring-image" />
        </div>

      <header className="merchants-header">
        <h1 className="page-title">Merchants</h1>
        <p className="subtitle">Explore exciting merchandise offered by our partnered stores  , offering environmentally clean items! Be part of shaping a better future!</p>
      </header>

            {/* Merchants section*/}
      <section className="merchants-list">
        {merchants.map((merchant) => (
          <div key={merchant.id} className="merchant-card">
            <div className="merchant-info">
              <h2 className="merchant-name">{merchant.name}</h2>
              <div className="merchant-value">
                <p>ESG: Environment</p>
                <p>1 GEL = {merchant.esg_value_ratio} ESGC</p>
              </div>
              <p className='sub-title'>About This Merchant</p>
              <p className="merchant-about">{merchant.description}</p>
              <Link className="visit-button" href={`merchants/${merchant.name}`}>View Merchandise</Link>
            </div>
          </div>
        ))}
      </section>
      </div>
    </div>
  );
}
