import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.position.findMany({});
    res.status(200).json({ positions: result, ok: true });
  })
);

router.get(
  "/top-winners",
  errorChecked(async (req, res) => {
    const usersWithGamesWon = await prisma.position.groupBy({
      by: ['userName'],
      _sum: {
        gamesWon: true,
        prize: true
      },
      orderBy: [
        {
          _sum: {
            gamesWon: 'desc'
          }
        }
      ],
      take: 20
    });
    res.status(200).json({ topWinners: usersWithGamesWon, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newPosition = await prisma.position.create({ data: req.body });
    res.status(200).json({ newPosition, ok: true });
  })
);

export interface RequestWithPositionId extends Request {
    positionId: number;
}

router.use("/:id", async (req: RequestWithPositionId, res, next) => {
  const { id } = req.params;
  req.positionId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithPositionId, res) => {
    const position = await prisma.position.findUniqueOrThrow({
      where: { id: req.positionId },
    });
    res.status(200).json(position);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithPositionId, res) => {
    const updatedPosition = await prisma.position.update({
      where: { id: req.positionId },
      data: req.body,
    });
    res.status(200).json(updatedPosition);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithPositionId, res) => {
    const deletedPosition = await prisma.position.delete({
      where: { id: req.positionId },
    });
    res.status(200).json(deletedPosition);
  })
);

export default router;
