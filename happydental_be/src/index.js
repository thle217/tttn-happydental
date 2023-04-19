import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import initWebRoutes from "./routes/web";
import connect from "./config/connectDB";
require("dotenv").config();

let app = express();

app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

initWebRoutes(app);
connect();

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Backend Happy Dental is running at port ${port}`);
});