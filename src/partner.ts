import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

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
    const forum = await prisma.partner.findUniqueOrThrow({
      where: { id: req.partnerId },
    });
    res.status(200).json(forum);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithPartnerId, res) => {
    const updatedForum = await prisma.partner.update({
      where: { id: req.partnerId },
      data: req.body,
    });
    res.status(200).json(updatedForum);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithPartnerId, res) => {
    const deletedForum = await prisma.partner.delete({
      where: { id: req.partnerId },
    });
    res.status(200).json(deletedForum);
  })
);

export default router;
