import express from "express";
import { query } from "express-validator";
import controller from "../controllers/mask";
import requestValidation from "../middlewares/requestValidation";

const router = express.Router();

/**
 * @openapi
 * /masks/transactions:
 *   get:
 *     tags:
 *       - masks
 *     description: The total amount of masks and dollar value of transactions within a date range.
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         description: date range of start (YYYY-MM-DD)
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         required: true
 *         description: date range of end (YYYY-MM-DD)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: all masks total amount and dollar
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
 *                   amount:
 *                     type: string
 *                     description: sold amount
 *                   amountDollar:
 *                     type: string
 *                     description: sold amount of dollar
 *       400:
 *         description: missing required params or date format invalid
 */
router.get(
  "/transactions",
  query("startDate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
  query("endDate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
  requestValidation,
  controller.getTransactions,
);

export default router;
