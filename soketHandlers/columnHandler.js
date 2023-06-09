const columnService = require("../services/columnService.js");

module.exports = (io, socket) => {
    const columnCreated = async ({ name, boardId }) => {
        try {
            const columnEvent = await columnService.create(name, boardId);
            console.log(columnEvent);
            io.emit("columnCreated", columnEvent);

            return { columnEvent };
        } catch (e) {}
    };

    const columnGetOne = async ({ id }) => {
        try {
            const columnEvent = await columnService.getOne(id);
            console.log(columnEvent);
            io.emit("columnTaken", columnEvent);
            return { columnEvent };
        } catch (e) {}
    };

    const columnGetAll = async () => {
        try {
            const columnEvent = await columnService.getAll();
            console.log(columnEvent);
            io.emit("columnsTaken", columnEvent);
            return { columnEvent };
        } catch (e) {}
    };
    const columnUpdate = async ({ id, name, boardId }) => {
        try {
            const columnEvent = await columnService.updateOne(
                id,
                name,
                boardId
            );
            console.log(columnEvent);
            io.emit("columnUpdated", columnEvent);
            return { columnEvent };
        } catch (e) {}
    };
    const columnDelete = async ({ id }) => {
        try {
            const columnEvent = await columnService.deleteOne(id);
            console.log(columnEvent);
            io.emit("columnDeleted", columnEvent);
            return "Column deleted successfully";
        } catch (e) {}
    };
    socket.on("CREATE:COLUMN", columnCreated);
    socket.on("GETONE:COLUMN", columnGetOne);
    socket.on("GEATALL:COLUMN", columnGetAll);
    socket.on("UPDATE:COLUMN", columnUpdate);
    socket.on("DELETE:COLUMN", columnDelete);
};
