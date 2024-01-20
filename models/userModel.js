const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type:String
    },
    image:{
        type:String,
        default:"https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=2048x2048&w=is&k=20&c=-g-2McKwLpsyYHPDT3Wf1oo2ppTmNxq797heiFJmwSM="
    },
    todo_list:[]
},{
    timeseries:true
});

userSchema.pre("save",async function (next){
    if(!this.isModified("password"))
    {
        next();
    }
    const salt= bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.isPasswordMatched = async function(enteredPassword){
   return bcrypt.compareSync(enteredPassword,this.password)
}


module.exports = mongoose.model('user', userSchema);