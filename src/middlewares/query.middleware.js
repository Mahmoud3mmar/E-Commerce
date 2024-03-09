export const attachFindQuery = (model) => {
	return (req, res, next) => {
		req.dbquery = model.find({})
		next()
	}
}

export const attachAddQuery = (model) => {
	return (req, res, next) => {
		req.dbquery = model.create(req.body)
		next()
	}
}

export const attachUpdateQuery = (model) => {
	return (req, res, next) => {
		req.dbquery = model.updateMany({}, req.body)
		next()
	}
}

export const attachDeleteQuery = (model) => {
	return (req, res, next) => {
		req.dbquery = model.deleteMany({})
		next()
	}
}
