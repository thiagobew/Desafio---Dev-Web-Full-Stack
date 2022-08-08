import prisma from "../../../prisma/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
    return;
  }

  try {
    const records = await prisma.Record.findMany();

    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
    return;
  }
}
