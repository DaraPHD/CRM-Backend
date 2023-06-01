const { User } = require("../models/models")
const jwt = require("jsonwebtoken")

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(" ")[1]
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" })
            }
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            if (decoded.role !== role.i) {
                return res.status(403).json({ message: "Unacceptable" })
            }
            req.user = decoded
            next()
        } catch (e) {
            return res.status(401).json({ message: "Unauthorized" })
        }
    }
}
