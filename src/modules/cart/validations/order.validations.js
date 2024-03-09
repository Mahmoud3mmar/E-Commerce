import Joi from "joi";
import { schemas } from "../../../utils/schema";




export const addorderSchema = Joi.object({
    body: {
        address: Joi.string().required(),
        phone_number: schemas.phone_number.required()
    },   
    params: {},
    query: {},

})
export const deleteorderSchema = Joi.object({
    body: { order_id: schemas.modelId.required() },
    params: {},
    query: {},
})