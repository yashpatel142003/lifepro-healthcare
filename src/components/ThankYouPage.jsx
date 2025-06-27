import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../image/logo.png'; // Make sure the path to your logo is correct
import '../css/ProductFeedbackForm.css'; // Re-use the CSS for consistent styling

const ThankYouPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirects to the homepage or your feedback form's base path
    }, 15000); // 15000 milliseconds = 15 seconds

    // Cleanup the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, [navigate]); // Dependency array: re-run effect if navigate function changes (unlikely)

  return (
    <div className="thank-you-container">
      <img src={logo} alt="Life Pro Healthcare" className="logo" />
      <h1>Thank You for Your Feedback!</h1>
      <p>
        We greatly appreciate you taking the time to share your thoughts with us.
        Your input is invaluable as we strive to improve our products and services.
      </p>
      <p>
        You will be redirected to the feedback form page shortly.
      </p>
      <button onClick={() => navigate('/')} className="back-home-button">
        Go to Feedback Form Now
      </button>
    </div>
  );
};

export default ThankYouPage;