import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
     <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm
     ">
          <div>
               <img src={assets.logo} className='mb-5 w-32 ' alt="" />
               <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure labore sapiente ex repudiandae alias nulla laboriosam ad voluptatum laborum, repellat non in dolor adipisci quod asperiores qui atque. Minus, at.
               </p>
          </div>
          <div>
               <p className='text-xl font-medium mb-5'>COMPANY</p>
               <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>

               </ul>
          </div>
          <div>
               <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
               <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 712-321-123</li>
                    <li>riyasham@gmail.com</li>
               </ul>
          </div>
     </div>
     <div>
          <hr />
          <p className='py-5 text-sm text-center'>CopyRight 2025@ forever.com -All Rights Reserved.</p>
     </div>
    </div>
  )
}

export default Footer