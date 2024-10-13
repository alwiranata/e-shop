import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import sequelize from "./config/db.js" // Pastikan jalur sudah benar
import authRoutes from "./routes/aut.js" // Perbaiki jalur ke routes autentikasi
import productRoutes from "./routes/product.js" // Perbaiki jalur ke routes produk
import cartRoutes from "./routes/cart.js" // Perbaiki jalur ke routes keranjang belanja
import orderRoutes from "./routes/order.js" // Perbaiki jalur ke routes pesanan
import reviewRoutes from "./routes/review.js" // Perbaiki jalur ke routes ulasan

// Load environment variables dari .env
dotenv.config()

// Inisialisasi aplikasi express
const app = express()

// Middleware
app.use(cors()) // Mengizinkan Cross-Origin Resource Sharing
app.use(express.json()) // Memungkinkan parsing body JSON

// Routes
app.use("/api/auth", authRoutes) // Autentikasi pengguna
app.use("/api/products", productRoutes) // Produk
app.use("/api/cart", cartRoutes) // Keranjang belanja
app.use("/api/orders", orderRoutes) // Pesanan
app.use("/api/reviews", reviewRoutes) // Ulasan

// Tes rute
app.get("/", (req, res) => {
	res.send("Welcome to the e-shop API!")
})

// Inisialisasi server
const PORT = process.env.PORT || 5000

// Menghubungkan ke database dan menjalankan server
sequelize
	.authenticate()
	.then(() => {
		console.log("Database connected...")
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`)
		})
	})
	.catch((err) => {
		console.log("Error: " + err)
	})
