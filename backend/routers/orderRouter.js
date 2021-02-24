/* eslint-disable no-underscore-dangle */
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();
orderRouter.get('/orders', isAuth, expressAsyncHandler(async(req,res)=> {
    const orders = await Order.find({})
    res.send(orders)
 
}))

orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req,res)=>{
    const orders = await Order.find({
        user: req.user._id
    })
    res.send(orders);
}))


orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req,res)=> {
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message: "Comanda nu a fost gasita!"});
    }
}))

orderRouter.post('/', isAuth,expressAsyncHandler( async (req, res)=>{
    const order = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        

    });
    const createdOrder = await order.save();
    res.status(201).send({message: 'Comanda creata cu success!', order: createdOrder})
}));
orderRouter.put("/:id", isAuth, expressAsyncHandler(async (req, res)=>{
    const order = await Order.findById(req.params.id);

     if(!order){
         res.status(404).send({
             message: 'Order not found',
         });
      }else{
          order.shipping.address = req.body.address;
          order.shipping.nameShipping = req.body.nameShipping;
          order.shipping.phone = req.body.phone;
          order.shipping.city = req.body.city;
          const updatedOrder = await order.save();

          res.send({
              _id: updatedOrder.id,
              address: updatedOrder.shipping.address,
              phone: updatedOrder.shipping.phone,
              city: updatedOrder.shipping.city,
              nameShipping: updatedOrder.shipping.nameShipping,
              
          })
      }
         })
 );

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment.paymentResult = {
            payerID: req.body.payerID,
            payementID: req.body.payementID,
            orderID: req.body.orderID,
       
        }
        const updatedOrder = await order.save();
        res.send({message: 'Plata s-a efecutat cu success!',order: updatedOrder})
    }else{
        res.status(404).send({message: 'Comanda nu a fost gasita!'})
    }
}))

orderRouter.delete('/:id', isAuth, expressAsyncHandler(async(req,res)=> {
    const order = await Order.findOneAndDelete(req.params.id);
    if(order){
        res.status(201).send({message: 'The order was deleted'});
    }else{
        res.status(404).send({message: "Comanda nu a fost gasita"});
    }
}))

export default orderRouter;