import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true , 
        trim : true
    },
    email : {
        type : String , 
        required : true, 
        unique : true, 
        trim : true, 
        lowercase : true,
    },
    password : {
        type : String , 
        required : true
    },
    preferences : {
        type: [String], 
        enum: ['promotion', 'order_updates', 'recommendations', 'user_updates'],
        default: ["order_updates" , "recommendations" , "user_updates", "promotion"],
    }
} , { timestamps: true })


const User = mongoose.model('User' , userSchema);

export default User;