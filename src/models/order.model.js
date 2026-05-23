import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    },

    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    quantity: {
        type: Number,
        default: 1
    },

    shippingAddress: {
        fullName: String,
        phone: String,
        address: String,
        city: String,
        postalCode: String,
        country: String
    },

    status: {
        type: String,
        default: "pending"
    }

}, { timestamps: true });

export const OrderModel = mongoose.model("Order", OrderSchema);