const { User, Board, UserBoard } = require("../models/models.js");

class UserBoardService {
    async create(userId, boardId) {
        try {
            const relation = await UserBoard.create({
                userId,
                boardId,
            });
            return relation;
        } catch (e) {
            return e;
        }
    }

    async getAll() {
        try {
            const participants = User.findAll({
                include: [
                    {
                        model: Board,
                        through: UserBoard,
                        as: "participant",
                    },
                ],
            });
            return participants;
        } catch (e) {}
    }

    async deleteOne(id) {
        try {
            await UserBoard.destroy({ where: { id } });
            return `${id} deleted`;
        } catch (e) {
            return "Ошибка удаления";
        }
    }
}

module.exports = new UserBoardService();
