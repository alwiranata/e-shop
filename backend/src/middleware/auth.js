import jwt from "jsonwebtoken"
import {promisify} from "util"

const verifyToken = promisify(jwt.verify)

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]

		if (!token) {
			return res.status(401).json({message: "No token provider"})
		}

		const decoded = await verifyToken(token, process.env.JWT_SECRET)

		req.user = decoded

		next()
	} catch (error) {
		return res.status(401).json({message: "Unauthorized", error: error.message})
	}
}

export default auth
