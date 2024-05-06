import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./src/routers/user.router.js";
import adminRouter from "./src/routers/admin.router.js";
const app = express();
const DB = "mongodb+srv://trangmiumiutrang:DJlsWy4SX3gqVG94@cluster0.sgotfhp.mongodb.net/";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

mongoose.connection.on("error", (err) => {
  console.error("Connect fail:", err);
});
dotenv.config();
const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`)
);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
