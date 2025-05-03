// import React from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const DummyPay = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { contractId, buyerEmail, sellerEmail } = location.state || {};

//   const handlePayment = async () => {
//     try {
//       await axios.post('http://localhost:4000/api/payment/escrow', {
//         contractId,
//         buyerEmail,
//         sellerEmail,
//       });

//       toast.success('Payment stored in escrow!');
//       navigate('/track-product');
//     } catch (err) {
//       console.error(err);
//       toast.error('Something went wrong');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
//         <h2 className="text-2xl font-bold mb-4">Pay with SafeFreeze (Dummy Paytm)</h2>
//         <div className="mb-6">
  
//             <img src='/qr.png' alt="QR Code" className="mx-auto mb-2"
//           /></div>
//         <p className="mb-6">Click the button below to simulate your payment</p>
//         <button
//           onClick={handlePayment}
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DummyPay;

// // import React from 'react';

// // const PaytmPaymentPage = () => {
// //   return (
// //     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
// //       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
// //         {/* Header Section */}
// //         <h2 className="text-2xl font-bold text-gray-800 mb-4">Pay with Paytm</h2>
        
// //         {/* UPI ID Section */}
// //         <div className="mb-6">
// //           <p className="text-sm text-gray-600">UPI ID:</p>
// //           <p className="font-semibold text-xl text-blue-600">21xxxxxxxxxx@paytm</p>
// //         </div>
        
// //         {/* QR Code Section */}
// //         <div className="mb-6">
// //           <img
// //             src="https://via.placeholder.com/150" // Placeholder for QR code, replace with actual QR code
// //             alt="QR Code"
// //             className="mx-auto mb-2"
// //           />
// //           <p className="text-sm text-gray-600">Scan to Pay</p>
// //         </div>
        
// //         {/* Payment Instructions */}
// //         <div className="mb-6 text-gray-600 text-sm">
// //           <p>Or make a direct payment using the UPI ID above.</p>
// //           <p>Ensure your payment is successful to proceed with the transaction.</p>
// //         </div>
        
// //         {/* Pay Now Button */}
// //         <button
// //           onClick={() => alert('Payment simulation triggered!')}
// //           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
// //         >
// //           Pay Now
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PaytmPaymentPage;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const DummyPay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    contractId, 
    buyerEmail, 
    sellerEmail,
    products = [] // Expecting array of product objects
  } = location.state || {};
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');

  const generateOTP = () => {
    // Generate 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handlePayment = async () => {
    if (!buyerEmail || !sellerEmail) {
      toast.error('Email information missing');
      return;
    }

    setIsProcessing(true);
    const otp = generateOTP();
    setGeneratedOTP(otp);

    try {
      const response = await axios.post('http://localhost:4000/api/payment/escrow', {
        contractId,
        buyerEmail,
        sellerEmail,
        products, // Send all product details
        otp
      });

      if (response.data.success) {
        toast.success(
          <div>
            <p>Payment stored in escrow!</p>
            <p className="font-bold">OTP for verification: {otp}</p>
          </div>
        );
        navigate('/track-product', { 
          state: { 
            contractId,
            otp,
            products 
          } 
        });
      } else {
        throw new Error(response.data.message || 'Payment failed');
      }
    } catch (err) {
      console.error('Payment error:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">SafeFreeze Escrow Payment</h2>
          <p className="text-blue-100 mt-1">Secure transaction powered by our escrow service</p>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Product Summary */}
          {products.length > 0 && (
            <div className="mb-6 border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">Products in this order:</h3>
              <div className="space-y-3">
                {products.map((product, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <img 
                      src={product.image || '/placeholder-product.jpg'} 
                      alt={product.name} 
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-gray-600">ID: {product.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{product.price}</p>
                      <p className="text-xs text-gray-500">Qty: {product.quantity || 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <div className="bg-blue-50 rounded-xl p-5 mb-6 border border-blue-100">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-500">Total Amount</span>
              <span className="text-2xl font-bold text-blue-800">
                ₹ 220
                {/* {products.reduce((sum, product) => sum + (product.price * (product.quantity || 1)), 0)} */}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Contract ID</span>
              <span className="font-mono text-sm text-gray-600">SF{contractId?.slice(0, 8)}</span>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="text-center mb-6">
            <div className="bg-white p-4 rounded-lg inline-block border-2 border-dashed border-blue-200">
              <img 
                src='/qr.png' 
                alt="QR Code" 
                className="w-48 h-48 mx-auto"
              />
            </div>
            <p className="text-gray-500 mt-3 text-sm">Scan QR code with any UPI app</p>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center ${isProcessing ? 'opacity-75' : ''}`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Confirm Payment
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600">100% Secure Payment</span>
            </div>
            <p className="text-xs text-gray-500 text-center">
              A verification OTP will be sent to both parties for transaction confirmation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummyPay;