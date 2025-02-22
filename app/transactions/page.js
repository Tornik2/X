"use client";

import { useEffect, useState } from "react";
import "./transactions.css"
import Image from 'next/image';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Use environment variable

// Fetch merchants from API



export default function Merchants() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const token = localStorage.getItem("token");
    
            if (!token) {
              console.error("User not authenticated.");
              setError("User not authenticated.");
              setLoading(false);
              return;
            }
    
            const response = await fetch(`${API_URL}/transactions/`, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
    
            if (!response.ok) {
              throw new Error("Failed to fetch transactions");
            }
    
            const data = await response.json();
            console.log("Transactions Data:", data); // ✅ Logs the response
            setTransactions(data);
          } catch (err) {
            console.error("Transactions fetch error:", err);
            setError("Failed to load transactions.");
          } finally {
            setLoading(false);
          }
        };
    
        fetchTransactions();
      }, []);
  
  return (
    <div className="container">
        <div className='max-width'>
            
        <div className='hero'>
            <div className="section-heading">
            Check Your ESG 
            <br/>
             Purchases!
            </div>
            <Image src="/terminal.png" alt="taking care of nature" width={400} height={250} className="caring-image" />
        </div>

      <header className="transactions-header">
        <h1 className="page-title">Transactions</h1>
      </header>

           
      </div>
    </div>
  );
}
