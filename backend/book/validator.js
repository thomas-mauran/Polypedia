const Joi = require('joi')
module.exports = {
    validateCreate: (req, res, next) => {

        const schema = Joi.object({
            title: Joi.string().min(2).max(255).required(),
            description: Joi.string().min(5).max(500).required(),
            pageNumber: Joi.number().required(),
            language: Joi.number().required(),
            authors: Joi.string(),
            tags: Joi.array(),
            file: Joi.string().valid("application/pdf").required().messages({
              'string.base': "You must select a file to upload",
        })})

        const object = {
            title: req.body.title,
            description: req.body.description,
            pageNumber: req.body.pageNumber,
            language: req.body.language,
            authors: req.body.authors,
            tags: JSON.parse(req.body.tags),
            file: req.file ? req.file.mimetype : null,
        }
        const result = schema.validate(object);
        if (result.error) {
          return res.status(400).send(result.error.details[0].message);
        }
        next();
      },
      
}