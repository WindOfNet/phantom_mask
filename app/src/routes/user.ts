import express from "express";
import { query, param, body } from "express-validator";
import controller from "../controllers/user";
import requestValidation from "../middlewares/requestValidation";

const router = express.Router();

/**
 * @openapi
 * /users/transactions/rank/{limit}:
 *   get:
 *     tags:
 *       - users
 *     description: The top x users by total transaction amount of masks within a date range.
 *     parameters:
 *       - in: path
 *         name: limit
 *         required: true
 *         description: ranked limit
 *         schema:
 *           type: integer
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
 *         description: a list of rank
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userName:
 *                     type: string
 *                     description: the user name
 *                   total:
 *                     type: number
 *                     description: the user total transaction amount
 *       400:
 *         description: missing required params or date format invalid
 */
router.get(
  "/transactions/rank/:limit",
  param("limit").isInt({ min: 1 }),
  query("startDate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
  query("endDate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
  requestValidation,
  controller.getTransactionRank,
);

/**
 * @openapi
 * /users/{user}/purchase:
 *   post:
 *     tags:
 *       - users
 *     description: user purchases a mask from a pharmacy
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         description: the user name
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pharmacy:
 *                 type: string
 *                 required: true
 *                 description: the pharmacy name
 *               mask:
 *                 type: string
 *                 required: true
 *                 description: the mask name
 *     responses:
 *       200:
 *         description: purchase success
 *       400:
 *         description: missing required fields or invalid
 *       403:
 *         description: fail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: fail reason
 */
router.post(
  "/:user/purchase",
  body("pharmacy").isString(),
  body("mask").isString(),
  requestValidation,
  controller.purchase,
);

export default router;
