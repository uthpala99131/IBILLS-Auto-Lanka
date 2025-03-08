const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    gmail:{
        type:String,
        required: true,
    },
    userName:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    cpassword:{
        type:String,
        required: true,
    }
});

module.exports = mongoose.model(
    "userModel",
    userSchema
)