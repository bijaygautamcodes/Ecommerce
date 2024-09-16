import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/err.mware.js";
import routeLogger from "./utils/logging.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";

import morgan from "morgan";

// Config
colors.enable();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
const app = express();

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));
// config upload folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.get("/", (req, res) => res.send("API IS UP AND RUNNING"));

// Routes Start
app.use("/api/users", routeLogger("users"), userRoutes);
app.use("/api/products", routeLogger("product"), productRoutes);
app.use("/api/orders", routeLogger("orders"), orderRoutes);

app.get("*", notFound);
app.use(errorHandler);

app.listen(
    PORT,
    console.log(`Started in ${process.env.NODE_ENV}: ${PORT}`.yellow.bold)
);
