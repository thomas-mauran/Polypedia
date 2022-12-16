const Joi = require('joi')

module.exports = {
    validateSignup: (req, res, next) => {
        const schema = Joi.object({
          username: Joi.string().max(75).required(),
          email: Joi.string().email().required(),
          password: Joi.string().max(255).required(),
        });
        const result = schema.validate(req.body);
        if (result.error) {
          return res.status(400).send(result.error.details[0].message);
        }
        next();
      },

      validateLogin: (req, res, next) => {
        const schema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().max(255).required(),
        });
        const result = schema.validate(req.body);
        if (result.error) {
          return res.status(400).send(result.error.details[0].message);
        }
        next();
      },
      
}