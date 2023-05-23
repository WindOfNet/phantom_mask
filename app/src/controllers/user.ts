import express from "express";
import service from "../services/user";

const getTransactionRank = async (
  req: express.Request,
  res: express.Response,
) => {
  const limit = req.params["limit"];
  const { startDate, endDate } = req.query;
  const r = await service.getTransactionRank(
    Number(limit),
    startDate as string,
    endDate as string,
  );
  res.send(r);
};

export default { getTransactionRank };
