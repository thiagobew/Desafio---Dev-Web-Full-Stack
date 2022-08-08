import prisma from "../../../prisma/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
    return;
  }

  try {
    const createdRecord = await prisma.Record.create({
      data: req.body,
    });

    res.status(200).json(createdRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
    return;
  }
}
