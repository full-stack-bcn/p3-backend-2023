import {formaterDates} from "../utils.js"
import prisma from "../db/prisma-client.js";

export const validateTournaments = (req: any): { ok: boolean, error?: string } => {

    const areEmpty = emptyDates(req);

    if(!areEmpty.ok){
        return areEmpty;
    }

    const areGreaterThanToday = geraterThanToday(req);

    if(!areGreaterThanToday.ok){
        return areGreaterThanToday;
    }

    return {
        ok: true
    };
    
};

export const validateRankings = async (req: any): Promise<{ ok: boolean, error?: string }> => {
    const areEmpty = emptyDates(req);

    if(!areEmpty.ok){
        return areEmpty;
    }

    const tournament = await getTournament(req.body.tournamentId);

    const areInBeteewn = validateDatesRankingInTournament(req, tournament);

    if(!areInBeteewn.ok){
        return areInBeteewn;
    }

    return {
        ok: true
    };
};

const emptyDates = (req: any): { ok: boolean, error?: string } => {
    
    if (req.body.startDate.length === 0 || req.body.endDate.length === 0) {
        return {
            ok: false,
            error: "Date can not be empty"
        };
    }

    return {
        ok: true
    };
}

const geraterThanToday = (req: any): { ok: boolean, error?: string } => {
    const today = new Date();
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (startDate < today || endDate < today) {
        return {
            ok: false,
            error: "Date must be greater or equal than today"
        };
    }

    return {
        ok: true
    };
}

const getTournament = async (id: number) => {
    const tournament = await prisma.tournament.findUnique({
        where: { id: id },
      });

      return tournament;
}

const validateDatesRankingInTournament = (req: any, tournament: any) : { ok: boolean, error?: string } => {
    const startDateRanking = new Date(req.body.startDate);
    const endDateRanking = new Date(req.body.endDate);
    const startDateTournament = new Date(tournament.startDate);
    const endDateTournament = new Date(tournament.endDate);

    if ((startDateRanking >= startDateTournament && startDateRanking <= endDateTournament) && (endDateRanking >= startDateTournament && endDateRanking <= endDateTournament)) {
        return {
            ok: true
        };  
    }

    return {
        ok: false,
        error: `The dates of the ranking must be in between ${formaterDates(startDateTournament)} and ${formaterDates(endDateTournament)}`  
    };
}