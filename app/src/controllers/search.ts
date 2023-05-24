import express from "express";
import service from "../services/search";

const search = async (req: express.Request, res: express.Response) => {
  const searchTerm = req.params["searchTerm"];
  const r = await service.search(searchTerm);
  res.send(r);
};

export default { search };
