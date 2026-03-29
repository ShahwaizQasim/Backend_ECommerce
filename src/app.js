import express from "express";
import { ENV } from "./config/constant.js";
import connectDB from "./config/dbConnect.js";
import { router } from "./routes/index.js";
import cors from 'cors'

const app = express();

app.use(express.json());

app.use(cors())
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

app.use('/api', router)

app.listen(ENV.PORT, () => {
  console.log(`Example app listening on port ${ENV.PORT}`);
});
