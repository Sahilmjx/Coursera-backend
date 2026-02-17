const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middleware/admin");
const jwt = require("jsonwebtoken");
require('dotenv').config();


adminRouter.post("/signup", async function(req, res){

    const { email, password, firstname, lastname } = req.body;
    
        await adminModel.create({
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        });
    
        res.json({
            message : "Signup successful"
        })

})

adminRouter.post("/signin", async function(req, res){

    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email: email,
        password: password
    });

    if(admin){
        const token = jwt.sign({
            id: admin._id
        }, process.env.JWT_ADMIN_SECRET);

        res.json({
            token: token
        });
    } else{
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
    
})

adminRouter.post("/course", adminMiddleware, async function(req, res){

    const adminId = req.userId;

    const { title, description, price, imageurl } = req.body;

    const course = await courseModel.create({
        title, description, price, imageurl, creatorId: adminId
    });

    res.json({
        message: "Course created",
        courseId: course._id
    })

})

adminRouter.put("/course", function(req, res){

})

adminRouter.get("/course/bulk", function(req, res){

})

module.exports = {
    adminRouter: adminRouter
};