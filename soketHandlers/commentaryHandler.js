const commentaryService = require("../services/commentaryService.js")

module.exports = (io, socket) => {
    const commentaryCreate = async ({ content, cardId, userId }) => {
        try {
            const commentaryEvent = await commentaryService.create(
                content,
                cardId,
                userId
            )
            console.log(commentaryEvent)
            io.emit("commentaryCreated", commentaryEvent)
            return { commentaryEvent }
        } catch (e) {}
    }

    const commentaryCreateReply = async ({
        userId,
        content,
        parentId,
        username,
        id,
    }) => {
        try {
            const commentaryEvent = await commentaryService.createReply(
                userId,
                content,
                parentId,
                username,
                id
            )
            console.log(commentaryEvent)
            io.emit("replyCreated", commentaryEvent)

            return { commentaryEvent }
        } catch (e) {}
    }

    const commentaryGetOne = async ({ id }) => {
        try {
            const commentaryEvent = await commentaryService.getOne(id)
            console.log(commentaryEvent)
            io.emit("commentaryReceived", commentaryEvent)

            return { commentaryEvent }
        } catch (e) {}
    }
    const commentaryUpdateOne = async ({ content, cardId, userId, id }) => {
        try {
            const commentaryEvent = await commentaryService.updateOne(
                content,
                cardId,
                userId,
                id
            )
            console.log(commentaryEvent)
            io.emit("commentaryUpdated", commentaryEvent)

            return { commentaryEvent }
        } catch (e) {}
    }
    const commentaryDeleteOne = async ({ id }) => {
        try {
            const commentaryEvent = await commentaryService.deleteOne(id)
            console.log(commentaryEvent)
            io.emit("commentaryDeleted", commentaryEvent)

            return { commentaryEvent }
        } catch (e) {}
    }
    const commentaryGetAllCard = async ({ id }) => {
        try {
            const commentaryEvent =
                await commentaryService.getcommentaryFromColumn(id)
            console.log(commentaryEvent)
            io.emit("commentariesCardReceived", commentaryEvent)

            return { commentaryEvent }
        } catch (e) {}
    }
    socket.on("GETREPLY:COMMENTARY", commentaryCreateReply)
    socket.on("CREATE:COMMENTARY", commentaryCreate)
    socket.on("GETONE:COMMENTARY", commentaryGetOne)
    socket.on("UPDATE:COMMENTARY", commentaryUpdateOne)
    socket.on("DELETE:COMMENTARY", commentaryDeleteOne)
    socket.on("COMMENTARYCARD:COMMENTARY", commentaryGetAllCard)
}
