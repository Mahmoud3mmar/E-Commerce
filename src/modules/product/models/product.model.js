import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
	{
		title: {
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
			required: true,
			trim: true,
			unique: true,
		},
		description: {
			type: String,
			minLength: 3,
			maxLength: 10000,
			required: true,
			trim: true,
		},
		stock: {
			type: Number,
			min: 0,
			required: true,
		},
		price: {
			type: Number,
			min: 0.01,
			required: true,
		},
		discounted_price: {
			type: Number,
			min: 0.01,
			required: true,
			validate: {
				validator: function (value) {
					return value <= this.price
				},
				message:
					'The discounted price must not exceed the initial price',
			},
		},
		cover_image: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'image',
		},
		features: [
			{
				key: String,
				value: String,
			},
		],
		subcategory_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'subcategory',
			required: true,
		},
	},
	{ timestamps: true ,
	toJSON:{virtuals: true},
	toObject:{virtuals: true} 
	}
)

productSchema.pre('save', function (next) {
	this.slug = slugify(this.title, { lower: true })
	next()
})

productSchema.pre('UpdateMany', function (next) {
	if(this._update.title) {
		this._update.slug = slugify(this._update.title, { lower: true })
	}
	next()
})

productSchema.pre(/find/, function (next) {
	this.populate('cover_image')
	next()
})

productSchema.virtual('images', {
	ref: 'imageOnProduct',
	localField:'_id',
	foreignField:'product_id',
})
productSchema.pre(/find/, function (next) {
	this.populate('images',['product_id'])
	next()
})
const productModel = mongoose.model('product', productSchema)

export default productModel
