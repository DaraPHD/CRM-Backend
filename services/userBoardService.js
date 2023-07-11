const { User, Board, UserBoard, Background } = require("../models/models.js");
const _ = require("lodash");

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

    async getUserBoards(userId) {
        const userBoards = await UserBoard.findAll({
            where: { userId },
            attributes: ["id", "userId", "boardId"],
            include: {
                model: Background,
                as: "background",
                attributes: ["id", "image_code"],
            },
        });

        const userWithBoards = await Promise.all(
            userBoards.map(async (userBoard) => {
                const board = await Board.findByPk(userBoard.boardId, {
                    attributes: ["id", "name"],
                });
                const user = await User.findByPk(userBoard.userId, {
                    attributes: [
                        "name",
                        "surname",
                        "position",
                        "avatar",
                        "email",
                    ],
                });
                return {
                    ...userBoard.toJSON(),
                    board,
                    user,
                };
            })
        );
        return userWithBoards;
    }

    async update(userBoardId, backgroundId) {
        try {
            const userBoard = await UserBoard.findOne({
                where: { id: userBoardId },
            });
            userBoard.backgroundId = backgroundId;
            await userBoard.save();
            return userBoard;
        } catch (e) {}
    }

    async getAll() {
        try {
            const participants = User.findAll({
                include: [
                    {
                        model: Board,
                        through: UserBoard,
                        as: "boards",
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
