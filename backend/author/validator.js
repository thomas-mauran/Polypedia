const Joi = require('joi')

module.exports = {
    validateCreate: (req, res, next) => {
        const schema = Joi.object({
          fullname: Joi.string().min(4).max(100).required(),
        });
        const result = schema.validate(req.body);
        if (result.error) {
          return res.status(400).send(result.error.details[0].message);
        }
        next();
      },
      
}