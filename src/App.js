import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductFeedbackForm from '../src/components/ProductFeedbackForm';
import ThankYouPage from '../src/components/ThankYouPage'; // Your simple thank you page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductFeedbackForm />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;