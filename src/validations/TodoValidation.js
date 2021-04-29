const { Joi } = require("express-validation");
module.exports = {
  createTodo: {
    body: Joi.object({
      description: Joi.string().max(100).required(),
      deadline: Joi.date().iso().greater("now").required(),
    }),
  },
  updateTodo: {
    body: Joi.object({
      description: Joi.string().max(100).required(),
      deadline: Joi.date().iso().required(),
      done: Joi.boolean().required(),
    }),
  },
};
