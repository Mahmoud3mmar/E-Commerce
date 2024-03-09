import { UploadImage } from "../../../utils/image.js"
import imageModel from "../models/image.model.js"




export const makeImage=async(path)=>{
    const {ImageName,ImageUrl}= await UploadImage(path)
    await imageModel.create({name:ImageName,path:ImageUrl})

}