import express from "express";
import {
  AddProducts,
  GetProducts,
  GetSingleProduct,
} from "../controllers/products.controller.js";
import { FindUser, UserLogin, UserRegister } from "../controllers/user.controller.js";
import {
  AuthenticationUsers,
  requireSeller,
  VerifyUser,
} from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

// User Authentication
router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/UserInfo", VerifyUser, FindUser);

// Products Api
router.post(
  "/add/product",
  AuthenticationUsers,
  requireSeller,
  upload.single("ProductPicture"),
  AddProducts,
);
router.get("/get/products-get", AuthenticationUsers, GetProducts);
router.get("/get/products/:id", AuthenticationUsers, GetSingleProduct);

export { router };
