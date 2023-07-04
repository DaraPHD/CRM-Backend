const { Card, Column, Label, UserCard } = require("../models/models");

class CardService {
    async create(columnId, title) {
        try {
            const card = await Card.create({
                columnId,
                title,
            });
            return card;
        } catch (e) {
            return e;
        }
    }

    async getOne(id) {
        try {
            const card = await Card.findOne({
                where: { id },
                include: [
                    {
                        model: Label,
                        as: "label",
                    },
                ],
            });
            return card;
        } catch (e) {
            return "Ошибка получения  одного экземпляра Card";
        }
    }

    async getAll() {
        try {
            const cards = await Card.findAll();
            return cards;
        } catch (e) {
            return "Ошибка получения Card";
        }
    }

    async updateOne(id, columnId, title) {
        try {
            const card = await Card.findByPk(id);
            if (card) {
                card.columnId = columnId;
                card.title = title;
                await card.save();
                return card;
            }
        } catch (e) {
            return e;
        }
    }

    async getCardFromColumn(columnId) {
        try {
            const cards = await Card.findAll({
                where: { columnId },
            });
            const column = await Column.findAll({
                where: { id: columnId },
            });
            return { cards, column };
        } catch (e) {
            return "Ошибка получения Card из Column";
        }
    }

    async createUserCard(userId, cardId) {
        try {
            const relation = await UserCard.create({ cardId, userId });
            return relation;
        } catch (e) {
            return "Ошибка создания связи UserCard";
        }
    }

    async archive(id) {
        try {
            const card = await Card.findByPk(id);
            if (!card) {
                throw new Error("Card not found");
            }
            card.is_archived = true;
            await card.save();
            return card;
        } catch (e) {
            return e;
        }
    }

    async deleteOne(id) {
        try {
            const card = await Card.findByPk(id);
            if (card.is_archived === true) {
                await Card.destroy({ where: { id } });
                return `Card deleted`;
            } else {
                throw new Error("Can't delete unarchived card");
            }
        } catch (e) {
            return e.message || "Ошибка удаления";
        }
    }
}

module.exports = new CardService();
