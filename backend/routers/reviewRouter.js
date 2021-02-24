/* eslint-disable no-underscore-dangle */
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import { isAuth } from '../utils.js';

const reviewRouter = express.Router();

reviewRouter.get('/', expressAsyncHandler(async(req, res) => {

    const review = await Review.find({})
    
    if(review){
        res.send(review);
    }else{
        res.status(404).send({message: "Produsul nu a fost gasit!"});
    }
  }));

reviewRouter.post('/', isAuth,expressAsyncHandler(
    async (req, res)=>{
    const review = new Review({
        username: req.body.username,
        attrParent: req.body.attrParent,
        content: req.body.content,
    });
    const createdreview = await review.save();
    res.status(201).send({message: 'Reviw-ul a fost adaugat cu success!', review: createdreview})
})
);

reviewRouter.delete('/:id', isAuth, expressAsyncHandler(async(req,res)=> {
    const review = await Review.findOneAndDelete(req.params.id);
    console.log(req.params.id)
    if(review){
        res.status(201).send({message: 'The review was deleted'});
    }else{
        res.status(404).send({message: "review not found"});
    }
}));


export default reviewRouter;
