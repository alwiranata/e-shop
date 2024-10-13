import express from "express"
import {createOrder, getUserOrders} from "../controllers/orderController.js"
import auth from "../middleware/auth.js"

const router = express.Router()

//add orders (users)
router.post("/", auth, createOrder)

//get order (users)
router.get("/", auth, getUserOrders)

export default router
