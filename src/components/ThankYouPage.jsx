import React from 'react';
import { Link } from 'react-router-dom'; 
import '../css/ThankYouPage.css'; 

const ThankYouPage = () => {
  return (
    <div className="thank-you-container">
      <h1>Thank You for Your Feedback!</h1>
      <p>We appreciate you taking the time to share your thoughts with us.</p>
      <p>Your input is invaluable as we strive to improve our services.</p>
      <Link to="/" className="back-home-button">Go back to the feedback form</Link>
    </div>
  );
};

export default ThankYouPage;