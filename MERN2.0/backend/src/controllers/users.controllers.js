const userCtrl = {};

const User = require('../models/User');

userCtrl.getUsers = async (req,res) =>{
    const users = await User.find();
    res.json(users);
} 

userCtrl.createUsers = async (req,res) =>{
    const {username} = req.body;
    const newUser = new User({username});
    await newUser.save();
    res.json('User Created');
} 

userCtrl.updateUser = async (req,res) =>{
    const { username} = req.body;
    await User.findOneAndUpdate({_id :req.params.id}, {username});
    res.json({message: 'User Updated'});
} 

userCtrl.deleteUser = async (req,res) =>{
    await User.findByIdAndDelete(req.params.id)
    res.json({message: 'User Deleted'});
} 

userCtrl.getUser = async (req,res)=>{
    const user = await User.findById(req.params.id);
    res.json(user);
} 

module.exports = userCtrl;