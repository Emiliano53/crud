import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
//importar estilos.css
import "../styles/estilos.css";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then(setBooks)
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleDeleteBook = (id) => {
    fetch(`/api/books/${id}`, { method: "DELETE" })
      .then(() => setBooks(books.filter((book) => book.id !== id)))
      .catch((error) => console.error("Error deleting book:", error));
  };

  return (
    <div className="p-4">
      <BookForm onSubmit={(book) => {
        fetch("/api/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(book),
        })
          .then((res) => res.json())
          .then((newBook) => setBooks([...books, newBook]))
          .catch((error) => console.error("Error creating book:", error));
      }} />
      <ul className="list-none p-0">
        {books.map((book) => (
          <li
            key={book.id}
            className="border border-gray-300 p-2 mb-2 flex justify-between items-center rounded-md"
          >
            <span>{book.title} by {book.author}</span>
            <div>
              <button
                className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-md"
                onClick={() => console.log(`Edit ${book.id}`)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md"
                onClick={() => handleDeleteBook(book.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}