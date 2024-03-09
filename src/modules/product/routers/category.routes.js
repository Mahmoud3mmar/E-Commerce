import { Router } from 'express'
import {
	attachAddQuery,
	attachDeleteQuery,
	attachFindQuery,
	attachUpdateQuery,
} from '../../../middlewares/query.middleware.js'
import categoryModel from '../models/category.model.js'
import { executeQuery } from '../../../handlers/execute.handler.js'
import { filterQuery } from '../../../middlewares/features.middleware.js'
import { validate } from '../../../middlewares/validation.middleware.js'
import {
	addCategorySchema,
	deleteCategorySchema,
	updateCategorySchema,
} from '../validations/category.validations.js'
import subcategoriesRouter from './subcategories.routes.js'
import { attachImage } from '../../image/middleware/image.middleware.js'
import {upload}	from '../../../middlewares/upload.middleware.js'
const router = Router()

router
	.route('/')
	.get(attachFindQuery(categoryModel), executeQuery())
	.post(
		upload.single('image'),
		validate(addCategorySchema),
		attachImage('image'),
		attachAddQuery(categoryModel),
		executeQuery({ status: 201 })
	)

router
	.route('/:slug')
	.get(attachFindQuery(categoryModel), filterQuery(), executeQuery())
	.put(
		validate(updateCategorySchema),
		attachUpdateQuery(categoryModel),
		filterQuery(),
		executeQuery()
	)
	.delete(
		validate(deleteCategorySchema),
		attachDeleteQuery(categoryModel),
		filterQuery(),
		executeQuery()
	)

router.use('/:categorySlug/subcategories', subcategoriesRouter)

export default router
