import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.promotion.findMany({});
    res.status(200).json({ partners: result, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newPartner = await prisma.promotion.create({ data: req.body });
    res.status(200).json({ newPartner, ok: true });
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
    const partner = await prisma.partner.findUniqueOrThrow({
      where: { id: req.promotionId },
    });
    res.status(200).json(partner);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithPromotionId, res) => {
    const updatedPartner = await prisma.partner.update({
      where: { id: req.promotionId },
      data: req.body,
    });
    res.status(200).json(updatedPartner);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithPromotionId, res) => {
    const deletePartner = await prisma.partner.delete({
      where: { id: req.promotionId },
    });
    res.status(200).json(deletePartner);
  })
);

export default router;