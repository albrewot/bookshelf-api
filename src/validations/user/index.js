//helpers
const { validateWrapper } = require("../helpers");
const { UserRegisterSchema } = require("./schemas");

const switchUserSchema = (schema, body) => {
  let result;
  switch (schema) {
    case "register":
      {
        result = validateWrapper(UserRegisterSchema, body);
      }
      break;
    default:
      result = { message: "Error while validating" };
  }
  return result;
};

module.exports = switchUserSchema;
