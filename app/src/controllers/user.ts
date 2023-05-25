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

const purchase = async (req: express.Request, res: express.Response) => {
  const user = req.params["user"];
  const { pharmacy, mask } = req.body;
  const { isSuccess, payload } = await service.purchase(
    user as string,
    pharmacy as string,
    mask as string,
  );

  if (!isSuccess) {
    res.status(403);
  }

  res.send(payload);
};

export default { getTransactionRank, purchase };
