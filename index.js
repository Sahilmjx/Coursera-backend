require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT);
    console.log("Listning on port 3000");
}

main();