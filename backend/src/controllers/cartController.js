import Cart from "../models/Cart.js"
import Product from "../models/Product.js"

//add
export const addToCart = async (req, res) => {
	const {productId, quantity} = req.body
	try {
		const product = await Product.findByPk(productId)
		if (!product) return res.status(404).json({message: "Product not found"})

		const cartItem = await Cart.create({
			userId: req.user.id,
			productId,
			quantity,
		})
		res.status(201).json({message: "Item added to cart", cartItem})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

// get all
export const getCartItems = async (req, res) => {
	try {
		const cartItems = await Cart.findAll({where: {userId: req.user.id}})
		res.json(cartItems)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

// delete 
export const removeFromCart = async (req, res) => {
	const {id} = req.params
	try {
		const cartItem = await Cart.findByPk(id)
		if (!cartItem) return res.status(404).json({message: "Cart item not found"})

		await cartItem.destroy()
		res.json({message: "Item removed from cart"})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
