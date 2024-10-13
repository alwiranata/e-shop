import {DataTypes} from "sequelize"
import sequelize from "../config/db.js"
import Order from "./Order.js"
import Product from "./Product.js"

const OrderItem = sequelize.define("OrderItem", {
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 1,
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
})

Order.hasMany(OrderItem, {foreignKey: "orderId"})
OrderItem.belongsTo(Order, {foreignKey: "orderId"})

Product.hasMany(OrderItem, {foreignKey: "productId"})
OrderItem.belongsTo(Product, {foreignKey: "productId"})

export default OrderItem
