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
  console.log(`Example app listening on port ${ENV.PORT || 3000}`);
});


// let arr = ['eat','tea','sad','asd','pom'];

// function ArraySorting(arr){
//   console.log('arr', arr);
//   let matchString = [];
//   let notMatch = []
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === arr[i] + 1) {
//       matchString.push(arr[i]);
//     }else{
//       notMatch.push(arr[i])
//     }
//   }
//   console.log('match string', matchString);
//   console.log('notMatch', notMatch);
// }
// console.log(ArraySorting(arr));
