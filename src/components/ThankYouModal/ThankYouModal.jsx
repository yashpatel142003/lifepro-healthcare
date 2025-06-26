import React from 'react';
import './ThankYouModal.css';

const ThankYouModal = ({ onClose }) => {
  return (
    <div className="modal-overlay fade-in">
      <div className="modal-content slide-in-top">
        <h2>Thank You for Your Feedback!</h2>
        <p>Your submission has been received. We truly appreciate you taking the time to share your thoughts with us.</p>
        <p>Your feedback is invaluable and helps us continuously improve our products and services.</p>
        <button onClick={onClose}>Close Form</button>
      </div>
    </div>
  );
};

export default ThankYouModal;