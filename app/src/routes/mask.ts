import express from "express";
import { query } from "express-validator";
import controller from "../controllers/mask";
import requestValidation from "../middlewares/requestValidation";

const router = express.Router();

router.get(
  "/transactions",
  query("startDate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
  query("endDate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
  requestValidation,
  controller.getTransactions,
);

export default router;
