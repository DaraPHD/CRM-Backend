require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const path = require("path")
const router = require("./routers/index")
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middlewares/errorMiddleware")
const PORT = process.env.PORT || 5000
const app = express()
const httpServer = require("http").createServer(app)
const io = require("socket.io")(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    },
})
io.on("connection", (socket) => {
    console.log("user connected")

    socket.on("CREATE:COlUMN", (data) => {
        socket.join(data)
        socket.emit("message", {"Пользователь создал колонку"})
    })

    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
})

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
)
app.use(express.json())
app.use(fileUpload({}))
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, "static")))
app.use("/api", router)
app.use(errorMiddleware)
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        httpServer.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e.message)
    }
}
start()
