import { AppError, catchAsyncError } from "../../../utils/error.handler";
import couponModel from "../../coupon/models/coupon.model.js";
import cartModel from "../models/cart.model.js";



export const getCart = catchAsyncError(async (req, res, next) => {
    const cart = await cartModel.findOne({user_id:req.user_id});
    res.status(200).json({
        success: true,
        data: cart
    })
})


export const addCAart = catchAsyncError(async (req, res, next) => {
    const {product_id}=req.body
    const cart = await cartModel.create({user_id:req.user_id})
    productEntry= cart.products.find(
        (entry)=>entry.product_id._id.toString()===product_id
    )
    if(!productEntry) cart.products.push({product_id,quantity:1})
    else productEntry.quantity++
    
    await cart.save()

    res.status(200).json({
        success: true,
        message:"Product added to cart",
        data: cart
    })
})


export const removeFromCart = catchAsyncError(async (req, res, next) => {
    const {product_id}=req.body
    const cart = await cartModel.create({user_id:req.user_id})
    productEntry= cart.products.find(
        (entry)=>entry.product_id._id.toString()===product_id
    )
    if(!productEntry) throw new AppError("Product not found", 404);
    productEntry.quantity--

    if(productEntry.quantity===0) cart.products.remove(productEntry)
    
    await cart.save()

    res.status(200).json({
        success: true,
        message:"Product removed from cart",
        data: cart
    })
})


export const applyCoupon = catchAsyncError(async (req, res, next) => {
    const {code}=req.body
    const cart = await cartModel.findOne({user_id:req.user_id})
    if(!code) 
    cart.coupon_id=null
    await cart.save()
    res.status(200).json({
        success: true,
        message:"Coupon removed",
        
    })

    const coupon = await couponModel.findOne({code,expiry:{$gte:Date.now()}})
    if(!coupon) throw new AppError("Coupon Invalid", 404);
    cart.coupon_id=coupon._id
    await cart.save()
    res.status(200).json({
        success: true,
        message:"Coupon applied",
        data: cart
        
    })

    
})