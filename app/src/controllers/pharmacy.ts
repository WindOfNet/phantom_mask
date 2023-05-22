import express from "express";
import service from "../services/pharmacy";

export const list = async (req: express.Request, res: express.Response) => {
  const { time, dayOfWeek } = req.query;
  const r = await service.listPharmacy(time as string, Number(dayOfWeek));
  res.send(r);
};

export default { list };
