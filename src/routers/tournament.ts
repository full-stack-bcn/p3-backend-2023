import { Request, Router } from "express";
import prisma from "../db/prisma-client.js";
import { errorChecked } from "../utils.js";
import {validateTournaments} from "../validators/date.js"

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.tournament.findMany({});
    res.status(200).json({ tournaments: result, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const areDatesOK = validateTournaments(req);
    if(areDatesOK.ok){
      const newTournament = await prisma.tournament.create({ data: req.body });
      res.status(200).json({ newTournament, ok: true });
    }else{
      res.status(400).json({ error:areDatesOK.error });
    }
  })
);

export interface RequestWithTournamentId extends Request {
    tournamentId: number;
}

router.use("/:id", async (req: RequestWithTournamentId, res, next) => {
  const { id } = req.params;
  req.tournamentId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithTournamentId, res) => {
    const tournament = await prisma.tournament.findUniqueOrThrow({
      where: { id: req.tournamentId },
    });
    res.status(200).json(tournament);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithTournamentId, res) => {
    const updatedTournament = await prisma.tournament.update({
      where: { id: req.tournamentId },
      data: req.body,
    });
    res.status(200).json(updatedTournament);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithTournamentId, res) => {
    const deletedTournament = await prisma.tournament.delete({
      where: { id: req.tournamentId },
    });
    res.status(200).json(deletedTournament);
  })
);

export default router;
