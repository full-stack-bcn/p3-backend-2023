import prisma from "./prisma-client.js";

const cyberbingo = await prisma.partner.create({
  data: {
    name: "Cyberbingo",
    url: "www.cyberbingo.com",
  },
});

console.log(`created partner: ${cyberbingo.name}`);

const vegascrest = await prisma.partner.create({
  data: {
    name: "Vegascrest",
    url: "www.vegascrest.ag",
  },
});

console.log(`created partner: ${vegascrest.name}`);

const welcomeBonuses = await prisma.promotion.create({
  data: {
    name: "Welcome Bonus",
    url: "welcome-bonus",
    partnerId: cyberbingo.id,
  },
});

console.log(`created promotion: ${welcomeBonuses.name}`);

const animalKingdom = await prisma.promotion.create({
  data: {
    name: "The Animal Kingdom Tourney",
    url: "the-animal-kingdom-tourney",
    partnerId: vegascrest.id,
  },
});

console.log(`created promotion: ${animalKingdom.name}`);

const futureDate = new Date();
futureDate.setMonth(futureDate.getMonth() + 1);

const tournament = await prisma.tournament.create({
  data: {
    promotionId: animalKingdom.id,
    startDate: new Date(),
    endDate: futureDate,
  },
});

console.log(
  `created tournament: ${tournament.id} of the promotion ${animalKingdom.name}`
);

const tournamentWelcomeBonuses = await prisma.tournament.create({
  data: {
    promotionId: welcomeBonuses.id,
    startDate: new Date(),
    endDate: futureDate,
  },
});

console.log(
  `created tournament: ${tournamentWelcomeBonuses.id} of the promotion ${welcomeBonuses.name}`
);

const ranking = await prisma.ranking.create({
  data: {
    tournamentId: tournament.id,
    startDate: new Date(),
    endDate: futureDate,
  },
});

console.log(`created ranking: ${ranking.id} of the promotion ${tournament.id}`);

const rankingWelcomeBonuses = await prisma.ranking.create({
  data: {
    tournamentId: tournamentWelcomeBonuses.id,
    startDate: new Date(),
    endDate: futureDate,
  },
});

console.log(
  `created ranking: ${rankingWelcomeBonuses.id} of the promotion ${tournamentWelcomeBonuses.id}`
);

const position = await prisma.position.create({
  data: {
    rankingId: ranking.id,
    position: 1,
    userName: "the_fisrt_one",
    gamesWon: 150,
    prize: 500,
    partnerId: cyberbingo.id,
  },
});

console.log(
  `created position: ${position.id} of the promotion ${ranking.id}`
);

const secondPosition = await prisma.position.create({
  data: {
    rankingId: ranking.id,
    position: 2,
    userName: "the_second",
    gamesWon: 130,
    prize: 50,
    partnerId: cyberbingo.id,
  },
});

console.log(
  `created position: ${secondPosition.id} of the promotion ${ranking.id}`
);

