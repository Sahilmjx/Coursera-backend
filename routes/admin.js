const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");

const JWT_ADMIN_SECRET = "hfygti7643jfhg8";


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
        }, JWT_ADMIN_SECRET);

        res.json({
            token: token
        });
    } else{
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
    
})

adminRouter.post("/course", function(req, res){

})

adminRouter.put("/course", function(req, res){

})

adminRouter.get("/course/bulk", function(req, res){

})

module.exports = {
    adminRouter: adminRouter
};