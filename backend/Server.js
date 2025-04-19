import express from 'express'

import cors from 'cors'
import 'dotenv/config.js'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
// const contractRoutes = require('./routes/contract.js');
// import contractRoutes from './routes/contract.js';
import contractRoutes from './routes/contract.js';

// import connectDB from './config/mongodb.js'

// App Config

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/cart',cartRouter)
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/contract', contractRoutes);
app.get('/',(req,res)=>{
     res.send('Radhe Radhe ji api workings')
})

app.listen(port,()=> console.log('Radhe Server started on port: '+port))