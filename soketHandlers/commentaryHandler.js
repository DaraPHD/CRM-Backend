const commentaryService = require("../services/commentaryService.js")

module.exports = (io, socket) => {
    const commentaryCreate = async ({ content, cardId, userId }) => {
        try {
            const commentaryEvent = await commentaryService.create(
                content,
                cardId,
                userId
            )
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
            io.emit("replyCreated", commentaryEvent)

            return { commentaryEvent }
        } catch (e) {}
    }

    const commentaryGetOne = async ({ id }) => {
        try {
            const commentaryEvent = await commentaryService.getOne(id)
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

            io.emit("commentaryDeleted", commentaryEvent)

            return "Commentary deleted successfully"
        } catch (e) {}
    }
    const commentaryGetAllCard = async ({ id }) => {
        try {
            const commentaryEvent =
                await commentaryService.getAllCardCommentary(id)

            io.emit("commentariesCardReceived", commentaryEvent)
            return { commentaryEvent }
        } catch (e) {}
    }
    socket.on("CREATEREPLY:COMMENTARY", commentaryCreateReply)
    socket.on("CREATE:COMMENTARY", commentaryCreate)
    socket.on("GETONE:COMMENTARY", commentaryGetOne)
    socket.on("UPDATE:COMMENTARY", commentaryUpdateOne)
    socket.on("DELETE:COMMENTARY", commentaryDeleteOne)
    socket.on("COMMENTARYCARD:COMMENTARY", commentaryGetAllCard)
}
