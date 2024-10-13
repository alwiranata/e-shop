import {DataTypes} from "sequelize"
import sequelize from "../config/db.js"
import User from "./User.js"
import Product from "./Product.js"

const Review = sequelize.define("Review", {
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
			max: 5,
		},
	},
	comment: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
})

Product.hasMany(Review, {foreignKey: "productId"})
Review.belongsTo(Product, {foreignKey: "productId"})

User.hasMany(Review, {foreignKey: "userId"})
Review.belongsTo(User, {foreignKey: "userId"})

export default Review
