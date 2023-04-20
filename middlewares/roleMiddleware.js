const { User } = require("../models/user_models")
const jwt = require('jsonwebtoken')

// const checkRole = (role) => async (req, res, next) => {
//     const userId = req.userId
//     console.log(userId)
//     try {
//         const user = await User.findOne({ where: {id: userId}})
//         if (!user || user.role !== role) {
//             return res.status(403).send('Access deneid')
//         }
//         next()
//     } catch (e) {
//         res.status(500).send(e.message)
//     }
// }

// module.exports = checkRole


module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(" ")[1]
            if (!token) {
                return res.status(401).json({message: "Unauthorized"})
            }
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            if (decoded.role !== role.i) {
                return res.status(403).json({message: 'Unacceptable'})
            }
            req.user = decoded
            next()
        } catch (e) {
            return res.status(401).json({message: 'Unauthorized'})
        }
    }
}