import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pharmacyRoutes from "./routes/pharmacy";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/pharmacies", pharmacyRoutes);

app.use("/", (_, res) => res.send("hello world"));

const port = process.env["PORT"] ?? 3000;
app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
