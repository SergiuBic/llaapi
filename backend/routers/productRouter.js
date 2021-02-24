/* eslint-disable no-underscore-dangle */
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.put("/:id", isAuth, expressAsyncHandler(async (req, res)=>{
    const product = await Product.findById(req.params.id);

     if(!product){
         res.status(404).send({
             message: 'Product not found',
         });
      }else{
        product.name = req.body.name
        product.category = req.body.category
        product.Brand = req.body.Brand
        product.image = req.body.image
        product.price = req.body.price
        product.desc = req.body.desc
        product.countInStock = req.body.countInStock
        product.numReviews = req.body.numReviews
        const updatedProduct = await product.save();

          res.send({
              _id: updatedProduct.id,
              category: updatedProduct.category,
              Brand: updatedProduct.Brand,
              image: updatedProduct.image,
              price: updatedProduct.price,
              desc: updatedProduct.desc,
              countInStock: updatedProduct.countInStock,
              
          })
      }
         })
 );

productRouter.get('/show', expressAsyncHandler(async(req, res) => {

    const products = await Product.find({});
    
    if(products){
        res.send(products);
    }else{
        res.status(404).send({message: "Produsul nu a fost gasit!"});
    }
  }));

productRouter.get('/:id', expressAsyncHandler(async(req, res) => {

    const product = await Product.findById(req.params.id)
    
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message: "Produsul nu a fost gasit!"});
    }
  }));

productRouter.post('/create', isAuth,expressAsyncHandler(
    async (req, res)=>{
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        Brand: req.body.Brand,
        image: req.body.image,
        price: req.body.price,
        desc: req.body.desc,
        rating: 0,
        numReviews: 0,
        countInStock: req.body.countInStock,
    
    });
    const createdProduct = await product.save();
    res.status(201).send({message: 'Produsul a fost creat cu success!', product: createdProduct})
})
);

productRouter.delete('/:id', isAuth, expressAsyncHandler(async(req,res)=> {
    const product = await Product.findOneAndDelete(req.params.id);
    console.log(req.params.id)
    if(product){
        res.status(201).send({message: 'The product was deleted'});
    }else{
        res.status(404).send({message: "Product not found"});
    }
}));


export default productRouter;
