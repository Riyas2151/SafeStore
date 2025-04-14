import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const[method,setMethod] =useState('cod');

  const {navigate,getCartAmount}=useContext(ShopContext);
  const totalAmount = getCartAmount(); // ✅ Now you can use totalAmount


  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl" security='m:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className="flex gap-3">
          <input type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="email" placeholder='Email Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className="flex gap-3">
          <input type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className="flex gap-3">
          <input type="number" placeholder='Pincode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>
      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal/>
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe'?'bg-green-400': ''}`}></p>
                <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
              
            </div> */}
            <div onClick={()=>setMethod('safefreeze')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'safefreeze'?'bg-green-400': '' }`}></p>
                <img src={assets.image1} className='h-5 mx-4 object-contain' alt="" />
      
            </div>
            <div onClick={()=>setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay'?'bg-green-400': ''}`}></p>
                <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
              
            </div>
            
            <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod'?'bg-green-400': ''}`}></p>
              <p className='text-gray-600 text-sm font-medium mx-4 '>Cash On Delivery</p>              
            </div>
            

          </div>
{/* to get safe description */}
          {method === 'safefreeze' && (
  <div className="bg-gray-100 p-4 rounded-lg mt-3 shadow-sm text-sm text-gray-700">
    <h3 className="font-semibold mb-2">How SafeFreeze Works:</h3>
    <ul className="list-disc list-inside space-y-1">
      <li>You pay the amount, which gets <strong>frozen securely</strong>.</li>
      <li>The seller ships your order.</li>
      <li>Once you approve the delivery, the payment is <strong>released</strong>.</li>
    </ul>
    <p className="mt-2 text-gray-500">SafeFreeze ensures trust and transparency for both buyers and sellers.</p>
  </div>
)}

          <div className="w-full text-end mt-8">
            <button onClick={() => {
    if (totalAmount > 0) {
      if (method === 'safefreeze') {
        navigate('/safecontract');
      } else {
        navigate('/orders');
      }
    } else {
      toast("Add some amount bro 🤷‍♂️");
    }}} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder