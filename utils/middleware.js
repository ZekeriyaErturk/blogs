const logger = require("./logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (err.name) {
    return res.status(400).send({ error: err.message });
  }
  next(err);
};

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  unknownEndPoint,
  errorHandler,
};
