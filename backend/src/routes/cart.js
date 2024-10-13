import express from "express"
import {
	addToCart,
	getCartItems,
	removeFromCart,
} from "../controllers/cartController.js"
import auth from "../middleware/auth.js"

const router = express.Router()

//add item to cart
router.post("/", auth, addToCart)

//get all item from cart
router.get("/", auth, getCartItems)

//delete items from cart
router.delete("/:id", auth, removeFromCart)

export default router
