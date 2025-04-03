import userModel from '../models/userModel.js'
// add products to user cart
const addToCart = async(req,res)=>{

    try{
        const { userId, itemId, size} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userModel.cartData;

        if(cartData[itemId]){
            if(cartData[itemId],[size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }else{
            cartData[itemId]={}
            cartData[itemId][size]=1;
        }
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success:true, message:'Product added to cart'})

       }   catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }

}


// Update user cart
const updateCart = async(req,res)=>{
    try{
        const { userId, itemId, size, quantity} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userModel.cartData;

        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success:true, message:'Product updated in cart'})

    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }

}


// get user cart
const getUserCart = async(req,res)=>{
    try{
        const {userId} =req.body
        const userData = await userModel.findById(userId)
        let cartData = await userModel.cartData;

        res.json({success:true, cartData})
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }


}

export {getUserCart, updateCart, addToCart}