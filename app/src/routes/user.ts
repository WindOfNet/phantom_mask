import express from "express";
import { param, query } from "express-validator";
import controller from "../controllers/user";
import isValidDateFormat from "../utils/isValidDateFormat";
import requestValidation from "../middlewares/requestValidation";

const router = express.Router();

router.get(
  "/transactions/rank/:limit",
  param("limit").isInt({ min: 1 }),
  query("startDate")
    .optional()
    .isString()
    .isDate({ format: "YYYY-MM-DD", strictMode: true })
    .withMessage("invalid date"),
  query("endDate")
    .optional()
    .isString()
    .isDate({ format: "YYYY-MM-DD", strictMode: true })
    .withMessage("invalid date"),
  requestValidation,
  controller.getTransactionRank,
);

export default router;
