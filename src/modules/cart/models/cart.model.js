import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		products: [
			{
				product_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'product',
					required: true,
					
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
			},
		],
		coupon_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'coupon',
			
		},
		
		
		
	},
	{ timestamps: true ,
	toJSON:{virtuals: true},
	toObject:{virtuals: true}
	}
)
cartSchema.pre(/find/, function (next) {
	this.populate({
		path: 'user_id',
		populate: {
			path:'product_id',
			model:'product'
		}
	})
	this.populate('coupon_id')
	next()
	
})
cartSchema.virtual('total_price').get(function () {
	
	return this.products.reduce((total, product) => {
		
	})
})
const cartModel = mongoose.model('cart', cartSchema)

export default cartModel
