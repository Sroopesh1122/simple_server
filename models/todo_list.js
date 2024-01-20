const mongoose = require('mongoose'); 

var todoListSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    }
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('todo_list', todoListSchema);