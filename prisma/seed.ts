import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatarUrl: "https://github.com/xumes.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  // No guess
  await prisma.game.create({
    data: {
      date: "2022-11-02T12:00:00.926Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
    },
  });

  // With guess
  await prisma.game.create({
    data: {
      date: "2022-11-03T10:00:00.926Z",
      firstTeamCountryCode: "CA",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });

  /*   const participant = await prisma.participant.create({
    data: {
      poolId: pool.id,
      userId: user.id,
    },
  }); */
}

main();