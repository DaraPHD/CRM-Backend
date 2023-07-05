const { Board, Column, Card, Label } = require("../models/models");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "midnightdidik@gmail.com",
        pass: "jzmrukmwvemdzkpl",
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Error while configuring transporter:", error);
    } else {
        console.log("The transporter is ready to send emails", success);
    }
});

class BoardService {
    async create(name) {
        try {
            const board = await Board.create({
                name,
            });
            return board;
        } catch (e) {
            return e;
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

    async sendInvintation(id, senderUser, receiverUser) {
        try {
            const board = await this.getBoard(id);
            const invintationMessage = `Вы были приглашены пользователем ${
                (senderUser.name, senderUser.surname)
            } к доске ${board.name}. Присоединяйтесь для совместной работы`;
            const mailOptions = {
                from: "midnightdidik@gmail.com",
                to: receiverUser.email,
                subject: "Приглашение к доске",
                text: invintationMessage,
            };
            await transporter.sendMail(mailOptions);
            return "Invitation sent successfully";
        } catch (e) {
            console.log("Error sending invitation:", e);
            throw new Error("Error sending invitation");
        }
    }
    // {
    //     "boardId": "12345",
    //     "senderUser": {
    //         "name": "John Doe",
    //     },
    //     "receiverUser": {
    //         "email": "receiver@example.com",
    //     },
    // };

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
