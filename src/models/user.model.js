

import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
   userName: {
    type: String,
    required:true,
    trim:true
   },
   email:{
    type:String,
    unique:true,
    required:true,
    lowercase:true,
    trim:true
   },
   password:{
    type:String,
    required:true,
    trim:true
   },
   
},{
    timestamps:true
});

export const UserModel = mongoose.model('Users', UserSchema);