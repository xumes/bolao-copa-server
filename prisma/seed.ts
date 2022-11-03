import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Xumes Grumes",
      email: "me@xumes.ca",
      avatarUrl: "https://github.com/xumes.png",
    },
  });

  const poll = await prisma.poll.create({
    data: {
      title: "Example Poll",
      code: "BOL456",
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
              userId_pollId: {
                userId: user.id,
                pollId: poll.id,
              },
            },
          },
        },
      },
    },
  });

  /*   const participant = await prisma.participant.create({
    data: {
      pollId: poll.id,
      userId: user.id,
    },
  }); */
}

main();