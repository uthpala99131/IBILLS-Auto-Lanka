//V7pwheoEeOqqS8yB

const express = require('express');
const mongoose = require('mongoose');
const router = require('./Route/userRoute')

const app = express();

//middleware
app.use(express.json());
app.use("/users",router);


mongoose.connect("mongodb+srv://admin:V7pwheoEeOqqS8yB@cluster0.fscu0.mongodb.net/")
.then(()=>console.log("Connected to mongoDB"))
.then(() => {
    app.listen(5000);
})

.catch((err)=> console.log((err)));