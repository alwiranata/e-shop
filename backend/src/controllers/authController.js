import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {where} from "sequelize"

//register
export const register = async (req, res) => {
	const {username, password, role} = req.body
	try {
		const newUser = await User.create({username, password, role})
		res.status(201).json({message: "User registed successfully"})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

//login
export const login = async (req, res) => {
	const {username, password} = req.body
	try {
		const user = await User.findOne({where: {username}})
		if (!user) return res.status(400).json({message: "User not found"})

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) return res.status(401).json({message: "Invalid password"})

		const token = jwt.sign(
			{id: user.id, role: user.role},
			process.env.JWT_SECRET,
			{expiresIn: "1h"}
		)
		res.json({message: "Login successful", token})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

export const getUserProfile = (req, res) => {
	res.json(req.user) // Mengembalikan data pengguna dari request
}
