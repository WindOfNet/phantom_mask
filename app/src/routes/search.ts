import express from "express";
import { query, param } from "express-validator";
import controller from "../controllers/search";
import requestValidation from "../middlewares/requestValidation";

const router = express.Router();

router.get(
  "/:searchTerm",
  param("searchTerm").isString(),
  requestValidation,
  controller.search,
);

export default router;
