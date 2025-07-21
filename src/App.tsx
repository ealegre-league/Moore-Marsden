import React, { useState } from 'react';
import { Calculator } from './Calculator';
import { ContactForm } from './ContactForm';
import { ArrowRight } from 'lucide-react';

type InputData = {
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

function App() {
  const [inputData, setInputData] = useState<InputData>({
    Date_of_Marriage_Debt: 0,
    Date_of_Separation_Debt: 0,
    Date_of_Division_Fair_Market_Value: 0,
    Date_of_Marriage_Fair_Market_Value: 0,
    Date_of_Separation_Fair_Market_Value: 0,
    Date_of_Acquisition_Fair_Market_Value: 0,
    Date_of_Acquisition_Debt: 0,
    Date_of_Division_Debt: 0,
    Improvements_Date_of_Separation_Date_of_Marriage: 0,
    Improvements_Date_of_Marriage_Date_of_Acquisition: 0,
    Improvements_Date_of_Division_Date_of_Separation: 0,
    DOD: 1,
    Equity: 1,
    IMP: 0,
    Market: 0,
    TitleChange: 0,
    Refinanced: 0,
  });

  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      const numericValue = value === 'yes' ? 1 : 0;
      setInputData(prev => {
        const newData = {
          ...prev,
          [name]: numericValue
        };
        
        // Reset dependent fields when DOD changes to No
        if (name === 'DOD' && numericValue === 0) {
          newData.Equity = 0;
          newData.IMP = 0;
          newData.Market = 0;
        }
        
        // Reset dependent fields when Equity changes to No
        if (name === 'Equity' && numericValue === 0) {
          newData.IMP = 0;
          newData.Market = 0;
          // Reset improvement fields to 0 when Equity is No
          newData.Improvements_Date_of_Separation_Date_of_Marriage = 0;
          newData.Improvements_Date_of_Marriage_Date_of_Acquisition = 0;
          newData.Improvements_Date_of_Division_Date_of_Separation = 0;
        }
        
        // Reset Market when IMP changes to No
        if (name === 'IMP' && numericValue === 0) {
          // newData.Market = 0;
          // Reset improvement fields to 0 when IMP is No but keep them available for calculations
          newData.Improvements_Date_of_Separation_Date_of_Marriage = 0;
          newData.Improvements_Date_of_Marriage_Date_of_Acquisition = 0;
          newData.Improvements_Date_of_Division_Date_of_Separation = 0;
        }
        
        return newData;
      });
    } else {
      setInputData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const requiresAdditionalHelp = inputData.TitleChange === 1 || inputData.Refinanced === 1;
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {!showResults ? (
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 space-y-6">
            <div className="space-y-4 mb-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-6">
                  <span className="text-sm font-medium text-black">Was there a title change during the marriage?</span>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="TitleChange"
                        value="yes"
                        checked={inputData.TitleChange === 1}
                        onChange={handleInputChange}
                        className="form-radio text-[#ff743d] focus:ring-[#ff743d]"
                      />
                      <span className="ml-2 text-black">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="TitleChange"
                        value="no"
                        checked={inputData.TitleChange === 0}
                        onChange={handleInputChange}
                        className="form-radio text-[#ff743d] focus:ring-[#ff743d]"
                      />
                      <span className="ml-2 text-black">No</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <span className="text-sm font-medium text-black">Was the property refinanced?</span>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="Refinanced"
                        value="yes"
                        checked={inputData.Refinanced === 1}
                        onChange={handleInputChange}
                        className="form-radio text-[#ff743d] focus:ring-[#ff743d]"
                      />
                      <span className="ml-2 text-black">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="Refinanced"
                        value="no"
                        checked={inputData.Refinanced === 0}
                        onChange={handleInputChange}
                        className="form-radio text-[#ff743d] focus:ring-[#ff743d]"
                      />
                      <span className="ml-2 text-black">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <div>
                      <input
                        type="hidden"
                        name="DOD"
                        value="yes"
                        checked={inputData.DOD === 1}
                        onChange={handleInputChange}
                        className="form-radio text-[#ff743d] focus:ring-[#ff743d]"
                      /> 
                      <input
                        type="hidden"
                        name="DOD"
                        value="no"
                        checked={inputData.DOD === 0}
                        onChange={handleInputChange}
                        className="form-radio text-[#ff743d] focus:ring-[#ff743d]"
                      />
                  </div>
                </div>

                {inputData.DOD === 1 && (
                  <div>
                    <div>
                        <input
                          type="hidden"
                          name="Equity"
                          value="yes"
                          checked={inputData.Equity === 1}
                          onChange={handleInputChange}
                          className="form-radio text-[#ff743d] focus:ring-[#ff743d]"
                        />
                        <input
                          type="hidden"
                          name="Equity"
                          value="no"
                          checked={inputData.Equity === 0}
                          onChange={handleInputChange}
                          className="form-radio text-[#ff743d] focus:ring-[#ff743d]"
                        />
                    </div>
                  </div>
                )}

                {inputData.DOD === 1 && inputData.Equity === 1 && (
                  <div className="flex items-center space-x-6">
                    <span className="text-sm font-medium text-black">Were improvements made to the property?</span>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="IMP"
                          value="yes"
                          checked={inputData.IMP === 1}
                          onChange={handleInputChange}
                          className="form-radio text-[#ff743d] focus:ring-[#ff743d]"
                        />
                        <span className="ml-2 text-black">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="IMP"
                          value="no"
                          checked={inputData.IMP === 0}
                          onChange={handleInputChange}
                          className="form-radio text-[#ff743d] focus:ring-[#ff743d]"
                        />
                        <span className="ml-2 text-black">No</span>
                      </label>
                    </div>
                  </div>
                )}

                {inputData.DOD === 1 && inputData.Equity === 1 && (
                  <div className="flex items-center space-x-6">
                    <span className="text-sm font-medium text-black">Did this property appreciate in value?</span>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="Market"
                          value="yes"
                          checked={inputData.Market === 1}
                          onChange={handleInputChange}
                          className="form-radio text-[#ff743d] focus:ring-[#ff743d]"
                        />
                        <span className="ml-2 text-black">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="Market"
                          value="no"
                          checked={inputData.Market === 0}
                          onChange={handleInputChange}
                          className="form-radio text-[#ff743d] focus:ring-[#ff743d]"
                        />
                        <span className="ml-2 text-black">No</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hidden fields for improvements when Equity is Yes but IMP is No */}
            {inputData.DOD === 1 && inputData.Equity === 1 && inputData.IMP === 0 && (
              <div style={{ display: 'none' }}>
                <input
                  type="hidden"
                  name="Improvements_Date_of_Marriage_Date_of_Acquisition"
                  value={0}
                />
                <input
                  type="hidden"
                  name="Improvements_Date_of_Separation_Date_of_Marriage"
                  value={0}
                />
                <input
                  type="hidden"
                  name="Improvements_Date_of_Division_Date_of_Separation"
                  value={0}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#051B47]">Fair Market Values</h2>
                <div>
                  <label className="block text-sm font-medium text-black">
                    Date of Acquisition Fair Market Value
                    <input
                      type="input"
                      name="Date_of_Acquisition_Fair_Market_Value"
                      value={inputData.Date_of_Acquisition_Fair_Market_Value}
                      onChange={handleInputChange}
                      className="mt-1 px-3 py-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] text-black"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">
                    Date of Marriage Fair Market Value
                    <input
                      type="input"
                      name="Date_of_Marriage_Fair_Market_Value"
                      value={inputData.Date_of_Marriage_Fair_Market_Value}
                      onChange={handleInputChange}
                      className="mt-1 px-3 py-2 border  block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] text-black"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">
                    Date of Separation Fair Market Value
                    <input
                      type="input"
                      name="Date_of_Separation_Fair_Market_Value"
                      value={inputData.Date_of_Separation_Fair_Market_Value}
                      onChange={handleInputChange}
                      className="mt-1 px-3 py-2 border  block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] text-black"
                    />
                  </label>
                </div>
                {inputData.DOD === 1 && (
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Date of Division Fair Market Value
                      <input
                        type="input"
                        name="Date_of_Division_Fair_Market_Value"
                        value={inputData.Date_of_Division_Fair_Market_Value}
                        onChange={handleInputChange}
                        className="mt-1 px-3 py-2 border  block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] text-black"
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#051B47]">Debt Information</h2>
                <div>
                  <label className="block text-sm font-medium text-black">
                    Date of Acquisition Debt
                    <input
                      type="input"
                      name="Date_of_Acquisition_Debt"
                      value={inputData.Date_of_Acquisition_Debt}
                      onChange={handleInputChange}
                      className="mt-1 px-3 py-2 border  block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] text-black"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">
                    Date of Marriage Debt
                    <input
                      type="input"
                      name="Date_of_Marriage_Debt"
                      value={inputData.Date_of_Marriage_Debt}
                      onChange={handleInputChange}
                      className="mt-1 px-3 py-2 border  block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] text-black"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">
                    Date of Separation Debt
                    <input
                      type="input"
                      name="Date_of_Separation_Debt"
                      value={inputData.Date_of_Separation_Debt}
                      onChange={handleInputChange}
                      className="mt-1 px-3 py-2 border  block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] text-black"
                    />
                  </label>
                </div>
                {inputData.DOD === 1 && (
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Date of Division Debt
                      <input
                        type="input"
                        name="Date_of_Division_Debt"
                        value={inputData.Date_of_Division_Debt}
                        onChange={handleInputChange}
                        className="mt-1 px-3 py-2 border  block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] text-black"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {inputData.DOD === 1 && inputData.Equity === 1 && inputData.IMP === 1 && (
              <div className="space-y-4 mt-6">
                <h2 className="text-lg font-semibold text-[#051B47]">Improvements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Improvements (Acquisition to Marriage)
                      <input
                        type="input"
                        name="Improvements_Date_of_Marriage_Date_of_Acquisition"
                        value={inputData.Improvements_Date_of_Marriage_Date_of_Acquisition}
                        onChange={handleInputChange}
                        className="mt-1 px-3 py-2 border  block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] text-black"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Improvements (Marriage to Separation)
                      <input
                        type="input"
                        name="Improvements_Date_of_Separation_Date_of_Marriage"
                        value={inputData.Improvements_Date_of_Separation_Date_of_Marriage}
                        onChange={handleInputChange}
                        className="mt-1 px-3 py-2 border  block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] text-black"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Improvements (Separation to Division)
                      <input
                        type="input"
                        name="Improvements_Date_of_Division_Date_of_Separation"
                        value={inputData.Improvements_Date_of_Division_Date_of_Separation}
                        onChange={handleInputChange}
                        className="mt-1 px-3 py-2 border  block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff743d] focus:ring-[#ff743d] text-black"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#ff743d] hover:bg-[#e6653a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff743d] transition-colors duration-200"
            >
              Calculate Results
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>
        ) : (
          <>
            {requiresAdditionalHelp ? (
              <ContactForm setShowResults={setShowResults} inputData={inputData} />
            ) : (
              <Calculator inputData={inputData} setShowResults={setShowResults} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;