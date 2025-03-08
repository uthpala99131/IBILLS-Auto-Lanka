const User = require('../Model/userModel');

 const getAllUsers = async (req, res, next) =>{

    let users;
    try {
        users = await User.find();
    }catch(err){
        console.log(err);
    }

    if(!users){
        return res.status(404).json({message: "user not found"})
    }

    //display all users
    return res.status(200).json({users});
 };

// insert
 const addUsers = async(req, res, next) =>{
    const{name,gmail,userName,password,cpassword} = req.body;

    let users;
    try{
        users = new User({name,gmail,userName, password, cpassword});
        await users.save();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"unable to add users"});
    }
    return res.status(200).json({users})
 };


 const getById = async(req, res, next) =>{
    const id = req.params.id;

    let user;
    try{
        user = await User.findById(id);
    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({user})
 };


 //update
 const updateUser = async(req, res, next) =>{
    const id = req.params.id;
    const{name,gmail,userName,password,cpassword} = req.body;

    let users;
    try{
        users = await User.findByIdAndUpdate(id,
        {name:name, gmail: gmail, userName: userName, password: password,cpassword:cpassword});
        users = await users.save();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"Update not found"});
    }
    return res.status(200).json({users})
 };


 //delete
 const deleteUser = async(req, res, next) =>{
    const id = req.params.id;
   
    let users;
    try{
        users = await User.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"Delete not found"});
    }
    return res.status(200).json({users})
 };

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;