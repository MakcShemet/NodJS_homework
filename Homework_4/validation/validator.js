function checkParams(schema) {
    return (req, res, next) => {
        const validationResult = schema.validate(req.params);
        if (validationResult.errors) {
            return res.status(400).send(validationResult.errors.detailse);
        }
        next();
    }
}

function checkBody(schema) {
    return (req, res, next) => {
        const validationResult = schema.validate(req.params);
        if (validationResult.errors) {
            return res.status(400).send(validationResult.errors.detailse);
        }
        next();
    }
}

module.exports = { checkParams, checkBody }