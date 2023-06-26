const labelService = require("../services/labelService.js")

module.exports = (io, socket) => {
    const labelCreate = async ({ name, color }) => {
        try {
            const labelEvent = await labelService.create(name, color)

            io.emit("labelCreated", labelEvent)
            return { labelEvent }
        } catch (e) {}
    }

    const labelGet = async ({ Id }) => {
        try {
            const labelEvent = await labelService.getOne(Id)

            io.emit("labelReceived", labelEvent)

            return { labelEvent }
        } catch (e) {}
    }

    const labelGetAll = async () => {
        try {
            const labelEvent = await labelService.getAll()
            console.log(labelEvent)
            io.emit("labelsReceived", labelEvent)

            return { labelEvent }
        } catch (e) {}
    }
    const labelUpdateOne = async ({ name, color, id }) => {
        try {
            const labelEvent = await labelService.updateOne(name, color, id)
            console.log(labelEvent)
            io.emit("labelUpdated", labelEvent)

            return { labelEvent }
        } catch (e) {}
    }
    const labelDeleteOne = async ({ id }) => {
        try {
            const labelEvent = await labelService.deleteOne(id)

            io.emit("labelDeleted", labelEvent)

            return { labelEvent }
        } catch (e) {}
    }
    const labelCreateCard = async ({ cardId, labelId }) => {
        try {
            const labelEvent = await labelService.createCardLabel(
                cardId,
                labelId
            )

            io.emit("labelCardReceived", labelEvent)

            return { labelEvent }
        } catch (e) {}
    }
    const labelDeleteCard = async ({ labelId, cardId }) => {
        try {
            const labelEvent = await labelService.deleteCardLabel(
                labelId,
                cardId
            )

            io.emit("labelCardDeleted", labelEvent)

            return "Relation deleted"
        } catch (e) {}
    }
    socket.on("GETONE:LABEL", labelGet)
    socket.on("CREATE:LABEL", labelCreate)
    socket.on("GETALL:LABEL", labelGetAll)
    socket.on("UPDATE:LABEL", labelUpdateOne)
    socket.on("DELETE:LABEL", labelDeleteOne)
    socket.on("LABELCARD:LABEL", labelCreateCard)
    socket.on("LABELCARDDELETE:LABEL", labelDeleteCard)
}
