const Joi = require("@hapi/joi");

const validateWrapper = (schema, body) => {
  return Joi.validate(body, schema, (err, value) => {
    if (err) {
      return { error: { message: err.details[0].message } };
    } else {
      return value;
    }
  });
};

module.exports = {
  validateWrapper,
};
