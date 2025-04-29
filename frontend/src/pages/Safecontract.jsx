import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Safecontract = ({ product }) => {
  const [buyerEmail, setBuyerEmail] = useState('');
  const [selectedRule, setSelectedRule] = useState('');
  const [contractId, setContractId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [penalty, setPenalty] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const future = new Date(today.setDate(today.getDate() + 7));
    const formatted = future.toISOString().split('T')[0];
    setDeliveryDate(formatted);

    if (product?.price) {
      const dailyPenalty = Math.ceil((product.price * 1) / 100);
      setPenalty(dailyPenalty);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buyerEmail || !selectedRule) {
      toast.error("Fill all fields!");
      return;
    }

    const contractData = {
      productId: product._id || 'P123',
      productName: product.name || 'Demo Product',
      price: product.price || 1000,
      buyerEmail,
      sellerEmail: 'seller@example.com',
      deliveryDate,
      penalty,
      selectedRule,
    };

    try {
      const res = await axios.post('http://localhost:4000/api/contract', contractData);
      toast.success('Contract created and email sent!');
      setContractId(res.data.contractId);

      // Pass data to DummyPay via state
      navigate('/dummy-pay', { state: { ...contractData, contractId: res.data.contractId } });
    } catch (err) {
      console.error(err);
      toast.error('Error sending contract email.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Safe Contract</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Buyer Email"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <select value={selectedRule} onChange={(e) => setSelectedRule(e.target.value)} required className="border p-2 rounded">
          <option value="">Select a rule template</option>
          <option value="Return only if damaged">Return only if damaged</option>
          <option value="7-day replacement only">7-day replacement only</option>
          <option value="Return allowed within 7 days">Return allowed within 7 days</option>
        </select>

        <div className="text-gray-700 text-sm">
          <p><strong>Delivery Date:</strong> {deliveryDate}</p>
          <p><strong>Penalty:</strong> ₹{penalty} / day</p>
        </div>

        <button type="submit" className="bg-black text-white py-2 rounded hover:bg-gray-800">Send Contract Email</button>
      </form>
    </div>
  );
};

export default Safecontract;



