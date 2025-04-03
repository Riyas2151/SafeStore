import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
    <div className='border-t pt-8 text-center text-2xl'>
      <Title text1={'ABOUT'} text2={'US'}/></div>
      
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className="flex justify-center gap-6 flex-col md:w-2/4 to-gray-600">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod est soluta libero magnam perspiciatis sint aut a nihil esse expedita pariatur molestias at qui quibusdam, facere omnis, vel odio id.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit blanditiis et voluptatum vitae sequi quam, facere incidunt hic quas, suscipit voluptatibus labore earum quos fugit delectus? Quisquam sapiente ut officiis?</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab quo voluptatem eum dolores debitis recusandae repudiandae et reprehenderit. Veritatis similique omnis rerum reiciendis dicta repudiandae odio, porro ut ipsa ullam!</p>
      </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique illum mollitia recusandae laudantium delectus temporibus omnis laborum sit, eum, animi adipisci illo hic dolorum optio minus consequuntur excepturi quos vel.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique illum mollitia recusandae laudantium delectus temporibus omnis laborum sit, eum, animi adipisci illo hic dolorum optio minus consequuntur excepturi quos vel.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique illum mollitia recusandae laudantium delectus temporibus omnis laborum sit, eum, animi adipisci illo hic dolorum optio minus consequuntur excepturi quos vel.</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About