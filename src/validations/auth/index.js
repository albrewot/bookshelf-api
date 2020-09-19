//helpers
const { validateWrapper } = require("../helpers");

const applySchema = (schema, body) => {
  let result;
  result = validateWrapper(schema, body);
  return result;
};

module.exports = applySchema;
