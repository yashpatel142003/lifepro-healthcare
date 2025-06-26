import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ThankYouPage.css'; // Create a simple CSS for this if needed
import logo from '../image/logo.png';

const ThankYouPage = () => {
  return (
    <div className="thank-you-container">
      <img src={logo} alt="Life Pro Healthcare" className="logo" />
      <h1>Thank You!</h1>
      <p>Your feedback has been successfully submitted. We appreciate your valuable insights and look forward to improving our services based on your suggestions.</p>
      <p>If you have any further questions or require assistance, please don't hesitate to contact us.</p>
      <Link to="/" className="back-home-button">Go back to Home</Link>
    </div>
  );
};

export default ThankYouPage;