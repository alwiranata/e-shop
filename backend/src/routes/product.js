import express from "express"
import {
	createProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
} from "../controllers/productController.js"
import auth from "../middleware/auth.js"
import admin from "../middleware/admin.js"

const router = express.Router()

// add product (admin)
router.post("/", auth, admin, createProduct)

//get product
router.get("/", getAllProducts)

//get product from id
router.get("/:id", getProductById)

//update product (admin)
router.put("/:id", auth, admin, updateProduct)

// delete product (admin)
router.delete("/:id", auth, admin, deleteProduct)

export default router
