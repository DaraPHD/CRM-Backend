const cardService = require("../services/cardService.js");

module.exports = (io, socket) => {
    const cardCreate = async ({ columnId, title }) => {
        try {
            console.log(title);
            const cardEvent = await cardService.create(columnId, title);
            console.log(cardEvent);
            io.emit("cardCreated", cardEvent);
            return { cardEvent };
        } catch (e) {}
    };

    const cardGet = async ({ Id }) => {
        try {
            const cardEvent = await cardService.getOne(Id);
            console.log(cardEvent);
            io.emit("cardReceived", cardEvent);

            return { cardEvent };
        } catch (e) {}
    };

    const cardGetAll = async () => {
        try {
            const cardEvent = await cardService.getAll();
            console.log(cardEvent);
            io.emit("cardsReceived", cardEvent);

            return { cardEvent };
        } catch (e) {}
    };
    const cardUpdateOne = async ({ id, columnId, title }) => {
        try {
            const cardEvent = await cardService.updateOne(id, columnId, title);
            console.log(cardEvent);
            io.emit("cardUpdated", cardEvent);

            return { cardEvent };
        } catch (e) {}
    };

    const cardArchive = async ({ id }) => {
        try {
            const cardEvent = await cardService.archive(id);
            console.log(cardEvent);
            io.emit("cardArchived", cardEvent);
            return { cardEvent };
        } catch (error) {}
    };

    const cardDeleteOne = async ({ id }) => {
        try {
            const cardEvent = await cardService.deleteOne(id);
            console.log(cardEvent);
            io.emit("cardDeleted", cardEvent);

            return "Card deleted successfully";
        } catch (e) {}
    };
    const cardFromColumn = async ({ columnId }) => {
        try {
            const cardEvent = await cardService.getCardFromColumn(columnId);
            console.log(cardEvent);
            io.emit("cardColumnReceived", cardEvent);

            return { cardEvent };
        } catch (e) {}
    };
    const cardCreateUser = async ({ userId, cardId }) => {
        try {
            const cardEvent = await cardService.createUserCard(userId, cardId);
            console.log(cardEvent);
            io.emit("cardUserCreated", cardEvent);

            return { cardEvent };
        } catch (e) {}
    };
    socket.on("GET:CARD", cardGet);
    socket.on("CREATE:CARD", cardCreate);
    socket.on("GETALL:CARD", cardGetAll);
    socket.on("UPDATE:CARD", cardUpdateOne);
    socket.on("DELETE:CARD", cardDeleteOne);
    socket.on("COLUMNCARD:CARD", cardFromColumn);
    socket.on("USERCARD:CARD", cardCreateUser);
    socket.on("ARCHIVE:CARD", cardArchive);
};
