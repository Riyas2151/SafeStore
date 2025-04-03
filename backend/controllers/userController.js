// import validator from "validator";
// import bcrypt from "bcrypt";
// import jwt from 'jsonwebtoken';
// import userModel from "../models/userModel.js";

// const createToken = (id) =>{
//      return jwt.sign({id},process.env.JWT_SECRET)
// }

// // route for user login
// const loginUser = async (req,res) =>{

//      try{
//           const {email,password}=req.body;
//           const user =await userModel.findOne({email});
//           if(!user){
//                return res.json({success:false,message:"User not found"})
//           }

//           const isMatch = await bcrypt.compare(password,user.password);
//           // const isMatch = await bcrypt.compare(password,'123456789');


//           if(isMatch){
//                const token = createToken(user._id);
//                res.json({success:true,token})
//           }
//           else{
//                res.json({success:false,message:"Invalid Credentials"});
//           }
//      }
//      catch(error){
//           console.log(error);
//           res.json({success:false,message:error.message});
          
//           }

// }

// // route for user registration

// const registerUser = async (req,res) =>{

//      // res.json({msg:"Radhe Regester Api Working"})
//      try{
//           const {name,email,password}=req.body;
//           // validate the data
//           // check whether user exist already or not
//           const exists = await userModel.findOne({email});
//           if(exists){
//                return res.json({success:false,message:`User ${name} already exists`})
//           }
//           // validate correct email and strong pass
//           if(!validator.isEmail(email)){
//                return res.json({success:false,message:"Invalid email address"})

//           }
//           if(password.length < 8){
//                return res.json({success:false,message:"Please enter strong password"})
//           }
//           // hashing user password
//           const salt = await bcrypt.genSalt(10)
//           const hashedPassword = await bcrypt.hash(password,salt)

//           const newUser = new userModel({
//                name,
//                email,
//                password:hashedPassword
//           })

//           const user = await newUser.save()
//           const token = createToken(user._id)
//           res.json({success:true,token})

//      }
//      catch(error){
//           console.log(error);
//           res.json({success:false,message:error.message})
          

//      }

// }

// // route for admin login
// const adminLogin= async (req,res) =>{

//      try{
//           const {email,password}=req.body;
//           const user = await userModel.findOne({email});
//           if(email=== process.env.ADMIN_EMAIL && password=== process.env.ADMIN_PASSWORD){
//                const token = jwt.sign(email+password,process.env.JWT_SECRET);
//                res.json({success:true,token})
//           }
//           else{
//                res.json({success:false,message:"Invalid Credentials"});
//           }

// }
// catch(error){
//      console.log(error);
//      res.json({success:false,message:error.message})
// };
// }

// export {loginUser,registerUser,adminLogin}

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// ✅ Function to create a token
const createToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// 🚀 User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id, user.isAdmin);
            res.json({
                success: true,
                token,
                isAdmin: user.isAdmin, // ✅ Return admin status
            });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// 🚀 User Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin = false } = req.body; // ✅ Allow admin creation

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: `User ${name} already exists` });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password should be at least 8 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            isAdmin, // ✅ Save isAdmin status
        });

        const user = await newUser.save();
        const token = createToken(user._id, user.isAdmin);

        res.json({
            success: true,
            token,
            isAdmin: user.isAdmin, // ✅ Return isAdmin status
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// 🚀 Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user || !user.isAdmin) {
            return res.json({ success: false, message: "Unauthorized: Not an admin" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id, true);
            res.json({ success: true, token, isAdmin: true });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, adminLogin };
