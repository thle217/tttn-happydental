import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import connect from "./config/connectDB";
import authRoutes from "./routes/auth";
import roleRoutes from "./routes/role";
import employeeRoutes from "./routes/employee";
import customerRoutes from "./routes/customer";
import categoryRoutes from "./routes/category";
require("dotenv").config();

let app = express();

app.use(cors({
    origin: [process.env.REACT_ADMIN_URL, process.env.REACT_CLIENT_URL],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

//ROUTES
app.get("/", (req, res) => res.send("Backend Happy Dental"));
app.use("/api/auth", authRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/category", categoryRoutes);

connect();

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Backend Happy Dental is running at port ${port}`);
});