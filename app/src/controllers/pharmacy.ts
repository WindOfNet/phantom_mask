import express from "express";
import service from "../services/pharmacy";

const listPharmacies = async (req: express.Request, res: express.Response) => {
  const { time, dayOfWeek } = req.query;
  const r = await service.listPharmacies(time as string, Number(dayOfWeek));
  res.send(r);
};

const listPharmacyMasks = async (
  req: express.Request,
  res: express.Response,
) => {
  const pharmacyName = req.params["pharmacyName"];
  const sortBy = req.query["sortBy"];
  const sortDirection = req.query["sortDirection"];
  const r = await service.listPharmacyMasks(
    pharmacyName as string,
    sortBy as string,
    (sortDirection as string) ?? "asc",
  );
  res.send(r);
};

export default { listPharmacies, listPharmacyMasks };
