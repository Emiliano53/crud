// components/BookForm.js
import { useState, useEffect } from "react";
import "../styles/estilos.css";

export default function BookForm({ onSubmit, initialValues, submitLabel = "Add Book" }) {
  const [title, setTitle] = useState(initialValues ? initialValues.title : "");
  const [author, setAuthor] = useState(initialValues ? initialValues.author : "");

  // Actualiza los campos si cambia el objeto de edición
  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setAuthor(initialValues.author);
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || author.trim() === "") {
      alert("Please enter title and author.");
      return;
    }
    // Si se está editando, incluir el id
    const bookData = initialValues ? { ...initialValues, title, author } : { title, author };
    onSubmit(bookData);
    if (!initialValues) { // Limpiar campos solo al agregar nuevo libro
      setTitle("");
      setAuthor("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
      />
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
