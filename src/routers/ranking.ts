import { Request, Router } from "express";
import prisma from "../db/prisma-client.js";
import { errorChecked } from "../utils.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.ranking.findMany({});
    res.status(200).json({ rankings: result, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newRanking = await prisma.ranking.create({ data: req.body });
    res.status(200).json({ newRanking, ok: true });
  })
);

export interface RequestWithRankingId extends Request {
    rankingId: number;
}

router.use("/:id", async (req: RequestWithRankingId, res, next) => {
  const { id } = req.params;
  req.rankingId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithRankingId, res) => {
    const ranking = await prisma.ranking.findUniqueOrThrow({
      where: { id: req.rankingId },
    });
    res.status(200).json(ranking);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithRankingId, res) => {
    const updatedRanking = await prisma.ranking.update({
      where: { id: req.rankingId },
      data: req.body,
    });
    res.status(200).json(updatedRanking);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithRankingId, res) => {
    const deletedRanking = await prisma.ranking.delete({
      where: { id: req.rankingId },
    });
    res.status(200).json(deletedRanking);
  })
);

export default router;
