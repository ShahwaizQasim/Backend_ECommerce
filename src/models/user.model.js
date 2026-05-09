

import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["admin", "customer", "seller"],
        default: "customer"
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
  isSellerApproved: {
  type: Boolean,
  default: false
}

}, {
    timestamps: true
});

export const UserModel = mongoose.model('Users', UserSchema);