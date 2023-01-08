const Joi = require('joi')

module.exports = {
    validateSignup: (req, res, next) => {
        const schema = Joi.object({
          username: Joi.string().min(4).max(75).required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(4).max(255).required(),
          is_admin: Joi.boolean()
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

      validateUpdate: (req, res, next) => {
        const schema = Joi.object({
          username: Joi.string().min(4).max(75).required(),
          email: Joi.string().email().required(),
          is_admin: Joi.boolean()
        });
        const result = schema.validate(req.body);
        if (result.error) {
          return res.status(400).send(result.error.details[0].message);
        }
        next();
      },
      
}