if (req.method === "PUT") {
    const { id } = req.query;
    const { title, author } = req.body;
    const updatedBook = await prisma.book.update({ where: { id: parseInt(id) }, data: { title, author } });
    res.status(200).json(updatedBook);
    }
    if (req.method === "DELETE") {
        const { id } = req.query;
        await prisma.book.delete({ where: { id: parseInt(id) } });
        res.status(204).end();
        }