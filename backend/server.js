import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import resultRouter from "./routes/resultRoutes.js";

const app = express();


// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", userRouter);
app.use("/api/results", resultRouter);


app.get("/", (req, res) => {
  res.send("API WORKING");
});


app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on http://localhost:${process.env.VITE_API_URL }`);
});

