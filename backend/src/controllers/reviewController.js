import Review from "../models/Review.js"
import Product from "../models/Product.js"

// add  review
export const addReview = async (req, res) => {
	const {productId, rating, comment} = req.body
	try {
		const product = await Product.findByPk(productId)
		if (!product) return res.status(404).json({message: "Product not found"})

		const review = await Review.create({
			productId,
			userId: req.user.id,
			rating,
			comment,
		})
		res.status(201).json({message: "Review added successfully", review})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

//get review
export const getReviewsByProductId = async (req, res) => {
	const {productId} = req.params
	try {
		const reviews = await Review.findAll({where: {productId}})
		res.json(reviews)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
