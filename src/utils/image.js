
import {v2 as cloudinary} from 'cloudinary'


export const UploadImage=async(path)=>{

 const {public_id:ImageName,secure_url:ImageUrl}=await cloudinary.uploader.upload(path)
 
 return {ImageName,ImageUrl}
}


export const DeleteImage=async(ImageName)=>{

    await cloudinary.uploader.destroy(path) 
}