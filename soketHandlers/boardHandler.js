const boardService = require("../services/boardService.js")

module.exports = (io, socket) => {
    const boardCreate = async ({ name }) => {
        try {
            const boardEvent = await boardService.create(name)
            console.log(boardEvent)
            io.emit("boardCreated", boardEvent)
            return { boardEvent }
        } catch (e) {}
    }

    const boardGet = async ({ boardId }) => {
        try {
            const boardEvent = await boardService.getBoard(boardId)
            console.log(boardEvent)
            io.emit("boardReceived", boardEvent)

            return { boardEvent }
        } catch (e) {}
    }

    const boardSearch = async ({ title }) => {
        try {
            const boardEvent = await boardService.searchCard(title)
            console.log(boardEvent)
            io.emit("boardSerched", boardEvent)

            return { boardEvent }
        } catch (e) {}
    }
    socket.on("GET:BOARD", boardGet)
    socket.on("CREATE:BOARD", boardCreate)
    socket.on("SEARCH:BOARD", boardSearch)
}
