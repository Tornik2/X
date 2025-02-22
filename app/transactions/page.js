"use client";

import { useEffect, useState } from "react";
import "./transactions.css"
import Image from 'next/image';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Use environment variable

// Fetch merchants from API



export default function Merchants() {
  

  
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
