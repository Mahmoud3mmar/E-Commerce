import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		products: [
			{
				product: {
					title:String,
					price:Number,
					discounted_price:Number,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
		coupon: {

			discount:Number,

		},
		address:{
			type:String,

		},
		phone_number:String,
		payment_Type:{
			type:String,
			enum:['COD','CARD'],
			default:'COD',
		},
		ispaid:{
			type:Boolean,
			default:false
		},
		is_delivered:{
			type:Boolean,
			default:false
		},

	},
	{ timestamps: true }
)



orderSchema.virtual('total_price').get(function () {
	
	const total = this.products.reduce(
		(acc,entry)=>
			acc+entry.product.price*entry.quantity,
			0
	)
	return total
})
	
orderSchema.virtual('total_Discounted_price').get(function () {
	
	const total = this.products.reduce(
		(acc,entry)=>
			acc+entry.product.discounted_price*entry.quantity,
			0
	)
	return total - ((this.coupon?.discount||0)/100)*total
})

const orderModel = mongoose.model('order', orderSchema)

export default orderModel
