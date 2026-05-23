import { ProductModel } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const GetSellerProducts = async (req, res) => {
  try {
    let param = req.query;
    if (param.ProductName) {
      param.ProductName = {
        $regex: param.ProductName,
        $options: "i", // case-insensitive
      };
    }

    const page = Number(param.page) || 1;
    const limit = Number(param.limit) || 3;
    const skip = (page - 1) * limit;

    delete param.page;
    delete param.limit;

    const filter = {
      ...param,
      ProductSellerId: req.user._id,
    }

    const GetAllProducts = await ProductModel.find(filter)
      .skip(skip)
      .limit(limit);

    const total = await ProductModel.countDocuments(filter);

    res.status(200).send({
      status: 200,
      message: "Products Fetch Successfully",
      products: GetAllProducts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
    });
  } catch (error) {
    console.log("error+++", error);
    if (res.headersSent) return;
    res
      .status(500)
      .send({ status: 500, message: error.message || "", error: true });
  }
};

const GetAllProducts = async (req, res) => {
  try {
    let param = req.query;
    if (param.ProductName) {
      param.ProductName = {
        $regex: param.ProductName,
        $options: "i", // case-insensitive
      };
    }

    const page = Number(param.page) || 1;
    const limit = Number(param.limit) || 3;
    const skip = (page - 1) * limit;

    delete param.page;
    delete param.limit;

    const filter = {
      ...param,
    }

    const GetAllProducts = await ProductModel.find(filter)
      .skip(skip)
      .limit(limit);

    const total = await ProductModel.countDocuments(filter);

    res.status(200).send({
      status: 200,
      message: "Products Fetch Successfully",
      products: GetAllProducts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
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
      ProductSellerId: req.user._id,
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

const GetSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res
        .status(404)
        .send({ status: 404, message: "Product not found", error: true });
    }
    res.status(200).send({
      status: 200,
      message: "Products Fetch Successfully",
      products: product,
    });
  } catch (error) {
    console.log("error", error.message);
    res
      .status(500)
      .send({ status: 500, message: error.message || "", error: true });
  }
};

export { GetSellerProducts, AddProducts, GetSingleProduct, GetAllProducts };
