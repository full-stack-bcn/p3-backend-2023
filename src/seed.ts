import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  data:{
    promotionId: animalKingdom.id,
    startDate: new Date(),
    endDate: futureDate
  }
})
