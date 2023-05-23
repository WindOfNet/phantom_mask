import express from "express";
import { query, param } from "express-validator";
import controller from "../controllers/pharmacy";
import isValidTimeFormat from "../utils/isValidTimeFormat";
import requestValidation from "../middlewares/requestValidation";

const router = express.Router();

router.get(
  "/",
  query("time").custom(isValidTimeFormat).withMessage("invalid time format"),
  query("dayOfWeek")
    .optional()
    .isIn([1, 2, 3, 4, 5, 6, 7])
    .withMessage("should be of 1~7"),
  requestValidation,
  controller.listPharmacies,
);

router.get(
  "/:pharmacyName/masks",
  param("pharmacyName").isString(),
  query("sortBy")
    .optional()
    .isIn(["maskName", "price"])
    .withMessage("invalid sortBy"),
  query("sortDirection")
    .optional()
    .toLowerCase()
    .isIn(["asc", "desc"])
    .withMessage("invalid direction"),
  requestValidation,
  controller.listPharmacyMasks,
);

export default router;
