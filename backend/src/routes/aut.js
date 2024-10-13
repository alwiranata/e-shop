import express from "express"
import {register, login, getUserProfile} from "../controllers/authController.js"
import auth from "../middleware/auth.js"

import bcrypt from "bcrypt" // Import bcrypt
import User from "../models/User.js" // Adjust the import based on your structure
import {body, validationResult} from "express-validator"

const router = express.Router()

router.post(
	"/register",
	body("name").notEmpty().withMessage("Name is required"),
	body("email").isEmail().withMessage("Valid email is required"),
	body("password")
		.isLength({min: 6})
		.withMessage("Password must be at least 6 characters long"),
	body("role").notEmpty().withMessage("Role is required"),
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()})
		}

		const {name, email, password, role} = req.body

		try {
			// Hash the password before saving
			const hashedPassword = await bcrypt.hash(password, 10) // 10 is the salt rounds

			// Create the user
			const user = await User.create({
				name,
				email,
				password: hashedPassword,
				role,
			})
			res.status(201).json(user)
		} catch (error) {
			console.error(error)
			res.status(500).json({message: "Internal server error"})
		}
	}
)

// Login
router.post("/login", login)

// get Profile
router.get("/profile", auth, getUserProfile)

export default router
