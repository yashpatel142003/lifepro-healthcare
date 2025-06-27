import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfettiExplosion from 'react-confetti-explosion';

import '../css/ProductFeedbackForm.css';
import logo from '../image/logo.png';
import StepWelcome from './StepWelcome';
import StepAboutYou from './StepAboutYou';
import StepProductFeedback from './StepProductFeedback';
import StepCompanyFeedback from './StepCompanyFeedback';
import StepServiceWebsite from './StepServiceWebsite';
import StepAdditionalFeedback from './StepAdditionalFeedback';
import ThankYouModal from './ThankYouModal/ThankYouModal';

const ProductFeedbackForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    customerStatus: '',
    customerDuration: '',

    howHeard: '',
    productInterest: '',
    productSatisfaction: 0,
    favoriteFeatures: '',
    productRecommendation: '',

    npsScore: 0,
    companyOverallSatisfaction: '',
    brandStatements: {
      innovative: false,
      reliable: false,
      customerCentric: false,
      trustworthy: false,
    },

    customerServiceUsed: '',
    customerServiceRating: 0,
    websiteEaseOfUse: 0,
    websiteImprovements: '',

    generalComments: '',
    contactForFollowUp: '',
    followUpEmail: '',
  });

  const [errors, setErrors] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const API_BASE_URL = 'http://localhost:8080/api/feedback'; // Commented for localStorage mode

  const validateStep = (step) => {
    let newErrors = {};
    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.email.trim()) newErrors.email = 'Email is required.';
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format.';
        if (formData.phone && !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number should be 10 digits.';
        if (!formData.customerStatus) newErrors.customerStatus = 'Please select your customer status.';
        break;
      case 2:
        if (!formData.productInterest) newErrors.productInterest = 'Please select a product.';
        if (formData.productSatisfaction === 0) newErrors.productSatisfaction = 'Please rate your product satisfaction.';
        if (!formData.productRecommendation) newErrors.productRecommendation = 'Please select if you would recommend the product.';
        break;
      case 3:
        if (formData.npsScore === 0) newErrors.npsScore = 'Please provide a Net Promoter Score (0-10).';
        if (!formData.companyOverallSatisfaction) newErrors.companyOverallSatisfaction = 'Please rate overall company satisfaction.';
        break;
      case 4:
        if (formData.customerServiceUsed === 'Yes' && formData.customerServiceRating === 0) {
          newErrors.customerServiceRating = 'Please rate your customer service experience.';
        }
        if (formData.websiteEaseOfUse === 0) newErrors.websiteEaseOfUse = 'Please rate website ease of use.';
        break;
      case 5:
        if (formData.contactForFollowUp === 'Yes' && (!formData.followUpEmail.trim() || !/^\S+@\S+\.\S+$/.test(formData.followUpEmail))) {
          newErrors.followUpEmail = 'Email is required for follow-up and must be valid.';
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    if (!isValid) toast.error('Please correct errors before proceeding.');
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name.startsWith('brandStatements.')) {
      const statementKey = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        brandStatements: {
          ...prev.brandStatements,
          [statementKey]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleRatingChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      try {
        const storedFeedbacks = JSON.parse(localStorage.getItem('lifepro-feedbacks')) || [];
        storedFeedbacks.push(formData);
        localStorage.setItem('lifepro-feedbacks', JSON.stringify(storedFeedbacks));

        toast.success('Feedback saved locally!');
        setShowConfetti(true);
        setTimeout(() => setShowModal(true), 500);
      } catch (err) {
        console.error('Error storing feedback locally:', err);
        toast.error('Failed to save feedback. Try again.');
      }
    }
  };

  const closeModalAndNavigate = () => {
    setShowModal(false);
    setShowConfetti(false);
    navigate('/thank-you');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepWelcome onNext={handleNext} />;
      case 1:
        return <StepAboutYou formData={formData} handleChange={handleChange} errors={errors} onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <StepProductFeedback formData={formData} handleChange={handleChange} handleRatingChange={handleRatingChange} errors={errors} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <StepCompanyFeedback formData={formData} handleChange={handleChange} handleRatingChange={handleRatingChange} errors={errors} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <StepServiceWebsite formData={formData} handleChange={handleChange} handleRatingChange={handleRatingChange} errors={errors} onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <StepAdditionalFeedback formData={formData} handleChange={handleChange} errors={errors} onSubmit={handleSubmit} onBack={handleBack} />;
      default:
        return <StepWelcome onNext={handleNext} />;
    }
  };

  const totalSteps = 6;

  return (
    <div className="feedback-container">
      {showConfetti && <ConfettiExplosion duration={3000} particleCount={200} force={0.8} />}
      <img src={logo} alt="Life Pro Healthcare" className="logo" />
      <h1 className="main-heading">We Value Your Feedback</h1>
      <p className="sub-heading">Your opinion helps us deliver better healthcare. Please take a moment to share your thoughts.</p>

      {currentStep > 0 && currentStep < totalSteps && (
        <div className="form-progress">
          Step {currentStep} of {totalSteps - 1}
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((currentStep - 1) / (totalSteps - 2)) * 100}%` }}></div>
          </div>
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()} noValidate>
        {renderStep()}
      </form>

      {showModal && <ThankYouModal onClose={closeModalAndNavigate} />}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ProductFeedbackForm;
