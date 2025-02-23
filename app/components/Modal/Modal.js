"use client";

import "./Modal.css"; // ✅ Add styles

export default function Modal({ message, onClose }) {
  if (!message) return null; // ✅ Don't show modal if message is empty

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}<button className="modal-close-button" onClick={onClose}>OK</button></p>
        
      </div>
    </div>
  );
}
