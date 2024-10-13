import Order from "../models/Order.js"
import OrderItem from "../models/OrderItem.js"
import Cart from "../models/Cart.js"

// add
export const createOrder = async (req, res) => {
	const {items} = req.body // items adalah array dari cart item id
	try {
		const order = await Order.create({userId: req.user.id})

		for (const itemId of items) {
			const cartItem = await Cart.findByPk(itemId)
			if (cartItem) {
				await OrderItem.create({
					orderId: order.id,
					productId: cartItem.productId,
					quantity: cartItem.quantity,
				})
				await cartItem.destroy() // Menghapus item dari keranjang setelah dipesan
			}
		}

		res.status(201).json({message: "Order created successfully", order})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

// get all
export const getUserOrders = async (req, res) => {
	try {
		const orders = await Order.findAll({where: {userId: req.user.id}})
		res.json(orders)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
