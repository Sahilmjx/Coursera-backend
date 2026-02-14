const { Router } = require("express");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const userRouter = Router();

userRouter.post("/signup", async function(req, res){

    const { email, password, firstname, lastname } = req.body;

    await userModel.create({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    });

    res.json({
        message : "Signup successful"
    })

});

userRouter.post("/signin", async function(req, res){

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email,
        password: password
    });

    if(user){
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_USER_SECRET);

        res.json({
            token: token
        });
    } else{
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
    
})

userRouter.get("/purchases", function(req, res){
    
})

module.exports = {
    userRouter: userRouter
}