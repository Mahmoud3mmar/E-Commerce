import { catchAsyncError } from "../../../utils/error.handler.js";
import { ApiFeatures } from "../../../utils/apifeatures.js.js";

import productModel from "../models/product.model.js";
import { makeImage } from "../../image/utils/image.utils.js";
import imageOnProductModel from "../models/imageOnProduct.js";


export const getProducts = catchAsyncError(async (req, res) => {
    const apiFeature = new ApiFeatures(productModel.find(), req.query).paginate(2)
    const message = await apiFeature.query
    res.json(message);
})

export const addProductWithImages = ()=> {
    catchAsyncError(async (req, res, next) => {
      const product = await req.dbQuery
      await Promise.all(
      req.file.image.map(async file=>{
        try{
           const image = await makeImage(file.path)
            await imageOnProductModel.create({
                image_id: image._id,
                product_id: product._id
            })
        }catch(err){
            return next(err)
        }
    })
    )
    res.status(201).json({
        success: true,
        message: `added product with ${req.files.images.length} images`,
    }) 
 })
    


}