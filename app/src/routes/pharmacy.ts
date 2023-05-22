import express from "express";
import { query } from "express-validator";
import controller from "../controllers/pharmacy";
import isValidTimeFormat from "../utils/isValidTimeFormat";
import requestValidation from "../middlewares/requestValidation";

const router = express.Router();

router.get(
  "/",
  query("time").custom(isValidTimeFormat).withMessage("invalid openTime"),
  query("dayOfWeek")
    .optional()
    .isIn([1, 2, 3, 4, 5, 6, 7])
    .withMessage("should be of 1~7"),
  requestValidation,
  controller.list,
);

export default router;
