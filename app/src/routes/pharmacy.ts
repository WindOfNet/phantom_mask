import express from "express";
import { query, param } from "express-validator";
import controller from "../controllers/pharmacy";
import requestValidation from "../middlewares/requestValidation";

const router = express.Router();

/**
 * @openapi
 * /pharmacies:
 *   get:
 *     tags:
 *       - pharmacies
 *     description: List all pharmacies open at a specific time and on a day of the week if requested.
 *     parameters:
 *       - in: query
 *         name: time
 *         required: true
 *         description: the open at specific time (HH:mm)
 *         schema:
 *           type: string
 *       - in: query
 *         name: dayOfWeek
 *         required: false
 *         description: the open on a day of the week (1~7)
 *         schema:
 *           type: number
 *           enum: [1, 2, 3, 4, 5, 6, 7]
 *     responses:
 *       200:
 *         description: a list of pharmacies name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pharmacyName:
 *                     type: string
 *                     description: the pharmacy name
 *                   openTime:
 *                     type: string
 *                     description: pharmacy open time (24h format)
 *                   closeTime:
 *                     type: string
 *                     description: pharmacy close time (24H format)
 *                   dayOfWeek:
 *                     type: number
 *                     dayOfWeek: the day of week (1~7)
 *       400:
 *         description: missing required params or time format or dayOfWeek invalid
 */
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

/**
 * @openapi
 * /pharmacies/{pharmacyName}/masks:
 *   get:
 *     tags:
 *       - pharmacies
 *     description: List all masks sold by a given pharmacy, sorted by mask name or price.
 *     parameters:
 *       - in: path
 *         name: pharmacyName
 *         required: true
 *         description: the pharmacy name
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         required: false
 *         description: results will sort by a specify field
 *         schema:
 *           type: string
 *           enum: ["maskName", "price"]
 *       - in: query
 *         name: sortDirection
 *         required: false
 *         description: "results sorted direction (asc or desc), default: asc"
 *         schema:
 *           type: string
 *           enum: ["asc", "desc"]
 *     responses:
 *       200:
 *         description: a list of pharmacies name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   maskName:
 *                     type: string
 *                     description: the mask name
 *                   price:
 *                     type: number
 *                     description: the mask price
 *       400:
 *         description: missing required params or invalid
 */
router.get(
  "/:pharmacyName/masks",
  param("pharmacyName").isString(),
  query("sortBy")
    .optional()
    .isIn(["maskName", "price"])
    .withMessage("invalid sortBy"),
  query("sortDirection")
    .optional()
    .default("asc")
    .toLowerCase()
    .isIn(["asc", "desc"])
    .withMessage("invalid direction"),
  requestValidation,
  controller.listPharmacyMasks,
);

/**
 * @openapi
 * /pharmacies/masks:
 *   get:
 *     tags:
 *       - pharmacies
 *     description: List all pharmacies with more or less than x mask products within a price range.
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         required: true
 *         description: the price range of min
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         required: true
 *         description: the price range of max
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: a list of pharmacies with mask products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pharmacyName:
 *                     type: string
 *                     description: the pharmacy name
 *                   maskName:
 *                     type: string
 *                     description: the mask name
 *                   price:
 *                     type: number
 *                     description: the mask price
 *       400:
 *         description: missing required params or invalid
 */
router.get(
  "/masks",
  query("minPrice").isNumeric(),
  query("maxPrice").isNumeric(),
  requestValidation,
  controller.listPharmaciesMasks,
);

export default router;
