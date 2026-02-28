import express from 'express'
import { AddProducts, GetProducts } from '../controllers/products.controller.js'
import { UserLogin, UserRegister } from '../controllers/user.auth.js';

const router = express.Router()

// User Authentication
router.post('/register', UserRegister)
router.post('/login', UserLogin)

// Products Api 
router.post('/add/product', AddProducts);
router.get('/get/products', GetProducts)

export {
    router
}