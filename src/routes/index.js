import express from "express";
import {
  AddProducts,
  GetAllProducts,
  GetSellerProducts,
  GetSingleProduct,
} from "../controllers/products.controller.js";
import { FindUser, UserLogin, UserRegister } from "../controllers/user.controller.js";
import {
  AuthenticationUsers,
  requireSeller,
  VerifyUser,
} from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { CreateOrder, OrdersGet } from "../controllers/orders.controller.js";

const router = express.Router();

// User Authentication
router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/UserInfo", VerifyUser, FindUser);

// Products Api
router.post(
  "/add/product",
  VerifyUser,
  requireSeller,
  upload.single("ProductPicture"),
  AddProducts,
);
router.get("/get/products-get", VerifyUser, GetSellerProducts);
router.get("/get/products-get", VerifyUser, GetSellerProducts);
router.get("/get/all-products", GetAllProducts);
router.get("/get/products/:id", VerifyUser, GetSingleProduct);

// Orders Api 
router.post("/create/order", VerifyUser, AuthenticationUsers, CreateOrder);
router.get("/get/orders", VerifyUser, AuthenticationUsers, OrdersGet);
export { router };
