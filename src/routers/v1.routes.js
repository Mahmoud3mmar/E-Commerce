import { Router } from 'express'

import categoriesRouter from '../modules/product/routers/category.routes.js'
import subcategoriesRouter from '../modules/product/routers/subcategories.routes.js'
import productRouter from '../modules/product/routers/product.routes.js'
import couponRouter from '../modules/coupon/routers/coupon.routes.js'
import orderRouter from '../modules/cart/routers/order.routes.js'
import userRouter from '../modules/user/routers/user.routes.js'
import cartRouter from '../modules/cart/controllers/cart.controller.js'
import authRouter from '../modules/auth/auth.routes.js'
const router = Router()

router.use('/categories', categoriesRouter)
router.use('/products', productRouter)
router.use('/coupons', couponRouter)
router.use('/orders', orderRouter)
router.use('/users', userRouter)
router.use('/cart', cartRouter)
router.use('/auth', authRouter)





export default router
