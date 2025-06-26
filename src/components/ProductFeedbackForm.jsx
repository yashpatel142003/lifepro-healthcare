import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/ProductFeedbackForm.css';
import logo from '../image/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    position: '',
    department: '',
    feedbackPurpose: '',
    howHeard: '',
    feedbackType: '',
    feedback: '',
    rating: '',
    recommend: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required.';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required.';
        else {
          const emailRegex = /^\S+@\S+\.\S+$/;
          if (!emailRegex.test(value)) error = 'Invalid email format.';
        }
        break;
      case 'phone':
        if (value && !/^\d{10}$/.test(value)) error = 'Phone number should be 10 digits.';
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    ['name', 'email', 'phone'].forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please correct errors before submitting.');
      return;
    }

    const feedbackList = JSON.parse(localStorage.getItem('lifepro-feedbacks')) || [];
    feedbackList.push(formData);
    localStorage.setItem('lifepro-feedbacks', JSON.stringify(feedbackList));

    // Redirect to the ThankYouPage after successful submission
    navigate('/thank-you');
  };

  return (
    <div className="feedback-container">
      <img src={logo} alt="Life Pro Healthcare" className="logo" />
      <h1 className="main-heading">We Value Your Feedback</h1>
      <p className="sub-heading">
        Your opinion helps us deliver better healthcare. Please take a moment to share your thoughts.
      </p>

      <form onSubmit={handleSubmit} className="form" noValidate>

        <fieldset>
          <legend>Personal Information</legend>

          <label htmlFor="name" className="required">Name:
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              aria-describedby="name-error"
              aria-invalid={!!errors.name}
            />
          </label>
          {errors.name && <span id="name-error" className="error">{errors.name}</span>}

          <label htmlFor="email" className="required">Email:
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              aria-describedby="email-error"
              aria-invalid={!!errors.email}
            />
          </label>
          {errors.email && <span id="email-error" className="error">{errors.email}</span>}

          <label htmlFor="phone">Phone Number:
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit number e.g. 1234567890"
              aria-describedby="phone-error"
              aria-invalid={!!errors.phone}
            />
          </label>
          {errors.phone && <span id="phone-error" className="error">{errors.phone}</span>}

          <label htmlFor="companyName">Company Name:
            <input
              id="companyName"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your company (optional)"
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Feedback Details</legend>

          <label htmlFor="feedbackPurpose">Purpose of Feedback:
            <select
              id="feedbackPurpose"
              name="feedbackPurpose"
              value={formData.feedbackPurpose}
              onChange={handleChange}
            >
              <option value="" disabled>Select an option</option>
              <option value="General">General</option>
              <option value="Product Inquiry">Product Inquiry</option>
              <option value="Service Issue">Service Issue</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label htmlFor="howHeard">How did you hear about us?
            <select
              id="howHeard"
              name="howHeard"
              value={formData.howHeard}
              onChange={handleChange}
            >
              <option value="" disabled>Select an option</option>
              <option value="Google Search">Google Search</option>
              <option value="Referral">Referral</option>
              <option value="Social Media">Social Media</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label htmlFor="feedbackType">Feedback Type:
            <select
              id="feedbackType"
              name="feedbackType"
              value={formData.feedbackType}
              onChange={handleChange}
            >
              <option value="" disabled>Select an option</option>
              <option value="Product">Product</option>
              <option value="Service">Service</option>
              <option value="Website">Website</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label htmlFor="feedback">Your Feedback:
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Please share your thoughts..."
              aria-describedby="feedback-error"
              aria-invalid={!!errors.feedback}
              minLength={10}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Rating & Recommendation</legend>

          <label htmlFor="rating">Rate Us:
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value="" disabled>Select an option</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </label>

          <label className="radio-label">Would you recommend us?</label>
          <div className="radio-group" role="radiogroup" aria-labelledby="recommend-label">
            <label>
              <input
                type="radio"
                name="recommend"
                value="Yes"
                checked={formData.recommend === 'Yes'}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="recommend"
                value="No"
                checked={formData.recommend === 'No'}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </fieldset>

        <button type="submit" aria-label="Submit feedback form">Submit Feedback</button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default FeedbackForm;