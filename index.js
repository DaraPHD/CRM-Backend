require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const path = require("path")
const router = require("./routers/index")
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middlewares/errorMiddleware")
const { Column } = require("./models/models")
const { Board } = require("./models/models")
const { Card } = require("./models/models")
const { Label } = require("./models/models")

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
    console.log(`Долбоеб номер: ${socket.id} присоединился`)

    // socket.on("CREATE:COLUMN", async (column) => {
    //     console.log(column)
    //     try {
    //         const columnEvent = await Column.create({
    //             name: column.name,
    //             boardId: column.boardId,
    //         })
    //         io.emit("columnCreated", columnEvent)
    //         console.log(columnEvent)
    //     } catch (error) {}
    // })

    socket.on("GET:BOARD", async ({ boardId }) => {
        try {
            const board = await Board.findOne({
                where: { id: boardId },
                include: [
                    {
                        model: Column,
                        as: "column",
                        include: [
                            {
                                model: Card,
                                as: "card",
                                include: [
                                    {
                                        model: Label,
                                        as: "label",
                                    },
                                ],
                            },
                        ],
                    },
                ],
                order: [
                    ["id", "ASC"],
                    [Column, "id", "ASC"],
                    [Column, Card, "id", "ASC"],
                    [Column, Card, Label, "id", "ASC"],
                ],
            })
            io.emit("boardGetted", board)
            console.log(board)
        } catch (e) {
            return "Ошибка получения Board"
        }
    })

    socket.on("disconnect", () => {
        console.log(`Долбоеб номер: ${socket.id} отключился`)
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

module.exports = {
    io,
}
