const { Board, Column, Card, Label } = require("../models/models");
const { Op } = require("sequelize");

class BoardService {
    async create(name) {
        try {
            const board = await Board.create({
                name,
            });
            return board;
        } catch (e) {
            return "Ошибка создания Board";
        }
    }
    async getBoard(id) {
        try {
            const board = await Board.findOne({
                where: { id },
                include: [
                    {
                        model: Column,
                        as: "column",
                        include: [
                            {
                                model: Card,
                                as: "card",
                                include: [
                                    {
                                        model: Label,
                                        as: "label",
                                    },
                                ],
                            },
                        ],
                    },
                ],
                order: [
                    ["id", "ASC"],
                    [Column, "id", "ASC"],
                    [Column, Card, "id", "ASC"],
                    [Column, Card, Label, "id", "ASC"],
                ],
            });
            return board;
        } catch (e) {
            return "Ошибка получения Board";
        }
    }

    async searchCard(title) {
        try {
            const where = {};
            let searchResult;
            if (title) {
                where.title = { [Op.iLike]: `%${title}%` };
                searchResult = await Board.findOne({
                    where: { id: 1 },
                    include: [
                        {
                            model: Column,
                            as: "column",
                            include: [
                                {
                                    model: Card,
                                    as: "card",
                                    where,
                                    include: [
                                        {
                                            model: Label,
                                            as: "label",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                    order: [
                        ["id", "ASC"],
                        [Column, "id", "ASC"],
                    ],
                });

                return searchResult;
            } else {
                searchResult = await Board.findOne({
                    where: { id: 1 },
                    include: [
                        {
                            model: Column,
                            as: "column",
                            include: [
                                {
                                    model: Card,
                                    as: "card",
                                    include: [
                                        {
                                            model: Label,
                                            as: "label",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                    order: [
                        ["id", "ASC"],
                        [Column, "id", "ASC"],
                        [Column, Card, "id", "ASC"],
                        [Column, Card, Label, "id", "ASC"],
                    ],
                });
                return searchResult;
            }
        } catch (e) {
            return "Ошибка поиска";
        }
    }
    async updateCards(columnId, title) {
        // try {
        //     const cards = await Card.update({
        //         title,
        //         columnId,
        //     })
        //     return cards
        // } catch (e) {
        //     return "ошибка обноваления"
        // }
    }
    async delete(id) {
        try {
            await Board.destroy({ where: { id } });
            return `Board succesfully deleted`;
        } catch (e) {
            return e;
        }
    }
}

module.exports = new BoardService();
