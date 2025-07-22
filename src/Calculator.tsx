import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

type CalculatorProps = {
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
  };
  setShowResults: (show: boolean) => void;
};

export function Calculator({ inputData, setShowResults }: CalculatorProps) {
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // All calculations exactly as provided
  const Community_Property_Principal_Reduction = inputData.Date_of_Marriage_Debt - inputData.Date_of_Separation_Debt;
  let Apportionable_Appreciation;
  if (inputData.DOD === 1) {
    Apportionable_Appreciation = inputData.Date_of_Division_Fair_Market_Value - inputData.Date_of_Marriage_Fair_Market_Value;
  } else {
    Apportionable_Appreciation = inputData.Date_of_Separation_Fair_Market_Value - inputData.Date_of_Marriage_Fair_Market_Value;
  }

  const Community_Property_Per_Appreciation = (inputData.Date_of_Marriage_Debt - inputData.Date_of_Separation_Debt) / inputData.Date_of_Acquisition_Fair_Market_Value;
  const Community_Property_Appreciation = Apportionable_Appreciation * Community_Property_Per_Appreciation;
  const Total_Equity = inputData.Date_of_Separation_Fair_Market_Value - inputData.Date_of_Separation_Debt;
  const Community_Property_Interest = Community_Property_Principal_Reduction + Community_Property_Appreciation;
  const Separation_Interest = Total_Equity - Community_Property_Interest;
  let Total_Interest = Community_Property_Interest + Separation_Interest

  const Date_of_Acquisition_Equity = inputData.Date_of_Acquisition_Fair_Market_Value - inputData.Date_of_Acquisition_Debt;
  const Date_of_Marriage_Equity = inputData.Date_of_Marriage_Fair_Market_Value - inputData.Date_of_Marriage_Debt;
  const Date_of_Separation_Equity = inputData.Date_of_Separation_Fair_Market_Value - inputData.Date_of_Separation_Debt;
  const Date_of_Division_Equity = inputData.Date_of_Division_Fair_Market_Value - inputData.Date_of_Division_Debt;

  const Date_of_Marriage_Fair_Market_Value_Date_of_Acquisition_Fair_Market_Value_Appreciation = inputData.Date_of_Marriage_Fair_Market_Value - inputData.Date_of_Acquisition_Fair_Market_Value;
  const Date_of_Separation_Fair_Market_Value_Date_of_Marriage_Fair_Market_Value_Appreciation = inputData.Date_of_Separation_Fair_Market_Value - inputData.Date_of_Marriage_Fair_Market_Value;
  const Date_of_Division_Fair_Market_Value_Date_of_Separation_Fair_Market_Value_Appreciation = inputData.Date_of_Division_Fair_Market_Value - inputData.Date_of_Separation_Fair_Market_Value;

  const Date_of_Marriage_Debt_Date_of_Acquisition_Debt_Principal_Reduction = -(inputData.Date_of_Marriage_Debt - inputData.Date_of_Acquisition_Debt);
  const Date_of_Separation_Debt_Date_of_Marriage_Debt_Principal_Reduction = -(inputData.Date_of_Separation_Debt - inputData.Date_of_Marriage_Debt);
  const Date_of_Division_Debt_Date_of_Separation_Debt_Principal_Reduction = -(inputData.Date_of_Division_Debt - inputData.Date_of_Separation_Debt);

  const Total_Percentage_Appreciation = 1;
  let Community_Property_Percentage_Appreciation = Date_of_Separation_Debt_Date_of_Marriage_Debt_Principal_Reduction / inputData.Date_of_Acquisition_Fair_Market_Value;
  let Separation_Property_Percentage_Appreciation = 1 - (Date_of_Separation_Debt_Date_of_Marriage_Debt_Principal_Reduction / inputData.Date_of_Acquisition_Fair_Market_Value);

  const Separation_Principal_Reduction = Date_of_Marriage_Debt_Date_of_Acquisition_Debt_Principal_Reduction + Date_of_Division_Debt_Date_of_Separation_Debt_Principal_Reduction;
  const Community_Principal_Reduction = Date_of_Separation_Debt_Date_of_Marriage_Debt_Principal_Reduction;

  const Pre_Marital_Appreciation_Total = Date_of_Marriage_Fair_Market_Value_Date_of_Acquisition_Fair_Market_Value_Appreciation - inputData.Improvements_Date_of_Marriage_Date_of_Acquisition;
  let Apportionable_Appreciation_Total = inputData.Date_of_Division_Fair_Market_Value - inputData.Date_of_Marriage_Fair_Market_Value;
  const Appreciation_Total = Pre_Marital_Appreciation_Total + Apportionable_Appreciation_Total;

  const Pre_Marital_Appreciation_Separation = Date_of_Marriage_Fair_Market_Value_Date_of_Acquisition_Fair_Market_Value_Appreciation - inputData.Improvements_Date_of_Marriage_Date_of_Acquisition;
  let Apportionable_Appreciation_Separation = Apportionable_Appreciation_Total * Separation_Property_Percentage_Appreciation;
  let Appreciation_Separation = Pre_Marital_Appreciation_Separation + Apportionable_Appreciation_Separation;

  const Pre_Marital_Appreciation_Community = 0;
  let Apportionable_Appreciation_Community = Apportionable_Appreciation_Total * Community_Property_Percentage_Appreciation;
  let Appreciation_Community = Pre_Marital_Appreciation_Community + Apportionable_Appreciation_Community;

  const Improvements_Community = inputData.Improvements_Date_of_Separation_Date_of_Marriage;
  const Improvements_Separation = inputData.Improvements_Date_of_Marriage_Date_of_Acquisition + inputData.Improvements_Date_of_Division_Date_of_Separation;
  const Improvements_Total = Improvements_Community + Improvements_Separation;

  const Down_Payment_Total = Date_of_Acquisition_Equity;
  const Principal_Reduction_Total = inputData.Date_of_Acquisition_Debt - inputData.Date_of_Division_Debt;
  let Interest_Total;
  if (inputData.IMP === 1) {
    Interest_Total = Down_Payment_Total + Principal_Reduction_Total + Improvements_Total + inputData.Date_of_Division_Debt;
  } else {
    Interest_Total = Down_Payment_Total + Principal_Reduction_Total + Appreciation_Total;
  }

  const Down_Payment_Separation = Down_Payment_Total;
  const Principal_Reduction_Separation = Separation_Principal_Reduction;
  let Interest_Separation;
  if (inputData.IMP === 1) {
    Interest_Separation = Down_Payment_Separation + Principal_Reduction_Separation + inputData.Date_of_Division_Debt + Improvements_Separation;
  } else {
    Interest_Separation = Down_Payment_Separation + Principal_Reduction_Separation + Appreciation_Separation;
  }

  const Down_Payment_Community = 0;
  const Principal_Reduction_Community = Community_Principal_Reduction;
  let Interest_Community;
  if (inputData.IMP === 1) {
    Interest_Community = Down_Payment_Community + Principal_Reduction_Community + Improvements_Community + (inputData.Date_of_Division_Debt - inputData.Date_of_Division_Debt);
  } else {
    Interest_Community = Down_Payment_Community + Principal_Reduction_Community + Appreciation_Community;
  }

  if (inputData.IMP === 1) {
    Community_Property_Percentage_Appreciation = Math.round((Interest_Community / Interest_Total) * 1000000) / 1000000;
    Separation_Property_Percentage_Appreciation = Math.round((Interest_Separation / Interest_Total) * 1000000) / 1000000;
    
    Apportionable_Appreciation_Separation = Apportionable_Appreciation_Total * Separation_Property_Percentage_Appreciation;
    Apportionable_Appreciation_Community = Apportionable_Appreciation_Total * Community_Property_Percentage_Appreciation;
    
    Appreciation_Separation = Pre_Marital_Appreciation_Separation + Apportionable_Appreciation_Separation;
    Appreciation_Community = Pre_Marital_Appreciation_Community + Apportionable_Appreciation_Community;
  }

  let Less_Apportionable_Appreciation_Total = Pre_Marital_Appreciation_Total + Apportionable_Appreciation_Total + -(Improvements_Total);
  let Less_Apportionable_Appreciation_Separation = Pre_Marital_Appreciation_Separation + Apportionable_Appreciation_Separation + -(Improvements_Separation);
  let Less_Apportionable_Appreciation_Community = Pre_Marital_Appreciation_Community + Apportionable_Appreciation_Community + -(Improvements_Community);

  let Interest_Total_2 = Down_Payment_Total + Principal_Reduction_Total + Improvements_Total + Less_Apportionable_Appreciation_Total;
  let Interest_Separation_2 = Down_Payment_Separation + Principal_Reduction_Separation + Improvements_Separation + Less_Apportionable_Appreciation_Separation;
  let Interest_Community_2 = Down_Payment_Community + Principal_Reduction_Community + Improvements_Community + Less_Apportionable_Appreciation_Community;

  let Total_Property_Percentage_Appreciation_2 = Interest_Total_2 / Interest_Total_2;
  let Separation_Property_Percentage_Appreciation_2 = Interest_Separation_2 / Interest_Total_2;
  let Community_Property_Percentage_Appreciation_2 = Interest_Community_2 / Interest_Total_2;

  const Totals_Appreciation = Date_of_Marriage_Fair_Market_Value_Date_of_Acquisition_Fair_Market_Value_Appreciation + 
    Date_of_Separation_Fair_Market_Value_Date_of_Marriage_Fair_Market_Value_Appreciation + 
    Date_of_Division_Fair_Market_Value_Date_of_Separation_Fair_Market_Value_Appreciation;
  
  const Totals_Improvements = inputData.Improvements_Date_of_Marriage_Date_of_Acquisition + 
    inputData.Improvements_Date_of_Separation_Date_of_Marriage + 
    inputData.Improvements_Date_of_Division_Date_of_Separation;
  
  const Less_Improvements = -(Totals_Improvements);
  const Market_Appreciation = Totals_Appreciation + Less_Improvements;
  const Less_Premarital_Appreciation = -(Date_of_Marriage_Fair_Market_Value_Date_of_Acquisition_Fair_Market_Value_Appreciation) + inputData.Improvements_Date_of_Marriage_Date_of_Acquisition;
  const Apportionable_Appreciation_Apportionable_Appreciation = Market_Appreciation + Less_Premarital_Appreciation;

  const Total_Purchase_Price_Total = Down_Payment_Total + Principal_Reduction_Total + inputData.Date_of_Division_Debt;
  const Apportionable_Appreciation_Calculation_Total = Total_Purchase_Price_Total + Totals_Improvements;
  const Apportionable_Appreciation_Calculation_Percentage_Total = Total_Purchase_Price_Total / Total_Purchase_Price_Total;

  const Total_Purchase_Price_Separation = Date_of_Acquisition_Equity + Principal_Reduction_Separation + inputData.Date_of_Division_Debt;
  const Apportionable_Appreciation_Calculation_Separation = Total_Purchase_Price_Separation + Improvements_Separation;
  const Apportionable_Appreciation_Calculation_Percentage_Separation = Apportionable_Appreciation_Calculation_Separation / Apportionable_Appreciation_Calculation_Total;

  const Total_Purchase_Price_Community = 0 + Principal_Reduction_Community + (inputData.Date_of_Division_Debt - inputData.Date_of_Division_Debt);
  const Apportionable_Appreciation_Calculation_Community = Total_Purchase_Price_Community + Improvements_Community;
  const Apportionable_Appreciation_Calculation_Percentage_Community = Apportionable_Appreciation_Calculation_Community / Apportionable_Appreciation_Calculation_Total;

  // Additional variables for the new tables
  const Purchase_Price_Debt_Total = inputData.Date_of_Division_Debt;
  const Purchase_Price_Debt_Separation = inputData.Date_of_Division_Debt;
  const Purchase_Price_Debt_Community = inputData.Date_of_Division_Debt - inputData.Date_of_Division_Debt;

  const Less_Appreciation_Due_to_Improvements_Total = -(Improvements_Total);
  const Less_Appreciation_Due_to_Improvements_Separation = -(Improvements_Separation);
  const Less_Appreciation_Due_to_Improvements_Community = -(Improvements_Community);

  let Market_Appreciation_Total;
  let Market_Appreciation_Separation;
  let Market_Appreciation_Community;

  if (inputData.Market === 1) {
    Apportionable_Appreciation_Total = Apportionable_Appreciation_Apportionable_Appreciation;
    Apportionable_Appreciation_Separation = Apportionable_Appreciation_Total * Apportionable_Appreciation_Calculation_Percentage_Separation;
    Apportionable_Appreciation_Community = Apportionable_Appreciation_Total * Apportionable_Appreciation_Calculation_Percentage_Community;

    Market_Appreciation_Total = Pre_Marital_Appreciation_Total + Apportionable_Appreciation_Total;
    Market_Appreciation_Separation = Pre_Marital_Appreciation_Separation + Apportionable_Appreciation_Separation;
    Market_Appreciation_Community = Pre_Marital_Appreciation_Community + Apportionable_Appreciation_Community;

    Less_Apportionable_Appreciation_Total = Market_Appreciation_Total + Improvements_Total;
    Less_Apportionable_Appreciation_Separation = Market_Appreciation_Separation + Improvements_Separation;
    Less_Apportionable_Appreciation_Community = Market_Appreciation_Community + Improvements_Community;

    Interest_Total_2 = Down_Payment_Total + Principal_Reduction_Total + Less_Apportionable_Appreciation_Total;
    Interest_Separation_2 = Down_Payment_Separation + Principal_Reduction_Separation + Less_Apportionable_Appreciation_Separation;
    Interest_Community_2 = Down_Payment_Community + Principal_Reduction_Community + Less_Apportionable_Appreciation_Community;

    Total_Property_Percentage_Appreciation_2 = Interest_Total_2 / Interest_Total_2;
    Separation_Property_Percentage_Appreciation_2 = Interest_Separation_2 / Interest_Total_2;
    Community_Property_Percentage_Appreciation_2 = Interest_Community_2 / Interest_Total_2;
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatPercentage = (value: number) => {
    return (value * 100).toFixed(2) + '%';
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Prepare all calculation data to send to webhook
      const webhookData = {
        // Contact form data
        fullName: contactForm.fullName,
        email: contactForm.email,
        phone: contactForm.phone,
        message: contactForm.message,
        
        // Input data
        inputData: inputData,
        
        // All calculated values
        calculatedResults: {
          Community_Property_Principal_Reduction,
          Apportionable_Appreciation,
          Community_Property_Per_Appreciation,
          Community_Property_Appreciation,
          Total_Equity,
          Community_Property_Interest,
          Separation_Interest,
          Total_Interest,
          Date_of_Acquisition_Equity,
          Date_of_Marriage_Equity,
          Date_of_Separation_Equity,
          Date_of_Division_Equity,
          Date_of_Marriage_Fair_Market_Value_Date_of_Acquisition_Fair_Market_Value_Appreciation,
          Date_of_Separation_Fair_Market_Value_Date_of_Marriage_Fair_Market_Value_Appreciation,
          Date_of_Division_Fair_Market_Value_Date_of_Separation_Fair_Market_Value_Appreciation,
          Date_of_Marriage_Debt_Date_of_Acquisition_Debt_Principal_Reduction,
          Date_of_Separation_Debt_Date_of_Marriage_Debt_Principal_Reduction,
          Date_of_Division_Debt_Date_of_Separation_Debt_Principal_Reduction,
          Total_Percentage_Appreciation,
          Community_Property_Percentage_Appreciation,
          Separation_Property_Percentage_Appreciation,
          Separation_Principal_Reduction,
          Community_Principal_Reduction,
          Pre_Marital_Appreciation_Total,
          Apportionable_Appreciation_Total,
          Appreciation_Total,
          Pre_Marital_Appreciation_Separation,
          Apportionable_Appreciation_Separation,
          Appreciation_Separation,
          Pre_Marital_Appreciation_Community,
          Apportionable_Appreciation_Community,
          Appreciation_Community,
          Improvements_Community,
          Improvements_Separation,
          Improvements_Total,
          Down_Payment_Total,
          Principal_Reduction_Total,
          Interest_Total,
          Down_Payment_Separation,
          Principal_Reduction_Separation,
          Interest_Separation,
          Down_Payment_Community,
          Principal_Reduction_Community,
          Interest_Community,
          Less_Apportionable_Appreciation_Total,
          Less_Apportionable_Appreciation_Separation,
          Less_Apportionable_Appreciation_Community,
          Interest_Total_2,
          Interest_Separation_2,
          Interest_Community_2,
          Total_Property_Percentage_Appreciation_2,
          Separation_Property_Percentage_Appreciation_2,
          Community_Property_Percentage_Appreciation_2,
          Totals_Appreciation,
          Totals_Improvements,
          Less_Improvements,
          Market_Appreciation,
          Less_Premarital_Appreciation,
          Apportionable_Appreciation_Apportionable_Appreciation,
          Total_Purchase_Price_Total,
          Apportionable_Appreciation_Calculation_Total,
          Apportionable_Appreciation_Calculation_Percentage_Total,
          Total_Purchase_Price_Separation,
          Apportionable_Appreciation_Calculation_Separation,
          Apportionable_Appreciation_Calculation_Percentage_Separation,
          Total_Purchase_Price_Community,
          Apportionable_Appreciation_Calculation_Community,
          Apportionable_Appreciation_Calculation_Percentage_Community,
          Market_Appreciation_Total,
          Market_Appreciation_Separation,
          Market_Appreciation_Community
        }
      };

      const response = await fetch('https://services.leadconnectorhq.com/hooks/mlLo3TtKFpzOel22E23J/webhook-trigger/e8e6341f-df23-432e-926d-00d191042c2b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        setSubmitMessage('Thank you! Your request has been submitted successfully. We will contact you soon with your detailed analysis.');
        setContactForm({ fullName: '', email: '', phone: '', message: '' });
      } else {
        setSubmitMessage('There was an error submitting your request. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine which scenario to display
  const isScenario1 = inputData.DOD === 0; // DD=No
  const isScenario2 = inputData.DOD === 1 && inputData.Equity === 0; // DD=Yes, Equity=No
  const isScenario3 = inputData.DOD === 1 && inputData.Equity === 1 && inputData.IMP === 0 && inputData.Market === 0; // DD=Yes, Equity=Yes, IMP=No, Market=No
  const isScenario4 = inputData.DOD === 1 && inputData.Equity === 1 && inputData.IMP === 1 && inputData.Market === 0; // DD=Yes, Equity=Yes, IMP=Yes, Market=No
  // const isScenario5 = inputData.DOD === 1 && inputData.Equity === 1 && inputData.IMP === 1 && inputData.Market === 1; // DD=Yes, Equity=Yes, IMP=Yes, Market=Yes

  const isScenario5 =
  (inputData.DOD === 1 && inputData.Equity === 1 && inputData.IMP === 1 && inputData.Market === 1) ||
  (inputData.DOD === 1 && inputData.Equity === 1 && inputData.IMP === 0 && inputData.Market === 1); // DD=Yes, Equity=Yes, IMP=Yes/No, Market=Yes


  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setShowResults(false)}
          className="flex items-center text-[#ff743d] hover:text-[#e6653a] transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Calculator
        </button>
      </div>

      <div className="space-y-8">
        {/* Contact Form */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#051B47] mb-4">
            To receive a comprehensive analysis of the results in pdf format and request further assistance or services related to these calculations, please provide your contact details below:
          </h3>
          <form onSubmit={handleContactFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={contactForm.fullName}
                  onChange={handleContactFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#000000] focus:border-[#000000] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#000000] focus:border-[#000000] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleContactFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#000000] focus:border-[#000000] text-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Additional Details (Optional)
              </label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleContactFormChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#000000] focus:border-[#000000] text-black"
                placeholder="Please provide any additional details about your property situation that might help our team prepare for your consultation..."
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#ff743d] text-white px-6 py-2 rounded-md hover:bg-[#e6653a] focus:outline-none focus:ring-2 focus:ring-[#ff743d] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
              {submitMessage && (
                <div style={{ marginLeft: '7px' }}>
                  <p className={`text-sm ${submitMessage.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
                    {submitMessage}
                  </p>
                </div>
              )}
            </div>
          </form>
          <p>&nbsp;</p>
          <p><em><strong>Disclaimer:</strong> The results of these calculations are for informational purposes only and should not be considered legal, financial, or tax advice. This analysis is not intended for use in legal proceedings or as part of any official documentation. For a formal evaluation tailored to your specific situation, please complete the form above to request professional assistance.</em></p>
        </div>

        {/* Additional Settings */}
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-[#051B47] mb-4">Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex">
              <span className="text-sm text-black">Were improvements made to the property?</span> &nbsp;
              <span className="text-sm font-medium text-black">{inputData.IMP === 1 ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex">
              <span className="text-sm text-black">Did this property appreciate in value?</span> &nbsp;
              <span className="text-sm font-medium text-black">{inputData.Market === 1 ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        {/* Scenario 1: DD=No, Equity=No, IMP=No, Market=No */}
        {isScenario1 && (
          <div className="space-y-6">
            {/* Responses Table */}
            <div className="overflow-x-auto">
              <h4 className="text-lg font-medium text-[#051B47] mb-4">Responses</h4>
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Fair Market Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Debt</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Acquisition</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Acquisition_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(inputData.Date_of_Acquisition_Debt)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Marriage</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Marriage_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(inputData.Date_of_Marriage_Debt)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Separation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Separation_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(inputData.Date_of_Separation_Debt)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto">
              <h4 className="text-lg font-medium text-[#051B47] mb-4">Results</h4>
              <table className="min-w-full bg-white border border-[#008287]">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Community Property Interest</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Community_Property_Interest)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Separate Property Interest</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Separation_Interest)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Community Property Principal Reduction</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Community_Property_Principal_Reduction)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Apportionable Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Apportionable_Appreciation)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Community Property Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Community_Property_Appreciation)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Community Property % of Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatPercentage(Community_Property_Per_Appreciation)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Total Equity</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Total_Equity)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Total Interest</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Total_Interest)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Scenario 2: DD=Yes, Equity=No, IMP=No, Market=No */}
        {isScenario2 && (
          <div className="space-y-6">
            {/* Responses Table */}
            <div className="overflow-x-auto">
              <h4 className="text-lg font-medium text-[#051B47] mb-4">Responses</h4>
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Fair Market Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Debt</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Acquisition</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Acquisition_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(inputData.Date_of_Acquisition_Debt)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Marriage</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Marriage_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(inputData.Date_of_Marriage_Debt)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Separation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Separation_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(inputData.Date_of_Separation_Debt)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Division</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Division_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(inputData.Date_of_Division_Debt)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto">
              <h4 className="text-lg font-medium text-[#051B47] mb-4">Results</h4>
              <table className="min-w-full bg-white border border-[#008287]">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Community Property Interest</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Community_Property_Interest)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Separate Property Interest</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Separation_Interest)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Community Property Principal Reduction</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Community_Property_Principal_Reduction)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Apportionable Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Apportionable_Appreciation)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Community Property Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Community_Property_Appreciation)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Community Property % of Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatPercentage(Community_Property_Per_Appreciation)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Total Equity</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Total_Equity)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Total Interest</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Total_Interest)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Scenario 3: DD=Yes, Equity=Yes, IMP=No, Market=No */}
        {isScenario3 && (
          <div className="space-y-6">
            {/* Responses Table */}
            <div className="overflow-x-auto">
              <h4 className="text-lg font-medium text-[#051B47] mb-4">Responses</h4>
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Date</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Fair Market Value</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Debt</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Equity</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Acquisition</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Acquisition_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Acquisition_Debt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Acquisition_Equity)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Marriage</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Marriage_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Marriage_Debt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Marriage_Equity)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Separation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Separation_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Separation_Debt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Separation_Equity)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Division</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Division_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Division_Debt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Division_Equity)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Period Analysis Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Period</th>
                    <th width="27%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Appreciation</th>
                    <th width="27%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Principal Reduction</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Between Date of Acquisition and Date of Marriage</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Marriage_Fair_Market_Value_Date_of_Acquisition_Fair_Market_Value_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Marriage_Debt_Date_of_Acquisition_Debt_Principal_Reduction)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Between Date of Marriage and Date of Separate</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Separation_Fair_Market_Value_Date_of_Marriage_Fair_Market_Value_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Separation_Debt_Date_of_Marriage_Debt_Principal_Reduction)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Between Date of Separation and Date of Division</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Division_Fair_Market_Value_Date_of_Separation_Fair_Market_Value_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Division_Debt_Date_of_Separation_Debt_Principal_Reduction)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Principal Reduction Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Principal Reduction</th>
                    <th width="54%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Separate</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Separation_Principal_Reduction)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Community</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Community_Principal_Reduction)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* % Appreciation Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">% Appreciation</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Total</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Separate</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Community</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">% Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatPercentage(Total_Percentage_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatPercentage(Separation_Property_Percentage_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatPercentage(Community_Property_Percentage_Appreciation)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Apportionment of Appreciation Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Apportionment of Appreciation</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Total</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Separate</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Community</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Pre-Marital Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Pre_Marital_Appreciation_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Pre_Marital_Appreciation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Pre_Marital_Appreciation_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Apportionable Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Apportionable_Appreciation_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Apportionable_Appreciation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Apportionable_Appreciation_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Appreciation_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Appreciation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Appreciation_Community)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Property Apportionment Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Property Apportionment</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Total</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Separate</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Community</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Down Payment</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Down_Payment_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Down_Payment_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Down_Payment_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Principal Reduction</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Principal_Reduction_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Principal_Reduction_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Principal_Reduction_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Less_Apportionable_Appreciation_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Less_Apportionable_Appreciation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Less_Apportionable_Appreciation_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Interest_Total_2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Interest_Separation_2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Interest_Community_2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Scenario 4: DD=Yes, Equity=Yes, IMP=Yes, Market=No */}
        {isScenario4 && (
          <div className="space-y-6">
            {/* Responses Table */}
            <div className="overflow-x-auto">
              <h4 className="text-lg font-medium text-[#051B47] mb-4">Responses</h4>
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Date</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Fair Market Value</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Debt</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Equity</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Acquisition</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Acquisition_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Acquisition_Debt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Acquisition_Equity)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Marriage</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Marriage_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Marriage_Debt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Marriage_Equity)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Separation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Separation_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Separation_Debt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Separation_Equity)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Division</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Division_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Division_Debt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Division_Equity)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Period Analysis Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Period</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Appreciation</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Principal Reduction</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Improvements</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Between Date of Acquisition and Date of Marriage</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Marriage_Fair_Market_Value_Date_of_Acquisition_Fair_Market_Value_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Marriage_Debt_Date_of_Acquisition_Debt_Principal_Reduction)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(inputData.Improvements_Date_of_Marriage_Date_of_Acquisition)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Between Date of Marriage and Date of Separate</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Separation_Fair_Market_Value_Date_of_Marriage_Fair_Market_Value_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Separation_Debt_Date_of_Marriage_Debt_Principal_Reduction)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(inputData.Improvements_Date_of_Separation_Date_of_Marriage)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Between Date of Separation and Date of Division</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Division_Fair_Market_Value_Date_of_Separation_Fair_Market_Value_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Division_Debt_Date_of_Separation_Debt_Principal_Reduction)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(inputData.Improvements_Date_of_Division_Date_of_Separation)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* % Apportionable Appreciation Calculation Purchase Price Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">% Apportionable Appreciation Calculation Purchase Price</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Total</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Separate</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Community</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Down Payment</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Down_Payment_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Down_Payment_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Down_Payment_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Principal Reduction</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Principal_Reduction_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Principal_Reduction_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Principal_Reduction_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Improvements</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Improvements_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Improvements_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Improvements_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Debt</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Purchase_Price_Debt_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Purchase_Price_Debt_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Purchase_Price_Debt_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; Totals</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Apportionable_Appreciation_Calculation_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Apportionable_Appreciation_Calculation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Apportionable_Appreciation_Calculation_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; &nbsp; &nbsp; % Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatPercentage(Total_Percentage_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatPercentage(Separation_Property_Percentage_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatPercentage(Community_Property_Percentage_Appreciation)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Apportionment of Market Appreciation Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Apportionment of Market Appreciation</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Total</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Separate</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Community</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Pre-Marital Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Pre_Marital_Appreciation_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Pre_Marital_Appreciation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Pre_Marital_Appreciation_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Apportionable Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Apportionable_Appreciation_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Apportionable_Appreciation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Apportionable_Appreciation_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Appreciation_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Appreciation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Appreciation_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; Less: Appreciation Due to Improvements</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Less_Appreciation_Due_to_Improvements_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Less_Appreciation_Due_to_Improvements_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Less_Appreciation_Due_to_Improvements_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; &nbsp; &nbsp; Apportionable Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Less_Apportionable_Appreciation_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Less_Apportionable_Appreciation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Less_Apportionable_Appreciation_Community)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Property Apportionment Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Property Apportionment</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Total</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Separate</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Community</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Down Payment</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Down_Payment_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Down_Payment_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Down_Payment_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Principal Reduction</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Principal_Reduction_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Principal_Reduction_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Principal_Reduction_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Improvements</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Totals_Improvements)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Improvements_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Improvements_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Apportionable Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Less_Apportionable_Appreciation_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Less_Apportionable_Appreciation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Less_Apportionable_Appreciation_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Interest_Total_2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Interest_Separation_2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Interest_Community_2)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatPercentage(Total_Property_Percentage_Appreciation_2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatPercentage(Separation_Property_Percentage_Appreciation_2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatPercentage(Community_Property_Percentage_Appreciation_2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Scenario 5: DD=Yes, Equity=Yes, IMP=Yes, Market=Yes */}
        {isScenario5 && (
          <div className="space-y-6">
            {/* Responses Table */}
            <div className="overflow-x-auto">
              <h4 className="text-lg font-medium text-[#051B47] mb-4">Responses</h4>
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Date</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Fair Market Value</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Debt</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Equity</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Acquisition</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Acquisition_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Acquisition_Debt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Acquisition_Equity)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Marriage</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Marriage_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Marriage_Debt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Marriage_Equity)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Separation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Separation_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Separation_Debt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Separation_Equity)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Date of Division</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Division_Fair_Market_Value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(inputData.Date_of_Division_Debt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Date_of_Division_Equity)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Period Analysis Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Period</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Appreciation</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Principal Reduction</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Improvements</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Between Date of Acquisition and Date of Marriage</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Marriage_Fair_Market_Value_Date_of_Acquisition_Fair_Market_Value_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Marriage_Debt_Date_of_Acquisition_Debt_Principal_Reduction)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(inputData.Improvements_Date_of_Marriage_Date_of_Acquisition)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Between Date of Marriage and Date of Separate</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Separation_Fair_Market_Value_Date_of_Marriage_Fair_Market_Value_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Separation_Debt_Date_of_Marriage_Debt_Principal_Reduction)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(inputData.Improvements_Date_of_Separation_Date_of_Marriage)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Between Date of Separation and Date of Division</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Division_Fair_Market_Value_Date_of_Separation_Fair_Market_Value_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Date_of_Division_Debt_Date_of_Separation_Debt_Principal_Reduction)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(inputData.Improvements_Date_of_Division_Date_of_Separation)}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black border-r border-[#008287]">&nbsp; &nbsp; Totals</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black border-r border-[#008287]">{formatCurrency(Totals_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black border-r border-[#008287]">{formatCurrency(Principal_Reduction_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black">{formatCurrency(Totals_Improvements)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Apportionable Appreciation Table */}
            <div className="overflow-x-auto">
              <h4 className="text-lg font-medium text-[#051B47] mb-4"></h4>
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Apportionable Appreciation</th>
                    <th width="54%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Total Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Totals_Appreciation)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Less: Improvements</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Less_Improvements)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; Market Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Market_Appreciation)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black"></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Less: Premarital Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Less_Premarital_Appreciation)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; Apportionable Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Apportionable_Appreciation_Apportionable_Appreciation)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* % Apportionable Appreciation Calculation Purchase Price Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">% Apportionable Appreciation Calculation Purchase Price</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Total</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Separate</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Community</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Down Payment</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Down_Payment_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Down_Payment_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Down_Payment_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Principal Reduction</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Principal_Reduction_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Principal_Reduction_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Principal_Reduction_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Debt</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Purchase_Price_Debt_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Purchase_Price_Debt_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Purchase_Price_Debt_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; Total Purchase Price</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Total_Purchase_Price_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Total_Purchase_Price_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Total_Purchase_Price_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; Add: Improvements</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Improvements_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Improvements_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Improvements_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; &nbsp; &nbsp; Total</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Apportionable_Appreciation_Calculation_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Apportionable_Appreciation_Calculation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Apportionable_Appreciation_Calculation_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; &nbsp; &nbsp; % Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatPercentage(Total_Percentage_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatPercentage(Separation_Property_Percentage_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatPercentage(Community_Property_Percentage_Appreciation)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Apportionment of Market Appreciation Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Apportionment of Market Appreciation</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Total</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Separate</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Community</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Pre-Marital Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Pre_Marital_Appreciation_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Pre_Marital_Appreciation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Pre_Marital_Appreciation_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Apportionable Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Apportionable_Appreciation_Apportionable_Appreciation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Apportionable_Appreciation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Apportionable_Appreciation_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; Market Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Market_Appreciation_Total || 0)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Market_Appreciation_Separation || 0)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Market_Appreciation_Community || 0)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; Add: Improvements</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Totals_Improvements)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Improvements_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Improvements_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">&nbsp; &nbsp; &nbsp; &nbsp; Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Less_Apportionable_Appreciation_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Less_Apportionable_Appreciation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Less_Apportionable_Appreciation_Community)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Property Apportionment Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#008287]">
                <thead className="bg-gray-50">
                  <tr>
                    <th width="46%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Property Apportionment</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Total</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Separate</th>
                    <th width="18%" className="px-6 py-3 text-left text-xs font-medium text-[#051B47] uppercase tracking-wider border-b border-[#008287]">Community</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Down Payment</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Down_Payment_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Down_Payment_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Down_Payment_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Principal Reduction</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Principal_Reduction_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Principal_Reduction_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Principal_Reduction_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]">Appreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Less_Apportionable_Appreciation_Total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Less_Apportionable_Appreciation_Separation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Less_Apportionable_Appreciation_Community)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Interest_Total_2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatCurrency(Interest_Separation_2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatCurrency(Interest_Community_2)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black border-r border-[#008287]"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatPercentage(Total_Property_Percentage_Appreciation_2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border-r border-[#008287]">{formatPercentage(Separation_Property_Percentage_Appreciation_2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{formatPercentage(Community_Property_Percentage_Appreciation_2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
