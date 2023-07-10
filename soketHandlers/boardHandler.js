const boardService = require("../services/boardService.js");

module.exports = (io, socket) => {
    const boardCreate = async ({ name }) => {
        try {
            const boardEvent = await boardService.create(name);

            io.emit("boardCreated", boardEvent);
            return { boardEvent };
        } catch (e) {}
    };

    const boardGet = async ({ boardId }) => {
        try {
            const boardEvent = await boardService.getBoard(boardId);

            io.emit("boardReceived", boardEvent);

            return { boardEvent };
        } catch (e) {}
    };

    const boardInvintation = async ({
        id,
        senderUser,
        receiverUser,
        boardName,
    }) => {
        try {
            const boardEvent = await boardService.sendInvintation(
                id,
                senderUser,
                receiverUser,
                boardName
            );

            io.emit("invintationSent", boardEvent);
            return { boardEvent };
        } catch (e) {}
    };

    const boardSearch = async ({ title }) => {
        try {
            const boardEvent = await boardService.searchCard(title);

            io.emit("boardSearched", boardEvent);

            return { boardEvent };
        } catch (e) {}
    };

    const boardDelete = async ({ id }) => {
        try {
            const boardEvent = await boardService.delete(id);
            io.emit("boardDeleted", boardEvent);
            return `Board succesfully deleted`;
        } catch (e) {}
    };

    socket.on("GET:BOARD", boardGet);
    socket.on("CREATE:BOARD", boardCreate);
    socket.on("SEARCH:BOARD", boardSearch);
    socket.on("DELETE:BOARD", boardDelete);
    socket.on("INVINTATION:BOARD", boardInvintation);
};
