const { User } = require("../models/models")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
// const mailService = require("./mailService");
const tokenService = require("./tokenService")
const UserDto = require("../dtos/userDto")
const ApiError = require("../error/apiError")

class UserService {
    async registration(email, password, name, surname, position) {
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            throw ApiError.BadRequest(
                `User with this email: ${email} already exists`
            )
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await User.create({
            email,
            password: hashPassword,
            name,
            surname,
            position,
            activationLink,
        })

        const userDto = new UserDto(user) // id, email, isActivated
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        // await mailService.sendActivationMail(
        //     email,
        //     `${process.env.API_URL}/api/user/activate/${activationLink}`
        // );

        return { ...tokens, user: userDto }
    }
    async login(email, password) {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw ApiError.BadRequest("User with this email not found")
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest("Incrorrect password")
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findByPk(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async getAllUsers() {
        return User.findAll()
    }
}

module.exports = new UserService()
