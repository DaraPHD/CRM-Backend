const { Background } = require("../models/models.js");

class BackgroundService {
    async create(image_code) {
        try {
            const background = await Background.create({
                image_code,
            });
            return background;
        } catch (e) {
            return e;
        }
    }
    async getOne(id) {
        try {
            const background = await Background.findOne({
                where: { id },
            });
            return background;
        } catch (e) {
            return e;
        }
    }
    async getAll() {
        try {
            const backgrounds = await Background.findAll();
            return backgrounds;
        } catch (r) {
            return e;
        }
    }
    async update(id, image_code) {
        try {
            const backgoround = await Background.findByPk(id);
            if (backgoround) {
                backgoround.image_code = image_code;
                await backgoround.save();
                return backgoround;
            }
        } catch (e) {
            return e;
        }
    }
    async delete(id) {
        try {
            await Background.destroy({ where: { id } });
            return `background deleted`;
        } catch (e) {
            return e;
        }
    }
}

module.exports = new BackgroundService();
