import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const books = await prisma.book.findMany();
      res.status(200).json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ error: "Failed to fetch books" });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, author } = req.body;
      const newBook = await prisma.book.create({ data: { title, author } });
      res.status(201).json(newBook);
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ error: "Failed to create book" });
    }
  }
}