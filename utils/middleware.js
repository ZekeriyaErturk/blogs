const logger = require("./logger");
const chalk = require("chalk");

const requestLogger = (req, res, next) => {
  logger.info(
    `Method: ${chalk.blue(req.method)} | Path: ${chalk.yellow(req.path)}`
  );
  logger.info("Body: ", req.body);
  logger.info("------------");
  next();
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  }

  next(err);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }

  next();
};

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  tokenExtractor,
  requestLogger,
  unknownEndPoint,
  errorHandler,
};
