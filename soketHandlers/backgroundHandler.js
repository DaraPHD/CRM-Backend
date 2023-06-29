const backgoroundService = require("../services/backgroundService.js");

module.exports = (io, socket) => {
    const backgoroundCreate = async ({ image_code }) => {
        try {
            const backgoroundEvent = await backgoroundService.create(
                image_code
            );
            io.emit("backgroundCreated", backgoroundEvent);
            return { backgoroundEvent };
        } catch (e) {}
    };

    const backgoroundGetOne = async ({ id }) => {
        try {
            const backgoroundEvent = await backgoroundService.getOne(id);
            io.emit("backgroundReceived", backgoroundEvent);
            return { backgoroundEvent };
        } catch (e) {}
    };
    const backgoroundGetAll = async () => {
        try {
            const backgoroundEvent = await backgoroundService.getAll();
            io.emit("backgroundsReceived", backgoroundEvent);
            return { backgoroundEvent };
        } catch (e) {}
    };
    const backgroundUpdate = async ({ id, image_code, userBoardId }) => {
        try {
            const backgoroundEvent = await backgoroundService.update(
                id,
                image_code,
                userBoardId
            );
            io.emit("backgroundUpdated", backgoroundEvent);
            return { backgoroundEvent };
        } catch (e) {}
    };
    const backgoroundDelete = async ({ id }) => {
        const backgoroundEvent = await backgoroundService.delete(id);
        io.emit("backgroundDeleted", backgoroundEvent);
        return { backgoroundEvent };
    };

    socket.on("CREATE:BACKGROUND", backgoroundCreate);
    socket.on("GETONE:BACKGROUND", backgoroundGetOne);
    socket.on("GETALL:BACKGROUND", backgoroundGetAll);
    socket.on("UPDATE:BACKGROUND", backgroundUpdate);
    socket.on("DELETE:BACKGROUND", backgoroundDelete);
};
