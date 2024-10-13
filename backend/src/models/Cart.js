import {DataTypes} from "sequelize"
import sequelize from "../config/db.js"
import User from "./User.js"
import Product from "./Product.js"

const Cart = sequelize.define("Cart", {
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 1,
	},
})

// Relasi Many-to-Many antara User dan Product melalui Cart
User.belongsToMany(Product, {through: Cart, foreignKey: "userId"})
Product.belongsToMany(User, {through: Cart, foreignKey: "productId"})

export default Cart
