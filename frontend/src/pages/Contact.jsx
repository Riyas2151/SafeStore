import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className="my-10 justify-center flex flex-col md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
        <div className="flex flex-col items-start justify-center gap-6">
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>10015 Sec-2 Pipli Geeta Gate <br />Kurukshetra,Haryana</p>
          <p className='text-gray-500'>Tel:9185753457 <br/>Email:riya@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about Our teams and job Opening</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact