const userService = require("../service/userService");
const { User } = require("../models/user_models");
const uuid = require('uuid')
const path = require('path')


class UserController {
    async registration(req, res, next) {
        try {
            const { email, password, name, surname, position } = req.body;
            const userData = await userService.registration(email, password, name, surname, position);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 172800000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    // 172800000
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 172800000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            console.log(refreshToken);
            const token = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.json(`Here is your token: ${token}`);
        } catch (e) {
            next(`Something goes wrong ${e}`);
        }
    }
    // async activate(req, res, next) {
    //     try {
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 172800000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async getAll(req, res, next) {
        try {
            // res.json(["1234", "123123"]);
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
    async getOne(req, res, next) {
        try {
        } catch (e) {
            next(e);
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            await User.destroy({ where: { id } });
            return res.json({ message: "Deleted" });
        } catch (e) {
            next(e);
        }
    }
    async putOne(req, res, next) {
        try {
            const {id} = req.params
            const {name, surname, position, role} = req.body
            const {avatar} = req.files
            let fileName = uuid.v4() + '.jpg'
            avatar.mv(path.resolve(__dirname, '..', 'static', fileName))
            
            const user = await User.findByPk(id)
            if (user) {
                user.name = name,
                user.surname = surname,
                user.position = position,
                user.avatar = fileName,
                user.role = role
                await user.save()
                return res.json(user)
            } else {
                return res.status(404).send('User not Found')
            }
        } catch (e) {
            return res.json(e.message)
        }
    }


}

module.exports = new UserController();



// jopa