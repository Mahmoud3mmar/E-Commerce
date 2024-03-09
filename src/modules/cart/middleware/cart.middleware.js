import { catchAsyncError } from "../../../utils/error.handler.js";
import cartModel from "../models/cart.model.js";

export const assertCart = catchAsyncError(async (req, res, next) => {
    const cart = await cartModel.findOne({user_id:req.user_id});

    if(cart) return next()
    if (!cart) throw new AppError("Cart not found", 404);
    await cartModel.create({user_id:req.user_id,products:[]  })
    next();
})