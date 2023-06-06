const io = require("../index").io
const columnService = require("../services/columnService.js")

io.on("Create", (socket) => {
    socket.on("COLUMN:CREATE", async (column) => {
        console.log(column)
        try {
            const columnEvent = await columnService.create({
                name: column.name,
                boardId: column.boardId,
            })
            io.emit("columnCreated", columnEvent)
            console.log(columnEvent)
        } catch (error) {}
    })
    socket.emit("COLUMN:CREATE", column)
})

io.on("GetOne", (socket) => {
    socket.on("COLUMN:GETONE", async ({ id }) => {
        console.log(column)
        try {
            const columnEvent = await columnService.getOne(id)
            io.emit("columnTaken", columnEvent)
            console.log(columnEvent)
        } catch (error) {}
    })
    socket.emit("COLUMN:GETONE", column)
})

io.on("GetAll", (socket) => {
    socket.on("COLUMN:GETALL", async () => {
        console.log(column)
        try {
            const columnEvent = await columnService.getAll()
            io.emit("columnsTaken", columnEvent)
            console.log(columnEvent)
        } catch (error) {}
    })
    socket.emit("COLUMN:GETALL", column)
})

io.on("UpdateOne", (socket) => {
    socket.on("COLUMN:UPDATEONE", async (column) => {
        console.log(column)
        try {
            const columnEvent = await columnService.updateOne({
                name: column.name,
                boardId: column.boardId,
            })
            io.emit("columnUpdated", columnEvent)
            console.log(columnEvent)
        } catch (error) {}
    })
    socket.emit("COLUMN:UPDATEONE", column)
})

io.on("DeleteOne", (socket) => {
    socket.on("COLUMN:DELETEONE", async ({ id }) => {
        console.log(column)
        try {
            const columnEvent = await columnService.deleteOne(id)
            io.emit("columnDeleted", columnEvent)
            console.log(columnEvent)
        } catch (error) {}
    })
    socket.emit("COLUMN:DELETEONE", column)
})
