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
      // ProductPicture:{

      // },
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
