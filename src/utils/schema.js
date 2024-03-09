import Joi from 'joi'

const modelId = Joi.string().hex().length(24)


const phone_number=Joi.string().pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
export const schemas = {
	modelId,
	phone_number
}
