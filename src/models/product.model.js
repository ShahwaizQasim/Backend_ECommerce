import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    ProductSellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    ProductName: {
      type: String,
      required: true,
      trim: true,
    },
    ProductPrice: {
      type: Number,
      required: true,
    },
    ProductPicture: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true,
  },
);

export const ProductModel = mongoose.model("Product", ProductSchema);
