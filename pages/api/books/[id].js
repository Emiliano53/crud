// pages/api/books/id.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const { title, author } = req.body;
      const updatedBook = await prisma.book.update({
        where: { id: parseInt(id) },
        data: { title, author },
      });
      res.status(200).json(updatedBook);
    } catch (error) {
      console.error("Error updating book:", error);
      res.status(500).json({ error: "Failed to update book" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.book.delete({ where: { id: parseInt(id) } });
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ error: "Failed to delete book" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
