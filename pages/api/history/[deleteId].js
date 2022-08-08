import prisma from "../../../prisma/prisma";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
    return;
  }

  const { deleteId } = req.query;

  if (!deleteId) {
    res.status(400).json({ error: "Cannot delete item with no id" });
    return;
  }

  try {
    const deletedRecord = await prisma.Record.delete({
      where: {
        id: deleteId,
      },
    });

    res.status(200).json({ message: "Record deleted", deletedRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
