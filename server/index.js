import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import home from "./routes/home.js";

dotenv.config();
mongoose.connect(process.env.ATLAS_URI);

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
//routes
app.use("/login", auth);
app.use("/", home);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
