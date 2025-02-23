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
            const lastFivetransactions = data.slice(0, 5);
            setTransactions(lastFivetransactions);
          } catch (err) {
            console.error("Transactions fetch error:", err);
            setError("Failed to load transactions.");
          } finally {
            setLoading(false);
          }
        };
    
        fetchTransactions();
      }, []);
  
      //format date
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0]; 
      };

  return (
    <div className="container">
        <div className='max-width transactions-flex'>
            
        <div className='hero-transactions'>
            <div className="section-heading">
            Check Your ESG 
            <br/>
             Purchases!
            </div>
            <Image src="/terminal.png" alt="taking care of nature" width={400} height={250} className="caring-image" />
        </div>
<div className="bottom-half">
      <header className="transactions-header">
        <h1 className="page-title">Transactions</h1>
      </header>

    {/* ✅ Transactions List */}
    <div className="transactions-list">
          <h3 className="transactions-title">Purchases</h3>

          {loading && <p className="loading-message">Loading transactions...</p>}
          {error && <p className="error-message">{error}</p>}

          {!loading && !error && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <span className="transaction-date">{formatDate(transaction.transaction_date)}</span>
                <span className="transaction-merchant">Merchant {transaction.merchant}</span>
                <span className="transaction-amount">{transaction.amount} GEL</span>
                <span className="transaction-esg">{transaction.earned_esg_coins} ESGC</span>
              </div>
            ))
          ) : (
            !loading && <p className="no-transactions">No transactions available.</p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
