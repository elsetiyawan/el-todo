const { Joi } = require("express-validation");
module.exports = {
  createTodo: {
    body: Joi.object({
      description: Joi.string().required(),
      deadline: Joi.date().required(),
    }),
  },
};
