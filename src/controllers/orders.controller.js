import { OrderModel } from "../models/order.model.js";
import { ProductModel } from "../models/product.model.js";


const CreateOrder = async (req, res) => {
    try {

        let { productId, quantity, shippingAddress } = req.body;
        if (!productId) {
            res.status(400).send({ status: 400, message: "Product not found", error: true });
        }
         if (!shippingAddress) {
            res.status(400).send({ status: 400, message: "Shipping Address Information is required", error: true });
        }
        const product = await ProductModel.findById(productId);
        if (!product) {
            res.status(404).send({ status: 404, message: "Product not found", error: true });
        }
       
        let order = await OrderModel.create({
            productId,
            buyerId: req?.user._id,
            sellerId: product?.ProductSellerId,
            quantity,
            shippingAddress
        });

        res.status(200).send({
            status: 200,
            message: "Order created successfully",
            order: order
        });
    } catch (error) {
        console.log("error", error.message);

        res
            .status(500)
            .send({ status: 500, message: error.message || "", error: true });
    }

}

const OrdersGet = async (req, res) => {
    try {
        const sellerId = req.user._id;

        // Sirf us seller ke orders
        const orders = await OrderModel.find({
            sellerId: sellerId
        })
        res.status(200).send({
            status: 200,
            message: "Order Fetch Successfully",
            orders: orders
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).send({
            status: 500,
            message: "Internal Server Error" || error.message,
            error: true
        });
    }
}

export {
    CreateOrder,
    OrdersGet
}
