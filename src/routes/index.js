import express from "express";
import {
  AddProducts,
  GetAllProducts,
  GetSellerProducts,
  GetSingleProduct,
} from "../controllers/products.controller.js";
import { ApproveSeller, FindUser, GetCustomers, GetSellers, UserLogin, UserRegister } from "../controllers/user.controller.js";
import {
  AuthenticationUsers,
  IsAdmin,
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
router.get("/get-sellers", VerifyUser, GetSellers);
router.get("/get-customers", VerifyUser, GetCustomers);
router.patch("/approve-seller/:sellerId", VerifyUser, IsAdmin, ApproveSeller);

// Products Api
router.post(
  "/add/product",
  VerifyUser,
  requireSeller,
  upload.single("ProductPicture"),
  AddProducts,
);
router.get("/get/products-get", VerifyUser, GetSellerProducts);
router.get("/get/all-products", GetAllProducts);
router.get("/get/products/:id", VerifyUser, GetSingleProduct);

// Orders Api 
router.post("/create/order", VerifyUser, AuthenticationUsers, CreateOrder);
router.get("/get/orders", VerifyUser, AuthenticationUsers, OrdersGet);
export { router };
