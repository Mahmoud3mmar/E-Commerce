import mongoose from 'mongoose'
import slugify from 'slugify'

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			minLength: 3,
			maxLength: 200,
			required: true,
			trim: true,
			unique: true,
		},
		slug: {
			type: String,
			minLength: 3,
			maxLength: 200,
			trim: true,
			unique: true,
		},
		image: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'image',
			required: true,
		},
	},
	{ timestamps: true }
)

categorySchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true })
	next()
})

categorySchema.pre('updateMany', function (next) {
	this._update.slug = slugify(this._update.name, { lower: true })
	next()
})

categorySchema.pre(/find/, function (next) {
	this.populate ('image', ['path'])
	next()
})

categorySchema.pre(/delete/i, async function (next) {
	const ToBeDeltedCategory= await categoryModel.findOne(this._conditions)
	if(!ToBeDeltedCategory) return next()
	mongoose.model('image').findByIdAndDelete(ToBeDeltedCategory.image)
	next()
})



const categoryModel = mongoose.model('category', categorySchema)

export default categoryModel
