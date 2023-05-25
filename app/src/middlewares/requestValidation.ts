import express from "express";
import { validationResult } from "express-validator";

const requestValidation = (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response.status(400).send({ errors: errors.array() });
  }

  next();
};

export default requestValidation;
