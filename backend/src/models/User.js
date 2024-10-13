import {Sequelize, DataTypes} from "sequelize"
import bcrypt from "bcrypt"
import sequelize from "../config/db.js" // adjust the path as necessary

const User = sequelize.define("User", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

// Hash the password before creating a user
User.beforeCreate(async (user) => {
	const saltRounds = 10 // Number of salt rounds
	user.password = await bcrypt.hash(user.password, saltRounds)
})

export default User
