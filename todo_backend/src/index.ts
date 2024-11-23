import dotenv from "dotenv";
import connectDB from "./DB/db-index";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import TodoRoutes from "./Routes/TodoRoutes";

const app = express();

dotenv.config({
  path: "./.env",
});

app.use(
  cors({
    origin: process.env.CROS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const port = process.env.PORT || 1156;

// For Call the routes :
app.use("/api/v1", TodoRoutes);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server at running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });
