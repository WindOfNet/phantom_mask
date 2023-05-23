import express from "express";
import service from "../services/mask";

const getTransactions = async (req: express.Request, res: express.Response) => {
  const { startDate, endDate } = req.query;
  const r = await service.getTransactions(
    startDate as string,
    endDate as string,
  );
  res.send(r);
};

export default { getTransactions };
