require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const router = require("./routers/index");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}))
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);

app.use(errorMiddleware);
// app.get("/", (req, res) => {
//     res.status(200).json({ message: "Success" });
// });

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e.message);
    }
};

start();


