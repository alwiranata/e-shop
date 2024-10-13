import Product from "../models/Product.js"

//add
export const createProduct = async (req, res) => {
	const {name, description, price, imageUrl} = req.body
	try {
		const newProduct = await Product.create({
			name,
			description,
			price,
			imageUrl,
		})
		res
			.status(201)
			.json({message: "Product created successfully", product: newProduct})
	} catch (error) {}
}

//all
export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.findAll()
		res.json(products)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

//get id
export const getProductById = async (req, res) => {
	const {id} = req.params
	try {
		const product = await Product.findByPk(id)
		if (!product) return res.status(404).json({message: "Product not found"})
		res.json(product)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

//update
export const updateProduct = async (req, res) => {
	const {id} = req.params
	const {name, description, price, imageUrl} = req.body
	try {
		const product = await Product.findByPk(id)
		if (!product) return res.status(404).json({message: "Product not found"})

		await product.update({name, description, price, imageUrl})
		res.json({message: "Product updated successfully", product})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

//delete
export const deleteProduct = async (req, res) => {
	const {id} = req.params
	try {
		const product = await Product.findByPk(id)
		if (!product) return res.status(404).json({message: "Product not found"})

		await product.destroy()
		res.json({message: "Product deleted successfully"})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
