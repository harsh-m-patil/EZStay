const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullname:{
        type : String,
        required : true
       },
    username:{
        type : String,
        required : true,
        unique : true
    },
    email:{
        type : String,
        required : true
       },
       
    phone:{
        type : String,
        required : true
       },
    dob:{
        type : Date,
        required : true
    
       },
    password:{
        type : String,
        required : true 
    },
    token:{
        type : String,
        default : ''
    },
    role:{
        type : String,
    }
})

module.exports = mongoose.model('User', userSchema);