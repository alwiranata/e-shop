import {DataTypes} from "sequelize"
import sequelize from "../config/db.js"
import User from "./User.js"

const Order = sequelize.define("Order", {
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "pending",
	},
	totalPrice: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	paymentMethod: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

User.hasMany(Order, {foreignKey: "userId"})
Order.belongsTo(User, {foreignKey: "userId"})

export default Order
