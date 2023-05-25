import express from "express";
import { param } from "express-validator";
import controller from "../controllers/search";
import requestValidation from "../middlewares/requestValidation";

const router = express.Router();

/**
 * @openapi
 * /search/{searchTerm}:
 *   get:
 *     tags:
 *       - search
 *     description: Search for pharmacies or masks by name, ranked by relevance to the search term.
 *     parameters:
 *       - in: path
 *         name: searchTerm
 *         required: true
 *         description: the search term for pharmacies or masks by name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: a list of search result, ranked by sold count of pharmacy and price
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
 *                   sold:
 *                     type: integer
 *                     description: the mask sold count of pharmacy
 *       400:
 *         description: missing required params or date format invalid
 */
router.get(
  "/:searchTerm",
  param("searchTerm").isString(),
  requestValidation,
  controller.search,
);

export default router;
