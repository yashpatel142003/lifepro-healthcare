import React from 'react';

const StepAboutYou = ({ formData, handleChange, errors, onNext }) => { // onBack not needed for first step
  return (
    <div className="form-step slide-in">
      <fieldset>
        <legend>About You</legend>

        <label htmlFor="name" className="required">
          Name:
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

        <label htmlFor="email" className="required">
          Email:
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

        <label htmlFor="phone">
          Phone:
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit phone number (optional)"
            aria-describedby="phone-error"
            aria-invalid={!!errors.phone}
          />
        </label>
        {errors.phone && <span id="phone-error" className="error">{errors.phone}</span>}

        <label htmlFor="companyName">
          Company Name:
          <input
            id="companyName"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Your company (optional)"
          />
        </label>

        <label htmlFor="customerStatus" className="required">
          Are you a new or returning customer?
          <select
            id="customerStatus"
            name="customerStatus"
            value={formData.customerStatus}
            onChange={handleChange}
            aria-describedby="customerStatus-error"
            aria-invalid={!!errors.customerStatus}
          >
            <option value="">Select an option</option>
            <option value="New">New Customer</option>
            <option value="Returning">Returning Customer</option>
          </select>
        </label>
        {errors.customerStatus && <span id="customerStatus-error" className="error">{errors.customerStatus}</span>}

        {formData.customerStatus === 'Returning' && (
            <label htmlFor="customerDuration">
                How long have you been a Lifepro Healthcare customer?
                <input
                    id="customerDuration"
                    type="text"
                    name="customerDuration"
                    value={formData.customerDuration}
                    onChange={handleChange}
                    placeholder="e.g., 1-2 years, >5 years"
                />
            </label>
        )}

      </fieldset>
      <div className="form-navigation">
        <button type="button" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default StepAboutYou;