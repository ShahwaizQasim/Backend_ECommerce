import express from "express";
import { ENV } from "./config/constant.js";
import connectDB from "./config/dbConnect.js";
import { router } from "./routes/index.js";
import cors from "cors";
import Stripe from "stripe";
import { Server } from "socket.io";
import { createServer } from "http";
import rateLimit from "express-rate-limit";

const app = express();

app.use(express.json());

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests, please try again later.",
});

// Sab routes par apply hoga
app.use(limiter);

const server = createServer(app);

export const io = new Server(server, {
  transport: ["websocket"],
  cors: {
    origin: ENV.CLIENT_URL,
    methods: ["GET", "POST", "PATCH"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-room", (userId) => {
    socket.join(userId);
    console.log(`User joined room: ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

const stripe = new Stripe(ENV.STRIPE_SECRET_KEY);

// mongoose.connection.on("connected", () => {
//   console.log("Database connected");
// });

// mongoose.connection.on("error", (err) => {
//   console.log("Database not connected", err);
// });
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

app.post("/create-checkout-session", async (req, res) => {
  const { product, userId } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",

    success_url: `${ENV.CLIENT_URL}/success`,
    cancel_url: `${ENV.CLIENT_URL}/cancel`,

    metadata: {
      productId: product._id,
      sellerId: product.sellerId,  // 🔥 key
      userId: userId,
      quantity: 1,
    },
  });

  res.json({ url: session.url });
});

app.post("/stripe-webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {

    const event = JSON.parse(req.body);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const { productId, sellerId, userId, quantity } = session.metadata;

      // 🔥 ORDER CREATE HERE (MOST IMPORTANT)
      await Order.create({
        productId,
        sellerId,
        buyerId: userId,
        quantity,
        amount: session.amount_total / 100,
        paymentStatus: "paid",
        stripeSessionId: session.id,
      });

      // optional: seller earnings update
      await Seller.findByIdAndUpdate(sellerId, {
        $inc: { totalEarnings: session.amount_total / 100 }
      });
    }

    res.json({ received: true });
  }
);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message
  });
});


server.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
