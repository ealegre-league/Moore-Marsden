import React, { useState } from 'react';
import { ArrowLeft, Send, Phone, Mail, Clock } from 'lucide-react';

interface ContactFormProps {
  setShowResults: (show: boolean) => void;
  inputData: {
    Date_of_Marriage_Debt: number;
    Date_of_Separation_Debt: number;
    Date_of_Division_Fair_Market_Value: number;
    Date_of_Marriage_Fair_Market_Value: number;
    Date_of_Separation_Fair_Market_Value: number;
    Date_of_Acquisition_Fair_Market_Value: number;
    Date_of_Acquisition_Debt: number;
    Date_of_Division_Debt: number;
    Improvements_Date_of_Separation_Date_of_Marriage: number;
    Improvements_Date_of_Marriage_Date_of_Acquisition: number;
    Improvements_Date_of_Division_Date_of_Separation: number;
    DOD: number;
    Equity: number;
    IMP: number;
    Market: number;
    TitleChange: number;
    Refinanced: number;
  };
}

export function ContactForm({ setShowResults, inputData }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare webhook data with all calculation variables plus contact info
    const webhookData = {
      // Contact form data
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      
      // All calculation variables (same as calculator results)
      Date_of_Marriage_Debt: inputData.Date_of_Marriage_Debt,
      Date_of_Separation_Debt: inputData.Date_of_Separation_Debt,
      Date_of_Division_Fair_Market_Value: inputData.Date_of_Division_Fair_Market_Value,
      Date_of_Marriage_Fair_Market_Value: inputData.Date_of_Marriage_Fair_Market_Value,
      Date_of_Separation_Fair_Market_Value: inputData.Date_of_Separation_Fair_Market_Value,
      Date_of_Acquisition_Fair_Market_Value: inputData.Date_of_Acquisition_Fair_Market_Value,
      Date_of_Acquisition_Debt: inputData.Date_of_Acquisition_Debt,
      Date_of_Division_Debt: inputData.Date_of_Division_Debt,
      Improvements_Date_of_Separation_Date_of_Marriage: inputData.Improvements_Date_of_Separation_Date_of_Marriage,
      Improvements_Date_of_Marriage_Date_of_Acquisition: inputData.Improvements_Date_of_Marriage_Date_of_Acquisition,
      Improvements_Date_of_Division_Date_of_Separation: inputData.Improvements_Date_of_Division_Date_of_Separation,
      DOD: inputData.DOD,
      Equity: inputData.Equity,
      IMP: inputData.IMP,
      Market: inputData.Market,
      
      // Title and Refinance values as requested
      Title: inputData.TitleChange,
      Refinance: inputData.Refinanced,
      
      // Flag to indicate this came from contact form
      requiresAdditionalHelp: true
    };

    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/mlLo3TtKFpzOel22E23J/webhook-trigger/e8e6341f-df23-432e-926d-00d191042c2b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      if (response.ok) {
        console.log('Contact form submitted successfully:', webhookData);
        setIsSubmitted(true);
      } else {
        console.error('Failed to submit contact form');
        // Handle error - you might want to show an error message to the user
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // Handle error - you might want to show an error message to the user
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#051B47] mb-2">Thank You!</h2>
          <p className="text-gray-600">
            We've received your information and will contact you within 24 hours to discuss your property division case.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-[#051B47] mb-2">What happens next?</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Our team will review your case details</li>
            <li>• We'll prepare a customized analysis approach</li>
            <li>• You'll receive a call to discuss next steps</li>
          </ul>
        </div>

        <button
          onClick={() => setShowResults(false)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff743d] transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Start New Calculation
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-xl border border-gray-100 p-8">
      <div className="mb-8">
        <button
          onClick={() => setShowResults(false)}
          className="inline-flex items-center text-sm text-gray-600 hover:text-[#ff743d] transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Form
        </button>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-amber-800 mb-1">Additional Analysis Required</h3>
              <p className="text-sm text-amber-700">
                Based on your responses, your property division case requires specialized analysis that goes beyond our standard calculator. 
                Our expert team will need to review the title changes and/or refinancing details to provide accurate calculations.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-[#051B47] mb-3">Get Expert Assistance</h2>
        <p className="text-gray-600 text-lg mb-8">
          Please provide your contact information below, and our team will reach out to help you with your property division analysis.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="mt-1 border block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] px-4 py-3 text-gray-900 placeholder-gray-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 border block w-full pl-12 rounded-lg border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] px-4 py-3 text-gray-900 placeholder-gray-500"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="mt-1 border block w-full pl-12 rounded-lg border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] px-4 py-3 text-gray-900 placeholder-gray-500"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Details (Optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 border block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] px-4 py-3 text-gray-900 placeholder-gray-500"
            placeholder="Please provide any additional details about your property situation that might help our team prepare for your consultation..."
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-[#051B47] mb-3">What to expect:</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Response within 24 hours</li>
            <li>• Free initial consultation</li>
            <li>• Customized analysis for your specific situation</li>
            <li>• Expert guidance on complex property division matters</li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-[#ff743d] hover:bg-[#e6653a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff743d] transition-all duration-200 transform hover:scale-[1.02]"
        >
          <Send className="mr-2 h-5 w-5" />
          Request Expert Analysis
        </button>
      </form>
    </div>
  );
}