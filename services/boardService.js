const { Board, Column, Card, Label, UserBoard } = require("../models/models");
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
    async sendInvintation(id, senderUser, receiverUser, boardName) {
        try {
            await this.getBoard(id);
            await UserBoard.create({
                userId: receiverUser.id,
                boardId: id,
            });
            const boardURL = "http://10.66.66.20:3001/boards/" + id;
            const invintationMessage = `
            <div style="text-align: center; padding: 10px;">
            <div style="display: inline-block; border: 1px solid #000000; padding: 10px; background-color: #f0f0f0;">
            <div style="background: linear-gradient(to right, #007bff, #00ffff); display: inline-block; padding: 5px 10px; border-radius: 5px;">
            <span style="color: #ffffff; font-weight: bold;">RONOVE</span>
            </div><br>
            Вы были приглашены пользователем ${senderUser.name} ${senderUser.surname} к доске ${boardName}.<br>
            Присоединяйтесь для совместной работы.<br>
            <div style="display: inline-block; margin-top: 20px;">
            <a href="${boardURL}" style="display: inline-block; background: linear-gradient(to right, #007bff, #00ffff); color: #FFFFFF; padding: 10px 20px; border-radius: 10px; text-decoration: none;">
            Принять приглашение
            </a>
            </div>
            </div>
            </div>
            `;
            const mailOptions = {
                from: "midnightdidik@gmail.com",
                to: receiverUser.email,
                subject: "Приглашение к доске",
                html: invintationMessage,
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
    //         "id": "id"
    //     },
    // };

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
