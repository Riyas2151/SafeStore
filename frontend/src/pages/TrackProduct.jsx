// // src/pages/TrackProduct.jsx
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { assets } from '../assets/frontend_assets/assets';

// const TrackProduct = () => {
//   const [status, setStatus] = useState('pending'); // 'pending' | 'confirmed' | 'rejected'

//   const handleConfirm = () => {
//     setStatus('confirmed');
//     toast.success('All conditions met! Payment released to seller.');
//   };

//   const handleReject = () => {
//     setStatus('rejected');
//     toast.error('Issue reported! Payment will be refunded to buyer.');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-bold mb-6">Your Order Status</h2>
//         <p className='font-bold text-red-700 mb-2'>**If NO action has been taken within 24h then payment will be releases automaically</p>
//         <div className="flex gap-4 border p-4 rounded items-center mb-6">
          
//           <img
//             src={'/img10.png'}             /* replace with your actual product image */
//             alt="Product"
//             className="w-24 h-24 object-contain border rounded"
//           />
//           <div className="flex-1">
//             <h3 className="font-semibold text-lg">Smart Watch Series 7</h3>
//             <p className="text-sm text-gray-600">
//               Contract ID: <span className="text-black">CT987654321</span>
//             </p>
//             <p className="text-sm text-gray-600">Delivery Date: 03 May 2025</p>
//             <p className="text-sm text-gray-600">
//               Payment Method: SafeFreeze
//             </p>
//             <p className="text-sm">
//               Status:{' '}
//               <span
//                 className={
//                   status === 'pending'
//                     ? 'text-yellow-600'
//                     : status === 'confirmed'
//                     ? 'text-green-600'
//                     : 'text-red-600'
//                 }
//               >
//                 {status === 'pending'
//                   ? 'Awaiting Confirmation'
//                   : status === 'confirmed'
//                   ? 'Confirmed'
//                   : 'Issue Reported'}
//               </span>
//             </p>
//           </div>
//         </div>

//         <div className="flex gap-4">
//           {status === 'pending' && (
//             <>
//               <button
//                 onClick={handleConfirm}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
//               >
//                 Confirm Delivery
//               </button>
//               <button
//                 onClick={handleReject}
//                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex-1"
//               >
//                 Report Issue
//               </button>
//             </>
//           )}

//           {status === 'confirmed' && (
//             <div className="text-center w-full py-4 bg-green-100 text-green-800 rounded">
//               ✅ You've confirmed delivery. Thank you!
//             </div>
//           )}

//           {status === 'rejected' && (
//             <div className="text-center w-full py-4 bg-red-100 text-red-800 rounded">
//               ⚠️ Issue reported. We'll refund your payment.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrackProduct;


import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../assets/frontend_assets/assets';

const TrackProduct = () => {
  const [status, setStatus] = useState('pending'); // pending | confirmed | under_review
  const [showEvidenceForm, setShowEvidenceForm] = useState(false);
  const [evidenceDesc, setEvidenceDesc] = useState('');
  const [evidenceFile, setEvidenceFile] = useState(null);

  const handleConfirm = () => {
    setStatus('confirmed');
    toast.success('All conditions met! Payment released to seller.');
  };

  const handleReport = () => {
    setShowEvidenceForm(true);
  };

  const handleSubmitEvidence = () => {
    if (!evidenceDesc.trim() && !evidenceFile) {
      toast.error('Please describe the issue or upload an image.');
      return;
    }
    // TODO: call backend to submit evidenceDesc and evidenceFile
    toast.info('Evidence submitted. We will review and get back to you.');
    setStatus('under_review');
    setShowEvidenceForm(false);
  };

  const handleFileChange = (e) => {
    setEvidenceFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Your Order Status</h2>

        <div className="flex gap-4 border p-4 rounded items-center mb-6">
          <img
            src={'/img10.png'}
            alt="Product"
            className="w-24 h-24 object-contain border rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Men Round Neck Pure Cotton T-shirt </h3>
            <p className="text-sm text-gray-600">
              Contract ID: <span className="text-black">CT987654321</span>
            </p>
            <p className="text-sm text-gray-600">Delivery Date: 03 May 2025</p>
            <p className="text-sm text-gray-600">Payment Method: SafeFreeze</p>
            <p className="text-sm">
              Status:{' '}
              <span
                className={
                  status === 'pending'
                    ? 'text-yellow-600'
                    : status === 'confirmed'
                    ? 'text-green-600'
                    : 'text-red-600'
                }
              >
                {status === 'pending'
                  ? 'Awaiting Confirmation'
                  : status === 'confirmed'
                  ? 'Confirmed'
                  : 'Under Review'}
              </span>
            </p>
          </div>
        </div>

        {/* Action Buttons or Forms */}
        {status === 'pending' && !showEvidenceForm && (
          <div className="flex gap-4">
            <button
              onClick={handleConfirm}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
            >
              Confirm Delivery
            </button>
            <button
              onClick={handleReport}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex-1"
            >
              Report Issue
            </button>
          </div>
        )}

        {showEvidenceForm && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Describe the issue or upload a photo:</h4>
            <textarea
              value={evidenceDesc}
              onChange={(e) => setEvidenceDesc(e.target.value)}
              rows={4}
              className="w-full border p-2 rounded mb-3"
              placeholder="E.g., product arrived damaged..."
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-3"
            />
            <button
              onClick={handleSubmitEvidence}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Submit Evidence
            </button>
          </div>
        )}

        {status === 'confirmed' && (
          <div className="text-center w-full py-4 bg-green-100 text-green-800 rounded mt-4">
            ✅ You've confirmed delivery. Thank you!
          </div>
        )}

        {status === 'under_review' && (
          <div className="text-center w-full py-4 bg-yellow-100 text-yellow-800 rounded mt-4">
            ⚠️ Issue reported and evidence submitted. Under review.
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackProduct;
