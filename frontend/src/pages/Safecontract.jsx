// frontend/src/pages/Safecontract.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const categoryRules = {
  Electronics: [
    'Return only if the item is defective or not working',
    'Replacement available within 7 days of delivery',
    'No return accepted after unboxing unless fault is recorded',
  ],
  Clothing: [
    'Return allowed within 7 days if unused and original tag intact',
    'Exchange allowed only for size issues (one time only)',
    'No return on innerwear or personal wear items',
  ],
  Books: [
    'No returns unless pages are torn or misprinted',
    'Buyer must provide image proof within 2 days of delivery',
  ],
};

const Safecontract = ({ product }) => {
  const [buyerEmail, setBuyerEmail] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [selectedRule, setSelectedRule] = useState('');
  const [contractId, setContractId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [penalty, setPenalty] = useState('');
  const navigate = useNavigate();

  // Compute delivery date and penalty on mount / product change
  useEffect(() => {
    const today = new Date();
    const future = new Date(today.setDate(today.getDate() + 7));
    setDeliveryDate(future.toISOString().split('T')[0]);
    if (product?.price) {
      setPenalty(Math.ceil((product.price * 1) / 100));
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buyerEmail || !productCategory || !selectedRule) {
      toast.error('Please fill all required fields.');
      return;
    }

    const contractData = {
      productId: product._id,
      productName: product.name,
      price: product.price,
      buyerEmail,
      sellerEmail: 'seller@example.com',
      deliveryDate,
      penalty,
      selectedRule,
    };

    try {
      const res = await axios.post('http://localhost:4000/api/contract', contractData);
      const newId = res.data.contractId;
      toast.success('Contract created and email sent!');
      setContractId(newId);

      // Navigate to dummy-pay page, passing contract info
      navigate('/dummy-pay', {
        state: {
          contractId: newId,
          buyerEmail,
          sellerEmail: 'seller@example.com',
        },
      });
    } catch (err) {
      console.error(err);
      toast.error('Error sending contract email.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-4">🛡️ Create Safe Contract</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Buyer Email */}
        <input
          type="email"
          placeholder="Buyer Email"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />

        {/* Product Category */}
        <select
          value={productCategory}
          onChange={(e) => {
            setProductCategory(e.target.value);
            setSelectedRule('');
          }}
          required
          className="border p-2 rounded"
        >
          <option value="">Select Product Category</option>
          {Object.keys(categoryRules).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Rule Template */}
        <select
          value={selectedRule}
          onChange={(e) => setSelectedRule(e.target.value)}
          required
          disabled={!productCategory}
          className="border p-2 rounded"
        >
          <option value="">Select Rule Template</option>
          {productCategory && categoryRules[productCategory].map((rule, idx) => (
            <option key={idx} value={rule}>{rule}</option>
          ))}
        </select>

        {/* Delivery Date & Penalty Info */}
        <div className="text-sm text-gray-700">
          <p><strong>Delivery Date:</strong> {deliveryDate}</p>
          <p><strong>Penalty:</strong> ₹{penalty} per day</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Send Contract Email & Proceed to Payment
        </button>
      </form>

      {contractId && (
        <p className="text-green-600 mt-4">
          Contract ID: <strong>{contractId}</strong>
        </p>
      )}
    </div>
  );
};

export default Safecontract;
