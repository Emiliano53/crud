// pages/index.js
import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import "../styles/estilos.css";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

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

  const handleUpdateBook = (updatedBook) => {
    fetch(`/api/books/${updatedBook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(books.map((book) => (book.id === data.id ? data : book)));
        setEditingBook(null);
      })
      .catch((error) => console.error("Error updating book:", error));
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
  };

  return (
    <div className="p-4">
      <h1>Books</h1>
      {/* Formulario para agregar nuevos libros */}
      <BookForm
        onSubmit={(book) => {
          fetch("/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
          })
            .then((res) => res.json())
            .then((newBook) => setBooks([...books, newBook]))
            .catch((error) => console.error("Error creating book:", error));
        }}
      />

      {/* Si se está editando un libro, mostrar el formulario de edición */}
      {editingBook && (
        <div className="mt-4">
          <h2>Edit Book</h2>
          <BookForm
            initialValues={editingBook}
            onSubmit={handleUpdateBook}
            submitLabel="Update Book"
          />
        </div>
      )}

      <ul className="list-none p-0">
        {books.map((book) => (
          <li
            key={book.id}
            className="border border-gray-300 p-2 mb-2 flex justify-between items-center rounded-md"
          >
            <span>
              {book.title} by {book.author}
            </span>
            <div>
              <button
                className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-md"
                onClick={() => handleEditClick(book)}
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
