import express from "express";
import { ENV } from "./config/constant.js";
import connectDB from "./config/dbConnect.js";
import { router } from "./routes/index.js";
import cors from "cors";
import Stripe from "stripe";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();

app.use(express.json());

app.use(cors());

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
  try {
    const { product } = req.body; // product = name, image, price
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
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, message: error.message || "", error: true });
    console.log(error);

  }
});

server.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
