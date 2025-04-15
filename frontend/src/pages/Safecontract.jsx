import React, { useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
import { toast } from 'react-toastify';

const ruleOptions = [
  {
    category: "Electronics",
    rules: [
      "Release payment after 7 days of delivery if no issue is reported.",
      "Release payment only after customer confirms product is working.",
      "Release payment after seller provides serial number verification.",
    ]
  },
  {
    category: "Clothing",
    rules: [
      "Release payment after 3 days of delivery if no return is initiated.",
      "Release payment upon confirmation of product quality by buyer.",
      "Release payment if the buyer does not raise an issue within 48 hours.",
    ]
  },
  {
    category: "Custom/Handmade Products",
    rules: [
      "Release payment only after buyer approval.",
      "Release payment 5 days after delivery unless there's a complaint.",
    ]
  }
];

const SafeContract= () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRule, setSelectedRule] = useState('');

  const handleConfirm = () => {
    if (!selectedRule) {
      toast.error("Please select a rule to proceed.");
      return;
    }
    toast("Rule confirmed! Proceeding...");
    setTimeout(() => {
      navigate('/confirmation');
    }, 1500);
  };

  const currentRules = ruleOptions.find(opt => opt.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f4faff] text-[#003049] p-6 sm:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-4 mb-6">
          <img src={assets.image1} alt="SafeFreeze Logo" className="h-10" />
          <h1 className="text-2xl font-semibold text-[#0a2d4d]">SafeFreeze Secure Contract</h1>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Select the product category to choose predefined payment release rules. This ensures smooth transactions and reduces disputes.
        </p>

        <label className="block mb-2 font-medium">Select Product Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedRule('');
          }}
          className="w-full border rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#64b5f6]"
        >
          <option value="">-- Choose Category --</option>
          {ruleOptions.map(opt => (
            <option key={opt.category} value={opt.category}>{opt.category}</option>
          ))}
        </select>

        {currentRules && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Rule</h3>
            <div className="space-y-3">
              {currentRules.rules.map((rule, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`rule-${idx}`}
                    name="rule"
                    value={rule}
                    checked={selectedRule === rule}
                    onChange={(e) => setSelectedRule(e.target.value)}
                    className="accent-[#0077b6]"
                  />
                  <label htmlFor={`rule-${idx}`} className="text-sm text-gray-700">{rule}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-end mt-8">
          <button
            onClick={handleConfirm}
            className="bg-[#0077b6] text-white px-6 py-2 rounded hover:bg-[#005f91] transition-all"
          >
            Confirm & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafeContract;
