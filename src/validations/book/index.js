const { validateWrapper } = require("../helpers");
const { BookRegisterSchema } = require("./schemas");

const validateBookSchema = (schema, body) => {
    let result;
    switch (schema) {
      case "register":
        {
          result = validateWrapper(BookRegisterSchema, body);
        }
        break;
      default:
        result = { message: "Error while validating" };
    }
    return result;
};

module.exports = validateBookSchema;
