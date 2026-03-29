import { ProductModel } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const GetProducts = async (req, res) => {
  try {
    let param = req.query;
    if (param.ProductName) {
  param.ProductName = {
    $regex: param.ProductName,
    $options: "i", // case-insensitive
  };
}
    const GetAllProducts = await ProductModel.find(param);
    res.status(200).send({
      status: 200,
      message: "Products Fetch Successfully",
      products: GetAllProducts,
    });
  } catch (error) {
    console.log("error+++", error);
    if (res.headersSent) return;
    res
      .status(500)
      .send({ status: 500, message: error.message || "", error: true });
  }
};

const AddProducts = async (req, res) => {
  try {
    const { ProductName, ProductPrice, description } = req.body;
    if (!ProductName) {
      res
        .status(400)
        .send({ status: 400, message: "ProductName is required", error: true });
    }
    if (!ProductPrice) {
      res.status(400).send({
        status: 400,
        message: "ProductPrice is required",
        error: true,
      });
    }
    if (!description) {
      res.status(400).send({
        status: 400,
        message: "ProductPrice is required",
        error: true,
      });
    }
    const ProductPicturePath = req.file?.path;

    if (!ProductPicturePath) {
      res.status(400).send({
        status: 400,
        message: "Product Picture is required",
        error: true,
      });
    }

    const productPicture = await uploadOnCloudinary(ProductPicturePath);

    let addProducts = await ProductModel({
      ProductName,
      ProductPrice,
      ProductPicture: productPicture?.url,
      description,
    });
    addProducts = await addProducts.save();
    res.status(201).send({
      status: 201,
      message: "Products Add Successfully",
      products: addProducts,
    });
  } catch (error) {
    console.log("error", error.message);

    res
      .status(500)
      .send({ status: 500, message: error.message || "", error: true });
  }
};

export { GetProducts, AddProducts };
