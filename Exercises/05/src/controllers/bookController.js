// Simulación de base de datos en memoria
let books = [
  { id: '1', title: 'El Quijote', author: 'Miguel de Cervantes' },
  { id: '2', title: '1984', author: 'George Orwell' }
];

// Generador de ID simple (basado en el PDF pág 74)
const generateId = () => {
  const maxId = books.length > 0
    ? Math.max(...books.map(n => Number(n.id)))
    : 0;
  return String(maxId + 1);
};

// GET /books - Devuelve todos los libros
export const getBooks = (req, res) => {
  res.json(books);
};

// GET /books/:id - Devuelve un libro por ID
export const getBookById = (req, res) => {
  const id = req.params.id;
  const book = books.find(b => b.id === id);

  if (book) {
    res.json(book);
  } else {
    // Manejo de error 404 si no existe [cite: 873]
    res.status(404).json({ error: 'Book not found' });
  }
};

// POST /books - Crea un libro nuevo
export const createBook = (req, res) => {
  const body = req.body;

  // Validación simple: título y autor son obligatorios
  if (!body.title || !body.author) {
    return res.status(400).json({ 
      error: 'Content missing: title and author are required' 
    });
  }

  const newBook = {
    id: generateId(),
    title: body.title,
    author: body.author
  };

  books = books.concat(newBook);
  res.status(201).json(newBook);
};

// DELETE /books/:id - Borra un libro
export const deleteBook = (req, res) => {
  const id = req.params.id;
  // Filtramos el array para quitar el libro con ese ID
  books = books.filter(b => b.id !== id);
  
  // Respondemos con 204 No Content [cite: 891]
  res.status(204).end();
};