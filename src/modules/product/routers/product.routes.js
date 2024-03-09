import { Router } from 'express'
import {
	attachAddQuery,
	attachDeleteQuery,
	attachFindQuery,
	attachUpdateQuery,
} from '../../../middlewares/query.middleware.js'
import productModel from '../models/product.model.js'
import { executeQuery } from '../../../handlers/execute.handler.js'
import { filterQuery } from '../../../middlewares/features.middleware.js'
import { validate } from '../../../middlewares/validation.middleware.js'
import {
	addProductSchema,
	deleteProductSchema,
	updateProductSchema,
} from '../validations/product.validations.js'
import subcategoriesRouter from './subcategories.routes.js'
import { attachImage } from '../../image/middleware/image.middleware.js'
import {upload}	from '../../../middlewares/upload.middleware.js'
import { attachCoverImage } from '../middlewares/product.middlewares.js'
import { addProductWithImages } from '../controllers/product.controller.js'


const router = Router({ mergeParams: true })

router
.route('/')
.get(
        attachFindQuery(productModel),
        paginatequery(3),
        populateQuery('subcategory_id',['name']),
        sortQuery(),
        selectFieldsQuery(),
        searchQuery([])
)
.post(
        upload.fields([{name:'cover_image',maxCount:1},{name:'images',maxCount:10}]),
        validate(addProductSchema),
        attachCoverImage(),
		attachAddQuery(productModel),
		// executeQuery({status:201})
        addProductWithImages()
)



router.
route('/:productSlug')
.get(
    attachFindQuery(productModel),
    filterOne({fieldName:'slug',paramName:'productSlug'}),
    executeQuery()
)

export default router
