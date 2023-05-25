import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.jsdoc";
import pharmacyRoutes from "./routes/pharmacy";
import userRoutes from "./routes/user";
import maskRoutes from "./routes/mask";
import searchRoutes from "./routes/search";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/pharmacies", pharmacyRoutes);
app.use("/users", userRoutes);
app.use("/masks", maskRoutes);
app.use("/search", searchRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", (_, res) => res.send("alive"));

const port = process.env["PORT"] ?? 3000;
app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
