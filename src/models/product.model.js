import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    ProductName: {
      type: String,
      required: true,
      trim: true,
    },
    ProductPrice: {
      type: String,
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
  },
  {
    timestamps: true,
  },
);

export const ProductModel = mongoose.model("Product", ProductSchema);
