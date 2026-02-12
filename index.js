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
    await mongoose.connect("mongodb+srv://admin:EtGfWYdiovU7bG4w@cluster0.ia3oiue.mongodb.net/coursera-app");
    app.listen(3000);
    console.log("Listning on port 3000");
}

main();