import express from "express";
import { query, param } from "express-validator";
import controller from "../controllers/user";
import requestValidation from "../middlewares/requestValidation";

const router = express.Router();

router.get(
  "/transactions/rank/:limit",
  param("limit").isInt({ min: 1 }),
  query("startDate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
  query("endDate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
  requestValidation,
  controller.getTransactionRank,
);

export default router;
