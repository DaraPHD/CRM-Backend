const colorService = require("../services/colorService.js")

module.exports = (io, socket) => {
    const colorCreate = async ({ color_code }) => {
        try {
            const colorEvent = await colorService.create(color_code)
            console.log(colorEvent)
            io.emit("colorCreated", colorEvent)
            return { colorEvent }
        } catch (e) {}
    }

    const colorGetAll = async () => {
        try {
            const colorEvent = await colorService.getAll()
            console.log(colorEvent)
            io.emit("colorsGetted", colorEvent)

            return { colorEvent }
        } catch (e) {}
    }

    const colorUpdateOne = async ({ id, color_code }) => {
        try {
            const colorEvent = await colorService.updateOne(id, color_code)
            console.log(colorEvent)
            io.emit("colorUpdated", colorEvent)

            return { colorEvent }
        } catch (e) {}
    }

    const colorDeleteOne = async ({ id }) => {
        try {
            const colorEvent = await colorService.deleteOne(id)
            console.log(colorEvent)
            io.emit("colorDeleted", colorEvent)

            return { colorEvent }
        } catch (e) {}
    }
    socket.on("CREATE:COLOR", colorCreate)
    socket.on("GETALL:COLOR", colorGetAll)
    socket.on("UPDATE:COLOR", colorUpdateOne)
    socket.on("DELETE:COLOR", colorDeleteOne)
}
