// import jwt from 'jsonwebtoken';

// const adminAuth = async(req,res,next)=>{
//      try{
//           const {token} = req.headers
//           if(!token){
//                return res.json({success:false,message:"Not Authorized Login Again"})
//           }
//           const token_decode =jwt.verify(token,process.env.JWT_SECRET);
//           if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
//                return res.json({success:false,message:"Not Authorized Login Again"})
//           }
//           next()
//      }
//      catch(error){
//           res.json({success:false,message:error.message})
//           }

// }

// export default adminAuth;

import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization; // ✅ Use 'Authorization' instead of 'token'
        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.isAdmin) {  // ✅ Proper admin check
            return res.json({ success: false, message: "Access Denied: Admins Only" });
        }

        req.user = decoded; // ✅ Store user info in request
        next();
    } catch (error) {
        res.json({ success: false, message: "Invalid or Expired Token" });
    }
};

export default adminAuth;
