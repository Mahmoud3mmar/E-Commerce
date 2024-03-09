import mongoose from 'mongoose'
import { DeleteImage } from '../../../utils/image.js'
import categoryModel from '../../product/models/category.model.js'

const imageSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		minLength: 3,
		maxLength: 500,
		required: true,
	},
	path: {
		type: String,
		trim: true,
		required: true,
	},
})


imageSchema.pre(/delete/i, async function (next) {
	const ToBeDeltedImage= await imageModel.findOne(this._conditions)
	if(!ToBeDeltedImage) return next()
	DeleteImage(ToBeDeltedImage.name)
	next()
}) 


const imageModel = mongoose.model('image', imageSchema)

export default imageModel
