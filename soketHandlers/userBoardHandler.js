const userBoardService = require("../services/userBoardService");

module.exports = (io, socket) => {
    const userBoardCreate = async ({ userId, boardId }) => {
        try {
            const relationEvent = await userBoardService.create(
                userId,
                boardId
            );

            io.emit("relationCreated", relationEvent);
            return { relationEvent };
        } catch (e) {}
    };

    const userBoardGetAll = async () => {
        try {
            const relationEvent = await userBoardService.getAll();

            io.emit("relationReceived", relationEvent);
            return { relationEvent };
        } catch (e) {}
    };

    const userBoardDelete = async ({ id }) => {
        try {
            const relationEvent = await userBoardService.delete(id);

            io.emit("relationDeleted", relationEvent);
            return `Relation succesfully deleted`;
        } catch (e) {}
    };

    socket.on("CREATE:RELATION", userBoardCreate);
    socket.on("GETALL:RELATION", userBoardGetAll);
    socket.on("DELETE:RELATION", userBoardDelete);
};
