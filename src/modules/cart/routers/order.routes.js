import { Router } from "express";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import { ROLES } from "../../../utils/enums.js";
import { assertCart } from "../middleware/cart.middleware.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import { addorderSchema } from "../validations/order.validations.js";
import { makeCODOrder, makePaymentSession } from "../controllers/order.controller.js";





const router = Router()

router.route('/').get(authenticate,authorize(ROLES.USER),getUserOrders)


router.route('/cash').post(
    authenticate,
    authorize(ROLES.USER),
    validate(addorderSchema),
    assertCart,
    makeCODOrder)


router.route('/card').get(
    authenticate,
    authorize(ROLES.USER),
    assertCart,
    makePaymentSession)

export default router