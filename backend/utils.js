/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken'
import config from "./config.js"

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    },
    config.JWT_SECRET
    )
}

export const isAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if(!bearerToken){
        res.status(401).send({message: 'Nu aveti access la aceasta comanda'})
    }else{
        const token = bearerToken.slice(7, bearerToken.length);
        jwt.verify(token, config.JWT_SECRET, (err, data) => {
            if(err){
                res.status(401).send({message: 'Token invalid'})
            }else{
                req.user = data;
                next();
            }
        });
    }
}