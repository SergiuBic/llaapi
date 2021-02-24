/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import config from './config.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import productRouter from './routers/productRouter.js';
import reviewRouter from './routers/reviewRouter.js';

mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(()=>{
  console.log("Connected to MongoDB.")
}).catch((error) => {
  console.log(error.reason);
})
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);
app.use('/api/reviews', reviewRouter);
app.get('/api/paypal/clientId', (req,res) => {
  res.send({clientId: config.PAYPAL_CLIENT_ID});
})



app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError'? 400: 500;
  res.status(status).send({message: err.message});
})
app.listen(process.env.PORT || 5000, () => {
  console.log('Running');
});
