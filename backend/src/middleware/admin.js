const admin = (req, res, next) => {
	if (req.user.role !== "admin") {
		return res
			.status(403)
			.json({message: "Forbidden: You do not have access to this resource"})
	}
	next()
}

export default admin
