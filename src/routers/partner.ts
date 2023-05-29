import { Request, Router } from "express";
import prisma from "../db/prisma-client.js";
import { errorChecked } from "../utils.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.partner.findMany({});
    res.status(200).json({ partners: result, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newPartner = await prisma.partner.create({ data: req.body });
    res.status(200).json({ newPartner, ok: true });
  })
);

export interface RequestWithPartnerId extends Request {
    partnerId: number;
}

router.use("/:id", async (req: RequestWithPartnerId, res, next) => {
  const { id } = req.params;
  req.partnerId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithPartnerId, res) => {
    const partner = await prisma.partner.findUniqueOrThrow({
      where: { id: req.partnerId },
    });
    res.status(200).json(partner);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithPartnerId, res) => {
    const updatedPartner = await prisma.partner.update({
      where: { id: req.partnerId },
      data: req.body,
    });
    res.status(200).json(updatedPartner);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithPartnerId, res) => {
    const deletedPartner = await prisma.partner.delete({
      where: { id: req.partnerId },
    });
    res.status(200).json(deletedPartner);
  })
);

export default router;
