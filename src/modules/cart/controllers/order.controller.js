import  dotenv from "dotenv";
import { ApiFeatures } from "../../../utils/apifeatures.js";
import {  catchAsyncError } from "../../../utils/error.handler";
import productModel from "../../product/models/product.model.js";
import orderModel from "../models/order.model.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const getUserOrders = catchAsyncError(async (req, res, next) => {
    const ApiFeatures= new ApiFeatures(orderModel.find({user_id:req.user_id})).paginate(10)
    const Orders = await ApiFeatures.query();
    res.status(200).json({
        success: true,
        data: Orders
    })
})


export const makeCODOrder=catchAsyncError(async(req,res,next)=>{
    const cart = await cartModel.findOne({user_id:req.user_id})
    cart.product.forEach((product)=>{
        if(product.product_id.stock<product.quantity) throw new AppError("Product out of stock", 400);
    })
    const order = await orderModel.create({
        user_id:req.user_id,
        coupon:{
            discount:cart.coupon_id?.discount||0


        },
        products:cart.products.map(({product_id:{title,price,discounted_price},quantity})=>({
            quantity,
            product:{
                title,price,discounted_price,
            }
        })
            
        ),
        ...req.body,
    })
    
    if(!order) throw new AppError("Order failed", 404);
   
    const bulkWriteOptions=cart.products.map(({product_id:{_id},quantity})=>({
        updateOne:{
            filter:{_id},
            update:{
                $inc:{stock:-quantity},
            },

            
        },

    })
    
    )

    await productModel.bulkWrite(bulkWriteOptions)
    res.status(200).json({
        success: true,
        data: order
    })
})



export const makePaymentSession = catchAsyncError(async (req, res, next) => {


    const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency: "EGB",
                    unit_amount: cart.total_price*100,
                    product:{
                        name:'req.user.name'
                    }
                },
                quantity:1,
            },
        ],
        mode:'payment',
        success_url:"https://www.google.com.eg/?gfe_rd=cr&ei=YMfCU4vDB6SI8Qf36IGICQ&gws_rd=ssl",
        cancel_url:"https://www.google.com.eg/?gfe_rd=cr&ei=YMfCU4vDB6SI8Qf36IGICQ&gws_rd=ssl",
        client_reference_id: cart._id,
        customer_email:req.user.email,


    })

    res.json({
        success: true,
        data: session
    })
})