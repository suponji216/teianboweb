import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import Graph from "./Graph";

const prisma = new PrismaClient();

export default async function Home() {
  const data = await getData();
  return (
    <main>
      <Graph data={[...data]} />
    </main>
  );
}

async function getName(id: string) {
  const headers = new Headers();
  headers.set("Authorization", "Bot " + process.env.DISCORD_TOKEN);
  const res = await fetch(`https://discord.com/api/v10/users/${id}`, {
    headers: headers,
  });
  if (res.ok) {
    const user = await res.json();
    return (await user.username) as string;
  } else {
    return "";
  }
}

async function getData() {
  const now = dayjs();
  const res = await prisma.inout.findMany({
    select: {
      id: true,
      type: true,
      date: true,
      User: true,
    },
    where: {
      date: {
        gte: now.startOf("month").toISOString(),
        lt: now.endOf("month").toISOString(),
      },
    },
  });
  const discordIds = [...new Set(res.map((v) => v.User.discordId))];
  const data = await Promise.all(discordIds.map((v) => getUserData(res, v)));
  return data;
}

async function getUserData(res: Inout[], userId: string) {
  const data = res.filter((v) => v.User.discordId === userId);

  const name = await getName(data[0].User.discordId);

  return {
    id: name,
    label: name,
    value: dataParse(data),
  };
}

type Inout = {
  id: number;
  type: string;
  date: Date;
  User: {
    id: number;
    discordId: string;
  };
};

function dataParse(data: Inout[]) {
  const values: number[] = [];
  data.forEach((v, i) => {
    if (i < data.length - 1) {
      if (i === 0 && v.type === "disconnect") values.push(60);
      else if (data[i].type === "connect" && data[i + 1].type === "disconnect")
        values.push(
          dayjs(data[i + 1].date).diff(dayjs(data[i].date), "minute")
        );
      else if (data[i].type === data[i + 1].type) values.push(60);
    } else if (i === data.length - 1 && v.type === "connect") {
      values.push(dayjs().diff(dayjs(data[i].date), "minute"));
    }
  });
  return values.reduce((a, b) => a + b, 0);
}
