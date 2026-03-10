import express from "express";
import {
  AddProducts,
  GetProducts,
} from "../controllers/products.controller.js";
import { FindUser, UserLogin, UserRegister } from "../controllers/user.auth.js";
import {
  AuthenticationUsers,
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
  upload.single("ProductPicture"),
  AddProducts,
);
router.get("/get/products", AuthenticationUsers, GetProducts);

export { router };
