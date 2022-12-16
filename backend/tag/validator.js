const Joi = require('joi')

module.exports = {
    validateCreate: (req, res, next) => {
        const schema = Joi.object({
          name: Joi.string().max(50).required(),
          description: Joi.string().max(500).required(),
        });
        const result = schema.validate(req.body);
        if (result.error) {
          return res.status(400).send(result.error.details[0].message);
        }
        next();
      },
      
}