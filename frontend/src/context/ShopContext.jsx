import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export const ShopContext =createContext();

const ShopContextProvider =(props)=>{
     const currency = '$';
     const delivery_fee =10;
     const backendUrl = import.meta.env.VITE_BACKEND_URL
     const [search,setSearch]= useState('');
     const [showSearch,setShowSearch]= useState(false);
     const [cartItems,setCartItems]=useState({});
     const [products,setProducts]=useState([]);
     const [token,setToken]=useState('');
     const navigate = useNavigate();

     const addToCart =async(ItemId,size)=>{
          if(!size){
               toast.error('Select Product Size');
               return;
          }
          let cartData =structuredClone(cartItems);

          if(cartData[ItemId]){
               if(cartData[ItemId][size]){
                    cartData[ItemId][size]+=1;
                         }
          else{
               cartData[ItemId][size]=1;
          }
     }
     else{
          cartData[ItemId]={};
          cartData[ItemId][size]=1;
     }
     // console.log("Backend URL:", backendUrl);

     setCartItems(cartData);

     if(token){
          try{
               await axios.post(backendUrl + '/api/cart/add',{ItemId,size},{headers:{token}})
     }
     catch(error){
          console.log(error);
          toast.error(error.message)
     }
     }
}
const getCartCount = ()=>{
     let totalCount=0;
     for(const items in cartItems){
          for (const item in cartItems[items]){
               try{
                    if(cartItems[items][item]>0){
                         totalCount+=cartItems[items][item];
                    }
               }catch(error){

               }
          }
     }
     return totalCount;
}
const updateQuantity =async (ItemId,size,quantity)=>{
     let cartData= structuredClone(cartItems);

     cartData[ItemId][size]=quantity;

     setCartItems(cartData);

}

const getCartAmount = () =>{
     let totalAmount=0;
     for(const items in cartItems){
          let itemInfo =products.find((product)=>product._id==items);
          for(const item in cartItems[items]){
               try{
                    if(cartItems[items][item]>0){
                         totalAmount+=itemInfo.price*cartItems[items][item];
                    }
               }catch(error){

               }
          }
     }
     return totalAmount;
}

const getProductsData = async ()=>{
     try{
          const response = await axios.get(backendUrl + '/api/product/list')
          if(response.data.success){
               setProducts(response.data.products)
          }else{
               toast.error(response.data.message)
          }
     }
     catch(error){
          console.log(error);
          toast.error(error.message)
     }
}

useEffect(()=>{
     getProductsData()
},[])

useEffect(()=>{
     if(!token && localStorage.getItem('token')){
          setToken(localStorage.getItem('token'));

     }
},[])
// console.log("Backend URL:", backendUrl);

// useEffect(() => {
//      console.log("Updated Products State:", products);
//  }, [products]);
     // useEffect(()=>{
     //      console.log(cartItems);
          
     // },[cartItems])
     const value ={
          products,delivery_fee,currency,
          search,setSearch,
          showSearch,setShowSearch,
          cartItems,addToCart,setCartItems,
          getCartCount,updateQuantity,
          getCartAmount,navigate,
          backendUrl,setToken,token
          }
     return(
          <ShopContext.Provider value={value}>
               {props.children}
          </ShopContext.Provider>
     )
}
export default ShopContextProvider;