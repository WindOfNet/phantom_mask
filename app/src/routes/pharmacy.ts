import express from "express";
import { query, param, oneOf } from "express-validator";
import controller from "../controllers/pharmacy";
import requestValidation from "../middlewares/requestValidation";

const router = express.Router();

router.get(
  "/",
  query("time").isTime({ hourFormat: "hour24" }),
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

router.get(
  "/masks",
  query("minPrice").isNumeric(),
  query("maxPrice").isNumeric(),
  requestValidation,
  controller.listPharmaciesMasks,
);

export default router;
