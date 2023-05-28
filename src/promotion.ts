import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.promotion.findMany({});
    res.status(200).json({ promotions: result, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newPromotion = await prisma.promotion.create({ data: req.body });
    res.status(200).json({ newPromotion, ok: true });
  })
);

export interface RequestWithPromotionId extends Request {
  promotionId: number;
}

router.use("/:id", async (req: RequestWithPromotionId, res, next) => {
  const { id } = req.params;
  req.promotionId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithPromotionId, res) => {
    const promotion = await prisma.promotion.findUniqueOrThrow({
      where: { id: req.promotionId },
    });
    res.status(200).json(promotion);
  })
);

router.get(
  "/:id/listofwinners",
  errorChecked(async (req: RequestWithPromotionId, res) => {
    const currentDate = new Date();

    const positions = await prisma.position.findMany({
      where: {
        ranking: {
          AND: [
            {
              tournament: {
                promotionId: req.promotionId,
              },
            },
            {
              startDate: {
                lte: currentDate,
              },
            },
            {
              endDate: {
                gte: currentDate,
              },
            },
          ],
        },
      },
      take: 20, 
      orderBy: {
        position: "asc", 
      },
    });
    res.status(200).json({ listOfWinners: positions, ok: true });
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithPromotionId, res) => {
    const updatedPromotion = await prisma.promotion.update({
      where: { id: req.promotionId },
      data: req.body,
    });
    res.status(200).json(updatedPromotion);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithPromotionId, res) => {
    const deletePromotion = await prisma.promotion.delete({
      where: { id: req.promotionId },
    });
    res.status(200).json(deletePromotion);
  })
);

export default router;
