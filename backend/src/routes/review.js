import express from "express"
import {
	addReview,
	getReviewsByProductId,
} from "../controllers/reviewController.js"
import auth from "../middleware/auth.js"

const router = express.Router()

//add review
router.post("/", auth, addReview)

//get  review
router.get("/:productId", getReviewsByProductId)

export default router
