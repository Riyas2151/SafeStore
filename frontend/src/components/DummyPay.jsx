import React from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const DummyPay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contractId, buyerEmail, sellerEmail } = location.state || {};

  const handlePayment = async () => {
    try {
      await axios.post('http://localhost:4000/api/payment/escrow', {
        contractId,
        buyerEmail,
        sellerEmail,
      });

      toast.success('Payment stored in escrow!');
      navigate('/track-product');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Pay with SafeFreeze (Dummy Paytm)</h2>
        <div className="mb-6">
  
            <img src='/qr.png' alt="QR Code" className="mx-auto mb-2"
          /></div>
        <p className="mb-6">Click the button below to simulate your payment</p>
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default DummyPay;

// import React from 'react';

// const PaytmPaymentPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
//         {/* Header Section */}
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Pay with Paytm</h2>
        
//         {/* UPI ID Section */}
//         <div className="mb-6">
//           <p className="text-sm text-gray-600">UPI ID:</p>
//           <p className="font-semibold text-xl text-blue-600">21xxxxxxxxxx@paytm</p>
//         </div>
        
//         {/* QR Code Section */}
//         <div className="mb-6">
//           <img
//             src="https://via.placeholder.com/150" // Placeholder for QR code, replace with actual QR code
//             alt="QR Code"
//             className="mx-auto mb-2"
//           />
//           <p className="text-sm text-gray-600">Scan to Pay</p>
//         </div>
        
//         {/* Payment Instructions */}
//         <div className="mb-6 text-gray-600 text-sm">
//           <p>Or make a direct payment using the UPI ID above.</p>
//           <p>Ensure your payment is successful to proceed with the transaction.</p>
//         </div>
        
//         {/* Pay Now Button */}
//         <button
//           onClick={() => alert('Payment simulation triggered!')}
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaytmPaymentPage;
