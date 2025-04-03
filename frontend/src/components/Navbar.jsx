import React, { useContext, useState } from 'react'
import {assets} from '../assets/frontend_assets/assets'
import {Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
     const [visible,setVisible] = useState(false);
     const {setShowSearch, getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext);

     const logout = () => {
          localStorage.removeItem('token');
          setToken('');
          setCartItems({});
          navigate('/login');
     };
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
     <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>

     <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
     <NavLink to='/' className='flex flex-col items-center gap-1'>
          <li>Home</li>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
     </NavLink>
     <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <li>COLLECTION</li>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
     </NavLink>
     <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <li>ABOUT</li>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
     </NavLink>
     <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <li>CONTACT</li>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
     </NavLink>


     </ul>
     <div className='flex items-center gap-6'>
          <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
          {/* beautiful dropdown */}
          <div className='group relative'>
               {/* login nav */}
               {/* <Link to='/login'> */}
               <img onClick={()=>token ?null :navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
               {/* </Link> */}

               {/* dropdown */}
               {token && 
               <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-6 bg-slate-100 text-gray-500 rounded'>
                         <p className='cursor-pointer hover:text-black'>My Profile</p>
                         <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                         <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
               </div>
               }
          </div>
          <Link to='/cart' className='relative'>
          <img className='w-5 min-w-5 cursor-pointer' src={assets.cart_icon} alt="" />      
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full aspect-square text-[8px]'>{getCartCount()}</p>    
          </Link>
          <img onClick={()=>setVisible(true)} className='sm:hidden w-5 cursor-pointer ' src={assets.menu_icon} alt='' />
     </div>
     {/* Sidebar menu for small screen */}
     <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div className='flex flex-col text-gray-700'>
               <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                    <p>Back</p>
               </div>
               <NavLink onClick={()=>setVisible(false)} className='py-4 pl-6 border' to='/'>HOME</NavLink>
               <NavLink onClick={()=>setVisible(false)} className='py-4 pl-6 border' to='/collection'>COLLECTION</NavLink>
               <NavLink onClick={()=>setVisible(false)} className='py-4 pl-6 border' to='/about'>ABOUT</NavLink>
               <NavLink onClick={()=>setVisible(false)} className='py-4 pl-6 border' to='/contact'>CONTACT</NavLink>

          </div>
     </div>
    </div>
  )
}

export default Navbar