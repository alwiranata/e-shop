import {Sequelize} from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize(
	process.env.DB_NAME, // User database dari .env
	process.env.DB_USER, // Nama database dari .env
	process.env.DB_PASSWORD, // Password database dari .env
	{
		host: process.env.DB_HOST, // Host database dari .env
		dialect: "mysql",
	}
)

export default sequelize
