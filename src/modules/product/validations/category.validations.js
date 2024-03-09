import Joi from 'joi'

export const addCategorySchema = Joi.object({
	body: {
		name: Joi.string().min(3).max(200).trim(),
	},
	params: {},
	query: {},
	file:Joi.object.required()
})

export const updateCategorySchema = Joi.object({
	body: {
		name: Joi.string().min(3).max(200).trim(),
	},
	params: { slug: Joi.string() },
	query: {},
	file:Joi.object.required()

})

export const deleteCategorySchema = Joi.object({
	body: {},
	params: { slug: Joi.string() },
	query: {},
})
