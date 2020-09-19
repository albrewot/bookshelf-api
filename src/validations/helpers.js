const Joi = require("@hapi/joi");

const validateWrapper = (schema, body) => {
  return Joi.validate(body, schema, (err, value) => {
    if (err) {
      let errors = [];

      for (let error of err.details) {
        errors.push(error.message);
      }
      return { error: errors };
    } else {
      return value;
    }
  });
};

module.exports = {
  validateWrapper,
};
