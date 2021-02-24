/* eslint-disable no-underscore-dangle */
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get("/", expressAsyncHandler(async (req, res) => {
 
    const users = await User.find({})
    res.send(users)

})
);


userRouter.post("/signin", expressAsyncHandler(async (req, res)=>{
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(!signinUser){
        res.status(401).send({
            message: 'Email-ul sau Parola dumneavoastra sunt gresite, incercati din nou!',
        });
     }else{
         res.send({
             _id: signinUser._id,
             name: signinUser.name,
             email: signinUser.email,
             isAdmin: signinUser.isAdmin,
             token: generateToken(signinUser),

         })
     }
        })
);

userRouter.post("/register", expressAsyncHandler(async (req, res)=>{
   const user = new User({
       name: req.body.name,
       email: req.body.email,
       password: req.body.password,
   });
   const createdUser = await user.save();
    if(!createdUser){
        res.status(401).send({
            message: 'Va rugam sa verificati datele introduse, email sau parola incorecta',
        });
     }else{
         res.send({
             _id: createdUser._id,
             name: createdUser.name,
             email: createdUser.email,
             isAdmin: createdUser.isAdmin,
             token: generateToken(createdUser),

         })
     }
        })
);

userRouter.put("/:id", isAuth, expressAsyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id);

     if(!user){
         res.status(404).send({
             message: 'Utilizator inexistent',
         });
      }else{
          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;
          user.password = req.body.password || user.password;
          const updatedUser = await user.save();

          res.send({
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              isAdmin: updatedUser.isAdmin,
              token: generateToken(updatedUser),
 
          })
      }
         })
 );
export default userRouter;
